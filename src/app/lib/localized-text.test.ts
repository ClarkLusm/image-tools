import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { pickText } from "./localized-text";

describe("pickText", () => {
  const text = { en: "Download", vi: "Tải xuống", de: "Herunterladen" };

  it("returns the text for the locale", () => {
    expect(pickText("en", text)).toBe("Download");
    expect(pickText("vi", text)).toBe("Tải xuống");
    expect(pickText("de", text)).toBe("Herunterladen");
  });

  it("falls back to English for unknown locales", () => {
    expect(pickText("fr", text)).toBe("Download");
    expect(pickText("toString", text)).toBe("Download");
  });
});

describe("client components", () => {
  const sourceFiles = (dir: string): string[] =>
    readdirSync(dir).flatMap((name) => {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) return sourceFiles(path);
      return /\.tsx?$/.test(name) && !/\.test\.tsx?$/.test(name) ? [path] : [];
    });

  it("do not branch on isVietnamese/isGerman (German would fall back to English)", () => {
    const offenders = sourceFiles(join(__dirname, ".."))
      .concat(sourceFiles(join(__dirname, "..", "..", "i18n")))
      .filter((file) => /\b(isVietnamese|isGerman)\b/.test(readFileSync(file, "utf8")));

    expect(offenders).toEqual([]);
  });
});
