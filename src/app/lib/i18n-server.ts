import {getLocale, getMessages} from "next-intl/server";
import {DEFAULT_LANGUAGE, type SupportedLanguage} from "./i18n-config";
import {routing} from "@/i18n/routing";

export function isSupportedLanguage(value: string): value is SupportedLanguage {
  return routing.locales.includes(value as SupportedLanguage);
}

export async function getRequestLanguage(): Promise<SupportedLanguage> {
  const locale = await getLocale();

  return isSupportedLanguage(locale) ? locale : DEFAULT_LANGUAGE;
}

export async function getRequestMessages() {
  return await getMessages();
}
