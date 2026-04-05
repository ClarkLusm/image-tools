import Link from "next/link";
import { ToolLayout } from "@/app/components/layout/tool-layout";
import FormatConvertClient from "@/app/components/tools/format-convert-client";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Convert Image to PNG (Free Online Tool)",
  description:
    "Convert JPG, JPEG, WebP, or SVG images to PNG with full transparency support.",
  alternates: {
    canonical: `${SITE_URL}/convert-to-png`,
  },
};

export default function Page() {
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      title="Convert to PNG"
      description="Choose your source format and convert to PNG for lossless quality."
      steps={[
        { title: "Pick Source", description: "Select the original format you want to convert." },
        { title: "Convert", description: "We convert your image instantly." },
        { title: "Download", description: "Save the PNG file to your device." }
      ]}
      faqs={[
        { q: "Does PNG support transparency?", a: "Yes. PNG preserves transparent pixels." },
        { q: "Is conversion lossless?", a: "PNG is lossless, but converting from JPG may not restore lost detail." },
        { q: "Are my files uploaded?", a: "No. Everything runs locally in your browser." }
      ]}
      relatedTools={[
        { name: "Convert to JPG", path: "/convert-to-jpg" },
        { name: "Convert to WebP", path: "/convert-to-webp" }
      ]}
    >
      <div className="space-y-10">
        <BreadcrumbsJsonLd
          scriptId="breadcrumbs-convert-to-png"
          items={[
            { name: "Home", url: `${siteUrl}/` },
            { name: "Convert to PNG", url: `${siteUrl}/convert-to-png` },
          ]}
        />
        <FormatConvertClient
          task="convert-to-png"
          accept={{
            "image/jpeg": [".jpg", ".jpeg"],
            "image/webp": [".webp"],
            "image/gif": [".gif"],
            "image/svg+xml": [".svg"],
          }}
          outputExt=".png"
          outputMime="image/png"
          showQuality={false}
          buttonLabel="Convert to PNG"
          note="PNG is lossless and may be larger."
        />

        <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "JPG to PNG",
            description: "Convert JPEG images into PNG.",
            path: "/convert-to-png/jpg",
          },
          {
            title: "WebP to PNG",
            description: "Convert WebP images to PNG.",
            path: "/convert-to-png/webp",
          },
          {
            title: "SVG to PNG",
            description: "Rasterize SVG vectors into PNG.",
            path: "/convert-to-png/svg",
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
