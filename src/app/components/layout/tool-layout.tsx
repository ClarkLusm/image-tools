import { ReactNode } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import Script from "next/script";
import { ToolSidebar } from "./tool-sidebar";

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
}

export function ToolLayout({
  title,
  description,
  children,
  steps,
  faqs,
  collapseHeaderOnActiveImage = true,
}: ToolLayoutProps) {
  const faqSchema =
    faqs && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
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
          id={`faq-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <main className="flex-1 py-12 lg:py-20">
        <div className="w-full xl:grid xl:grid-cols-[260px_minmax(0,1fr)] xl:items-start">
          <div className="">
            <ToolSidebar />
          </div>

          <div className="min-w-0 xl:px-16">
            <div className="mx-auto w-full max-w-[1500px] px-4 xl:mx-0 xl:px-0">
              {/* Header Section */}
              <div className="tool-layout-header mb-6 text-center md:mb-8">
                <div className="mb-3 inline-flex items-center justify-center rounded-2xl bg-primary/10 p-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h1 className="mb-3 text-3xl font-display font-extrabold tracking-tight text-foreground md:text-4xl">
                  {title}
                </h1>
                <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
                  {description}
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
                      How it works
                    </h2>
                    <div className="space-y-6">
                      {steps.map((step, index) => (
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
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-5">
                      {faqs.map((faq, index) => (
                        <details
                          key={index}
                          open={index === 0}
                          className="group overflow-hidden rounded-2xl border border-border bg-white shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
                        >
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-7 py-6 text-left marker:content-none">
                            <h3 className="text-lg font-semibold text-foreground">
                              {faq.q}
                            </h3>
                            <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                          </summary>
                          <div className="border-t border-border/70 px-7 py-6">
                            <p className="leading-8 text-muted-foreground">
                              {faq.a}
                            </p>
                          </div>
                        </details>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
