import { ToolLayout } from "@/app/components/layout/tool-layout";
import { SITE_URL } from "@/lib/site";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Read how ImageTools processes your images and protects your privacy.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

export default function Page() {
  return (
    <ToolLayout
      title="Privacy Policy"
      description="We respect your privacy and minimize data handling."
      steps={[
        {
          title: "Local Processing",
          description:
            "Many tools run entirely in your browser, so your files never leave your device.",
        },
        {
          title: "Temporary Uploads",
          description:
            "When server-side compression is required, files are stored only long enough to complete the job.",
        },
        {
          title: "No Tracking Files",
          description:
            "We do not sell or share your uploaded images with third parties.",
        },
      ]}
      faqs={[
        {
          q: "Do you keep my images?",
          a: "No. Images are processed and removed after completion.",
        },
        {
          q: "Do you sell my data?",
          a: "No. We do not sell or trade personal data.",
        },
      ]}
      relatedTools={[
        { name: "Compress Image", path: "/compress-image" },
        { name: "Remove EXIF", path: "/remove-metadata" },
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-privacy"
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Privacy", url: `${SITE_URL}/privacy` },
        ]}
      />
      <div className="space-y-4 text-muted-foreground">
        <p>
          ImageTools is designed with privacy in mind. Client-side tools keep
          your files on your device. For server-side tasks, uploads are used
          strictly to complete the requested operation.
        </p>
        <p>
          We do not store your images permanently, and we do not share files
          with third parties. If you have questions, contact us for details.
        </p>
      </div>
    </ToolLayout>
  );
}
