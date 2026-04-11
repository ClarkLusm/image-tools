export type SupportedLanguage = "en" | "vi" | "de";

export type LanguageOption = {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
};

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "vi", label: "Vietnamese", nativeLabel: "Tiếng Việt" },
  { code: "de", label: "German", nativeLabel: "Deutsch" },
];

export const DEFAULT_LANGUAGE: SupportedLanguage = "en";
