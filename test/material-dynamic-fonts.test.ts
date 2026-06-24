import { it, expect, vi, beforeEach } from "vitest";
import materialDynamicFonts from "../src/cdn/material-dynamic-fonts.ts";

beforeEach(() => {
  document.body.innerHTML = "";
  document.head.innerHTML = "";

  (globalThis as any).FontFace = class FontFace {
    constructor(family: string, src: string, descriptors?: any) {
      this.family = family;
      this.src = src;
      this.descriptors = descriptors;
    }
    family: string;
    src: string;
    descriptors?: any;
  };
  
  Object.defineProperty(document, 'fonts', {
    value: {
      add: vi.fn(),
    },
    writable: true,
  });
});

it("using defaults", async () => {
  const expectedUrl = "https://fonts.googleapis.com/css2?family=Material Symbols Outlined:FILL@0..1&icon_names=check,check_box,check_box_outline_blank,indeterminate_check_box,radio_button_checked,radio_button_unchecked&display=swap";
  const result = await materialDynamicFonts();
  expect(result).toBe(expectedUrl);
});

it("using 'Material Symbols Outlined' font", async () => {
  const expectedUrl = "https://fonts.googleapis.com/css2?family=Material Symbols Outlined:FILL@0..1&icon_names=check,check_box,check_box_outline_blank,indeterminate_check_box,radio_button_checked,radio_button_unchecked&display=swap";
  const result = await materialDynamicFonts("Material Symbols Outlined");
  expect(result).toBe(expectedUrl);
});

it("using 'Material Symbols Sharp' font", async () => {
  const expectedUrl = "https://fonts.googleapis.com/css2?family=Material Symbols Sharp:FILL@0..1&icon_names=check,check_box,check_box_outline_blank,indeterminate_check_box,radio_button_checked,radio_button_unchecked&display=swap";
  const result = await materialDynamicFonts("Material Symbols Sharp");
  expect(result).toBe(expectedUrl);
});

it("using 'Material Symbols Rounded' font", async () => {
  const expectedUrl = "https://fonts.googleapis.com/css2?family=Material Symbols Rounded:FILL@0..1&icon_names=check,check_box,check_box_outline_blank,indeterminate_check_box,radio_button_checked,radio_button_unchecked&display=swap";
  const result = await materialDynamicFonts("Material Symbols Rounded");
  expect(result).toBe(expectedUrl);
});

it("adding new icons", async () => {
  document.body.innerHTML = "<i class='material-symbols-rounded'>home</i>";
  const expectedUrl = "https://fonts.googleapis.com/css2?family=Material Symbols Rounded:FILL@0..1&icon_names=check,check_box,check_box_outline_blank,home,indeterminate_check_box,radio_button_checked,radio_button_unchecked&display=swap";
  const result = await materialDynamicFonts("Material Symbols Rounded");
  expect(result).toBe(expectedUrl);
});

it("adding new icons", async () => {
  document.body.innerHTML = "<i class='material-symbols-rounded'>home</i>";
  const expectedUrl = "https://fonts.googleapis.com/css2?family=Material Symbols Rounded:FILL@0..1&icon_names=check,check_box,check_box_outline_blank,home,indeterminate_check_box,radio_button_checked,radio_button_unchecked&display=swap";
  const result = await materialDynamicFonts("Material Symbols Rounded");
  expect(result).toBe(expectedUrl);
});