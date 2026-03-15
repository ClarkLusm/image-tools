import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolLayout } from "@/app/components/layout/tool-layout";
import TargetCompressClient from "@/app/components/tools/target-compress-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { COMPRESS_USE_CASE_ENTRIES } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return COMPRESS_USE_CASE_ENTRIES.map((entry) => ({ slug: entry.slug }));
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const entry = COMPRESS_USE_CASE_ENTRIES.find((item) => item.slug === slug);
  if (!entry) return {};
  return {
    title: `${entry.title} (Free Online Tool)`,
    description: entry.description,
    alternates: {
      canonical: `${SITE_URL}/compress-image/for/${entry.slug}`,
    },
  };
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = COMPRESS_USE_CASE_ENTRIES.find((item) => item.slug === slug);
  if (!entry) notFound();

  const otherEntries = COMPRESS_USE_CASE_ENTRIES.filter(
    (item) => item.slug !== entry.slug
  );

  return (
    <ToolLayout
      title={entry.title}
      description={entry.description}
      steps={[
        { title: "Upload Image", description: "Choose the image to optimize." },
        {
          title: "Compress",
          description: `Target a size suitable for ${entry.purpose}.`,
        },
        { title: "Download", description: "Save the optimized file instantly." },
      ]}
      faqs={[...entry.faqs]}
      relatedTools={[
        { name: "Compress Image", path: "/compress-image" },
        { name: "Resize Image", path: "/resize-image" },
      ]}
    >
      <div className="space-y-12">
        <BreadcrumbsJsonLd
          scriptId={`breadcrumbs-compress-${entry.slug}`}
          items={[
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Compress Image", url: `${SITE_URL}/compress-image` },
            {
              name: entry.title,
              url: `${SITE_URL}/compress-image/for/${entry.slug}`,
            },
          ]}
        />

        <TargetCompressClient
          targetSizeKB={
            entry.recommendedSizes[0]?.slug === "1mb"
              ? 1024
              : entry.recommendedSizes[0]?.slug === "2mb"
                ? 2048
                : Number(entry.recommendedSizes[0]?.slug.replace("kb", "")) ||
                  300
          }
          targetLabel={entry.recommendedSizes[0]?.label ?? "300 KB"}
        />

        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-3">
            How to optimize for {entry.purpose}
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            {entry.howTo.map((tip) => (
              <p key={tip}>{tip}</p>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-3">
            Recommended target sizes
          </h3>
          <div className="flex flex-wrap gap-3">
            {entry.recommendedSizes.map((size) => (
              <Link
                key={size.slug}
                href={`/compress-image-to/${size.slug}`}
                className="px-4 py-2 rounded-full border border-border bg-secondary/40 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                {size.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-3">Other use cases</h3>
          <div className="flex flex-wrap gap-3">
            {otherEntries.map((item) => (
              <Link
                key={item.slug}
                href={`/compress-image/for/${item.slug}`}
                className="px-4 py-2 rounded-full border border-border bg-secondary/40 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </ToolLayout>
  );
}
