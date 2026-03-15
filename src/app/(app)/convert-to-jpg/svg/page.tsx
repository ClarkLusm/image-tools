import { ToolLayout } from "@/app/components/layout/tool-layout";
import FormatConvertClient from "@/app/components/tools/format-convert-client";

export const metadata = {
  title: "SVG to JPG (Free Online Tool)",
  description: "Rasterize SVG vector files into JPG images.",
};

export default function Page() {
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
