export type SupportedLanguage = "en" | "vi";

export type LanguageOption = {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
};

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "vi", label: "Vietnamese", nativeLabel: "Tiếng Việt" },
];

export const DEFAULT_LANGUAGE: SupportedLanguage = "en";
