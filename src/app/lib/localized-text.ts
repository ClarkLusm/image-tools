import type { SupportedLanguage } from "./i18n-config";

/** One value per supported locale. Every locale is required by the type. */
export type TextByLocale<T = string> = Record<SupportedLanguage, T>;

/**
 * Picks the value for `locale`, falling back to English for unknown
 * locales. Used by client components for short UI strings, so a new string
 * cannot be added without its Vietnamese and German version.
 */
export function pickText<T>(locale: string, values: TextByLocale<T>): T {
  return Object.prototype.hasOwnProperty.call(values, locale)
    ? values[locale as SupportedLanguage]
    : values.en;
}
