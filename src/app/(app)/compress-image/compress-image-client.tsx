"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Uploader } from "@/app/components/shared/uploader";
import { downloadBlob, formatBytes } from "@/lib/image-utils";
import {
  createDeepCompressionJob,
  downloadImageToolsArtifact,
  resolveDeepCompressionResults,
  resolveImageToolsAssetUrl,
  waitForImageToolsJobCompletion,
} from "@/lib/image-tools-api";
import { downloadZip } from "@/lib/zip-utils";
import { motion } from "framer-motion";
import { Download, X } from "lucide-react";

const COMPRESS_ACCEPT: Record<string, string[]> = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/avif": [".avif"],
};

const SUPPORTED_COMPRESS_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
];
const NO_IMAGE_PREVIEW_URL = "/no-image.svg";
const COMPRESS_MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const COMPRESS_MAX_TOTAL_SIZE_BYTES = 50 * 1024 * 1024;
const COMPRESS_API_BATCH_UPLOAD_LIMIT = 20;

type PreviewSource = "local" | "fallback";

type FileJob = {
  id: string;
  file: File;
  status: "pending" | "processing" | "done" | "failed";
  progress: number;
  blob?: Blob;
  downloadUrl?: string;
  error?: string;
  previewUrl: string;
  previewSource: PreviewSource;
};

