import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";

// 8x8 semi-transparent red PNG, so the test needs no fixture file.
const PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAEklEQVR4nGP4z8DQgA8zjAwFAJKHX8FJV0QtAAAAAElFTkSuQmCC";

test("converts a PNG to JPG entirely in the browser", async ({ page }) => {
  const apiRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/image-tools/")) apiRequests.push(request.url());
  });

  await page.goto("/convert-to-jpg");
  await page.locator('input[type="file"]').first().setInputFiles({
    name: "red.png",
    mimeType: "image/png",
    buffer: Buffer.from(PNG_BASE64, "base64"),
  });

  const convert = page.getByRole("button", { name: /^Convert/ });
  if (await convert.isVisible().catch(() => false)) {
    await convert.click();
  }

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: /^Download/ }).first().click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toMatch(/\.jpe?g$/);
  const bytes = await readFile((await download.path()) as string);
  // JPEG files start with FF D8 FF.
  expect([...bytes.subarray(0, 3)]).toEqual([0xff, 0xd8, 0xff]);
  // Client-side tool: nothing is sent to the image API.
  expect(apiRequests).toEqual([]);
});
