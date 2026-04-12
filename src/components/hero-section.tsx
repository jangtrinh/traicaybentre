"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CaretDown } from "@phosphor-icons/react";
import { FadeIn } from "./fade-in";

const HERO_IMAGES = [
  { src: "/images/vua-khai-truong.jpg", alt: "Vựa Trái Cây Bến Tre — ngày khai trương tại xã Đại Điền, Thạnh Phú" },
  { src: "/images/xoai-thuc-te/xoai-tu-quy-bo-thit-vang-cam.jpg", alt: "Xoài Tứ Quý bổ ra thịt vàng cam — 3 trái tại vựa Thạnh Phú" },
  { src: "/images/xoai-thuc-te/vua-xoai-phan-loai-nhieu-ro.jpg", alt: "Vựa xoài Thạnh Phú — đội ngũ phân loại hàng chục rổ xoài" },
  { src: "/images/xoai-thuc-te/xoai-tu-quy-vip-cuong-la-tay-cam.jpg", alt: "Xoài Tứ Quý VIP trái to — tay cầm còn cuống lá tươi" },
  { src: "/images/xoai-thuc-te/xoai-hoang-kim-ro-tre-01.jpg", alt: "Xoài Tứ Quý hoàng kim chín vàng trong rổ tre" },
  { src: "/images/xoai-thuc-te/vua-xoai-ban-dem-khach-mua.jpg", alt: "Vựa xoài Thạnh Phú hoạt động ban đêm — khách mua sỉ" },
  { src: "/images/xoai-thuc-te/xoai-tu-quy-boc-luoi-foam-01.jpg", alt: "Xoài Tứ Quý VIP bọc lưới foam — đóng gói cẩn thận" },
  { src: "/images/xoai-real-6.jpg", alt: "Rổ xoài xanh — thùng xốp chuẩn bị đóng gói" },
];

function HeroImageCarousel() {
  const t = useTranslations("hero");
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
            aria-label={`${t("viewImage")} ${i + 1}`}
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
  const t = useTranslations("hero");
  const [phraseIndex, setPhraseIndex] = useState(0);

  // Build phrases array from translation object keys 0–3
  const HERO_PHRASES: [string, string, string][] = [0, 1, 2, 3].map((i) =>
    t.raw(`phrases.${i}`) as [string, string, string]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % HERO_PHRASES.length);
    }, 3800);
    return () => clearInterval(timer);
  // HERO_PHRASES.length is constant (4) — no need to re-run on t change
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const t = useTranslations("hero");

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
              {t("desc1")}
            </p>
            <p className="mt-4 max-w-[485px] text-lg leading-7 text-text/70 lg:text-xl">
              {t("desc2")}
              <br />
              {t("desc2Prefix")}<strong className="text-text">{t("desc2Bold")}</strong>.
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
        <span className="text-sm text-text/40">{t("scrollHint1")}</span>
        <span className="text-sm text-text/40">{t("scrollHint2")}</span>
        <button className="mt-2 flex h-11 w-11 items-center justify-center rounded-full border border-text/30">
          <CaretDown size={18} weight="bold" className="animate-bounce text-text/50" />
        </button>
      </FadeIn>
    </section>
  );
}
