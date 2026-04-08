import { ToolLayout } from "@/app/components/layout/tool-layout";
import SocialResizeClient from "@/app/components/tools/social-resize-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";

const presets = [
  {
    label: "Facebook Post",
    width: 1200,
    height: 630,
  },
  {
    label: "Facebook Cover",
    width: 820,
    height: 312,
  },
  {
    label: "Facebook Story",
    width: 1080,
    height: 1920,
  },
];

export const metadata = {
  title: "Resize for Facebook (Free Online Tool)",
  description:
    "Resize images for Facebook posts, covers, and stories with exact dimensions.",
  alternates: {
    canonical: `${SITE_URL}/resize-facebook`,
  },
};

export default function Page() {
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      title="Resize for Facebook"
      description="Resize images for Facebook posts, cover photos, and stories."
      steps={[
        {
          title: "Upload Image",
          description: "Choose the image you want to share.",
        },
        {
          title: "Select Preset",
          description: "Pick the Facebook format you need.",
        },
        { title: "Download", description: "Save the resized image instantly." },
      ]}
      faqs={[
        {
          q: "Which size should I use for posts?",
          a: "1200×630 is a common size for shared posts and links.",
        },
        {
          q: "Do you support story format?",
          a: "Yes. Use the 1080×1920 preset.",
        },
        {
          q: "Are my files uploaded?",
          a: "No. All resizing happens locally in your browser.",
        },
      ]}
      relatedTools={[
        { name: "Crop Image", path: "/crop-image" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-resize-facebook"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Resize for Facebook", url: `${siteUrl}/resize-facebook` },
        ]}
      />
      <SocialResizeClient presets={presets} defaultPresetIndex={0} />
    </ToolLayout>
  );
}
