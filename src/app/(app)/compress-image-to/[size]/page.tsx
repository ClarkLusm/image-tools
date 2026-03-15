import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolLayout } from "@/app/components/layout/tool-layout";
import TargetCompressClient from "@/app/components/tools/target-compress-client";
import { COMPRESS_SIZE_ENTRIES } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";

export function generateStaticParams() {
  return COMPRESS_SIZE_ENTRIES.map((entry) => ({ size: entry.slug }));
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ size: string }>;
}) => {
  const { size } = await params;
  const entry = COMPRESS_SIZE_ENTRIES.find((item) => item.slug === size);
  if (!entry) return {};
  return {
    title: `Compress Image to ${entry.label} (Free Online Tool)`,
    description: `Compress images to ${entry.label} for ${entry.purpose}. Fast, secure, and browser-friendly.`,
    alternates: {
      canonical: `${SITE_URL}/compress-image-to/${entry.slug}`,
    },
  };
};

export default async function Page({
  params,
}: {
  params: Promise<{ size: string }>;
}) {
  const { size } = await params;
  const entry = COMPRESS_SIZE_ENTRIES.find((item) => item.slug === size);
  if (!entry) notFound();

  const otherSizes = COMPRESS_SIZE_ENTRIES.filter(
    (item) => item.slug !== entry.slug
  );

  return (
    <ToolLayout
      title={`Compress Image to ${entry.label}`}
      description={`Compress your image to about ${entry.label} — ideal for ${entry.purpose}.`}
      steps={[
        { title: "Upload Image", description: "Choose a photo or graphic to compress." },
        { title: "Target Size", description: `We compress to approximately ${entry.label}.` },
        { title: "Download", description: "Save your optimized file instantly." }
      ]}
      faqs={[
        ...entry.faqs
      ]}
      relatedTools={[
        { name: "Compress Image", path: "/compress-image" },
        { name: "Resize Image", path: "/resize-image" }
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
        <TargetCompressClient targetSizeKB={entry.sizeKB} targetLabel={entry.label} />

        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-3">How to hit {entry.label}</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            {entry.howTo.map((tip) => (
              <p key={tip}>{tip}</p>
            ))}
          </div>
        </section>

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
      </div>
    </ToolLayout>
  );
}
