import { OG, BRAND_NAME, getFontFamily } from "./og-utils";

/** Shared OG image base — gradient bg, mango accent bar, brand mark bottom-right */
export function OgBaseLayout({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const ff = getFontFamily(locale);
  return (
    <div
      style={{
        width: OG.width,
        height: OG.height,
        display: "flex",
        flexDirection: "row",
        background: `linear-gradient(135deg, ${OG.colors.brand} 0%, ${OG.colors.brandCream} 100%)`,
        fontFamily: ff,
      }}
    >
      {/* Mango accent bar left */}
      <div
        style={{
          width: 8,
          height: OG.height,
          background: OG.colors.mango,
          flexShrink: 0,
        }}
      />

      {/* Content area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: OG.pad,
          justifyContent: "space-between",
        }}
      >
        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {children}
        </div>

        {/* Brand mark bottom-right */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 28 }}>🥭</span>
          <span
            style={{
              fontSize: 20,
              color: OG.colors.textSecondary,
              fontFamily: ff,
            }}
          >
            {BRAND_NAME[locale] ?? BRAND_NAME.vi}
          </span>
        </div>
      </div>
    </div>
  );
}
