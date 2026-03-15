import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { UploadCloud, Image as ImageIcon, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatBytes } from "@/lib/image-utils";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface UploaderProps {
  onFileSelect: (file: File) => void;
  onFilesSelect?: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxSizeMB?: number;
  className?: string;
  isProcessing?: boolean;
  maxFiles?: number;
}

export function Uploader({ 
  onFileSelect, 
  onFilesSelect,
  accept = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/webp': ['.webp'],
    'image/gif': ['.gif']
  },
  maxSizeMB = 20,
  className,
  isProcessing = false,
  maxFiles = 1,
}: UploaderProps) {
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<{ url: string; name: string; size: number }[]>([]);

  const clearPreviews = useCallback(() => {
    previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    setPreviews([]);
  }, [previews]);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setError(null);

    if (fileRejections.length > 0) {
      const rejection = fileRejections[0];
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError(`File is too large. Max size is ${maxSizeMB}MB.`);
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
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
  }, [clearPreviews, maxFiles, maxSizeMB, onFileSelect, onFilesSelect]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxSize: maxSizeMB * 1024 * 1024,
    maxFiles,
    disabled: isProcessing,
    multiple: maxFiles > 1,
  });

  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ease-out cursor-pointer",
          isDragActive ? "border-primary bg-primary/5 scale-[1.02]" : "border-border bg-card hover:bg-secondary/50",
          isDragReject ? "border-destructive bg-destructive/5" : "",
          isProcessing ? "opacity-60 cursor-not-allowed pointer-events-none" : "",
          previews.length > 0 ? "p-4" : "p-12"
        )}
      >
        <input {...getInputProps()} />
        
        <AnimatePresence mode="wait">
          {previews.length === 0 ? (
            <motion.div 
              key="upload-prompt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm transition-colors",
                isDragActive ? "bg-primary text-white shadow-primary/25" : "bg-primary/10 text-primary"
              )}>
                <UploadCloud className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                Drag & drop your image here
              </h3>
              <p className="text-muted-foreground mb-6">
                or click to browse from your device
              </p>
              <div className="flex gap-4 text-xs font-medium text-muted-foreground/80">
                <span className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-full">
                  <ImageIcon className="w-3 h-3" /> Max {maxSizeMB}MB
                </span>
                <span className="bg-secondary px-3 py-1 rounded-full">
                  JPG, PNG, WEBP
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-center gap-2 text-primary font-medium">
                <CheckCircle2 className="w-5 h-5" />
                <span>{previews.length} file{previews.length > 1 ? "s" : ""} ready</span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {previews.map((preview) => (
                  <div
                    key={preview.url}
                    className="flex items-center gap-4 rounded-xl border border-border/50 bg-secondary/30 p-3"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary border border-border/50 shadow-inner flex-shrink-0">
                      <img
                        src={preview.url}
                        alt={preview.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-display font-semibold text-sm text-foreground truncate max-w-[220px]">
                        {preview.name}
                      </h4>
                      <p className="text-muted-foreground text-xs mt-1">
                        {formatBytes(preview.size)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {!isProcessing && (
                <button 
                  className="self-center px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearPreviews();
                  }}
                >
                  Select different image{previews.length > 1 ? "s" : ""}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
