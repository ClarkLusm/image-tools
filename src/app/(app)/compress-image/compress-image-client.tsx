'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Loader2, Gauge } from "lucide-react";
import { Uploader } from "@/app/components/shared/uploader";
import { downloadBlob, formatBytes } from "@/lib/image-utils";
import { downloadZip } from "@/lib/zip-utils";
import { motion } from "framer-motion";

type FileJob = {
  file: File;
  status: "pending" | "processing" | "done" | "failed";
  progress: number;
  blob?: Blob;
  error?: string;
};

export default function CompressImageClient() {
  const [jobs, setJobs] = useState<FileJob[]>([]);
  const [quality, setQuality] = useState(80);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const createJob = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("quality", String(quality));

    const response = await fetch("/api/compress-image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      throw new Error(data?.error ?? "Failed to create compression job.");
    }

    const data = (await response.json()) as { jobId?: string };
    if (!data.jobId) {
      throw new Error("Missing job id from server.");
    }

    return data.jobId;
  };

  const pollJob = async (jobId: string, index: number) => {
    while (true) {
      const response = await fetch(`/api/jobs/${jobId}`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to check job status.");
      }
      const data = (await response.json()) as {
        status?: string;
        progress?: number;
        error?: string;
        downloadUrl?: string;
      };

      setJobs((prev) =>
        prev.map((job, idx) =>
          idx === index
            ? {
                ...job,
                progress: typeof data.progress === "number" ? data.progress : 0,
              }
            : job
        )
      );

      if (data.status === "failed") {
        throw new Error(data.error ?? "Compression failed.");
      }

      if (data.status === "completed") {
        const downloadResponse = await fetch(
          data.downloadUrl ?? `/api/jobs/${jobId}/download`
        );
        if (!downloadResponse.ok) {
          throw new Error("Failed to download compressed file.");
        }
        return downloadResponse.blob();
      }

      await wait(1200);
    }
  };

  const handleProcess = async (incomingFiles: File[]) => {
    if (incomingFiles.length === 0) return;
    setError(null);
    setIsPending(true);

    const initialJobs: FileJob[] = incomingFiles.map((file) => ({
      file,
      status: "pending",
      progress: 0,
    }));
    setJobs(initialJobs);

    try {
      for (let i = 0; i < incomingFiles.length; i += 1) {
        setJobs((prev) =>
          prev.map((job, idx) =>
            idx === i ? { ...job, status: "processing" } : job
          )
        );

        const jobId = await createJob(incomingFiles[i]);
        const blob = await pollJob(jobId, i);

        setJobs((prev) =>
          prev.map((job, idx) =>
            idx === i ? { ...job, status: "done", blob, progress: 100 } : job
          )
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
      setJobs((prev) =>
        prev.map((job) =>
          job.status === "processing" ? { ...job, status: "failed" } : job
        )
      );
    } finally {
      setIsPending(false);
    }
  };

  const buildFilename = (job: FileJob) => {
    const parts = job.file.name.split(".");
    const ext = parts.pop();
    const base = parts.join(".");
    return `${base}_compressed.${ext}`;
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
    await downloadZip(items, "compressed-images.zip");
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

  useEffect(() => {
    if (jobs.some((job) => job.status === "done")) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [jobs]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-secondary/30 rounded-2xl border border-border"
      >
        <div className="flex items-center gap-4 mb-6">
          <Gauge className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Compression Level</h3>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between text-sm font-medium">
            <span
              className={
                quality <= 40 ? "text-primary font-bold" : "text-muted-foreground"
              }
            >
              High Compression
            </span>
            <span
              className={
                quality > 40 && quality < 80
                  ? "text-primary font-bold"
                  : "text-muted-foreground"
              }
            >
              Balanced
            </span>
            <span
              className={
                quality >= 80 ? "text-primary font-bold" : "text-muted-foreground"
              }
            >
              High Quality
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="100"
            value={quality}
            onChange={(e) => setQuality(parseInt(e.target.value))}
            className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
            disabled={isPending}
          />

          <p className="text-center text-sm font-medium bg-background border border-border py-2 px-4 rounded-lg inline-block mx-auto">
            Quality: {quality}%
          </p>
        </div>
      </motion.div>

      <Uploader
        onFileSelect={(f) => handleProcess([f])}
        onFilesSelect={(selected) => handleProcess(selected)}
        isProcessing={isPending}
        maxFiles={10}
      />

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {jobs.length > 0 && (
        <motion.div
          ref={resultsRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/50 rounded-2xl relative overflow-hidden"
        >
          {totalSavings > 0 && (
            <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
              Saved {totalSavings}%
            </div>
          )}

          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-6">Compression Results</h3>

          <div className="space-y-3 mb-8">
            {jobs.map((job) => (
              <div
                key={job.file.name}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-border/50 bg-secondary/30 px-4 py-3 text-left"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{job.file.name}</p>
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
                        ? "Failed"
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
                  {job.blob && (
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
            {jobs.filter((job) => job.blob).length > 1 ? (
              <button
                onClick={handleDownloadAll}
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Download All (ZIP)
              </button>
            ) : (
              <button
                onClick={() => handleDownload(jobs[0])}
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Download Image
              </button>
            )}
            <button
              onClick={() => setJobs([])}
              className="px-8 py-4 bg-white text-foreground border border-border font-bold rounded-xl shadow-sm hover:bg-secondary transition-all"
            >
              Compress Another
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
