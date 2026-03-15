import { ToolLayout } from "@/app/components/layout/tool-layout";
import { SITE_URL } from "@/lib/site";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";

export const metadata = {
  title: "About ImageTools",
  description:
    "Learn more about ImageTools, our mission, and how we keep your images private.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function Page() {
  return (
    <ToolLayout
      title="About ImageTools"
      description="We build fast, privacy-first tools for everyday image tasks."
      steps={[
        {
          title: "Privacy First",
          description:
            "Most tools run in your browser. When server-side processing is needed, files are handled temporarily and not stored permanently.",
        },
        {
          title: "Speed Matters",
          description:
            "We focus on quick results so you can finish your work in seconds.",
        },
        {
          title: "Simple by Design",
          description:
            "No complicated settings. Just upload, process, and download.",
        },
      ]}
      faqs={[
        {
          q: "Do you store my images?",
          a: "We do not store images permanently. Server-side jobs keep files only for processing and then they are removed.",
        },
        {
          q: "Is ImageTools free?",
          a: "Yes, the core tools are free to use.",
        },
      ]}
      relatedTools={[
        { name: "Compress Image", path: "/compress-image" },
        { name: "Convert to JPG", path: "/convert-to-jpg" },
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-about"
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "About", url: `${SITE_URL}/about` },
        ]}
      />
      <div className="space-y-4 text-muted-foreground">
        <p>
          ImageTools is built for creators, marketers, and developers who need
          quick, reliable image processing without sacrificing privacy. We
          focus on delivering essential tools that work instantly and remain
          simple to use.
        </p>
        <p>
          Our mission is to make image optimization accessible for everyone,
          whether you are preparing assets for the web, social media, or client
          deliveries.
        </p>
      </div>
    </ToolLayout>
  );
}
