"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  q: string;
  a: string;
};

interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpenIndex?: number;
}

export function FAQAccordion({
  items,
  defaultOpenIndex = 0,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    items.length > 0 ? defaultOpenIndex : null,
  );

  return (
    <div className="space-y-5">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-xl border border-border bg-white shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
          >
            <button
              type="button"
              onClick={() => {
                setOpenIndex((current) => (current === index ? null : index));
              }}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-7 py-6 text-left"
            >
              <h3 className="text-md font-semibold text-foreground">{item.q}</h3>
              <ChevronDown
                className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen ? (
              <div className="border-t border-border/70 px-7 py-6">
                <p className="leading-8 text-muted-foreground">{item.a}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
