import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { ToolLayout } from "@/app/components/layout/tool-layout";
import TargetCompressClient from "@/app/components/tools/target-compress-client";
import BreadcrumbsJsonLd from "@/app/components/seo/breadcrumbs-jsonld";
import { COMPRESS_USE_CASE_ENTRIES } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import {
  createPageMetadata,
  resolveSupportedLanguage,
} from "@/app/lib/metadata";
import ToolNextActions from "@/app/components/tools/tool-next-actions";
import { getToolNextActions } from "@/app/lib/tool-next-actions";

const useCaseMetadataVi: Record<
  string,
  { title: string; description: string }
> = {
  "email-attachments": {
    title: "Nén ảnh cho tệp đính kèm email",
    description: "Giảm dung lượng ảnh để đính kèm và gửi email nhanh hơn mà không bị trả lại.",
  },
  gmail: {
    title: "Nén ảnh cho Gmail",
    description: "Tối ưu ảnh cho tệp đính kèm Gmail và tốc độ tải nhanh hơn trong các cuộc hội thoại.",
  },
  whatsapp: {
    title: "Nén ảnh cho WhatsApp",
    description: "Giảm dung lượng ảnh để gửi nhanh hơn và hạn chế lỗi upload trong WhatsApp.",
  },
  telegram: {
    title: "Nén ảnh cho Telegram",
    description: "Tối ưu ảnh để gửi nhanh và giữ cuộc trò chuyện nhẹ hơn trong Telegram.",
  },
  "shopify-product": {
    title: "Nén ảnh cho trang sản phẩm Shopify",
    description: "Tăng tốc trang sản phẩm Shopify với kích thước ảnh đã được tối ưu.",
  },
  "etsy-listing": {
    title: "Nén ảnh cho listing Etsy",
    description: "Tối ưu ảnh listing để Etsy tải nhanh hơn và hiển thị preview rõ hơn.",
  },
  wordpress: {
    title: "Nén ảnh cho upload WordPress",
    description: "Giảm dung lượng ảnh để upload WordPress nhanh hơn và trang nhẹ hơn.",
  },
  "linkedin-banner": {
    title: "Nén ảnh cho banner LinkedIn",
    description: "Tối ưu banner LinkedIn để hiển thị sắc nét và tải nhanh hơn.",
  },
};

export function generateStaticParams() {
  return COMPRESS_USE_CASE_ENTRIES.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const entry = COMPRESS_USE_CASE_ENTRIES.find((item) => item.slug === slug);
  if (!entry) return {};
  return createPageMetadata({
    locale,
    path: `/compress-image/for/${entry.slug}`,
    title: {
      en: `${entry.title} (Free Online Tool)`,
      vi: `${useCaseMetadataVi[entry.slug]?.title ?? entry.title} - Công cụ online miễn phí`,
    },
    description: {
      en: entry.description,
      vi:
        useCaseMetadataVi[entry.slug]?.description ??
        "Tối ưu ảnh cho đúng ngữ cảnh sử dụng với workflow nén ảnh thực tế hơn.",
    },
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const entry = COMPRESS_USE_CASE_ENTRIES.find((item) => item.slug === slug);
  if (!entry) notFound();

  const otherEntries = COMPRESS_USE_CASE_ENTRIES.filter(
    (item) => item.slug !== entry.slug
  );
  const languageCode = resolveSupportedLanguage(locale);
  const nextActions = getToolNextActions("target-compress", languageCode);

  return (
    <ToolLayout
      locale={locale}
      title={entry.title}
      description={entry.description}
      steps={[
        { title: "Upload Image", description: "Choose the image to optimize." },
        {
          title: "Compress",
          description: `Target a size suitable for ${entry.purpose}.`,
        },
        { title: "Download", description: "Save the optimized file instantly." },
      ]}
      faqs={[...entry.faqs]}
      relatedTools={[
        { name: "Compress Image", path: "/compress-image" },
        { name: "Resize Image", path: "/resize-image" },
      ]}
    >
      <div className="space-y-12">
        <BreadcrumbsJsonLd
          scriptId={`breadcrumbs-compress-${entry.slug}`}
          items={[
            { name: "Home", url: `${SITE_URL}/` },
            { name: "Compress Image", url: `${SITE_URL}/compress-image` },
            {
              name: entry.title,
              url: `${SITE_URL}/compress-image/for/${entry.slug}`,
            },
          ]}
        />

        <TargetCompressClient
          targetSizeKB={
            entry.recommendedSizes[0]?.slug === "1mb"
              ? 1024
              : entry.recommendedSizes[0]?.slug === "2mb"
                ? 2048
                : Number(entry.recommendedSizes[0]?.slug.replace("kb", "")) ||
                  300
          }
          targetLabel={entry.recommendedSizes[0]?.label ?? "300 KB"}
        />

        <ToolNextActions
          title={nextActions.title}
          description={nextActions.description}
          items={nextActions.items}
        />

        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-3">
            How to optimize for {entry.purpose}
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            {entry.howTo.map((tip) => (
              <p key={tip}>{tip}</p>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-3">
            Recommended target sizes
          </h3>
          <div className="flex flex-wrap gap-3">
            {entry.recommendedSizes.map((size) => (
              <Link
                key={size.slug}
                href={`/compress-image-to/${size.slug}`}
                className="px-4 py-2 rounded-full border border-border bg-secondary/40 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                {size.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-3">Other use cases</h3>
          <div className="flex flex-wrap gap-3">
            {otherEntries.map((item) => (
              <Link
                key={item.slug}
                href={`/compress-image/for/${item.slug}`}
                className="px-4 py-2 rounded-full border border-border bg-secondary/40 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </ToolLayout>
  );
}
