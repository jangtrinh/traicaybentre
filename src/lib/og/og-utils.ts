import { readFileSync } from "fs";
import { join } from "path";

export const OG = {
  width: 1200,
  height: 630,
  bg: "#FDDE24",
  text: "#1F2937",
  textMuted: "#6B7280",
  mango: "#F97316",
  white: "#FFFFFF",
} as const;

export function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 1) + "…";
}

const imageCache = new Map<string, string>();

/** Load image from public/ as base64 data URI for Satori embedding */
export function loadImageBase64(relativePath: string): string {
  if (!imageCache.has(relativePath)) {
    const abs = join(process.cwd(), "public", relativePath);
    const buf = readFileSync(abs);
    const ext = relativePath.split(".").pop() ?? "png";
    const mime = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : `image/${ext}`;
    imageCache.set(relativePath, `data:${mime};base64,${buf.toString("base64")}`);
  }
  return imageCache.get(relativePath)!;
}
