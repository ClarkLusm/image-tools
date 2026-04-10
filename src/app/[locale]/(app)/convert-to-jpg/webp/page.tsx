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
    path: "/convert-to-jpg/webp",
    title: {
      en: "WebP to JPG (Free Online Tool)",
      vi: "WebP sang JPG - Công cụ online miễn phí",
    },
    description: {
      en: "Convert WebP images to JPG with adjustable quality.",
      vi: "Chuyển ảnh WebP sang JPG với chất lượng có thể điều chỉnh.",
    },
  });
}

export default function Page() {
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      title="WebP to JPG"
      description="Convert WebP images to JPG for broader compatibility."
      steps={[
        { title: "Upload WebP", description: "Select the WebP file you want to convert." },
        { title: "Adjust Quality", description: "Pick the JPEG quality level." },
        { title: "Download", description: "Save your converted JPG instantly." }
      ]}
      faqs={[
        { q: "Does JPG support transparency?", a: "No. Transparent pixels turn white." },
        { q: "Is my file uploaded?", a: "No. Everything runs locally in your browser." }
      ]}
      relatedTools={[
        { name: "PNG to JPG", path: "/convert-to-jpg/png" },
        { name: "Convert to WebP", path: "/convert-to-webp" }
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-convert-to-jpg-webp"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Convert to JPG", url: `${siteUrl}/convert-to-jpg` },
          { name: "WebP to JPG", url: `${siteUrl}/convert-to-jpg/webp` },
        ]}
      />
      <FormatConvertClient
        task="convert-to-jpg"
        accept={{ "image/webp": [".webp"] }}
        outputExt=".jpg"
        outputMime="image/jpeg"
        qualityDefault={0.92}
        showQuality
        buttonLabel="Convert WebP to JPG"
        note="Lower quality produces smaller files."
      />
    </ToolLayout>
  );
}
