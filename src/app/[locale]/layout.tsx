import type { Metadata } from "next";
import {ReactNode} from "react";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import {Navbar} from "@/app/components/layout/navbar";
import {Footer} from "@/app/components/layout/footer";
import { HtmlLangSync } from "@/app/components/layout/html-lang-sync";
import { createPageMetadata, type LocaleMetadataParams, resolveSupportedLanguage } from "@/app/lib/metadata";
import { SITE_NAME } from "@/app/lib/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: LocaleMetadataParams): Promise<Metadata> {
  const {locale} = await params;
  const languageCode = resolveSupportedLanguage(locale);

  return {
    ...createPageMetadata({
      locale: languageCode,
      path: "/",
      title: {
        en: `${SITE_NAME} — Fast, Free Image Tools`,
        vi: `${SITE_NAME} — Bộ công cụ ảnh nhanh và miễn phí`,
        de: `${SITE_NAME} — Schnelle, kostenlose Bildtools`,
      },
      description: {
        en: "Fast, free, and secure image tools. Compress, convert, resize, crop, and optimize images in seconds.",
        vi: "Bộ công cụ ảnh nhanh, miễn phí và an toàn để nén, chuyển đổi, resize, crop và tối ưu ảnh chỉ trong vài giây.",
        de: "Schnelle, kostenlose und sichere Bildtools. Bilder in Sekunden komprimieren, konvertieren, skalieren, zuschneiden und optimieren.",
      },
    }),
    title: {
      default:
        languageCode === "vi"
          ? `${SITE_NAME} — Bộ công cụ ảnh nhanh và miễn phí`
          : languageCode === "de"
            ? `${SITE_NAME} — Schnelle, kostenlose Bildtools`
            : `${SITE_NAME} — Fast, Free Image Tools`,
      template: `%s | ${SITE_NAME}`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = (await getMessages()) as {common: unknown};

  return (
    <NextIntlClientProvider locale={locale} messages={{common: messages.common}}>
      <HtmlLangSync locale={locale} />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
