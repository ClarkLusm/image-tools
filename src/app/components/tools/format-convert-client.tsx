"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Loader2,
  Settings,
  SlidersHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";
import { Uploader } from "@/app/components/shared/uploader";
import { downloadBlob, formatBytes } from "@/lib/image-utils";
import {
  createConvertToSvgJob,
  downloadImageToolsArtifact,
  resolveSingleJobDownloadUrl,
  waitForImageToolsJobCompletion,
} from "@/lib/image-tools-api";
import { downloadZip } from "@/lib/zip-utils";
import { useImageWorker } from "@/app/hooks/use-image-worker";

type WorkerConvertTask =
  | "convert-to-jpg"
  | "convert-to-webp"
  | "convert-to-png";
type ConvertTask = WorkerConvertTask | "convert-to-svg";

type FormatConvertClientProps = {
  task: ConvertTask;
  accept: Record<string, string[]>;
  outputExt: string;
  outputMime: string;
  qualityDefault?: number;
  showQuality?: boolean;
  buttonLabel?: string;
  note?: string;
  autoProcessOnSelect?: boolean;
};

type ManualFormatConvertClientProps = Omit<FormatConvertClientProps, "task"> & {
  task: WorkerConvertTask;
};

type ManualResultItem = {
  file: File;
  blob: Blob;
};

type AutoConversionItem = {
  id: string;
  file: File;
  previewUrl: string;
  status: "pending" | "processing" | "done" | "failed";
  blob?: Blob;
  error?: string;
};

export default function FormatConvertClient(props: FormatConvertClientProps) {
  if (props.autoProcessOnSelect || props.task === "convert-to-svg") {
    return <AutoFormatConvertClient {...props} />;
  }

  return <ManualFormatConvertClient {...(props as ManualFormatConvertClientProps)} />;
}

