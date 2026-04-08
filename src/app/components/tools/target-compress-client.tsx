"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Uploader } from "@/app/components/shared/uploader";
import { downloadBlob, formatBytes } from "@/lib/image-utils";
import {
  createDeepCompressionJob,
  downloadImageToolsArtifact,
  resolveDeepCompressionResults,
  waitForImageToolsJobCompletion,
} from "@/lib/image-tools-api";
import { downloadZip } from "@/lib/zip-utils";
import { motion } from "framer-motion";

type TargetCompressClientProps = {
  targetSizeKB: number;
  targetLabel: string;
};

type FileJob = {
  file: File;
  status: "pending" | "processing" | "done" | "failed";
  progress: number;
  blob?: Blob;
  error?: string;
};

const AGGRESSIVE_REDUCTION_RATIO = 10;
const EXTREME_REDUCTION_RATIO = 20;

export default function TargetCompressClient({
  targetSizeKB,
  targetLabel,
}: TargetCompressClientProps) {
  const targetSizeBytes = targetSizeKB * 1024;
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [jobs, setJobs] = useState<FileJob[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const activeRequestRef = useRef<AbortController | null>(null);

  const resetSelection = () => {
    activeRequestRef.current?.abort();
    activeRequestRef.current = null;
    setJobs([]);
    setSelectedFiles([]);
    setError(null);
    setIsPending(false);
  };

  useEffect(() => {
    return () => {
      activeRequestRef.current?.abort();
    };
  }, []);

  const handleProcess = async () => {
    if (selectedFiles.length === 0) return;
    setError(null);
    setIsPending(true);
    activeRequestRef.current?.abort();
    const abortController = new AbortController();
    activeRequestRef.current = abortController;

    const initialJobs: FileJob[] = selectedFiles.map((file) => ({
      file,
      status: "pending",
      progress: 0,
    }));
    setJobs(initialJobs);

    try {
      setJobs((prev) => prev.map((job) => ({ ...job, status: "processing" })));

      const jobId = await createDeepCompressionJob(selectedFiles, {
        targetSizeKb: targetSizeKB,
      });
      const completedJob = await waitForImageToolsJobCompletion(jobId, {
        signal: abortController.signal,
        onUpdate: (job) => {
          setJobs((prev) =>
            prev.map((item, idx) =>
              idx < selectedFiles.length
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
      const resultsByIndex = new Map(
        resolvedResults.map((result) => [result.index, result]),
      );

      setJobs((prev) =>
        prev.map((job, idx) => {
          const result = resultsByIndex.get(idx);

          if (!result) {
            return {
              ...job,
              status: "failed",
              progress: 100,
              error: "Compression result missing for this file.",
            };
          }

          if (result.status === "completed" && "blob" in result && result.blob) {
            return {
              ...job,
              status: "done",
              blob: result.blob,
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
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }

      setError(err instanceof Error ? err.message : "Upload failed.");
      setJobs((prev) =>
        prev.map((job) =>
          job.status === "processing" || job.status === "pending"
            ? { ...job, status: "failed" }
            : job
        )
      );
    } finally {
      if (activeRequestRef.current === abortController) {
        activeRequestRef.current = null;
        setIsPending(false);
      }
    }
  };

  const buildFilename = (job: FileJob) => {
    const parts = job.file.name.split(".");
    const ext = parts.pop();
    const base = parts.join(".");
    return `${base}_${targetSizeKB}kb.${ext || "jpg"}`;
  };

  const handleDownload = (job: FileJob) => {
    if (!job.blob) return;
    downloadBlob(job.blob, buildFilename(job));
  };

  const handleDownloadAll = async () => {
    const items = jobs.filter((job) => job.blob).map((job) => ({
      blob: job.blob as Blob,
      filename: buildFilename(job),
    }));
    if (items.length <= 1) return;
    await downloadZip(items, `compressed-${targetSizeKB}kb.zip`);
  };

  const totalSavings = useMemo(() => {
    const completed = jobs.filter((job) => job.blob);
    if (completed.length === 0) return 0;
    const original = completed.reduce((sum, job) => sum + job.file.size, 0);
    const compressed = completed.reduce(
      (sum, job) => sum + (job.blob?.size ?? 0),
      0
    );
    if (!original) return 0;
    return Math.max(0, Math.round(((original - compressed) / original) * 100));
  }, [jobs]);
  const totalSelectedSize = useMemo(
    () => selectedFiles.reduce((sum, file) => sum + file.size, 0),
    [selectedFiles],
  );
  const selectionInsights = useMemo(() => {
    const alreadyUnderTargetCount = selectedFiles.filter(
      (file) => file.size <= targetSizeBytes,
    ).length;
    const aggressiveCount = selectedFiles.filter(
      (file) => file.size / targetSizeBytes >= AGGRESSIVE_REDUCTION_RATIO,
    ).length;
    const extremeCount = selectedFiles.filter(
      (file) => file.size / targetSizeBytes >= EXTREME_REDUCTION_RATIO,
    ).length;

    return {
      alreadyUnderTargetCount,
      aggressiveCount,
      extremeCount,
    };
  }, [selectedFiles, targetSizeBytes]);
  const completedJobs = jobs.filter((job) => job.blob);
  const isBatchComplete = jobs.length > 0 && !isPending;
  const targetResults = useMemo(() => {
    const targetMetCount = completedJobs.filter(
      (job) => (job.blob?.size ?? 0) <= targetSizeBytes,
    ).length;
    const alreadyUnderTargetCount = completedJobs.filter(
      (job) => job.file.size <= targetSizeBytes,
    ).length;
    const bestEffortCount = completedJobs.filter(
      (job) => (job.blob?.size ?? 0) > targetSizeBytes,
    ).length;

    return {
      targetMetCount,
      alreadyUnderTargetCount,
      bestEffortCount,
    };
  }, [completedJobs, targetSizeBytes]);

  useEffect(() => {
    if (jobs.some((job) => job.status === "done")) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [jobs]);

  return (
    <div
      className="space-y-8"
      data-tool-active-image={
        selectedFiles.length > 0 || jobs.length > 0 ? "true" : undefined
      }
    >
      {selectedFiles.length === 0 && jobs.length === 0 && (
        <Uploader
          onFileSelect={(file) => {
            setSelectedFiles([file]);
            setJobs([]);
            setError(null);
          }}
          onFilesSelect={(files) => {
            setSelectedFiles(files);
            setJobs([]);
            setError(null);
          }}
          maxFiles={10}
          isProcessing={isPending}
          accept={{
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
            "image/webp": [".webp"],
            "image/avif": [".avif"],
          }}
        />
      )}

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {selectedFiles.length > 0 && jobs.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-secondary/30 p-6"
        >
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                {selectedFiles.length} file{selectedFiles.length > 1 ? "s" : ""} ready for {targetLabel}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Total size: {formatBytes(totalSelectedSize)}. Start compression
                when you want to target about {targetLabel} per file.
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <p className="rounded-xl border border-border/60 bg-background px-4 py-3 text-muted-foreground">
                  Target compression is best effort. Some images can reach{" "}
                  {targetLabel}, while others may stay larger to avoid extreme
                  quality loss.
                </p>
                {selectionInsights.alreadyUnderTargetCount > 0 && (
                  <p className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-sky-300">
                    {selectionInsights.alreadyUnderTargetCount} file
                    {selectionInsights.alreadyUnderTargetCount > 1 ? "s are" : " is"}{" "}
                    already at or below {targetLabel}. You may not need extra
                    compression for those.
                  </p>
                )}
                {selectionInsights.aggressiveCount > 0 && (
                  <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300">
                    {selectionInsights.extremeCount > 0
                      ? `${selectionInsights.extremeCount} file${selectionInsights.extremeCount > 1 ? "s need" : " needs"} extremely aggressive reduction to approach ${targetLabel}.`
                      : `${selectionInsights.aggressiveCount} file${selectionInsights.aggressiveCount > 1 ? "s need" : " needs"} aggressive compression to approach ${targetLabel}.`}{" "}
                    Quality may drop noticeably.
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {selectedFiles.map((file) => (
                <div
                  key={`${file.name}-${file.size}-${file.lastModified}`}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-background px-4 py-3"
                >
                  <p className="min-w-0 truncate text-sm font-medium text-foreground">
                    {file.name}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {formatBytes(file.size)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleProcess}
                className="flex-1 rounded-xl bg-primary px-6 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Compress to {targetLabel}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetSelection();
                }}
                className="rounded-xl border border-border bg-white px-6 py-4 font-bold text-foreground shadow-sm transition-all hover:bg-secondary"
              >
                Select Different Image{selectedFiles.length > 1 ? "s" : ""}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {jobs.length > 0 && (
        <motion.div
          ref={resultsRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/50 rounded-2xl"
        >
          {totalSavings > 0 && (
            <div className="mb-4 text-sm font-semibold text-green-600 dark:text-green-400">
              Saved {totalSavings}% total
            </div>
          )}
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Compression Results</h3>
          <p className="text-muted-foreground mb-6">
            Target size: {targetLabel}
          </p>
          {isBatchComplete && (
            <div className="mb-6 space-y-3 text-sm">
              <p className="rounded-xl border border-border/60 bg-background px-4 py-3 text-muted-foreground">
                This tool aims for {targetLabel} per file, but results depend on
                image detail, format, and how aggressively the file can be
                reduced without collapsing quality.
              </p>
              {completedJobs.length > 0 && (
                <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700 dark:border-green-900/60 dark:bg-green-950/30 dark:text-green-300">
                  {targetResults.targetMetCount} of {completedJobs.length} file
                  {completedJobs.length > 1 ? "s" : ""} reached {targetLabel}
                  {targetResults.alreadyUnderTargetCount > 0
                    ? `, including ${targetResults.alreadyUnderTargetCount} that were already below target.`
                    : "."}
                </p>
              )}
              {targetResults.bestEffortCount > 0 && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-left text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
                  <p className="font-semibold">
                    {targetResults.bestEffortCount} file
                    {targetResults.bestEffortCount > 1 ? "s could" : " could"} not
                    reach {targetLabel} exactly.
                  </p>
                  <p className="mt-1 text-sm">
                    Try resizing dimensions, cropping unused areas, or switching
                    to a more compression-friendly format first.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href="/resize-image"
                      className="rounded-full border border-amber-300/70 bg-white px-3 py-1.5 text-xs font-medium text-amber-800 transition-colors hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100 dark:hover:bg-amber-900/40"
                    >
                      Resize Image
                    </Link>
                    <Link
                      href="/crop-image"
                      className="rounded-full border border-amber-300/70 bg-white px-3 py-1.5 text-xs font-medium text-amber-800 transition-colors hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100 dark:hover:bg-amber-900/40"
                    >
                      Crop Image
                    </Link>
                    <Link
                      href="/convert-to-jpg"
                      className="rounded-full border border-amber-300/70 bg-white px-3 py-1.5 text-xs font-medium text-amber-800 transition-colors hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100 dark:hover:bg-amber-900/40"
                    >
                      Convert to JPG
                    </Link>
                    <Link
                      href="/convert-to-webp"
                      className="rounded-full border border-amber-300/70 bg-white px-3 py-1.5 text-xs font-medium text-amber-800 transition-colors hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100 dark:hover:bg-amber-900/40"
                    >
                      Convert to WebP
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="space-y-3 mb-6">
            {jobs.map((job) => (
              <div
                key={job.file.name}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-border/50 bg-secondary/30 px-4 py-3 text-left"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{job.file.name}</p>
                  {job.blob ? (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        {formatBytes(job.file.size)} →{" "}
                        <span className="text-green-600 dark:text-green-400 font-semibold">
                          {formatBytes(job.blob.size)}
                        </span>
                      </p>
                      <p className="text-xs">
                        {job.file.size <= targetSizeBytes ? (
                          <span className="font-medium text-sky-600 dark:text-sky-400">
                            Already under {targetLabel} before compression.
                          </span>
                        ) : job.blob.size <= targetSizeBytes ? (
                          <span className="font-medium text-green-600 dark:text-green-400">
                            Target reached.
                          </span>
                        ) : (
                          <span className="font-medium text-amber-600 dark:text-amber-400">
                            Best effort result. This file stayed above {targetLabel}.
                          </span>
                        )}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      {job.status === "failed"
                        ? (job.error ?? "Failed")
                        : "Processing..."}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-28 h-2 rounded-full bg-border/60 overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {job.progress}%
                  </span>
                  {job.blob && isBatchComplete && (
                    <button
                      onClick={() => handleDownload(job)}
                      className="px-3 py-2 text-sm font-semibold bg-primary text-white rounded-lg shadow hover:shadow-md transition-all"
                    >
                      Download
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {jobs.length > 1 ? (
              <button
                onClick={handleDownloadAll}
                disabled={!isBatchComplete || completedJobs.length <= 1}
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:shadow-none disabled:transform-none"
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
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:shadow-none disabled:transform-none"
              >
                Download Image
              </button>
            )}
            <button
              onClick={resetSelection}
              disabled={!isBatchComplete}
              className="px-8 py-4 bg-white text-foreground border border-border font-bold rounded-xl shadow-sm hover:bg-secondary transition-all disabled:opacity-50 disabled:hover:bg-white"
            >
              Compress Another
            </button>
          </div>
        </motion.div>
      )}

      {isPending && jobs.length > 0 && (
        <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Compressing {jobs.length} file{jobs.length > 1 ? "s" : ""}...
        </div>
      )}
    </div>
  );
}
