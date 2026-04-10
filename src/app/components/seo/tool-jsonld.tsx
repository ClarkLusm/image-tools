import Script from "next/script";
import type { SupportedLanguage } from "@/app/lib/i18n-config";
import { buildLocaleUrl } from "@/app/lib/metadata";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Step = {
  title: string;
  description: string;
};

type ToolJsonLdProps = {
  title: string;
  description: string;
  steps: Step[];
  locale: SupportedLanguage;
  scriptIdBase: string;
  path?: string;
};

export default function ToolJsonLd({
  title,
  description,
  steps,
  locale,
  scriptIdBase,
  path,
}: ToolJsonLdProps) {
  const pageUrl = path ? buildLocaleUrl(locale, path) : undefined;
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    description,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    browserRequirements: "Requires a modern web browser",
    isAccessibleForFree: true,
    inLanguage: locale,
    featureList: steps.map((step) => step.title),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(pageUrl
      ? {
          url: pageUrl,
          mainEntityOfPage: pageUrl,
        }
      : {}),
  };

  const howToSchema =
    steps.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: title,
          description,
          inLanguage: locale,
          totalTime: "PT1M",
          estimatedCost: {
            "@type": "MonetaryAmount",
            currency: "USD",
            value: "0",
          },
          tool: [
            {
              "@type": "HowToTool",
              name: SITE_NAME,
            },
          ],
          ...(pageUrl ? { url: pageUrl } : {}),
          step: steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.title,
            text: step.description,
          })),
        }
      : null;

  return (
    <>
      <Script
        id={`${scriptIdBase}-software-application`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      {howToSchema ? (
        <Script
          id={`${scriptIdBase}-howto`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      ) : null}
    </>
  );
}
