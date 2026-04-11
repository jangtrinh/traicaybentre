"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type MouseEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenuOverlay, type NavLink } from "./mobile-menu-overlay";

const NAV_LINKS: NavLink[] = [
  { label: "Hoàng Kim", href: "/xoai-hoang-kim" },
  { label: "Xoài Tứ Quý", href: "/xoai-tu-quy" },
  { label: "Dừa Xiêm", href: "/dua-xiem-ben-tre" },
  { label: "Nguồn gốc", href: "/nguon-goc" },
  { label: "Kiến thức", href: "/kien-thuc" },
  { label: "Tin tức", href: "/tin-tuc" },
];

// Links ẩn vào menu "···" khi compact pill (scrolled)
const PRIMARY_LINKS = NAV_LINKS.slice(0, 3);
const MORE_LINKS = NAV_LINKS.slice(3);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Đóng dropdown "More" khi click ngoài
  useEffect(() => {
    if (!moreOpen) return;
    const handler = (e: Event) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [moreOpen]);

  // Đóng "More" khi chuyển sang trạng thái không compact
  useEffect(() => {
    if (!scrolled) setMoreOpen(false);
  }, [scrolled]);

  // Khi menu mở, force "không scrolled" để pill trắng không xuất hiện trên bg-brand
  const pillVisible = scrolled && !menuOpen;

  // M3 — same-route hash nav: scroll smooth; skip guard nếu modifier/non-left click
  // để user vẫn mở được tab mới với cmd/ctrl+click
  const handleHashNav = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const [route, hash] = href.split("#");
    if (!hash || route !== pathname) return; // để Next Link xử lý cross-route
    e.preventDefault();
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <MobileMenuOverlay
        open={menuOpen}
        onClose={closeMenu}
        navLinks={NAV_LINKS}
        hamburgerRef={hamburgerRef}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          pillVisible ? "px-4 pt-3 sm:px-8" : "px-5"
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-500 ${
            pillVisible
              ? "h-14 max-w-[800px] rounded-full bg-white/90 px-4 shadow-lg backdrop-blur-md"
              : "h-[72px] max-w-[1440px] bg-transparent xl:h-[96px]"
          }`}
        >
          {/* Logo — cố định vị trí khi đóng/mở menu */}
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <Image
              src="/images/logo.png"
              alt="Vựa Trái Cây Bến Tre"
              width={160}
              height={64}
              className={`w-auto transition-all duration-500 ${
                pillVisible ? "h-8" : "h-14 xl:h-16"
              }`}
              priority
            />
            <span
              className={`font-heading font-bold uppercase tracking-wider text-text transition-all duration-500 ${
                pillVisible ? "text-xs" : "text-sm xl:text-base"
              }`}
            >
              Trái Cây Bến Tre
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {(pillVisible ? PRIMARY_LINKS : NAV_LINKS).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleHashNav(e, link.href)}
                className="rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-text/70 transition-colors hover:bg-text/5 hover:text-text"
              >
                {link.label}
              </Link>
            ))}

            {/* "···" dropdown — chỉ hiện khi compact pill */}
            {pillVisible && (
              <div ref={moreRef} className="relative">
                <button
                  onClick={() => setMoreOpen((v) => !v)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-text/70 transition-colors hover:bg-text/5 hover:text-text"
                  aria-label="Thêm"
                  aria-expanded={moreOpen}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="3" cy="8" r="1.5" />
                    <circle cx="8" cy="8" r="1.5" />
                    <circle cx="13" cy="8" r="1.5" />
                  </svg>
                </button>
                {moreOpen && (
                  <div className="absolute right-0 top-full mt-2 min-w-[140px] rounded-xl bg-white py-1 shadow-lg ring-1 ring-black/5">
                    {MORE_LINKS.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setMoreOpen(false)}
                        className="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-text/70 transition-colors hover:bg-text/5 hover:text-text"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            <Link
              href="/#contact"
              onClick={(e) => handleHashNav(e, "/#contact")}
              className="ml-1 flex h-8 items-center justify-center rounded-full bg-black px-5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-text transition-colors"
            >
              Liên hệ
            </Link>
          </nav>

          {/* Mobile hamburger/close — toggle tại chỗ, icon morph */}
          <button
            ref={hamburgerRef}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-black lg:hidden"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {/* Hamburger — hiện khi đóng, xoay + fade out khi mở */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              className={`absolute transition-all duration-300 ease-out ${
                menuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
            >
              <path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="white"
                strokeWidth="1.67"
                strokeLinecap="round"
              />
            </svg>
            {/* Close (X) — hiện khi mở, xoay + fade in */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              className={`absolute transition-all duration-300 ease-out ${
                menuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`}
            >
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="white"
                strokeWidth="1.67"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
