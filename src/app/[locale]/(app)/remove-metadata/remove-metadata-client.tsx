"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Download, Loader2, ShieldAlert } from "lucide-react";
import { Uploader } from "@/app/components/shared/uploader";
import { downloadBlob, formatBytes } from "@/lib/image-utils";
import { useImageWorker } from "@/hooks/use-image-worker";
import { motion } from "framer-motion";
import { pickText } from "@/lib/localized-text";

export default function RemoveMetadataClient() {
  const locale = useLocale();
  const [file, setFile] = useState<File | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  const { processImage, isProcessing, error } = useImageWorker();

  const handleProcess = async () => {
    if (!file) return;
    setResultBlob(null);
    const blob = await processImage("remove-metadata", file, {
      mimeType: file.type || "image/jpeg",
    });
    if (blob) setResultBlob(blob);
  };

  const handleDownload = () => {
    if (!resultBlob || !file) return;
    const parts = file.name.split(".");
    const ext = parts.pop();
    const base = parts.join(".");
    downloadBlob(resultBlob, `${base}_clean.${ext}`);
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
          accept={{
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
            "image/webp": [".webp"],
          }}
          aside={
            file ? (
              <div className="text-center">
                <div className="mb-4 inline-flex rounded-full bg-orange-100 p-3 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400">
                  <ShieldAlert className="h-8 w-8" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">
                  {pickText(locale, {
                    en: "Ready to Clean",
                    vi: "Sẵn sàng làm sạch",
                    de: "Bereit zur Bereinigung",
                  })}
                </h3>
                <p className="mx-auto mb-8 max-w-md text-muted-foreground">
                  {pickText(locale, {
                    en: "This process will permanently delete camera models, dates, and GPS coordinates hidden inside this file.",
                    vi: "Quá trình này sẽ xóa vĩnh viễn model máy ảnh, ngày chụp và tọa độ GPS ẩn trong tệp này.",
                    de: "Dabei werden Kameramodell, Aufnahmedatum und GPS-Koordinaten, die in dieser Datei versteckt sind, dauerhaft gelöscht.",
                  })}
                </p>

                <button
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className="mx-auto flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-12 py-4 font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 disabled:transform-none"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />{" "}
                      {pickText(locale, {
                        en: "Scrubbing in background...",
                        vi: "Đang làm sạch trong nền...",
                        de: "Wird im Hintergrund bereinigt...",
                      })}
                    </>
                  ) : (
                    pickText(locale, {
                      en: "Remove All Metadata",
                      vi: "Xóa toàn bộ metadata",
                      de: "Alle Metadaten entfernen",
                    })
                  )}
                </button>
              </div>
            ) : undefined
          }
          asideClassName="border-orange-200 bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950/20"
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
            {pickText(locale, {
              en: "Image is 100% Clean!",
              vi: "Ảnh đã được làm sạch hoàn toàn!",
              de: "Bild ist zu 100 % sauber!",
            })}
          </h3>
          <p className="text-muted-foreground mb-8">
            {pickText(locale, {
              en: "All personal metadata has been stripped. File size: ",
              vi: "Toàn bộ metadata cá nhân đã được xóa. Dung lượng tệp: ",
              de: "Alle persönlichen Metadaten wurden entfernt. Dateigröße: ",
            })}
            <span className="font-semibold">
              {formatBytes(resultBlob.size)}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              {pickText(locale, {
                en: "Download Safe Image",
                vi: "Tải ảnh an toàn xuống",
                de: "Sicheres Bild herunterladen",
              })}
            </button>
            <button
              onClick={() => {
                setFile(null);
                setResultBlob(null);
              }}
              className="px-8 py-4 bg-white text-foreground border border-border font-bold rounded-xl shadow-sm hover:bg-secondary transition-all"
            >
              {pickText(locale, {
                en: "Clean Another",
                vi: "Làm sạch ảnh khác",
                de: "Weiteres Bild bereinigen",
              })}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
