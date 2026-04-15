interface TikTokEmbedProps {
  videoId: string;
  username?: string;
}

export function TikTokEmbed({ videoId }: TikTokEmbedProps) {
  return (
    <div className="mx-auto aspect-[9/16] w-full max-w-[325px]">
      <iframe
        src={`https://www.tiktok.com/player/v1/${videoId}?music_info=0&description=0`}
        className="h-full w-full rounded-2xl"
        allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        allowFullScreen
        title={`TikTok video ${videoId}`}
      />
    </div>
  );
}
