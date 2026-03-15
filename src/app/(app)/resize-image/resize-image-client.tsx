"use client";

import { useEffect, useState } from "react";
import { Download, Loader2, Settings, Lock, Unlock } from "lucide-react";
import { Uploader } from "@/app/components/shared/uploader";
import { downloadBlob, formatBytes, loadImage } from "@/lib/image-utils";
import { useImageWorker } from "@/hooks/use-image-worker";
import { motion } from "framer-motion";

export default function ResizeImageClient() {
  const [file, setFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [originalRatio, setOriginalRatio] = useState(1);

  const { processImage, isProcessing, error } = useImageWorker();

  useEffect(() => {
    if (file) {
      loadImage(file).then((img) => {
        setWidth(img.width);
        setHeight(img.height);
        setOriginalRatio(img.width / img.height);
      });
    }
  }, [file]);

  const handleWidthChange = (val: string) => {
    const w = parseInt(val) || 0;
    setWidth(w);
    if (maintainRatio && w > 0) {
      setHeight(Math.round(w / originalRatio));
    }
  };

  const handleHeightChange = (val: string) => {
    const h = parseInt(val) || 0;
    setHeight(h);
    if (maintainRatio && h > 0) {
      setWidth(Math.round(h * originalRatio));
    }
  };

  const handleProcess = async () => {
    if (!file || width <= 0 || height <= 0) return;
    setResultBlob(null);
    const blob = await processImage("resize", file, {
      width,
      height,
      mimeType: file.type || "image/jpeg",
    });
    if (blob) setResultBlob(blob);
  };

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    const parts = file.name.split(".");
    const ext = parts.pop();
    const base = parts.join(".");
    downloadBlob(resultBlob, `${base}_${width}x${height}.${ext}`);
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
        />
      )}

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {file && !resultBlob && width > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-secondary/30 rounded-2xl border border-border"
        >
          <div className="flex items-center gap-4 mb-6">
            <Settings className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Dimensions (Pixels)</h3>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 w-full space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Width
              </label>
              <input
                type="number"
                value={width || ""}
                onChange={(e) => handleWidthChange(e.target.value)}
                className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-all"
              />
            </div>

            <div className="flex flex-col items-center gap-2 pt-6">
              <button
                onClick={() => setMaintainRatio(!maintainRatio)}
                className={`p-2 rounded-full transition-colors ${maintainRatio ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                title={
                  maintainRatio ? "Unlock aspect ratio" : "Lock aspect ratio"
                }
              >
                {maintainRatio ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <Unlock className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex-1 w-full space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Height
              </label>
              <input
                type="number"
                value={height || ""}
                onChange={(e) => handleHeightChange(e.target.value)}
                className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-all"
              />
            </div>
          </div>

          <button
            onClick={handleProcess}
            disabled={isProcessing}
            className="mt-8 w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:transform-none flex justify-center items-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Resizing in
                background...
              </>
            ) : (
              "Resize Image"
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
          <h3 className="text-2xl font-bold mb-2">
            Image Resized Successfully!
          </h3>
          <p className="text-muted-foreground mb-8">
            Your image is ready at {width}x{height}px. Size:{" "}
            <span className="font-semibold">
              {formatBytes(resultBlob.size)}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Download Image
            </button>
            <button
              onClick={() => {
                setFile(null);
                setResultBlob(null);
              }}
              className="px-8 py-4 bg-white text-foreground border border-border font-bold rounded-xl shadow-sm hover:bg-secondary transition-all"
            >
              Resize Another
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
