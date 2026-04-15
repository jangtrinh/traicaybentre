"use client";

import { useEffect, useRef } from "react";

interface TikTokEmbedProps {
  videoId: string;
  username: string;
}

export function TikTokEmbed({ videoId, username }: TikTokEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load TikTok embed.js if not already loaded
    const scriptId = "tiktok-embed-js";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.tiktokEmbed) {
      // Script already loaded — re-process new embeds
      window.tiktokEmbed.lib.render();
    }
  }, [videoId]);

  const videoUrl = `https://www.tiktok.com/@${username}/video/${videoId}`;

  return (
    <div ref={containerRef} className="flex justify-center">
      <blockquote
        className="tiktok-embed"
        cite={videoUrl}
        data-video-id={videoId}
        style={{ maxWidth: "100%", minWidth: 300 }}
      >
        <section>
          <a target="_blank" href={`https://www.tiktok.com/@${username}`}>
            @{username}
          </a>
        </section>
      </blockquote>
    </div>
  );
}

// Type augmentation for TikTok embed global
declare global {
  interface Window {
    tiktokEmbed?: { lib: { render: () => void } };
  }
}
