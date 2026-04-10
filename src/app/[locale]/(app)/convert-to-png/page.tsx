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
  const content = await getToolPageContent("convert-to-png", locale);

  return createPageMetadata({
    locale,
    path: "/convert-to-png",
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
  const content = await getToolPageContent("convert-to-png", locale);

  return (
    <FormatConvertLandingPage
      path="/convert-to-png"
      task="convert-to-png"
      accept={{
        "image/jpeg": [".jpg", ".jpeg"],
        "image/webp": [".webp"],
        "image/gif": [".gif"],
        "image/svg+xml": [".svg"],
      }}
      outputExt=".png"
      outputMime="image/png"
      showQuality={false}
      sourceIcon={ImageIcon}
      content={content}
    />
  );
}
