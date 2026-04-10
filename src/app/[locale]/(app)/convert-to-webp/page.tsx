import { Link } from "@/i18n/navigation";
import { ArrowRight, FileImage } from "lucide-react";
import { ToolLayout } from "@/app/components/layout/tool-layout";
import FormatConvertClient from "@/app/components/tools/format-convert-client";
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
    path: "/convert-to-webp",
    title: {
      en: "Convert Image to WebP Online (Free) - JPG to WebP Converter",
      vi: "Chuyển ảnh sang WebP online miễn phí - Công cụ JPG sang WebP",
    },
    description: {
      en: "Convert image to WebP online free. Use this JPG to WebP converter for smaller website images, faster load times, and modern image optimization workflows.",
      vi: "Chuyển ảnh sang WebP online miễn phí. Dùng công cụ JPG sang WebP này để tạo ảnh website nhẹ hơn, tải nhanh hơn và tối ưu workflow hình ảnh hiện đại.",
    },
  });
}

const sourceLinks = [
  {
    title: "JPG to WebP",
    description: "Convert JPEG images into WebP for lighter website delivery.",
    path: "/convert-to-webp/jpg",
  },
  {
    title: "PNG to WebP",
    description:
      "Convert PNG files to WebP while keeping transparency support.",
    path: "/convert-to-webp/png",
  },
  {
    title: "SVG to WebP",
    description: "Rasterize SVG artwork into WebP for modern web workflows.",
    path: "/convert-to-webp/svg",
  },
];

