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

/** Load fonts for OG image generation — locale-aware for CJK support */
export function getOgFonts(locale: string) {
  const heading = {
    name: "Heading",
    data: loadFont("plus-jakarta-sans-700.ttf"),
    weight: 700 as const,
    style: "normal" as const,
  };

  if (locale === "ja") {
    return [
      heading,
      { name: "CJK", data: loadFont("noto-sans-jp-700.ttf"), weight: 700 as const, style: "normal" as const },
    ];
  }

  if (locale === "ko") {
    return [
      heading,
      { name: "CJK", data: loadFont("noto-sans-kr-700.ttf"), weight: 700 as const, style: "normal" as const },
    ];
  }

  // VI and EN — Plus Jakarta Sans covers Latin + Vietnamese diacritics
  return [heading];
}
