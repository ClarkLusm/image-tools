"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { formatBytes } from "@/lib/image-utils";

type ToolExportPanelProps = {
  locale?: string;
  originalName: string;
  extension: string;
  outputSize: number;
  originalSize?: number;
  dimensions?: string;
  formatLabel?: string;
  onDownload: (filename: string) => void;
  onAdjust?: () => void;
  disabled?: boolean;
};

export function ToolExportPanel({
  locale = "en", originalName, extension, outputSize, originalSize,
  dimensions, formatLabel, onDownload, onAdjust, disabled = false,
}: ToolExportPanelProps) {
  const vi = locale === "vi";
  const de = locale === "de";
  const [baseName, setBaseName] = useState(originalName);
  const ext = extension.replace(/^\./, "").toLowerCase();
  const cleanName = Array.from(baseName.trim()).map((char) => char.charCodeAt(0) < 32 || "\\/:*?\"<>|".includes(char) ? "-" : char).join("").replace(/\.+$/, "").slice(0, 180);
  const filename = `${cleanName || "image"}.${ext}`;
  useEffect(() => setBaseName(originalName), [originalName]);

  return (
    <section aria-label={vi ? "Xuất ảnh" : de ? "Bild exportieren" : "Export image"} className="min-w-0 space-y-4 rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{vi ? "Xuất ảnh" : de ? "Bild exportieren" : "Export image"}</h3>
          <p className="text-sm text-muted-foreground">{vi ? "Kiểm tra kết quả trước khi tải xuống" : de ? "Ergebnis vor dem Herunterladen prüfen" : "Review the result before downloading"}</p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{formatLabel || ext.toUpperCase()}</span>
      </div>
      <div className="grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div className="min-w-0 space-y-1.5">
          <label htmlFor="tool-export-name" className="text-sm font-medium">{vi ? "Tên tệp" : de ? "Dateiname" : "File name"}</label>
          <div className="flex min-w-0 items-center overflow-hidden rounded-lg border border-border bg-background focus-within:ring-2 focus-within:ring-primary/50">
            <input id="tool-export-name" type="text" maxLength={180} value={baseName} onChange={(event) => setBaseName(event.target.value)} className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-none" />
            <span className="shrink-0 border-l border-border bg-muted px-3 py-2.5 text-sm text-muted-foreground">.{ext}</span>
          </div>
        </div>
        <button type="button" disabled={disabled} onClick={() => onDownload(filename)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50">
          <Download aria-hidden="true" className="h-4 w-4" />
          {vi ? "Tải xuống" : de ? "Herunterladen" : "Download"}
        </button>
      </div>
      <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <div><dt className="inline text-muted-foreground">{vi ? "Dung lượng" : de ? "Größe" : "Size"}: </dt><dd className="inline font-semibold">{formatBytes(outputSize)}</dd></div>
        {originalSize !== undefined ? <div><dt className="inline text-muted-foreground">{vi ? "Ban đầu" : de ? "Original" : "Original"}: </dt><dd className="inline">{formatBytes(originalSize)}</dd></div> : null}
        {dimensions ? <div><dt className="inline text-muted-foreground">{vi ? "Kích thước" : de ? "Abmessungen" : "Dimensions"}: </dt><dd className="inline">{dimensions}</dd></div> : null}
      </dl>
      {onAdjust ? <button type="button" onClick={onAdjust} className="text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-primary">{vi ? "Chỉnh lại thông số" : de ? "Einstellungen anpassen" : "Adjust settings"}</button> : null}
    </section>
  );
}
