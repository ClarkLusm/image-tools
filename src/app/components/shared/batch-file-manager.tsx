"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, FileImage } from "lucide-react";
import { formatBytes } from "@/lib/image-utils";

export type BatchFileEntry = {
  id: string;
  file: File;
  status: "pending" | "processing" | "done" | "failed";
  outputSize?: number;
  error?: string;
};

type BatchFileManagerProps = {
  items: BatchFileEntry[];
  locale?: string;
  onDownload?: (id: string) => void;
  onRetry?: (id: string) => void;
};

export function BatchFileManager({ items, locale = "en", onDownload, onRetry }: BatchFileManagerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const vi = locale === "vi";
  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  if (!items.length) return null;
  return (
    <section aria-label={vi ? "Danh sách ảnh" : "Image files"} className="grid min-w-0 gap-4 rounded-xl border border-border bg-card p-3 sm:p-4 lg:grid-cols-[minmax(220px,300px)_minmax(0,1fr)]">
      <div className="min-w-0 space-y-2">
        <h3 className="px-2 text-sm font-semibold">{vi ? "Danh sách ảnh" : "Files"} ({items.length})</h3>
        <div className="max-h-[420px] space-y-1 overflow-y-auto">
          {items.map(item => (
            <button key={item.id} type="button" aria-pressed={selected?.id === item.id} onClick={() => setSelectedId(item.id)} className={`flex w-full min-w-0 items-center gap-2 rounded-lg px-3 py-3 text-left focus-visible:ring-2 focus-visible:ring-primary ${selected?.id === item.id ? "bg-primary/10 ring-1 ring-primary/30" : "hover:bg-muted"}`}>
              {item.status === "done" ? <CheckCircle2 aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-600" /> : item.status === "failed" ? <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0 text-destructive" /> : item.status === "processing" ? <Loader2 aria-hidden="true" className="h-4 w-4 shrink-0 animate-spin text-primary" /> : <FileImage aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />}
              <span className="min-w-0 flex-1 truncate text-sm" title={item.file.name}>{item.file.name}</span>
            </button>
          ))}
        </div>
      </div>
      {selected ? (
        <div className="min-w-0 space-y-3 rounded-lg bg-muted/30 p-4">
          <p className="break-all font-semibold">{selected.file.name}</p>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div><dt className="text-muted-foreground">{vi ? "Ảnh gốc" : "Original"}</dt><dd className="font-medium">{formatBytes(selected.file.size)}</dd></div>
            <div><dt className="text-muted-foreground">{vi ? "Đầu ra" : "Output"}</dt><dd className="font-medium">{selected.outputSize === undefined ? "—" : formatBytes(selected.outputSize)}</dd></div>
          </dl>
          <p className="text-sm text-muted-foreground">{selected.status === "done" ? (vi ? "Đã hoàn tất" : "Completed") : selected.status === "failed" ? (vi ? "Thất bại" : "Failed") : selected.status === "processing" ? (vi ? "Đang xử lý" : "Processing") : (vi ? "Đang chờ" : "Pending")}</p>
          {selected.error ? <p role="alert" className="text-sm text-destructive">{selected.error}</p> : null}
          <div className="flex flex-wrap gap-2">
            {selected.status === "done" && onDownload ? <button type="button" onClick={() => onDownload(selected.id)} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary">{vi ? "Tải ảnh" : "Download"}</button> : null}
            {selected.status === "failed" && onRetry ? <button type="button" onClick={() => onRetry(selected.id)} className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary">{vi ? "Thử lại" : "Retry"}</button> : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
