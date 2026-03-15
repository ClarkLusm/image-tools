import { ToolLayout } from "@/app/components/layout/tool-layout";
import { SITE_URL } from "@/lib/site";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";

export const metadata = {
  title: "Terms of Service",
  description:
    "Read the terms for using ImageTools and our image processing services.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
};

export default function Page() {
  return (
    <ToolLayout
      title="Terms of Service"
      description="By using ImageTools, you agree to the terms below."
      steps={[
        {
          title: "Usage",
          description:
            "You may use ImageTools for lawful purposes and content you have rights to process.",
        },
        {
          title: "Availability",
          description:
            "We strive for high uptime but do not guarantee uninterrupted access.",
        },
        {
          title: "Liability",
          description:
            "ImageTools is provided as-is. We are not liable for data loss or damages.",
        },
      ]}
      faqs={[
        {
          q: "Can I use ImageTools for commercial work?",
          a: "Yes. You may use the tools for personal or commercial projects.",
        },
        {
          q: "Do you guarantee results?",
          a: "We do our best, but results can vary based on image content.",
        },
      ]}
      relatedTools={[
        { name: "Compress Image", path: "/compress-image" },
        { name: "Convert to PNG", path: "/convert-to-png" },
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-terms"
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Terms", url: `${SITE_URL}/terms` },
        ]}
      />
      <div className="space-y-4 text-muted-foreground">
        <p>
          By using ImageTools, you confirm you have the rights to upload and
          process the images. You are responsible for any content you submit.
        </p>
        <p>
          We may update these terms periodically. Continued use of the service
          means you accept the current terms.
        </p>
      </div>
    </ToolLayout>
  );
}
