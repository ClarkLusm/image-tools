const DEBUG_FLAG_VALUES = new Set(["1", "true", "yes", "on"]);

function normalizeFlag(value: string | undefined) {
  return value?.trim().toLowerCase() ?? "";
}

export const isDebugEnabled =
  DEBUG_FLAG_VALUES.has(normalizeFlag(process.env.DEBUG_IMAGE_TOOLS)) ||
  DEBUG_FLAG_VALUES.has(normalizeFlag(process.env.NEXT_PUBLIC_DEBUG_IMAGE_TOOLS));

export function debugLog(scope: string, ...parts: unknown[]) {
  if (!isDebugEnabled) return;
  // eslint-disable-next-line no-console
  console.log(`[image-tools][${scope}]`, ...parts);
}
