"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "next-intl";
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
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Download,
  ImagePlus,
  Loader2,
  Settings,
  Sparkles,
  X,
} from "lucide-react";

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

const COMPRESSION_PROFILES = [
  {
    id: "balanced",
    label: "Balanced",
    description: "Better quality for most uploads",
    quality: 82,
  },
  {
    id: "smaller",
    label: "Smaller File",
    description: "More aggressive size reduction",
    quality: 68,
  },
] as const;

type CompressionProfile = (typeof COMPRESSION_PROFILES)[number]["id"];

export default function CompressImageClient() {
  const locale = useLocale();
  const isVietnamese = locale === "vi";
  const [jobs, setJobs] = useState<FileJob[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploaderKey, setUploaderKey] = useState(0);
  const [compressionProfile, setCompressionProfile] =
    useState<CompressionProfile>("balanced");
  const [quality, setQuality] = useState(82);
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
        error: isVietnamese
          ? "Định dạng không được hỗ trợ. Vui lòng dùng JPG, JPEG, PNG, WebP hoặc AVIF."
          : "Unsupported format. Please use JPG, JPEG, PNG, WebP, or AVIF.",
        previewUrl: URL.createObjectURL(file),
        previewSource: "local" as const,
      };
    }

    if (file.size > COMPRESS_MAX_FILE_SIZE_BYTES) {
      return {
        isValid: false,
        error: isVietnamese
          ? "Mỗi tệp phải nhỏ hơn hoặc bằng 10MB."
          : "Each file must be 10MB or smaller.",
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
      error: isVietnamese
        ? "Tệp bị hỏng hoặc không thể đọc được."
        : "The file is corrupted or unreadable",
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
            chunkJobIdSet.has(job.id) ? { ...job, status: "processing" } : job,
          ),
        );

        const remoteJobId = await createDeepCompressionJob(chunkFiles, {
          quality,
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
          throw new Error(
            isVietnamese
              ? "Tiến trình nén đã hoàn tất nhưng không trả về kết quả cho từng tệp."
              : "Compression job completed without per-file results.",
          );
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
                    : isVietnamese
                      ? "Không thể tải tệp ảnh đã nén."
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
                error: isVietnamese
                  ? "Thiếu kết quả nén cho tệp này."
                  : "Compression result missing for this file.",
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
              error:
                result.error ??
                (isVietnamese
                  ? "Nén thất bại cho tệp này."
                  : "Compression failed for this file."),
            };
          }),
        );
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        revokePreviewUrls(initialJobs);
        return;
      }

      setError(
        err instanceof Error
          ? err.message
          : isVietnamese
            ? "Tải tệp lên thất bại."
            : "Upload failed.",
      );
      setJobs((prev) =>
        prev.map((job) =>
          initialJobIdSet.has(job.id) && job.status !== "done" && !job.blob
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
        isVietnamese
          ? "Mỗi lần tải lên không giới hạn số lượng tệp, nhưng tổng dung lượng phải trong 50MB."
          : "Each upload can include any number of files, but the total must stay within 50MB.",
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
  const overallProgress = jobs.length
    ? Math.round(
        jobs.reduce((sum, job) => {
          if (job.status === "done" || job.status === "failed") {
            return sum + 100;
          }

          if (job.status === "processing") {
            return sum + job.progress;
          }

          return sum;
        }, 0) / jobs.length,
      )
    : 0;
  const totalSavingsLabel = `${aggregateStats.savingsPercent.toFixed(
    aggregateStats.savingsPercent >= 10 ? 0 : 1,
  )}%`;

  const handleUploaderSelection = (files: File[]) => {
    if (files.length === 0) return;
    setUploaderKey((prev) => prev + 1);
    void startCompressionForFiles(files, jobsRef.current.length > 0);
  };

  return (
    <div
      className="space-y-6"
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

      <div className="grid gap-6 xl:grid-cols-12 xl:items-start">
        <div className="space-y-6 xl:col-span-8">
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

          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive shadow-sm">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {jobs.length > 0 && (
            <>
              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-xl border border-primary/10 bg-gradient-to-br from-white via-white to-primary/5 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2 w-full lg:flex justify-between">
                    <p className="text-sm font-semibold uppercase text-primary/70">
                      {isVietnamese ? "Tiến trình hàng loạt" : "Batch Progress"}
                    </p>
                    <p className="max-w-2xl text-sm text-muted-foreground">
                      {aggregateStats.savedBytes > 0
                        ? isVietnamese
                          ? `Đã giảm tổng cộng ${totalSavingsLabel} và tiết kiệm ${formatBytes(
                              aggregateStats.savedBytes,
                            )}`
                          : `Saved ${totalSavingsLabel} overall and reduced ${formatBytes(
                              aggregateStats.savedBytes,
                            )}`
                        : isVietnamese
                          ? "Tải ảnh lên và quá trình nén sẽ tự động bắt đầu theo thiết lập hiện tại."
                          : "Upload images and compression will begin automatically with your current settings."}
                    </p>
                  </div>
                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-primary/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
              </motion.section>

              <section className="space-y-4">
                <div className="space-y-2">
                  {jobs.map((job) => {
                    const fileSavings =
                      job.blob && job.file.size > 0
                        ? Math.max(
                            0,
                            Math.min(
                              99.9,
                              ((job.file.size - job.blob.size) /
                                job.file.size) *
                                100,
                            ),
                          )
                        : 0;
                    const displayProgress =
                      job.status === "done" || job.status === "failed"
                        ? 100
                        : job.status === "processing"
                          ? Math.max(job.progress, 6)
                          : 0;
                    const statusLabel =
                      job.status === "done"
                        ? isVietnamese
                          ? "Hoàn tất"
                          : "Done"
                        : job.status === "processing"
                          ? isVietnamese
                            ? "Đang nén"
                            : "Compressing"
                          : job.status === "failed"
                            ? isVietnamese
                              ? "Thất bại"
                              : "Failed"
                            : isVietnamese
                              ? "Đang chờ"
                              : "Waiting";

                    return (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border border-border/70 bg-white p-4 shadow-[0_20px_45px_rgba(15,23,42,0.05)]"
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div className="flex min-w-0 items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border/70 bg-muted/40">
                              <img
                                src={job.previewUrl}
                                alt={job.file.name}
                                onError={(event) => {
                                  event.currentTarget.src =
                                    NO_IMAGE_PREVIEW_URL;
                                }}
                                className="h-full w-full object-cover"
                              />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-base font-semibold text-foreground">
                                {job.file.name}
                              </p>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {job.blob ? (
                                  <>
                                    {formatBytes(job.file.size)}{" "}
                                    {isVietnamese ? "thành" : "to"}{" "}
                                    <span className="font-semibold text-primary">
                                      {formatBytes(job.blob.size)}
                                    </span>
                                    {" • "}
                                    {fileSavings.toFixed(
                                      fileSavings >= 10 ? 0 : 1,
                                    )}
                                    {isVietnamese ? "% nhỏ hơn" : "% smaller"}
                                  </>
                                ) : (
                                  <>
                                    {formatBytes(job.file.size)}
                                    {job.status === "failed"
                                      ? isVietnamese
                                        ? " • Không thể nén tệp này"
                                        : " • Could not compress this file"
                                      : job.status === "pending"
                                        ? isVietnamese
                                          ? " • Đã đưa vào hàng chờ"
                                          : " • Queued for processing"
                                        : isVietnamese
                                          ? " • Đang xử lý"
                                          : " • Processing now"}
                                  </>
                                )}
                              </p>

                              {job.status === "failed" && job.error ? (
                                <p className="mt-3 rounded-xl bg-destructive/5 px-3 py-2 text-sm text-destructive">
                                  {job.error}
                                </p>
                              ) : null}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 lg:justify-end">
                            <div
                              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${
                                job.status === "done"
                                  ? "bg-primary/10 text-primary"
                                  : job.status === "processing"
                                    ? "bg-primary/10 text-primary"
                                    : job.status === "failed"
                                      ? "bg-destructive/10 text-destructive"
                                      : "bg-secondary text-muted-foreground"
                              }`}
                            >
                              {job.status === "done" ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : job.status === "processing" ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : job.status === "failed" ? (
                                <AlertCircle className="h-4 w-4" />
                              ) : (
                                <Clock3 className="h-4 w-4" />
                              )}
                              {statusLabel}
                            </div>

                            {job.blob ? (
                              <button
                                type="button"
                                onClick={() => handleDownload(job)}
                                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(37,99,235,0.28)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                <Download className="h-4 w-4" />
                              </button>
                            ) : null}

                            <button
                              type="button"
                              onClick={() => handleRemoveJob(job.id)}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/70 bg-white text-muted-foreground shadow-sm transition-colors hover:bg-secondary hover:text-foreground"
                              aria-label={
                                isVietnamese
                                  ? `Xóa ${job.file.name}`
                                  : `Remove ${job.file.name}`
                              }
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {job.status === "processing" ? (
                          <div className="mt-4">
                            <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                              <span>{isVietnamese ? "Tiến trình" : "Progress"}</span>
                              <span>{displayProgress}%</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-primary/10">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
                                style={{ width: `${displayProgress}%` }}
                              />
                            </div>
                          </div>
                        ) : null}
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </div>

        <div className="xl:col-span-4">
          <div className="space-y-5 xl:sticky xl:top-24">
            <aside className="rounded-xl border border-primary/10 bg-gradient-to-b from-white via-white to-primary/5 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.1)]">
              <div className="flex items-center gap-3">
                <div className="rounded-xl text-primary">
                  <Settings className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-md font-display font-semibold text-foreground">
                    {isVietnamese ? "Cài đặt nén" : "Compression Settings"}
                  </h3>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {isVietnamese ? "Chế độ" : "Method"}
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {COMPRESSION_PROFILES.map((profile) => {
                    const isActive = profile.id === compressionProfile;

                    return (
                      <button
                        key={profile.id}
                        type="button"
                        onClick={() => {
                          setCompressionProfile(profile.id);
                          setQuality(profile.quality);
                        }}
                        className={`rounded-xl border px-4 py-4 text-left transition-all ${
                          isActive
                            ? "border-primary bg-primary/10 text-primary shadow-[0_18px_30px_rgba(37,99,235,0.12)]"
                            : "border-border bg-white text-foreground hover:border-primary/30 hover:bg-primary/5"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div
                            className={`rounded-xl p-2 ${
                              isActive
                                ? "bg-primary text-white"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            <Sparkles className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">
                              {isVietnamese
                                ? profile.id === "balanced"
                                  ? "Cân bằng"
                                  : "Tệp nhỏ hơn"
                                : profile.label}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-muted-foreground">
                      {isVietnamese ? "Chất lượng" : "Quality"}
                    </p>
                  </div>
                  <p className="text-lg font-display font-semibold text-primary">
                    {quality}%
                  </p>
                </div>
                <input
                  type="range"
                  min={45}
                  max={95}
                  step={1}
                  value={quality}
                  onChange={(event) => {
                    setQuality(Number(event.target.value));
                  }}
                  className="mt-4 h-2 w-full cursor-pointer accent-primary"
                  aria-label={
                    isVietnamese ? "Chất lượng nén" : "Compression quality"
                  }
                />
                <div className="mt-2 flex items-center justify-between text-xs font-semibold tracking-[0.14em] text-muted-foreground">
                  <span>{isVietnamese ? "Tệp nhỏ hơn" : "Smaller size"}</span>
                  <span>
                    {isVietnamese ? "Chất lượng cao hơn" : "Best quality"}
                  </span>
                </div>
              </div>

              {completedJobs.length > 0 && (
                <div className="mt-8 space-y-3">
                  {jobs.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        void handleDownloadAll();
                      }}
                      disabled={!isBatchComplete || completedJobs.length <= 1}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 text-base font-semibold text-white shadow-[0_18px_36px_rgba(37,99,235,0.28)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
                    >
                      <Download className="h-5 w-5" />
                      {isVietnamese ? "Tải tất cả (ZIP)" : "Download All (ZIP)"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (completedJobs[0]) {
                          handleDownload(completedJobs[0]);
                        }
                      }}
                      disabled={!isBatchComplete || completedJobs.length === 0}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 text-base font-semibold text-white shadow-[0_18px_36px_rgba(37,99,235,0.28)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
                    >
                      <Download className="h-5 w-5" />
                      {isVietnamese ? "Tải ảnh xuống" : "Download Image"}
                    </button>
                  )}
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
