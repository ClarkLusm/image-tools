import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  Layers,
  ShieldCheck,
  Zap,
  ArrowRight,
  Gauge,
  Repeat,
  CheckCircle2,
  ChevronDown,
  Crop,
  FileImage,
  Scissors,
  Smartphone,
  Sparkles,
  Video,
} from "lucide-react";
import Hero from "./components/home/hero";
import BeforeAfterSlider from "./components/home/before-after-slider";
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
    a: "Yes. ImageTools lets you compress images, convert image formats, resize photos, crop pictures, and prepare visuals for the web without creating an account. The homepage is designed to help you jump directly into practical workflows such as image optimization, social media resizing, and background cleanup with simple browser-based steps.",
  },
  {
    q: "Which tool should I start with for website speed?",
    a: "If your goal is faster page speed, start with Compress Image to reduce file size, then move to Convert to WebP when your website or CMS supports that format. In most publishing workflows, the best result comes from combining compression, format conversion, and correct image dimensions so you are not uploading oversized files to begin with.",
  },
  {
    q: "How do I prepare images for social media?",
    a: "Use the Social Resize tools when you need platform-ready image sizes for Instagram, TikTok, YouTube, or Facebook. These preset pages are useful when you want faster social media image preparation, more consistent layouts across channels, and fewer manual adjustments before posting campaign graphics, thumbnails, or promotional images.",
  },
  {
    q: "Can I target a specific file size like 100 KB?",
    a: "Yes. You can use a dedicated compress-by-size page such as Compress Image to 100 KB when you need to meet upload limits for forms, job portals, marketplaces, or email attachments. This is especially useful when you need online image compression with a specific target size instead of only choosing a general quality setting.",
  },
];

const seoSections = [
  {
    eyebrow: "Compression & Conversion",
    title: "Prepare lighter images without slowing down your workflow.",
    description:
      "Use ImageTools to compress large files, switch between PNG, JPG, and WebP, and keep image dimensions aligned with the page or platform where they will be published.",
    bullets: [
      "Reduce upload size for websites and email.",
      "Convert formats for speed or compatibility.",
      "Keep output practical for real publishing tasks.",
    ],
    ctaLabel: "Open Compress Image",
    ctaHref: "/compress-image",
    visual: "compress",
  },
  {
    eyebrow: "Social Resize",
    title: "Create platform-ready visuals for every channel faster.",
    description:
      "Instead of guessing aspect ratios, you can jump into preset resize flows for Instagram, TikTok, YouTube, and Facebook, then export images that fit each platform more cleanly.",
    bullets: [
      "Skip manual canvas calculations.",
      "Keep social graphics consistent across channels.",
      "Work from presets built for common content formats.",
    ],
    ctaLabel: "See Social Presets",
    ctaHref: "/resize-instagram",
    visual: "social",
  },
  {
    eyebrow: "Privacy & Cleanup",
    title: "Remove distractions before you publish or share.",
    description:
      "For many teams, image editing is not about effects. It is about removing background clutter, trimming the frame, and stripping metadata so files are cleaner and safer to distribute.",
    bullets: [
      "Remove EXIF details before sharing files.",
      "Crop to the exact focal area you need.",
      "Create cleaner cutouts for ecommerce or design use.",
    ],
    ctaLabel: "Try Remove Background",
    ctaHref: "/remove-background",
    visual: "cleanup",
  },
  {
    eyebrow: "Quality Boost",
    title: "Upscale older assets when you need a sharper presentation.",
    description:
      "Low-resolution files are common in reused marketing assets, profile photos, and downloaded graphics. Upscale Image gives you a faster route to cleaner presentation when the source is too small for a new layout.",
    bullets: [
      "Improve clarity for reused visual assets.",
      "Prepare small source files for larger surfaces.",
      "Combine upscale with crop and compression when needed.",
    ],
    ctaLabel: "Open Upscale Image",
    ctaHref: "/upscale-image",
    visual: "upscale",
  },
];

