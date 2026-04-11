import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { ToolLayout } from "@/app/components/layout/tool-layout";
import TargetCompressClient from "@/app/components/tools/target-compress-client";
import { COMPRESS_SIZE_ENTRIES } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import {
  createPageMetadata,
  resolveSupportedLanguage,
} from "@/app/lib/metadata";
import ToolNextActions from "@/app/components/tools/tool-next-actions";
import { getToolNextActions } from "@/app/lib/tool-next-actions";

function getUseCaseCopy(sizeKB: number) {
  if (sizeKB <= 100) {
    return {
      why: "Small file targets like this are common for exam portals, application forms, ID uploads, and systems that reject anything above a very specific size.",
      useCases: [
        "Government forms and visa portals with strict upload caps.",
        "Job application systems that only accept very small photos.",
        "Email attachments where fast sending matters more than perfect detail.",
      ],
      formatTip:
        "JPG or WebP usually reaches this target more easily than PNG for photos.",
    };
  }

  if (sizeKB <= 300) {
    return {
      why: "Targets like this are common when a website, form, marketplace, or email workflow needs images that stay lightweight without looking too degraded.",
      useCases: [
        "Application forms, resumes, and profile uploads with file limits.",
        "Email attachments that need to send quickly without bouncing.",
        "Website uploads where you want a clean image without unnecessary weight.",
      ],
      formatTip:
        "JPG and WebP are usually the easiest formats for hitting this target cleanly.",
    };
  }

  return {
    why: "Larger file targets are useful when you still need a lighter asset, but want to preserve more detail for product images, blog visuals, or hero graphics.",
    useCases: [
      "Website images that need to load faster while staying crisp.",
      "Marketplace or product uploads where texture still matters.",
      "Marketing graphics that need a balance of quality and performance.",
    ],
    formatTip:
      "WebP often gives the best balance of quality and file size at this range.",
  };
}

