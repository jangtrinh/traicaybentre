"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const XOAI_HERO_IMAGES = [
  { src: "/images/xoai-thuc-te/xoai-tu-quy-vip-cuong-la-tay-cam.jpg", alt: "Xoài Tứ Quý VIP — trái to còn cuống lá tươi, tay cầm tại vựa" },
  { src: "/images/xoai-thuc-te/xoai-tu-quy-bo-thit-vang-cam.jpg", alt: "Xoài Tứ Quý bổ ra thịt vàng cam — 3 trái chín mọng" },
  { src: "/images/xoai-thuc-te/xoai-hoang-kim-ro-tre-01.jpg", alt: "Xoài Tứ Quý hoàng kim chín vàng trong rổ tre" },
  { src: "/images/xoai-thuc-te/xoai-tu-quy-boc-luoi-foam-la.jpg", alt: "Xoài Tứ Quý VIP bọc lưới foam — đóng gói cẩn thận tại vựa" },
  { src: "/images/xoai-thuc-te/vua-xoai-hoat-dong-ban-ngay-01.jpg", alt: "Vựa xoài Thạnh Phú — đội ngũ phân loại và đóng gói" },
];

/** Rotating image carousel for xoai-tu-quy product page hero */
export function XoaiHeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % XOAI_HERO_IMAGES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-[4/3] w-full max-w-[420px] overflow-hidden rounded-3xl shadow-2xl md:aspect-[4/5]">
      {XOAI_HERO_IMAGES.map((img, i) => (
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
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {XOAI_HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Xem ảnh ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === current
                ? "w-6 bg-white/80"
                : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
