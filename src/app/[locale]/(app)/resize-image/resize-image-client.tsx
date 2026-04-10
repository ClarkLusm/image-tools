"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { Download, Loader2, Settings, Lock, Unlock } from "lucide-react";
import { Uploader } from "@/app/components/shared/uploader";
import { downloadBlob, formatBytes, loadImage } from "@/lib/image-utils";
import { useImageWorker } from "@/hooks/use-image-worker";
import { motion } from "framer-motion";

export default function ResizeImageClient() {
  const locale = useLocale();
  const isVietnamese = locale === "vi";
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
                    <label className="text-sm font-medium text-muted-foreground">
                      {isVietnamese ? "Chiều rộng" : "Width"}
                    </label>
                    <input
                      type="number"
                      value={width || ""}
                      onChange={(e) => handleWidthChange(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background p-3 outline-none transition-all focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => setMaintainRatio(!maintainRatio)}
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
                    <label className="text-sm font-medium text-muted-foreground">
                      {isVietnamese ? "Chiều cao" : "Height"}
                    </label>
                    <input
                      type="number"
                      value={height || ""}
                      onChange={(e) => handleHeightChange(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background p-3 outline-none transition-all focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <button
                  onClick={handleProcess}
                  disabled={isProcessing}
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

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

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
            {isVietnamese
              ? "Đã đổi kích thước ảnh thành công!"
              : "Image Resized Successfully!"}
          </h3>
          <p className="text-muted-foreground mb-8">
            {isVietnamese
              ? `Ảnh của bạn đã sẵn sàng ở kích thước ${width}x${height}px. Dung lượng: `
              : `Your image is ready at ${width}x${height}px. Size: `}
            <span className="font-semibold">
              {formatBytes(resultBlob.size)}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              {isVietnamese ? "Tải ảnh xuống" : "Download Image"}
            </button>
            <button
              onClick={() => {
                setFile(null);
                setResultBlob(null);
              }}
              className="px-8 py-4 bg-white text-foreground border border-border font-bold rounded-xl shadow-sm hover:bg-secondary transition-all"
            >
              {isVietnamese ? "Đổi ảnh khác" : "Resize Another"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
