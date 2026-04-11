import type { SupportedLanguage } from "./i18n-config";

const lookupLoaders: Record<SupportedLanguage, () => Promise<Record<string, string>>> = {
  en: async () => (await import("@/messages/en/tool-layout-lookup.json")).default,
  vi: async () => (await import("@/messages/vi/tool-layout-lookup.json")).default,
  de: async () => (await import("@/messages/de/tool-layout-lookup.json")).default,
};

export async function getToolLayoutLookup(
  languageCode: SupportedLanguage,
): Promise<Record<string, string>> {
  return lookupLoaders[languageCode]();
}
