"use client";

import { useState } from "react";
import { Download, Loader2, SlidersHorizontal } from "lucide-react";
import { Uploader } from "@/app/components/shared/uploader";
import { downloadBlob, formatBytes } from "@/lib/image-utils";
import { useImageWorker } from "@/hooks/use-image-worker";
import { motion } from "framer-motion";

type ConvertTask = "convert-to-jpg" | "convert-to-webp" | "convert-to-png";

type FormatConvertClientProps = {
  task: ConvertTask;
  accept: Record<string, string[]>;
  outputExt: string;
  outputMime: string;
  qualityDefault?: number;
  showQuality?: boolean;
  buttonLabel: string;
  note?: string;
};

export default function FormatConvertClient({
  task,
  accept,
  outputExt,
  outputMime,
  qualityDefault = 0.9,
  showQuality = true,
  buttonLabel,
  note,
}: FormatConvertClientProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<Blob[]>([]);
  const [status, setStatus] = useState<("idle" | "processing" | "done")>(
    "idle"
  );
  const [quality, setQuality] = useState(qualityDefault);

  const { processImage, isProcessing, error } = useImageWorker();

  const handleProcess = async () => {
    if (files.length === 0) return;
    setResults([]);
    setStatus("processing");

    const nextResults: Blob[] = [];
    for (const file of files) {
      const blob = await processImage(task, file, {
        quality,
        mimeType: outputMime,
        fillWhite: outputMime === "image/jpeg",
      });
      if (blob) nextResults.push(blob);
    }

    setResults(nextResults);
    setStatus("done");
  };

  const handleDownload = (index: number) => {
    const blob = results[index];
    const file = files[index];
    if (!blob || !file) return;
    const filename = file.name.replace(/\.[^/.]+$/, "") + outputExt;
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
          accept={accept}
          isProcessing={isProcessing}
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
          {showQuality && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Quality Settings</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Quality</label>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(quality * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.01"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
                {note && (
                  <p className="text-xs text-muted-foreground">{note}</p>
                )}
              </div>
            </>
          )}

          {!showQuality && note && (
            <p className="text-sm text-muted-foreground">{note}</p>
          )}

          <button
            onClick={handleProcess}
            disabled={isProcessing}
            className="mt-8 w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:transform-none flex justify-center items-center gap-2"
          >
            {isProcessing || status === "processing" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Converting in
                background...
              </>
            ) : (
              `${buttonLabel}${files.length > 1 ? ` (${files.length} files)` : ""}`
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
          <h3 className="text-2xl font-bold mb-2">Conversion Complete!</h3>
          <p className="text-muted-foreground mb-6">
            Converted {results.length} file{results.length > 1 ? "s" : ""}.
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
                setStatus("idle");
              }}
              className="px-8 py-4 bg-white text-foreground border border-border font-bold rounded-xl shadow-sm hover:bg-secondary transition-all"
            >
              Convert Another
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
