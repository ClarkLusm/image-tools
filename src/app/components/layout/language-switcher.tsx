"use client";

import Image from "next/image";
import { useMemo, useState, type FocusEvent } from "react";
import { Check, ChevronDown, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANGUAGE_OPTIONS, useI18n } from "@/app/lib/i18n";

function LanguageMark({ code }: { code: string }) {
  return (
    <Image
      src={`/images/${code}.svg`}
      alt="English"
      width={18}
      height={18}
      className="h-[18px] w-[18px] rounded-full object-cover"
    />
  );
}

function handleBlur(event: FocusEvent<HTMLDivElement>, onClose: () => void) {
  const nextTarget = event.relatedTarget;

  if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
    onClose();
  }
}

export function DesktopLanguageMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { languageCode, setLanguageCode, t } = useI18n();
  const activeLanguage = useMemo(
    () =>
      LANGUAGE_OPTIONS.find((option) => option.code === languageCode) ??
      LANGUAGE_OPTIONS[0],
    [languageCode],
  );

  return (
    <div
      className="relative hidden md:block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocusCapture={() => setIsOpen(true)}
      onBlurCapture={(event) => handleBlur(event, () => setIsOpen(false))}
    >
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
      >
        <LanguageMark code={activeLanguage.code} />
        <span>{activeLanguage.code.toUpperCase()}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isOpen ? "rotate-180" : "",
          )}
        />
      </button>

      <div
        className={cn(
          "absolute right-0 top-full z-50 pt-2 transition-all duration-200",
          isOpen
            ? "visible translate-y-0 opacity-100 pointer-events-auto"
            : "invisible translate-y-1 opacity-0 pointer-events-none",
        )}
      >
        <div className="w-56 rounded-2xl border border-border bg-white p-2 shadow-xl">
          <div className="px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {t("language.label")}
            </p>
          </div>

          {LANGUAGE_OPTIONS.map((option) => {
            const isActive = option.code === languageCode;

            return (
              <button
                key={option.code}
                type="button"
                onClick={() => {
                  setLanguageCode(option.code);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-secondary",
                )}
              >
                <div className="flex items-center gap-3">
                  <LanguageMark code={option.code} />
                  <div>
                    <p className="text-sm font-semibold">
                      {option.nativeLabel}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {option.label}
                    </p>
                  </div>
                </div>
                {isActive ? <Check className="h-4 w-4" /> : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function MobileLanguageMenu() {
  const { languageCode, setLanguageCode, t } = useI18n();

  return (
    <div className="mt-3 rounded-2xl border border-border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Languages className="h-4 w-4 text-primary" />
        {t("language.label")}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {LANGUAGE_OPTIONS.map((option) => {
          const isActive = option.code === languageCode;

          return (
            <button
              key={option.code}
              type="button"
              onClick={() => setLanguageCode(option.code)}
              className={cn(
                "rounded-xl border px-3 py-3 text-left transition-colors",
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-foreground hover:bg-secondary",
              )}
            >
              <div className="flex items-center gap-3">
                <LanguageMark code={option.code} />
                <div>
                  <p className="text-sm font-semibold">{option.nativeLabel}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {option.label}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
