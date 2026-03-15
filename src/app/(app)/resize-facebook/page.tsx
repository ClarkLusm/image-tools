import { ToolLayout } from "@/app/components/layout/tool-layout";
import SocialResizeClient from "@/app/components/tools/social-resize-client";

const presets = [
  {
    label: "Facebook Post",
    width: 1200,
    height: 630,
    description: "Standard shared link or post image.",
  },
  {
    label: "Facebook Cover",
    width: 820,
    height: 312,
    description: "Cover photo for personal profiles.",
  },
  {
    label: "Facebook Story",
    width: 1080,
    height: 1920,
    description: "Full-screen vertical story format.",
  },
];

export const metadata = {
  title: "Resize for Facebook (Free Online Tool)",
  description:
    "Resize images for Facebook posts, covers, and stories with exact dimensions.",
};

export default function Page() {
  return (
    <ToolLayout
      title="Resize for Facebook"
      description="Resize images for Facebook posts, cover photos, and stories."
      steps={[
        { title: "Upload Image", description: "Choose the image you want to share." },
        { title: "Select Preset", description: "Pick the Facebook format you need." },
        { title: "Download", description: "Save the resized image instantly." }
      ]}
      faqs={[
        { q: "Which size should I use for posts?", a: "1200×630 is a common size for shared posts and links." },
        { q: "Do you support story format?", a: "Yes. Use the 1080×1920 preset." },
        { q: "Are my files uploaded?", a: "No. All resizing happens locally in your browser." }
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
