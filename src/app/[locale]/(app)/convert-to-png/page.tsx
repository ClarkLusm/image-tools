import { Link } from "@/i18n/navigation";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
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
    path: "/convert-to-png",
    title: {
      en: "Convert Image to PNG Online (Free) - JPG to PNG Converter",
      vi: "Chuyển ảnh sang PNG online miễn phí - Công cụ JPG sang PNG",
    },
    description: {
      en: "Convert image to PNG online free. Use this JPG to PNG converter for logos, transparent graphics, screenshots, and high-quality image to PNG conversion.",
      vi: "Chuyển ảnh sang PNG online miễn phí. Dùng công cụ JPG sang PNG này cho logo, đồ họa nền trong suốt, ảnh chụp màn hình và workflow chuyển ảnh sang PNG chất lượng cao.",
    },
  });
}

const sourceLinks = [
  {
    title: "JPG to PNG",
    description: "Convert JPEG images into PNG for cleaner editing workflows.",
    path: "/convert-to-png/jpg",
  },
  {
    title: "WebP to PNG",
    description: "Turn WebP files into PNG when compatibility matters more.",
    path: "/convert-to-png/webp",
  },
  {
    title: "SVG to PNG",
    description: "Rasterize SVG vectors into PNG for apps, docs, and slides.",
    path: "/convert-to-png/svg",
  },
];

