"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import {
  UploadCloud,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle2,
  RefreshCcw,
  Layers3,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatBytes } from "@/lib/image-utils";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface UploaderProps {
  onFileSelect: (file: File) => void;
  onFilesSelect?: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxSizeMB?: number;
  className?: string;
  isProcessing?: boolean;
  maxFiles?: number;
  aside?: ReactNode;
  asideClassName?: string;
  previewContent?: ReactNode;
  previewLabel?: string;
  interactivePreview?: boolean;
}

export function UploaderCore({
  onFileSelect,
  onFilesSelect,
  accept = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/webp": [".webp"],
    "image/gif": [".gif"],
  },
  maxSizeMB = 20,
  className,
  isProcessing = false,
  maxFiles = 1,
  aside,
  asideClassName,
  previewContent,
  previewLabel = "Upload Preview",
  interactivePreview = false,
}: UploaderProps) {
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<
    { url: string; name: string; size: number }[]
  >([]);

  const clearPreviews = useCallback(() => {
    previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    setPreviews([]);
  }, [previews]);

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setError(null);

      if (fileRejections.length > 0) {
        const rejection = fileRejections[0];
        if (rejection.errors[0]?.code === "file-too-large") {
          setError(`File is too large. Max size is ${maxSizeMB}MB.`);
        } else if (rejection.errors[0]?.code === "file-invalid-type") {
          setError("Unsupported file format. Please upload an image.");
        } else {
          setError(rejection.errors[0]?.message || "Failed to upload file.");
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        clearPreviews();
        const nextPreviews = acceptedFiles.slice(0, maxFiles).map((file) => ({
          url: URL.createObjectURL(file),
          name: file.name,
          size: file.size,
        }));
        setPreviews(nextPreviews);

        if (onFilesSelect) {
          onFilesSelect(acceptedFiles.slice(0, maxFiles));
        } else {
          onFileSelect(acceptedFiles[0]);
        }
      }
    },
    [clearPreviews, maxFiles, maxSizeMB, onFileSelect, onFilesSelect]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept,
      maxSize: maxSizeMB * 1024 * 1024,
      maxFiles,
      disabled: isProcessing,
      multiple: maxFiles > 1,
    });

  const baseDropzoneClassName = cn(
    "relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ease-out cursor-pointer",
    isDragActive
      ? "border-primary bg-primary/5 scale-[1.01]"
      : "border-border bg-card hover:bg-secondary/50",
    isDragReject ? "border-destructive bg-destructive/5" : "",
    isProcessing ? "opacity-60 cursor-not-allowed pointer-events-none" : ""
  );

  const renderPrompt = () => (
    <motion.div
      key="upload-prompt"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col items-center justify-center text-center"
    >
      <div
        className={cn(
          "mb-6 flex h-20 w-20 items-center justify-center rounded-full shadow-sm transition-colors",
          isDragActive
            ? "bg-primary text-white shadow-primary/25"
            : "bg-primary/10 text-primary"
        )}
      >
        <UploadCloud className="h-10 w-10" />
      </div>
      <h3 className="mb-2 text-xl font-display font-semibold text-foreground">
        Drag & drop your image here
      </h3>
      <p className="mb-6 text-muted-foreground">
        or click to browse from your device
      </p>
      <div className="flex flex-wrap justify-center gap-3 text-xs font-medium text-muted-foreground/80">
        <span className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1">
          <ImageIcon className="h-3 w-3" /> Max {maxSizeMB}MB
        </span>
        <span className="rounded-full bg-secondary px-3 py-1">
          JPG, JPEG, PNG, WEBP, HEIC, HEIF
        </span>
      </div>
    </motion.div>
  );

  const renderPreviewContent = () => {
    const hasMultiplePreviews = previews.length > 1;

    return (
      <motion.div
        key="preview"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex h-full flex-col gap-5"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-medium text-primary">
              <CheckCircle2 className="h-5 w-5" />
              <span>
                {previews.length} file{previews.length > 1 ? "s" : ""} ready
              </span>
            </div>
          </div>

          {!isProcessing && (
            <button
              className="inline-flex items-center gap-2 self-start rounded-xl border border-border bg-white px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              onClick={(event) => {
                event.stopPropagation();
                clearPreviews();
              }}
            >
              <RefreshCcw className="h-4 w-4" />
              Select different image{previews.length > 1 ? "s" : ""}
            </button>
          )}
        </div>

        {hasMultiplePreviews ? (
          <div className="grid gap-4 md:grid-cols-2">
            {previews.map((preview) => (
              <div
                key={preview.url}
                className="overflow-hidden rounded-xl border border-border/70 bg-white shadow-sm"
              >
                <div className="flex aspect-[4/3] items-center justify-center bg-muted/30 p-4">
                  <img
                    src={preview.url}
                    alt={preview.name}
                    className="h-full w-full rounded-xl object-contain"
                  />
                </div>
                <div className="border-t border-border/60 px-4 py-3">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {preview.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatBytes(preview.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border/70 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {previews[0]?.name}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatBytes(previews[0]?.size ?? 0)}
                </p>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Layers3 className="h-3.5 w-3.5" />
                {previewLabel}
              </div>
            </div>
            <div className="flex min-h-[420px] items-center justify-center bg-gray-200 p-4">
              {previewContent ?? (
                <img
                  src={previews[0]?.url}
                  alt={previews[0]?.name}
                  className="max-h-[520px] w-full object-contain"
                />
              )}
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  const renderDropzoneCard = (content: ReactNode, paddingClassName: string) => (
    <div
      {...getRootProps()}
      className={cn(baseDropzoneClassName, paddingClassName)}
    >
      <input {...getInputProps()} />
      <AnimatePresence mode="wait">{content}</AnimatePresence>
    </div>
  );

  const renderStaticPreviewCard = (content: ReactNode, paddingClassName: string) => (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border-2 border-dashed border-border bg-card transition-all duration-300 ease-out",
        paddingClassName
      )}
    >
      {content}
    </div>
  );

  return (
    <div className={cn("w-full", className)}>
      {previews.length > 0 && aside ? (
        <div className="grid gap-6 xl:grid-cols-12 xl:items-start">
          <div className="xl:col-span-8">
            {interactivePreview
              ? renderStaticPreviewCard(renderPreviewContent(), "p-4 md:p-5")
              : renderDropzoneCard(renderPreviewContent(), "p-4 md:p-5")}
          </div>
          <div className="xl:col-span-4">
            <div
              className={cn(
                "rounded-2xl border border-border bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]",
                asideClassName
              )}
            >
              {aside}
            </div>
          </div>
        </div>
      ) : (
        renderDropzoneCard(
          previews.length === 0 ? renderPrompt() : renderPreviewContent(),
          previews.length > 0 ? "p-4" : "p-12"
        )
      )}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-start gap-3 text-destructive"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
