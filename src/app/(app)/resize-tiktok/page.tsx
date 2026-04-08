import { ToolLayout } from "@/app/components/layout/tool-layout";
import SocialResizeClient from "@/app/components/tools/social-resize-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";

const presets = [
  {
    label: "TikTok Vertical",
    width: 1080,
    height: 1920,
  },
  {
    label: "TikTok Profile",
    width: 200,
    height: 200,
  },
];

export const metadata = {
  title: "Resize for TikTok (Free Online Tool)",
  description:
    "Resize images to TikTok dimensions for covers, posts, and profile images.",
  alternates: {
    canonical: `${SITE_URL}/resize-tiktok`,
  },
};

export default function Page() {
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      title="Resize for TikTok"
      description="Resize images for TikTok covers, posts, and profile pictures."
      steps={[
        { title: "Upload Image", description: "Pick the image you want to use on TikTok." },
        { title: "Select Preset", description: "Choose the right TikTok size." },
        { title: "Download", description: "Save your resized image instantly." }
      ]}
      faqs={[
        { q: "Which size is best for TikTok posts?", a: "The 1080×1920 vertical preset is ideal for full-screen TikTok posts." },
        { q: "Are my files uploaded?", a: "No. Everything runs locally in your browser." },
        { q: "Can I crop before resizing?", a: "Yes. Use the Crop Image tool for precise framing." }
      ]}
      relatedTools={[
        { name: "Crop Image", path: "/crop-image" },
        { name: "Compress Image", path: "/compress-image" }
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-resize-tiktok"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Resize for TikTok", url: `${siteUrl}/resize-tiktok` },
        ]}
      />
      <SocialResizeClient presets={presets} defaultPresetIndex={0} />
    </ToolLayout>
  );
}