export default function Page() {
  const siteUrl = SITE_URL;

  return (
    <ToolLayout
      title="Convert Image to PNG Online"
      description="Convert JPG, JPEG, WebP, GIF, or SVG into PNG for lossless quality, transparent-ready graphics, and cleaner editing workflows."
      steps={[
        {
          title: "Upload Source Image",
          description:
            "Choose the JPG, WebP, GIF, or SVG file you want to convert into PNG.",
        },
        {
          title: "Convert to PNG",
          description:
            "The tool processes the image in your browser and prepares a PNG version instantly.",
        },
        {
          title: "Download PNG File",
          description:
            "Save the converted PNG to your device for design, publishing, or editing.",
        },
      ]}
      faqs={[
        {
          q: "What is PNG format?",
          a: "PNG is a lossless image format designed for graphics that need clean edges, reliable detail, and transparency support. It is a strong choice for logos, screenshots, icons, interface elements, and any image that should stay crisp after repeated edits.",
        },
        {
          q: "When should I convert JPG to PNG?",
          a: "Converting JPG to PNG is useful when you want a more editing-friendly file, need to preserve text and graphic edges more cleanly, or plan to use the result inside design documents, slides, UI mockups, or layered workflows. It does not restore detail lost in the original JPG, but it can still make the next stage of editing easier.",
        },
        {
          q: "Is PNG better than JPG?",
          a: "PNG is usually better for graphics, screenshots, logos, and design assets because it is lossless and can preserve transparency. JPG is usually better for photos and web delivery when file size matters more than perfect edge quality. The better format depends on the job, not on a universal ranking.",
        },
        {
          q: "Is PNG better than WebP?",
          a: "PNG is stronger for compatibility and editing workflows, while WebP is often better when you want smaller file sizes on modern websites. If you need broad browser or software compatibility, PNG is still a very practical output format. If you need lighter website assets, WebP can be a smarter final export.",
        },
        {
          q: "Are my files uploaded?",
          a: "No. The conversion runs locally in your browser, so your image does not need to be uploaded to our server just to convert it to PNG.",
        },
      ]}
      relatedTools={[
        { name: "Convert to JPG", path: "/convert-to-jpg" },
        { name: "Convert to WebP", path: "/convert-to-webp" },
        { name: "Compress Image", path: "/compress-image" },
        { name: "Resize Image", path: "/resize-image" },
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
          autoProcessOnSelect
        />

        <section className="mt-24 space-y-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Quick PNG Conversion Guide
            </h2>
            <p className="mt-2 leading-7 text-muted-foreground">
              If you only need the short version, PNG is the format to choose
              when visual cleanliness matters more than file size. It is
              especially useful for screenshots, logos, text-heavy graphics,
              icons, and assets that may be edited again later.
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Best for Graphics
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                PNG keeps edges, labels, and interface elements cleaner than JPG
                in many design-heavy workflows.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Strong for Transparency
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                PNG supports transparent pixels, which makes it a common choice
                for logos, overlays, and UI assets.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Larger File Size
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                PNG keeps more structure and detail, but that often means the
                result is heavier than JPG or WebP.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Great Editing Format
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                If the file will move through design reviews, documents, or
                repeated exports, PNG is usually easier to work with.
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
                  <ImageIcon className="h-6 w-6" />
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
                What Is PNG Format?
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                PNG stands for Portable Network Graphics. In practical terms, it
                is one of the most useful formats when you need image quality
                that stays stable across edits, exports, and handoffs between
                tools. Unlike JPG, PNG is lossless, which means the format is
                built to preserve structure instead of intentionally throwing
                away visual information to save space.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                That makes PNG especially valuable for design assets, product
                screenshots, UI captures, diagrams, logos, and any file with
                text or sharp edges. If the main need behind your search is{" "}
                <span className="font-medium text-foreground">
                  image to PNG converter
                </span>{" "}
                or{" "}
                <span className="font-medium text-foreground">
                  png converter online
                </span>
                , the real reason is usually quality control rather than format
                conversion for its own sake.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                When Should You Use PNG?
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Use PNG when you care about clean presentation, repeated edits,
                or transparent backgrounds. It is a strong choice for logos,
                stickers, icons, slide assets, screenshots, charts, interface
                elements, and text-based graphics where JPG compression can make
                edges look softer than you want.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                This is also why people often convert JPG to PNG before placing
                an asset into design software, documentation, or social media
                templates. The format will not magically restore lost quality,
                but it can stop additional destructive compression from piling
                up in later editing steps.
              </p>
            </article>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                JPG vs PNG - Which Is Better?
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                JPG is usually better for photographs and smaller web-ready
                files. PNG is usually better for graphics, screenshots, brand
                assets, and anything with text, flat colors, or sharp shapes.
                That means a page like this should not only say{" "}
                <span className="font-medium text-foreground">
                  convert to PNG
                </span>
                , but also explain when the switch actually makes sense.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                If your original is a camera photo and your goal is light file
                size, JPG or{" "}
                <Link
                  href="/convert-to-webp"
                  className="font-medium text-primary hover:underline"
                >
                  WebP
                </Link>{" "}
                may still be the better final format. If your asset contains a
                logo, screenshot, meme text, or interface details, PNG often
                gives a cleaner result.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                PNG vs WebP - Which Should You Pick?
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                PNG wins on simplicity and compatibility. WebP often wins on
                file size, especially for websites. If you are preparing assets
                for collaboration, editing, internal design work, or broad app
                support, PNG is still a safe output. If you are publishing to a
                website and want lighter files, converting later to{" "}
                <Link
                  href="/convert-to-webp"
                  className="font-medium text-primary hover:underline"
                >
                  WebP
                </Link>{" "}
                can be the smarter final optimization step.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                In other words, PNG is often the best working format, while WebP
                is often the best delivery format. That distinction helps
                explain why format pages should sit inside a larger image tools
                ecosystem instead of standing alone as isolated converters.
              </p>
            </article>
          </section>

          <section className="bg-background">
            <h2 className="text-2xl font-display font-bold text-foreground">
              How to Convert Image to PNG
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
              Upload the source image, convert it, and download the PNG result.
              If the picture also needs a new size, continue into{" "}
              <Link
                href="/resize-image"
                className="font-medium text-primary hover:underline"
              >
                Resize Image
              </Link>
              . If the PNG becomes heavier than you want, run it through{" "}
              <Link
                href="/compress-image"
                className="font-medium text-primary hover:underline"
              >
                Compress Image
              </Link>{" "}
              or export a lighter delivery format with{" "}
              <Link
                href="/convert-to-webp"
                className="font-medium text-primary hover:underline"
              >
                Convert to WebP
              </Link>
              . If you actually need a smaller photo format instead, use{" "}
              <Link
                href="/convert-to-jpg"
                className="font-medium text-primary hover:underline"
              >
                Convert to JPG
              </Link>
              .
            </p>
          </section>

          <section className="bg-background">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Build an Image Format Workflow, Not Just a One-Off Conversion
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
              A strong PNG converter page is most useful when it connects to a
              broader image format hub. JPG, PNG, and WebP each solve different
              problems, so users often move between conversion, resizing, and
              compression in one workflow. That is why internal links between{" "}
              <Link
                href="/convert-to-jpg"
                className="font-medium text-primary hover:underline"
              >
                JPG conversion
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
                href="/resize-image"
                className="font-medium text-primary hover:underline"
              >
                resizing
              </Link>
              , and{" "}
              <Link
                href="/compress-image"
                className="font-medium text-primary hover:underline"
              >
                compression
              </Link>{" "}
              matter so much for both SEO and real user behavior.
            </p>
          </section>
        </section>
      </div>
    </ToolLayout>
  );
}
