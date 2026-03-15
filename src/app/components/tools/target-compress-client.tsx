"use client";

import { useEffect, useState } from "react";
import { Download, Loader2, Target } from "lucide-react";
import { Uploader } from "@/app/components/shared/uploader";
import { downloadBlob, formatBytes } from "@/lib/image-utils";
import { motion } from "framer-motion";

type TargetCompressClientProps = {
  targetSizeKB: number;
  targetLabel: string;
};

export default function TargetCompressClient({
  targetSizeKB,
  targetLabel,
}: TargetCompressClientProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<Blob[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const createJob = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("targetSizeKB", String(targetSizeKB));

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

  const handleDownload = (index: number) => {
    const blob = results[index];
    const file = files[index];
    if (!blob || !file) return;
    const parts = file.name.split(".");
    const ext = parts.pop();
    const base = parts.join(".");
    const filename = `${base}_${targetSizeKB}kb.${ext || "jpg"}`;
    downloadBlob(blob, filename);
  };

  const handleDownloadAll = () => {
    results.forEach((_, index) => handleDownload(index));
  };

  return (
    <div className="space-y-8">
      {results.length === 0 && (
        <Uploader
          onFileSelect={(f) => setFiles([f])}
          onFilesSelect={(selected) => setFiles(selected)}
          maxFiles={10}
          isProcessing={isPending}
          accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
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
            <Target className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold text-lg">Target Size</h3>
              <p className="text-xs text-muted-foreground">
                Compress to approximately {targetLabel}.
              </p>
            </div>
          </div>

          <button
            onClick={handleProcess}
            disabled={isPending}
            className="mt-2 w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:transform-none flex justify-center items-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Compressing on
                server{progress ? ` (${progress}%)` : "..."}
              </>
            ) : (
              `Compress to ${targetLabel}${files.length > 1 ? ` (${files.length} files)` : ""}`
            )}
          </button>
        </motion.div>
      )}

      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/50 rounded-2xl"
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Compression Complete!</h3>
          <p className="text-muted-foreground mb-6">
            Compressed {results.length} file{results.length > 1 ? "s" : ""}.
          </p>

          <div className="space-y-3 mb-6">
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
                    {formatBytes(blob.size)}
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
            <button
              onClick={handleDownloadAll}
              className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Download All
            </button>
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
