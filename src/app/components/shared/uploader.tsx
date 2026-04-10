"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useLocale } from "next-intl";
import { Loader2, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UploaderProps } from "./uploader-core";
import { debugLog } from "@/lib/debug";

const UploaderCore = dynamic(
  () => import("./uploader-core").then((mod) => mod.UploaderCore),
  {
    ssr: false,
  }
);

function UploaderShell({
  className,
  onPrimed,
  topRightAction,
}: {
  className?: string;
  onPrimed: () => void;
  topRightAction?: ReactNode;
}) {
  const locale = useLocale();
  const isVietnamese = locale === "vi";

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
        {topRightAction ? (
          <div
            className="absolute right-4 top-4 z-10"
            onClick={(event) => event.stopPropagation()}
            onPointerDown={(event) => event.stopPropagation()}
          >
            {topRightAction}
          </div>
        ) : null}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-primary/10 text-primary">
            <UploadCloud className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-display font-semibold text-foreground mb-2">
            {isVietnamese ? "Tải ảnh lên" : "Upload image"}
          </h3>
          <p className="text-muted-foreground mb-2">
            {isVietnamese
              ? "Đang chuẩn bị khung tải ảnh kéo thả..."
              : "Preparing uploader for drag-and-drop..."}
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            {isVietnamese
              ? "Đang tải phần tương tác"
              : "Loading interaction bundle"}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Uploader(props: UploaderProps) {
  const [isPrimed, setIsPrimed] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof IntersectionObserver === "undefined"
  );
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isPrimed) return;

    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          debugLog("uploader", "Primed by intersection");
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
    const timer = window.setTimeout(() => {
      debugLog("uploader", "Primed by fallback timeout");
      setIsPrimed(true);
    }, 1500);
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
          topRightAction={props.topRightAction}
        />
      )}
    </div>
  );
}
