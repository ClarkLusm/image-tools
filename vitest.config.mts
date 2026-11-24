import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const fromRoot = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  resolve: {
    // Mirrors the "paths" in tsconfig.json (most specific first).
    alias: [
      { find: /^@\/components\//, replacement: fromRoot("./src/app/components/") },
      { find: /^@\/hooks\//, replacement: fromRoot("./src/app/hooks/") },
      { find: /^@\/lib\//, replacement: fromRoot("./src/app/lib/") },
      { find: /^@\/workers\//, replacement: fromRoot("./src/app/workers/") },
      { find: /^@\//, replacement: fromRoot("./src/") },
    ],
  },
  test: {
    include: ["src/**/*.test.{ts,tsx}", "scripts/**/*.test.mjs"],
    environment: "node",
    env: {
      NEXT_PUBLIC_IMAGE_TOOLS_API_URL: "https://api.example.test/v1",
      NEXT_PUBLIC_SITE_URL: "https://optimges.example.test",
    },
  },
});
