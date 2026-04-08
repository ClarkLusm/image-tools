import { ToolLayout } from "@/app/components/layout/tool-layout";
import SocialResizeClient from "@/app/components/tools/social-resize-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";

const presets = [
  {
    label: "Story",
    width: 1080,
    height: 1920,
  },
  {
    label: "Square",
    width: 1080,
    height: 1080,
  },
  {
    label: "Portrait",
    width: 1080,
    height: 1350,
  },
  {
    label: "Landscape",
    width: 1080,
    height: 566,
  },
];

export const metadata = {
  title: "Instagram Image Optimizer (Resize + Auto Optimize)",
  description:
    "Resize and auto-optimize images for Instagram posts, stories, and reels to reduce blur after upload. Fast, no login, and browser-based.",
  alternates: {
    canonical: `${SITE_URL}/resize-instagram`,
  },
};

export default function Page() {
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      title="Instagram Optimization Engine"
      description="Upload once, pick a format, and export IG-ready images with optional auto-optimization to reduce blur after Instagram compression."
      steps={[
        { title: "Upload Image", description: "Drop your source image and keep everything browser-side." },
        { title: "Pick IG Format", description: "Choose feed square, portrait, landscape, or story/reel output." },
        { title: "Auto Optimize", description: "Enable Instagram Optimization Engine to tune JPEG output for IG recompression." },
        { title: "Download and Publish", description: "Export the final file and post with less quality loss." }
      ]}
      faqs={[
        {
          q: "Why do Instagram images look blurry even when the original looks sharp?",
          a: "Instagram recompresses uploaded media. If your file dimensions, format, or quality are not aligned to common Instagram outputs, IG may downscale and recompress aggressively, which can introduce softness and artifacts."
        },
        {
          q: "Do you crop or stretch my image?",
          a: "This flow is crop-first. When you choose a preset, the crop guide locks to that Instagram ratio so you can reframe the image before export. The tool then crops and resizes to the exact target dimensions."
        },
        {
          q: "Are my files uploaded to a server?",
          a: "No for this flow. Instagram resize runs locally in your browser using our image worker, which keeps processing fast and private without requiring login."
        },
        {
          q: "1080 vs 2048 on Instagram: which one should I use?",
          a: "For most workflows, 1080-based outputs are reliable and efficient. Larger exports can still be recompressed by Instagram and do not always produce visibly better results after upload."
        }
      ]}
      relatedTools={[
        { name: "Resize Image", path: "/resize-image" },
        { name: "Crop Image", path: "/crop-image" },
        { name: "Compress Image", path: "/compress-image" },
        { name: "Upscale Image", path: "/upscale-image" }
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-resize-instagram"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Resize for Instagram", url: `${siteUrl}/resize-instagram` },
        ]}
      />
      <SocialResizeClient
        presets={presets}
        defaultPresetIndex={0}
        instagramOptimization
      />

      <section className="mt-10 space-y-8 bg-card">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Why Instagram quality drops after upload
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Instagram does not keep your original export untouched. It may resize,
            recompress, and re-encode based on placement and device context. The
            safest workflow is to pre-fit dimensions, keep clean composition, and
            use upload-ready compression before posting.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-border bg-background p-5">
            <h3 className="text-lg font-semibold text-foreground">
              Best export settings before upload
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
              <li>Use exact target dimensions (1080x1080, 1080x1350, 1080x1920).</li>
              <li>Prefer JPEG for photo content to avoid oversized files.</li>
              <li>Apply moderate sharpening before export for mobile viewing.</li>
              <li>Keep file size practical to reduce aggressive server recompression.</li>
            </ul>
          </article>

          <article className="rounded-xl border border-border bg-background p-5">
            <h3 className="text-lg font-semibold text-foreground">
              1080 vs 2048 myth
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Exporting bigger does not always win. In many cases, Instagram still
              recompresses toward platform-friendly outputs. A clean 1080-based
              file with balanced compression often looks better than an oversized
              upload that gets heavily recompressed.
            </p>
          </article>
        </div>

        <div className="grid gap-4 rounded-xl border border-border bg-background p-5 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-foreground">
              Need more than one-off resize?
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              For teams and power users, continue with batch-focused flows and
              advanced tool chains. You can also expand to quality recovery before
              resize when source assets are low resolution.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/compress-image"
              className="rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground hover:opacity-95"
            >
              Open Batch Compress
            </Link>
            <Link
              href="/upscale-image"
              className="rounded-lg border border-border bg-card px-4 py-2.5 text-center text-sm font-semibold text-foreground hover:bg-secondary"
            >
              Improve Source Quality
            </Link>
          </div>
        </div>
      </section>
    </ToolLayout>
  );
}
