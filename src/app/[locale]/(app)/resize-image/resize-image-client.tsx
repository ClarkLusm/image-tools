"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Download, Loader2, Settings, Lock, Unlock } from "lucide-react";
import { Uploader } from "@/app/components/shared/uploader";
import { downloadBlob, formatBytes, loadImage } from "@/lib/image-utils";
import { useImageWorker } from "@/hooks/use-image-worker";
import { motion } from "framer-motion";
import { ImagePreviewWorkspace } from "@/app/components/shared/image-preview-workspace";
import { ToolResultPanel } from "@/app/components/shared/tool-result-panel";

export default function ResizeImageClient() {
  const locale = useLocale();
  const isVietnamese = locale === "vi";
  const [file, setFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [originalRatio, setOriginalRatio] = useState(1);

  const { processImage, isProcessing, error } = useImageWorker();

  useEffect(() => {
    if (!resultBlob) {
      setResultUrl(null);
      return;
    }
    const url = URL.createObjectURL(resultBlob);
    setResultUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [resultBlob]);

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
    <div
      className="space-y-8"
      data-tool-active-image={file ? "true" : undefined}
    >
      {!resultBlob && (
        <Uploader
          onFileSelect={(f) => {
            setFile(f);
            setResultBlob(null);
          }}
          isProcessing={isProcessing}
          aside={
            file && width > 0 ? (
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <Settings className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">
                    {isVietnamese ? "Kích thước (pixel)" : "Dimensions (Pixels)"}
                  </h3>
                </div>

                <div className="flex flex-col items-center gap-6">
                  <div className="w-full space-y-2">
                    <label htmlFor="resize-width" className="text-sm font-medium text-muted-foreground">
                      {isVietnamese ? "Chiều rộng" : "Width"}
                    </label>
                    <input
                      id="resize-width"
                      min={1}
                      type="number"
                      value={width || ""}
                      onChange={(e) => handleWidthChange(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background p-3 outline-none transition-all focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => setMaintainRatio(!maintainRatio)}
                      type="button"
                      aria-pressed={maintainRatio}
                      aria-label={maintainRatio ? (isVietnamese ? "Mở khóa tỷ lệ khung hình" : "Unlock aspect ratio") : (isVietnamese ? "Khóa tỷ lệ khung hình" : "Lock aspect ratio")}
                      className={`rounded-full p-2 transition-colors ${maintainRatio ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                      title={
                        maintainRatio
                          ? isVietnamese
                            ? "Mở khóa tỷ lệ"
                            : "Unlock aspect ratio"
                          : isVietnamese
                            ? "Khóa tỷ lệ"
                            : "Lock aspect ratio"
                      }
                    >
                      {maintainRatio ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        <Unlock className="h-4 w-4" />
                      )}
                    </button>
                    <span className="text-xs text-muted-foreground">
                      {maintainRatio
                        ? isVietnamese
                          ? "Đã khóa tỷ lệ"
                          : "Ratio locked"
                        : isVietnamese
                          ? "Đã mở khóa tỷ lệ"
                          : "Ratio unlocked"}
                    </span>
                  </div>

                  <div className="w-full space-y-2">
                    <label htmlFor="resize-height" className="text-sm font-medium text-muted-foreground">
                      {isVietnamese ? "Chiều cao" : "Height"}
                    </label>
                    <input
                      id="resize-height"
                      min={1}
                      type="number"
                      value={height || ""}
                      onChange={(e) => handleHeightChange(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background p-3 outline-none transition-all focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <button
                  onClick={handleProcess}
                  disabled={isProcessing || width <= 0 || height <= 0}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:transform-none"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />{" "}
                      {isVietnamese
                        ? "Đang đổi kích thước trong nền..."
                        : "Resizing in background..."}
                    </>
                  ) : (
                    isVietnamese ? "Đổi kích thước ảnh" : "Resize Image"
                  )}
                </button>
              </div>
            ) : undefined
          }
        />
      )}

      {error && <p role="alert" className="text-sm text-destructive text-center">{error}</p>}

      {resultBlob && (
        <ToolResultPanel
          title={isVietnamese ? "Đã đổi kích thước ảnh thành công!" : "Image resized successfully!"}
          description={`${width} × ${height} px · ${formatBytes(file?.size ?? 0)} → ${formatBytes(resultBlob.size)}`}
          preview={resultUrl ? (
            <ImagePreviewWorkspace
              src={resultUrl}
              alt={isVietnamese ? "Ảnh đã đổi kích thước" : "Resized image"}
              filename={file?.name}
              details={`${width} × ${height} px · ${formatBytes(resultBlob.size)}`}
              transparent={resultBlob.type === "image/png"}
            />
          ) : null}
          actions={
            <>
              <button type="button" onClick={() => setResultBlob(null)} className="rounded-xl border border-border bg-card px-5 py-3 font-semibold hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary">
                {isVietnamese ? "Chỉnh lại kích thước" : "Adjust dimensions"}
              </button>
              <button type="button" onClick={() => { setFile(null); setResultBlob(null); }} className="rounded-xl border border-border bg-card px-5 py-3 font-semibold hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary">
                {isVietnamese ? "Đổi ảnh khác" : "Resize another"}
              </button>
              <button type="button" onClick={handleDownload} className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary">
                {isVietnamese ? "Tải ảnh xuống" : "Download image"}
              </button>
            </>
          }
        />
      )}
    </div>
  );
}
