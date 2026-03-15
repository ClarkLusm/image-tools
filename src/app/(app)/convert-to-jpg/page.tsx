import Link from "next/link";
import { ToolLayout } from "@/app/components/layout/tool-layout";
import FormatConvertClient from "@/app/components/tools/format-convert-client";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Convert Image to JPG (Free Online Tool)",
  description:
    "Convert PNG, WebP, or SVG images to JPG with adjustable quality in your browser.",
  alternates: {
    canonical: `${SITE_URL}/convert-to-jpg`,
  },
};

export default function Page() {
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      title="Convert to JPG"
      description="Choose your source format, then convert it into a high-quality JPG."
      steps={[
        { title: "Pick Source", description: "Select the original format you want to convert from." },
        { title: "Adjust Quality", description: "Tune the JPEG quality to balance size and clarity." },
        { title: "Download", description: "Save the converted JPG instantly." }
      ]}
      faqs={[
        { q: "Does JPG support transparency?", a: "No. Transparent pixels are filled with a white background." },
        { q: "Is this done on the server?", a: "No. The conversion runs locally in your browser." },
        { q: "Can I control file size?", a: "Yes. Lower quality produces smaller files." }
      ]}
      relatedTools={[
        { name: "Convert to WebP", path: "/convert-to-webp" },
        { name: "Convert to PNG", path: "/convert-to-png" }
      ]}
    >
      <div className="space-y-10">
        <BreadcrumbsJsonLd
          scriptId="breadcrumbs-convert-to-jpg"
          items={[
            { name: "Home", url: `${siteUrl}/` },
            { name: "Convert to JPG", url: `${siteUrl}/convert-to-jpg` },
          ]}
        />
        <FormatConvertClient
          task="convert-to-jpg"
          accept={{
            "image/png": [".png"],
            "image/webp": [".webp"],
            "image/gif": [".gif"],
            "image/svg+xml": [".svg"],
          }}
          outputExt=".jpg"
          outputMime="image/jpeg"
          qualityDefault={0.92}
          showQuality
          buttonLabel="Convert to JPG"
          note="Transparent pixels will be filled with white."
        />

        <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "PNG to JPG",
            description: "Convert PNG files while handling transparency.",
            path: "/convert-to-jpg/png",
          },
          {
            title: "WebP to JPG",
            description: "Turn modern WebP images into JPG.",
            path: "/convert-to-jpg/webp",
          },
          {
            title: "SVG to JPG",
            description: "Rasterize SVG vectors into JPG.",
            path: "/convert-to-jpg/svg",
          },
        ].map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
            <div className="flex items-center text-sm font-semibold text-primary">
              Start converting <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        ))}
        </div>
      </div>
    </ToolLayout>
  );
}
