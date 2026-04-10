import { ToolLayout } from "@/app/components/layout/tool-layout";
import SocialResizeClient from "@/app/components/tools/social-resize-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import { createPageMetadata } from "@/app/lib/metadata";

const presets = [
  {
    label: "TikTok Vertical",
    width: 1080,
    height: 1920,
  },
  {
    label: "TikTok Profile",
    width: 200,
    height: 200,
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    path: "/resize-tiktok",
    title: {
      en: "Resize TikTok Image Online Free",
      vi: "Resize ảnh TikTok online miễn phí",
    },
    description: {
      en: "Resize TikTok image online free. Prepare the right TikTok image size, TikTok dimensions, and assets for TikTok posts, profile images, thumbnails, and cover visuals.",
      vi: "Resize ảnh TikTok online miễn phí. Chuẩn bị đúng kích thước ảnh TikTok, dimensions và tài nguyên cho bài đăng, ảnh hồ sơ, thumbnail và ảnh cover.",
    },
  });
}

export default function Page() {
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      title="Resize TikTok Image Online Free"
      description="Resize for TikTok post, profile, thumbnail, and cover workflows with the right TikTok image size and creator-friendly TikTok dimensions."
      steps={[
        {
          title: "Upload Image",
          description:
            "Choose the image you want to prepare for TikTok posts, cover art, or profile use.",
        },
        {
          title: "Select TikTok Dimensions",
          description:
            "Pick a vertical TikTok preset or a square profile size depending on where the asset will appear.",
        },
        {
          title: "Download and Publish",
          description:
            "Export the resized image instantly, then post to TikTok with dimensions that fit the platform more cleanly.",
        },
      ]}
      faqs={[
        {
          q: "What is TikTok image size?",
          a: "For most creator workflows, a 1080 x 1920 vertical canvas remains the safest working size because TikTok is built around a 9:16 full-screen layout. For profile artwork, a square image is easier to prepare and then TikTok applies its own crop inside the profile UI.",
        },
        {
          q: "Can I resize TikTok cover photo?",
          a: "Yes. You can prepare a vertical image for TikTok cover or thumbnail usage so the source file already matches the platform's visual direction. A clean 9:16 source usually gives you more flexibility when selecting the visible cover area later.",
        },
        {
          q: "What TikTok dimensions should I use for a profile picture?",
          a: "TikTok's Help Center notes that profile photos must be at least 20 x 20 pixels, but in practice you should upload a much larger square image for better clarity. A 200 x 200 square preset is a simple baseline for profile artwork and avatars.",
        },
        {
          q: "Should I compress a TikTok image before uploading?",
          a: "Usually yes, especially when the original file is oversized. Resizing first and then running a light compression pass can reduce file weight while keeping the image sharp enough for mobile viewing.",
        },
      ]}
      relatedTools={[
        { name: "Resize Instagram Image", path: "/resize-instagram" },
        { name: "Resize YouTube Image", path: "/resize-youtube" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-resize-tiktok"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Resize for TikTok", url: `${siteUrl}/resize-tiktok` },
        ]}
      />
      <SocialResizeClient presets={presets} defaultPresetIndex={0} />

      <section className="mt-24 space-y-12 bg-card">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Quick TikTok Size Guide
          </h2>
          <p className="mt-2 leading-7 text-muted-foreground">
            If you only need the essentials, start here. Vertical 9:16 is the
            safest default for TikTok-facing creative, while square artwork is
            the easiest format for profile images and branding assets.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              TikTok Profile Size
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              TikTok says profile photos must be at least 20 x 20 pixels, but a
              larger square image gives cleaner results for avatars and brand
              marks.
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              TikTok Video Ratio
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              1080 x 1920 remains the most practical TikTok dimension for
              vertical content because it matches the app&apos;s 9:16 viewing
              experience.
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              TikTok Thumbnail
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Start with a clean vertical source if you want more freedom when
              framing a thumbnail or cover-style image later.
            </p>
          </article>
        </div>

        <section className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            How to Resize Image for TikTok
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
            Upload your source image, pick the TikTok preset that matches your
            goal, and export the resized file. If composition matters, use{" "}
            <Link
              href="/crop-image"
              className="font-medium text-primary hover:underline"
            >
              Crop Image
            </Link>{" "}
            first. If the file is still heavier than it needs to be, finish with{" "}
            <Link
              href="/compress-image"
              className="font-medium text-primary hover:underline"
            >
              Compress Image
            </Link>{" "}
            for a lighter upload.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Build a Better Social Workflow
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
            TikTok resize works best as part of a broader content pipeline. Once
            your asset is ready here, continue into{" "}
            <Link
              href="/resize-instagram"
              className="font-medium text-primary hover:underline"
            >
              Instagram resize
            </Link>
            ,{" "}
            <Link
              href="/resize-youtube"
              className="font-medium text-primary hover:underline"
            >
              YouTube resize
            </Link>
            , and{" "}
            <Link
              href="/compress-image"
              className="font-medium text-primary hover:underline"
            >
              image compression
            </Link>{" "}
            to keep your social assets consistent and lightweight.
          </p>
        </section>
      </section>
    </ToolLayout>
  );
}
