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
    path: "/convert-to-jpg/png",
    title: {
      en: "PNG to JPG (Free Online Tool)",
      vi: "PNG sang JPG - Công cụ online miễn phí",
    },
    description: {
      en: "Convert PNG images to JPG with adjustable quality.",
      vi: "Chuyển ảnh PNG sang JPG với chất lượng có thể điều chỉnh.",
    },
  });
}

export default function Page() {
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      title="PNG to JPG"
      description="Convert transparent PNGs to JPG with a white background and customizable quality."
      steps={[
        { title: "Upload PNG", description: "Select the PNG file you want to convert." },
        { title: "Adjust Quality", description: "Pick the JPEG quality level." },
        { title: "Download", description: "Save your converted JPG instantly." }
      ]}
      faqs={[
        { q: "What happens to transparency?", a: "JPG does not support transparency, so transparent areas turn white." },
        { q: "Is my file uploaded?", a: "No. Everything runs locally in your browser." }
      ]}
      relatedTools={[
        { name: "WebP to JPG", path: "/convert-to-jpg/webp" },
        { name: "Convert to PNG", path: "/convert-to-png" }
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-convert-to-jpg-png"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Convert to JPG", url: `${siteUrl}/convert-to-jpg` },
          { name: "PNG to JPG", url: `${siteUrl}/convert-to-jpg/png` },
        ]}
      />
      <FormatConvertClient
        task="convert-to-jpg"
        accept={{ "image/png": [".png"] }}
        outputExt=".jpg"
        outputMime="image/jpeg"
        qualityDefault={0.92}
        buttonLabel="Convert PNG to JPG"
        note="Higher quality means larger file size."
        autoProcessOnSelect
      />
    </ToolLayout>
  );
}
