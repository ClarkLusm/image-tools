import { ToolLayout } from "@/app/components/layout/tool-layout";
import FormatConvertClient from "@/app/components/tools/format-convert-client";

export const metadata = {
  title: "WebP to JPG (Free Online Tool)",
  description: "Convert WebP images to JPG with adjustable quality.",
};

export default function Page() {
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
