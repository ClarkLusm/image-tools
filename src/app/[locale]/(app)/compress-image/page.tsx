import { Link } from "@/i18n/navigation";
import { ToolLayout } from "@/app/components/layout/tool-layout";
import CompressImageClient from "./compress-image-client";
import { COMPRESS_SIZE_ENTRIES } from "@/lib/seo";
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
    path: "/compress-image",
    title: {
      en: "Compress Image Online (Free) - Reduce Image Size Without Losing Quality",
      vi: "Nén ảnh online miễn phí - Giảm dung lượng mà vẫn giữ chất lượng",
      de: "Bild online komprimieren (kostenlos) - Dateigröße ohne sichtbaren Qualitätsverlust reduzieren",
    },
    description: {
      en: "Compress image online free to reduce image size without losing quality. Optimize JPG, PNG, and WebP files for websites, mobile, email, and faster page speed.",
      vi: "Nén ảnh online miễn phí để giảm dung lượng mà vẫn giữ chất lượng. Tối ưu file JPG, PNG và WebP cho website, mobile, email và tốc độ tải trang nhanh hơn.",
      de: "Bilder kostenlos online komprimieren, um Dateigröße ohne sichtbaren Qualitätsverlust zu reduzieren. Optimiere JPG-, PNG- und WebP-Dateien für Websites, Mobilgeräte, E-Mail und schnellere Ladezeiten.",
    },
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <ToolLayout
      locale={locale}
      title="Compress Image Online"
      description="Compress JPG, PNG, and WebP files for websites, social media, uploads, and everyday sharing with a practical image optimizer."
      steps={[
        {
          title: "Upload Images",
          description:
            "Select one or more heavy images you want to shrink for web, mobile, or upload limits.",
        },
        {
          title: "Compress Smarter",
          description:
            "Run compression to reduce file size while keeping the image visually usable for its destination.",
        },
        {
          title: "Download Optimized Files",
          description:
            "Save the lighter result and continue into resizing or format conversion if the workflow needs it.",
        },
      ]}
      faqs={[
        {
          q: "How do I compress images without losing quality?",
          a: "In practice, the goal is not zero change but smart reduction. The safest workflow is to compress only as much as the destination requires, keep dimensions realistic, and avoid repeated re-exports. A clean output at the right size often looks identical in normal viewing while weighing much less.",
        },
        {
          q: "What is the difference between lossy and lossless compression?",
          a: "Lossless compression reduces file size without intentionally removing image detail, while lossy compression achieves smaller files by discarding some visual information. Lossless is useful when you want preservation first. Lossy is useful when smaller file size matters more and the visual change remains acceptable.",
        },
        {
          q: "Why does image compression improve SEO?",
          a: "Lighter images can improve page speed, reduce bandwidth, and make pages feel faster on mobile connections. Better performance often supports stronger user experience signals, which is why image compression is closely tied to technical SEO and website quality work.",
        },
        {
          q: "Can I compress multiple images at once?",
          a: "Yes. This tool supports batch-style compression so you can prepare several images in one workflow instead of handling every file individually.",
        },
        {
          q: "Is it safe?",
          a: "Yes. Files are sent only for processing and are cleaned up after the compression workflow completes. We do not use your images for anything beyond generating the optimized output you requested.",
        },
      ]}
      relatedTools={[
        { name: "Resize Image", path: "/resize-image" },
        { name: "Convert to WebP", path: "/convert-to-webp" },
        { name: "Convert to JPG", path: "/convert-to-jpg" },
        { name: "Resize Instagram Image", path: "/resize-instagram" },
        { name: "Convert to PNG", path: "/convert-to-png" },
      ]}
    >
      <div className="space-y-12">
        <BreadcrumbsJsonLd
          scriptId="breadcrumbs-compress-image"
          items={[
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Compress Image", url: `${SITE_URL}/compress-image` },
          ]}
        />

        <CompressImageClient />

        <section className="mt-10 space-y-12">
          <section className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-3 text-lg font-semibold">
              Compress to a specific size
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Target a size for email attachments, upload limits, or faster
              performance.
            </p>
            <div className="flex flex-wrap gap-3">
              {COMPRESS_SIZE_ENTRIES.map((item) => (
                <Link
                  key={item.slug}
                  href={`/compress-image-to/${item.slug}`}
                  className="rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-3 text-lg font-semibold">
              Compress for a specific use case
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Pick a scenario to get recommended size targets and tips.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/compress-image/for/email-attachments"
                className="rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Email attachments
              </Link>
              <Link
                href="/compress-image/for/gmail"
                className="rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Gmail
              </Link>
              <Link
                href="/compress-image/for/whatsapp"
                className="rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                WhatsApp
              </Link>
              <Link
                href="/compress-image/for/telegram"
                className="rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Telegram
              </Link>
              <Link
                href="/compress-image/for/shopify-product"
                className="rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Shopify product
              </Link>
              <Link
                href="/compress-image/for/etsy-listing"
                className="rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Etsy listing
              </Link>
              <Link
                href="/compress-image/for/wordpress"
                className="rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                WordPress
              </Link>
              <Link
                href="/compress-image/for/linkedin-banner"
                className="rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                LinkedIn banner
              </Link>
            </div>
          </section>

          <div className="max-w-3xl">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Quick Image Compression Guide
            </h2>
            <p className="mt-2 leading-7 text-muted-foreground">
              Image compression reduces file weight so images load faster, use
              less bandwidth, and become easier to upload or share. This is one
              of the most important tasks in image SEO because heavy files slow
              down websites, increase waiting time, and create a worse
              experience on mobile networks.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Better for Page Speed
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Lighter images usually download faster, which can improve site
                performance and make content feel more responsive.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Better for Upload Limits
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Compression helps when files are too large for forms, CMS
                editors, marketplaces, email attachments, or messaging apps.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Better for Mobile
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Smaller images are especially important for slower connections,
                data-conscious users, and image-heavy pages on phones.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Better with Resizing
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Compression becomes even more effective when the image is also
                resized to match the real display size.
              </p>
            </article>
          </div>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                How to Compress Images Without Losing Quality
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                The practical answer is to compress with a target in mind. A
                homepage hero, a blog card, a Shopify listing, and a WhatsApp
                share all tolerate different levels of reduction. Instead of
                trying to reach the smallest number possible, aim for the
                smallest file that still looks clean in the real viewing
                context.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                If your search intent is{" "}
                <span className="font-medium text-foreground">
                  reduce image size without losing quality
                </span>
                , the most useful workflow is usually: resize to a realistic
                display size first, then compress just enough for delivery. That
                avoids paying for pixels users will never see.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Lossy vs Lossless Compression
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Lossless compression is focused on reducing file weight without
                intentionally removing visual detail. Lossy compression aims for
                much smaller files by discarding some image data that may be
                hard to notice in normal viewing. Both approaches are useful,
                but they solve different problems.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                In everyday web publishing, lossy compression is often the more
                practical option because page speed and bandwidth savings matter
                so much. In design handoff, archival, or graphic workflows,
                lossless output may make more sense. The right answer depends on
                destination, not ideology.
              </p>
            </article>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Why Image Compression Improves SEO
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Image compression matters because images often make up a large
                share of total page weight. When they are heavier than
                necessary, pages load slower, feel less responsive, and create
                more friction for users on mobile or limited connections. Faster
                pages tend to produce better experience signals, which is why
                compression is tightly connected to technical SEO work.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                This is also why a query like{" "}
                <span className="font-medium text-foreground">
                  optimize image
                </span>{" "}
                has more SEO depth than it first appears. Behind that query is a
                real performance problem, not just a file-format preference.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Compress Image vs Resize Image
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Compression reduces file weight. Resizing changes dimensions.
                They overlap in purpose, but they are not the same tool. If a
                4000-pixel image only appears at 1200 pixels wide, compression
                alone will not solve the whole problem. The image should also be
                resized to its actual usage.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                That is why the strongest optimization workflow often starts in{" "}
                <Link
                  href="/resize-image"
                  className="font-medium text-primary hover:underline"
                >
                  Resize Image
                </Link>{" "}
                and ends here. Resize for the real layout, then compress for
                lighter delivery.
              </p>
            </article>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Common Use Cases for Image Compression
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Website publishing is the most obvious use case. Product
                galleries, blog posts, landing pages, and marketing assets often
                become slower than necessary because source images are too large.
                Another common use case is social content, where creators want
                faster uploads and smaller exports. A third is file-limit
                workflows like email, chat apps, forms, and ecommerce platforms.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                This is why the keyword cluster around{" "}
                <span className="font-medium text-foreground">
                  compress image online
                </span>
                ,{" "}
                <span className="font-medium text-foreground">
                  compress jpg online
                </span>
                , and{" "}
                <span className="font-medium text-foreground">
                  compress png
                </span>{" "}
                is so valuable. The user is usually trying to solve a real
                publishing problem right now.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Pick the Right Output Strategy
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Sometimes compression alone is enough. Other times, the output
                format matters more than expected. JPG is often useful for
                lighter photos, PNG is better for transparent or graphic-heavy
                assets, and WebP is frequently the best final web-delivery
                format when compatibility allows.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                If the result still needs a different format, continue into{" "}
                <Link
                  href="/convert-to-webp"
                  className="font-medium text-primary hover:underline"
                >
                  Convert to WebP
                </Link>
                ,{" "}
                <Link
                  href="/convert-to-jpg"
                  className="font-medium text-primary hover:underline"
                >
                  Convert to JPG
                </Link>
                , or{" "}
                <Link
                  href="/convert-to-png"
                  className="font-medium text-primary hover:underline"
                >
                  Convert to PNG
                </Link>
                .
              </p>
            </article>
          </section>

          <section className="bg-background">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Build an Image Optimization Workflow Around Compression
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
              This page can act as the SEO pillar for the whole image
              optimization cluster. Start here for file-weight reduction, then
              branch into{" "}
              <Link
                href="/resize-image"
                className="font-medium text-primary hover:underline"
              >
                resizing
              </Link>
              ,{" "}
              <Link
                href="/convert-to-webp"
                className="font-medium text-primary hover:underline"
              >
                WebP conversion
              </Link>
              ,{" "}
              <Link
                href="/convert-to-jpg"
                className="font-medium text-primary hover:underline"
              >
                JPG conversion
              </Link>
              , and{" "}
              <Link
                href="/resize-instagram"
                className="font-medium text-primary hover:underline"
              >
                Instagram resizing
              </Link>{" "}
              when the asset is headed to social distribution. Compression is
              not just one utility page. It is one of the strongest entry points
              into a full image SEO ecosystem.
            </p>
          </section>
        </section>
      </div>
    </ToolLayout>
  );
}
