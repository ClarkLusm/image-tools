import { ToolLayout } from "@/app/components/layout/tool-layout";
import FormatConvertClient from "@/app/components/tools/format-convert-client";

export const metadata = {
  title: "JPG to WebP (Free Online Tool)",
  description: "Convert JPG images to WebP with adjustable quality.",
};

export default function Page() {
  return (
    <ToolLayout
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
      <FormatConvertClient
        task="convert-to-webp"
        accept={{ "image/jpeg": [".jpg", ".jpeg"] }}
        outputExt=".webp"
        outputMime="image/webp"
        qualityDefault={0.9}
        showQuality
        buttonLabel="Convert JPG to WebP"
        note="Lower quality produces smaller files."
      />
    </ToolLayout>
  );
}
