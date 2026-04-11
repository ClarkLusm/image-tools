import type { SupportedLanguage } from "./i18n-config";

type MessageValue = string | MessageTree;
type MessageTree = {
  [key: string]: MessageValue;
};

type NamespaceKey = "common" | "home" | "tool-layout";

const namespaceLoaders: Record<
  NamespaceKey,
  Record<SupportedLanguage, () => Promise<MessageTree>>
> = {
  common: {
    en: async () => (await import("@/messages/en/common.json")).default,
    vi: async () => (await import("@/messages/vi/common.json")).default,
    de: async () => (await import("@/messages/de/common.json")).default,
  },
  home: {
    en: async () => (await import("@/messages/en/home.json")).default,
    vi: async () => (await import("@/messages/vi/home.json")).default,
    de: async () => (await import("@/messages/de/home.json")).default,
  },
  "tool-layout": {
    en: async () => (await import("@/messages/en/tool-layout.json")).default,
    vi: async () => (await import("@/messages/vi/tool-layout.json")).default,
    de: async () => (await import("@/messages/de/tool-layout.json")).default,
  },
};

export async function getNamespaceMessages(
  locale: SupportedLanguage,
  namespace: NamespaceKey,
) {
  return namespaceLoaders[namespace][locale]();
}

function resolveMessageValue(
  messages: MessageTree,
  key: string,
): string | undefined {
  const segments = key.split(".");
  let current: MessageValue | undefined = messages;

  for (const segment of segments) {
    if (!current || typeof current === "string") {
      return undefined;
    }

    current = current[segment];
  }

  return typeof current === "string" ? current : undefined;
}

function interpolateMessage(
  template: string,
  values?: Record<string, string | number>,
) {
  if (!values) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (_, token) => {
    const value = values[token];
    return value === undefined ? `{${token}}` : String(value);
  });
}

export function createMessageTranslator(messages: MessageTree) {
  return (key: string, values?: Record<string, string | number>) => {
    const template = resolveMessageValue(messages, key);
    return template ? interpolateMessage(template, values) : key;
  };
}