export function generateStaticParams() {
  return COMPRESS_SIZE_ENTRIES.map((entry) => ({ size: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; size: string }>;
}) {
  const { locale, size } = await params;
  const entry = COMPRESS_SIZE_ENTRIES.find((item) => item.slug === size);
  if (!entry) return {};
  return createPageMetadata({
    locale,
    path: `/compress-image-to/${entry.slug}`,
    title: {
      en: `Compress Image to ${entry.label} Online (Free) - Reduce Image Size Instantly`,
      vi: `Nén ảnh về ${entry.label} online miễn phí - Giảm dung lượng ngay`,
    },
    description: {
      en: `Compress image to ${entry.label} online free. Reduce image size for ${entry.purpose}, upload limits, forms, email, and lightweight website images.`,
      vi: `Nén ảnh về ${entry.label} online miễn phí. Giảm dung lượng ảnh cho giới hạn upload, biểu mẫu, email và nhu cầu chia sẻ file nhẹ hơn.`,
    },
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; size: string }>;
}) {
  const { locale, size } = await params;
  const entry = COMPRESS_SIZE_ENTRIES.find((item) => item.slug === size);
  if (!entry) notFound();

  const content = getUseCaseCopy(entry.sizeKB);
  const languageCode = resolveSupportedLanguage(locale);
  const nextActions = getToolNextActions("target-compress", languageCode);
  const otherSizes = COMPRESS_SIZE_ENTRIES.filter(
    (item) => item.slug !== entry.slug,
  );
  const faqs = [
    ...entry.faqs,
    {
      q: `Can I resize an image to ${entry.label} instead of compressing it?`,
      a: `Sometimes, yes. Resizing reduces pixel dimensions, while compression reduces file size through format and quality changes. If your image is still too large after compression, try [Resize Image](${SITE_URL}/resize-image) first and then compress again.`,
    },
    {
      q: `Will compressing an image to ${entry.label} reduce quality?`,
      a: `It can, especially if the original file is much larger than the target. The goal is to reach about ${entry.label} while keeping the image usable. Photos, screenshots, and graphics behave differently, so some files can hit the target cleanly while others need a best-effort result.`,
    },
    {
      q: `What if my image cannot reach ${entry.label} exactly?`,
      a: `That usually means the file would lose too much detail if compression became more aggressive. In that case, try cropping unused areas, resizing the image, or converting to JPG or WebP before compressing again.`,
    },
  ];

  return (
    <ToolLayout
      locale={locale}
      title={`Compress Image to ${entry.label}`}
      description={`Compress your image to about ${entry.label} - ideal for ${entry.purpose}, upload limits, and lightweight sharing.`}
      steps={[
        {
          title: "Upload Image",
          description: "Choose a photo or graphic to compress.",
        },
        {
          title: "Target Size",
          description: `We compress to approximately ${entry.label}.`,
        },
        {
          title: "Download",
          description: "Save your optimized file instantly.",
        },
      ]}
      faqs={faqs}
      relatedTools={[
        { name: "Compress Image", path: "/compress-image" },
        { name: "Resize Image", path: "/resize-image" },
        { name: "Convert to JPG", path: "/convert-to-jpg" },
      ]}
    >
      <div className="space-y-12">
        <BreadcrumbsJsonLd
          scriptId={`breadcrumbs-compress-${entry.slug}`}
          items={[
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Compress Image", url: `${SITE_URL}/compress-image` },
            {
              name: `Compress to ${entry.label}`,
              url: `${SITE_URL}/compress-image-to/${entry.slug}`,
            },
          ]}
        />
        <TargetCompressClient
          targetSizeKB={entry.sizeKB}
          targetLabel={entry.label}
        />

        <ToolNextActions
          title={nextActions.title}
          description={nextActions.description}
          items={nextActions.items}
        />

        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-3">Other size options</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Need a different target? Try another preset size below.
          </p>
          <div className="flex flex-wrap gap-3">
            {otherSizes.map((item) => (
              <Link
                key={item.slug}
                href={`/compress-image-to/${item.slug}`}
                className="px-4 py-2 rounded-full border border-border bg-secondary/40 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold mb-2">
              Why {entry.label} Is Often Required
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              {content.why}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold mb-2">Best Format Hint</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              {content.formatTip} If the image still stays too large, try{" "}
              <Link
                href="/convert-to-jpg"
                className="font-medium text-primary hover:text-primary/80"
              >
                Convert to JPG
              </Link>{" "}
              or{" "}
              <Link
                href="/convert-to-webp"
                className="font-medium text-primary hover:text-primary/80"
              >
                Convert to WebP
              </Link>{" "}
              before compressing again.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold mb-2">Quick Rule of Thumb</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              The bigger the gap between the source file and {entry.label}, the
              more likely you will need resizing or cropping in addition to
              compression.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-3">
            How to Compress Image to {entry.label} Without Losing Quality
          </h2>
          <div className="space-y-3 text-sm leading-7 text-muted-foreground">
            <p>
              The cleanest way to hit {entry.label} is to treat it as a
              file-size target, not just a slider setting. Start by using the
              smallest image dimensions that still fit your final use case. Then
              apply compression in a format that suits the image type.
            </p>
            {entry.howTo.map((tip) => (
              <p key={tip}>{tip}</p>
            ))}
            <p>
              If the file is still too large, use{" "}
              <Link
                href="/resize-image"
                className="font-medium text-primary hover:text-primary/80"
              >
                Resize Image
              </Link>{" "}
              to reduce dimensions first, or{" "}
              <Link
                href="/crop-image"
                className="font-medium text-primary hover:text-primary/80"
              >
                Crop Image
              </Link>{" "}
              to remove unused areas before trying again.
            </p>
          </div>
        </section>

        <section className="bg-card">
          <h2 className="text-xl font-semibold mb-3">
            Best Use Cases for {entry.label} Images
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {content.useCases.map((useCase) => (
              <div
                key={useCase}
                className="rounded-xl border border-border/60 bg-secondary/30 p-4 text-sm leading-7 text-muted-foreground"
              >
                {useCase}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-3">
            Resize vs Compress to {entry.label}
          </h2>
          <div className="space-y-3 text-sm leading-7 text-muted-foreground">
            <p>
              Compression reduces file weight, while resizing changes the actual
              image dimensions. If your goal is to meet a strict upload rule
              like {entry.label}, compression should usually be the first step.
              But if the original image is extremely large, resizing can make
              the target much easier to reach.
            </p>
            <p>
              A practical workflow is: compress first, then resize if needed,
              then compress again. That is why this long-tail page works best as
              part of a bigger image optimization flow, not as a one-click
              guarantee for every file.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-3">
            Build a Better Compression Workflow
          </h2>
          <p className="text-sm leading-7 text-muted-foreground">
            If one pass does not get your image close enough to {entry.label},
            move through the rest of the toolkit instead of forcing extreme
            compression. Start with{" "}
            <Link
              href="/compress-image"
              className="font-medium text-primary hover:text-primary/80"
            >
              Compress Image
            </Link>{" "}
            for flexible quality control, use{" "}
            <Link
              href="/resize-image"
              className="font-medium text-primary hover:text-primary/80"
            >
              Resize Image
            </Link>{" "}
            for oversized uploads, and switch formats with{" "}
            <Link
              href="/convert-to-jpg"
              className="font-medium text-primary hover:text-primary/80"
            >
              Convert to JPG
            </Link>{" "}
            or{" "}
            <Link
              href="/convert-to-webp"
              className="font-medium text-primary hover:text-primary/80"
            >
              Convert to WebP
            </Link>{" "}
            when the file format is the real bottleneck.
          </p>
        </section>
      </div>
    </ToolLayout>
  );
}
