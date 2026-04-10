import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { DEFAULT_LANGUAGE, type SupportedLanguage } from "./i18n-config";
import { SITE_NAME, SITE_URL } from "./site";

type LocalizedText =
  | string
  | Partial<Record<SupportedLanguage, string>>;

export type LocaleMetadataParams = {
  params: Promise<{ locale: string }>;
};

const OPEN_GRAPH_LOCALE: Record<SupportedLanguage, string> = {
  en: "en_US",
  vi: "vi_VN",
};

function trimTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function normalizePath(path: string) {
  if (!path || path === "/") {
    return "";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function resolveSupportedLanguage(locale: string): SupportedLanguage {
  return locale === "vi" ? "vi" : DEFAULT_LANGUAGE;
}

export function resolveLocalizedText(
  locale: SupportedLanguage,
  value: LocalizedText,
) {
  if (typeof value === "string") {
    return value;
  }

  return value[locale] ?? value.en ?? "";
}

export function buildLocalePath(locale: SupportedLanguage, path = "/") {
  const normalizedPath = normalizePath(path);

  if (locale === DEFAULT_LANGUAGE) {
    return normalizedPath || "/";
  }

  return `/${locale}${normalizedPath}`;
}

export function buildLocaleUrl(locale: SupportedLanguage, path = "/") {
  return `${trimTrailingSlash(SITE_URL)}${buildLocalePath(locale, path)}`;
}

export function buildLanguageAlternates(path = "/") {
  return Object.fromEntries(
    [
      ...routing.locales.map((locale) => [
        locale,
        buildLocaleUrl(locale, path),
      ]),
      ["x-default", buildLocaleUrl(DEFAULT_LANGUAGE, path)],
    ],
  );
}

type CreatePageMetadataOptions = {
  locale: string;
  path: string;
  title: LocalizedText;
  description: LocalizedText;
  openGraphTitle?: LocalizedText;
  openGraphDescription?: LocalizedText;
  twitterTitle?: LocalizedText;
  twitterDescription?: LocalizedText;
  robots?: Metadata["robots"];
};

export function createPageMetadata({
  locale,
  path,
  title,
  description,
  openGraphTitle,
  openGraphDescription,
  twitterTitle,
  twitterDescription,
  robots,
}: CreatePageMetadataOptions): Metadata {
  const languageCode = resolveSupportedLanguage(locale);
  const canonical = buildLocaleUrl(languageCode, path);
  const resolvedTitle = resolveLocalizedText(languageCode, title);
  const resolvedDescription = resolveLocalizedText(languageCode, description);
  const resolvedOpenGraphTitle = resolveLocalizedText(
    languageCode,
    openGraphTitle ?? title,
  );
  const resolvedOpenGraphDescription = resolveLocalizedText(
    languageCode,
    openGraphDescription ?? description,
  );
  const resolvedTwitterTitle = resolveLocalizedText(
    languageCode,
    twitterTitle ?? openGraphTitle ?? title,
  );
  const resolvedTwitterDescription = resolveLocalizedText(
    languageCode,
    twitterDescription ?? openGraphDescription ?? description,
  );

  return {
    metadataBase: new URL(trimTrailingSlash(SITE_URL)),
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      type: "website",
      locale: OPEN_GRAPH_LOCALE[languageCode],
      siteName: SITE_NAME,
      url: canonical,
      title: resolvedOpenGraphTitle,
      description: resolvedOpenGraphDescription,
      images: [
        {
          url: `${trimTrailingSlash(SITE_URL)}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTwitterTitle,
      description: resolvedTwitterDescription,
      images: [`${trimTrailingSlash(SITE_URL)}/opengraph-image`],
    },
    robots,
  };
}
