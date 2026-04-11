import { resolveSupportedLanguage } from "@/app/lib/metadata";
import type { FormatConvertLandingPageContent } from "@/app/components/tools/format-convert-landing-page";

type ToolPageKey =
  | "convert-to-png"
  | "convert-to-jpg"
  | "convert-to-webp";

const toolPageLoaders = {
  "convert-to-png": {
    en: () => import("@/messages/en/convert-to-png.json"),
    vi: () => import("@/messages/vi/convert-to-png.json"),
    de: () => import("@/messages/de/convert-to-png.json"),
  },
  "convert-to-jpg": {
    en: () => import("@/messages/en/convert-to-jpg.json"),
    vi: () => import("@/messages/vi/convert-to-jpg.json"),
    de: () => import("@/messages/de/convert-to-jpg.json"),
  },
  "convert-to-webp": {
    en: () => import("@/messages/en/convert-to-webp.json"),
    vi: () => import("@/messages/vi/convert-to-webp.json"),
    de: () => import("@/messages/de/convert-to-webp.json"),
  },
} satisfies Record<
  ToolPageKey,
  Record<"en" | "vi" | "de", () => Promise<{ default: FormatConvertLandingPageContent }>>
>;

export async function getToolPageContent(pageKey: ToolPageKey, locale: string) {
  const languageCode = resolveSupportedLanguage(locale);
  const contentModule = await toolPageLoaders[pageKey][languageCode]();

  return contentModule.default;
}
