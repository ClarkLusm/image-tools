import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Layers, ShieldCheck, Zap, ArrowRight, Gauge, Repeat } from "lucide-react";
import Hero from "./components/home/hero";
import BreadcrumbsJsonLd from "./components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";
import { tools } from "./components/home/_tools";
import { COMPRESS_SIZE_ENTRIES, type CompressSizeEntry } from "@/lib/seo";

export const metadata: Metadata = {
  title: "ImageTools: Compress, Convert, Resize, Crop Images Online",
  description:
    "Free online image tools to compress, convert, resize, crop, and optimize images. Fast processing, practical presets, and privacy-first workflows.",
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    title: "ImageTools: Compress, Convert, Resize, Crop Images Online",
    description:
      "Use one toolkit for compression, conversion, resizing, and cropping. Built for speed and practical image workflows.",
    url: `${SITE_URL}/`,
  },
};

const features = [
  {
    title: "Lightning Fast",
    description:
      "Processing is optimized for speed with browser-side or server-side pipelines based on the tool.",
    icon: Zap,
  },
  {
    title: "Privacy First",
    description:
      "Your files are used only for processing and are not kept as permanent storage.",
    icon: ShieldCheck,
  },
  {
    title: "High Quality",
    description:
      "Advanced algorithms ensure you get the best possible output quality.",
    icon: Layers,
  },
];

const popularSizes = ["50kb", "100kb", "200kb", "500kb"]
  .map((slug) => COMPRESS_SIZE_ENTRIES.find((entry) => entry.slug === slug))
  .filter((entry): entry is CompressSizeEntry => entry !== undefined);

const faqItems = [
  {
    q: "Can I use these image tools for free?",
    a: "Yes. You can compress, convert, resize, and crop images without creating an account.",
  },
  {
    q: "Which tool should I start with for website speed?",
    a: "Start with Compress Image and then convert to WebP if your target platform supports it.",
  },
  {
    q: "How do I prepare images for social media?",
    a: "Use the Social Resize pages for Instagram, TikTok, YouTube, or Facebook presets.",
  },
  {
    q: "Can I target a specific file size like 100 KB?",
    a: "Yes. Open any compress-by-size page such as Compress Image to 100 KB.",
  },
];

export default function Home() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ImageTools Tool List",
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.title,
      url: `${SITE_URL}${tool.path}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbsJsonLd
        scriptId="breadcrumbs-home"
        items={[{ name: "Home", url: `${SITE_URL}/` }]}
      />
      <Script
        id="home-tool-item-list"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Script
        id="home-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative pt-14 pb-14 overflow-hidden border-b border-border">
        {/* Decorative Background */}
        <div className="absolute inset-0 z-0 bg-background">
          <Image
            src="/images/background.png"
            alt="Abstract background"
            fill
            priority
            sizes="100vw"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-foreground mb-4">
              ImageTools for Compression, Conversion, Resizing, and Cropping
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose the exact image workflow you need: compress for performance,
              convert formats, resize for social media, or crop with precision.
              Fast, practical, and privacy-first.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/compress-image"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-95 transition-opacity"
              >
                Start with Compress
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/convert-to-webp"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card text-foreground font-semibold hover:bg-secondary transition-colors"
              >
                Convert to WebP
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Grid Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              Explore Our Tools
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Open a tool directly based on your goal.
            </p>
          </div>

          <Hero />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            <article className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-primary mb-3">
                <Gauge className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Compress by Size</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Target file-size limits like 50 KB, 100 KB, or 200 KB.
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSizes.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/compress-image-to/${item.slug}`}
                    className="px-3 py-1.5 rounded-full text-sm border border-border hover:bg-secondary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-primary mb-3">
                <Repeat className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Convert Formats</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Convert between PNG, JPG, and WebP for compatibility and speed.
              </p>
              <div className="space-y-2 text-sm">
                <Link href="/convert-to-jpg" className="block hover:text-primary transition-colors">
                  Convert to JPG
                </Link>
                <Link href="/convert-to-png" className="block hover:text-primary transition-colors">
                  Convert to PNG
                </Link>
                <Link href="/convert-to-webp" className="block hover:text-primary transition-colors">
                  Convert to WebP
                </Link>
              </div>
            </article>

            <article className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-primary mb-3">
                <Layers className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Social Presets</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Resize for popular platforms with ready dimensions.
              </p>
              <div className="space-y-2 text-sm">
                <Link href="/resize-instagram" className="block hover:text-primary transition-colors">
                  Resize for Instagram
                </Link>
                <Link href="/resize-tiktok" className="block hover:text-primary transition-colors">
                  Resize for TikTok
                </Link>
                <Link href="/resize-youtube" className="block hover:text-primary transition-colors">
                  Resize for YouTube
                </Link>
                <Link href="/resize-facebook" className="block hover:text-primary transition-colors">
                  Resize for Facebook
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-10">
            Why Use ImageTools
          </h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/20 border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-4">
            {faqItems.map((item) => (
              <article key={item.q} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
