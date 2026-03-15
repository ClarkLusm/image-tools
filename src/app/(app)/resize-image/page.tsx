import { ToolLayout } from "@/app/components/layout/tool-layout";
import ResizeImageClient from "./resize-image-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Resize Image Online",
  description:
    "Resize images to exact dimensions quickly in your browser. Maintain quality and aspect ratio with ease.",
  alternates: {
    canonical: `${SITE_URL}/resize-image`,
  },
};

export default function Page() {
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      title="Resize Image"
      description="Change image dimensions exactly to your needs. Perfect for social media headers, profile pictures, or web optimization."
      steps={[
        {
          title: "Upload Image",
          description: "Select the image you want to resize.",
        },
        {
          title: "Set Dimensions",
          description:
            "Enter your desired width and height. Keep aspect ratio locked to prevent distortion.",
        },
        {
          title: "Download",
          description: "Apply changes and download your perfectly sized image.",
        },
      ]}
      faqs={[
        {
          q: "Does resizing affect quality?",
          a: "Making an image smaller usually retains sharpness. Enlarging an image past its original size may cause pixelation.",
        },
        {
          q: "Are my files uploaded?",
          a: "No — all resizing runs in a background thread inside your browser. It's instant and 100% private.",
        },
        {
          q: "Will large images freeze the page?",
          a: "No. Processing runs in a Web Worker so the UI stays fully interactive even with very large files.",
        },
      ]}
      relatedTools={[
        { name: "Compress Image", path: "/compress-image" },
        { name: "Convert to JPG", path: "/convert-to-jpg" },
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-resize-image"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Resize Image", url: `${siteUrl}/resize-image` },
        ]}
      />
      <ResizeImageClient />
    </ToolLayout>
  );
}
