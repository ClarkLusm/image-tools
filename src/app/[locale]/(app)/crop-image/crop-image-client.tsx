"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "next-intl";
import {
  CheckCircle2,
  Download,
  Loader2,
  RefreshCcw,
  Settings2,
} from "lucide-react";
import dynamic from "next/dynamic";
import type { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Uploader } from "@/app/components/shared/uploader";
import { downloadBlob, formatBytes, loadImage } from "@/lib/image-utils";
import { useImageWorker } from "@/hooks/use-image-worker";
import { pickText } from "@/lib/localized-text";

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
  const locale = useLocale();
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
  const resultUrl = useMemo(
    () => (resultBlob ? URL.createObjectURL(resultBlob) : null),
    [resultBlob],
  );

  useEffect(() => {
    if (!imageUrl) return;

    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  useEffect(() => {
    if (!resultUrl) return;

    return () => {
      URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

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

  const resetSelection = () => {
    setFile(null);
    setResultBlob(null);
    setCrop(undefined);
    setCompletedCrop(null);
    setDimensions(null);
    setUploaderKey((key) => key + 1);
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
      <Uploader
        key={uploaderKey}
        onFileSelect={applyFileSelection}
        accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
        isProcessing={isProcessing}
        previewLabel={
          resultBlob
            ? pickText(locale, {
              en: "Cropped Result",
              vi: "Ảnh sau khi cắt",
              de: "Zugeschnittenes Ergebnis",
            })
            : pickText(locale, {
              en: "Crop Preview",
              vi: "Xem trước vùng cắt",
              de: "Zuschnittvorschau",
            })
        }
        interactivePreview
        previewContent={
          resultBlob && resultUrl ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-5">
              <div className="flex min-h-[360px] w-full items-center justify-center rounded-xl bg-white p-4 shadow-inner sm:min-h-[440px] lg:min-h-[520px] xl:min-h-[600px]">
                {/* eslint-disable-next-line @next/next/no-img-element -- Blob preview URLs cannot be optimized by next/image. */}
                <img
                  src={resultUrl}
                  alt={pickText(locale, {
                    en: "Cropped image",
                    vi: "Ảnh đã cắt",
                    de: "Zugeschnittenes Bild",
                  })}
                  className="max-h-[600px] w-auto max-w-full rounded-lg object-contain"
                />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <CheckCircle2 className="h-4 w-4" />
                {pickText(locale, {
                  en: `Crop complete - ${formatBytes(resultBlob.size)}`,
                  vi: `Đã cắt xong - ${formatBytes(resultBlob.size)}`,
                  de: `Zuschnitt fertig – ${formatBytes(resultBlob.size)}`,
                })}
              </div>
            </div>
          ) : file && imageUrl ? (
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
                  {/* eslint-disable-next-line @next/next/no-img-element -- Blob preview URLs cannot be optimized by next/image. */}
                  <img
                    ref={imageRef}
                    src={imageUrl}
                    alt={pickText(locale, {
                      en: "Crop preview",
                      vi: "Xem trước vùng cắt",
                      de: "Zuschnittvorschau",
                    })}
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
            resultBlob ? (
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-semibold text-foreground">
                      {pickText(locale, {
                        en: "Crop Result",
                        vi: "Kết quả cắt ảnh",
                        de: "Zuschnittergebnis",
                      })}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {pickText(locale, {
                        en: "The cropped image is now shown in the preview area.",
                        vi: "Ảnh đã cắt đang hiển thị ở khung preview bên trái.",
                        de: "Das zugeschnittene Bild wird jetzt im Vorschaubereich angezeigt.",
                      })}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 rounded-xl border border-border/70 bg-white px-4 py-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <Download className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {pickText(locale, {
                          en: "New size",
                          vi: "Dung lượng mới",
                          de: "Neue Größe",
                        })}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatBytes(resultBlob.size)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleDownload}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <Download className="h-5 w-5" />
                    {pickText(locale, {
                      en: "Download Cropped Image",
                      vi: "Tải ảnh đã cắt",
                      de: "Zugeschnittenes Bild herunterladen",
                    })}
                  </button>

                  <button
                    type="button"
                    onClick={() => setResultBlob(null)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 py-4 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    {pickText(locale, {
                      en: "Adjust Crop Again",
                      vi: "Chỉnh lại vùng cắt",
                      de: "Zuschnitt erneut anpassen",
                    })}
                  </button>

                  <button
                    type="button"
                    onClick={resetSelection}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 py-4 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    {pickText(locale, {
                      en: "Crop Another",
                      vi: "Cắt ảnh khác",
                      de: "Weiteres Bild zuschneiden",
                    })}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <Settings2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-semibold text-foreground">
                      {pickText(locale, {
                        en: "Crop Settings",
                        vi: "Cài đặt cắt ảnh",
                        de: "Zuschnitteinstellungen",
                      })}
                    </h3>
                  </div>
                </div>

                {dimensions ? (
                  <div className="flex justify-between items-center mb-6 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {pickText(locale, {
                        en: "Original size",
                        vi: "Kích thước gốc",
                        de: "Originalgröße",
                      })}
                    </p>
                    <p className="mt-2 text-md font-semibold text-foreground">
                      {dimensions.width} × {dimensions.height}px
                    </p>
                  </div>
                ) : null}

                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {pickText(locale, {
                      en: "Aspect Ratio",
                      vi: "Tỷ lệ khung hình",
                      de: "Seitenverhältnis",
                    })}
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
                          {option.value === 0
                            ? pickText(locale, {
                                en: option.label,
                                vi: "Tự do",
                                de: "Frei",
                              })
                            : option.label}
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
                        {pickText(locale, {
                          en: "Crop area",
                          vi: "Vùng cắt",
                          de: "Zuschnittbereich",
                        })}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {cropDetails
                          ? pickText(locale, {
                            en: `${cropDetails} selected`,
                            vi: `Đã chọn ${cropDetails}`,
                            de: `${cropDetails} ausgewählt`,
                          })
                          : pickText(locale, {
                            en: "Drag the crop box to choose the exact framing.",
                            vi: "Kéo khung cắt để chọn đúng vùng ảnh bạn muốn giữ lại.",
                            de: "Zieh den Zuschnittrahmen, um den genauen Bildausschnitt festzulegen.",
                          })}
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
                        {pickText(locale, {
                          en: "Cropping in background...",
                          vi: "Đang cắt ảnh trong nền...",
                          de: "Wird im Hintergrund zugeschnitten...",
                        })}
                      </>
                    ) : (
                      pickText(locale, {
                        en: "Crop Image",
                        vi: "Cắt ảnh",
                        de: "Bild zuschneiden",
                      })
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={resetCrop}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 py-4 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    {pickText(locale, {
                      en: "Reset Crop",
                      vi: "Đặt lại vùng cắt",
                      de: "Zuschnitt zurücksetzen",
                    })}
                  </button>
                </div>
              </div>
            )
          ) : undefined
        }
      />

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </div>
  );
}
const ReactCrop = dynamic(() => import("react-image-crop"), { ssr: false });
