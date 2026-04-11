import { Image as ImageIcon } from "lucide-react";
import FormatConvertLandingPage from "@/app/components/tools/format-convert-landing-page";
import { createPageMetadata } from "@/app/lib/metadata";
import { getToolPageContent } from "@/app/lib/tool-page-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getToolPageContent("convert-to-jpg", locale);

  return createPageMetadata({
    locale,
    path: "/convert-to-jpg",
    title: content.metaTitle,
    description: content.metaDescription,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getToolPageContent("convert-to-jpg", locale);

  return (
    <FormatConvertLandingPage
      locale={locale}
      path="/convert-to-jpg"
      task="convert-to-jpg"
      accept={{
        "image/png": [".png"],
        "image/webp": [".webp"],
        "image/gif": [".gif"],
        "image/svg+xml": [".svg"],
      }}
      outputExt=".jpg"
      outputMime="image/jpeg"
      qualityDefault={0.92}
      sourceIcon={ImageIcon}
      content={content}
    />
  );
}
