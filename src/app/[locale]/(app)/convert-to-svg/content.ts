import { resolveSupportedLanguage } from "@/app/lib/metadata";

export type ConvertToSvgContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  description: string;
  visualGuide: {
    title: string;
    description: string;
    eyebrow: string;
  };
  imageAlts: {
    hero: string;
    useCases: string;
    comparison: string;
  };
  steps: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
  cards: { title: string; description: string }[];
  sectionA: {
    title: string;
    body: string[];
  };
  sectionB: {
    title: string;
    body: string[];
  };
  ctas: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  breadcrumbs: {
    home: string;
    current: string;
  };
};

export async function getConvertToSvgContent(locale: string) {
  const languageCode = resolveSupportedLanguage(locale);

  const contentModule =
    languageCode === "vi"
      ? await import("@/messages/vi/convert-to-svg.json")
      : await import("@/messages/en/convert-to-svg.json");

  return contentModule.default as ConvertToSvgContent;
}
