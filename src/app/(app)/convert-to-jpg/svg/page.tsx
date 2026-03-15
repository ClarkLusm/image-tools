import { ToolLayout } from "@/app/components/layout/tool-layout";
import FormatConvertClient from "@/app/components/tools/format-convert-client";
import { SITE_URL } from "@/lib/site";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";

export const metadata = {
  title: "SVG to JPG (Free Online Tool)",
  description: "Rasterize SVG vector files into JPG images.",
  alternates: {
    canonical: `${SITE_URL}/convert-to-jpg/svg`,
  },
};

export default function Page() {
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      title="SVG to JPG"
      description="Convert SVG vector graphics into JPG for easy sharing."
      steps={[
        { title: "Upload SVG", description: "Select the SVG file you want to convert." },
        { title: "Adjust Quality", description: "Pick the JPEG quality level." },
        { title: "Download", description: "Save your converted JPG instantly." }
      ]}
      faqs={[
        { q: "Will SVG scale be preserved?", a: "The SVG is rasterized at its natural size. For exact sizing, resize after conversion." },
        { q: "Is my file uploaded?", a: "No. Everything runs locally in your browser." }
      ]}
      relatedTools={[
        { name: "PNG to JPG", path: "/convert-to-jpg/png" },
        { name: "Resize Image", path: "/resize-image" }
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-convert-to-jpg-svg"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Convert to JPG", url: `${siteUrl}/convert-to-jpg` },
          { name: "SVG to JPG", url: `${siteUrl}/convert-to-jpg/svg` },
        ]}
      />
      <FormatConvertClient
        task="convert-to-jpg"
        accept={{ "image/svg+xml": [".svg"] }}
        outputExt=".jpg"
        outputMime="image/jpeg"
        qualityDefault={0.92}
        showQuality
        buttonLabel="Convert SVG to JPG"
        note="SVGs are rasterized before conversion."
      />
    </ToolLayout>
  );
}
