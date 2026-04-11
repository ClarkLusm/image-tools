import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import {
  Layers,
  ShieldCheck,
  Zap,
  ArrowRight,
  Gauge,
  Repeat,
  CheckCircle2,
  Crop,
  FileImage,
  Scissors,
  Smartphone,
  Sparkles,
  Video,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import Hero from "@/app/components/home/hero";
import BeforeAfterSlider from "@/app/components/home/before-after-slider";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { FAQAccordion } from "@/app/components/shared/faq-accordion";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { tools } from "@/app/components/home/_tools";
import { COMPRESS_SIZE_ENTRIES, type CompressSizeEntry } from "@/lib/seo";
import {
  createPageMetadata,
  resolveSupportedLanguage,
} from "@/app/lib/metadata";
import {
  createMessageTranslator,
  getNamespaceMessages,
} from "@/app/lib/namespace-messages";

type TranslationFn = (
  key: string,
  values?: Record<string, string | number>,
) => string;

const features = [
  { key: "lightningFast", icon: Zap },
  { key: "privacyFirst", icon: ShieldCheck },
  { key: "highQuality", icon: Layers },
] as const;

const faqKeys = [
  "free",
  "websiteSpeed",
  "socialMedia",
  "specificFileSize",
] as const;

const seoSections = [
  {
    key: "compressionConversion",
    ctaHref: "/compress-image",
    visual: "compress",
  },
  {
    key: "socialResize",
    ctaHref: "/resize-instagram",
    visual: "social",
  },
  {
    key: "privacyCleanup",
    ctaHref: "/remove-background",
    visual: "cleanup",
  },
  {
    key: "qualityBoost",
    ctaHref: "/upscale-image",
    visual: "upscale",
  },
] as const;

type SeoVisualKey = (typeof seoSections)[number]["visual"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return createPageMetadata({
    locale,
    path: "/",
    title: {
      en: `${SITE_NAME}: Free Image Compressor, Resizer, Converter, and Crop Tool`,
      vi: `${SITE_NAME}: Công cụ nén, resize, chuyển đổi và crop ảnh miễn phí`,
      de: `${SITE_NAME}: Kostenloses Bildtool für Komprimierung, Größenänderung, Konvertierung und Zuschnitt`,
    },
    description: {
      en: "Free online image tools to compress images, resize photos, convert JPG PNG WebP files, crop pictures, remove backgrounds, and upscale images with practical privacy-first workflows.",
      vi: "Bộ công cụ ảnh online miễn phí để nén ảnh, resize ảnh, chuyển đổi JPG PNG WebP, crop ảnh, xóa nền và upscale ảnh với workflow thực tế và ưu tiên quyền riêng tư.",
      de: "Kostenlose Online-Bildtools zum Komprimieren, Skalieren, Konvertieren, Zuschneiden, Hintergrundentfernen und Hochskalieren mit praktischen, datenschutzfreundlichen Workflows.",
    },
    openGraphDescription: {
      en: "Use one toolkit for image compression, format conversion, resizing, cropping, background removal, and AI upscale workflows.",
      vi: "Dùng một bộ công cụ duy nhất cho nén ảnh, chuyển đổi định dạng, resize, crop, xóa nền và workflow upscale bằng AI.",
      de: "Nutze ein Toolkit für Bildkomprimierung, Formatkonvertierung, Größenänderung, Zuschnitt, Hintergrundentfernung und KI-Upscaling.",
    },
  });
}

const popularSizes = ["50kb", "100kb", "200kb", "500kb"]
  .map((slug) => COMPRESS_SIZE_ENTRIES.find((entry) => entry.slug === slug))
  .filter((entry): entry is CompressSizeEntry => entry !== undefined);

function getSeoVisualCopy(t: TranslationFn, visual: SeoVisualKey) {
  if (visual === "compress") {
    return {
      eyebrow: t("visuals.compress.eyebrow"),
      title: t("visuals.compress.title"),
      original: t("visuals.compress.original"),
      compressed: t("visuals.compress.compressed"),
      formatLabel: t("visuals.compress.formatLabel"),
      formatValue: t("visuals.compress.formatValue"),
      workflowLabel: t("visuals.compress.workflowLabel"),
      workflowValue: t("visuals.compress.workflowValue"),
      footer: t("visuals.compress.footer"),
    };
  }

  if (visual === "social") {
    return {
      eyebrow: t("visuals.social.eyebrow"),
      title: t("visuals.social.title"),
      story: t("visuals.social.story"),
      squarePost: t("visuals.social.squarePost"),
      footer: t("visuals.social.footer"),
    };
  }

  if (visual === "cleanup") {
    return {
      backgroundCleanup: t("visuals.cleanup.backgroundCleanup"),
      backgroundDescription: t("visuals.cleanup.backgroundDescription"),
      metadataRemoval: t("visuals.cleanup.metadataRemoval"),
      metadataDescription: t("visuals.cleanup.metadataDescription"),
      footer: t("visuals.cleanup.footer"),
    };
  }

  return {
    eyebrow: t("visuals.upscale.eyebrow"),
    title: t("visuals.upscale.title"),
    before: t("visuals.upscale.before"),
    after: t("visuals.upscale.after"),
    sharperOutput: t("visuals.upscale.sharperOutput"),
    betterPresentation: t("visuals.upscale.betterPresentation"),
    betterPresentationDescription: t(
      "visuals.upscale.betterPresentationDescription",
    ),
    footer: t("visuals.upscale.footer"),
  };
}

function SeoVisual({
  visual,
  copy,
}: {
  visual: SeoVisualKey;
  copy: Record<string, string | undefined>;
}) {
  if (visual === "compress") {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_55%,#e0f2fe_100%)] p-6">
        <div className="grid h-full gap-4 md:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                  {copy.eyebrow}
                </p>
                <h4 className="mt-2 text-lg font-semibold text-slate-900">
                  {copy.title}
                </h4>
              </div>
              <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
                <Gauge className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>{copy.original}</span>
                  <span>4.8 MB</span>
                </div>
                <div className="mt-3 h-3 rounded-full bg-slate-200">
                  <div className="h-3 w-full rounded-full bg-slate-500" />
                </div>
              </div>
              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                <div className="flex items-center justify-between text-sm text-sky-800">
                  <span>{copy.compressed}</span>
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
                  <p className="text-sm font-semibold text-slate-900">
                    {copy.formatLabel}
                  </p>
                  <p className="text-xs text-slate-500">{copy.formatValue}</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
                  <Repeat className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {copy.workflowLabel}
                  </p>
                  <p className="text-xs text-slate-500">{copy.workflowValue}</p>
                </div>
              </div>
            </div>
            <div className="mt-auto rounded-3xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
              {copy.footer}
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
              {copy.eyebrow}
            </p>
            <h4 className="mt-2 text-lg font-semibold text-slate-900">
              {copy.title}
            </h4>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                {
                  label: "Instagram",
                  icon: FileImage,
                  accent: "bg-pink-100 text-pink-700",
                  size: "1080x1350",
                },
                {
                  label: "TikTok",
                  icon: Smartphone,
                  accent: "bg-sky-100 text-sky-700",
                  size: "1080x1920",
                },
                {
                  label: "YouTube",
                  icon: Video,
                  accent: "bg-red-100 text-red-700",
                  size: "1280x720",
                },
                {
                  label: "Facebook",
                  icon: Layers,
                  accent: "bg-blue-100 text-blue-700",
                  size: "1200x630",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-3"
                >
                  <div className={`inline-flex rounded-2xl p-2 ${item.accent}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-900">
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-500">{item.size}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="h-full w-1/2 rounded-[24px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <div className="mx-auto aspect-[4/5] w-full max-w-[120px] rounded-[22px] bg-gradient-to-b from-pink-200 via-white to-pink-100" />
                <p className="mt-3 text-center text-xs font-medium text-slate-600">
                  {copy.story}
                </p>
              </div>
              <div className="h-full w-1/2 rounded-[24px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <div className="mx-auto aspect-square w-full max-w-[120px] rounded-[22px] bg-gradient-to-br from-sky-200 via-white to-violet-100" />
                <p className="mt-3 text-center text-xs font-medium text-slate-600">
                  {copy.squarePost}
                </p>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
              {copy.footer}
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
                  <p className="text-sm font-semibold text-slate-900">
                    {copy.backgroundCleanup}
                  </p>
                  <p className="text-xs text-slate-500">
                    {copy.backgroundDescription}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {copy.metadataRemoval}
                  </p>
                  <p className="text-xs text-slate-500">
                    {copy.metadataDescription}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
              {copy.footer}
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
                {copy.eyebrow}
              </p>
              <h4 className="mt-2 text-lg font-semibold text-slate-900">
                {copy.title}
              </h4>
            </div>
            <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="rounded-[22px] border border-slate-200 bg-slate-100 p-3">
              <div className="aspect-[4/5] rounded-[18px] bg-gradient-to-br from-slate-300 to-slate-100 blur-[0.5px]" />
              <p className="mt-3 text-center text-xs font-medium text-slate-500">
                {copy.before}
              </p>
            </div>
            <div className="rounded-[22px] border border-sky-200 bg-sky-50 p-3">
              <div className="aspect-[4/5] rounded-[18px] bg-gradient-to-br from-sky-300 via-white to-violet-200" />
              <p className="mt-3 text-center text-xs font-medium text-sky-700">
                {copy.after}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold text-slate-900">
              {copy.sharperOutput}
            </p>
            <div className="mt-3 h-2 rounded-full bg-slate-200">
              <div className="h-2 w-4/5 rounded-full bg-violet-500" />
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold text-slate-900">
              {copy.betterPresentation}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              {copy.betterPresentationDescription}
            </p>
          </div>
          <div className="mt-auto rounded-3xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
            {copy.footer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const languageCode = resolveSupportedLanguage(locale);
  const tHome = createMessageTranslator(
    await getNamespaceMessages(languageCode, "home"),
  );
  const tCommon = createMessageTranslator(
    await getNamespaceMessages(languageCode, "common"),
  );
  const withSiteName = { siteName: SITE_NAME };

  const localizedToolCards = tools.map((tool) => ({
    ...tool,
    title: tHome(`toolCards.${tool.translationKey}.title`),
    description: tHome(`toolCards.${tool.translationKey}.description`),
  }));

  const localizedFeatures = features.map((feature) => ({
    ...feature,
    title: tHome(`features.items.${feature.key}.title`),
    description: tHome(`features.items.${feature.key}.description`),
  }));

  const localizedFaqItems = faqKeys.map((key) => ({
    q: tHome(`faq.items.${key}.question`),
    a: tHome(`faq.items.${key}.answer`, withSiteName),
  }));

  const localizedSeoSections = seoSections.map((section) => ({
    ...section,
    eyebrow: tHome(`seoSections.${section.key}.eyebrow`),
    title: tHome(`seoSections.${section.key}.title`),
    description: tHome(`seoSections.${section.key}.description`, withSiteName),
    bullets: [
      tHome(`seoSections.${section.key}.bullets.${section.key === "compressionConversion" ? "websitesAndEmail" : section.key === "socialResize" ? "skipCanvas" : section.key === "privacyCleanup" ? "removeExif" : "improveClarity"}`),
      tHome(`seoSections.${section.key}.bullets.${section.key === "compressionConversion" ? "speedOrCompatibility" : section.key === "socialResize" ? "consistentGraphics" : section.key === "privacyCleanup" ? "cropFocalArea" : "prepareSmallFiles"}`),
      tHome(`seoSections.${section.key}.bullets.${section.key === "compressionConversion" ? "realPublishing" : section.key === "socialResize" ? "commonFormats" : section.key === "privacyCleanup" ? "cleanerCutouts" : "combineWorkflow"}`),
    ],
    ctaLabel: tHome(`seoSections.${section.key}.cta`),
    visualCopy: getSeoVisualCopy(tHome, section.visual),
  }));

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} Tool List`,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tHome(`toolCards.${tool.translationKey}.title`),
      url: `${SITE_URL}${tool.path}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: localizedFaqItems.map((item) => ({
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
        items={[{ name: tCommon("breadcrumbs.home"), url: `${SITE_URL}/` }]}
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

      <section className="relative pt-14 pb-14 overflow-hidden">
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
            <h1 className="page-title-gradient mb-4 text-3xl font-display font-extrabold tracking-tight md:text-5xl">
              {tHome("hero.title", withSiteName)}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {tHome("hero.introLead")}{" "}
              <Link
                href="/compress-image"
                className="font-medium text-primary hover:text-primary/80"
              >
                {tHome("hero.compressImages")}
              </Link>{" "}
              {tHome("hero.forPerformance")}{" "}
              <Link
                href="/convert-to-webp"
                className="font-medium text-primary hover:text-primary/80"
              >
                {tHome("hero.convertFormats")}
              </Link>
              {", "}{" "}
              <Link
                href="/resize-image"
                className="font-medium text-primary hover:text-primary/80"
              >
                {tHome("hero.resizePhotos")}
              </Link>{" "}
              {tHome("hero.forSocialMediaOr")}{" "}
              <Link
                href="/crop-image"
                className="font-medium text-primary hover:text-primary/80"
              >
                {tHome("hero.cropPictures")}
              </Link>{" "}
              {tHome("hero.introTail")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/compress-image"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-95 transition-opacity"
              >
                {tHome("hero.primaryCta")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/convert-to-webp"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card text-foreground font-semibold hover:bg-secondary transition-colors"
              >
                {tHome("hero.secondaryCta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16">
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              {tHome("toolGrid.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {tHome("toolGrid.description")}
            </p>
          </div>

          <Hero
            cards={localizedToolCards}
            tryNowLabel={tHome("toolGrid.tryNow")}
          />
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
                {tHome("spotlight.eyebrow")}
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-display font-bold tracking-tight">
                {tHome("spotlight.title")}
              </h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                {tHome("spotlight.from")}{" "}
                <Link
                  href="/compress-image"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  {tHome("spotlight.imageCompression")}
                </Link>{" "}
                {tHome("spotlight.and")}{" "}
                <Link
                  href="/convert-to-webp"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  {tHome("spotlight.formatConversion")}
                </Link>{" "}
                {tHome("spotlight.to")}{" "}
                <Link
                  href="/remove-background"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  {tHome("spotlight.backgroundRemoval")}
                </Link>
                {tHome("spotlight.descriptionTail", withSiteName)}
              </p>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {tHome("spotlight.description")}
              </p>

              <ul className="mt-6 space-y-3 text-base">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <span>{tHome("spotlight.bullets.pageSpeed")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <span>{tHome("spotlight.bullets.batchProcessing")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <span>{tHome("spotlight.bullets.realTasks")}</span>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/remove-background"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-95 transition-opacity"
                >
                  {tHome("spotlight.primaryCta")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/compress-image"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card text-foreground font-semibold hover:bg-secondary transition-colors"
                >
                  {tHome("spotlight.secondaryCta")}
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
                <h3 className="text-lg font-semibold">
                  {tHome("popular.compressBySizeTitle")}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {tHome("popular.compressBySizeDescription")}
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
                <h3 className="text-lg font-semibold">
                  {tHome("popular.convertFormatsTitle")}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {tHome("popular.convertFormatsDescription")}
              </p>
              <div className="space-y-2 text-sm">
                <Link
                  href="/convert-to-jpg"
                  className="block hover:text-primary transition-colors"
                >
                  {tCommon("navItems.convertToJpg.name")}
                </Link>
                <Link
                  href="/convert-to-png"
                  className="block hover:text-primary transition-colors"
                >
                  {tHome("toolCards.convertToPng.title")}
                </Link>
                <Link
                  href="/convert-to-webp"
                  className="block hover:text-primary transition-colors"
                >
                  {tHome("hero.secondaryCta")}
                </Link>
              </div>
            </article>

            <article className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-primary mb-3">
                <Layers className="w-5 h-5" />
                <h3 className="text-lg font-semibold">
                  {tHome("popular.socialPresetsTitle")}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {tHome("popular.socialPresetsDescription")}
              </p>
              <div className="space-y-2 text-sm">
                <Link
                  href="/resize-instagram"
                  className="block hover:text-primary transition-colors"
                >
                  {tHome("popular.resizeForInstagram")}
                </Link>
                <Link
                  href="/resize-tiktok"
                  className="block hover:text-primary transition-colors"
                >
                  {tHome("popular.resizeForTiktok")}
                </Link>
                <Link
                  href="/resize-youtube"
                  className="block hover:text-primary transition-colors"
                >
                  {tHome("popular.resizeForYoutube")}
                </Link>
                <Link
                  href="/resize-facebook"
                  className="block hover:text-primary transition-colors"
                >
                  {tHome("popular.resizeForFacebook")}
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f9fafb_100%)]" />
        <div className="absolute -right-12 top-12 h-72 w-72 rounded-full bg-amber-100/50 blur-3xl" />
        <div className="absolute -left-12 bottom-0 h-60 w-60 rounded-full bg-blue-100/50 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-10">
            {tHome("features.title", withSiteName)}
          </h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {localizedFeatures.map((feature, idx) => (
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
              {tHome("overview.title")}
            </h2>
            <p className="mt-3 text-muted-foreground max-w-3xl mx-auto">
              {tHome("overview.subtitlePrefix", withSiteName)}{" "}
              <Link
                href="/compress-image"
                className="font-medium text-primary hover:text-primary/80"
              >
                {tHome("overview.freeImageCompressor")}
              </Link>{" "}
              {tHome("overview.toAn")}{" "}
              <Link
                href="/upscale-image"
                className="font-medium text-primary hover:text-primary/80"
              >
                {tHome("overview.aiImageUpscaler")}
              </Link>
              {"."}
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground max-w-3xl mx-auto md:text-base">
              {tHome("overview.description")}
            </p>
          </div>

          <div className="space-y-8">
            {localizedSeoSections.map((section, index) => (
              <article key={section.title} className="bg-card p-0 md:p-8">
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
                    <SeoVisual
                      visual={section.visual}
                      copy={section.visualCopy}
                    />
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
            {tHome("faq.title")}
          </h2>
          <FAQAccordion items={localizedFaqItems} />
        </div>
      </section>
    </div>
  );
}
