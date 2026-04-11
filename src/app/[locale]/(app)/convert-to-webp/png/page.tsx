import { ToolLayout } from "@/app/components/layout/tool-layout";
import FormatConvertClient from "@/app/components/tools/format-convert-client";
import { SITE_URL } from "@/lib/site";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { createPageMetadata } from "@/app/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    path: "/convert-to-webp/png",
    title: {
      en: "PNG to WebP (Free Online Tool)",
      vi: "PNG sang WebP - Công cụ online miễn phí",
    },
    description: {
      en: "Convert PNG images to WebP while preserving transparency.",
      vi: "Chuyển ảnh PNG sang WebP mà vẫn giữ nền trong suốt.",
    },
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      locale={locale}
      title="PNG to WebP"
      description="Convert PNG images to WebP with transparency support."
      steps={[
        { title: "Upload PNG", description: "Select the PNG file you want to convert." },
        { title: "Adjust Quality", description: "Pick the WebP quality level." },
        { title: "Download", description: "Save your converted WebP instantly." }
      ]}
      faqs={[
        { q: "Does WebP keep transparency?", a: "Yes. WebP supports transparent pixels like PNG." },
        { q: "Is my file uploaded?", a: "No. Everything runs locally in your browser." }
      ]}
      relatedTools={[
        { name: "JPG to WebP", path: "/convert-to-webp/jpg" },
        { name: "Convert to PNG", path: "/convert-to-png" }
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-convert-to-webp-png"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Convert to WebP", url: `${siteUrl}/convert-to-webp` },
          { name: "PNG to WebP", url: `${siteUrl}/convert-to-webp/png` },
        ]}
      />
      <FormatConvertClient
        task="convert-to-webp"
        accept={{ "image/png": [".png"] }}
        outputExt=".webp"
        outputMime="image/webp"
        qualityDefault={0.9}
        showQuality
        buttonLabel="Convert PNG to WebP"
        note="Higher quality means larger file size."
        autoProcessOnSelect
      />
    </ToolLayout>
  );
}
