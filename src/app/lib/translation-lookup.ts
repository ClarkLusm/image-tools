import type {SupportedLanguage} from "./i18n-config";

type Lookup = Record<string, string>;

interface LookupPattern {
  regex: RegExp;
  names: string[];
  translation: string;
}

const PLACEHOLDER = /\{(\w+)\}/g;
const patternCache = new WeakMap<Lookup, LookupPattern[]>();

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Lookup keys may contain `{name}` placeholders, e.g.
 * "Compress Image to {size}" -> "Nén ảnh về {size}". They are compiled once
 * per lookup object and tried, longest key first, when there is no exact match.
 */
function getPatterns(lookup: Lookup): LookupPattern[] {
  const cached = patternCache.get(lookup);
  if (cached) {
    return cached;
  }

  const patterns = Object.entries(lookup)
    .filter(([key]) => key.includes("{"))
    .sort(([left], [right]) => right.length - left.length)
    .map(([key, translation]) => {
      const names: string[] = [];
      const source = key
        .split(PLACEHOLDER)
        .map((part, index) => {
          if (index % 2 === 1) {
            names.push(part);
            return "(.+?)";
          }
          return escapeRegex(part);
        })
        .join("");

      return {regex: new RegExp(`^${source}$`), names, translation};
    });

  patternCache.set(lookup, patterns);
  return patterns;
}

function translateNormalized(normalizedText: string, lookup: Lookup): string | undefined {
  const exact = lookup[normalizedText];
  if (exact) {
    return exact;
  }

  for (const pattern of getPatterns(lookup)) {
    const match = pattern.regex.exec(normalizedText);
    if (!match) {
      continue;
    }

    const values = Object.fromEntries(
      pattern.names.map((name, index) => {
        const captured = match[index + 1];
        // Captured values can be English phrases themselves ("{purpose}").
        return [name, lookup[captured] ?? captured];
      }),
    );

    return pattern.translation.replace(PLACEHOLDER, (placeholder, name: string) =>
      name in values ? values[name] : placeholder,
    );
  }

  return undefined;
}

export function translateLookupText(
  text: string,
  languageCode: SupportedLanguage,
  lookup: Lookup,
) {
  const leading = text.match(/^\s*/)?.[0] ?? "";
  const trailing = text.match(/\s*$/)?.[0] ?? "";
  const normalizedText = text.replace(/\s+/g, " ").trim();

  if (!normalizedText || languageCode === "en") {
    return text;
  }

  const translated = translateNormalized(normalizedText, lookup);
  return translated ? `${leading}${translated}${trailing}` : text;
}
