#!/usr/bin/env node
/**
 * Finds English text that is still shown untranslated on localized pages.
 *
 * Usage: start the app (`pnpm build && pnpm start -p 3011`), then
 *   node scripts/i18n-report.mjs http://localhost:3011 [--json]
 *
 * For every page listed in /sitemap.xml it fetches the English page and the
 * same page in each other locale, extracts visible text segments, and
 * reports segments that are identical in English and the locale. Brand
 * names, numbers, URLs and very short segments are ignored.
 */

import { readFileSync } from "node:fs";

const LOCALES = ["vi", "de"];
const IGNORED = new Set([
  "Optimges",
  "JPG",
  "PNG",
  "WebP",
  "SVG",
  "AVIF",
  "GIF",
  "TIFF",
  "HEIC",
  "PDF",
  "EXIF",
  "Instagram",
  "Facebook",
  "TikTok",
  "YouTube",
  "English",
  "Tiếng Việt",
  "Deutsch",
]);

const baseUrl = (process.argv[2] ?? "http://localhost:3011").replace(/\/$/, "");
const asJson = process.argv.includes("--json");

function decodeEntities(text) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

/** Visible text segments of an HTML page (scripts/styles removed). */
export function extractSegments(html) {
  const body = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    // React separates adjacent text nodes with <!-- -->; the lookup
    // translates each node on its own, so keep them as separate segments.
    .replace(/<!--[\s\S]*?-->/g, "<br>");

  const metaDescriptions = [
    ...html.matchAll(
      /<meta[^>]+name="description"[^>]+content="([^"]*)"|<meta[^>]+content="([^"]*)"[^>]+name="description"/g,
    ),
  ].map((match) => match[1] ?? match[2]);

  return new Set(
    [...body.split(/<[^>]+>/), ...metaDescriptions]
      .map((segment) => decodeEntities(segment).replace(/\s+/g, " ").trim())
      .filter(isTranslatable),
  );
}

/** Lookup entries whose translation is the English text on purpose (brand names...). */
function loadIntentionallyIdentical(locale) {
  try {
    const lookup = JSON.parse(
      readFileSync(
        new URL(`../src/messages/${locale}/tool-layout-lookup.json`, import.meta.url),
        "utf8",
      ),
    );
    return new Set(
      Object.entries(lookup)
        .filter(([english, translated]) => english === translated)
        .map(([english]) => english),
    );
  } catch {
    return new Set();
  }
}

export function isTranslatable(segment) {
  if (segment.length < 4 || IGNORED.has(segment)) return false;
  if (/^https?:\/\//.test(segment)) return false;
  // Needs at least two Latin words: skips numbers, sizes, file names.
  return (segment.match(/[A-Za-z]{2,}/g) ?? []).length >= 2;
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { "accept-language": "en" } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
}

async function main() {
  const sitemap = await fetchText(`${baseUrl}/sitemap.xml`);
  const sitemapOrigin = new URL(
    sitemap.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? baseUrl,
  ).origin;
  const englishPaths = [
    ...new Set(
      [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
        .map((match) => new URL(match[1]).pathname)
        .filter((path) => !LOCALES.some((l) => path === `/${l}` || path.startsWith(`/${l}/`))),
    ),
  ].sort();

  const report = {};
  let total = 0;
  const identical = Object.fromEntries(
    LOCALES.map((locale) => [locale, loadIntentionallyIdentical(locale)]),
  );

  for (const path of englishPaths) {
    const english = extractSegments(await fetchText(`${baseUrl}${path}`));

    for (const locale of LOCALES) {
      const localizedPath = path === "/" ? `/${locale}` : `/${locale}${path}`;
      const localized = extractSegments(
        await fetchText(`${baseUrl}${localizedPath}`),
      );
      const untranslated = [...localized].filter(
        (segment) =>
          english.has(segment) &&
          !identical[locale].has(segment) &&
          !identical[locale].has(segment.replace(/ \| Optimges$/, "")),
      );

      if (untranslated.length) {
        report[localizedPath] = untranslated;
        total += untranslated.length;
      }
    }
  }

  if (asJson) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    for (const [path, segments] of Object.entries(report)) {
      console.log(`\n${path} (${segments.length})`);
      segments.forEach((segment) => console.log(`  - ${segment}`));
    }
    console.log(
      `\n${total} untranslated segment(s) on ${Object.keys(report).length} page(s); checked ${englishPaths.length} pages x ${LOCALES.length} locales (sitemap origin ${sitemapOrigin}).`,
    );
  }

  process.exitCode = total > 0 ? 1 : 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 2;
  });
}
