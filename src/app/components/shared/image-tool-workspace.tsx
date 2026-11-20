"use client";

import type { ReactNode } from "react";

type ImageToolWorkspaceProps = {
  preview: ReactNode;
  settings?: ReactNode;
  toolbar?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function ImageToolWorkspace({
  preview,
  settings,
  toolbar,
  footer,
  className = "",
}: ImageToolWorkspaceProps) {
  return (
    <section className={`min-w-0 space-y-4 ${className}`}>
      {toolbar ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3">
          {toolbar}
        </div>
      ) : null}
      <div className={settings ? "grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_360px]" : "min-w-0"}>
        <div className="min-w-0">{preview}</div>
        {settings ? (
          <aside aria-label="Image settings" className="min-w-0 lg:self-start lg:sticky lg:top-24">
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">{settings}</div>
          </aside>
        ) : null}
      </div>
      {footer ? <div className="rounded-xl border border-border bg-card p-4 sm:p-5">{footer}</div> : null}
    </section>
  );
}
