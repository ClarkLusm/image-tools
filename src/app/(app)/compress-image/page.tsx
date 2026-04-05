import { ToolLayout } from "@/app/components/layout/tool-layout";
import CompressImageClient from "./compress-image-client";
import { COMPRESS_SIZE_ENTRIES } from "@/lib/seo";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  title: "Compress Image Online",
  description:
    "Compress images online with adjustable quality and size presets. Fast, secure, and optimized for performance.",
};

export default function Page() {
  return (
    <ToolLayout
      title="Compress Images Online for Free"
      description="Compress images online for free. Reduce JPG, JPEG, PNG, and WebP file size by up to 80% without losing quality. Fast, secure, and no signup required."
      steps={[
        {
          title: "Upload",
          description: "Select heavy images you want to shrink.",
        },
        {
          title: "Set Compression",
          description:
            "Choose compression strength. Lower quality means much smaller files.",
        },
        {
          title: "Save Space",
          description:
            "Download the compressed version and save storage space.",
        },
      ]}
      faqs={[
        {
          q: "How does server-side compression work?",
          a: "We securely upload your file to our processing servers which run advanced encoding algorithms to strip unnecessary data while preserving visual fidelity.",
        },
        {
          q: "Is it safe?",
          a: "Yes, files are processed in memory and immediately discarded after compression. We do not store your images.",
        },
      ]}
      relatedTools={[
        { name: "Resize Image", path: "/resize-image" },
        { name: "Convert to JPG", path: "/convert-to-jpg" },
      ]}
    >
      <div className="space-y-12">
        <BreadcrumbsJsonLd
          scriptId="breadcrumbs-compress-image"
          items={[
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Compress Image", url: `${SITE_URL}/compress-image` },
          ]}
        />
        <CompressImageClient />

        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-3">
            Compress to a specific size
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Target a size for email attachments, upload limits, or faster
            performance.
          </p>
          <div className="flex flex-wrap gap-3">
            {COMPRESS_SIZE_ENTRIES.map((item) => (
              <a
                key={item.slug}
                href={`/compress-image-to/${item.slug}`}
                className="px-4 py-2 rounded-full border border-border bg-secondary/40 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-3">
            Compress for a specific use case
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Pick a scenario to get recommended size targets and tips.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/compress-image/for/email-attachments"
              className="px-4 py-2 rounded-full border border-border bg-secondary/40 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Email attachments
            </a>
            <a
              href="/compress-image/for/gmail"
              className="px-4 py-2 rounded-full border border-border bg-secondary/40 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Gmail
            </a>
            <a
              href="/compress-image/for/whatsapp"
              className="px-4 py-2 rounded-full border border-border bg-secondary/40 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="/compress-image/for/telegram"
              className="px-4 py-2 rounded-full border border-border bg-secondary/40 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Telegram
            </a>
            <a
              href="/compress-image/for/shopify-product"
              className="px-4 py-2 rounded-full border border-border bg-secondary/40 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Shopify product
            </a>
            <a
              href="/compress-image/for/etsy-listing"
              className="px-4 py-2 rounded-full border border-border bg-secondary/40 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Etsy listing
            </a>
            <a
              href="/compress-image/for/wordpress"
              className="px-4 py-2 rounded-full border border-border bg-secondary/40 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              WordPress
            </a>
            <a
              href="/compress-image/for/linkedin-banner"
              className="px-4 py-2 rounded-full border border-border bg-secondary/40 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              LinkedIn banner
            </a>
          </div>
        </section>
      </div>
    </ToolLayout>
  );
}