export default function Page() {
  const siteUrl = SITE_URL;

  return (
    <ToolLayout
      title="Convert Image to WebP Online"
      description="Convert JPG, PNG, GIF, or SVG into WebP for smaller file sizes, faster load times, and more modern website image delivery."
      steps={[
        {
          title: "Upload Source Image",
          description:
            "Choose the JPG, PNG, GIF, or SVG file you want to convert into WebP.",
        },
        {
          title: "Set WebP Quality",
          description:
            "Adjust the output quality to balance visual fidelity and file size.",
        },
        {
          title: "Download WebP File",
          description:
            "Save the converted WebP image for website use, product pages, blogs, or apps.",
        },
      ]}
      faqs={[
        {
          q: "What is WebP format?",
          a: "WebP is a modern image format designed to reduce file size while keeping strong visual quality. It is especially useful for websites because lighter images can improve page speed, user experience, and performance across mobile and desktop devices.",
        },
        {
          q: "When should I convert JPG to WebP?",
          a: "Convert JPG to WebP when your goal is faster website delivery with smaller files. It is a practical step for blogs, landing pages, ecommerce galleries, and content-heavy pages where image weight affects load time and overall UX.",
        },
        {
          q: "Does WebP support transparency?",
          a: "Yes. WebP can preserve transparency, which is one reason it is often compared with PNG. That makes it more flexible than JPG when you want smaller files without giving up transparent backgrounds.",
        },
        {
          q: "Is WebP better than JPG or PNG?",
          a: "WebP is often better for web delivery because it can create smaller files at strong quality. JPG is still better for maximum compatibility in older workflows, and PNG is still better as a simple editing format for certain graphics. WebP is strongest when your final destination is the web.",
        },
        {
          q: "Are my files uploaded?",
          a: "No. The conversion runs locally in your browser, so the source image stays on your device during the WebP conversion process.",
        },
      ]}
      relatedTools={[
        { name: "Convert to JPG", path: "/convert-to-jpg" },
        { name: "Convert to PNG", path: "/convert-to-png" },
        { name: "Compress Image", path: "/compress-image" },
        { name: "Resize Image", path: "/resize-image" },
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
          autoProcessOnSelect
        />

        <section className="mt-24 space-y-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Quick WebP Conversion Guide
            </h2>
            <p className="mt-2 leading-7 text-muted-foreground">
              If you only need the short version, WebP is the format to pick
              when website performance matters. It is especially useful for
              blogs, landing pages, product listings, and media-heavy pages
              where lighter images can improve load speed.
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Best for Websites
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                WebP is built for modern website delivery where image weight
                affects page speed and UX.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Smaller File Size
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                WebP often produces smaller files than JPG or PNG while still
                keeping strong visible quality.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Transparency Support
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                WebP can keep transparent pixels, making it more flexible than
                JPG for many web asset workflows.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Modern Delivery Format
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                WebP is often strongest as a final publishing format after
                editing is already complete.
              </p>
            </article>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {sourceLinks.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileImage className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <div className="flex items-center text-sm font-semibold text-primary">
                  Start converting <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                What Is WebP Format?
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                WebP is a modern image format created to improve web
                performance. In practical use, it gives site owners, developers,
                and content teams a way to deliver lighter images without
                relying on much older format tradeoffs. That is why searches
                like{" "}
                <span className="font-medium text-foreground">
                  image to WebP converter
                </span>{" "}
                and{" "}
                <span className="font-medium text-foreground">jpg to webp</span>{" "}
                are usually performance-driven.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                WebP is not always the best working format for editing, but it
                is often one of the best final formats for delivery. That is the
                key distinction behind most image SEO and website optimization
                workflows.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                When Should You Use WebP?
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Use WebP when the main goal is web performance. It is a strong
                choice for blog images, ecommerce product grids, landing pages,
                CMS uploads, documentation sites, and other environments where
                too many heavy images can slow down the page.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                If you are still editing the image repeatedly, PNG or JPG may be
                easier intermediate formats. Once the asset is ready for
                publishing, WebP often becomes the better final export.
              </p>
            </article>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                WebP vs JPG - Which Is Better?
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                WebP is often better for modern website delivery because it can
                reduce file size more aggressively. JPG is still better when you
                need universal compatibility or a simpler handoff format. If
                your main question is about publishing efficiency, WebP often
                wins. If your main question is compatibility, JPG often remains
                safer.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                That means a healthy image workflow might start with{" "}
                <Link
                  href="/convert-to-jpg"
                  className="font-medium text-primary hover:underline"
                >
                  JPG
                </Link>{" "}
                for editing or client delivery, then end with WebP for final web
                output.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                WebP vs PNG - Which Should You Pick?
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                PNG is often better as a clean editing format, especially for
                graphics, screenshots, and assets with transparency. WebP is
                often better as a lighter delivery format for websites. If the
                asset still needs design work,{" "}
                <Link
                  href="/convert-to-png"
                  className="font-medium text-primary hover:underline"
                >
                  PNG
                </Link>{" "}
                may be the smarter intermediate choice.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                If the asset is ready to publish and page speed matters, WebP
                becomes more attractive. In that sense, PNG is frequently the
                working format and WebP is the final publishing format.
              </p>
            </article>
          </section>

          <section className="bg-background">
            <h2 className="text-2xl font-display font-bold text-foreground">
              How to Convert Image to WebP
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
              Upload the source image, choose the WebP quality, and download the
              result. If the image also needs new dimensions, use{" "}
              <Link
                href="/resize-image"
                className="font-medium text-primary hover:underline"
              >
                Resize Image
              </Link>
              . If you want to compare output formats, try{" "}
              <Link
                href="/convert-to-jpg"
                className="font-medium text-primary hover:underline"
              >
                Convert to JPG
              </Link>{" "}
              or{" "}
              <Link
                href="/convert-to-png"
                className="font-medium text-primary hover:underline"
              >
                Convert to PNG
              </Link>
              . For even smaller delivery files, pair the result with{" "}
              <Link
                href="/compress-image"
                className="font-medium text-primary hover:underline"
              >
                Compress Image
              </Link>
              .
            </p>
          </section>

          <section className="bg-background">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Build a Web Performance Workflow Around WebP
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
              WebP works best when it is part of a broader image optimization
              system. Teams often resize first, convert second, then compress or
              compare outputs before publishing. That is why internal links
              between{" "}
              <Link
                href="/resize-image"
                className="font-medium text-primary hover:underline"
              >
                resizing
              </Link>
              ,{" "}
              <Link
                href="/compress-image"
                className="font-medium text-primary hover:underline"
              >
                compression
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
                href="/convert-to-png"
                className="font-medium text-primary hover:underline"
              >
                PNG conversion
              </Link>{" "}
              matter so much for both SEO topical authority and real image
              production workflows.
            </p>
          </section>
        </section>
      </div>
    </ToolLayout>
  );
}
