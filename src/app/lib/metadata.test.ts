import { describe, expect, it } from "vitest";
import deLookup from "@/messages/de/tool-layout-lookup.json";
import viLookup from "@/messages/vi/tool-layout-lookup.json";
import { COMPRESS_SIZE_ENTRIES, COMPRESS_USE_CASE_ENTRIES } from "./seo";
import {
  buildLocalePath,
  createPageMetadata,
  resolveLocalizedText,
} from "./metadata";
import { translateLookupText } from "./translation-lookup";

describe("metadata helpers", () => {
  it("builds locale paths with the default locale unprefixed", () => {
    expect(buildLocalePath("en", "/compress-image")).toBe("/compress-image");
    expect(buildLocalePath("de", "/compress-image")).toBe("/de/compress-image");
    expect(buildLocalePath("vi", "/")).toBe("/vi");
  });

  it("prefers hand-written text, then the lookup, then English", () => {
    const lookup = { "Hello {name}": "Hallo {name}" };

    expect(resolveLocalizedText("de", { en: "Hi", de: "Servus" }, lookup)).toBe("Servus");
    expect(resolveLocalizedText("de", { en: "Hello Ann" }, lookup)).toBe("Hallo Ann");
    expect(resolveLocalizedText("de", { en: "No entry" }, lookup)).toBe("No entry");
    expect(resolveLocalizedText("en", { en: "Hello Ann" }, lookup)).toBe("Hello Ann");
  });

  it("translates English-only titles through the German lookup", async () => {
    const metadata = await createPageMetadata({
      locale: "de",
      path: "/compress-image-to/100kb",
      title: {
        en: "Compress Image to 100 KB Online (Free) - Reduce Image Size Instantly",
        vi: "Nén ảnh về 100 KB",
      },
      description: { en: "Untranslated description" },
    });

    expect(metadata.title).toBe(
      "Bild online auf 100 KB komprimieren (kostenlos) – Bildgröße sofort verringern",
    );
    expect(metadata.description).toBe("Untranslated description");
    expect(metadata.alternates?.canonical).toBe(
      "https://optimges.example.test/de/compress-image-to/100kb",
    );
    expect(metadata.openGraph).toMatchObject({ locale: "de_DE" });
  });
});

describe("SEO entries are translatable", () => {
  const purposes = [
    ...COMPRESS_SIZE_ENTRIES.map((entry) => entry.purpose),
    ...COMPRESS_USE_CASE_ENTRIES.map((entry) => entry.purpose),
  ];

  it.each([
    ["vi", viLookup],
    ["de", deLookup],
  ] as const)("has a %s translation for every {purpose}", (locale, lookup) => {
    const missing = purposes.filter(
      (purpose) =>
        translateLookupText(purpose, locale, lookup as Record<string, string>) === purpose,
    );

    expect(missing).toEqual([]);
  });

  it("uses unique slugs", () => {
    const slugs = [
      ...COMPRESS_SIZE_ENTRIES.map((entry) => entry.slug),
      ...COMPRESS_USE_CASE_ENTRIES.map((entry) => entry.slug),
    ];
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
