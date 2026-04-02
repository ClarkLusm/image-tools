"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowLeftRight } from "lucide-react";

type BeforeAfterSliderProps = {
  imageSrc: string;
  alt: string;
  className?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function BeforeAfterSlider({
  imageSrc,
  alt,
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(clamp(next, 0, 100));
  }, []);

  return (
    <div
      ref={frameRef}
      className={`relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/60 select-none touch-none ${className ?? ""}`}
      onPointerMove={(event) => {
        if (!isDragging) return;
        updatePosition(event.clientX);
      }}
      onPointerUp={() => setIsDragging(false)}
      onPointerCancel={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
    >
      <img src={imageSrc} alt={alt} className="absolute inset-0 w-full h-full object-cover" />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={imageSrc}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover blur-[1px] brightness-95"
        />
      </div>

      <div className="absolute left-3 top-3 z-20 rounded-md bg-black/55 text-white text-xs px-2 py-1">
        Before
      </div>
      <div className="absolute right-3 top-3 z-20 rounded-md bg-black/55 text-white text-xs px-2 py-1">
        After
      </div>

      <div
        className="absolute inset-y-0 z-20"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="h-full w-[2px] bg-white/95 shadow-[0_0_0_1px_rgba(0,0,0,0.12)]" />
      </div>

      <button
        type="button"
        role="slider"
        aria-label="Drag to compare before and after image"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onPointerDown={(event) => {
          setIsDragging(true);
          updatePosition(event.clientX);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          setIsDragging(false);
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            setPosition((prev) => clamp(prev - 2, 0, 100));
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            setPosition((prev) => clamp(prev + 2, 0, 100));
          }
          if (event.key === "Home") {
            event.preventDefault();
            setPosition(0);
          }
          if (event.key === "End") {
            event.preventDefault();
            setPosition(100);
          }
        }}
        className="absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white text-primary shadow-md border border-border flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-ew-resize"
        style={{ left: `${position}%` }}
      >
        <ArrowLeftRight className="w-4 h-4" />
      </button>
    </div>
  );
}
