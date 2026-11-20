"use client";

import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

type ToolResultPanelProps = {
  title: string;
  description?: ReactNode;
  preview: ReactNode;
  actions: ReactNode;
};

export function ToolResultPanel({ title, description, preview, actions }: ToolResultPanelProps) {
  return (
    <section aria-label={title} className="min-w-0 space-y-5">
      <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 sm:p-5" role="status">
        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
        <div className="min-w-0">
          <h2 className="text-lg font-bold sm:text-xl">{title}</h2>
          {description ? <div className="mt-1 text-sm text-muted-foreground">{description}</div> : null}
        </div>
      </div>
      <div className="min-w-0">{preview}</div>
      <div className="flex flex-wrap items-center justify-end gap-3 rounded-xl border border-border bg-card p-4 sm:p-5">{actions}</div>
    </section>
  );
}
