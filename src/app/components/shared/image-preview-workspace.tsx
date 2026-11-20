"use client";

import { useState } from "react";
import { Maximize2, Minus, Plus, RotateCcw } from "lucide-react";

type ImagePreviewWorkspaceProps = {
  src: string;
  alt: string;
  filename?: string;
  details?: string;
  transparent?: boolean;
};

export function ImagePreviewWorkspace({
  src,
  alt,
  filename,
  details,
  transparent = false,
}: ImagePreviewWorkspaceProps) {
  const [zoom, setZoom] = useState<number | null>(null);
  const [naturalWidth, setNaturalWidth] = useState(0);

  const currentZoom = zoom ?? 100;
  const checkerboard = transparent
    ? { backgroundImage: "linear-gradient(45deg, #d1d5db 25%, transparent 25%), linear-gradient(-45deg, #d1d5db 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d1d5db 75%), linear-gradient(-45deg, transparent 75%, #d1d5db 75%)", backgroundSize: "24px 24px", backgroundPosition: "0 0, 0 12px, 12px -12px, -12px 0" }
    : undefined;

  return (
    <div key={src} className="min-w-0 overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-3 py-3 sm:px-5">
        <div className="min-w-0">
          {filename ? <p className="max-w-[24rem] truncate text-sm font-semibold" title={filename}>{filename}</p> : <p className="text-sm font-semibold">{alt}</p>}
          {details ? <p className="text-xs text-muted-foreground">{details}</p> : null}
        </div>
        <div role="group" aria-label="Image zoom controls" className="flex items-center gap-1">
          <button type="button" aria-label="Zoom out" disabled={currentZoom <= 25} onClick={() => setZoom(Math.max(25, currentZoom - 25))} className="rounded-lg p-2 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40"><Minus className="h-4 w-4" /></button>
          <span className="min-w-12 text-center text-xs tabular-nums">{zoom === null ? "Fit" : `${zoom}%`}</span>
          <button type="button" aria-label="Zoom in" disabled={currentZoom >= 400} onClick={() => setZoom(Math.min(400, currentZoom + 25))} className="rounded-lg p-2 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40"><Plus className="h-4 w-4" /></button>
          <button type="button" aria-label="Actual size" onClick={() => setZoom(100)} className="rounded-lg p-2 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary"><Maximize2 className="h-4 w-4" /></button>
          <button type="button" aria-label="Fit to view" onClick={() => setZoom(null)} className="rounded-lg p-2 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary"><RotateCcw className="h-4 w-4" /></button>
        </div>
      </div>
      <div className="flex min-h-[320px] max-h-[min(70vh,760px)] items-center justify-start overflow-auto bg-muted/30 p-4 lg:min-h-[480px]" style={checkerboard}>
        <img src={src} alt={alt} draggable={false} onLoad={(event) => setNaturalWidth(event.currentTarget.naturalWidth)} className={zoom === null ? "m-auto max-h-[min(65vh,720px)] max-w-full object-contain" : "m-auto max-w-none shrink-0 object-contain"} style={zoom === null ? undefined : { width: `${naturalWidth * zoom / 100}px` }} />
      </div>
    </div>
  );
}
