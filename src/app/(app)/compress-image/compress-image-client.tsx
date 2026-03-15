'use client';

import { useEffect, useRef, useState } from "react";
import { Download, Loader2, Gauge } from "lucide-react";
import { Uploader } from "@/app/components/shared/uploader";
import { downloadBlob, formatBytes } from "@/lib/image-utils";
import { downloadZip } from "@/lib/zip-utils";
import { motion } from "framer-motion";

export default function CompressImageClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<Blob[]>([]);
  const [quality, setQuality] = useState(80);
  const [isPending, setIsPending] = useState(false);
  const [progress, setProgress] = useState(0);
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

  const pollJob = async (jobId: string) => {
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

      setProgress(typeof data.progress === "number" ? data.progress : 0);

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

  const handleProcess = async () => {
    if (files.length === 0) return;
    setResults([]);
    setError(null);
    setIsPending(true);
    setProgress(0);

    try {
      const nextResults: Blob[] = [];
      for (const file of files) {
        const jobId = await createJob(file);
        const blob = await pollJob(jobId);
        nextResults.push(blob);
      }
      setResults(nextResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsPending(false);
      setProgress(0);
    }
  };

  const buildFilename = (index: number) => {
    const file = files[index];
    if (!file) return "compressed-image";
    const parts = file.name.split(".");
    const ext = parts.pop();
    const base = parts.join(".");
    return `${base}_compressed.${ext}`;
  };

  const handleDownload = (index: number) => {
    const blob = results[index];
    const file = files[index];
    if (!blob || !file) return;
    const filename = buildFilename(index);
    downloadBlob(blob, filename);
  };

  const handleDownloadAll = async () => {
    if (results.length <= 1) return;
    await downloadZip(
      results.map((blob, index) => ({
        blob,
        filename: buildFilename(index),
      })),
      "compressed-images.zip"
    );
  };

  const calculateSavings = (index: number) => {
    const file = files[index];
    const blob = results[index];
    if (!file || !blob) return 0;
    const saved = file.size - blob.size;
    return Math.max(0, Math.round((saved / file.size) * 100));
  };

  useEffect(() => {
    if (results.length === 0) return;
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [results.length]);

  return (
    <div className="space-y-8">
      {results.length === 0 && (
        <Uploader
          onFileSelect={(f) => setFiles([f])}
          onFilesSelect={(selected) => setFiles(selected)}
          isProcessing={isPending}
          maxFiles={10}
        />
      )}

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {files.length > 0 && results.length === 0 && (
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
                  quality <= 40
                    ? "text-primary font-bold"
                    : "text-muted-foreground"
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
                  quality >= 80
                    ? "text-primary font-bold"
                    : "text-muted-foreground"
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
            />

            <p className="text-center text-sm font-medium bg-background border border-border py-2 px-4 rounded-lg inline-block mx-auto">
              Quality: {quality}%
            </p>
          </div>

          <button
            onClick={handleProcess}
            disabled={isPending}
            className="mt-8 w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:transform-none flex justify-center items-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Compressing on
                server{progress ? ` (${progress}%)` : "..."}
              </>
            ) : (
              `Compress Image${files.length > 1 ? ` (${files.length} files)` : ""}`
            )}
          </button>
        </motion.div>
      )}

      {results.length > 0 && (
        <motion.div
          ref={resultsRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/50 rounded-2xl relative overflow-hidden"
        >
          {calculateSavings(0) > 0 && (
            <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
              Saved {calculateSavings(0)}%
            </div>
          )}

          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-6">Compression Complete!</h3>

          <div className="space-y-3 mb-8">
            {results.map((blob, index) => (
              <div
                key={`${files[index]?.name}-${index}`}
                className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-secondary/30 px-4 py-3 text-left"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {files[index]?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatBytes(files[index]?.size ?? 0)} →{" "}
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      {formatBytes(blob.size)}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => handleDownload(index)}
                  className="px-3 py-2 text-sm font-semibold bg-primary text-white rounded-lg shadow hover:shadow-md transition-all"
                >
                  Download
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {results.length > 1 ? (
              <button
                onClick={handleDownloadAll}
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Download All
              </button>
            ) : (
              <button
                onClick={() => handleDownload(0)}
                className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Download Image
              </button>
            )}
            <button
              onClick={() => {
                setFiles([]);
                setResults([]);
              }}
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