export default function CompressImageClient() {
  const [jobs, setJobs] = useState<FileJob[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploaderKey, setUploaderKey] = useState(0);
  const activeRequestRef = useRef<AbortController | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const jobsRef = useRef<FileJob[]>([]);

  useEffect(() => {
    jobsRef.current = jobs;
  }, [jobs]);

  const revokePreviewUrls = (items: FileJob[]) => {
    items.forEach((item) => {
      if (item.previewSource === "local") {
        URL.revokeObjectURL(item.previewUrl);
      }
    });
  };

  const createJobId = () => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }

    return `job-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  };

  const createPendingJob = (
    file: File,
    previewUrl: string,
    previewSource: PreviewSource,
  ): FileJob => ({
    id: createJobId(),
    file,
    status: "pending",
    progress: 0,
    previewUrl,
    previewSource,
  });

  const canDecodeImageFile = async (file: File, objectUrl: string) => {
    if (typeof window === "undefined") {
      return true;
    }

    if ("createImageBitmap" in window) {
      try {
        const bitmap = await createImageBitmap(file);
        bitmap.close();
        return true;
      } catch {
        // Fall back to HTMLImageElement decode below for broader browser support.
      }
    }

    return new Promise<boolean>((resolve) => {
      const image = new Image();
      const cleanup = () => {
        image.onload = null;
        image.onerror = null;
      };

      image.onload = () => {
        cleanup();
        resolve(true);
      };

      image.onerror = () => {
        cleanup();
        resolve(false);
      };

      image.src = objectUrl;
    });
  };

  const validateFileForCompression = async (file: File) => {
    if (!isSupportedCompressFile(file)) {
      return {
        isValid: false,
        error: "Unsupported format. Please use JPG, JPEG, PNG, WebP, or AVIF.",
        previewUrl: URL.createObjectURL(file),
        previewSource: "local" as const,
      };
    }

    if (file.size > COMPRESS_MAX_FILE_SIZE_BYTES) {
      return {
        isValid: false,
        error: "Each file must be 10MB or smaller.",
        previewUrl: URL.createObjectURL(file),
        previewSource: "local" as const,
      };
    }

    const previewUrl = URL.createObjectURL(file);
    const canDecode = await canDecodeImageFile(file, previewUrl);

    if (canDecode) {
      return {
        isValid: true,
        previewUrl,
        previewSource: "local" as const,
      };
    }

    URL.revokeObjectURL(previewUrl);

    return {
      isValid: false,
      error:
        "The file is corrupted or unreadable",
      previewUrl: NO_IMAGE_PREVIEW_URL,
      previewSource: "fallback" as const,
    };
  };

  useEffect(() => {
    return () => {
      activeRequestRef.current?.abort();
      revokePreviewUrls(jobsRef.current);
    };
  }, []);

  const handleProcess = async (
    filesToCompress: File[],
    options?: { append?: boolean; leadingJobs?: FileJob[] },
  ) => {
    const leadingJobs = options?.leadingJobs ?? [];

    if (filesToCompress.length === 0) {
      if (leadingJobs.length > 0) {
        if (options?.append) {
          setJobs((prev) => [...prev, ...leadingJobs]);
        } else {
          revokePreviewUrls(jobsRef.current);
          setJobs(leadingJobs);
        }
      }
      setIsPending(false);
      return;
    }

    setError(null);
    setIsPending(true);
    activeRequestRef.current?.abort();
    const abortController = new AbortController();
    activeRequestRef.current = abortController;

    const initialJobs: FileJob[] = filesToCompress.map((file) =>
      createPendingJob(file, URL.createObjectURL(file), "local"),
    );
    const initialJobIds = initialJobs.map((job) => job.id);
    const initialJobIdSet = new Set(initialJobIds);

    if (options?.append) {
      setJobs((prev) => [...prev, ...leadingJobs, ...initialJobs]);
    } else {
      revokePreviewUrls(jobsRef.current);
      setJobs([...leadingJobs, ...initialJobs]);
    }

    try {
      for (
        let chunkStart = 0;
        chunkStart < initialJobs.length;
        chunkStart += COMPRESS_API_BATCH_UPLOAD_LIMIT
      ) {
        const chunkJobs = initialJobs.slice(
          chunkStart,
          chunkStart + COMPRESS_API_BATCH_UPLOAD_LIMIT,
        );
        const chunkJobIdSet = new Set(chunkJobs.map((job) => job.id));
        const chunkFiles = chunkJobs.map((job) => job.file);
        const jobIdByResultIndex = new Map(
          chunkJobs.map((job, index) => [index, job.id]),
        );

        setJobs((prev) =>
          prev.map((job) =>
            chunkJobIdSet.has(job.id)
              ? { ...job, status: "processing" }
              : job,
          ),
        );

        const remoteJobId = await createDeepCompressionJob(chunkFiles, {
          quality: 80,
        });
        const completedJob = await waitForImageToolsJobCompletion(remoteJobId, {
          signal: abortController.signal,
          onUpdate: (job) => {
            setJobs((prev) =>
              prev.map((item) =>
                chunkJobIdSet.has(item.id)
                  ? {
                      ...item,
                      progress:
                        typeof job.progress === "number" ? job.progress : 0,
                    }
                  : item,
              ),
            );
          },
        });
        const compressionResults = resolveDeepCompressionResults(completedJob);

        if (compressionResults.length === 0) {
          throw new Error("Compression job completed without per-file results.");
        }

        const resolvedResults = await Promise.all(
          compressionResults.map(async (result) => {
            const localJobId = jobIdByResultIndex.get(result.index);

            if (
              !localJobId ||
              !jobsRef.current.some((job) => job.id === localJobId)
            ) {
              return result;
            }

            if (result.status !== "completed" || !result.downloadUrl) {
              return result;
            }

            try {
              const blob = await downloadImageToolsArtifact(result.downloadUrl);
              return { ...result, blob };
            } catch (downloadError) {
              return {
                ...result,
                status: "failed" as const,
                error:
                  downloadError instanceof Error
                    ? downloadError.message
                    : "Failed to download compressed image.",
              };
            }
          }),
        );
        const resultsByJobId = new Map(
          resolvedResults.flatMap((result) => {
            const localJobId = jobIdByResultIndex.get(result.index);

            return localJobId ? [[localJobId, result] as const] : [];
          }),
        );

        setJobs((prev) =>
          prev.map((job) => {
            if (!chunkJobIdSet.has(job.id)) {
              return job;
            }

            const result = resultsByJobId.get(job.id);

            if (!result) {
              return {
                ...job,
                status: "failed",
                progress: 100,
                error: "Compression result missing for this file.",
              };
            }

            if (
              result.status === "completed" &&
              "blob" in result &&
              result.blob
            ) {
              return {
                ...job,
                status: "done",
                blob: result.blob,
                downloadUrl: result.downloadUrl,
                progress: 100,
                error: undefined,
              };
            }

            return {
              ...job,
              status: "failed",
              progress: 100,
              error: result.error ?? "Compression failed for this file.",
            };
          }),
        );
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        revokePreviewUrls(initialJobs);
        return;
      }

      setError(err instanceof Error ? err.message : "Upload failed.");
      setJobs((prev) =>
        prev.map((job) =>
          initialJobIdSet.has(job.id) &&
          job.status !== "done" &&
          !job.blob
            ? { ...job, status: "failed" }
            : job,
        ),
      );
    } finally {
      if (activeRequestRef.current === abortController) {
        activeRequestRef.current = null;
        setIsPending(false);
      }
    }
  };

  const isSupportedCompressFile = (file: File) => {
    const mimeType = file.type.toLowerCase();

    if (mimeType && mimeType in COMPRESS_ACCEPT) {
      return true;
    }

    const lowerName = file.name.toLowerCase();
    return SUPPORTED_COMPRESS_EXTENSIONS.some((extension) =>
      lowerName.endsWith(extension),
    );
  };

  const startCompressionForFiles = async (files: File[], append = false) => {
    setError(null);
    setIsPending(true);

    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);

    if (totalBytes > COMPRESS_MAX_TOTAL_SIZE_BYTES) {
      setError(
        "Each upload can include any number of files, but the total must stay within 50MB.",
      );
      setIsPending(false);
      return;
    }

    const validatedFiles = await Promise.all(
      files.map((file) => validateFileForCompression(file)),
    );
    const validFiles: File[] = [];
    const invalidJobs: FileJob[] = [];

    validatedFiles.forEach((validatedFile, index) => {
      const file = files[index];

      if (!file) {
        return;
      }

      if (validatedFile.isValid) {
        if (validatedFile.previewSource === "local") {
          URL.revokeObjectURL(validatedFile.previewUrl);
        }
        validFiles.push(file);
        return;
      }

      invalidJobs.push({
        id: createJobId(),
        file,
        status: "failed",
        progress: 0,
        error: validatedFile.error,
        previewUrl: validatedFile.previewUrl,
        previewSource: validatedFile.previewSource,
      });
    });

    if (validFiles.length === 0) {
      if (invalidJobs.length > 0) {
        if (append) {
          setJobs((prev) => [...prev, ...invalidJobs]);
        } else {
          revokePreviewUrls(jobsRef.current);
          setJobs(invalidJobs);
        }
      }
      setIsPending(false);
      return;
    }

    await handleProcess(validFiles, { append, leadingJobs: invalidJobs });
  };

  const buildFilename = (job: FileJob) => {
    const parts = job.file.name.split(".");
    const ext = parts.pop();
    const base = parts.join(".");
    return `${base}_compressed.${ext}`;
  };

  const handleDownload = (job: FileJob) => {
    if (job.blob) {
      downloadBlob(job.blob, buildFilename(job));
      return;
    }

    if (job.downloadUrl) {
      const link = document.createElement("a");
      link.href = resolveImageToolsAssetUrl(job.downloadUrl);
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
  };

  const handleRemoveJob = (jobId: string) => {
    const jobToRemove = jobsRef.current.find((job) => job.id === jobId);

    if (!jobToRemove) {
      return;
    }

    if (jobToRemove.previewSource === "local") {
      URL.revokeObjectURL(jobToRemove.previewUrl);
    }

    setJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  const handleDownloadAll = async () => {
    const items = jobs
      .filter((job) => job.blob)
      .map((job) => ({
        blob: job.blob as Blob,
        filename: buildFilename(job),
      }));
    if (items.length <= 1) return;
    await downloadZip(items, "compressed-images.zip");
  };

  const aggregateStats = useMemo(() => {
    const completed = jobs.filter((job) => job.blob);
    if (completed.length === 0) {
      return {
        originalBytes: 0,
        compressedBytes: 0,
        savedBytes: 0,
        savingsPercent: 0,
      };
    }

    const original = completed.reduce((sum, job) => sum + job.file.size, 0);
    const compressed = completed.reduce(
      (sum, job) => sum + (job.blob?.size ?? 0),
      0,
    );
    const savedBytes = Math.max(0, original - compressed);

    if (!original) {
      return {
        originalBytes: original,
        compressedBytes: compressed,
        savedBytes,
        savingsPercent: 0,
      };
    }

    const rawPercent = (savedBytes / original) * 100;

    return {
      originalBytes: original,
      compressedBytes: compressed,
      savedBytes,
      savingsPercent:
        compressed > 0 ? Math.min(99.9, Math.max(0, rawPercent)) : 100,
    };
  }, [jobs]);

  const completedJobs = jobs.filter((job) => job.blob);
  const isBatchComplete = jobs.length > 0 && !isPending;
  const completedCount = completedJobs.length;
  const totalSavingsLabel = `${aggregateStats.savingsPercent.toFixed(
    aggregateStats.savingsPercent >= 10 ? 0 : 1,
  )}%`;

  const openFilePicker = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.value = "";
    fileInputRef.current.click();
  };

  const handleUploaderSelection = (files: File[]) => {
    if (files.length === 0) return;
    setUploaderKey((prev) => prev + 1);
    void startCompressionForFiles(files, jobsRef.current.length > 0);
  };

  return (
    <div
      className="space-y-8"
      data-tool-active-image={jobs.length > 0 ? "true" : undefined}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.avif"
        multiple
        className="hidden"
        onChange={(event) => {
          const nextFiles = Array.from(event.target.files ?? []);

          if (nextFiles.length > 0) {
            void startCompressionForFiles(nextFiles, jobs.length > 0);
          }
        }}
      />

      {(jobs.length === 0 || !isPending) && (
        <Uploader
          key={uploaderKey}
          onFileSelect={(file) => {
            handleUploaderSelection([file]);
          }}
          onFilesSelect={(files) => {
            handleUploaderSelection(files);
          }}
          accept={COMPRESS_ACCEPT}
          isProcessing={isPending}
          maxFiles={0}
          maxSizeMB={10}
          maxTotal={50}
        />
      )}

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {jobs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 border border-green-200 dark:border-green-900/50 rounded-2xl relative overflow-hidden"
        >
          {aggregateStats.savedBytes > 0 && (
            <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
              Saved {totalSavingsLabel}
            </div>
          )}

          <h3 className="text-2xl font-bold mb-6">Compression Results</h3>
          <p className="mb-6 text-sm text-muted-foreground">
            Compressed{" "}
            <span className="font-semibold text-foreground">
              {completedCount}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">{jobs.length}</span>{" "}
            image{jobs.length > 1 ? "s" : ""} and saved{" "}
            <span className="font-semibold text-green-600 dark:text-green-400">
              {totalSavingsLabel}
            </span>{" "}
            overall
            {aggregateStats.savedBytes > 0
              ? ` (${formatBytes(aggregateStats.savedBytes)} saved).`
              : "."}
          </p>

          <div className="space-y-3 mb-8">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/50 pb-2 text-left"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md border border-border/60 bg-white">
                    <img
                      src={job.previewUrl}
                      alt={job.file.name}
                      onError={(event) => {
                        event.currentTarget.src = NO_IMAGE_PREVIEW_URL;
                      }}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {job.file.name}
                    </p>
                    {job.blob ? (
                      <p className="text-xs text-muted-foreground">
                        {formatBytes(job.file.size)} →{" "}
                        <span className="text-green-600 dark:text-green-400 font-semibold">
                          {formatBytes(job.blob.size)}
                        </span>
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {job.status === "failed"
                          ? (job.error ?? "Failed")
                          : "Processing..."}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {job.status == "processing" && (
                    <>
                      <div className="w-28 h-2 rounded-full bg-border/60 overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-10 text-right">
                        {job.progress}%
                      </span>
                    </>
                  )}
                  {job.blob && (
                    <button
                      type="button"
                      onClick={() => handleDownload(job)}
                      className="px-3 py-2 text-sm font-semibold bg-primary text-white rounded-lg shadow hover:shadow-md transition-all"
                    >
                      <Download />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveJob(job.id)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-white text-muted-foreground shadow-sm transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label={`Remove ${job.file.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {jobs.length > 1 ? (
              <button
                onClick={handleDownloadAll}
                disabled={!isBatchComplete || completedJobs.length <= 1}
                className="px-6 py-2.5 bg-primary text-white font-bold rounded-md shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:shadow-none disabled:transform-none"
              >
                Download All (ZIP)
              </button>
            ) : (
              <button
                onClick={() => {
                  if (completedJobs[0]) {
                    handleDownload(completedJobs[0]);
                  }
                }}
                disabled={!isBatchComplete || completedJobs.length === 0}
                className="px-6 py-2.5 bg-primary text-white font-bold rounded-md shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:shadow-none disabled:transform-none"
              >
                Download Image
              </button>
            )}
            <button
              onClick={openFilePicker}
              disabled={isPending}
              className="px-6 py-2.5 bg-white text-foreground border border-border font-bold rounded-md shadow-sm hover:bg-secondary transition-all disabled:opacity-50 disabled:hover:bg-white"
            >
              Add More Images
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
