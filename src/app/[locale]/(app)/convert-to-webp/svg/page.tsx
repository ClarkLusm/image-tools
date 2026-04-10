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
    path: "/convert-to-webp/svg",
    title: {
      en: "SVG to WebP (Free Online Tool)",
      vi: "SVG sang WebP - Công cụ online miễn phí",
    },
    description: {
      en: "Rasterize SVG vectors into WebP images.",
      vi: "Rasterize file vector SVG thành ảnh WebP.",
    },
  });
}

export default function Page() {
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      title="SVG to WebP"
      description="Convert SVG vector graphics into WebP for smaller web-friendly images."
      steps={[
        { title: "Upload SVG", description: "Select the SVG file you want to convert." },
        { title: "Adjust Quality", description: "Pick the WebP quality level." },
        { title: "Download", description: "Save your converted WebP instantly." }
      ]}
      faqs={[
        { q: "Will SVG scale be preserved?", a: "The SVG is rasterized at its natural size. Resize after conversion if needed." },
        { q: "Is my file uploaded?", a: "No. Everything runs locally in your browser." }
      ]}
      relatedTools={[
        { name: "PNG to WebP", path: "/convert-to-webp/png" },
        { name: "Convert to PNG", path: "/convert-to-png" }
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-convert-to-webp-svg"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Convert to WebP", url: `${siteUrl}/convert-to-webp` },
          { name: "SVG to WebP", url: `${siteUrl}/convert-to-webp/svg` },
        ]}
      />
      <FormatConvertClient
        task="convert-to-webp"
        accept={{ "image/svg+xml": [".svg"] }}
        outputExt=".webp"
        outputMime="image/webp"
        qualityDefault={0.9}
        showQuality
        buttonLabel="Convert SVG to WebP"
        note="SVGs are rasterized before conversion."
      />
    </ToolLayout>
  );
}
