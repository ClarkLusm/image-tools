import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * NEXT_PUBLIC_* values are inlined at build time, so a missing or invalid
 * value would silently ship a broken bundle. Fail the production build
 * instead, and only warn during development.
 */
const REQUIRED_PUBLIC_URL_ENV = [
  "NEXT_PUBLIC_IMAGE_TOOLS_API_URL",
  "NEXT_PUBLIC_SITE_URL",
] as const;

function findEnvProblems() {
  return REQUIRED_PUBLIC_URL_ENV.flatMap((name) => {
    const value = process.env[name]?.trim();

    if (!value) {
      return [`${name} is not set`];
    }

    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:"
        ? []
        : [`${name} must be an http(s) URL (got "${value}")`];
    } catch {
      return [`${name} must be an absolute URL (got "${value}")`];
    }
  });
}

const nextConfig: NextConfig = {
  output: "standalone",
};

export default function config(phase: string): NextConfig {
  const problems = findEnvProblems();

  if (problems.length > 0) {
    const message = `Invalid environment:\n- ${problems.join("\n- ")}\nSee .env.example.`;

    if (phase === PHASE_PRODUCTION_BUILD) {
      throw new Error(message);
    }

    console.warn(`[image-tools] ${message}`);
  }

  return withNextIntl(nextConfig);
}
