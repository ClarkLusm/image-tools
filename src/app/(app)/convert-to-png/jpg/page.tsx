import { ToolLayout } from "@/app/components/layout/tool-layout";
import FormatConvertClient from "@/app/components/tools/format-convert-client";
import { SITE_URL } from "@/lib/site";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";

export const metadata = {
  title: "JPG to PNG (Free Online Tool)",
  description: "Convert JPG images to PNG with lossless quality.",
  alternates: {
    canonical: `${SITE_URL}/convert-to-png/jpg`,
  },
};

export default function Page() {
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
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
      />
    </ToolLayout>
  );
}
