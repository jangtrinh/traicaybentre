"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/**
 * Auto-rotating image carousel with crossfade + dot indicators.
 * Reusable across all sections.
 */
export function ImageCarousel({
  images,
  interval = 4000,
  height = "h-[250px] sm:h-[350px]",
  className = "",
}: {
  images: { src: string; alt: string }[];
  interval?: number;
  height?: string;
  className?: string;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={`relative overflow-hidden rounded-3xl ${height} ${className}`}>
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ảnh ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
