import { ToolLayout } from "@/app/components/layout/tool-layout";
import CropImageClient from "./crop-image-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Crop Image (Free Online Tool)",
  description:
    "Crop images to exact dimensions in your browser. Fast, private, and precise.",
};

export default function Page() {
  return (
    <ToolLayout
      title="Crop Image"
      description="Trim your image to the perfect area by specifying exact crop dimensions."
      steps={[
        { title: "Upload Image", description: "Select the image you want to crop." },
        { title: "Set Crop", description: "Enter the crop rectangle coordinates and size." },
        { title: "Download", description: "Crop and download your image instantly." }
      ]}
      faqs={[
        { q: "Is cropping destructive?", a: "Cropping creates a new image with only the selected area. Your original file stays untouched." },
        { q: "Can I crop to exact pixels?", a: "Yes. Enter precise X, Y, width, and height values." },
        { q: "Are my files uploaded?", a: "No. The crop happens locally in your browser." }
      ]}
      relatedTools={[
        { name: "Resize Image", path: "/resize-image" },
        { name: "Convert to JPG", path: "/convert-to-jpg" }
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-crop-image"
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Crop Image", url: `${SITE_URL}/crop-image` },
        ]}
      />
      <CropImageClient />
    </ToolLayout>
  );
}
