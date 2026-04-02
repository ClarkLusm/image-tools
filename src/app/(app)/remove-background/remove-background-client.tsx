"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Loader2, Scissors } from "lucide-react";
import { motion } from "framer-motion";
import { Uploader } from "@/app/components/shared/uploader";
import { useImageWorker } from "@/hooks/use-image-worker";
import { downloadBlob, formatBytes } from "@/lib/image-utils";

export default function RemoveBackgroundClient() {
  const [file, setFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [threshold, setThreshold] = useState(44);
  const [softness, setSoftness] = useState(18);
  const { processImage, isProcessing, error } = useImageWorker();

  const beforeUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  const afterUrl = useMemo(() => {
    if (!resultBlob) return null;
    return URL.createObjectURL(resultBlob);
  }, [resultBlob]);

  useEffect(() => {
    return () => {
      if (beforeUrl) URL.revokeObjectURL(beforeUrl);
    };
  }, [beforeUrl]);

  useEffect(() => {
    return () => {
      if (afterUrl) URL.revokeObjectURL(afterUrl);
    };
  }, [afterUrl]);

  const handleProcess = async () => {
    if (!file) return;
    setResultBlob(null);
    const blob = await processImage("remove-background", file, {
      background: { threshold, softness },
    });
    if (blob) setResultBlob(blob);
  };

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    const filename = file.name.replace(/\.[^/.]+$/, "") + "_no-bg.png";
    downloadBlob(resultBlob, filename);
  };

  return (
    <div
      className="space-y-8"
      data-tool-active-image={file ? "true" : undefined}
    >
      {!resultBlob && (
        <Uploader
          onFileSelect={(nextFile) => {
            setFile(nextFile);
            setResultBlob(null);
          }}
          accept={{
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
            "image/webp": [".webp"],
          }}
          isProcessing={isProcessing}
        />
      )}

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {file && !resultBlob && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-secondary/30 p-6"
        >
          <h3 className="font-semibold text-lg mb-5">Background Detection</h3>

          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="font-medium">Threshold</label>
                <span className="text-muted-foreground">{threshold}</span>
              </div>
              <input
                type="range"
                min={8}
                max={120}
                step={1}
                value={threshold}
                disabled={isProcessing}
                onChange={(event) => setThreshold(Number(event.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="font-medium">Edge Softness</label>
                <span className="text-muted-foreground">{softness}</span>
              </div>
              <input
                type="range"
                min={0}
                max={60}
                step={1}
                value={softness}
                disabled={isProcessing}
                onChange={(event) => setSoftness(Number(event.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>

          {beforeUrl && (
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-3">Preview input</p>
              <div className="rounded-xl border border-border bg-white/80 p-3">
                <img
                  src={beforeUrl}
                  alt="Uploaded preview"
                  className="max-h-64 w-auto mx-auto rounded-md object-contain"
                />
              </div>
            </div>
          )}

          <button
            onClick={handleProcess}
            disabled={isProcessing}
            className="mt-8 w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:transform-none flex justify-center items-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Removing background...
              </>
            ) : (
              <>
                <Scissors className="w-5 h-5" />
                Remove Background
              </>
            )}
          </button>
        </motion.section>
      )}

      {resultBlob && (
        <motion.section
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/50 rounded-2xl"
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Background Removed</h3>
          <p className="text-muted-foreground mb-6">
            Output file size:{" "}
            <span className="font-semibold">{formatBytes(resultBlob.size)}</span>
          </p>

          {afterUrl && (
            <div className="max-w-xl mx-auto mb-8 rounded-xl border border-border bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:12px_12px] p-4">
              <img
                src={afterUrl}
                alt="Result without background"
                className="max-h-72 w-auto mx-auto rounded-md object-contain"
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Download PNG
            </button>
            <button
              onClick={() => {
                setFile(null);
                setResultBlob(null);
              }}
              className="px-8 py-4 bg-white text-foreground border border-border font-bold rounded-xl shadow-sm hover:bg-secondary transition-all"
            >
              Process Another
            </button>
          </div>
        </motion.section>
      )}
    </div>
  );
}
