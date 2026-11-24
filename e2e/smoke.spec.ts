import { expect, test, type Page } from "@playwright/test";

const LOCALES = [
  { code: "en", prefix: "", heading: /compress/i },
  { code: "vi", prefix: "/vi", heading: /nén/i },
  { code: "de", prefix: "/de", heading: /komprimieren/i },
] as const;

const PAGES = [
  "/",
  "/compress-image",
  "/compress-image-to/100kb",
  "/compress-image/for/gmail",
  "/convert-to-jpg",
  "/convert-to-png/webp",
  "/resize-image",
  "/crop-image",
  "/upscale-image",
  "/about",
  "/privacy",
];

/** Collects console errors and uncaught page errors. */
function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

for (const locale of LOCALES) {
  test.describe(`pages in ${locale.code}`, () => {
    for (const path of PAGES) {
      test(`${locale.prefix}${path || "/"} renders without errors`, async ({ page }) => {
        const errors = trackErrors(page);
        const response = await page.goto(`${locale.prefix}${path}` || "/");

        expect(response?.status()).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", locale.code);
        await expect(page.locator("h1").first()).toBeVisible();
        await page.waitForLoadState("networkidle");
        expect(errors).toEqual([]);
      });
    }

    test(`compress page is localized in ${locale.code}`, async ({ page }) => {
      await page.goto(`${locale.prefix}/compress-image-to/100kb`);
      await expect(page.locator("h1").first()).toHaveText(locale.heading);
      await expect(page).toHaveTitle(locale.heading);
    });
  });
}

test("language switcher keeps the current page", async ({ page }) => {
  await page.goto("/vi/compress-image");
  await expect(page.locator("html")).toHaveAttribute("lang", "vi");
  await page.goto("/de/compress-image");
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page).toHaveURL(/\/de\/compress-image$/);
});

test("unknown pages return 404", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
});

test("sitemap and robots are served", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain("/de/compress-image");

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("Sitemap:");
});
