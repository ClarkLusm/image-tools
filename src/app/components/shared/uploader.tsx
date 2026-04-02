"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UploaderProps } from "./uploader-core";

const UploaderCore = dynamic(
  () => import("./uploader-core").then((mod) => mod.UploaderCore),
  {
    ssr: false,
  }
);

function UploaderShell({
  className,
  onPrimed,
}: {
  className?: string;
  onPrimed: () => void;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div
        role="button"
        tabIndex={0}
        onClick={onPrimed}
        onPointerEnter={onPrimed}
        onFocus={onPrimed}
        onTouchStart={onPrimed}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onPrimed();
          }
        }}
        className="relative overflow-hidden rounded-2xl border-2 border-dashed border-border bg-card p-12 cursor-pointer hover:bg-secondary/50 transition-colors"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-primary/10 text-primary">
            <UploadCloud className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-display font-semibold text-foreground mb-2">
            Upload image
          </h3>
          <p className="text-muted-foreground mb-2">
            Preparing uploader for drag-and-drop...
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Loading interaction bundle
          </div>
        </div>
      </div>
    </div>
  );
}

export function Uploader(props: UploaderProps) {
  const [isPrimed, setIsPrimed] = useState(false);
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isPrimed) return;

    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === "undefined") {
      setIsPrimed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsPrimed(true);
        }
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(host);

    return () => observer.disconnect();
  }, [isPrimed]);

  useEffect(() => {
    if (isPrimed) return;
    const timer = window.setTimeout(() => setIsPrimed(true), 1500);
    return () => window.clearTimeout(timer);
  }, [isPrimed]);

  return (
    <div ref={hostRef}>
      {isPrimed ? (
        <UploaderCore {...props} />
      ) : (
        <UploaderShell
          className={props.className}
          onPrimed={() => setIsPrimed(true)}
        />
      )}
    </div>
  );
}
