import type { MetadataRoute } from "next";
import { COMPRESS_SIZE_ENTRIES } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const staticRoutes = [
  "",
  "/compress-image",
  "/resize-image",
  "/remove-metadata",
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
  "/about",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changefreq: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));

  const compressEntries = COMPRESS_SIZE_ENTRIES.map((entry) => ({
    url: `${SITE_URL}/compress-image-to/${entry.slug}`,
    changefreq: "weekly",
    priority: 0.8,
  }));

  return [...entries, ...compressEntries];
}
