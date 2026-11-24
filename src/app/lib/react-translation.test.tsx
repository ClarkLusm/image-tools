import { createElement, isValidElement, type ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { localizeReactTree } from "./react-translation";
import { getToolNextActions, type ToolNextActionPreset } from "./tool-next-actions";

type Props = Record<string, unknown> & { children?: unknown };

describe("localizeReactTree", () => {
  const lookup = {
    Upload: "Hochladen",
    "Upload {format}": "{format} hochladen",
    "Choose a file": "Datei wählen",
  };

  it("translates text children, nested elements and string props", () => {
    const tree = createElement(
      "section",
      { title: "Upload", className: "Upload" },
      "Upload",
      createElement("p", { "aria-label": "Choose a file" }, "Upload PNG"),
    );

    const localized = localizeReactTree(tree, "de", lookup) as ReactElement<Props>;
    const [text, paragraph] = localized.props.children as [
      string,
      ReactElement<Props>,
    ];

    expect(localized.props.title).toBe("Hochladen");
    // Non-translatable props such as className stay untouched.
    expect(localized.props.className).toBe("Upload");
    expect(text).toBe("Hochladen");
    expect(isValidElement(paragraph)).toBe(true);
    expect(paragraph.props["aria-label"]).toBe("Datei wählen");
    expect(paragraph.props.children).toEqual(["PNG hochladen"]);
  });

  it("keeps English as is", () => {
    const tree = createElement("p", null, "Upload");
    const localized = localizeReactTree(tree, "en", lookup) as ReactElement<Props>;

    expect(localized.props.children).toEqual(["Upload"]);
  });
});

describe("getToolNextActions", () => {
  const presets: ToolNextActionPreset[] = [
    "resize-image",
    "compress-image",
    "target-compress",
    "crop-image",
    "remove-background",
    "remove-metadata",
    "upscale-image",
    "social-resize",
    "convert-to-png",
    "convert-to-jpg",
    "convert-to-webp",
    "convert-to-svg",
  ];

  it.each(presets)("offers the same links in every locale for %s", (preset) => {
    const hrefs = (locale: "en" | "vi" | "de") =>
      getToolNextActions(preset, locale).items.map((item) => item.href);

    const english = getToolNextActions(preset, "en");
    expect(english.items.length).toBeGreaterThan(0);
    expect(hrefs("vi")).toEqual(hrefs("en"));
    expect(hrefs("de")).toEqual(hrefs("en"));

    for (const locale of ["vi", "de"] as const) {
      const localized = getToolNextActions(preset, locale);
      expect(localized.title).not.toBe("");
      expect(localized.title).not.toBe(english.title);
    }
  });
});
