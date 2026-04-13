import { ImageResponse } from "next/og";
import { getOgFonts } from "@/lib/og/og-fonts";
import { OG } from "@/lib/og/og-utils";
import { OgBaseLayout } from "@/lib/og/og-base-layout";

export const alt = "Trái Cây Bến Tre — Xoài Tứ Quý & Dừa Xiêm";
export const size = { width: OG.width, height: OG.height };
export const contentType = "image/png";
export const revalidate = 3600;

export default async function Image() {
  return new ImageResponse(
    (
      <OgBaseLayout>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 56, fontWeight: 800, color: OG.text, lineHeight: 1.1, textTransform: "uppercase" }}>
            Xoài Tứ Quý
          </div>
          <div style={{ fontSize: 56, fontWeight: 800, color: OG.mango, lineHeight: 1.1, textTransform: "uppercase" }}>
            Bến Tre
          </div>
          <div style={{ fontSize: 24, color: OG.textMuted, marginTop: 8 }}>
            Ngọt đậm · Vị mặn nhẹ · CDĐL #00124
          </div>
        </div>
      </OgBaseLayout>
    ),
    { ...size, fonts: getOgFonts() },
  );
}
