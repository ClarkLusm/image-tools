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
    path: "/convert-to-jpg",
    title: {
      en: "Convert Image to JPG Online (Free) - PNG to JPG Converter",
      vi: "Chuyển ảnh sang JPG online miễn phí - Công cụ PNG sang JPG",
    },
    description: {
      en: "Convert image to JPG online free. Use this PNG to JPG converter for photos, lighter file sizes, website uploads, and everyday image to JPG conversion.",
      vi: "Chuyển ảnh sang JPG online miễn phí. Dùng công cụ PNG sang JPG này cho ảnh chụp, file nhẹ hơn, upload website và workflow chuyển ảnh sang JPG hằng ngày.",
    },
  });
}

const sourceLinks = [
  {
    title: "PNG to JPG",
    description: "Convert PNG files into JPG for lighter everyday image use.",
    path: "/convert-to-jpg/png",
  },
  {
    title: "WebP to JPG",
    description: "Turn WebP assets into JPG when compatibility comes first.",
    path: "/convert-to-jpg/webp",
  },
  {
    title: "SVG to JPG",
    description: "Rasterize SVG vectors into JPG for standard photo workflows.",
    path: "/convert-to-jpg/svg",
  },
];

export default function Page() {
  const siteUrl = SITE_URL;

  return (
    <ToolLayout
      title="Convert Image to JPG Online"
      description="Convert PNG, WebP, GIF, or SVG into JPG for lighter file sizes, easier sharing, and broad compatibility across apps, websites, and devices."
      steps={[
        {
          title: "Upload Source Image",
          description:
            "Choose the PNG, WebP, GIF, or SVG file you want to convert into JPG.",
        },
        {
          title: "Adjust JPG Quality",
          description:
            "Set the output quality to balance file size, sharpness, and download speed.",
        },
        {
          title: "Download JPG File",
          description:
            "Save the converted JPG to your device for publishing, sharing, or web use.",
        },
      ]}
      faqs={[
        {
          q: "What is JPG format?",
          a: "JPG is one of the most widely supported image formats for photos and general-purpose publishing. It uses compression to reduce file size, which makes it practical for websites, email attachments, marketplaces, CMS uploads, and social media workflows where lightweight images matter.",
        },
        {
          q: "When should I convert PNG to JPG?",
          a: "Convert PNG to JPG when you want a smaller file for photos, blog images, product uploads, or documents where transparency is not needed. JPG is usually a better delivery format when speed and compatibility matter more than perfect lossless detail.",
        },
        {
          q: "Does JPG support transparency?",
          a: "No. JPG does not preserve transparent pixels. If the source image contains transparency, the output needs a background fill. That is why PNG stays better for logos, overlays, and interface assets, while JPG is better for photos and lighter file sizes.",
        },
        {
          q: "Is JPG better than PNG?",
          a: "JPG is usually better for photographs and smaller file sizes. PNG is usually better for screenshots, graphics, and assets with transparency. Neither format wins all the time. The better choice depends on whether you care more about compression, compatibility, or edge quality.",
        },
        {
          q: "Are my files uploaded?",
          a: "No. The conversion runs locally in your browser, so your source image stays on your device during the JPG conversion process.",
        },
      ]}
      relatedTools={[
        { name: "Convert to PNG", path: "/convert-to-png" },
        { name: "Convert to WebP", path: "/convert-to-webp" },
        { name: "Compress Image", path: "/compress-image" },
        { name: "Resize Image", path: "/resize-image" },
      ]}
    >
      <div className="space-y-10">
        <BreadcrumbsJsonLd
          scriptId="breadcrumbs-convert-to-jpg"
          items={[
            { name: "Home", url: `${siteUrl}/` },
            { name: "Convert to JPG", url: `${siteUrl}/convert-to-jpg` },
          ]}
        />

        <FormatConvertClient
          task="convert-to-jpg"
          accept={{
            "image/png": [".png"],
            "image/webp": [".webp"],
            "image/gif": [".gif"],
            "image/svg+xml": [".svg"],
          }}
          outputExt=".jpg"
          outputMime="image/jpeg"
          qualityDefault={0.92}
          showQuality
          buttonLabel="Convert to JPG"
          note="Transparent pixels will be filled with white."
        />

        <section className="mt-24 space-y-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Quick JPG Conversion Guide
            </h2>
            <p className="mt-2 leading-7 text-muted-foreground">
              If you want the short version, JPG is the better choice when you
              need lighter images for websites, uploads, email, and sharing. It
              is especially strong for photographs and general content where a
              smaller file matters more than transparency.
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Best for Photos
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                JPG is a natural fit for camera images, lifestyle photos, and
                product shots where light file size is a priority.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Smaller File Size
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Compared with PNG, JPG usually produces a lighter result that is
                easier to upload, share, and publish online.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                No Transparency
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                JPG does not keep transparent pixels, so it is not the best
                final format for logos or cutout graphics.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Broad Compatibility
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                JPG works almost everywhere, which makes it a safe export for
                clients, CMS tools, legacy apps, and marketplaces.
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
                What Is JPG Format?
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                JPG is a compressed image format built for efficient delivery.
                In real-world terms, it is one of the most practical formats for
                photos, content publishing, listings, blogs, and uploads where a
                smaller file helps pages load faster and workflows move more
                smoothly.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                That is why searches like{" "}
                <span className="font-medium text-foreground">
                  image to JPG converter
                </span>{" "}
                and{" "}
                <span className="font-medium text-foreground">png to jpg</span>{" "}
                usually come from a delivery problem, not just a format
                curiosity. Users often need a lighter file that is easier to
                share or upload, not a more complex editing asset.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                When Should You Use JPG?
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Use JPG when the source is mostly photographic and your goal is
                lighter delivery. It is a strong format for product images,
                travel photos, editorial visuals, listing images, and general
                website content that does not need transparent backgrounds.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                If you have a heavy PNG or WebP file and simply want a smaller,
                more universal output, JPG is often the easiest answer. If the
                image needs transparency or repeated editing, PNG is usually the
                better working format instead.
              </p>
            </article>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                PNG vs JPG - Which Is Better?
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                PNG is usually better for logos, screenshots, transparent
                assets, and design-heavy visuals. JPG is usually better for
                photos, page speed, and general publishing. That means a page
                like this should not only say{" "}
                <span className="font-medium text-foreground">
                  convert to JPG
                </span>
                , but also explain why someone would give up PNG in the first
                place.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                In many cases, the answer is file size and compatibility. If the
                output is headed to a website, CMS, email, or client handoff,
                JPG is often simpler to use. If you still need transparency or
                cleaner graphic edges, go back to{" "}
                <Link
                  href="/convert-to-png"
                  className="font-medium text-primary hover:underline"
                >
                  PNG
                </Link>
                .
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                JPG vs WebP - Which Should You Pick?
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                JPG wins on universal familiarity and compatibility. WebP often
                wins on modern web performance because it can produce smaller
                files at comparable visual quality. If your end goal is website
                optimization,{" "}
                <Link
                  href="/convert-to-webp"
                  className="font-medium text-primary hover:underline"
                >
                  WebP
                </Link>{" "}
                may be the stronger final format.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                But if you need a format that clients, platforms, and older
                tools can open without friction, JPG is still one of the safest
                choices. In that sense, JPG is often the simplest delivery
                format even when WebP is the more technically efficient one.
              </p>
            </article>
          </section>

          <section className="bg-background">
            <h2 className="text-2xl font-display font-bold text-foreground">
              How to Convert Image to JPG
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
              Upload the source image, set the JPG quality, and download the
              result. If the file also needs new dimensions, continue into{" "}
              <Link
                href="/resize-image"
                className="font-medium text-primary hover:underline"
              >
                Resize Image
              </Link>
              . If you need an even lighter web-ready asset afterward, try{" "}
              <Link
                href="/convert-to-webp"
                className="font-medium text-primary hover:underline"
              >
                Convert to WebP
              </Link>
              . If you actually need lossless quality or transparency, switch to{" "}
              <Link
                href="/convert-to-png"
                className="font-medium text-primary hover:underline"
              >
                Convert to PNG
              </Link>
              . You can also reduce output size further with{" "}
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
              Build an Image Delivery Workflow Around JPG
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
              JPG works best as part of a broader image workflow. Some assets
              start in PNG for editing, move into JPG for sharing, then end up
              in WebP for final website performance. That is why internal links
              between{" "}
              <Link
                href="/convert-to-png"
                className="font-medium text-primary hover:underline"
              >
                PNG conversion
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
              matter so much for both SEO and user behavior.
            </p>
          </section>
        </section>
      </div>
    </ToolLayout>
  );
}
