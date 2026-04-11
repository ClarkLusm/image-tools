import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  AppWindow,
  ArrowRight,
  Camera,
  FileImage,
  ScanSearch,
  Scissors,
  Signature,
  VectorSquare,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { ToolLayout } from "@/app/components/layout/tool-layout";
import FormatConvertClient from "@/app/components/tools/format-convert-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { SITE_URL } from "@/lib/site";
import { createPageMetadata } from "@/app/lib/metadata";
import { getConvertToSvgContent } from "./content";

type VisualCard = {
  icon: LucideIcon;
  iconClassName: string;
  panelClassName: string;
};

const cardVisuals: VisualCard[] = [
  {
    icon: VectorSquare,
    iconClassName: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
    panelClassName: "bg-gradient-to-br from-sky-50/70 via-white to-white",
  },
  {
    icon: AppWindow,
    iconClassName: "bg-violet-50 text-violet-700 ring-1 ring-violet-100",
    panelClassName: "bg-gradient-to-br from-violet-50/70 via-white to-white",
  },
  {
    icon: Signature,
    iconClassName: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
    panelClassName: "bg-gradient-to-br from-emerald-50/70 via-white to-white",
  },
  {
    icon: Camera,
    iconClassName: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
    panelClassName: "bg-gradient-to-br from-amber-50/70 via-white to-white",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getConvertToSvgContent(locale);

  return createPageMetadata({
    locale,
    path: "/convert-to-svg",
    title: content.metaTitle,
    description: content.metaDescription,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getConvertToSvgContent(locale);

  return (
    <ToolLayout
      locale={locale}
      title={content.title}
      description={content.description}
      schemaPath="/convert-to-svg"
      steps={content.steps}
      faqs={content.faqs}
      relatedTools={[
        { name: "Convert to PNG", path: "/convert-to-png" },
        { name: "Remove Background", path: "/remove-background" },
        { name: "Crop Image", path: "/crop-image" },
        { name: "Compress Image", path: "/compress-image" },
      ]}
    >
      <div className="space-y-12">
        <BreadcrumbsJsonLd
          scriptId="breadcrumbs-convert-to-svg"
          items={[
            { name: content.breadcrumbs.home, url: `${SITE_URL}/` },
            {
              name: content.breadcrumbs.current,
              url: `${SITE_URL}/convert-to-svg`,
            },
          ]}
        />

        <FormatConvertClient
          task="convert-to-svg"
          accept={{
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
            "image/webp": [".webp"],
          }}
          outputExt=".svg"
          outputMime="image/svg+xml"
          showQuality={false}
          autoProcessOnSelect
        />

        <section className="overflow-hidden rounded-xl border border-primary/10 bg-gradient-to-r from-primary/[0.08] via-white to-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <div className="grid gap-0 lg:grid-cols-12 lg:items-center">
            <div className="p-6 md:p-8 lg:col-span-5">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <VectorSquare className="h-3.5 w-3.5" />
                {content.visualGuide.eyebrow}
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground md:text-3xl">
                {content.visualGuide.title}
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                {content.visualGuide.description}
              </p>
            </div>

            <div className="relative min-h-[280px] border-t border-primary/10 bg-white lg:col-span-7 lg:min-h-[360px] lg:border-t-0 lg:border-l">
              <Image
                src="/images/hero-raster-to-svg.webp"
                alt={content.imageAlts.hero}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {content.cards.map((card, index) => {
            const visual = cardVisuals[index % cardVisuals.length];
            const CardIcon = visual.icon;

            return (
              <article
                key={card.title}
                className={`rounded-2xl border border-border/80 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.04)] transition-transform hover:-translate-y-1 ${visual.panelClassName}`}
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${visual.iconClassName}`}
                >
                  <CardIcon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {card.description}
                </p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-8">
          <article className="overflow-hidden rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50/70 via-white to-white shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
            <div className="grid gap-0 lg:grid-cols-12 lg:items-stretch">
              <div className="p-6 md:p-8 lg:col-span-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                  <Wand2 className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {content.sectionA.title}
                </h2>
                {content.sectionA.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 leading-7 text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="relative min-h-[260px] border-t border-sky-100 bg-white lg:col-span-6 lg:min-h-[100%] lg:border-t-0 lg:border-l">
                <Image
                  src="/images/svg-use-cases.webp"
                  alt={content.imageAlts.useCases}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/70 via-white to-white shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
            <div className="grid gap-0 lg:grid-cols-12 lg:items-stretch">
              <div className="relative order-2 min-h-[260px] border-t border-emerald-100 bg-white lg:order-1 lg:col-span-6 lg:min-h-[100%] lg:border-t-0 lg:border-r">
                <Image
                  src="/images/raster-vs-vector-zoom.webp"
                  alt={content.imageAlts.comparison}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="order-1 p-6 md:p-8 lg:order-2 lg:col-span-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                  <ScanSearch className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {content.sectionB.title}
                </h2>
                {content.sectionB.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 leading-7 text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>
        </section>

        <section className="rounded-xl border border-primary/10 bg-gradient-to-r from-primary/[0.08] via-white to-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="text-2xl font-display font-bold text-foreground">
                {content.ctas.title}
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
                {content.ctas.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
              <Link
                href={content.ctas.primaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(37,99,235,0.24)] transition-transform hover:-translate-y-0.5"
              >
                <Scissors className="h-4 w-4" />
                {content.ctas.primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={content.ctas.secondaryHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <FileImage className="h-4 w-4" />
                {content.ctas.secondaryLabel}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </ToolLayout>
  );
}
