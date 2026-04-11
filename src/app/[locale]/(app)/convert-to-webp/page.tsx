import { FileImage } from "lucide-react";
import FormatConvertLandingPage from "@/app/components/tools/format-convert-landing-page";
import { createPageMetadata } from "@/app/lib/metadata";
import { getToolPageContent } from "@/app/lib/tool-page-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getToolPageContent("convert-to-webp", locale);

  return createPageMetadata({
    locale,
    path: "/convert-to-webp",
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
  const content = await getToolPageContent("convert-to-webp", locale);

  return (
    <FormatConvertLandingPage
      locale={locale}
      path="/convert-to-webp"
      task="convert-to-webp"
      accept={{
        "image/jpeg": [".jpg", ".jpeg"],
        "image/png": [".png"],
        "image/gif": [".gif"],
        "image/svg+xml": [".svg"],
      }}
      outputExt=".webp"
      outputMime="image/webp"
      qualityDefault={0.9}
      showQuality
      sourceIcon={FileImage}
      content={content}
    />
  );
}
