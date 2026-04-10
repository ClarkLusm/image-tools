import { Link } from "@/i18n/navigation";
import { ToolLayout } from "@/app/components/layout/tool-layout";
import CropImageClient from "./crop-image-client";
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
    path: "/crop-image",
    title: {
      en: "Crop Image Online (Free) - Crop Photo to Any Size and Ratio",
      vi: "Cắt ảnh online miễn phí - Crop ảnh theo mọi kích thước và tỷ lệ",
    },
    description: {
      en: "Crop image online free with exact aspect ratios and precise framing. Crop photos for social media, thumbnails, profile images, and any custom size.",
      vi: "Cắt ảnh online miễn phí với tỷ lệ chuẩn và bố cục chính xác. Crop ảnh cho mạng xã hội, thumbnail, ảnh hồ sơ và mọi kích thước tùy chỉnh.",
    },
  });
}

export default function Page() {
  return (
    <ToolLayout
      title="Crop Image Online"
      description="Crop photos and graphics to the exact area, size, and ratio you need for social media, thumbnails, profile images, and everyday design work."
      collapseHeaderOnActiveImage
      steps={[
        {
          title: "Upload Image",
          description:
            "Choose the photo or graphic you want to crop for social, web, or general use.",
        },
        {
          title: "Adjust Crop Frame",
          description:
            "Drag the crop box, switch ratios, and refine the visible composition in real time.",
        },
        {
          title: "Download the Cropped Result",
          description:
            "Export the final image and continue into resizing or compression if your workflow needs it.",
        },
      ]}
      faqs={[
        {
          q: "What is the difference between crop and resize?",
          a: "Cropping changes composition by removing part of the image, while resizing changes the overall dimensions. If the image contains the right subject but too much surrounding area, crop is the right tool. If the image already has the right framing but needs different pixel dimensions, resize is the better next step.",
        },
        {
          q: "Can I crop image to exact size or ratio?",
          a: "Yes. You can crop to a freeform selection or switch to common ratios such as 1:1, 4:5, 16:9, and 9:16. That makes it much easier to prepare content for social posts, thumbnails, profile photos, and other layout-specific placements.",
        },
        {
          q: "What is the best aspect ratio for cropping?",
          a: "The best ratio depends on where the image will be used. Square crops work well for profile and grid layouts, portrait ratios are common for Instagram and mobile content, and wide ratios suit banners and thumbnails. There is no universal winner, only the best fit for the destination.",
        },
        {
          q: "Is cropping destructive?",
          a: "Cropping creates a new output image that contains only the selected area. Your original file stays untouched, so you can always go back and make a different crop if needed.",
        },
        {
          q: "Are my files uploaded?",
          a: "No. Cropping runs locally in your browser, which keeps the workflow fast, private, and easy to use without any upload requirement.",
        },
      ]}
      relatedTools={[
        { name: "Resize Image", path: "/resize-image" },
        { name: "Compress Image", path: "/compress-image" },
        { name: "Resize Instagram Image", path: "/resize-instagram" },
        { name: "Resize Facebook Image", path: "/resize-facebook" },
      ]}
    >
      <div className="space-y-10">
        <BreadcrumbsJsonLd
          scriptId="breadcrumbs-crop-image"
          items={[
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Crop Image", url: `${SITE_URL}/crop-image` },
          ]}
        />

        <CropImageClient />

        <section className="mt-24 space-y-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Quick Cropping Guide
            </h2>
            <p className="mt-2 leading-7 text-muted-foreground">
              Cropping is about composition, not just dimensions. It helps you
              remove distracting space, improve framing, fit a target layout,
              and keep the viewer&apos;s attention on the most important part of
              the image. That makes crop one of the easiest image tasks to turn
              into a real UX improvement across websites, social posts, and
              thumbnails.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Better Composition
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Cropping helps remove empty or distracting areas so the subject
                feels clearer and more intentional.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Better for Social
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Social channels often expect specific ratios, so a clean crop is
                one of the fastest ways to prevent awkward platform cuts.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Better for Thumbnails
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Cropping helps large subjects, faces, or product details stay
                visible in smaller preview cards and video thumbnails.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Better with Resize
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Crop first for framing, then resize for exact output dimensions
                and compress for lighter delivery if needed.
              </p>
            </article>
          </div>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                How to Crop Images to Exact Size
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                The cleanest workflow is to crop for composition first, then
                resize if the final platform needs an exact pixel output. This
                matters because many users searching for{" "}
                <span className="font-medium text-foreground">
                  crop image to size
                </span>{" "}
                are really solving two problems at once: framing and dimensions.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                Start by selecting the most important part of the image. Move
                the crop box until the subject sits where you want it. If you
                need a platform-specific ratio, switch to a locked preset like
                1:1, 4:5, 16:9, or 9:16. Once the crop feels right, export the
                image and continue into{" "}
                <Link
                  href="/resize-image"
                  className="font-medium text-primary hover:underline"
                >
                  Resize Image
                </Link>{" "}
                if exact output dimensions still matter.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Crop Image for Social Media
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Social media is one of the strongest reasons to crop. Different
                platforms favor different shapes, and if the composition does
                not match the expected ratio, important text, faces, or products
                can get cut off. This is especially true for searches like{" "}
                <span className="font-medium text-foreground">
                  crop image for instagram
                </span>{" "}
                and other platform-specific long-tail terms.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                If you already know the destination, it is often worth jumping
                straight into dedicated tools like{" "}
                <Link
                  href="/resize-instagram"
                  className="font-medium text-primary hover:underline"
                >
                  Resize Instagram
                </Link>{" "}
                or{" "}
                <Link
                  href="/resize-facebook"
                  className="font-medium text-primary hover:underline"
                >
                  Resize Facebook
                </Link>
                . But when you need a flexible starting point, generic cropping
                is the fastest way to regain control over framing.
              </p>
            </article>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Best Aspect Ratios for Cropping
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Ratio choice depends on context. Square 1:1 is useful for
                profile images and grid layouts. Portrait ratios like 4:5 and
                9:16 are common for mobile-first social content. Wide ratios
                like 16:9 are useful for banners, thumbnails, presentations,
                and video-related assets.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                This is why a strong crop page should cover more than one
                keyword. Queries like{" "}
                <span className="font-medium text-foreground">
                  crop image ratio
                </span>{" "}
                and{" "}
                <span className="font-medium text-foreground">
                  crop image online
                </span>{" "}
                are really asking for layout guidance as much as tool access.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Crop vs Resize - What&apos;s the Difference?
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Cropping removes part of the image. Resizing changes the overall
                dimensions of the full image. If the subject is framed badly,
                crop first. If the subject is framed correctly but the file is
                too large or too small for the destination, resize next.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                In many practical workflows, you use both. Crop to fix layout
                and composition, then use{" "}
                <Link
                  href="/resize-image"
                  className="font-medium text-primary hover:underline"
                >
                  Resize Image
                </Link>{" "}
                or{" "}
                <Link
                  href="/compress-image"
                  className="font-medium text-primary hover:underline"
                >
                  Compress Image
                </Link>{" "}
                to prepare the final deliverable.
              </p>
            </article>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Composition Tips That Most Crop Tools Skip
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Good cropping is not only about dimensions. It is also about
                composition. A centered crop works well for avatars, logos, and
                product shots, but it is not always the strongest choice for
                editorial images or social posts. In those cases, leaving more
                space in the direction the subject faces or follows can make the
                image feel more balanced.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                You can also think in terms of simple layout rules like
                emphasizing the focal subject, trimming dead space, and using a
                rough rule-of-thirds mindset when the crop should feel more
                dynamic than a standard center crop. This kind of guidance is a
                real differentiation opportunity because many crop tools ignore
                it completely.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Build a Better Image Editing Workflow
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Cropping is often the first editing step in a longer workflow.
                Once composition is fixed, continue into{" "}
                <Link
                  href="/resize-image"
                  className="font-medium text-primary hover:underline"
                >
                  resizing
                </Link>{" "}
                for exact dimensions,{" "}
                <Link
                  href="/compress-image"
                  className="font-medium text-primary hover:underline"
                >
                  compression
                </Link>{" "}
                for lighter delivery, or platform-specific tools like{" "}
                <Link
                  href="/resize-instagram"
                  className="font-medium text-primary hover:underline"
                >
                  Instagram
                </Link>{" "}
                and{" "}
                <Link
                  href="/resize-facebook"
                  className="font-medium text-primary hover:underline"
                >
                  Facebook
                </Link>{" "}
                when you need a final social-ready asset.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                That makes this page more than a one-off utility. It can act as
                a quick-win long-tail entry point into the wider image editing
                ecosystem across your site.
              </p>
            </article>
          </section>
        </section>
      </div>
    </ToolLayout>
  );
}
