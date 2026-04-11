import { ToolLayout } from "@/app/components/layout/tool-layout";
import FormatConvertClient from "@/app/components/tools/format-convert-client";
import FormatConvertNextActions from "@/app/components/tools/format-convert-next-actions";
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
    path: "/convert-to-webp/jpg",
    title: {
      en: "JPG to WebP (Free Online Tool)",
      vi: "JPG sang WebP - Công cụ online miễn phí",
    },
    description: {
      en: "Convert JPG images to WebP with adjustable quality.",
      vi: "Chuyển ảnh JPG sang WebP với chất lượng có thể điều chỉnh.",
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
      title="JPG to WebP"
      description="Convert JPEG images into smaller, modern WebP files."
      steps={[
        { title: "Upload JPG", description: "Select the JPG file you want to convert." },
        { title: "Adjust Quality", description: "Pick the WebP quality level." },
        { title: "Download", description: "Save your converted WebP instantly." }
      ]}
      faqs={[
        { q: "Will quality change?", a: "You control the quality level. Lower quality yields smaller files." },
        { q: "Is my file uploaded?", a: "No. Everything runs locally in your browser." }
      ]}
      relatedTools={[
        { name: "PNG to WebP", path: "/convert-to-webp/png" },
        { name: "Convert to JPG", path: "/convert-to-jpg" }
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-convert-to-webp-jpg"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Convert to WebP", url: `${siteUrl}/convert-to-webp` },
          { name: "JPG to WebP", url: `${siteUrl}/convert-to-webp/jpg` },
        ]}
      />
      <FormatConvertClient
        task="convert-to-webp"
        accept={{ "image/jpeg": [".jpg", ".jpeg"] }}
        outputExt=".webp"
        outputMime="image/webp"
        qualityDefault={0.9}
        showQuality
        buttonLabel="Convert JPG to WebP"
        note="Lower quality produces smaller files."
        autoProcessOnSelect
      />
      <FormatConvertNextActions
        locale={locale}
        task="convert-to-webp"
        className="mt-10"
      />
    </ToolLayout>
  );
}
