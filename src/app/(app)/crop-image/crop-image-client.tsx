"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Loader2, Crop as CropIcon } from "lucide-react";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Uploader } from "@/app/components/shared/uploader";
import { downloadBlob, formatBytes, loadImage } from "@/lib/image-utils";
import { useImageWorker } from "@/hooks/use-image-worker";
import { motion } from "framer-motion";

const aspectOptions = [
  { label: "Free", value: 0 },
  { label: "1:1", value: 1 },
  { label: "4:5", value: 4 / 5 },
  { label: "16:9", value: 16 / 9 },
  { label: "9:16", value: 9 / 16 },
];

export default function CropImageClient() {
  const [file, setFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [aspect, setAspect] = useState<number>(0);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const { processImage, isProcessing, error } = useImageWorker();

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    loadImage(file).then((img) => {
      setDimensions({ width: img.width, height: img.height });
    });
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleProcess = async () => {
    if (!file || !completedCrop || !imageRef.current) return;
    setResultBlob(null);

    const { naturalWidth, naturalHeight, width, height } = imageRef.current;
    const scaleX = naturalWidth / width;
    const scaleY = naturalHeight / height;
    const cropPixels = {
      x: Math.round(completedCrop.x * scaleX),
      y: Math.round(completedCrop.y * scaleY),
      width: Math.round(completedCrop.width * scaleX),
      height: Math.round(completedCrop.height * scaleY),
    };

    const blob = await processImage("crop", file, {
      crop: cropPixels,
      mimeType: file.type || "image/png",
    });

    if (blob) setResultBlob(blob);
  };

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    const mimeType = file.type || "image/png";
    const ext = mimeType.includes("jpeg")
      ? "jpg"
      : mimeType.includes("webp")
        ? "webp"
        : "png";
    const filename = file.name.replace(/\.[^/.]+$/, "") + `_crop.${ext}`;
    downloadBlob(resultBlob, filename);
  };

  const cropDetails = useMemo(() => {
    if (!completedCrop) return null;
    return `${Math.round(completedCrop.width)} × ${Math.round(completedCrop.height)}px`;
  }, [completedCrop]);

  const buildDefaultCrop = (img: HTMLImageElement) => {
    const width = img.width;
    const height = img.height;
    const cropWidth = Math.round(width * 0.8);
    const cropHeight = Math.round(height * 0.8);
    return {
      unit: "px" as const,
      width: cropWidth,
      height: cropHeight,
      x: Math.round((width - cropWidth) / 2),
      y: Math.round((height - cropHeight) / 2),
    };
  };

  const resetCrop = () => {
    if (!imageRef.current) return;
    setCrop(buildDefaultCrop(imageRef.current));
    setCompletedCrop(buildDefaultCrop(imageRef.current));
  };

  return (
    <div className="space-y-8">
      {!resultBlob && (
        <Uploader
          onFileSelect={(f) => {
            setFile(f);
            setResultBlob(null);
            setCrop(undefined);
            setCompletedCrop(null);
          }}
          accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
          isProcessing={isProcessing}
        />
      )}

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {file && !resultBlob && imageUrl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-secondary/30 rounded-2xl border border-border space-y-6"
        >
          <div className="flex items-center gap-4">
            <CropIcon className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold text-lg">Drag to Crop</h3>
              {dimensions && (
                <p className="text-xs text-muted-foreground">
                  Original size: {dimensions.width} × {dimensions.height}px
                </p>
              )}
            </div>
          </div>

          <div className="relative w-full rounded-2xl overflow-hidden bg-black/90 border border-border p-4">
            <ReactCrop
              crop={crop}
              onChange={(next) => setCrop(next)}
              onComplete={(pixelCrop) => setCompletedCrop(pixelCrop)}
              aspect={aspect || undefined}
              className="max-h-[420px] w-full"
              keepSelection
            >
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Crop preview"
                onLoad={(event) => {
                  const img = event.currentTarget;
                  setCrop(buildDefaultCrop(img));
                }}
                className="max-h-[420px] w-full object-contain"
              />
            </ReactCrop>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-muted-foreground">
              Aspect Ratio
              <select
                value={aspect}
                onChange={(e) => setAspect(Number(e.target.value))}
                className="mt-2 w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-all"
              >
                {aspectOptions.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="text-sm text-muted-foreground flex flex-col justify-between">
              <span>Drag the corners or edges to resize the crop box.</span>
              <span className="text-xs">
                Tip: Hold shift to keep the ratio when Free is selected.
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {cropDetails ? `Crop size: ${cropDetails}` : "Set crop area."}
            </span>
            <button
              type="button"
              onClick={resetCrop}
              className="text-primary hover:underline"
            >
              Reset crop
            </button>
          </div>

          <button
            onClick={handleProcess}
            disabled={isProcessing || !completedCrop}
            className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:transform-none flex justify-center items-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Cropping in
                background...
              </>
            ) : (
              "Crop Image"
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
          <h3 className="text-2xl font-bold mb-2">Crop Complete!</h3>
          <p className="text-muted-foreground mb-8">
            New size:{" "}
            <span className="font-semibold">
              {formatBytes(resultBlob.size)}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Download Cropped Image
            </button>
            <button
              onClick={() => {
                setFile(null);
                setResultBlob(null);
              }}
              className="px-8 py-4 bg-white text-foreground border border-border font-bold rounded-xl shadow-sm hover:bg-secondary transition-all"
            >
              Crop Another
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
