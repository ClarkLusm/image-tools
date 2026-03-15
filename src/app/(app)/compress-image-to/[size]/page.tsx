import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolLayout } from "@/app/components/layout/tool-layout";
import TargetCompressClient from "@/app/components/tools/target-compress-client";

type SizeEntry = {
  slug: string;
  label: string;
  sizeKB: number;
  purpose: string;
};

const SIZE_ENTRIES: SizeEntry[] = [
  { slug: "10kb", label: "10 KB", sizeKB: 10, purpose: "favicons, tiny icons, and ultra-light UI assets" },
  { slug: "20kb", label: "20 KB", sizeKB: 20, purpose: "email thumbnails and lightweight blog images" },
  { slug: "50kb", label: "50 KB", sizeKB: 50, purpose: "fast-loading blog posts and documentation screenshots" },
  { slug: "100kb", label: "100 KB", sizeKB: 100, purpose: "landing pages and social previews with decent detail" },
  { slug: "200kb", label: "200 KB", sizeKB: 200, purpose: "portfolio images with more texture and clarity" },
  { slug: "300kb", label: "300 KB", sizeKB: 300, purpose: "product images that need higher fidelity" },
  { slug: "500kb", label: "500 KB", sizeKB: 500, purpose: "hero images that still need to stay performant" },
  { slug: "1mb", label: "1 MB", sizeKB: 1024, purpose: "large visuals where detail matters" },
  { slug: "2mb", label: "2 MB", sizeKB: 2048, purpose: "high-quality marketing or print-ready previews" },
];

export function generateStaticParams() {
  return SIZE_ENTRIES.map((entry) => ({ size: entry.slug }));
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ size: string }>;
}) => {
  const { size } = await params;
  const entry = SIZE_ENTRIES.find((item) => item.slug === size);
  if (!entry) return {};
  return {
    title: `Compress Image to ${entry.label} (Free Online Tool)`,
    description: `Compress images to ${entry.label} for ${entry.purpose}. Fast, secure, and browser-friendly.`,
  };
};

export default async function Page({
  params,
}: {
  params: Promise<{ size: string }>;
}) {
  const { size } = await params;
  const entry = SIZE_ENTRIES.find((item) => item.slug === size);
  if (!entry) notFound();

  const otherSizes = SIZE_ENTRIES.filter((item) => item.slug !== entry.slug);

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
        { q: "Will it be exactly the target size?", a: "Compression aims for the target size, but exact results can vary by content and format." },
        { q: "Is my file uploaded?", a: "No. We process the image server-side only for compression and return the result." },
        { q: "What image formats are supported?", a: "JPG, PNG, and WebP are supported for target-size compression." }
      ]}
      relatedTools={[
        { name: "Compress Image", path: "/compress-image" },
        { name: "Resize Image", path: "/resize-image" }
      ]}
    >
      <div className="space-y-12">
        <TargetCompressClient targetSizeKB={entry.sizeKB} targetLabel={entry.label} />

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
