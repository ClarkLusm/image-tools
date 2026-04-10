import {defineRouting} from "next-intl/routing";
import {DEFAULT_LANGUAGE, type SupportedLanguage} from "@/app/lib/i18n-config";

export const routing = defineRouting({
  locales: ["en", "vi"] satisfies SupportedLanguage[],
  defaultLocale: DEFAULT_LANGUAGE,
  localePrefix: "as-needed",
});