function SeoVisual({ visual }: { visual: (typeof seoSections)[number]["visual"] }) {
  if (visual === "compress") {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_55%,#e0f2fe_100%)] p-6">
        <div className="grid h-full gap-4 md:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                  Compress image
                </p>
                <h4 className="mt-2 text-lg font-semibold text-slate-900">
                  Export a smaller file
                </h4>
              </div>
              <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
                <Gauge className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Original</span>
                  <span>4.8 MB</span>
                </div>
                <div className="mt-3 h-3 rounded-full bg-slate-200">
                  <div className="h-3 w-full rounded-full bg-slate-500" />
                </div>
              </div>
              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                <div className="flex items-center justify-between text-sm text-sky-800">
                  <span>Compressed</span>
                  <span>860 KB</span>
                </div>
                <div className="mt-3 h-3 rounded-full bg-sky-100">
                  <div className="h-3 w-1/3 rounded-full bg-sky-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                  <FileImage className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Format</p>
                  <p className="text-xs text-slate-500">PNG -&gt; WebP</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
                  <Repeat className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Workflow</p>
                  <p className="text-xs text-slate-500">Compress, convert, publish</p>
                </div>
              </div>
            </div>
            <div className="mt-auto rounded-3xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
              Smaller files for faster delivery
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visual === "social") {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#f8fafc_0%,#eef2ff_45%,#e0f2fe_100%)] p-6">
        <div className="grid h-full gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
              Social resize
            </p>
            <h4 className="mt-2 text-lg font-semibold text-slate-900">
              Presets by platform
            </h4>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                { label: "Instagram", icon: FileImage, accent: "bg-pink-100 text-pink-700", size: "1080x1350" },
                { label: "TikTok", icon: Smartphone, accent: "bg-sky-100 text-sky-700", size: "1080x1920" },
                { label: "YouTube", icon: Video, accent: "bg-red-100 text-red-700", size: "1280x720" },
                { label: "Facebook", icon: Layers, accent: "bg-blue-100 text-blue-700", size: "1200x630" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className={`inline-flex rounded-2xl p-2 ${item.accent}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-900">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.size}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="h-full w-1/2 rounded-[24px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <div className="mx-auto aspect-[4/5] w-full max-w-[120px] rounded-[22px] bg-gradient-to-b from-pink-200 via-white to-pink-100" />
                <p className="mt-3 text-center text-xs font-medium text-slate-600">Story</p>
              </div>
              <div className="h-full w-1/2 rounded-[24px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <div className="mx-auto aspect-square w-full max-w-[120px] rounded-[22px] bg-gradient-to-br from-sky-200 via-white to-violet-100" />
                <p className="mt-3 text-center text-xs font-medium text-slate-600">Square Post</p>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
              Ready sizes for multi-channel publishing
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (visual === "cleanup") {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_55%,#ecfeff_100%)] p-6">
        <div className="grid h-full gap-4 md:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-gradient-to-br from-slate-200 via-slate-100 to-white">
              <div className="absolute inset-x-[18%] top-[10%] h-[72%] rounded-[26px] bg-gradient-to-b from-slate-900 to-slate-700" />
              <div className="absolute inset-x-[28%] top-[18%] h-[20%] rounded-full bg-amber-200/80 blur-2xl" />
              <div className="absolute inset-5 rounded-[20px] border-2 border-dashed border-sky-400/80" />
              <div className="absolute bottom-4 right-4 rounded-full bg-white p-2 text-sky-700 shadow-md">
                <Crop className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-cyan-100 p-3 text-cyan-700">
                  <Scissors className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Background cleanup</p>
                  <p className="text-xs text-slate-500">Cleaner product and profile visuals</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Metadata removal</p>
                  <p className="text-xs text-slate-500">Strip EXIF details before sharing</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
              Crop, clean, and share safer files
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_55%,#f5f3ff_100%)] p-6">
      <div className="grid h-full gap-4 md:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
                AI Upscale
              </p>
              <h4 className="mt-2 text-lg font-semibold text-slate-900">
                Improve low-resolution assets
              </h4>
            </div>
            <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-[22px] border border-slate-200 bg-slate-100 p-3">
              <div className="aspect-[4/5] rounded-[18px] bg-gradient-to-br from-slate-300 to-slate-100 blur-[0.5px]" />
              <p className="mt-3 text-center text-xs font-medium text-slate-500">Before</p>
            </div>
            <div className="rounded-[22px] border border-sky-200 bg-sky-50 p-3">
              <div className="aspect-[4/5] rounded-[18px] bg-gradient-to-br from-sky-300 via-white to-violet-200" />
              <p className="mt-3 text-center text-xs font-medium text-sky-700">After</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold text-slate-900">Sharper output</p>
            <div className="mt-3 h-2 rounded-full bg-slate-200">
              <div className="h-2 w-4/5 rounded-full bg-violet-500" />
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold text-slate-900">Better presentation</p>
            <p className="mt-2 text-xs text-slate-500">
              Useful for reused banners, profile images, and small graphics.
            </p>
          </div>
          <div className="mt-auto rounded-3xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
            Give older assets a cleaner second life
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <section className="relative pt-14 pb-14 overflow-hidden">
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
      <section className="relative overflow-hidden py-16">
        <div className="container relative z-10 mx-auto px-4">
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

      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#eff6ff_0%,#ffffff_45%,#f8fafc_100%)]" />
        <div className="absolute right-[-5rem] top-10 h-72 w-72 rounded-full bg-violet-100/60 blur-3xl" />
        <div className="absolute left-[-4rem] bottom-0 h-64 w-64 rounded-full bg-sky-100/60 blur-3xl" />

        <div className="container relative z-10 mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="rounded-3xl border border-border bg-white p-3 shadow-xl shadow-black/[0.06]">
              <BeforeAfterSlider
                imageSrc="/images/demo-portrait.jpg"
                alt="Portrait comparison before and after optimization"
              />
            </div>

            <div>
              <span className="inline-flex items-center rounded-full bg-sky-100 text-sky-700 px-3 py-1 text-xs font-semibold tracking-wide">
                SMART PROCESSING
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold tracking-tight">
                Professional-quality results without complicated workflows.
              </h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                From compression and format conversion to background removal,
                ImageTools helps you optimize visuals in seconds with practical
                controls and clean output.
              </p>

              <ul className="mt-6 space-y-3 text-base">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <span>Size optimization for faster page loading.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <span>Batch processing support for multiple images.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <span>
                    Built for real tasks: web publishing, social media, and
                    content ops.
                  </span>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/remove-background"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-95 transition-opacity"
                >
                  Try Remove Background
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/compress-image"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card text-foreground font-semibold hover:bg-secondary transition-colors"
                >
                  Compress Images
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16">
        <div className="container relative z-10 mx-auto max-w-6xl px-4">
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
                Convert between PNG, JPG, JPEG, and WebP for compatibility and speed.
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
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f9fafb_100%)]" />
        <div className="absolute -right-12 top-12 h-72 w-72 rounded-full bg-amber-100/50 blur-3xl" />
        <div className="absolute -left-12 bottom-0 h-60 w-60 rounded-full bg-blue-100/50 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
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

      <section className="relative overflow-hidden py-16">

        <div className="container relative z-10 mx-auto max-w-5xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Online Image Tools for Faster, Cleaner Publishing
            </h2>
            <p className="mt-3 text-muted-foreground max-w-3xl mx-auto">
              A quick overview of the main workflows people use most often on
              ImageTools.
            </p>
          </div>

          <div className="space-y-8">
            {seoSections.map((section, index) => (
              <article
                key={section.title}
                className="bg-card p-0 md:p-8"
              >
                <div className="grid items-center gap-8 lg:grid-cols-2">
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
                      {section.eyebrow}
                    </span>
                    <h3 className="mt-4 text-2xl font-semibold text-foreground">
                      {section.title}
                    </h3>
                    <p className="mt-4 text-sm md:text-base leading-7 text-muted-foreground">
                      {section.description}
                    </p>
                    <ul className="mt-5 space-y-3">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={section.ctaHref}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                      {section.ctaLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <SeoVisual visual={section.visual} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]" />
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-sky-100/50 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-violet-100/50 blur-3xl" />

        <div className="container relative z-10 mx-auto max-w-5xl px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {faqItems.map((item, index) => (
              <details
                key={item.q}
                open={index === 0}
                className="group overflow-hidden rounded-2xl border border-border bg-white shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-7 py-6 text-left marker:content-none">
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.q}
                  </h3>
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="border-t border-border/70 px-7 py-6">
                  <p className="leading-8 text-muted-foreground">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
