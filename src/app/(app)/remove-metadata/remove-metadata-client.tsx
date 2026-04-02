"use client";

import { useState } from "react";
import { Download, Loader2, ShieldAlert } from "lucide-react";
import { Uploader } from "@/app/components/shared/uploader";
import { downloadBlob, formatBytes } from "@/lib/image-utils";
import { useImageWorker } from "@/hooks/use-image-worker";
import { motion } from "framer-motion";

export default function RemoveMetadataClient() {
  const [file, setFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const { processImage, isProcessing, error } = useImageWorker();

  const handleProcess = async () => {
    if (!file) return;
    setResultBlob(null);
    const blob = await processImage("remove-metadata", file, {
      mimeType: file.type || "image/jpeg",
    });
    if (blob) setResultBlob(blob);
  };

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    const parts = file.name.split(".");
    const ext = parts.pop();
    const base = parts.join(".");
    downloadBlob(resultBlob, `${base}_clean.${ext}`);
  };

  return (
    <div className="space-y-8">
      {!resultBlob && (
        <Uploader
          onFileSelect={(f) => {
            setFile(f);
            setResultBlob(null);
          }}
          isProcessing={isProcessing}
          accept={{
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
            "image/webp": [".webp"],
          }}
        />
      )}

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {file && !resultBlob && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 bg-orange-50 dark:bg-orange-950/20 rounded-2xl border border-orange-200 dark:border-orange-900/50 text-center"
        >
          <div className="inline-flex p-3 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-full mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-xl mb-2">
            Ready to Clean
          </h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            This process will permanently delete camera models, dates, and GPS
            coordinates hidden inside this file.
          </p>

          <button
            onClick={handleProcess}
            disabled={isProcessing}
            className="w-full sm:w-auto px-12 py-4 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:transform-none flex justify-center items-center gap-2 mx-auto"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Scrubbing in
                background...
              </>
            ) : (
              "Remove All Metadata"
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
          <h3 className="text-2xl font-bold mb-2">Image is 100% Clean!</h3>
          <p className="text-muted-foreground mb-8">
            All personal metadata has been stripped. File size:{" "}
            <span className="font-semibold">
              {formatBytes(resultBlob.size)}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Download Safe Image
            </button>
            <button
              onClick={() => {
                setFile(null);
                setResultBlob(null);
              }}
              className="px-8 py-4 bg-white text-foreground border border-border font-bold rounded-xl shadow-sm hover:bg-secondary transition-all"
            >
              Clean Another
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
