"use client";

import { useState } from "react";
import { Download, Loader2, SlidersHorizontal } from "lucide-react";
import { Uploader } from "@/app/components/shared/uploader";
import { downloadBlob, formatBytes } from "@/lib/image-utils";
import { useImageWorker } from "@/hooks/use-image-worker";
import { motion } from "framer-motion";

export default function ConvertToJpgClient() {
  const [file, setFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [quality, setQuality] = useState(0.92);

  const { processImage, isProcessing, error } = useImageWorker();

  const handleProcess = async () => {
    if (!file) return;
    setResultBlob(null);

    const blob = await processImage("convert-to-jpg", file, {
      quality,
      fillWhite: true,
    });

    if (blob) setResultBlob(blob);
  };

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    const filename = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
    downloadBlob(resultBlob, filename);
  };

  return (
    <div className="space-y-8">
      {!resultBlob && (
        <Uploader
          onFileSelect={(f) => {
            setFile(f);
            setResultBlob(null);
          }}
          accept={{
            "image/png": [".png"],
            "image/webp": [".webp"],
            "image/gif": [".gif"],
          }}
          isProcessing={isProcessing}
        />
      )}

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {file && !resultBlob && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-secondary/30 rounded-2xl border border-border"
        >
          <div className="flex items-center gap-4 mb-6">
            <SlidersHorizontal className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">JPG Quality</h3>
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
            <p className="text-xs text-muted-foreground">
              Lower quality produces smaller files.
            </p>
          </div>

          <button
            onClick={handleProcess}
            disabled={isProcessing}
            className="mt-8 w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:transform-none flex justify-center items-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Converting in
                background...
              </>
            ) : (
              "Convert to JPG"
            )}
          </button>
        </motion.div>
      )}

      {resultBlob && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/50 rounded-2xl"
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Conversion Complete!</h3>
          <p className="text-muted-foreground mb-8">
            Your image is ready. New size:{" "}
            <span className="font-semibold">
              {formatBytes(resultBlob.size)}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Download JPG
            </button>
            <button
              onClick={() => {
                setFile(null);
                setResultBlob(null);
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
