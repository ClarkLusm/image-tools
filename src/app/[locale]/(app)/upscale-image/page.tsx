import { Link } from "@/i18n/navigation";
import { ToolLayout } from "@/app/components/layout/tool-layout";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";
import UpscaleImageClient from "./upscale-image-client";
import { createPageMetadata } from "@/app/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    path: "/upscale-image",
    title: {
      en: "Upscale Image Online (Free) - AI Image Enhancer and Resolution Tool",
      vi: "Tăng độ phân giải ảnh online miễn phí - Công cụ AI nâng cấp ảnh",
      de: "Bild online hochskalieren (kostenlos) - KI-Bildverbesserung und Auflösungs-Tool",
    },
    description: {
      en: "Upscale image online free with AI super resolution. Increase image resolution, enhance image quality, and improve low-resolution photos, portraits, and graphics.",
      vi: "Tăng độ phân giải ảnh online miễn phí với AI super resolution. Cải thiện độ phân giải, nâng chất lượng ảnh và làm sắc nét ảnh chân dung, ảnh cũ và đồ họa độ phân giải thấp.",
      de: "Bilder kostenlos online mit KI-Super-Resolution hochskalieren. Erhöhe die Auflösung, verbessere die Bildqualität und optimiere niedrig aufgelöste Fotos, Porträts und Grafiken.",
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
      title="Upscale Image Online"
      description="Increase image resolution with AI upscaling for portraits, products, old photos, digital art, and low-resolution assets that need a cleaner export."
      steps={[
        {
          title: "Upload Image",
          description:
            "Choose a JPG, PNG, or WebP image that needs sharper detail or a larger export size.",
        },
        {
          title: "Pick AI Upscale Settings",
          description:
            "Select 2x, 4x, or 8x enlargement and enable face enhancement when the subject is a portrait.",
        },
        {
          title: "Download the Enhanced Result",
          description:
            "Wait for the AI job to finish, then save the upscaled output for web, print, or creative workflows.",
        },
      ]}
      faqs={[
        {
          q: "What is AI image upscaling?",
          a: "AI image upscaling increases resolution by predicting and reconstructing missing detail instead of only stretching existing pixels. That is why it behaves differently from normal resizing. The model tries to create a cleaner and sharper result, especially on edges, textures, and fine facial detail.",
        },
        {
          q: "What is the difference between upscale and resize?",
          a: "Resize changes dimensions, but it does not intelligently rebuild detail. Upscaling uses an AI model to enlarge while attempting to recover structure and texture. If your file only needs a different size for layout, resize is enough. If the file is visibly low-resolution and needs better clarity, upscale is the stronger tool.",
        },
        {
          q: "How can I increase image resolution without losing quality?",
          a: "The best path is to start with the highest-quality original available, choose a realistic scale like 2x or 4x, and avoid expecting tiny or heavily blurred images to become perfect. AI can improve many files, but it cannot fully recover detail that was never present in the source.",
        },
        {
          q: "When should I enable face enhancement?",
          a: "Enable it for portraits, profile photos, and selfies where facial detail matters most. Leave it off for screenshots, logos, product images, and many non-human subjects so the output does not over-prioritize face restoration logic.",
        },
        {
          q: "Are my files uploaded?",
          a: "Yes. AI upscaling runs through the backend processing pipeline because the model is heavier than a browser-only workflow. The file is used only to generate the enhanced output and is then handled through the job pipeline rather than stored as a public asset.",
        },
      ]}
      relatedTools={[
        { name: "Resize Image", path: "/resize-image" },
        { name: "Compress Image", path: "/compress-image" },
        { name: "Convert to PNG", path: "/convert-to-png" },
        { name: "Crop Image", path: "/crop-image" },
      ]}
    >
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-upscale-image"
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Upscale Image", url: `${SITE_URL}/upscale-image` },
        ]}
      />
      <div className="space-y-12">
        <UpscaleImageClient />

        <section className="mt-24 space-y-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Quick AI Upscaling Guide
            </h2>
            <p className="mt-2 leading-7 text-muted-foreground">
              AI upscaling is not the same as ordinary enlargement. A normal
              resize simply stretches the existing pixels. An AI image upscaler
              tries to reconstruct missing detail so the enlarged image looks
              cleaner, sharper, and more natural than a standard interpolation
              pass. That makes this page a long-term growth opportunity inside
              the broader image tool ecosystem, especially as AI workflows keep
              expanding.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Best for Low-Res Images
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Upscaling helps when the source image is too small for the next
                use case but still contains enough structure to rebuild.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Best for Portrait Recovery
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Face enhancement can improve selfies, profile photos, and
                portraits where skin detail and facial edges matter.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Best for Creative Workflows
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Upscaling is often useful before social reuse, print mockups,
                design presentations, or asset refresh work.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Stronger with Cleanup
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                After upscaling, you may still want to crop, resize, or compress
                the output for the final destination.
              </p>
            </article>
          </div>
        </section>

        <section className="space-y-8">
          <div className="px-6 text-center md:px-10">
            <h2 className="text-2xl font-display font-bold tracking-tight text-foreground">
              Traditional vs. AI Upscaling
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Why pixels are not enough: the science behind our neural network.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-border/60 bg-[linear-gradient(135deg,rgba(241,245,249,0.92),rgba(255,255,255,0.96))] shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left">
                <thead>
                  <tr className="bg-slate-100/80 text-foreground">
                    <th className="px-8 py-6 text-lg font-semibold">Feature</th>
                    <th className="px-8 py-6 text-lg font-semibold">
                      Traditional (Bicubic)
                    </th>
                    <th className="px-8 py-6 text-lg font-semibold text-sky-700">
                      OptiPix AI Upscaling
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Edge Clarity",
                      traditional: "Blurry and feathered edges",
                      ai: "Razor-sharp reconstruction",
                    },
                    {
                      feature: "Noise Handling",
                      traditional: "Magnifies existing grain",
                      ai: "Smart noise suppression",
                    },
                    {
                      feature: "Texture Generation",
                      traditional: "Flat, plastic look",
                      ai: "Realistic skin/hair synthesis",
                    },
                  ].map((row, index, rows) => (
                    <tr
                      key={row.feature}
                      className={
                        index < rows.length - 1 ? "border-b border-border/60" : ""
                      }
                    >
                      <td className="border-b border-border/50 px-8 py-8 font-semibold text-foreground last:border-b-0">
                        {row.feature}
                      </td>
                      <td className="border-b border-border/50 px-8 py-8 text-slate-700 last:border-b-0">
                        {row.traditional}
                      </td>
                      <td className="border-b border-border/50 px-8 py-8 font-semibold text-sky-900 last:border-b-0">
                        {row.ai}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="space-y-12">
          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                What Is AI Image Upscaling?
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                AI image upscaling is a model-driven process that enlarges an
                image while attempting to reconstruct detail that normal
                resizing methods cannot restore. This is why searches like{" "}
                <span className="font-medium text-foreground">
                  AI image upscaler free
                </span>{" "}
                and{" "}
                <span className="font-medium text-foreground">
                  increase image resolution
                </span>{" "}
                usually come from a quality problem, not just a size problem.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                A standard enlargement can make the file bigger, but it often
                leaves the result soft or visibly interpolated. AI upscaling
                tries to rebuild edges, reduce noise, and generate a more
                convincing large image from the available source information.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Upscale vs Resize - What&apos;s the Difference?
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Resize is the right tool when you only need new dimensions for a
                layout, social preset, or export spec. Upscale is the right tool
                when the image is actually too low-resolution and needs an
                attempt at detail recovery. If the file already looks sharp and
                only needs different dimensions, use{" "}
                <Link
                  href="/resize-image"
                  className="font-medium text-primary hover:underline"
                >
                  Resize Image
                </Link>
                .
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                In practice, many workflows use both. Upscale first to improve
                the source, then resize or crop the result to fit the final
                destination more cleanly.
              </p>
            </article>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                How to Increase Image Resolution Without Losing Quality
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                The practical answer is to start with the best source available,
                choose a realistic scale, and avoid expecting miracles from
                extremely tiny or heavily blurred images. AI can improve many
                files, but it still depends on having enough usable signal in
                the source to reconstruct something believable.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                For many cases, 2x or 4x is the safest starting point. These
                scales often give a better balance between visible improvement
                and natural-looking output. Very large 8x enlargement can still
                be useful, but it asks more from the source and the model.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Upscale vs Sharpen - Not the Same Thing
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Sharpening boosts local contrast to make edges look crisper.
                Upscaling tries to enlarge and reconstruct detail at the same
                time. A sharpen filter may improve perceived clarity, but it
                will not truly add resolution. AI upscaling is solving a
                different problem and is generally better when the source is too
                small for the intended final use.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                That distinction matters because many users searching to{" "}
                <span className="font-medium text-foreground">
                  enhance image quality
                </span>{" "}
                are not only asking for sharper edges. They want a file that can
                survive a larger display size more convincingly.
              </p>
            </article>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Best Use Cases for Image Upscaling
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Common use cases include old photos, low-resolution portraits,
                product images that need a larger export, AI-generated images
                that need refinement, and creative assets that must be reused in
                higher-resolution layouts. This is especially helpful when the
                image is visually important but the original source is not large
                enough for the next placement.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                It is also useful as part of a longer publishing chain. After
                enhancement, you may still want to use{" "}
                <Link
                  href="/crop-image"
                  className="font-medium text-primary hover:underline"
                >
                  Crop Image
                </Link>{" "}
                for framing,{" "}
                <Link
                  href="/resize-image"
                  className="font-medium text-primary hover:underline"
                >
                  Resize Image
                </Link>{" "}
                for exact layout fit, and{" "}
                <Link
                  href="/compress-image"
                  className="font-medium text-primary hover:underline"
                >
                  Compress Image
                </Link>{" "}
                for lighter delivery.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                What to Expect from an AI Upscaler
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                AI upscalers can produce genuinely better-looking results, but
                they are not magic restoration machines. Extremely noisy,
                over-compressed, or tiny source files can still hit quality
                limits. The right expectation is improvement, not guaranteed
                perfection.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                That said, this category is still valuable for long-term SEO
                because it sits at the intersection of AI, creativity, image
                quality, and performance workflows. It may not be the fastest
                page to rank, but it is a strong future-growth asset when
                paired with solid educational content.
              </p>
            </article>
          </section>

          <section className="bg-background">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Build an AI Image Enhancement Workflow
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
              This page works best as part of a larger image processing system.
              Use AI enhancement to recover a stronger source, then continue
              into{" "}
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
              , or format conversion such as{" "}
              <Link
                href="/convert-to-png"
                className="font-medium text-primary hover:underline"
              >
                PNG
              </Link>{" "}
              when the output needs a specific final format. That is what gives
              this AI tool long-term SEO value: it connects naturally to the
              rest of the image optimization ecosystem instead of standing
              alone.
            </p>
          </section>
        </section>
      </div>
    </ToolLayout>
  );
}
