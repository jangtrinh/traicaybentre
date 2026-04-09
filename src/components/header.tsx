"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Xoài Tứ Quý", href: "/xoai-tu-quy" },
    { label: "Giá hôm nay", href: "/gia-xoai-hom-nay" },
    { label: "Nguồn gốc", href: "/nguon-goc" },
    { label: "Kiến thức", href: "/kien-thuc" },
    { label: "Tin tức", href: "/tin-tuc" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "px-4 pt-3 sm:px-8" : "px-5"
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "h-14 max-w-[800px] rounded-full bg-white/90 px-4 shadow-lg backdrop-blur-md"
            : "h-[72px] max-w-[1440px] bg-transparent xl:h-[96px]"
        }`}
      >
        {/* Logo — shrinks when scrolled */}
        <a href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Vựa Trái Cây Bến Tre"
            width={160}
            height={64}
            className={`w-auto transition-all duration-500 ${
              scrolled ? "h-8" : "h-14 xl:h-16"
            }`}
            priority
          />
          <span
            className={`font-heading font-bold uppercase tracking-wider text-text transition-all duration-500 ${
              scrolled ? "text-xs" : "text-sm xl:text-base"
            }`}
          >
            Trái Cây Bến Tre
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-text/70 transition-colors hover:bg-text/5 hover:text-text`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            className="ml-1 flex h-8 items-center justify-center rounded-full bg-black px-5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-text transition-colors"
          >
            Liên hệ
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black lg:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="white" strokeWidth="1.67" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}
