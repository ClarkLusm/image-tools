import { ToolLayout } from "@/app/components/layout/tool-layout";
import FormatConvertClient from "@/app/components/tools/format-convert-client";
import { SITE_URL } from "@/lib/site";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";

export const metadata = {
  title: "SVG to PNG (Free Online Tool)",
  description: "Rasterize SVG vectors into PNG images.",
  alternates: {
    canonical: `${SITE_URL}/convert-to-png/svg`,
  },
};

export default function Page() {
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      title="SVG to PNG"
      description="Convert SVG vector graphics into PNG for easy sharing."
      steps={[
        { title: "Upload SVG", description: "Select the SVG file you want to convert." },
        { title: "Convert", description: "We convert your image instantly." },
        { title: "Download", description: "Save your PNG file." }
      ]}
      faqs={[
        { q: "Will SVG scale be preserved?", a: "The SVG is rasterized at its natural size. Resize after conversion if needed." },
        { q: "Is my file uploaded?", a: "No. Everything runs locally in your browser." }
      ]}
      relatedTools={[
        { name: "WebP to PNG", path: "/convert-to-png/webp" },
        { name: "Resize Image", path: "/resize-image" }
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-convert-to-png-svg"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Convert to PNG", url: `${siteUrl}/convert-to-png` },
          { name: "SVG to PNG", url: `${siteUrl}/convert-to-png/svg` },
        ]}
      />
      <FormatConvertClient
        task="convert-to-png"
        accept={{ "image/svg+xml": [".svg"] }}
        outputExt=".png"
        outputMime="image/png"
        showQuality={false}
        buttonLabel="Convert SVG to PNG"
        note="SVGs are rasterized before conversion."
      />
    </ToolLayout>
  );
}
