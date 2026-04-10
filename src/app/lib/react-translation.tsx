import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import type {SupportedLanguage} from "./i18n-config";
import {translateLookupText} from "./translation-lookup";

const NON_TRANSLATABLE_PROP_KEYS = new Set([
  "accept",
  "action",
  "altText",
  "aria-controls",
  "aria-describedby",
  "aria-hidden",
  "aria-labelledby",
  "as",
  "buttonVariant",
  "className",
  "content",
  "crossOrigin",
  "data",
  "disabled",
  "fill",
  "height",
  "href",
  "htmlFor",
  "icon",
  "iconClassName",
  "id",
  "imageClassName",
  "inputMode",
  "lang",
  "locale",
  "max",
  "maxFiles",
  "maxSizeMB",
  "method",
  "mimeType",
  "min",
  "name",
  "noteClassName",
  "outputExt",
  "outputMime",
  "path",
  "placeholderClassName",
  "priority",
  "qualityDefault",
  "rel",
  "role",
  "rows",
  "scriptId",
  "scriptIdBase",
  "sizes",
  "src",
  "step",
  "style",
  "target",
  "task",
  "titleClassName",
  "type",
  "value",
  "width",
  "url",
]);

function localizeValue(
  value: unknown,
  languageCode: SupportedLanguage,
  lookup: Record<string, string>,
  propKey?: string,
): unknown {
  if (typeof value === "string") {
    if (propKey && NON_TRANSLATABLE_PROP_KEYS.has(propKey)) {
      return value;
    }

    return translateLookupText(value, languageCode, lookup);
  }

  if (Array.isArray(value)) {
    return value.map((item) =>
      localizeValue(item, languageCode, lookup, propKey),
    );
  }

  if (isValidElement(value)) {
    return localizeReactTree(value, languageCode, lookup);
  }

  if (value && typeof value === "object" && value.constructor === Object) {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        localizeValue(nestedValue, languageCode, lookup, key),
      ]),
    );
  }

  return value;
}

export function localizeReactTree(
  node: ReactNode,
  languageCode: SupportedLanguage,
  lookup: Record<string, string>,
): ReactNode {
  if (typeof node === "string") {
    return translateLookupText(node, languageCode, lookup);
  }

  if (Array.isArray(node)) {
    return node.map((child) => localizeReactTree(child, languageCode, lookup));
  }

  if (!isValidElement(node)) {
    return node;
  }

  const element = node as ReactElement<Record<string, unknown>>;
  const nextProps: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(element.props)) {
    if (key === "children") {
      nextProps.children = Children.map(value as ReactNode, (child) =>
        localizeReactTree(child, languageCode, lookup),
      );
      continue;
    }

    nextProps[key] = localizeValue(value, languageCode, lookup, key);
  }

  return cloneElement(element, nextProps);
}
