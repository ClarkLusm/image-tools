import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  checkLookup,
  checkMessagesDirectory,
  checkNamespace,
} from "./check-i18n.mjs";
import { extractSegments, isTranslatable } from "./i18n-report.mjs";

describe("checkNamespace", () => {
  const en = {
    title: "Convert {count} files",
    body: "See [Resize Image](/resize-image).",
    nested: { label: "Hi" },
  };

  it("accepts matching locales", () => {
    const vi = {
      title: "Chuyển {count} file",
      body: "Xem [Đổi kích thước](/resize-image).",
      nested: { label: "Chào" },
    };
    expect(checkNamespace("demo", { en, vi, de: vi })).toEqual([]);
  });

  it("reports missing, extra, empty, placeholder and link problems", () => {
    const de = {
      title: "Konvertiere {total} Dateien",
      body: "Siehe [Größe](/crop-image).",
      extra: "x",
    };
    const vi = { title: "", body: en.body, nested: { label: "Chào" } };

    expect(checkNamespace("demo", { en, vi, de })).toEqual([
      'vi/demo: empty value for "title"',
      'de/demo: placeholders differ from English in "title"',
      'de/demo: link targets differ from English in "body"',
      'de/demo: missing key "nested.label"',
      'de/demo: key "extra" does not exist in English',
    ]);
  });
});

describe("checkLookup", () => {
  it("finds duplicate keys, empty values and placeholder mismatches", () => {
    const raw = `{
  "Hello": "Xin chào",
  "Hello": "Chào",
  "Empty": "",
  "Size {size}": "Dung lượng",
  "Ok {a}": "Được {a}"
}`;

    expect(checkLookup("vi", raw)).toEqual([
      'vi/tool-layout-lookup.json: duplicate key "Hello"',
      'vi/tool-layout-lookup.json: empty translation for "Empty"',
      'vi/tool-layout-lookup.json: placeholders differ in "Size {size}"',
    ]);
  });
});

describe("project messages", () => {
  it("pass the static i18n check", () => {
    const messagesDir = fileURLToPath(new URL("../src/messages", import.meta.url));
    expect(checkMessagesDirectory(messagesDir)).toEqual([]);
  });
});

describe("i18n report helpers", () => {
  it("splits React text nodes and reads the meta description", () => {
    const html =
      '<html><head><title>Hi there friend</title><meta name="description" content="Fast &amp; free image tools"/></head>' +
      "<body><script>var a = 'ignored text here'</script><p>Why <!-- -->100 KB<!-- --> Is Often Required</p></body></html>";

    expect([...extractSegments(html)].sort()).toEqual([
      "Fast & free image tools",
      "Hi there friend",
      "Is Often Required",
    ]);
  });

  it("ignores brand names, numbers and single words", () => {
    expect(isTranslatable("Optimges")).toBe(false);
    expect(isTranslatable("100 KB")).toBe(false);
    expect(isTranslatable("Upload")).toBe(false);
    expect(isTranslatable("Upload PNG")).toBe(true);
  });
});
