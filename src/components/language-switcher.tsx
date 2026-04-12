"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_CONFIG: Record<string, { flag: string; label: string }> = {
  vi: { flag: "🇻🇳", label: "Tiếng Việt" },
  en: { flag: "🇬🇧", label: "English" },
  ko: { flag: "🇰🇷", label: "한국어" },
  ja: { flag: "🇯🇵", label: "日本語" },
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Switch language"
        className="flex items-center gap-1.5 rounded-full border border-text/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-text/70 transition-colors hover:bg-text/5 hover:text-text"
      >
        {/* Globe icon */}
        <svg
          width="13"
          height="13"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="8" cy="8" r="6.5" />
          <path d="M8 1.5C8 1.5 5.5 4 5.5 8s2.5 6.5 2.5 6.5M8 1.5C8 1.5 10.5 4 10.5 8S8 14.5 8 14.5" />
          <path d="M1.5 8h13" />
        </svg>
        {locale.toUpperCase()}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 min-w-[148px] rounded-xl bg-white py-1 shadow-lg ring-1 ring-black/5">
          {routing.locales.map((loc) => {
            const { flag, label } = LOCALE_CONFIG[loc];
            const isActive = loc === locale;
            return (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`flex w-full items-center gap-2 px-4 py-2 text-xs transition-colors hover:bg-text/5 ${
                  isActive ? "bg-text/5 font-bold text-text" : "font-medium text-text/70"
                }`}
              >
                <span>{flag}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
