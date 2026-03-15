import Script from "next/script";

type BreadcrumbItem = {
  name: string;
  url: string;
};

type BreadcrumbsJsonLdProps = {
  items: BreadcrumbItem[];
  scriptId: string;
};

export default function BreadcrumbsJsonLd({
  items,
  scriptId,
}: BreadcrumbsJsonLdProps) {
  const payload = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id={scriptId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
