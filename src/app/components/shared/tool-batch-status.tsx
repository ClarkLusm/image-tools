"use client";

import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

type ToolBatchStatusProps = {
  total: number;
  completed: number;
  failed: number;
  processing: number;
  locale?: string;
  title?: string;
};

export function ToolBatchStatus({ total, completed, failed, processing, locale = "en", title }: ToolBatchStatusProps) {
  if (total <= 0) return null;
  const vi = locale === "vi";
  const de = locale === "de";
  const settled = completed + failed;
  const busy = processing > 0;
  return (
    <section role="status" aria-live="polite" aria-atomic="true" className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          {busy ? <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin text-primary" /> : failed > 0 ? <AlertCircle aria-hidden="true" className="h-5 w-5 text-destructive" /> : <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-emerald-600" />}
          <h3 className="font-semibold">{title ?? (vi ? "Tiến trình xử lý" : de ? "Verarbeitungsstatus" : "Processing status")}</h3>
        </div>
        <span className="text-sm tabular-nums text-muted-foreground">{settled} / {total}</span>
      </div>
      <div role="progressbar" aria-label={vi ? "Số tệp đã xử lý" : de ? "Verarbeitete Dateien" : "Files processed"} aria-valuemin={0} aria-valuemax={total} aria-valuenow={settled} className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${Math.min(100, settled / total * 100)}%` }} />
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
        <span>{vi ? "Hoàn tất" : de ? "Fertig" : "Completed"}: <strong className="text-foreground">{completed}</strong></span>
        <span>{vi ? "Đang chờ / xử lý" : de ? "Ausstehend / in Arbeit" : "Pending / processing"}: <strong className="text-foreground">{processing}</strong></span>
        {failed > 0 ? <span className="text-destructive">{vi ? "Thất bại" : de ? "Fehlgeschlagen" : "Failed"}: <strong>{failed}</strong></span> : null}
      </div>
    </section>
  );
}
