import Link from "next/link";
import { ToolLayout } from "@/app/components/layout/tool-layout";
import FormatConvertClient from "@/app/components/tools/format-convert-client";
import { ArrowRight, FileImage } from "lucide-react";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Convert Image to WebP (Free Online Tool)",
  description:
    "Convert JPG, PNG, or SVG images to WebP instantly for smaller file sizes and faster load times.",
  alternates: {
    canonical: `${SITE_URL}/convert-to-webp`,
  },
};

export default function Page() {
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      title="Convert to WebP"
      description="Choose your source format and convert to WebP for faster-loading images."
      steps={[
        { title: "Pick Source", description: "Select the original format you want to convert." },
        { title: "Set Quality", description: "Adjust quality to balance size and clarity." },
        { title: "Download", description: "Convert and save the WebP result instantly." }
      ]}
      faqs={[
        { q: "Why use WebP?", a: "WebP offers smaller file sizes than JPG/PNG while maintaining high visual quality. Great for faster websites." },
        { q: "Does WebP support transparency?", a: "Yes. WebP can preserve transparency like PNG." },
        { q: "Are my files uploaded?", a: "No. Conversion runs locally in your browser." }
      ]}
      relatedTools={[
        { name: "Convert to JPG", path: "/convert-to-jpg" },
        { name: "Convert to PNG", path: "/convert-to-png" }
      ]}
    >
      <div className="space-y-10">
        <BreadcrumbsJsonLd
          scriptId="breadcrumbs-convert-to-webp"
          items={[
            { name: "Home", url: `${siteUrl}/` },
            { name: "Convert to WebP", url: `${siteUrl}/convert-to-webp` },
          ]}
        />
        <FormatConvertClient
          task="convert-to-webp"
          accept={{
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
            "image/gif": [".gif"],
            "image/svg+xml": [".svg"],
          }}
          outputExt=".webp"
          outputMime="image/webp"
          qualityDefault={0.9}
          showQuality
          buttonLabel="Convert to WebP"
          note="Lower quality means smaller files."
        />

        <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "JPG to WebP",
            description: "Convert JPEG images to modern WebP.",
            path: "/convert-to-webp/jpg",
          },
          {
            title: "PNG to WebP",
            description: "Convert PNGs while preserving transparency.",
            path: "/convert-to-webp/png",
          },
          {
            title: "SVG to WebP",
            description: "Rasterize SVG vectors into WebP.",
            path: "/convert-to-webp/svg",
          },
        ].map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <FileImage className="w-6 h-6" />
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
