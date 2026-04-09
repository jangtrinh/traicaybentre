/* === Homepage news section — lists latest blog posts ===
 * Shows 3 latest posts from BLOG_POSTS registry as cards.
 * Each card links to full article + a "Xem tất cả" CTA to /tin-tuc.
 */

import { ArrowRight, Newspaper } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "./fade-in";
import { BLOG_POSTS } from "@/lib/blog-data";

export function TinTucSection() {
  const latest = BLOG_POSTS.slice(0, 3);

  return (
    <section id="tin-tuc" className="bg-brand-cream px-5 py-24">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn>
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              Tin tức & báo giá
            </span>
            <h2 className="mt-3 font-heading text-4xl font-bold uppercase text-text sm:text-5xl">
              Tin mới từ vựa
            </h2>
            <p className="mt-4 text-base text-text/60">
              Báo giá tháng, món ngon từ xoài, và chuyện vựa Thạnh Phú — cập đều tay
            </p>
          </div>
        </FadeIn>

        {/* Post grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {latest.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.08}>
              <a
                href={`/tin-tuc/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex items-center gap-2">
                  <Newspaper size={18} weight="duotone" className="text-mango" />
                  <span className="text-xs font-bold uppercase tracking-wider text-mango-dark">
                    {post.category}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold leading-tight text-text">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text/60">
                  {post.description}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs text-text/40">{post.date}</span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-text group-hover:text-mango transition-colors">
                    Đọc tiếp
                    <ArrowRight
                      size={14}
                      weight="bold"
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        {/* CTA "Xem tất cả" */}
        <FadeIn delay={0.3}>
          <div className="mt-12 text-center">
            <a
              href="/tin-tuc"
              className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-text transition-colors"
            >
              Coi tất cả tin
              <ArrowRight size={16} weight="bold" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