function ManualFormatConvertClient({
  task,
  accept,
  outputExt,
  outputMime,
  qualityDefault = 0.9,
  showQuality = true,
  buttonLabel,
  note,
}: ManualFormatConvertClientProps) {
  const locale = useLocale();
  const isVietnamese = locale === "vi";
  const isGerman = locale === "de";
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<ManualResultItem[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done">(
    "idle",
  );
  const [quality, setQuality] = useState(qualityDefault);

  const { processImage, isProcessing, error } = useImageWorker();
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const handleProcess = async () => {
    if (files.length === 0) return;
    setResults([]);
    setStatus("processing");

    const nextResults: ManualResultItem[] = [];

    for (const file of files) {
      const blob = await processImage(task, file, {
        quality,
        mimeType: outputMime,
        fillWhite: outputMime === "image/jpeg",
      });

      if (blob) {
        nextResults.push({ file, blob });
      }
    }

    setResults(nextResults);
    setStatus("done");
  };

  const buildFilename = (file: File) =>
    file.name.replace(/\.[^/.]+$/, "") + outputExt;

  const handleDownload = (item: ManualResultItem) => {
    downloadBlob(item.blob, buildFilename(item.file));
  };

  const handleDownloadAll = async () => {
    if (results.length <= 1) return;
    await downloadZip(
      results.map((item) => ({
        blob: item.blob,
        filename: buildFilename(item.file),
      })),
      "converted-images.zip",
    );
  };

  useEffect(() => {
    if (results.length === 0) return;
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [results.length]);

  return (
    <div
      className="space-y-8"
      data-tool-active-image={files.length > 0 ? "true" : undefined}
    >
      {results.length === 0 && (
        <Uploader
          onFileSelect={(file) => setFiles([file])}
          onFilesSelect={(selected) => setFiles(selected)}
          accept={accept}
          isProcessing={isProcessing}
          maxFiles={10}
          aside={
            files.length > 0 ? (
              <div>
                {showQuality && (
                  <>
                    <div className="mb-6 flex items-center gap-4">
                      <SlidersHorizontal className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">
                        {isVietnamese
                          ? "Cài đặt chất lượng"
                          : isGerman
                            ? "Qualitätseinstellungen"
                            : "Quality Settings"}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">
                          {isVietnamese
                            ? "Chất lượng"
                            : isGerman
                              ? "Qualität"
                              : "Quality"}
                        </label>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(quality * 100)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.01"
                        value={quality}
                        onChange={(event) =>
                          setQuality(parseFloat(event.target.value))
                        }
                        className="w-full accent-primary"
                      />
                    </div>
                  </>
                )}

                {note && (
                  <p className="text-sm text-muted-foreground">{note}</p>
                )}

                <button
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:transform-none"
                >
                  {isProcessing || status === "processing" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />{" "}
                      {isVietnamese
                        ? "Đang chuyển đổi trong nền..."
                        : isGerman
                          ? "Wird im Hintergrund konvertiert..."
                        : "Converting in background..."}
                    </>
                  ) : (
                    `${buttonLabel ?? (isVietnamese ? "Chuyển đổi" : isGerman ? "Konvertieren" : "Convert")}${files.length > 1 ? ` (${files.length} ${isVietnamese ? "tệp" : isGerman ? "Dateien" : "files"})` : ""}`
                  )}
                </button>
              </div>
            ) : undefined
          }
        />
      )}

      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      {results.length > 0 && (
        <motion.div
          ref={resultsRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl border border-green-200 bg-green-50/50 p-8 text-center dark:border-green-900/50 dark:bg-green-900/10"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400">
            <Download className="h-8 w-8" />
          </div>
          <h3 className="mb-2 text-2xl font-bold">
            {isVietnamese
              ? "Chuyển đổi hoàn tất!"
              : isGerman
                ? "Konvertierung abgeschlossen!"
                : "Conversion Complete!"}
          </h3>
          <p className="mb-6 text-muted-foreground">
            {isVietnamese
              ? `Đã chuyển đổi ${results.length} tệp.`
              : isGerman
                ? `${results.length} Datei${results.length > 1 ? "en" : ""} konvertiert.`
              : `Converted ${results.length} file${results.length > 1 ? "s" : ""}.`}
          </p>

          <div className="mb-6 space-y-3">
            {results.map((item) => (
              <div
                key={`${item.file.name}-${item.file.lastModified}`}
                className="flex items-center justify-between gap-4 rounded-xl border border-border/50 bg-secondary/30 px-4 py-3 text-left"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {item.file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatBytes(item.blob.size)}
                  </p>
                </div>
                <button
                  onClick={() => handleDownload(item)}
                  className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white shadow transition-all hover:shadow-md"
                >
                  {isVietnamese
                    ? "Tải xuống"
                    : isGerman
                      ? "Herunterladen"
                      : "Download"}
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            {results.length > 1 ? (
              <button
                onClick={() => {
                  void handleDownloadAll();
                }}
                className="rounded-xl bg-primary px-8 py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                {isVietnamese
                  ? "Tải xuống tất cả"
                  : isGerman
                    ? "Alle herunterladen"
                    : "Download All"}
              </button>
            ) : (
              <button
                onClick={() => handleDownload(results[0])}
                className="rounded-xl bg-primary px-8 py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                {isVietnamese
                  ? "Tải ảnh xuống"
                  : isGerman
                    ? "Bild herunterladen"
                    : "Download Image"}
              </button>
            )}
            <button
              onClick={() => {
                setFiles([]);
                setResults([]);
                setStatus("idle");
              }}
              className="rounded-xl border border-border bg-white px-8 py-4 font-bold text-foreground shadow-sm transition-all hover:bg-secondary"
            >
              {isVietnamese
                ? "Chuyển ảnh khác"
                : isGerman
                  ? "Weitere Datei konvertieren"
                  : "Convert Another"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function AutoFormatConvertClient({
  task,
  accept,
  outputExt,
  outputMime,
  qualityDefault = 0.9,
  showQuality = true,
  note,
}: FormatConvertClientProps) {
  const locale = useLocale();
  const isVietnamese = locale === "vi";
  const isGerman = locale === "de";
  const [items, setItems] = useState<AutoConversionItem[]>([]);
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");
  const [quality, setQuality] = useState(qualityDefault);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { processImage } = useImageWorker();
  const itemsRef = useRef<AutoConversionItem[]>([]);
  const runIdRef = useRef(0);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const revokePreviewUrls = (entries: AutoConversionItem[]) => {
    entries.forEach((entry) => {
      URL.revokeObjectURL(entry.previewUrl);
    });
  };

  const appendItems = (nextItems: AutoConversionItem[]) => {
    setItems((prev) => {
      const mergedItems = [...prev, ...nextItems];
      itemsRef.current = mergedItems;
      return mergedItems;
    });
  };

  const createItemId = (file: File, index: number) => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }

    return `${file.name}-${file.size}-${file.lastModified}-${Date.now()}-${index}`;
  };

  const updateItem = (
    itemId: string,
    updater: (item: AutoConversionItem) => AutoConversionItem,
  ) => {
    setItems((prev) => {
      const next = prev.map((item) =>
        item.id === itemId ? updater(item) : item,
      );
      itemsRef.current = next;
      return next;
    });
  };

  useEffect(() => {
    return () => {
      runIdRef.current += 1;
      revokePreviewUrls(itemsRef.current);
    };
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [items.length]);

  const convertSelectedFile = async (file: File) => {
    if (task === "convert-to-svg") {
      const jobId = await createConvertToSvgJob(file);
      const completedJob = await waitForImageToolsJobCompletion(jobId);
      const downloadUrl = resolveSingleJobDownloadUrl(completedJob, [
        "convertedUrl",
        "resultUrl",
      ]);

      if (!downloadUrl) {
        throw new Error(
          isVietnamese
            ? "Tệp SVG đầu ra hiện chưa sẵn sàng."
            : isGerman
              ? "Die SVG-Ausgabe ist noch nicht verfügbar."
            : "The SVG output is not available yet.",
        );
      }

      return downloadImageToolsArtifact(downloadUrl);
    }

    const blob = await processImage(task, file, {
      quality,
      mimeType: outputMime,
      fillWhite: outputMime === "image/jpeg",
    });

    if (!blob) {
      throw new Error(
        isVietnamese
          ? "Chuyển đổi thất bại. Vui lòng thử ảnh khác."
          : isGerman
            ? "Die Konvertierung ist fehlgeschlagen. Bitte versuche es mit einem anderen Bild."
          : "Conversion failed. Please try another image.",
      );
    }

    return blob;
  };

  const buildFilename = (file: File) =>
    file.name.replace(/\.[^/.]+$/, "") + outputExt;

  const handleProcess = async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;

    const currentRunId = runIdRef.current;

    const nextItems: AutoConversionItem[] = selectedFiles.map((file, index) => ({
      id: createItemId(file, index),
      file,
      previewUrl: URL.createObjectURL(file),
      status: "pending",
    }));

    appendItems(nextItems);
    setStatus("processing");

    for (const item of nextItems) {
      if (runIdRef.current !== currentRunId) {
        return;
      }

      updateItem(item.id, (currentItem) => ({
        ...currentItem,
        status: "processing",
        error: undefined,
      }));

      try {
        const blob = await convertSelectedFile(item.file);

        if (runIdRef.current !== currentRunId) {
          return;
        }

        updateItem(item.id, (currentItem) => ({
          ...currentItem,
          status: "done",
          blob,
        }));
      } catch (error) {
        if (runIdRef.current !== currentRunId) {
          return;
        }

        updateItem(item.id, (currentItem) => ({
          ...currentItem,
          status: "failed",
          error:
            error instanceof Error
              ? error.message
              : isVietnamese
                ? "Chuyển đổi thất bại. Vui lòng thử ảnh khác."
                : isGerman
                  ? "Die Konvertierung ist fehlgeschlagen. Bitte versuche es mit einem anderen Bild."
                : "Conversion failed. Please try another image.",
        }));
      }
    }

    if (runIdRef.current !== currentRunId) {
      return;
    }

    setStatus("done");
  };

  const handleDownload = (item: AutoConversionItem) => {
    if (!item.blob) return;
    downloadBlob(item.blob, buildFilename(item.file));
  };

  const doneItems = items.filter(
    (item): item is AutoConversionItem & { blob: Blob } =>
      item.status === "done" && Boolean(item.blob),
  );
  const processingCount = items.filter(
    (item) => item.status === "pending" || item.status === "processing",
  ).length;
  const failedCount = items.filter((item) => item.status === "failed").length;

  const handleDownloadAll = async () => {
    if (doneItems.length <= 1) return;
    await downloadZip(
      doneItems.map((item) => ({
        blob: item.blob,
        filename: buildFilename(item.file),
      })),
      "converted-images.zip",
    );
  };

  const renderSettingsPanel = () => (
    <div className="rounded-xl border border-border/70 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
      <div className="mb-6 flex items-center gap-3">
        <SlidersHorizontal className="h-5 w-5 text-primary" />
        <div>
          <h3 className="font-semibold text-lg">
            {isVietnamese
              ? "Cài đặt chất lượng"
              : isGerman
                ? "Qualitätseinstellungen"
                : "Quality Settings"}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isVietnamese
              ? `Chất lượng hiện tại ${Math.round(quality * 100)}%`
              : isGerman
                ? `Aktuelle Qualität ${Math.round(quality * 100)}%`
              : `Current quality ${Math.round(quality * 100)}%`}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">
            {isVietnamese
              ? "Chất lượng"
              : isGerman
                ? "Qualität"
                : "Quality"}
          </label>
          <span className="text-sm text-muted-foreground">
            {Math.round(quality * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0.1"
          max="1.0"
          step="0.01"
          value={quality}
          onChange={(event) => setQuality(parseFloat(event.target.value))}
          className="w-full accent-primary"
        />
      </div>
    </div>
  );

  const settingsTrigger = showQuality ? (
    <button
      type="button"
      onClick={() => setIsSettingsOpen((value) => !value)}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border shadow-sm transition-colors ${
        isSettingsOpen
          ? "border-primary bg-primary text-white"
          : "border-border bg-white/95 text-foreground hover:bg-secondary"
      }`}
      aria-label={
        isVietnamese
          ? "Bật hoặc tắt cài đặt chất lượng"
          : isGerman
            ? "Qualitätseinstellungen ein- oder ausblenden"
            : "Toggle quality settings"
      }
      aria-pressed={isSettingsOpen}
    >
      <Settings className="h-4.5 w-4.5" />
    </button>
  ) : undefined;

  return (
    <div
      className="space-y-8"
      data-tool-active-image={items.length > 0 ? "true" : undefined}
    >
      {showQuality && isSettingsOpen ? (
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8">
            <Uploader
              onFileSelect={(file) => {
                void handleProcess([file]);
              }}
              onFilesSelect={(selected) => {
                void handleProcess(selected);
              }}
              accept={accept}
              isProcessing={status === "processing"}
              maxFiles={10}
              showSelectedPreview={false}
              topRightAction={settingsTrigger}
            />
          </div>
          <div className="lg:col-span-4">{renderSettingsPanel()}</div>
        </div>
      ) : (
        <Uploader
          onFileSelect={(file) => {
            void handleProcess([file]);
          }}
          onFilesSelect={(selected) => {
            void handleProcess(selected);
          }}
          accept={accept}
          isProcessing={status === "processing"}
          maxFiles={10}
          showSelectedPreview={false}
          topRightAction={settingsTrigger}
        />
      )}

      {note ? (
        <div className="rounded-xl border border-border/70 bg-card/80 px-4 py-3 text-sm text-muted-foreground shadow-sm">
          {note}
        </div>
      ) : null}

      {items.length > 0 && (
        <motion.div
          ref={resultsRef}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-xl border border-border/70 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.08)]"
        >
          <div className="border-b border-border/60 bg-gradient-to-r from-primary/[0.08] via-white to-white px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {processingCount > 0
                    ? isVietnamese
                      ? `${doneItems.length}/${items.length} tệp đã xong. Các tệp còn lại vẫn đang xử lý.`
                      : isGerman
                        ? `${doneItems.length} von ${items.length} Dateien sind fertig. Die übrigen werden noch verarbeitet.`
                      : `${doneItems.length} of ${items.length} files finished. The rest are still processing.`
                    : isVietnamese
                      ? `${doneItems.length} tệp đã được chuyển đổi thành công.${failedCount > 0 ? ` ${failedCount} tệp thất bại.` : ""}`
                      : isGerman
                        ? `${doneItems.length} Datei${doneItems.length > 1 ? "en wurden" : " wurde"} erfolgreich konvertiert.${failedCount > 0 ? ` ${failedCount} Datei${failedCount > 1 ? "en sind" : " ist"} fehlgeschlagen.` : ""}`
                      : `${doneItems.length} file${doneItems.length > 1 ? "s" : ""} converted successfully.${failedCount > 0 ? ` ${failedCount} file${failedCount > 1 ? "s" : ""} failed.` : ""}`}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {doneItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      void handleDownloadAll();
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(37,99,235,0.24)] transition-transform hover:-translate-y-0.5"
                  >
                    <Download className="h-4 w-4" />
                    {isVietnamese
                      ? "Tải xuống tất cả"
                      : isGerman
                        ? "Alle herunterladen"
                        : "Download All"}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3 px-4 py-4 sm:px-6 sm:py-6">
            {items.map((item) => {
              const sizeLabel = item.blob
                ? `${formatBytes(item.file.size)} -> ${formatBytes(item.blob.size)}`
                : formatBytes(item.file.size);

              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 border-b border-border/70 py-2.5 sm:flex-row sm:items-center"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-muted/40">
                      <img
                        src={item.previewUrl}
                        alt={item.file.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground sm:text-base">
                        {item.file.name}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground sm:text-sm">
                        <span>{sizeLabel}</span>
                        {item.status === "failed" && item.error && (
                          <span className="font-medium text-destructive">
                            {item.error}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <div
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        item.status === "done"
                          ? "bg-emerald-50 text-emerald-700"
                          : item.status === "failed"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-primary/10 text-primary"
                      }`}
                    >
                      {item.status === "done" ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : item.status === "failed" ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                      {item.status === "done"
                        ? isVietnamese
                          ? "Sẵn sàng"
                          : isGerman
                            ? "Bereit"
                          : "Ready"
                        : item.status === "failed"
                          ? isVietnamese
                            ? "Thất bại"
                            : isGerman
                              ? "Fehlgeschlagen"
                            : "Failed"
                          : isVietnamese
                            ? "Đang chuyển đổi"
                            : isGerman
                              ? "Wird konvertiert"
                            : "Converting"}
                    </div>

                    {item.blob && (
                      <button
                        type="button"
                        onClick={() => handleDownload(item)}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(37,99,235,0.2)] transition-transform hover:-translate-y-0.5"
                      >
                        <Download className="h-4 w-4" />
                        {isVietnamese
                          ? "Tải xuống"
                          : isGerman
                            ? "Herunterladen"
                            : "Download"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
