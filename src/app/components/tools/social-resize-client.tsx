"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Download,
  Loader2,
  RefreshCcw,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { Uploader } from "@/app/components/shared/uploader";
import { downloadBlob, formatBytes, loadImage } from "@/lib/image-utils";
import { useImageWorker } from "@/hooks/use-image-worker";
import { motion } from "framer-motion";

const ReactCrop = dynamic(() => import("react-image-crop"), { ssr: false });

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
  instagramOptimization?: boolean;
  presetPicker?: "select" | "cards";
};

function getFittedDimensions(
  ratio: number,
  maxWidth: number,
  maxHeight: number,
) {
  let height = maxHeight;
  let width = maxHeight * ratio;

  if (width > maxWidth) {
    width = maxWidth;
    height = maxWidth / ratio;
  }

  return { width, height };
}

function buildCenteredCrop(
  width: number,
  height: number,
  aspect: number,
): Crop {
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

export default function SocialResizeClient({
  presets,
  defaultPresetIndex = 0,
  outputFormat = "original",
  instagramOptimization = false,
  presetPicker = "cards",
}: SocialResizeClientProps) {
  const [file, setFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(defaultPresetIndex);
  const [autoOptimize, setAutoOptimize] = useState(instagramOptimization);
  const [optimizationSummary, setOptimizationSummary] = useState<string | null>(
    null,
  );
  const [originalSize, setOriginalSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const cropFrameRef = useRef<number | null>(null);

  const { processImage, isProcessing, error } = useImageWorker();

  const selectedPreset = presets[Math.min(selectedIndex, presets.length - 1)];
  const selectedAspect = selectedPreset.width / selectedPreset.height;

  useEffect(() => {
    if (!file) return;
    loadImage(file).then((img) => {
      setOriginalSize({ width: img.width, height: img.height });
    });
  }, [file]);

  useEffect(() => {
    return () => {
      if (cropFrameRef.current !== null) {
        window.cancelAnimationFrame(cropFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const syncCenteredCrop = (imageElement: HTMLImageElement, aspect: number) => {
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

      const nextCrop = buildCenteredCrop(renderWidth, renderHeight, aspect);
      setCrop(nextCrop);
      setCompletedCrop(nextCrop as PixelCrop);
    });
  };

  useEffect(() => {
    if (!imageRef.current) return;
    syncCenteredCrop(imageRef.current, selectedAspect);
  }, [selectedAspect]);

  const applyFileSelection = (nextFile: File) => {
    setPreviewUrl((currentPreviewUrl) => {
      if (currentPreviewUrl) {
        URL.revokeObjectURL(currentPreviewUrl);
      }

      return URL.createObjectURL(nextFile);
    });
    setFile(nextFile);
    setResultBlob(null);
    setOptimizationSummary(null);
    setCrop(undefined);
    setCompletedCrop(null);
    setOriginalSize(null);
  };

  const resolveMimeType = () => {
    if (outputFormat === "jpeg") return "image/jpeg";
    if (outputFormat === "png") return "image/png";
    return file?.type || "image/jpeg";
  };

  const resetCrop = () => {
    if (!imageRef.current) return;
    syncCenteredCrop(imageRef.current, selectedAspect);
  };

  const handleProcess = async () => {
    if (!file || !selectedPreset || !completedCrop || !imageRef.current) return;
    setResultBlob(null);
    setOptimizationSummary(null);

    const { naturalWidth, naturalHeight, width, height } = imageRef.current;
    const scaleX = naturalWidth / width;
    const scaleY = naturalHeight / height;
    const cropPixels = {
      x: Math.round(completedCrop.x * scaleX),
      y: Math.round(completedCrop.y * scaleY),
      width: Math.round(completedCrop.width * scaleX),
      height: Math.round(completedCrop.height * scaleY),
    };

    const croppedBlob = await processImage("crop", file, {
      crop: cropPixels,
      mimeType: file.type || "image/png",
      fillWhite: (file.type || "image/png") === "image/jpeg",
    });

    if (!croppedBlob) return;

    const croppedFile = new File([croppedBlob], `${file.name}-ig-crop`, {
      type: croppedBlob.type || file.type || "image/png",
    });

    const resizedBlob = await processImage("resize", croppedFile, {
      width: selectedPreset.width,
      height: selectedPreset.height,
      mimeType: resolveMimeType(),
      fillWhite: resolveMimeType() === "image/jpeg",
    });

    if (!resizedBlob) return;

    let finalBlob = resizedBlob;

    if (instagramOptimization && autoOptimize) {
      const resizedAsFile = new File(
        [resizedBlob],
        `${file.name}-ig-resized.jpg`,
        {
          type: "image/jpeg",
        },
      );

      const optimized = await processImage("convert-to-jpg", resizedAsFile, {
        quality: 0.88,
        fillWhite: true,
      });

      if (optimized) {
        finalBlob = optimized;

        if (optimized.size > 1200 * 1024) {
          const secondPassFile = new File(
            [optimized],
            `${file.name}-ig-pass2.jpg`,
            {
              type: "image/jpeg",
            },
          );

          const secondPass = await processImage(
            "convert-to-jpg",
            secondPassFile,
            {
              quality: 0.82,
              fillWhite: true,
            },
          );

          if (secondPass) {
            finalBlob = secondPass;
          }
        }

        setOptimizationSummary(
          "Auto-optimized for Instagram: cropped to the selected format, resized to the target dimensions, then exported as JPEG with smart quality tuning.",
        );
      }
    }

    setResultBlob(finalBlob);
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

  const renderLiveCropPreview = () => {
    if (!previewUrl || !selectedPreset) return null;
    const cropKey = `${selectedPreset.width}x${selectedPreset.height}-${previewUrl}`;

    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-5">
        <ReactCrop
          key={cropKey}
          crop={crop}
          onChange={(next) => setCrop(next)}
          onComplete={(nextCompletedCrop) =>
            setCompletedCrop(nextCompletedCrop)
          }
          aspect={selectedAspect}
          keepSelection
          className="inline-flex max-w-full items-center justify-center max-h-[360px] sm:max-h-[440px] lg:max-h-[520px] xl:max-h-[600px] [&>.ReactCrop__child-wrapper]:inline-block [&>.ReactCrop__child-wrapper]:w-auto [&>.ReactCrop__child-wrapper]:max-w-full"
        >
          <img
            ref={imageRef}
            src={previewUrl}
            alt={`${selectedPreset.label} crop preview`}
            onLoad={(event) => {
              syncCenteredCrop(event.currentTarget, selectedAspect);
            }}
            className="mx-auto h-auto w-auto max-w-full object-contain"
          />
        </ReactCrop>
      </div>
    );
  };

  const renderPresetCards = () => (
    <div className="grid grid-cols-2 gap-3">
      {presets.map((preset, index) => {
        const isSelected = index === selectedIndex;
        const { width: thumbWidth, height: thumbHeight } = getFittedDimensions(
          preset.width / preset.height,
          72,
          72,
        );

        return (
          <div
            key={`${preset.label}-${preset.width}-${preset.height}`}
            className="space-y-3"
          >
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={[
                  "flex h-20 w-20 items-center justify-center rounded-[0.5rem] border bg-gray-200 transition-all",
                  "hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-md",
                  isSelected
                    ? "border-foreground shadow-[0_16px_35px_rgba(15,23,42,0.12)] ring-2 ring-foreground/8"
                    : "border-border/70 shadow-sm",
                ].join(" ")}
                aria-pressed={isSelected}
                aria-label={`${preset.label} preset, ${preset.width} by ${preset.height}`}
              >
                <div
                  className="overflow-hidden rounded-[0.25rem] bg-muted/25"
                  style={{
                    width: `${thumbWidth}px`,
                    height: `${thumbHeight}px`,
                  }}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt={`${preset.label} preview`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#f8fafc_0%,#eef6ff_100%)] text-[11px] font-semibold text-muted-foreground">
                      {preset.label}
                    </div>
                  )}
                </div>
              </button>
            </div>
            <div className="text-center text-xs">
              <p className="font-semibold text-foreground">{preset.label}</p>
              <p className="text-muted-foreground">
                {preset.width} x {preset.height}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className="space-y-8"
      data-tool-active-image={file ? "true" : undefined}
    >
      {!resultBlob && (
        <Uploader
          onFileSelect={applyFileSelection}
          isProcessing={isProcessing}
          accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
          previewContent={renderLiveCropPreview()}
          previewLabel="Crop Preview"
          interactivePreview
          aside={
            file && selectedPreset ? (
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <SlidersHorizontal className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold text-lg">Choose Format</h3>
                    {originalSize && (
                      <p className="text-xs text-muted-foreground">
                        Original size: {originalSize.width} x{" "}
                        {originalSize.height}px
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="mt-3">
                    {presetPicker === "cards" ? (
                      renderPresetCards()
                    ) : (
                      <select
                        value={selectedIndex}
                        onChange={(event) =>
                          setSelectedIndex(Number(event.target.value))
                        }
                        className="w-full rounded-xl border border-border bg-background p-3 outline-none transition-all focus:ring-2 focus:ring-primary/50"
                      >
                        {presets.map((preset, index) => (
                          <option key={preset.label} value={index}>
                            {preset.label} - {preset.width}x{preset.height}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {selectedPreset.description && (
                    <p className="text-xs text-muted-foreground">
                      {selectedPreset.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/25 px-4 py-3 text-sm text-muted-foreground">
                    <span>
                      {completedCrop
                        ? `Crop area: ${Math.round(completedCrop.width)} x ${Math.round(
                            completedCrop.height,
                          )}px`
                        : "Set crop area"}
                    </span>
                    <button
                      type="button"
                      onClick={resetCrop}
                      className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
                    >
                      <RefreshCcw className="h-4 w-4" />
                      Reset crop
                    </button>
                  </div>

                  {instagramOptimization && (
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm">
                      <input
                        type="checkbox"
                        checked={autoOptimize}
                        onChange={(event) =>
                          setAutoOptimize(event.target.checked)
                        }
                        className="mt-1 h-4 w-4 rounded border-border"
                      />
                      <span className="text-muted-foreground">
                        <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                          <Sparkles className="h-4 w-4 text-primary" />
                          Instagram Optimization Engine
                        </span>
                        <span className="mt-1 block">
                          After crop + resize, auto-export to IG-friendly JPEG
                          and tune quality to reduce blur after Instagram
                          recompression.
                        </span>
                      </span>
                    </label>
                  )}
                </div>

                <button
                  onClick={handleProcess}
                  disabled={isProcessing || !completedCrop}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary p-4 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:transform-none"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Resizing in
                      background...
                    </>
                  ) : (
                    "Resize Image"
                  )}
                </button>
              </div>
            ) : undefined
          }
        />
      )}

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {resultBlob && selectedPreset && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-green-200 bg-green-50/50 p-8 text-center dark:border-green-900/50 dark:bg-green-900/10"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
            <Download className="h-8 w-8" />
          </div>
          <h3 className="mb-2 text-2xl font-bold">Resize Complete!</h3>
          <p className="mb-8 text-muted-foreground">
            New size: {selectedPreset.width}×{selectedPreset.height}px. File
            size:{" "}
            <span className="font-semibold">
              {formatBytes(resultBlob.size)}
            </span>
          </p>

          {optimizationSummary && (
            <p className="mx-auto mb-8 max-w-xl rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
              {optimizationSummary}
            </p>
          )}

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={handleDownload}
              className="rounded-xl bg-primary px-8 py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Download Image
            </button>
            <button
              onClick={() => {
                setPreviewUrl((currentPreviewUrl) => {
                  if (currentPreviewUrl) {
                    URL.revokeObjectURL(currentPreviewUrl);
                  }

                  return null;
                });
                setFile(null);
                setResultBlob(null);
                setCrop(undefined);
                setCompletedCrop(null);
              }}
              className="rounded-xl border border-border bg-white px-8 py-4 font-bold text-foreground shadow-sm transition-all hover:bg-secondary"
            >
              Resize Another
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
