import { ToolLayout } from "@/app/components/layout/tool-layout";
import SocialResizeClient from "@/app/components/tools/social-resize-client";

const presets = [
  {
    label: "YouTube Thumbnail",
    width: 1280,
    height: 720,
    description: "Standard thumbnail size (16:9).",
  },
  {
    label: "YouTube Shorts",
    width: 1080,
    height: 1920,
    description: "Vertical format for Shorts.",
  },
  {
    label: "YouTube Channel Banner",
    width: 2560,
    height: 1440,
    description: "Large banner image.",
  },
];

export const metadata = {
  title: "Resize for YouTube (Free Online Tool)",
  description:
    "Resize images for YouTube thumbnails, Shorts covers, and channel banners.",
};

export default function Page() {
  return (
    <ToolLayout
      title="Resize for YouTube"
      description="Resize images for YouTube thumbnails, Shorts, and channel branding."
      steps={[
        { title: "Upload Image", description: "Select the image for your YouTube content." },
        { title: "Pick Preset", description: "Choose the YouTube format you need." },
        { title: "Download", description: "Save the resized image instantly." }
      ]}
      faqs={[
        { q: "What is the best size for thumbnails?", a: "1280×720 is the standard 16:9 YouTube thumbnail size." },
        { q: "Do I need a different size for Shorts?", a: "Yes. Use 1080×1920 for vertical Shorts content." },
        { q: "Are my files uploaded?", a: "No. Everything runs locally in your browser." }
      ]}
      relatedTools={[
        { name: "Crop Image", path: "/crop-image" },
        { name: "Compress Image", path: "/compress-image" }
      ]}
    >
      <SocialResizeClient presets={presets} defaultPresetIndex={0} />
    </ToolLayout>
  );
}
