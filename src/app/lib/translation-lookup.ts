import type {SupportedLanguage} from "./i18n-config";

export function translateLookupText(
  text: string,
  languageCode: SupportedLanguage,
  lookup: Record<string, string>,
) {
  const leading = text.match(/^\s*/)?.[0] ?? "";
  const trailing = text.match(/\s*$/)?.[0] ?? "";
  const normalizedText = text.replace(/\s+/g, " ").trim();

  if (!normalizedText || languageCode === "en") {
    return text;
  }

  const translated = lookup[normalizedText];
  return translated ? `${leading}${translated}${trailing}` : text;
}
