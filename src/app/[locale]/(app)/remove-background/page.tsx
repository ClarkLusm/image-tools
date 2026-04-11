import { Link } from "@/i18n/navigation";
import { ToolLayout } from "@/app/components/layout/tool-layout";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";
import RemoveBackgroundClient from "./remove-background-client";
import {
  createPageMetadata,
  resolveSupportedLanguage,
} from "@/app/lib/metadata";
import ToolNextActions from "@/app/components/tools/tool-next-actions";
import { getToolNextActions } from "@/app/lib/tool-next-actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    path: "/remove-background",
    title: {
      en: "Remove Background Online (Free) - Background Remover Tool",
      vi: "Xóa nền online miễn phí - Công cụ tách nền ảnh",
      de: "Hintergrund online entfernen (kostenlos) - Hintergrundentferner",
    },
    description: {
      en: "Remove background from image online free with a fast background remover tool for product photos, avatars, thumbnails, and clean PNG exports.",
      vi: "Xóa nền ảnh online miễn phí với công cụ tách nền nhanh cho ảnh sản phẩm, avatar, thumbnail và file PNG trong suốt sạch hơn.",
      de: "Hintergrund kostenlos online aus Bildern entfernen mit einem schnellen Tool für Produktfotos, Avatare, Thumbnails und saubere PNG-Exporte.",
    },
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const languageCode = resolveSupportedLanguage(locale);
  const nextActions = getToolNextActions("remove-background", languageCode);

  return (
    <ToolLayout
      locale={locale}
      title="Remove Background from Image Online"
      description="Remove backgrounds from product photos, avatars, social graphics, and content assets so the subject stands out more cleanly."
      steps={[
        {
          title: "Upload Image",
          description:
            "Choose the image you want to clean up, such as a product photo, portrait, logo mockup, or social asset.",
        },
        {
          title: "Refine Background Detection",
          description:
            "Adjust threshold and edge softness so the cutout keeps more of the subject while removing distracting background areas.",
        },
        {
          title: "Download Transparent PNG",
          description:
            "Export the cleaned result as PNG and continue into crop, resize, or compression if needed.",
        },
      ]}
      faqs={[
        {
          q: "What is background removal?",
          a: "Background removal is the process of separating the subject from the surrounding backdrop so the final image keeps only the person, product, or object you want to highlight. It is one of the fastest ways to make visuals feel cleaner and more professional without complex design software.",
        },
        {
          q: "How does background removal work?",
          a: "The tool analyzes the image, estimates where the subject ends and the background begins, then rebuilds the result as a transparent PNG. In practice, clean backgrounds and clear subject edges usually produce the strongest cutouts.",
        },
        {
          q: "What images work best?",
          a: "Product shots, portraits, headshots, and images with a clear subject against a simpler background usually work best. Hair, transparent objects, and busy backgrounds are harder, which is why edge tuning matters.",
        },
        {
          q: "Is this the same as cropping?",
          a: "No. Cropping changes the visible frame, while background removal separates foreground from background. If the subject is already isolated but framed badly, crop is the next step. If the subject needs to be cut out from its surroundings, background removal is the right tool.",
        },
        {
          q: "Are my files uploaded?",
          a: "No. This background removal flow runs locally in your browser, which makes it faster to test and easier to trust for privacy-sensitive work.",
        },
      ]}
      relatedTools={[
        { name: "Crop Image", path: "/crop-image" },
        { name: "Resize Image", path: "/resize-image" },
        { name: "Compress Image", path: "/compress-image" },
        { name: "Upscale Image", path: "/upscale-image" },
        { name: "Convert to PNG", path: "/convert-to-png" },
      ]}
    >
      <div className="space-y-10">
        <BreadcrumbsJsonLd
          scriptId="breadcrumbs-remove-background"
          items={[
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Remove Background", url: `${SITE_URL}/remove-background` },
          ]}
        />

        <RemoveBackgroundClient />

        <ToolNextActions
          title={nextActions.title}
          description={nextActions.description}
          items={nextActions.items}
        />

        <section className="mt-16 space-y-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-display font-bold text-foreground">
              Quick Background Removal Guide
            </h2>
            <p className="mt-2 leading-7 text-muted-foreground">
              Background removal sits at the intersection of design, content,
              ecommerce, and social media. It is not just an image cleanup task.
              It is a way to create clearer visuals for product listings,
              thumbnails, marketing assets, profile images, and promotional
              content without jumping into heavier editing software.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Better for Product Photos
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Clean product cutouts look more professional on marketplaces,
                landing pages, and catalog grids.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Better for Avatars
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Removing the background helps profile images, team pages, and
                creator branding look more polished.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Better for Thumbnails
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Isolated subjects are easier to place into YouTube thumbnails,
                ads, and social creative layouts.
              </p>
            </article>

            <article className="rounded-2xl border border-border/80 bg-card p-5">
              <h3 className="text-lg font-semibold text-foreground">
                Better with PNG
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Transparent PNG output makes it much easier to reuse the cutout
                in other design or publishing workflows.
              </p>
            </article>
          </div>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                What Is Background Removal?
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Background removal means separating the main subject from the
                rest of the image so the final file can be used on a transparent
                or replacement background. This is why searches like{" "}
                <span className="font-medium text-foreground">
                  remove background
                </span>
                ,{" "}
                <span className="font-medium text-foreground">
                  remove background from image
                </span>
                , and{" "}
                <span className="font-medium text-foreground">
                  background remover online
                </span>{" "}
                are so commercially valuable. The user is usually not browsing.
                They are trying to produce a professional-looking visual quickly.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                This is especially relevant for ecommerce, social media,
                creator branding, marketing design, and marketplaces where a
                clean subject often performs better than a cluttered or
                distracting background.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                How Smart Background Removal Works
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                A background remover estimates subject boundaries, separates
                foreground from background, and then rebuilds the image with
                transparency. In practice, the output quality depends on a few
                things: subject contrast, edge complexity, hair detail,
                transparency, shadows, and how visually busy the original scene
                is.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                Many users search for an{" "}
                <span className="font-medium text-foreground">
                  AI background remover
                </span>{" "}
                because what they really want is cleaner edge detection and less
                manual editing. Even when the workflow feels simple, the real
                value is smart subject separation rather than basic cropping.
              </p>
            </article>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Best Use Cases for Background Removal
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Product photos are one of the strongest use cases because clean
                cutouts often perform better on ecommerce pages, catalog cards,
                and marketplace listings. Another strong use case is avatars and
                team photos, where removing the background helps create a more
                consistent brand look. A third is thumbnails and ad creatives,
                where isolated subjects are easier to position inside layouts.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                This is why the page has commercial intent. A user searching for{" "}
                <span className="font-medium text-foreground">
                  remove background for product
                </span>{" "}
                or{" "}
                <span className="font-medium text-foreground">
                  remove background from image free
                </span>{" "}
                is often very close to a publishing or selling action.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Why Edge Quality Matters
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                The perceived quality of a background remover usually comes down
                to edges. Hair, soft shadows, transparent surfaces, and fine
                product outlines are where weak tools start to break down.
                Clean edges matter because viewers notice them immediately,
                especially when the cutout is placed on a solid color,
                thumbnail, or ecommerce background.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                That is why this tool exposes threshold and edge softness
                controls. A good remover is not only fast. It also gives you a
                little room to improve difficult cutouts without starting over
                in a full design app.
              </p>
            </article>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Remove Background vs Crop
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Cropping changes the frame. Background removal changes the
                subject isolation. If the object is already separated visually
                but framed badly, use{" "}
                <Link
                  href="/crop-image"
                  className="font-medium text-primary hover:underline"
                >
                  Crop Image
                </Link>
                . If the object is buried inside a distracting scene and needs a
                transparent cutout, background removal is the right step.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                In many workflows, both are used together: remove the
                background first, then crop the subject for better composition
                in the final layout.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Remove Background vs Photoshop
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Photoshop gives deeper manual control, but it also asks for more
                time and skill. A browser-based remover is stronger when speed,
                convenience, and repeatable cleanup matter more than full manual
                masking. That makes it especially valuable for content teams,
                ecommerce workflows, and creators who need usable output fast.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                The goal is not to replace every design workflow. It is to make
                common background cleanup jobs dramatically faster.
              </p>
            </article>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Build a Better Image Editing Workflow
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Background removal is often only the first step. After the
                subject is isolated, you may want to use{" "}
                <Link
                  href="/crop-image"
                  className="font-medium text-primary hover:underline"
                >
                  Crop Image
                </Link>{" "}
                for tighter framing,{" "}
                <Link
                  href="/resize-image"
                  className="font-medium text-primary hover:underline"
                >
                  Resize Image
                </Link>{" "}
                for exact placement, or{" "}
                <Link
                  href="/compress-image"
                  className="font-medium text-primary hover:underline"
                >
                  Compress Image
                </Link>{" "}
                if the PNG output is heavier than you want.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                If the source itself is too soft or too small,{" "}
                <Link
                  href="/upscale-image"
                  className="font-medium text-primary hover:underline"
                >
                  Upscale Image
                </Link>{" "}
                can also be part of the pipeline before or after cleanup,
                depending on the asset.
              </p>
            </article>

            <article className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-2xl font-display font-bold text-foreground">
                Why This Page Can Be a Commercial SEO Pillar
              </h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                This page is not only a utility. It sits in a commercially
                valuable part of the image tool market because the use cases
                connect directly to product listings, creative output, profile
                branding, and content publishing. That makes it one of the
                stronger opportunities for both traffic and conversion when the
                content and internal linking are handled well.
              </p>
              <p className="mt-3 leading-7 text-muted-foreground">
                In other words, this is a page that can support both discovery
                and action. It deserves to be treated as one of the top pillars
                in the broader image editing ecosystem, not just as another
                small utility page.
              </p>
            </article>
          </section>
        </section>
      </div>
    </ToolLayout>
  );
}
