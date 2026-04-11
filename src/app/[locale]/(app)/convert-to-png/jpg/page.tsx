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
    path: "/convert-to-png/jpg",
    title: {
      en: "JPG to PNG (Free Online Tool)",
      vi: "JPG sang PNG - Công cụ online miễn phí",
    },
    description: {
      en: "Convert JPG images to PNG with lossless quality.",
      vi: "Chuyển ảnh JPG sang PNG với chất lượng lossless.",
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
      title="JPG to PNG"
      description="Convert JPG images into lossless PNG files."
      steps={[
        { title: "Upload JPG", description: "Select the JPG file you want to convert." },
        { title: "Convert", description: "We convert your image instantly." },
        { title: "Download", description: "Save your PNG file." }
      ]}
      faqs={[
        { q: "Will this improve quality?", a: "PNG is lossless, but it cannot restore detail lost in JPG." },
        { q: "Is my file uploaded?", a: "No. Everything runs locally in your browser." }
      ]}
      relatedTools={[
        { name: "WebP to PNG", path: "/convert-to-png/webp" },
        { name: "Convert to JPG", path: "/convert-to-jpg" }
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-convert-to-png-jpg"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Convert to PNG", url: `${siteUrl}/convert-to-png` },
          { name: "JPG to PNG", url: `${siteUrl}/convert-to-png/jpg` },
        ]}
      />
      <FormatConvertClient
        task="convert-to-png"
        accept={{ "image/jpeg": [".jpg", ".jpeg"] }}
        outputExt=".png"
        outputMime="image/png"
        showQuality={false}
        buttonLabel="Convert JPG to PNG"
        note="PNG keeps full quality but may be larger."
        autoProcessOnSelect
      />
      <FormatConvertNextActions
        locale={locale}
        task="convert-to-png"
        className="mt-10"
      />
    </ToolLayout>
  );
}
