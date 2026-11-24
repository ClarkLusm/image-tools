#!/usr/bin/env node
/**
 * Static i18n checks, run in CI (`pnpm i18n:check`).
 *
 * Namespace files (src/messages/<locale>/<namespace>.json, except the
 * lookup): every locale has the same keys as English, no empty strings, the
 * same {placeholders} and the same markdown link targets.
 *
 * Lookup files (tool-layout-lookup.json, English text -> translation): no
 * duplicate keys, no empty translations, and {placeholders} in a key appear
 * in its translation.
 *
 * Exits with 1 when a problem is found. Coverage of rendered pages is
 * checked separately by scripts/i18n-report.mjs.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export const LOCALES = ["en", "vi", "de"];
const LOOKUP_FILE = "tool-layout-lookup.json";
const PLACEHOLDER = /\{(\w+)\}/g;
const LINK_TARGET = /\]\((\/[^)\s]*)\)/g;

export function flatten(tree, prefix = "") {
  return Object.entries(tree).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (Array.isArray(value)) {
      return value.flatMap((item, index) =>
        item && typeof item === "object"
          ? flatten(item, `${path}.${index}`)
          : [[`${path}.${index}`, item]],
      );
    }
    return value && typeof value === "object"
      ? flatten(value, path)
      : [[path, value]];
  });
}

const sortedMatches = (text, pattern) =>
  [...String(text).matchAll(pattern)].map((match) => match[1]).sort();

const sameList = (left, right) => left.join("\u0000") === right.join("\u0000");

/** Compares one namespace across locales; returns problem strings. */
export function checkNamespace(namespace, filesByLocale) {
  const problems = [];
  const english = new Map(flatten(filesByLocale.en));

  for (const locale of LOCALES.filter((item) => item !== "en")) {
    const localized = new Map(flatten(filesByLocale[locale]));

    for (const [key, englishValue] of english) {
      if (!localized.has(key)) {
        problems.push(`${locale}/${namespace}: missing key "${key}"`);
        continue;
      }

      const value = localized.get(key);
      if (typeof englishValue !== "string") continue;

      if (typeof value !== "string" || value.trim() === "") {
        problems.push(`${locale}/${namespace}: empty value for "${key}"`);
        continue;
      }
      if (!sameList(sortedMatches(value, PLACEHOLDER), sortedMatches(englishValue, PLACEHOLDER))) {
        problems.push(`${locale}/${namespace}: placeholders differ from English in "${key}"`);
      }
      if (!sameList(sortedMatches(value, LINK_TARGET), sortedMatches(englishValue, LINK_TARGET))) {
        problems.push(`${locale}/${namespace}: link targets differ from English in "${key}"`);
      }
    }

    for (const key of localized.keys()) {
      if (!english.has(key)) {
        problems.push(`${locale}/${namespace}: key "${key}" does not exist in English`);
      }
    }
  }

  return problems;
}

/** Checks a flat English -> translation lookup file (raw JSON text). */
export function checkLookup(locale, rawJson) {
  const problems = [];
  const keyCounts = new Map();

  for (const match of rawJson.matchAll(/^\s*("(?:[^"\\]|\\.)*")\s*:/gm)) {
    const key = JSON.parse(match[1]);
    keyCounts.set(key, (keyCounts.get(key) ?? 0) + 1);
  }
  for (const [key, count] of keyCounts) {
    if (count > 1) problems.push(`${locale}/${LOOKUP_FILE}: duplicate key "${key}"`);
  }

  for (const [key, value] of Object.entries(JSON.parse(rawJson))) {
    if (typeof value !== "string" || value.trim() === "") {
      problems.push(`${locale}/${LOOKUP_FILE}: empty translation for "${key}"`);
      continue;
    }
    if (!sameList(sortedMatches(value, PLACEHOLDER), sortedMatches(key, PLACEHOLDER))) {
      problems.push(`${locale}/${LOOKUP_FILE}: placeholders differ in "${key}"`);
    }
  }

  return problems;
}

export function checkMessagesDirectory(messagesDir) {
  const problems = [];
  const namespaces = new Set(
    LOCALES.flatMap((locale) => readdirSync(join(messagesDir, locale))).filter(
      (file) => file.endsWith(".json") && file !== LOOKUP_FILE,
    ),
  );

  for (const file of [...namespaces].sort()) {
    const filesByLocale = {};
    for (const locale of LOCALES) {
      try {
        filesByLocale[locale] = JSON.parse(readFileSync(join(messagesDir, locale, file), "utf8"));
      } catch (error) {
        problems.push(`${locale}/${file}: ${error.code === "ENOENT" ? "file is missing" : error.message}`);
      }
    }
    if (LOCALES.every((locale) => filesByLocale[locale])) {
      problems.push(...checkNamespace(file.replace(/\.json$/, ""), filesByLocale));
    }
  }

  for (const locale of LOCALES.filter((item) => item !== "en")) {
    problems.push(
      ...checkLookup(locale, readFileSync(join(messagesDir, locale, LOOKUP_FILE), "utf8")),
    );
  }

  return problems;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const messagesDir = fileURLToPath(new URL("../src/messages", import.meta.url));
  const problems = checkMessagesDirectory(messagesDir);

  if (problems.length) {
    console.error(`i18n check failed (${problems.length} problem(s)):`);
    problems.forEach((problem) => console.error(`  - ${problem}`));
    process.exitCode = 1;
  } else {
    console.log("i18n check passed.");
  }
}
