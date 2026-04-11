import { Link } from "@/i18n/navigation";
import { ToolLayout } from "@/app/components/layout/tool-layout";
import ResizeImageClient from "./resize-image-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";
import { createPageMetadata } from "@/app/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    path: "/resize-image",
    title: {
      en: "Resize Image Online (Free) - Image Resizer Without Losing Quality",
      vi: "Resize ảnh online miễn phí - Thay đổi kích thước mà vẫn giữ chất lượng",
      de: "Bildgröße online ändern (kostenlos) - Bild-Resizer ohne sichtbaren Qualitätsverlust",
    },
    description: {
      en: "Resize image online free with an image resizer built for web, social media, and photo workflows. Change dimensions, resize photos, and reduce image size more intelligently.",
      vi: "Resize ảnh online miễn phí với công cụ thay đổi kích thước cho web, mạng xã hội và workflow ảnh thực tế. Điều chỉnh kích thước, resize ảnh và giảm kích thước ảnh thông minh hơn.",
      de: "Bilder kostenlos online skalieren mit einem Bild-Resizer für Web, Social Media und Foto-Workflows. Abmessungen ändern, Fotos skalieren und Bildgrößen intelligenter reduzieren.",
    },
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const siteUrl = SITE_URL;

  return (
    <ToolLayout
      locale={locale}
      title="Resize Image Online"
      description="Resize photos and graphics for websites, social media, products, documents, and everyday publishing with a browser-based image resizer."
      steps={[
        {
          title: "Upload Image",
          description:
            "Choose the photo or graphic you want to resize for web, social, or general publishing.",
        },
        {
          title: "Set New Dimensions",
          description:
            "Enter a new width and height, or keep aspect ratio locked to resize without distortion.",
        },
        {
          title: "Download the Result",
          description:
            "Export the resized image immediately and continue into compression or format conversion if needed.",
        },
      ]}
      faqs={[
        {
          q: "How do I resize image without losing quality?",
          a: "The safest path is to resize downward instead of enlarging, keep the aspect ratio correct, and export to a format that matches the job. Smaller dimensions usually stay sharp, while enlarging beyond the original size can introduce softness or visible pixelation.",
        },
        {
          q: "What is the difference between resize and compress?",
          a: "Resize changes the pixel dimensions of the image. Compression reduces file size by changing how the image data is stored. In many real workflows you need both: resize first to match the intended display size, then compress if the file is still heavier than it needs to be.",
        },
        {
          q: "What is the best image size for websites?",
          a: "There is no single universal number, but many content images work well around 1200 pixels wide, while hero sections, banners, and full-width visuals may need more. The best size depends on the layout, device mix, and how aggressively you want to control performance.",
        },
        {
          q: "Can I use this image resizer for social media?",
          a: "Yes. Generic resize is useful for one-off assets, and you can also move into dedicated social tools like Instagram, Facebook, TikTok, and YouTube presets when you need platform-specific dimensions and safer framing.",
        },
        {
          q: "Are my files uploaded?",
          a: "No. All resizing runs locally in a browser worker, which keeps the process private and responsive even when you work with larger images.",
        },
      ]}
      relatedTools={[
        { name: "Resize Instagram Image", path: "/resize-instagram" },
        { name: "Resize Facebook Image", path: "/resize-facebook" },
        { name: "Resize TikTok Image", path: "/resize-tiktok" },
        { name: "Compress Image", path: "/compress-image" },
        { name: "Convert to PNG", path: "/convert-to-png" },
      ]}
    >
      <div className="space-y-10">
        <BreadcrumbsJsonLd
          scriptId="breadcrumbs-resize-image"
          items={[
            { name: "Home", url: `${siteUrl}/` },
            { name: "Resize Image", url: `${siteUrl}/resize-image` },
          ]}
        />

        <ResizeImageClient />

        <section className="mt-24 space-y-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Quick Image Resizing Guide
            </h2>
            <p className="mt-2 leading-7 text-muted-foreground">
              If you want the essentials first, image resizing is the process of
              changing pixel dimensions so a file fits its final use more
              closely. It is one of the most important image tasks for web
              performance, social publishing, product listings, and document
              workflows because oversized images waste bandwidth and often
              create a slower user experience.
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Best for Websites
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Resize before upload so the browser does not download a much
                larger image than the page actually displays.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Best for Social
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Resizing to the right dimensions helps reduce awkward crops,
                unexpected softening, and oversized uploads.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Better Performance
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Smaller dimensions usually mean faster downloads, lower
                bandwidth, and a lighter page experience on mobile.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Pair with Compression
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Resize controls dimensions. Compression controls file weight.
                The best workflows often use both steps together.
              </p>
            </article>
          </div>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                How to Resize Images Without Losing Quality
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                The key is to resize with intent instead of guessing. First,
                decide where the image will appear. A blog card, a full-width
                hero, a product thumbnail, and a social post all need different
                dimensions. Once you know the target placement, resize close to
                that real display size rather than uploading an oversized source
                and hoping the platform handles it well.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                Quality loss usually happens when you enlarge too far, distort
                the aspect ratio, or apply aggressive compression on top of poor
                sizing decisions. If your main search intent is{" "}
                <span className="font-medium text-foreground">
                  resize image without losing quality
                </span>
                , the practical answer is simple: resize downward whenever
                possible, keep the aspect ratio consistent, and pick an output
                format that matches the content type.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Resize Image vs Compress Image
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Resizing and compression solve different problems. Resizing
                changes dimensions such as width and height. Compression changes
                how heavily the file data is packed. If you only compress a
                giant image, the file may still be larger than necessary. If you
                only resize, the file can still be heavier than it should be for
                delivery.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                That is why the healthiest workflow for many users is: resize
                first, then use{" "}
                <Link
                  href="/compress-image"
                  className="font-medium text-primary hover:underline"
                >
                  Compress Image
                </Link>{" "}
                if the output is still too big. This distinction is also useful
                for long-tail SEO because many users searching to{" "}
                <span className="font-medium text-foreground">
                  reduce image size
                </span>{" "}
                really mean either dimensions, file weight, or both.
              </p>
            </article>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Best Image Size for Web and Social Media
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                There is no one perfect number for every image, but there are
                practical patterns. Many web content images work well around
                1200 pixels wide. Full-screen and hero layouts may need more.
                Vertical mobile-first visuals can reach 1920 pixels high when
                the platform expects 9:16 content.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                Social media adds another layer because each platform has its
                own preferred canvas. That is why general resizing is useful as
                a foundation, but platform-specific tools often perform better
                for final exports. If your asset is headed to a social channel,
                move into{" "}
                <Link
                  href="/resize-instagram"
                  className="font-medium text-primary hover:underline"
                >
                  Instagram resize
                </Link>
                ,{" "}
                <Link
                  href="/resize-facebook"
                  className="font-medium text-primary hover:underline"
                >
                  Facebook resize
                </Link>
                ,{" "}
                <Link
                  href="/resize-tiktok"
                  className="font-medium text-primary hover:underline"
                >
                  TikTok resize
                </Link>
                , or{" "}
                <Link
                  href="/resize-youtube"
                  className="font-medium text-primary hover:underline"
                >
                  YouTube resize
                </Link>{" "}
                to avoid guesswork.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Common Use Cases for an Image Resizer
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                The most common use case is website publishing. Oversized
                product images, hero banners, and article visuals make pages
                heavier than necessary. Another common use case is social
                content, where creators resize one source image into several
                outputs for different channels. A third is documentation and
                internal communication, where screenshots need to fit neatly in
                docs, slides, tickets, and reports.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                This is why a generic{" "}
                <span className="font-medium text-foreground">
                  image resizer free
                </span>{" "}
                page can become an authority hub. It is not just one task. It
                sits at the center of multiple image workflows: web delivery,
                social publishing, format conversion, and file optimization.
              </p>
            </article>
          </section>

          <section className="bg-background">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Best Practices for Resizing Images
            </h2>
            <div className="mt-4 grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-border/80 bg-card p-5">
                <h3 className="text-lg font-semibold text-foreground">
                  Resize to Real Display Size
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Do not upload a 4000-pixel-wide image to a layout that only
                  shows 1200 pixels. Right-sizing is one of the fastest wins for
                  user experience and page weight.
                </p>
              </article>

              <article className="rounded-2xl border border-border/80 bg-card p-5">
                <h3 className="text-lg font-semibold text-foreground">
                  Keep Aspect Ratio Consistent
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Distortion makes even a technically sharp image look wrong.
                  Locking aspect ratio protects the original composition.
                </p>
              </article>

              <article className="rounded-2xl border border-border/80 bg-card p-5">
                <h3 className="text-lg font-semibold text-foreground">
                  Choose the Right Format
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Use JPG for lighter photos, PNG for graphics and transparent
                  assets, and WebP when modern web performance is the goal.
                </p>
              </article>

              <article className="rounded-2xl border border-border/80 bg-card p-5">
                <h3 className="text-lg font-semibold text-foreground">
                  Keep File Weight Practical
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Resizing helps, but it does not always solve everything. Many
                  web teams still target lightweight outputs such as sub-200 KB
                  images for common content blocks when quality allows.
                </p>
              </article>
            </div>
          </section>

          <section className="bg-background">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Build Your Image Workflow Around This Hub
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
              This page works best as the center of a larger image tool system.
              Start here for general resizing, then continue into{" "}
              <Link
                href="/resize-instagram"
                className="font-medium text-primary hover:underline"
              >
                Instagram
              </Link>
              ,{" "}
              <Link
                href="/resize-facebook"
                className="font-medium text-primary hover:underline"
              >
                Facebook
              </Link>
              ,{" "}
              <Link
                href="/resize-tiktok"
                className="font-medium text-primary hover:underline"
              >
                TikTok
              </Link>
              , and{" "}
              <Link
                href="/resize-youtube"
                className="font-medium text-primary hover:underline"
              >
                YouTube
              </Link>{" "}
              when you need exact platform dimensions. If you also need format
              support, move into{" "}
              <Link
                href="/convert-to-png"
                className="font-medium text-primary hover:underline"
              >
                PNG conversion
              </Link>
              ,{" "}
              <Link
                href="/convert-to-jpg"
                className="font-medium text-primary hover:underline"
              >
                JPG conversion
              </Link>
              , or{" "}
              <Link
                href="/convert-to-webp"
                className="font-medium text-primary hover:underline"
              >
                WebP conversion
              </Link>
              . This is the page that can tie the entire image tool ecosystem
              together.
            </p>
          </section>
        </section>
      </div>
    </ToolLayout>
  );
}
