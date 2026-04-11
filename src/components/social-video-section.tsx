import { BrandIcon } from "./brand-icon";
import { FadeIn } from "./fade-in";

interface SocialEmbed {
  id: string;
  platform: "tiktok" | "facebook" | "instagram";
  type: "video" | "post";
  embedUrl: string;
  title: string;
}

const SOCIAL_EMBEDS: SocialEmbed[] = [
  {
    id: "facebook-video-1",
    platform: "facebook",
    type: "video",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1784376475873594&show_text=false&width=350",
    title: "Video từ vườn xoài Tứ Quý",
  },
  {
    id: "facebook-video-2",
    platform: "facebook",
    type: "video",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1612250740055362&show_text=false&width=350",
    title: "Video từ vườn xoài Tứ Quý",
  },
  {
    id: "facebook-reel-3",
    platform: "facebook",
    type: "video",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1468884957889888&show_text=false&width=350",
    title: "Video từ vườn trái cây Bến Tre",
  },
  {
    id: "facebook-post-review",
    platform: "facebook",
    type: "post",
    embedUrl:
      "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fhuyenlongbien95%2Fposts%2Fpfbid02sc7aQea6ukFrNNSGwQEBNJormtLuQ9u7DunLubSyViQbCA8n9H1XtEiTPw54Pfnzl&show_text=true&width=500",
    title: "Khách review xoài Tứ Quý",
  },
  {
    id: "facebook-post-1",
    platform: "facebook",
    type: "post",
    embedUrl:
      "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0Gbu3Ea2eS6G2Mp8cExb6skGKikrsyRD8K8Gj6wR5UDvH3ByTCiUJzApzAYE7JE5ql%26id%3D61573415880985&show_text=true&width=500",
    title: "Bài viết từ Fanpage",
  },
  {
    id: "facebook-post-2",
    platform: "facebook",
    type: "post",
    embedUrl:
      "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02jheb69Gv6QWruDEVfTBoQfyT52m3njsxxJb5ECMAswE5B57Lery4gj5pdnrhbuSul%26id%3D61573415880985&show_text=true&width=500",
    title: "Bài viết từ Fanpage",
  },
  {
    id: "facebook-post-3",
    platform: "facebook",
    type: "post",
    embedUrl:
      "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02x9rZaPLXQRVtrd3fiUchw6fiQpeRybxTBhBgtry89DkJhH2yxChZecAMeATGLvSRl%26id%3D61573415880985&show_text=true&width=500",
    title: "Bài viết từ Fanpage",
  },
];

const PLATFORM_LABEL: Record<string, string> = {
  tiktok: "TikTok",
  facebook: "Facebook",
  instagram: "Instagram",
};

function EmbedCard({ embed }: { embed: SocialEmbed }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
      {/* Embed area — Facebook iframe tự render thumbnail + play button */}
      <div className="relative h-[450px] w-full bg-text/5">
        <iframe
          src={embed.embedUrl}
          className="absolute inset-0 h-full w-full border-0"
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          title={embed.title}
        />
      </div>

      {/* Info bar */}
      <div className="flex items-center gap-3 px-4 py-3">
        <BrandIcon brand={embed.platform} size={24} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-text">
            {embed.title}
          </p>
          <p className="text-xs text-text-muted">
            {PLATFORM_LABEL[embed.platform]}
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
              Vựa trên mạng xã hội
            </span>
            <h2 className="mt-2 font-heading text-4xl font-extrabold text-text sm:text-5xl">
              Coi thực tế tại vườn
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-text-secondary">
              Video quay tại vườn Thạnh Phú — thu hoạch, đóng thùng, giao hàng.
              Không dàn dựng, không filter.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SOCIAL_EMBEDS.map((embed, i) => (
            <FadeIn key={embed.id} delay={i * 0.1}>
              <EmbedCard embed={embed} />
            </FadeIn>
          ))}
        </div>

        {/* Social follow links */}
        <FadeIn delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {[
              { brand: "facebook" as const, url: "https://www.facebook.com/profile.php?id=61573415880985", label: "Facebook" },
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
