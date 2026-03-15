"use client";

import { useEffect, useState } from "react";
import { Download, Loader2, SlidersHorizontal } from "lucide-react";
import { Uploader } from "@/app/components/shared/uploader";
import { downloadBlob, formatBytes, loadImage } from "@/lib/image-utils";
import { useImageWorker } from "@/hooks/use-image-worker";
import { motion } from "framer-motion";

export type ResizePreset = {
  label: string;
  width: number;
  height: number;
  description?: string;
};

type SocialResizeClientProps = {
  presets: ResizePreset[];
  defaultPresetIndex?: number;
  outputFormat?: "original" | "jpeg" | "png";
};

export default function SocialResizeClient({
  presets,
  defaultPresetIndex = 0,
  outputFormat = "original",
}: SocialResizeClientProps) {
  const [file, setFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(defaultPresetIndex);
  const [originalSize, setOriginalSize] = useState<{ width: number; height: number } | null>(null);

  const { processImage, isProcessing, error } = useImageWorker();

  useEffect(() => {
    if (!file) return;
    loadImage(file).then((img) => {
      setOriginalSize({ width: img.width, height: img.height });
    });
  }, [file]);

  const selectedPreset = presets[Math.min(selectedIndex, presets.length - 1)];

  const resolveMimeType = () => {
    if (outputFormat === "jpeg") return "image/jpeg";
    if (outputFormat === "png") return "image/png";
    return file?.type || "image/jpeg";
  };

  const handleProcess = async () => {
    if (!file || !selectedPreset) return;
    setResultBlob(null);

    const blob = await processImage("resize", file, {
      width: selectedPreset.width,
      height: selectedPreset.height,
      mimeType: resolveMimeType(),
    });

    if (blob) setResultBlob(blob);
  };

  const handleDownload = () => {
    if (!resultBlob || !file || !selectedPreset) return;
    const base = file.name.replace(/\.[^/.]+$/, "");
    const ext =
      outputFormat === "jpeg"
        ? "jpg"
        : outputFormat === "png"
          ? "png"
          : file.type.includes("png")
            ? "png"
            : "jpg";
    const filename = `${base}_${selectedPreset.width}x${selectedPreset.height}.${ext}`;
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
          isProcessing={isProcessing}
          accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
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
            <div>
              <h3 className="font-semibold text-lg">Choose Format</h3>
              {originalSize && (
                <p className="text-xs text-muted-foreground">
                  Original size: {originalSize.width} × {originalSize.height}px
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-muted-foreground">
              Preset
              <select
                value={selectedIndex}
                onChange={(e) => setSelectedIndex(Number(e.target.value))}
                className="mt-2 w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-all"
              >
                {presets.map((preset, index) => (
                  <option key={preset.label} value={index}>
                    {preset.label} — {preset.width}×{preset.height}
                  </option>
                ))}
              </select>
            </label>

            {selectedPreset?.description && (
              <p className="text-xs text-muted-foreground">
                {selectedPreset.description}
              </p>
            )}
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

      {resultBlob && selectedPreset && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/50 rounded-2xl"
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Resize Complete!</h3>
          <p className="text-muted-foreground mb-8">
            New size: {selectedPreset.width}×{selectedPreset.height}px. File
            size:{" "}
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
