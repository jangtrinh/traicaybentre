import { readFileSync } from "fs";
import { join } from "path";

const FONTS_DIR = join(process.cwd(), "public", "fonts", "og");

const fontCache = new Map<string, ArrayBuffer>();

function loadFont(filename: string): ArrayBuffer {
  if (!fontCache.has(filename)) {
    const buf = readFileSync(join(FONTS_DIR, filename));
    fontCache.set(filename, buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
  }
  return fontCache.get(filename)!;
}

/** Load OG fonts — ExtraBold (800) for maximum impact */
export function getOgFonts() {
  return [
    {
      name: "Heading",
      data: loadFont("plus-jakarta-sans-800.ttf"),
      weight: 800 as const,
      style: "normal" as const,
    },
  ];
}
