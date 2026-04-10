import { Link } from "@/i18n/navigation";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { ToolLayout } from "@/app/components/layout/tool-layout";
import FormatConvertClient from "@/app/components/tools/format-convert-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import LinkedRichText from "@/app/components/shared/linked-rich-text";
import { SITE_URL } from "@/lib/site";

export type FormatConvertLandingPageContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  description: string;
  breadcrumbs: {
    home: string;
    current: string;
  };
  sourceLinkCta: string;
  steps: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
  relatedTools: { name: string; path: string }[];
  sourceLinks: { title: string; description: string; path: string }[];
  converter?: {
    buttonLabel?: string;
    note?: string;
  };
  quickGuide: {
    title: string;
    description: string;
  };
  highlights: { title: string; description: string }[];
  gridOne: {
    title: string;
    paragraphs: string[];
  }[];
  gridTwo: {
    title: string;
    paragraphs: string[];
  }[];
  howTo: {
    title: string;
    paragraphs: string[];
  };
  workflow: {
    title: string;
    paragraphs: string[];
  };
};

type FormatConvertLandingPageProps = {
  path: string;
  task: "convert-to-png" | "convert-to-jpg" | "convert-to-webp";
  accept: Record<string, string[]>;
  outputExt: string;
  outputMime: string;
  content: FormatConvertLandingPageContent;
  sourceIcon: LucideIcon;
  qualityDefault?: number;
  showQuality?: boolean;
  buttonLabel?: string;
  note?: string;
};

export default function FormatConvertLandingPage({
  path,
  task,
  accept,
  outputExt,
  outputMime,
  content,
  sourceIcon: SourceIcon,
  qualityDefault,
  showQuality,
  buttonLabel,
  note,
}: FormatConvertLandingPageProps) {
  return (
    <ToolLayout
      title={content.title}
      description={content.description}
      schemaPath={path}
      steps={content.steps}
      faqs={content.faqs}
      relatedTools={content.relatedTools}
    >
      <div className="space-y-10">
        <BreadcrumbsJsonLd
          scriptId={`breadcrumbs-${path.replace(/\//g, "-").replace(/^-/, "")}`}
          items={[
            { name: content.breadcrumbs.home, url: `${SITE_URL}/` },
            { name: content.breadcrumbs.current, url: `${SITE_URL}${path}` },
          ]}
        />

        <FormatConvertClient
          task={task}
          accept={accept}
          outputExt={outputExt}
          outputMime={outputMime}
          qualityDefault={qualityDefault}
          showQuality={showQuality}
          buttonLabel={buttonLabel ?? content.converter?.buttonLabel}
          note={note ?? content.converter?.note}
          autoProcessOnSelect
        />

        <section className="mt-24 space-y-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-display font-bold text-foreground">
              {content.quickGuide.title}
            </h2>
            <p className="mt-2 leading-7 text-muted-foreground">
              {content.quickGuide.description}
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {content.highlights.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border/80 bg-card p-5"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {content.sourceLinks.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <SourceIcon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <div className="flex items-center text-sm font-semibold text-primary">
                  {content.sourceLinkCta}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>

          <section className="grid gap-8 lg:grid-cols-2">
            {content.gridOne.map((section) => (
              <article
                key={section.title}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <LinkedRichText
                    key={paragraph}
                    text={paragraph}
                    className="mt-3 leading-7 text-muted-foreground"
                  />
                ))}
              </article>
            ))}
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            {content.gridTwo.map((section) => (
              <article
                key={section.title}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <LinkedRichText
                    key={paragraph}
                    text={paragraph}
                    className="mt-3 leading-7 text-muted-foreground"
                  />
                ))}
              </article>
            ))}
          </section>

          <section className="bg-background">
            <h2 className="text-2xl font-display font-bold text-foreground">
              {content.howTo.title}
            </h2>
            {content.howTo.paragraphs.map((paragraph) => (
              <LinkedRichText
                key={paragraph}
                text={paragraph}
                className="mt-3 max-w-4xl leading-7 text-muted-foreground"
              />
            ))}
          </section>

          <section className="bg-background">
            <h2 className="text-2xl font-display font-bold text-foreground">
              {content.workflow.title}
            </h2>
            {content.workflow.paragraphs.map((paragraph) => (
              <LinkedRichText
                key={paragraph}
                text={paragraph}
                className="mt-3 max-w-4xl leading-7 text-muted-foreground"
              />
            ))}
          </section>
        </section>
      </div>
    </ToolLayout>
  );
}
