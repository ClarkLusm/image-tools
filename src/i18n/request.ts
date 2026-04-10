import {getRequestConfig} from "next-intl/server";
import {DEFAULT_LANGUAGE} from "@/app/lib/i18n-config";
import {routing} from "./routing";
import type {SupportedLanguage} from "@/app/lib/i18n-config";

const messageLoaders: Record<
  SupportedLanguage,
  () => Promise<Record<string, unknown>>
> = {
  en: async () => {
    const [common, home, toolLayout] = await Promise.all([
      import("../messages/en/common.json"),
      import("../messages/en/home.json"),
      import("../messages/en/tool-layout.json"),
    ]);

    return {
      common: common.default,
      home: home.default,
      "tool-layout": toolLayout.default,
    };
  },
  vi: async () => {
    const [common, home, toolLayout] = await Promise.all([
      import("../messages/vi/common.json"),
      import("../messages/vi/home.json"),
      import("../messages/vi/tool-layout.json"),
    ]);

    return {
      common: common.default,
      home: home.default,
      "tool-layout": toolLayout.default,
    };
  },
};

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
    messages: await messageLoaders[locale](),
  };
});
