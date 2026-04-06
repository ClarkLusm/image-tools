"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
};

export function BrandLogo({
  className,
  iconClassName,
  textClassName,
}: BrandLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/logo.webp"
        alt="OptiMAGES.com"
        width={1714}
        height={504}
        priority
        className={cn("h-11 w-auto shrink-0 object-contain", iconClassName)}
      />
      <span
        className={cn(
          "flex items-end gap-0.5 leading-none text-slate-800",
          textClassName
        )}
      >
        <span className="text-[1.9rem] font-black tracking-[-0.05em]">
          Opti
        </span>
        <span className="text-[1.9rem] font-light tracking-[-0.05em]">
          MAGES
        </span>
      </span>
    </div>
  );
}
