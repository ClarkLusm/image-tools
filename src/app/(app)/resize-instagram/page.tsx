import { ToolLayout } from "@/app/components/layout/tool-layout";
import SocialResizeClient from "@/app/components/tools/social-resize-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";

const presets = [
  {
    label: "Feed Square",
    width: 1080,
    height: 1080,
    description: "Classic square feed post.",
  },
  {
    label: "Feed Portrait",
    width: 1080,
    height: 1350,
    description: "Tall portrait for maximum feed real estate.",
  },
  {
    label: "Feed Landscape",
    width: 1080,
    height: 566,
    description: "Wide landscape feed post.",
  },
  {
    label: "Story / Reel",
    width: 1080,
    height: 1920,
    description: "Full-screen vertical format.",
  },
];

export const metadata = {
  title: "Resize for Instagram (Free Online Tool)",
  description:
    "Resize images for Instagram posts, stories, and reels with perfect dimensions.",
  alternates: {
    canonical: `${SITE_URL}/resize-instagram`,
  },
};

export default function Page() {
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      title="Resize for Instagram"
      description="Pick a preset and instantly resize your image for Instagram posts, stories, or reels."
      steps={[
        { title: "Upload Image", description: "Select the photo you want to post." },
        { title: "Pick Preset", description: "Choose the Instagram format you need." },
        { title: "Download", description: "Save your perfectly sized image." }
      ]}
      faqs={[
        { q: "Do you crop or stretch my image?", a: "We resize to the exact dimensions you choose. For best results, crop your image beforehand if needed." },
        { q: "Are my files uploaded?", a: "No. All resizing happens locally in your browser." },
        { q: "Which format should I choose?", a: "Use Story/Reel for vertical full-screen, Square for classic feed posts, and Portrait for higher engagement." }
      ]}
      relatedTools={[
        { name: "Resize Image", path: "/resize-image" },
        { name: "Crop Image", path: "/crop-image" }
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-resize-instagram"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Resize for Instagram", url: `${siteUrl}/resize-instagram` },
        ]}
      />
      <SocialResizeClient presets={presets} defaultPresetIndex={0} />
    </ToolLayout>
  );
}
