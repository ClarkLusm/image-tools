import { ToolLayout } from "@/app/components/layout/tool-layout";
import FormatConvertClient from "@/app/components/tools/format-convert-client";

export const metadata = {
  title: "PNG to JPG (Free Online Tool)",
  description: "Convert PNG images to JPG with adjustable quality.",
};

export default function Page() {
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
      <FormatConvertClient
        task="convert-to-jpg"
        accept={{ "image/png": [".png"] }}
        outputExt=".jpg"
        outputMime="image/jpeg"
        qualityDefault={0.92}
        showQuality
        buttonLabel="Convert PNG to JPG"
        note="Higher quality means larger file size."
      />
    </ToolLayout>
  );
}
