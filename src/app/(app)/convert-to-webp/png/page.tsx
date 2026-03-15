import { ToolLayout } from "@/app/components/layout/tool-layout";
import FormatConvertClient from "@/app/components/tools/format-convert-client";

export const metadata = {
  title: "PNG to WebP (Free Online Tool)",
  description: "Convert PNG images to WebP while preserving transparency.",
};

export default function Page() {
  return (
    <ToolLayout
      title="PNG to WebP"
      description="Convert PNG images to WebP with transparency support."
      steps={[
        { title: "Upload PNG", description: "Select the PNG file you want to convert." },
        { title: "Adjust Quality", description: "Pick the WebP quality level." },
        { title: "Download", description: "Save your converted WebP instantly." }
      ]}
      faqs={[
        { q: "Does WebP keep transparency?", a: "Yes. WebP supports transparent pixels like PNG." },
        { q: "Is my file uploaded?", a: "No. Everything runs locally in your browser." }
      ]}
      relatedTools={[
        { name: "JPG to WebP", path: "/convert-to-webp/jpg" },
        { name: "Convert to PNG", path: "/convert-to-png" }
      ]}
    >
      <FormatConvertClient
        task="convert-to-webp"
        accept={{ "image/png": [".png"] }}
        outputExt=".webp"
        outputMime="image/webp"
        qualityDefault={0.9}
        showQuality
        buttonLabel="Convert PNG to WebP"
        note="Higher quality means larger file size."
      />
    </ToolLayout>
  );
}
