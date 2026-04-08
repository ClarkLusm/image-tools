import { ToolLayout } from "@/app/components/layout/tool-layout";
import SocialResizeClient from "@/app/components/tools/social-resize-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";

const presets = [
  {
    label: "YouTube Thumbnail",
    width: 1280,
    height: 720,
  },
  {
    label: "YouTube Shorts",
    width: 1080,
    height: 1920,
  },
  {
    label: "YouTube Channel Banner",
    width: 2560,
    height: 1440,
  },
];

export const metadata = {
  title:
    "Resize YouTube Thumbnail Online (Free) - YouTube Image Size Tool 2026",
  description:
    "Resize YouTube thumbnail online free with the right YouTube image size, YouTube thumbnail size, YouTube dimensions, banner size, and Shorts image presets.",
  alternates: {
    canonical: `${SITE_URL}/resize-youtube`,
  },
};

export default function Page() {
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      title="Resize YouTube Images Online"
      description="Resize YouTube thumbnails, Shorts images, and channel branding assets with the right YouTube image size, YouTube thumbnail size, and banner dimensions."
      steps={[
        {
          title: "Upload Image",
          description:
            "Choose the image you want to prepare for a YouTube thumbnail, Shorts asset, or banner workflow.",
        },
        {
          title: "Pick Preset",
          description:
            "Select the YouTube format you need, from thumbnail size to Shorts vertical dimensions and channel banner art.",
        },
        {
          title: "Download",
          description:
            "Export the resized image immediately so it is ready for YouTube upload or channel branding work.",
        },
      ]}
      faqs={[
        {
          q: "What size is YouTube thumbnail?",
          a: "YouTube Help recommends custom thumbnails at 1280 x 720 with a minimum width of 640 pixels and a 16:9 aspect ratio. That is the safest working size when you want a thumbnail that fits YouTube players and previews cleanly.",
        },
        {
          q: "Why is my YouTube thumbnail blurry?",
          a: "Blurry thumbnails usually come from one of three issues: the source image is too small, the text and subject are not sharp enough before export, or the file has already been compressed too aggressively. Starting with a 1280 x 720 canvas and a clean source image usually gives better results.",
        },
        {
          q: "What is YouTube banner size?",
          a: "YouTube Help recommends a channel banner at 2560 x 1440 pixels, with a minimum upload size of 2048 x 1152 and a central safe area for text and logos. Banner art gets cropped differently across devices, so keeping key branding in the safe area is important.",
        },
        {
          q: "Do I need a different size for YouTube Shorts?",
          a: "Yes. Shorts are vertical, so 1080 x 1920 is the most practical working size when you are preparing an image or cover-style visual for Shorts-related content.",
        },
        {
          q: "Are my files uploaded?",
          a: "No. This resize flow runs locally in your browser, so you can prepare YouTube assets without uploading the source image to our server.",
        },
      ]}
      relatedTools={[
        { name: "Resize Instagram Image", path: "/resize-instagram" },
        { name: "Resize TikTok Image", path: "/resize-tiktok" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-resize-youtube"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Resize for YouTube", url: `${siteUrl}/resize-youtube` },
        ]}
      />
      <SocialResizeClient presets={presets} defaultPresetIndex={0} />

      <section className="mt-24 space-y-12 bg-card">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Quick YouTube Size Guide
          </h2>
          <p className="mt-2 leading-7 text-muted-foreground">
            If you need the key numbers fast, start here. YouTube thumbnail size
            is still 1280 x 720, Shorts work best in 1080 x 1920, and channel
            banner design should be planned around a 2560 x 1440 canvas with a
            safe center area.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              Thumbnail Size
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              YouTube recommends 1280 x 720 with a 16:9 ratio and a minimum
              width of 640 pixels for custom thumbnails.
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              Banner Size
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Recommended banner size is 2560 x 1440. Keep important text and
              logos inside the safe center area because YouTube crops banners
              differently across devices.
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              Shorts Ratio
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              1080 x 1920 is the simplest vertical size for Shorts-related
              artwork and mobile-first YouTube assets.
            </p>
          </article>
        </div>

        <section className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            How to Resize Image for YouTube
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
            Upload the source image, choose the right YouTube preset, and export
            the final file. Use the thumbnail preset for standard video artwork,
            the Shorts preset for vertical assets, and the banner preset when
            you are preparing channel branding. If framing needs to change, open{" "}
            <Link
              href="/crop-image"
              className="font-medium text-primary hover:underline"
            >
              Crop Image
            </Link>{" "}
            first. If the result is still too heavy, finish with{" "}
            <Link
              href="/compress-image"
              className="font-medium text-primary hover:underline"
            >
              Compress Image
            </Link>{" "}
            before upload.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Best Aspect Ratio for YouTube
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
            For classic YouTube thumbnails and banner logic, 16:9 remains the
            strongest baseline. For Shorts, vertical 9:16 is the better match.
            If you cross-post visuals across multiple social channels, compare
            results with{" "}
            <Link
              href="/resize-instagram"
              className="font-medium text-primary hover:underline"
            >
              Resize Instagram
            </Link>{" "}
            and{" "}
            <Link
              href="/resize-tiktok"
              className="font-medium text-primary hover:underline"
            >
              Resize TikTok
            </Link>{" "}
            so your workflow stays consistent across platforms.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Build a Better Creator Workflow
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
            A YouTube resize tool becomes much more useful when it sits inside a
            broader creator stack. Prepare thumbnails here, continue into{" "}
            <Link
              href="/resize-instagram"
              className="font-medium text-primary hover:underline"
            >
              Instagram resize
            </Link>{" "}
            and{" "}
            <Link
              href="/resize-tiktok"
              className="font-medium text-primary hover:underline"
            >
              TikTok resize
            </Link>{" "}
            for distribution, then use{" "}
            <Link
              href="/compress-image"
              className="font-medium text-primary hover:underline"
            >
              image compression
            </Link>{" "}
            when you need lighter assets for publishing and collaboration.
          </p>
        </section>
      </section>
    </ToolLayout>
  );
}
