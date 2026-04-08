"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CaretDown } from "@phosphor-icons/react";
import { FadeIn } from "./fade-in";

const HERO_IMAGES = [
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
    <div className="relative aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-3xl shadow-2xl">
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

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col bg-brand px-5 pt-28 pb-24">
      <div className="relative z-10 mx-auto my-auto grid w-full max-w-[1440px] items-center gap-12 lg:grid-cols-2">
        {/* Left — massive display text */}
        <div className="px-0 md:pl-10">
          <FadeIn>
            <h1 className="font-heading text-[40px] font-semibold uppercase leading-[1.15] text-text sm:text-5xl md:text-6xl lg:text-7xl">
              Ngọt Đậm
              <br />
              Vị Mặn Nhẹ
              <br />
              Cuối Lưỡi
            </h1>
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

        {/* Right — rotating image carousel */}
        <FadeIn delay={0.1} className="hidden justify-center lg:flex">
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
