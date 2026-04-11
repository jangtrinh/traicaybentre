/**
 * RSS 2.0 feed — auto-generated from MDX articles + legacy articles.
 * Consumed by feed readers, aggregators, and auto-discovery.
 *
 * GET /feed.xml
 */
import { getAllPublishedArticles } from "@/lib/articles";
import { KNOWLEDGE_ARTICLES } from "@/lib/knowledge-data";
import { BLOG_POSTS } from "@/lib/blog-data";

export const dynamic = "force-static";
export const revalidate = 3600;

const SITE = "https://www.traicaybentre.com";
const TITLE = "Trái Cây Bến Tre — Vựa Đặc Sản Thạnh Phú";
const DESC =
  "Xoài Tứ Quý CDĐL #00124 + Dừa Xiêm Bến Tre. Kiến thức, tin tức, công thức, giá sỉ.";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const mdxArticles = getAllPublishedArticles().map((a) => ({
    title: a.frontmatter.title,
    link: `${SITE}${a.urlPath}`,
    description: a.frontmatter.metaDescription,
    pubDate: new Date(a.frontmatter.publishedAt).toUTCString(),
  }));

  const legacyKnowledge = KNOWLEDGE_ARTICLES.map((a) => ({
    title: a.title,
    link: `${SITE}/kien-thuc/${a.slug}`,
    description: a.description,
    pubDate: new Date(a.date).toUTCString(),
  }));

  const legacyBlog = BLOG_POSTS.map((p) => ({
    title: p.title,
    link: `${SITE}/tin-tuc/${p.slug}`,
    description: p.description,
    pubDate: new Date(p.date).toUTCString(),
  }));

  const items = [...mdxArticles, ...legacyKnowledge, ...legacyBlog]
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    .slice(0, 100);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(TITLE)}</title>
    <link>${SITE}</link>
    <description>${escapeXml(DESC)}</description>
    <language>vi</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
${items
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${item.link}</guid>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
