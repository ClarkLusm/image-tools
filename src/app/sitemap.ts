import type { MetadataRoute } from "next";
import { COMPRESS_SIZE_ENTRIES, COMPRESS_USE_CASE_ENTRIES } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { buildLocaleUrl } from "@/app/lib/metadata";

const staticRoutes = [
  "",
  "/compress-image",
  "/resize-image",
  "/upscale-image",
  "/remove-metadata",
  "/remove-background",
  "/crop-image",
  "/convert-to-jpg",
  "/convert-to-jpg/png",
  "/convert-to-jpg/webp",
  "/convert-to-jpg/svg",
  "/convert-to-webp",
  "/convert-to-webp/jpg",
  "/convert-to-webp/png",
  "/convert-to-webp/svg",
  "/convert-to-png",
  "/convert-to-png/jpg",
  "/convert-to-png/webp",
  "/convert-to-png/svg",
  "/resize-instagram",
  "/resize-tiktok",
  "/resize-youtube",
  "/resize-facebook",
  "/blog",
  "/about",
  "/privacy",
  "/terms",
  "/compress-image/for/email-attachments",
  "/compress-image/for/gmail",
  "/compress-image/for/whatsapp",
  "/compress-image/for/telegram",
  "/compress-image/for/shopify-product",
  "/compress-image/for/etsy-listing",
  "/compress-image/for/wordpress",
  "/compress-image/for/linkedin-banner",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: buildLocaleUrl(locale, route || "/"),
      changefreq: "weekly",
      priority: route === "" ? 1 : 0.7,
    })),
  );

  const compressEntries = routing.locales.flatMap((locale) =>
    COMPRESS_SIZE_ENTRIES.map((entry) => ({
      url: buildLocaleUrl(locale, `/compress-image-to/${entry.slug}`),
      changefreq: "weekly",
      priority: 0.8,
    })),
  );

  const useCaseEntries = routing.locales.flatMap((locale) =>
    COMPRESS_USE_CASE_ENTRIES.map((entry) => ({
      url: buildLocaleUrl(locale, `/compress-image/for/${entry.slug}`),
      changefreq: "weekly",
      priority: 0.75,
    })),
  );

  return [...entries, ...compressEntries, ...useCaseEntries];
}
