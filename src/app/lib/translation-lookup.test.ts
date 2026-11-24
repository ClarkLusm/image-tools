import { describe, expect, it } from "vitest";
import { translateLookupText } from "./translation-lookup";

describe("translateLookupText", () => {
  const lookup = {
    "Compress Image": "Nén ảnh",
    "Compress Image to {size}": "Nén ảnh về {size}",
    "Compress Image to {size} for {purpose}": "Nén ảnh về {size} cho {purpose}",
    "email attachments": "tệp đính kèm email",
    "Why {size} Is Often Required": "Vì sao thường yêu cầu {size}",
  };

  it("returns English text untouched", () => {
    expect(translateLookupText("Compress Image", "en", lookup)).toBe(
      "Compress Image",
    );
  });

  it("translates exact matches and keeps surrounding whitespace", () => {
    expect(translateLookupText("  Compress   Image \n", "vi", lookup)).toBe(
      "  Nén ảnh \n",
    );
  });

  it("returns the original text when there is no entry", () => {
    expect(translateLookupText("Unknown text", "vi", lookup)).toBe(
      "Unknown text",
    );
    expect(translateLookupText("   ", "vi", lookup)).toBe("   ");
  });

  it("fills {placeholders} from pattern keys", () => {
    expect(translateLookupText("Compress Image to 100 KB", "vi", lookup)).toBe(
      "Nén ảnh về 100 KB",
    );
    expect(translateLookupText("Why 2 MB Is Often Required", "vi", lookup)).toBe(
      "Vì sao thường yêu cầu 2 MB",
    );
  });

  it("prefers the longest matching pattern and translates captured values", () => {
    expect(
      translateLookupText(
        "Compress Image to 300 KB for email attachments",
        "vi",
        lookup,
      ),
    ).toBe("Nén ảnh về 300 KB cho tệp đính kèm email");
  });

  it("treats regex characters in keys literally", () => {
    const special = { "Price (USD) is {amount}?": "Giá (USD) là {amount}?" };

    expect(translateLookupText("Price (USD) is 5?", "vi", special)).toBe(
      "Giá (USD) là 5?",
    );
    expect(translateLookupText("Price USD is 5", "vi", special)).toBe(
      "Price USD is 5",
    );
  });
});
