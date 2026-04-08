/**
 * Simple curved divider between two colored sections.
 * The SVG draws a curve of `from` color on top of whatever comes next.
 * No negative margins, no overlap tricks — just stacks naturally.
 */

const COLORS: Record<string, string> = {
  brand: "#FDDE24",
  "brand-cream": "#FFFEE7",
};

export function SectionDivider({
  from,
  to,
}: {
  from: "brand" | "brand-cream";
  to: "brand" | "brand-cream";
}) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="block w-full"
      style={{ height: "clamp(40px, 6vw, 80px)", background: COLORS[to] }}
    >
      <path d="M0,0 L1440,0 L1440,80 Q720,-40 0,80 Z" fill={COLORS[from]} />
    </svg>
  );
}
