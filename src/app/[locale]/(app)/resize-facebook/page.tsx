import { ToolLayout } from "@/app/components/layout/tool-layout";
import SocialResizeClient from "@/app/components/tools/social-resize-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import { createPageMetadata } from "@/app/lib/metadata";

const presets = [
  {
    label: "Facebook Post",
    width: 1200,
    height: 630,
  },
  {
    label: "Facebook Cover",
    width: 851,
    height: 315,
  },
  {
    label: "Facebook Profile",
    width: 320,
    height: 320,
  },
  {
    label: "Facebook Story",
    width: 1080,
    height: 1920,
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
    path: "/resize-facebook",
    title: {
      en: "Resize Facebook Images Online (Free) - Facebook Cover & Post Size Tool",
      vi: "Resize ảnh Facebook online miễn phí - Công cụ kích thước cover và post Facebook",
    },
    description: {
      en: "Resize Facebook images online free with the right Facebook cover size, Facebook post size, Facebook image dimensions, Facebook event cover guidance, and profile image presets.",
      vi: "Resize ảnh Facebook online miễn phí với đúng kích thước cover, post, profile và hướng dẫn event cover Facebook cùng các preset thực tế.",
    },
  });
}

export default function Page() {
  const siteUrl = SITE_URL;
  return (
    <ToolLayout
      title="Resize Facebook Images Online"
      description="Resize for Facebook posts, cover photos, profile images, and stories with practical Facebook image dimensions and creator-friendly presets."
      steps={[
        {
          title: "Upload Image",
          description:
            "Choose the image you want to prepare for a Facebook post, cover, profile photo, or story.",
        },
        {
          title: "Select Preset",
          description:
            "Pick the Facebook format you need, from post size to cover photo and profile artwork.",
        },
        {
          title: "Download",
          description:
            "Export the resized image instantly so it is ready for Facebook upload.",
        },
      ]}
      faqs={[
        {
          q: "What is Facebook image size?",
          a: "The answer depends on placement. A common Facebook post image size is 1200 x 630, Page cover photos work well at 851 x 315, and profile photos should be prepared as square images, ideally 320 x 320 for quality. That is why a strong Facebook resize page needs to cover more than one preset instead of treating every upload like a generic social graphic.",
        },
        {
          q: "What is Facebook cover size?",
          a: "Facebook Help says Page cover photos should be at least 400 x 150 pixels and load fastest as an sRGB JPG at 851 x 315. That is the most practical starting point for cover artwork with text or brand elements, especially when you want a clean Facebook cover size that survives desktop and mobile cropping more gracefully.",
        },
        {
          q: "What size should I use for a Facebook profile picture?",
          a: "Facebook Help says Page profile photos display at 176 x 176 on desktop and 196 x 196 on smartphones, and recommends uploading a 320 x 320 square image for best quality.",
        },
        {
          q: "Is Facebook event cover size the same as Page cover size?",
          a: "No. Facebook event cover visuals behave like a separate wide placement, so reusing a Page cover often leads to awkward crops. If you are preparing event graphics, treat Facebook event cover size as its own asset workflow instead of assuming your standard Page cover will fit perfectly.",
        },
        {
          q: "Do you support Facebook story format?",
          a: "Yes. Use the 1080 x 1920 vertical preset when you need a Story-friendly layout for mobile viewing.",
        },
        {
          q: "Are my files uploaded?",
          a: "No. All resizing happens locally in your browser, so you can prepare Facebook assets without sending the image to our server.",
        },
      ]}
      relatedTools={[
        { name: "Resize Instagram Image", path: "/resize-instagram" },
        { name: "Resize TikTok Image", path: "/resize-tiktok" },
        { name: "Resize YouTube Image", path: "/resize-youtube" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-resize-facebook"
        items={[
          { name: "Home", url: `${siteUrl}/` },
          { name: "Resize for Facebook", url: `${siteUrl}/resize-facebook` },
        ]}
      />
      <SocialResizeClient presets={presets} defaultPresetIndex={0} />

      <section className="mt-24 space-y-12 bg-card">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Quick Facebook Size Guide
          </h2>
          <p className="mt-2 leading-7 text-muted-foreground">
            If you want the essentials first, start here. Facebook post, cover,
            and profile placements each have different needs, so using a
            dedicated preset is the fastest way to avoid awkward crops and
            blurry uploads.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              Facebook Cover Size
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Facebook Help says Page cover images load fastest at 851 x 315.
              Keep important text away from the far edges because cover art is
              cropped differently across devices.
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              Facebook Post Size
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              1200 x 630 is a practical default for shared posts, previews, and
              social graphics. It is one of the most useful long-tail Facebook
              image dimensions to target.
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              Profile Image
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Profile images are displayed as circles, so a clean 320 x 320
              square source gives you better control over logos, faces, and
              centered branding.
            </p>
          </article>

          <article className="rounded-2xl border border-border/80 bg-card p-5">
            <h3 className="text-lg font-semibold text-foreground">
              Event Cover Workflow
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Event graphics should be treated as a separate wide asset. If you
              are targeting Facebook event cover size searches, avoid reusing
              your Page cover art and prepare a dedicated image instead.
            </p>
          </article>
        </div>

        <section className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Facebook Post Size
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              For feed posts and shared graphics, 1200 x 630 remains a clean
              default because it balances quality with compatibility across link
              previews and general Facebook post layouts. It is also one of the
              most practical answers to searches like{" "}
              <span className="font-medium text-foreground">
                facebook post size
              </span>{" "}
              and{" "}
              <span className="font-medium text-foreground">
                facebook post dimensions
              </span>
              .
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Facebook Profile Picture Size
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Profile photos are cropped to a circle in the interface, so the
              safest source image is still a square. Facebook says a Page
              profile picture should be 320 x 320 for best quality, which makes
              it easier to keep logos, faces, and centered brand marks visible
              after the circular crop is applied.
            </p>
          </article>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Best Aspect Ratio for Facebook
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              There is no single best Facebook aspect ratio for every use case.
              Wide images work best for covers and many shared post graphics,
              square images are strongest for profile photos and simple branded
              visuals, and vertical 9:16 is the right fit for Stories. Matching
              the ratio to the placement is more important than forcing one
              image size everywhere.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-background p-6">
            <h2 className="text-2xl font-display font-bold text-foreground">
              How to Resize Image for Facebook
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Upload your image, choose the right Facebook preset, and export
              the final size. If you need better framing, open{" "}
              <Link
                href="/crop-image"
                className="font-medium text-primary hover:underline"
              >
                Crop Image
              </Link>{" "}
              first. If the output file is still larger than needed, finish with{" "}
              <Link
                href="/compress-image"
                className="font-medium text-primary hover:underline"
              >
                Compress Image
              </Link>{" "}
              before publishing.
            </p>
          </article>
        </section>

        <section className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Build a Better Social Workflow
          </h2>
          <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
            Facebook resize works even better when it sits inside a broader
            social publishing flow. Continue into{" "}
            <Link
              href="/resize-instagram"
              className="font-medium text-primary hover:underline"
            >
              Resize Instagram
            </Link>
            ,{" "}
            <Link
              href="/resize-tiktok"
              className="font-medium text-primary hover:underline"
            >
              Resize TikTok
            </Link>
            , and{" "}
            <Link
              href="/resize-youtube"
              className="font-medium text-primary hover:underline"
            >
              Resize YouTube
            </Link>{" "}
            when you want a more consistent multi-platform asset pipeline.
          </p>
        </section>
      </section>
    </ToolLayout>
  );
}
