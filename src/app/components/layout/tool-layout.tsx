import { ReactNode } from "react";
import Script from "next/script";
import { getTranslations } from "next-intl/server";
import { FAQAccordion } from "@/app/components/shared/faq-accordion";
import ToolJsonLd from "@/app/components/seo/tool-jsonld";
import { getRequestLanguage } from "@/app/lib/i18n-server";
import { getToolLayoutLookup } from "@/app/lib/tool-layout-lookup";
import { translateLookupText } from "@/app/lib/translation-lookup";

interface Step {
  title: string;
  description: string;
}

interface FAQ {
  q: string;
  a: string;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  steps: Step[];
  faqs: FAQ[];
  relatedTools: { name: string; path: string }[];
  collapseHeaderOnActiveImage?: boolean;
  schemaPath?: string;
}

export async function ToolLayout({
  title,
  description,
  children,
  steps,
  faqs,
  collapseHeaderOnActiveImage = true,
  schemaPath,
}: ToolLayoutProps) {
  const languageCode = await getRequestLanguage();
  const t = await getTranslations("tool-layout");
  const lookup = await getToolLayoutLookup(languageCode);
  const localizedTitle = translateLookupText(title, languageCode, lookup);
  const localizedDescription = translateLookupText(
    description,
    languageCode,
    lookup,
  );
  const localizedSteps = steps.map((step) => ({
    title: translateLookupText(step.title, languageCode, lookup),
    description: translateLookupText(step.description, languageCode, lookup),
  }));
  const localizedFaqs = faqs.map((faq) => ({
    q: translateLookupText(faq.q, languageCode, lookup),
    a: translateLookupText(faq.a, languageCode, lookup),
  }));
  const faqSchema =
    localizedFaqs && localizedFaqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: localizedFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        }
      : null;

  return (
    <div
      className="tool-layout min-h-screen bg-background flex flex-col"
      data-collapse-header-on-active-image={
        collapseHeaderOnActiveImage ? "true" : undefined
      }
    >
      {faqSchema && (
        <Script
          id={`faq-${localizedTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ToolJsonLd
        title={localizedTitle}
        description={localizedDescription}
        steps={localizedSteps}
        locale={languageCode}
        path={schemaPath}
        scriptIdBase={`tool-${localizedTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      />
      <main className="flex-1 py-8 lg:py-12">
        <div className="mx-auto w-full max-w-[1200px] px-4 xl:px-0">
          {/* Header Section */}
          <div className="tool-layout-header mb-6 text-center md:mb-8">
            <h1 className="page-title-gradient mb-3 text-3xl font-display font-extrabold tracking-tight md:text-4xl">
              {localizedTitle}
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground">
              {localizedDescription}
            </p>
          </div>

          {/* Main Tool Area */}
          <div className="mb-14">{children}</div>

          {/* Content Grid */}
          <div className="grid gap-12 md:grid-cols-12 lg:gap-20">
            <div className="space-y-16 md:col-span-12">
              {/* How it works */}
              <section className="mx-auto max-w-4xl">
                <h2 className="mb-8 text-center text-2xl font-display font-bold text-foreground">
                  {t("ui.howItWorks")}
                </h2>
                <div className="space-y-6">
                  {localizedSteps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="mb-1 text-lg font-semibold text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQs */}
              <section className="mx-auto max-w-5xl">
                <h2 className="mb-8 text-center text-2xl font-display font-bold text-foreground">
                  {t("ui.frequentlyAskedQuestions")}
                </h2>
                <FAQAccordion items={localizedFaqs} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
