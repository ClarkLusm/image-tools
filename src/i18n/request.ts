import {getRequestConfig} from "next-intl/server";
import {DEFAULT_LANGUAGE} from "@/app/lib/i18n-config";
import { getNamespaceMessages } from "@/app/lib/namespace-messages";
import {routing} from "./routing";
import type {SupportedLanguage} from "@/app/lib/i18n-config";

function isSupportedLanguage(value: string): value is SupportedLanguage {
  return routing.locales.includes(value as SupportedLanguage);
}

export default getRequestConfig(async ({requestLocale}) => {
  const requestedLocale = await requestLocale;
  const locale =
    requestedLocale && isSupportedLanguage(requestedLocale)
      ? requestedLocale
      : DEFAULT_LANGUAGE;

  return {
    locale,
    messages: {
      common: await getNamespaceMessages(locale, "common"),
    },
  };
});
