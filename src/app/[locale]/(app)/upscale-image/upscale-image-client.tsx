"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "next-intl";
import {
  Download,
  ImagePlus,
  Loader2,
  Sparkles,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";
import { Uploader } from "@/app/components/shared/uploader";
import { downloadBlob, formatBytes } from "@/lib/image-utils";
import {
  createUpscaleJob,
  downloadImageToolsArtifact,
  resolveSingleJobDownloadUrl,
  waitForImageToolsJobCompletion,
} from "@/lib/image-tools-api";

const SCALE_OPTIONS = [
  {
    value: 2 as const,
    label: "2x",
  },
  {
    value: 4 as const,
    label: "4x",
  },
  {
    value: 8 as const,
    label: "8x",
  },
];

export default function UpscaleImageClient() {
  const locale = useLocale();
  const isVietnamese = locale === "vi";
  const [file, setFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [scale, setScale] = useState<2 | 4 | 8>(4);
  const [faceEnhance, setFaceEnhance] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const activeRequestRef = useRef<AbortController | null>(null);

  const beforeUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  const afterUrl = useMemo(() => {
    if (!resultBlob) return null;
    return URL.createObjectURL(resultBlob);
  }, [resultBlob]);

  useEffect(() => {
    return () => {
      if (beforeUrl) {
        URL.revokeObjectURL(beforeUrl);
      }
    };
  }, [beforeUrl]);

  useEffect(() => {
    return () => {
      if (afterUrl) {
        URL.revokeObjectURL(afterUrl);
      }
    };
  }, [afterUrl]);

  useEffect(() => {
    return () => {
      activeRequestRef.current?.abort();
    };
  }, []);

  const resetTool = () => {
    activeRequestRef.current?.abort();
    activeRequestRef.current = null;
    setFile(null);
    setResultBlob(null);
    setError(null);
    setProgress(0);
    setIsPending(false);
    setScale(4);
    setFaceEnhance(false);
  };

  const handleProcess = async () => {
    if (!file) return;

    setError(null);
    setResultBlob(null);
    setProgress(0);
    setIsPending(true);
    activeRequestRef.current?.abort();
    const abortController = new AbortController();
    activeRequestRef.current = abortController;

    try {
      const jobId = await createUpscaleJob(file, {
        scale,
        faceEnhance,
      });
      const completedJob = await waitForImageToolsJobCompletion(jobId, {
        signal: abortController.signal,
        onUpdate: (job) => {
          setProgress(typeof job.progress === "number" ? job.progress : 0);
        },
      });
      const downloadUrl = resolveSingleJobDownloadUrl(completedJob, [
        "enhancedUrl",
      ]);

      if (!downloadUrl) {
        throw new Error(
          isVietnamese
            ? "Quá trình tăng độ phân giải đã hoàn tất nhưng không có tệp để tải xuống."
            : "Upscale job completed without a downloadable file.",
        );
      }

      const blob = await downloadImageToolsArtifact(downloadUrl);
      setResultBlob(blob);
      setProgress(100);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }

      setError(
        err instanceof Error
          ? err.message
          : isVietnamese
            ? "Tăng độ phân giải thất bại."
            : "Upscale failed.",
      );
    } finally {
      if (activeRequestRef.current === abortController) {
        activeRequestRef.current = null;
        setIsPending(false);
      }
    }
  };

  const handleDownload = () => {
    if (!resultBlob || !file) return;

    const parts = file.name.split(".");
    parts.pop();
    const base = parts.join(".") || "image";
    downloadBlob(resultBlob, `${base}_upscaled_${scale}x.png`);
  };

  return (
    <div
      className="space-y-8"
      data-tool-active-image={file || resultBlob ? "true" : undefined}
    >
      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      {!resultBlob && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start"
        >
          <div className="rounded-xl border-2 border-dashed border-border bg-card/80 p-4 md:p-6">
            {file ? (
              <div className="flex h-full flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {isVietnamese ? "Xem trước ảnh gốc" : "Source preview"}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {file.name}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatBytes(file.size)}
                  </span>
                </div>
                {beforeUrl && (
                  <div className="flex items-center justify-center rounded-[1.5rem] bg-white p-4">
                    <img
                      src={beforeUrl}
                      alt={isVietnamese ? "Xem trước ảnh gốc" : "Source preview"}
                      className="max-h-[420px] w-auto rounded-xl object-contain"
                    />
                  </div>
                )}
                <button
                  type="button"
                  onClick={resetTool}
                  disabled={isPending}
                  className="rounded-xl border border-border bg-white px-5 py-3 font-semibold text-foreground shadow-sm transition-all hover:bg-secondary disabled:opacity-50"
                >
                  {isVietnamese ? "Chọn ảnh khác" : "Select Different Image"}
                </button>
              </div>
            ) : (
              <Uploader
                onFileSelect={(nextFile) => {
                  setFile(nextFile);
                  setResultBlob(null);
                  setError(null);
                  setProgress(0);
                }}
                accept={{
                  "image/jpeg": [".jpg", ".jpeg"],
                  "image/png": [".png"],
                  "image/webp": [".webp"],
                }}
                maxSizeMB={10}
                isProcessing={isPending}
              />
            )}
          </div>

          <div className="rounded-xl border border-border bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {isVietnamese
                    ? "Thiết lập tăng độ phân giải"
                    : "Upscale Settings"}
                </h3>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="mb-3 text-base font-semibold text-foreground">
                  {isVietnamese ? "Mức phóng to" : "Upscale Factor"}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {SCALE_OPTIONS.map((option) => {
                    const isActive = scale === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setScale(option.value)}
                        disabled={isPending}
                        className={`rounded-xl border px-4 py-3 text-center text-xl font-bold transition-all ${
                          isActive
                            ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                            : "border-border bg-white text-foreground hover:border-primary/30"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="mb-3 text-base font-semibold text-foreground">
                  {isVietnamese ? "Mô hình AI" : "AI Model"}
                </p>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setFaceEnhance(false)}
                    disabled={isPending}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${
                      !faceEnhance
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-white hover:border-primary/30"
                    }`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                      <ImagePlus className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-semibold text-foreground">
                        {isVietnamese ? "Cân bằng tiêu chuẩn" : "Standard Balance"}
                      </p>
                      <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                        {isVietnamese
                          ? "Phù hợp nhất cho ảnh sản phẩm, ảnh chụp màn hình, logo và ảnh thông thường."
                          : "Best for products, screenshots, logos, and general images."}
                      </p>
                    </div>
                    {!faceEnhance && (
                      <div className="h-3 w-3 rounded-full bg-primary" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setFaceEnhance(true)}
                    disabled={isPending}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${
                      faceEnhance
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-white hover:border-primary/30"
                    }`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                      <UserRound className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-semibold text-foreground">
                        {isVietnamese
                          ? "Chân dung (Tăng cường khuôn mặt)"
                          : "Portrait (Face Enhance)"}
                      </p>
                      <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                        {isVietnamese
                          ? "Cải thiện khuôn mặt và chi tiết da cho ảnh selfie và ảnh chân dung."
                          : "Improves faces and skin detail for selfies and portraits."}
                      </p>
                    </div>
                    {faceEnhance && (
                      <div className="h-3 w-3 rounded-full bg-primary" />
                    )}
                  </button>
                </div>
              </div>

              {isPending && (
                <div className="space-y-2 rounded-xl border border-border bg-secondary/40 p-3.5">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {isVietnamese
                        ? "Đang tăng độ phân giải"
                        : "Processing upscale job"}
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-border/60">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleProcess}
                disabled={!file || isPending}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:transform-none"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {isVietnamese
                      ? "Đang tăng độ phân giải..."
                      : "Upscaling..."}
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    {isVietnamese
                      ? `Tăng độ phân giải ${scale}x`
                      : `Upscale ${scale}x`}
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.section>
      )}

      {resultBlob && (
        <motion.section
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-green-200 bg-green-50/50 p-8 text-center dark:border-green-900/50 dark:bg-green-900/10"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
            <Download className="h-8 w-8" />
          </div>
          <h3 className="mb-2 text-2xl font-bold">
            {isVietnamese
              ? "Tăng độ phân giải hoàn tất"
              : "Upscale complete"}
          </h3>
          <p className="mb-6 text-muted-foreground">
            {isVietnamese ? "Đã xuất ở mức" : "Exported at"} {scale}x{" "}
            {isVietnamese ? "với dung lượng" : "with file size"}{" "}
            <span className="font-semibold">
              {formatBytes(resultBlob.size)}
            </span>
            .
          </p>

          {afterUrl && (
            <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-border bg-white/80 p-4">
              <img
                src={afterUrl}
                alt={
                  isVietnamese
                    ? "Xem trước kết quả tăng độ phân giải"
                    : "Upscaled result preview"
                }
                className="max-h-[28rem] w-auto rounded-xl object-contain"
              />
            </div>
          )}

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={handleDownload}
              className="rounded-xl bg-primary px-8 py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              {isVietnamese ? "Tải ảnh xuống" : "Download Image"}
            </button>
            <button
              onClick={resetTool}
              className="rounded-xl border border-border bg-white px-8 py-4 font-bold text-foreground shadow-sm transition-all hover:bg-secondary"
            >
              {isVietnamese
                ? "Tăng độ phân giải ảnh khác"
                : "Upscale Another"}
            </button>
          </div>
        </motion.section>
      )}
    </div>
  );
}
