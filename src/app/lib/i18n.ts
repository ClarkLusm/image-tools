"use client";

import {useLocale, useTranslations} from "next-intl";
import {LANGUAGE_OPTIONS, type SupportedLanguage} from "./i18n-config";
import {Link, usePathname, useRouter} from "@/i18n/navigation";
import {SITE_NAME} from "@/lib/site";

export {LANGUAGE_OPTIONS, Link};

type CommonTranslationFn = (
  key: string,
  values?: Record<string, string | number>,
) => string;

export function localizeNavItem<
  T extends {translationKey: string; hasDescription?: boolean},
>(item: T, t: CommonTranslationFn) {
  return {
    ...item,
    name: t(`navItems.${item.translationKey}.name`, {siteName: SITE_NAME}),
    description: item.hasDescription
      ? t(`navItems.${item.translationKey}.description`, {siteName: SITE_NAME})
      : undefined,
  };
}

export function useI18n() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("common");
  const languageCode = locale as SupportedLanguage;

  const setLanguageCode = (nextLanguageCode: SupportedLanguage) => {
    router.replace(pathname, {locale: nextLanguageCode});
  };

  return {
    languageCode,
    setLanguageCode,
    t,
  };
}
