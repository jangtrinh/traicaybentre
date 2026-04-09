"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CaretDown } from "@phosphor-icons/react";
import { FadeIn } from "./fade-in";

// Phrases rotate trong h1 — mỗi phrase là 3 dòng tạo nên 1 thông điệp
// Phrase đầu là SEO anchor (giữ nguyên "Ngọt Đậm / Vị Mặn Nhẹ / Cuối Lưỡi")
const HERO_PHRASES: [string, string, string][] = [
  ["Ngọt Đậm", "Vị Mặn Nhẹ", "Cuối Lưỡi"],
  ["Đất Giồng Cát", "Ven Biển", "Thạnh Phú"],
  ["Hái Lúc Sáng", "Giao Tận Nơi", "Trong 24h"],
  ["CDĐL #00124", "Chỉ Dẫn", "Địa Lý Riêng"],
];

const HERO_IMAGES = [
  { src: "/images/vua-khai-truong.jpg", alt: "Vựa Trái Cây Bến Tre — ngày khai trương tại xã Đại Điền, Thạnh Phú" },
  { src: "/images/xoai-real-2.jpg", alt: "Xoài Tứ Quý — tay cầm quả lớn tại vựa" },
  { src: "/images/xoai-real-7.jpg", alt: "Rổ xoài xanh tươi mới hái — close-up" },
  { src: "/images/xoai-real-3.jpg", alt: "Xoài Tứ Quý quả to, vựa đóng hàng" },
  { src: "/images/xoai-real-5.jpg", alt: "Hàng trăm ký xoài trong rổ — chuẩn bị giao" },
  { src: "/images/xoai-real-4.jpg", alt: "Xoài Tứ Quý quả dài, tay cầm" },
  { src: "/images/xoai-real-6.jpg", alt: "Rổ xoài xanh — thùng xốp chuẩn bị đóng gói" },
];

function HeroImageCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-[4/3] w-full max-w-[520px] overflow-hidden rounded-3xl shadow-2xl md:aspect-[4/5]">
      {HERO_IMAGES.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          priority={i === 0}
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Xem ảnh ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === current
                ? "w-6 bg-text/80"
                : "w-2 bg-text/25 hover:bg-text/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function RotatingHeroTitle() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % HERO_PHRASES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    // min-h [3.45em] = 3 dòng × leading 1.15 → giữ chiều cao cố định, không layout shift
    <h1
      className="relative min-h-[3.45em] font-heading text-[40px] font-semibold uppercase leading-[1.15] text-text sm:text-5xl md:text-6xl lg:text-7xl"
      aria-live="polite"
    >
      {HERO_PHRASES.map((phrase, i) => {
        const isActive = i === phraseIndex;
        return (
          <span
            key={i}
            aria-hidden={!isActive}
            className={`absolute inset-0 block transition-all duration-700 ease-out ${
              isActive
                ? "opacity-100 translate-y-0 blur-0"
                : "opacity-0 -translate-y-3 blur-sm"
            }`}
          >
            {phrase[0]}
            <br />
            {phrase[1]}
            <br />
            {phrase[2]}
          </span>
        );
      })}
    </h1>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col bg-brand px-5 pt-28 pb-24">
      <div className="relative z-10 mx-auto my-auto grid w-full max-w-[1440px] items-center gap-12 lg:grid-cols-2">
        {/* Left — massive display text */}
        <div className="px-0 md:pl-10">
          <FadeIn>
            <RotatingHeroTitle />
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="mt-8 max-w-[485px] text-lg leading-7 text-text/70 lg:text-xl">
              Xoài Tứ Quý đặc sản Thạnh Phú, Bến Tre — trồng trên đất giồng
              cát ven biển nhiễm mặn tự nhiên, tạo nên hương vị không đâu có.
            </p>
            <p className="mt-4 max-w-[485px] text-lg leading-7 text-text/70 lg:text-xl">
              Hái sáng tại vườn, giao lạnh 24h ra Hà Nội.
              <br />
              Giá cập nhật mỗi ngày — <strong className="text-text">gọi vựa để có giá chính xác</strong>.
            </p>
          </FadeIn>
        </div>

        {/* Right — rotating image carousel (stack dưới text trên mobile/tablet, bên phải trên desktop) */}
        <FadeIn delay={0.1} className="flex justify-center">
          <HeroImageCarousel />
        </FadeIn>
      </div>

      {/* Scroll hint */}
      <FadeIn delay={1.2} className="relative z-10 mt-auto flex flex-col items-center pt-8">
        <span className="text-sm text-text/40">cuộn xuống</span>
        <span className="text-sm text-text/40">khám phá ngay</span>
        <button className="mt-2 flex h-11 w-11 items-center justify-center rounded-full border border-text/30">
          <CaretDown size={18} weight="bold" className="animate-bounce text-text/50" />
        </button>
      </FadeIn>
    </section>
  );
}
