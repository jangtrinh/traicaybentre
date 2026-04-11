#!/usr/bin/env node
/**
 * Syndicate MDX articles to WordPress.com + Blogger + Tumblr.
 * Platforms chosen for food/lifestyle content relevance (not dev platforms).
 *
 * Usage:
 *   node scripts/syndicate-articles.js src/content/articles/.../slug.mdx
 *   node scripts/syndicate-articles.js --all
 *
 * Env vars (set whichever platforms you have):
 *   WORDPRESS_SITE_ID      — WordPress.com site ID or domain
 *   WORDPRESS_ACCESS_TOKEN — OAuth Bearer token
 *   BLOGGER_BLOG_ID        — Blogger blog ID
 *   BLOGGER_ACCESS_TOKEN   — Google OAuth access token
 *   TUMBLR_BLOG_NAME       — Tumblr blog name (e.g. "traicaybentre")
 *   TUMBLR_ACCESS_TOKEN    — OAuth access token
 *
 * Each post includes canonical_url → traicaybentre.com.
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const SITE_URL = "https://www.traicaybentre.com";
const CONTENT_ROOT = path.join(__dirname, "..", "src", "content", "articles");

// ─────────────────────────────────────────────────────────────────────
// Article loader
// ─────────────────────────────────────────────────────────────────────

function loadArticle(filePath) {
  const absPath = path.resolve(filePath);
  const raw = fs.readFileSync(absPath, "utf8");
  const { data, content } = matter(raw);

  const rel = path.relative(CONTENT_ROOT, absPath);
  const parts = rel.split(path.sep);
  if (parts.length < 3) throw new Error(`Invalid article path: ${filePath}`);

  const product = parts[0];
  const type = parts[1];
  const slug = path.basename(absPath, ".mdx");
  const urlPath = `/${product}/${type}/${slug}`;

  return {
    title: data.title,
    body: content,
    canonicalUrl: `${SITE_URL}${urlPath}`,
    keywords: [data.primaryKeyword, ...(data.secondaryKeywords || [])],
    uxReviewed: data.uxReviewed,
  };
}

function loadAllPublished() {
  const articles = [];
  if (!fs.existsSync(CONTENT_ROOT)) return articles;
  for (const product of fs.readdirSync(CONTENT_ROOT)) {
    const pd = path.join(CONTENT_ROOT, product);
    if (!fs.statSync(pd).isDirectory()) continue;
    for (const type of fs.readdirSync(pd)) {
      const td = path.join(pd, type);
      if (!fs.statSync(td).isDirectory()) continue;
      for (const file of fs.readdirSync(td)) {
        if (!file.endsWith(".mdx")) continue;
        try {
          const a = loadArticle(path.join(td, file));
          if (a.uxReviewed) articles.push(a);
        } catch (e) {
          console.warn(`⚠ Skip ${file}: ${e.message}`);
        }
      }
    }
  }
  return articles;
}

// ─────────────────────────────────────────────────────────────────────
// Markdown → basic HTML (for platforms that need HTML)
// ─────────────────────────────────────────────────────────────────────

function mdToHtml(md) {
  return md
    .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/\n\n/g, "</p>\n<p>")
    .replace(/^(?!<)/, "<p>")
    .replace(/(?!>)$/, "</p>");
}

function wrapContent(article, format) {
  const header = `Bài gốc: ${format === "md"
    ? `[${article.title}](${article.canonicalUrl})`
    : `<a href="${article.canonicalUrl}">${article.title}</a>`}`;
  const footer = `Nguồn: ${format === "md"
    ? `[Trái Cây Bến Tre](${SITE_URL})`
    : `<a href="${SITE_URL}">Trái Cây Bến Tre</a>`}`;

  if (format === "md") {
    return `*${header}*\n\n${article.body}\n\n---\n*${footer}*`;
  }
  return `<p><em>${header}</em></p>${mdToHtml(article.body)}<hr/><p><em>${footer}</em></p>`;
}

// ─────────────────────────────────────────────────────────────────────
// WordPress.com (REST API v1.1 — free tier)
// ─────────────────────────────────────────────────────────────────────

async function publishToWordPress(article) {
  const siteId = process.env.WORDPRESS_SITE_ID;
  const token = process.env.WORDPRESS_ACCESS_TOKEN;
  if (!siteId || !token) { console.log("  ⏭ WordPress.com: not configured"); return; }

  const res = await fetch(
    `https://public-api.wordpress.com/rest/v1.1/sites/${siteId}/posts/new`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: article.title,
        content: wrapContent(article, "html"),
        tags: article.keywords.slice(0, 5).join(","),
        status: "publish",
      }),
    }
  );

  if (!res.ok) {
    console.error(`  ✗ WordPress FAIL: ${res.status} ${await res.text()}`);
    return;
  }
  const data = await res.json();
  console.log(`  ✓ WordPress: ${data.URL}`);
}

// ─────────────────────────────────────────────────────────────────────
// Blogger (Google API v3)
// ─────────────────────────────────────────────────────────────────────

async function publishToBlogger(article) {
  const blogId = process.env.BLOGGER_BLOG_ID;
  const token = process.env.BLOGGER_ACCESS_TOKEN;
  if (!blogId || !token) { console.log("  ⏭ Blogger: not configured"); return; }

  const res = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: article.title,
        content: wrapContent(article, "html"),
      }),
    }
  );

  if (!res.ok) {
    console.error(`  ✗ Blogger FAIL: ${res.status} ${await res.text()}`);
    return;
  }
  const data = await res.json();
  console.log(`  ✓ Blogger: ${data.url}`);
}

// ─────────────────────────────────────────────────────────────────────
// Tumblr (REST API v2)
// ─────────────────────────────────────────────────────────────────────

async function publishToTumblr(article) {
  const blogName = process.env.TUMBLR_BLOG_NAME;
  const token = process.env.TUMBLR_ACCESS_TOKEN;
  if (!blogName || !token) { console.log("  ⏭ Tumblr: not configured"); return; }

  const res = await fetch(
    `https://api.tumblr.com/v2/blog/${blogName}/post`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        type: "text",
        title: article.title,
        body: wrapContent(article, "html"),
        tags: article.keywords.slice(0, 10).join(","),
        source_url: article.canonicalUrl,
        state: "published",
      }),
    }
  );

  if (!res.ok) {
    console.error(`  ✗ Tumblr FAIL: ${res.status} ${await res.text()}`);
    return;
  }
  console.log(`  ✓ Tumblr: https://${blogName}.tumblr.com`);
}

// ─────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────

async function syndicateArticle(article) {
  console.log(`\n📄 ${article.title}`);
  console.log(`   → ${article.canonicalUrl}`);
  await publishToWordPress(article);
  await publishToBlogger(article);
  await publishToTumblr(article);
}

async function main() {
  const args = process.argv.slice(2);
  let articles;

  if (args.includes("--all")) {
    articles = loadAllPublished();
    console.log(`Found ${articles.length} published articles`);
  } else if (args.length > 0) {
    articles = args.filter((f) => f.endsWith(".mdx")).map((f) => loadArticle(f));
  } else {
    console.log("Usage: node syndicate-articles.js --all | <file1.mdx> ...");
    process.exit(1);
  }

  const platforms = [
    process.env.WORDPRESS_ACCESS_TOKEN && "WordPress.com",
    process.env.BLOGGER_ACCESS_TOKEN && "Blogger",
    process.env.TUMBLR_ACCESS_TOKEN && "Tumblr",
  ].filter(Boolean);

  if (platforms.length === 0) {
    console.log("\n⚠ No platforms configured. Set env vars:");
    console.log("  WORDPRESS_SITE_ID + WORDPRESS_ACCESS_TOKEN");
    console.log("  BLOGGER_BLOG_ID + BLOGGER_ACCESS_TOKEN");
    console.log("  TUMBLR_BLOG_NAME + TUMBLR_ACCESS_TOKEN");
    process.exit(1);
  }

  console.log(`\n🚀 Syndicating ${articles.length} articles → ${platforms.join(" + ")}\n`);

  for (const article of articles) {
    await syndicateArticle(article);
    // Rate limit: 2 sec between articles to avoid API throttle
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log(`\n✅ Done — ${articles.length} articles × ${platforms.length} platforms`);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
