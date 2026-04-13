"use client";

/* === Share buttons for articles ===
 * Shares current page to Facebook, Zalo, X (Twitter), Telegram, Messenger.
 * Includes native Web Share API on mobile + copy-to-clipboard fallback.
 * Uses window.location at runtime so it works on any deployed URL.
 */

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { BrandIcon } from "./brand-icon";

interface ShareButtonsProps {
  title: string;
  /** Optional override; defaults to window.location.href at runtime. */
  url?: string;
  /** Controls spacing/divider styling. "top" = before content, "bottom" = after. */
  placement?: "top" | "bottom";
}

type ShareTarget = {
  name: string;
  label: string;
  buildHref: (url: string, title: string) => string;
  bg: string;
  icon: React.ReactNode;
};

// Icons facebook/zalo/messenger/telegram already include their own brand
// background + white glyph baked into the SVG. Render them at full button size
// with no extra wrapper background. X is a bare black glyph only — invert it
// to white and place on a black circle.
const TARGETS: ShareTarget[] = [
  {
    name: "facebook",
    label: "Chia sẻ lên Facebook",
    buildHref: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
    bg: "",
    icon: <BrandIcon brand="facebook" size={40} />,
  },
  {
    // Zalo: only monochrome SVG available (Iconify simple-icons), so we render
    // a white glyph on the brand-blue circle button.
    name: "zalo",
    label: "Chia sẻ lên Zalo",
    buildHref: (u) => `https://zalo.me/share?url=${encodeURIComponent(u)}`,
    bg: "bg-[#0068FF] hover:bg-[#0055d4]",
    icon: <BrandIcon brand="zalo" size={20} />,
  },
  {
    name: "messenger",
    label: "Chia sẻ qua Messenger",
    buildHref: (u) =>
      `https://www.facebook.com/dialog/send?link=${encodeURIComponent(u)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(u)}`,
    bg: "",
    icon: <BrandIcon brand="messenger" size={40} />,
  },
  {
    name: "x",
    label: "Chia sẻ lên X",
    buildHref: (u, t) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
    bg: "bg-black hover:bg-neutral-800",
    icon: <BrandIcon brand="x" size={18} className="brightness-0 invert" />,
  },
  {
    name: "telegram",
    label: "Chia sẻ lên Telegram",
    buildHref: (u, t) =>
      `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
    bg: "",
    icon: <BrandIcon brand="telegram" size={40} />,
  },
];

export function ShareButtons({ title, url, placement = "bottom" }: ShareButtonsProps) {
  const t = useTranslations("shareButtons");
  const [currentUrl, setCurrentUrl] = useState(url ?? "");
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
    if (typeof navigator !== "undefined" && "share" in navigator) {
      setCanNativeShare(true);
    }
  }, [url]);

  const openPopup = (href: string) => {
    if (typeof window === "undefined") return;
    const w = 600;
    const h = 540;
    const left = window.screenX + (window.innerWidth - w) / 2;
    const top = window.screenY + (window.innerHeight - h) / 2;
    window.open(
      href,
      "share-dialog",
      `width=${w},height=${h},left=${left},top=${top},noopener,noreferrer`,
    );
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — ignore silently
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, url: currentUrl });
    } catch {
      // user cancelled or unsupported — ignore
    }
  };

  const wrapperClass =
    placement === "top"
      ? "mb-8 border-b border-text/10 pb-6"
      : "mt-8 border-t border-text/10 pt-6";

  // Build translated labels map — TARGETS is module-level, labels come from i18n
  const labelMap: Record<string, string> = {
    facebook: t("facebook"),
    zalo: t("zalo"),
    messenger: t("messenger"),
    x: t("x"),
    telegram: t("telegram"),
  };

  return (
    <div className={wrapperClass}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-text/60">{t("shareLabel")}</span>

        {TARGETS.map((target) => {
          const label = labelMap[target.name] ?? target.label;
          return (
            <button
              key={target.name}
              type="button"
              onClick={() => openPopup(target.buildHref(currentUrl, title))}
              aria-label={label}
              title={label}
              className={`flex h-10 w-10 items-center justify-center overflow-hidden rounded-full text-white transition-transform hover:scale-110 ${target.bg}`}
            >
              {target.icon}
            </button>
          );
        })}

        <button
          type="button"
          onClick={handleCopy}
          aria-label={t("copyLink")}
          title={t("copyLink")}
          className="flex h-10 items-center gap-2 rounded-full border-2 border-text/15 bg-white px-4 text-sm font-semibold text-text/70 transition-colors hover:border-text hover:text-text"
        >
          <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {copied ? t("copied") : t("copyLink")}
        </button>

        {canNativeShare && (
          <button
            type="button"
            onClick={handleNativeShare}
            aria-label={t("nativeShare")}
            title={t("nativeShare")}
            className="flex h-10 items-center gap-2 rounded-full border-2 border-text/15 bg-white px-4 text-sm font-semibold text-text/70 transition-colors hover:border-text hover:text-text sm:hidden"
          >
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            {t("shareOther")}
          </button>
        )}
      </div>
    </div>
  );
}
