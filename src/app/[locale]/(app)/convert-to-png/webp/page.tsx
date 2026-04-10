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
    path: "/convert-to-png/webp",
    title: {
      en: "WebP to PNG (Free Online Tool)",
      vi: "WebP sang PNG - Công cụ online miễn phí",
    },
    description: {
      en: "Convert WebP images to PNG with transparency support.",
      vi: "Chuyển ảnh WebP sang PNG với hỗ trợ nền trong suốt.",
    },
  });
}

export default function Page() {
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      title="WebP to PNG"
      description="Convert WebP images into PNG for compatibility and transparency."
      steps={[
        { title: "Upload WebP", description: "Select the WebP file you want to convert." },
        { title: "Convert", description: "We convert your image instantly." },
        { title: "Download", description: "Save your PNG file." }
      ]}
      faqs={[
        { q: "Does PNG keep transparency?", a: "Yes. PNG preserves transparent pixels." },
        { q: "Is my file uploaded?", a: "No. Everything runs locally in your browser." }
      ]}
      relatedTools={[
        { name: "JPG to PNG", path: "/convert-to-png/jpg" },
        { name: "Convert to WebP", path: "/convert-to-webp" }
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-convert-to-png-webp"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Convert to PNG", url: `${siteUrl}/convert-to-png` },
          { name: "WebP to PNG", url: `${siteUrl}/convert-to-png/webp` },
        ]}
      />
      <FormatConvertClient
        task="convert-to-png"
        accept={{ "image/webp": [".webp"] }}
        outputExt=".png"
        outputMime="image/png"
        showQuality={false}
        buttonLabel="Convert WebP to PNG"
        note="PNG keeps full quality but may be larger."
      />
    </ToolLayout>
  );
}
