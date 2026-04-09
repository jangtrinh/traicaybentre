"use client";

import { useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavLink = { label: string; href: string };

type MobileMenuOverlayProps = {
  open: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  /** Ref của hamburger button — để return focus khi đóng menu */
  hamburgerRef: RefObject<HTMLButtonElement | null>;
};

/**
 * Fullscreen mobile menu overlay.
 *
 * Encapsulate toàn bộ side-effects của menu:
 * - Body scroll lock iOS-safe (position:fixed + restore scrollY)
 * - ESC key → đóng
 * - Auto-close khi pathname đổi (Next client nav, browser back)
 * - Focus management: focus first nav link khi mở, return hamburger khi đóng
 * - `inert` attribute khi đóng → remove khỏi tab order + a11y tree
 *
 * Yêu cầu: `onClose` từ parent PHẢI stable (useCallback) — nếu không, effect lifecycle
 * sẽ re-run mỗi lần parent re-render, reset scroll lock + focus state.
 */
export function MobileMenuOverlay({
  open,
  onClose,
  navLinks,
  hamburgerRef,
}: MobileMenuOverlayProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);
  // Track pathname mới nhất để cleanup phân biệt "đóng cùng route" vs "đóng do navigate"
  const currentPathnameRef = useRef(pathname);
  currentPathnameRef.current = pathname;

  // Auto-close khi pathname đổi, skip lần mount đầu để không trigger no-op setState
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    onClose();
    // onClose đã stable qua useCallback ở parent — disable exhaustive-deps check
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Main lifecycle effect — chỉ depend vào [open] để không re-run khi parent re-render
  useEffect(() => {
    if (!open) return;

    // --- iOS Safari-safe scroll lock ---
    const scrollY = window.scrollY;
    const openedAtPathname = currentPathnameRef.current;
    const body = document.body;
    const prevStyle = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";

    // --- ESC handler ---
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    // --- Focus first nav link sau khi stagger animation bắt đầu ---
    // (link đầu tiên có transitionDelay 150ms; focus sớm hơn một chút cho responsive feel)
    const focusTimer = window.setTimeout(() => {
      const firstLink =
        containerRef.current?.querySelector<HTMLAnchorElement>("a[href]");
      firstLink?.focus();
    }, 200);

    return () => {
      // Restore body styles
      body.style.position = prevStyle.position;
      body.style.top = prevStyle.top;
      body.style.width = prevStyle.width;
      body.style.overflow = prevStyle.overflow;

      // H1 fix: chỉ scrollTo restore nếu đóng menu TRONG CÙNG route
      // Nếu user đóng do navigate sang trang khác, trang mới nên bắt đầu ở top
      if (currentPathnameRef.current === openedAtPathname) {
        window.scrollTo(0, scrollY);
      }

      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);

      // Return focus về hamburger button
      hamburgerRef.current?.focus();
    };
    // onClose stable qua useCallback ở parent; hamburgerRef object stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div
      ref={containerRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu điều hướng"
      aria-hidden={!open}
      inert={!open}
      className={`fixed inset-0 z-40 bg-brand lg:hidden transition-opacity duration-300 ease-out ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className="flex h-full flex-col px-5 pb-8 pt-28"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nav links — large display typography + stagger fade-in */}
        <nav className="flex flex-col gap-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              style={{
                transitionDelay: open ? `${150 + i * 60}ms` : "0ms",
              }}
              className={`font-heading text-4xl font-semibold uppercase tracking-wide text-text transition-all duration-500 ease-out sm:text-5xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text ${
                open
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Liên hệ dưới cùng */}
        <Link
          href="/#contact"
          onClick={onClose}
          style={{
            transitionDelay: open ? `${150 + navLinks.length * 60}ms` : "0ms",
          }}
          className={`mt-auto flex h-14 items-center justify-center rounded-full bg-black text-sm font-semibold uppercase tracking-wider text-white transition-all duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text ${
            open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Liên hệ
        </Link>
      </div>
    </div>
  );
}
