import { ToolLayout } from "@/app/components/layout/tool-layout";
import RemoveMetadataClient from "./remove-metadata-client";

export default function Page() {
  return (
    <ToolLayout
      title="Remove EXIF Metadata"
      description="Protect your privacy by stripping hidden camera data, GPS locations, and dates from your photos before sharing them online."
      steps={[
        { title: "Select Photo", description: "Upload the image containing sensitive metadata." },
        { title: "Scrub Data", description: "We instantly rebuild the image pixel-by-pixel in a background thread, leaving all hidden tags behind." },
        { title: "Share Safely", description: "Download the clean image. Nobody can trace where or when it was taken." }
      ]}
      faqs={[
        { q: "What is EXIF data?", a: "EXIF data is hidden information attached to photos by digital cameras and smartphones. It often includes exact GPS coordinates, date, time, and device model." },
        { q: "Is the image quality affected?", a: "We process the image at maximum quality in a background Web Worker, so visual changes are virtually imperceptible, but the hidden data payload is completely removed." },
        { q: "Will this slow my browser?", a: "No — processing runs in a Web Worker background thread so the page stays fully responsive at all times." }
      ]}
      relatedTools={[
        { name: "Convert to JPG", path: "/convert-to-jpg" },
        { name: "Resize Image", path: "/resize-image" }
      ]}
    >
      <RemoveMetadataClient />
    </ToolLayout>
  );
}
