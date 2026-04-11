import type { Metadata } from "next";
import { ComingSoonPage } from "@/app/components/shared/coming-soon-page";
import { createPageMetadata } from "@/app/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    path: "/coming-soon",
    title: {
      en: "Coming Soon",
      vi: "Sắp ra mắt",
      de: "Demnächst verfügbar",
    },
    description: {
      en: "This page is not live yet. Explore the image tools that are already available.",
      vi: "Trang này chưa hoạt động. Hãy khám phá các công cụ ảnh đã có sẵn.",
      de: "Diese Seite ist noch nicht live. Entdecke die Bildtools, die bereits verfügbar sind.",
    },
    robots: {
      index: false,
      follow: false,
    },
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ComingSoonPage locale={locale} />;
}
