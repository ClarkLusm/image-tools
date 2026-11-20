"use client";

import { useState } from "react";
import { ImagePreviewWorkspace } from "@/app/components/shared/image-preview-workspace";

type ImageComparisonWorkspaceProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  filename?: string;
  details?: string;
  transparent?: boolean;
};

export function ImageComparisonWorkspace({
  beforeSrc, afterSrc, beforeLabel = "Original", afterLabel = "Result", filename, details, transparent,
}: ImageComparisonWorkspaceProps) {
  const [view, setView] = useState<"before" | "after">("after");
  return (
    <div className="min-w-0 space-y-3">
      <div role="group" aria-label="Compare image versions" className="inline-flex max-w-full flex-wrap gap-1 rounded-xl border border-border bg-card p-1">
        <button type="button" aria-pressed={view === "before"} onClick={() => setView("before")} className={`rounded-lg px-4 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary ${view === "before" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{beforeLabel}</button>
        <button type="button" aria-pressed={view === "after"} onClick={() => setView("after")} className={`rounded-lg px-4 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-primary ${view === "after" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{afterLabel}</button>
      </div>
      <ImagePreviewWorkspace key={view === "before" ? beforeSrc : afterSrc} src={view === "before" ? beforeSrc : afterSrc} alt={view === "before" ? beforeLabel : afterLabel} filename={filename} details={details} transparent={view === "after" && transparent} />
    </div>
  );
}
