import { ReactNode } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

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
}

export function ToolLayout({ title, description, children, steps, faqs, relatedTools }: ToolLayoutProps) {
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
    <div className="min-h-screen bg-background flex flex-col">
      {faqSchema && (
        <Script
          id={`faq-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <main className="flex-1 py-12 lg:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-2xl mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-foreground tracking-tight mb-4">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {/* Main Tool Area */}
          <div className="bg-card border border-border shadow-xl shadow-black/[0.03] rounded-3xl p-6 md:p-10 mb-20">
            {children}
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Left Column: How it works & FAQs */}
            <div className="md:col-span-8 space-y-16">
              
              {/* How it works */}
              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-8">How it works</h2>
                <div className="space-y-6">
                  {steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQs */}
              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-8">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-secondary/30 rounded-2xl p-6 border border-border/50">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{faq.q}</h3>
                      <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* Right Column: Related Tools */}
            <div className="md:col-span-4">
              <div className="sticky top-24 bg-card rounded-2xl p-6 border border-border shadow-lg shadow-black/[0.02]">
                <h3 className="text-lg font-display font-bold text-foreground mb-6">Related Tools</h3>
                <div className="space-y-3">
                  {relatedTools.map((tool) => (
                    <Link 
                      key={tool.path}
                      href={tool.path}
                      className="group flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-primary/5 hover:text-primary border border-transparent hover:border-primary/20 transition-all"
                    >
                      <span className="font-medium">{tool.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
