"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Download,
  Loader2,
  RefreshCcw,
  Settings2,
  CheckCircle2,
} from "lucide-react";
import dynamic from "next/dynamic";
import type { Crop, PixelCrop } from "react-image-crop";
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

function buildCenteredCrop(
  width: number,
  height: number,
  aspect?: number,
): Crop {
  if (aspect && aspect > 0) {
    let cropWidth = width;
    let cropHeight = cropWidth / aspect;

    if (cropHeight > height) {
      cropHeight = height;
      cropWidth = cropHeight * aspect;
    }

    const x = Math.round((width - cropWidth) / 2);
    const y = Math.round((height - cropHeight) / 2);

    return {
      unit: "px",
      x,
      y,
      width: Math.round(cropWidth),
      height: Math.round(cropHeight),
    };
  }

  const cropWidth = Math.round(width * 0.8);
  const cropHeight = Math.round(height * 0.8);

  return {
    unit: "px",
    width: cropWidth,
    height: cropHeight,
    x: Math.round((width - cropWidth) / 2),
    y: Math.round((height - cropHeight) / 2),
  };
}

export default function CropImageClient() {
  const [file, setFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [aspect, setAspect] = useState<number>(0);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [uploaderKey, setUploaderKey] = useState(0);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const cropFrameRef = useRef<number | null>(null);

  const { processImage, isProcessing, error } = useImageWorker();
  const imageUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  );

  useEffect(() => {
    if (!imageUrl) return;

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  useEffect(() => {
    return () => {
      if (cropFrameRef.current !== null) {
        window.cancelAnimationFrame(cropFrameRef.current);
      }
    };
  }, []);

  const applyFileSelection = (nextFile: File) => {
    setFile(nextFile);
    setResultBlob(null);
    setCrop(undefined);
    setCompletedCrop(null);
    setDimensions(null);

    loadImage(nextFile).then((img) => {
      setDimensions({ width: img.width, height: img.height });
    });
  };

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

  const syncCenteredCrop = (
    imageElement: HTMLImageElement,
    aspectRatio?: number,
  ) => {
    if (cropFrameRef.current !== null) {
      window.cancelAnimationFrame(cropFrameRef.current);
    }

    cropFrameRef.current = window.requestAnimationFrame(() => {
      const { width, height } = imageElement.getBoundingClientRect();
      const renderWidth = Math.round(width);
      const renderHeight = Math.round(height);

      if (!renderWidth || !renderHeight) {
        return;
      }

      const nextCrop = buildCenteredCrop(
        renderWidth,
        renderHeight,
        aspectRatio,
      );
      setCrop(nextCrop);
      setCompletedCrop(nextCrop as PixelCrop);
    });
  };

  const resetCrop = () => {
    if (!imageRef.current) return;
    syncCenteredCrop(imageRef.current, aspect || undefined);
  };

  useEffect(() => {
    if (!imageRef.current) return;
    syncCenteredCrop(imageRef.current, aspect || undefined);
  }, [aspect]);

  const cropKey = `${aspect || "free"}-${imageUrl ?? "empty"}`;

  return (
    <div
      className="space-y-8"
      data-tool-active-image={file ? "true" : undefined}
    >
      {!resultBlob && (
        <Uploader
          key={uploaderKey}
          onFileSelect={applyFileSelection}
          accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
          isProcessing={isProcessing}
          previewLabel="Crop Preview"
          interactivePreview
          previewContent={
            file && imageUrl ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-5">
                <ReactCrop
                  key={cropKey}
                  crop={crop}
                  onChange={(next) => setCrop(next)}
                  onComplete={(pixelCrop) => setCompletedCrop(pixelCrop)}
                  aspect={aspect || undefined}
                  className="inline-flex max-w-full items-center justify-center max-h-[360px] sm:max-h-[440px] lg:max-h-[520px] xl:max-h-[600px] [&>.ReactCrop__child-wrapper]:inline-block [&>.ReactCrop__child-wrapper]:w-auto [&>.ReactCrop__child-wrapper]:max-w-full"
                  keepSelection
                >
                  <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="Crop preview"
                    onLoad={(event) => {
                      syncCenteredCrop(
                        event.currentTarget,
                        aspect || undefined,
                      );
                    }}
                    className="mx-auto h-auto w-auto max-w-full object-contain"
                  />
                </ReactCrop>
              </div>
            ) : undefined
          }
          aside={
            file ? (
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <Settings2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-semibold text-foreground">
                      Crop Settings
                    </h3>
                  </div>
                </div>

                {dimensions ? (
                  <div className="flex justify-between items-center mb-6 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Original size
                    </p>
                    <p className="mt-2 text-md font-semibold text-foreground">
                      {dimensions.width} × {dimensions.height}px
                    </p>
                  </div>
                ) : null}

                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Aspect Ratio
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {aspectOptions.map((option) => {
                      const isActive = aspect === option.value;

                      return (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => setAspect(option.value)}
                          className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                            isActive
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-white text-foreground hover:border-primary/30 hover:bg-primary/5"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3 rounded-xl border border-border/70 bg-white px-4 py-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Crop area
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {cropDetails
                          ? `${cropDetails} selected`
                          : "Drag the crop box to choose the exact framing."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleProcess}
                    disabled={isProcessing || !completedCrop}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:transform-none"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Cropping in background...
                      </>
                    ) : (
                      "Crop Image"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={resetCrop}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 py-4 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    Reset Crop
                  </button>
                </div>
              </div>
            ) : undefined
          }
        />
      )}

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {resultBlob && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/50 rounded-xl"
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
const ReactCrop = dynamic(() => import("react-image-crop"), { ssr: false });
