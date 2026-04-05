import { ToolLayout } from "@/app/components/layout/tool-layout";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";
import RemoveBackgroundClient from "./remove-background-client";

export const metadata = {
  title: "Remove Background from Image",
  description:
    "Remove image background online and export transparent PNG files. Fast, privacy-friendly, and easy to tune.",
  alternates: {
    canonical: `${SITE_URL}/remove-background`,
  },
};

export default function Page() {
  return (
    <ToolLayout
      title="Remove Background"
      description="Separate your subject from solid or clean backgrounds and export as transparent PNG in seconds."
      steps={[
        {
          title: "Upload image",
          description: "Choose JPG, JPEG, PNG, or WebP from your device.",
        },
        {
          title: "Tune edge settings",
          description: "Adjust detection threshold and edge softness if needed.",
        },
        {
          title: "Download transparent PNG",
          description: "Save your image with removed background.",
        },
      ]}
      faqs={[
        {
          q: "What kind of image works best?",
          a: "Images with a solid or clean background produce the best results.",
        },
        {
          q: "What output format do I get?",
          a: "The tool exports a PNG file with transparency.",
        },
        {
          q: "Can I tweak the result?",
          a: "Yes. You can raise threshold to remove more background and tune softness for smoother edges.",
        },
      ]}
      relatedTools={[
        { name: "Crop Image", path: "/crop-image" },
        { name: "Convert to PNG", path: "/convert-to-png" },
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-remove-background"
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Remove Background", url: `${SITE_URL}/remove-background` },
        ]}
      />
      <RemoveBackgroundClient />
    </ToolLayout>
  );
}
