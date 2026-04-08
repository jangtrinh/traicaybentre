"use client";

import { useState } from "react";
import { Play } from "@phosphor-icons/react";
import { BrandIcon } from "./brand-icon";
import { FadeIn } from "./fade-in";

interface SocialVideo {
  id: string;
  platform: "tiktok" | "facebook" | "instagram";
  embedUrl: string;
  title: string;
}

const SOCIAL_VIDEOS: SocialVideo[] = [
  {
    id: "tiktok-1",
    platform: "tiktok",
    embedUrl: "https://www.tiktok.com/embed/v2/7490599498871498017",
    title: "Thu hoạch xoài Tứ Quý tại vườn Thạnh Phú",
  },
  {
    id: "facebook-1",
    platform: "facebook",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F680323011294802&show_text=false&width=350",
    title: "Đóng thùng xoài giao miền Bắc",
  },
  {
    id: "tiktok-2",
    platform: "tiktok",
    embedUrl: "https://www.tiktok.com/embed/v2/7490599498871498017",
    title: "Vị mặn nhẹ cuối lưỡi — bí mật từ đất cát ven biển",
  },
];

const PLATFORM_LABEL: Record<string, string> = {
  tiktok: "TikTok",
  facebook: "Facebook",
  instagram: "Instagram",
};

function VideoCard({ video }: { video: SocialVideo }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
      {/* Video embed area */}
      <div className="relative aspect-[9/16] max-h-[480px] w-full bg-text/5">
        {!loaded ? (
          <button
            onClick={() => setLoaded(true)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30">
              <Play size={28} weight="fill" className="ml-1 text-white" />
            </div>
            <span className="text-sm font-medium text-text-secondary">
              Nhấn để xem video
            </span>
          </button>
        ) : (
          <iframe
            src={video.embedUrl}
            className="h-full w-full border-0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={video.title}
          />
        )}
      </div>

      {/* Info bar */}
      <div className="flex items-center gap-3 px-4 py-3">
        <BrandIcon brand={video.platform} size={24} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-text">
            {video.title}
          </p>
          <p className="text-xs text-text-muted">
            {PLATFORM_LABEL[video.platform]}
          </p>
        </div>
      </div>
    </div>
  );
}

export function SocialVideoSection() {
  return (
    <section className="bg-brand-cream px-5 py-24">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn>
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              Theo dõi chúng tôi
            </span>
            <h2 className="mt-2 font-heading text-4xl font-extrabold text-text sm:text-5xl">
              Xem thực tế từ vườn đến tay bạn
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-text-secondary">
              Video thực tế từ vườn xoài Thạnh Phú — thu hoạch, đóng gói, giao
              hàng. Không dàn dựng.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SOCIAL_VIDEOS.map((video, i) => (
            <FadeIn key={video.id} delay={i * 0.1}>
              <VideoCard video={video} />
            </FadeIn>
          ))}
        </div>

        {/* Social follow links */}
        <FadeIn delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {[
              { brand: "tiktok" as const, url: "https://tiktok.com/@xoaibentre", label: "TikTok" },
              { brand: "facebook" as const, url: "https://facebook.com/xoaituquybentre", label: "Facebook" },
              { brand: "instagram" as const, url: "https://instagram.com/xoaibentre", label: "Instagram" },
            ].map((social) => (
              <a
                key={social.brand}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text-secondary shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <BrandIcon brand={social.brand} size={18} />
                {social.label}
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
