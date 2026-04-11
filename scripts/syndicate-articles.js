#!/usr/bin/env node
/**
 * Syndicate MDX articles to Dev.to + Hashnode + Blogger.
 *
 * Usage:
 *   node scripts/syndicate-articles.js src/content/articles/xoai-tu-quy/kien-thuc/slug.mdx
 *   node scripts/syndicate-articles.js --all   # syndicate all published articles
 *
 * Env vars required:
 *   DEVTO_API_KEY       — Dev.to API key
 *   HASHNODE_PAT        — Hashnode personal access token
 *   HASHNODE_PUB_ID     — Hashnode publication ID
 *   BLOGGER_BLOG_ID     — Blogger blog ID (optional)
 *   BLOGGER_ACCESS_TOKEN — Google OAuth access token (optional)
 *
 * Each platform post includes canonical_url pointing back to traicaybentre.com
 * so Google treats our site as the original source.
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

  // Derive product/type/slug from path
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
    publishedAt: data.publishedAt,
    uxReviewed: data.uxReviewed,
    filePath: absPath,
  };
}

function loadAllPublished() {
  const articles = [];
  if (!fs.existsSync(CONTENT_ROOT)) return articles;

  for (const product of fs.readdirSync(CONTENT_ROOT)) {
    const productDir = path.join(CONTENT_ROOT, product);
    if (!fs.statSync(productDir).isDirectory()) continue;
    for (const type of fs.readdirSync(productDir)) {
      const typeDir = path.join(productDir, type);
      if (!fs.statSync(typeDir).isDirectory()) continue;
      for (const file of fs.readdirSync(typeDir)) {
        if (!file.endsWith(".mdx")) continue;
        try {
          const article = loadArticle(path.join(typeDir, file));
          if (article.uxReviewed) articles.push(article);
        } catch (e) {
          console.warn(`⚠ Skip ${file}: ${e.message}`);
        }
      }
    }
  }
  return articles;
}

// ─────────────────────────────────────────────────────────────────────
// Dev.to
// ─────────────────────────────────────────────────────────────────────

async function publishToDevTo(article) {
  const apiKey = process.env.DEVTO_API_KEY;
  if (!apiKey) { console.log("⏭ Dev.to: DEVTO_API_KEY not set, skipping"); return; }

  const tags = ["vietnam", "food", "agriculture", "bentre"]
    .slice(0, 4); // Dev.to max 4 tags

  const body = `*Bài gốc: [${article.title}](${article.canonicalUrl})*\n\n${article.body}\n\n---\n*Nguồn: [Trái Cây Bến Tre](${SITE_URL})*`;

  const res = await fetch("https://dev.to/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      article: {
        title: article.title,
        body_markdown: body,
        canonical_url: article.canonicalUrl,
        tags,
        published: true,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`✗ Dev.to FAIL: ${res.status} ${err}`);
    return;
  }

  const data = await res.json();
  console.log(`✓ Dev.to: ${data.url}`);
}

// ─────────────────────────────────────────────────────────────────────
// Hashnode
// ─────────────────────────────────────────────────────────────────────

async function publishToHashnode(article) {
  const pat = process.env.HASHNODE_PAT;
  const pubId = process.env.HASHNODE_PUB_ID;
  if (!pat || !pubId) { console.log("⏭ Hashnode: PAT/PUB_ID not set, skipping"); return; }

  const mutation = `
    mutation PublishPost($input: PublishPostInput!) {
      publishPost(input: $input) {
        post { id slug url }
      }
    }
  `;

  const contentMarkdown = `*Bài gốc: [${article.title}](${article.canonicalUrl})*\n\n${article.body}\n\n---\n*Nguồn: [Trái Cây Bến Tre](${SITE_URL})*`;

  const res = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: pat,
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        input: {
          title: article.title,
          contentMarkdown,
          publicationId: pubId,
          originalArticleURL: article.canonicalUrl,
          tags: [{ slug: "food", name: "Food" }, { slug: "vietnam", name: "Vietnam" }],
        },
      },
    }),
  });

  const data = await res.json();
  if (data.errors) {
    console.error(`✗ Hashnode FAIL:`, data.errors[0]?.message);
    return;
  }
  console.log(`✓ Hashnode: ${data.data?.publishPost?.post?.url || "published"}`);
}

// ─────────────────────────────────────────────────────────────────────
// Blogger (optional)
// ─────────────────────────────────────────────────────────────────────

async function publishToBlogger(article) {
  const blogId = process.env.BLOGGER_BLOG_ID;
  const token = process.env.BLOGGER_ACCESS_TOKEN;
  if (!blogId || !token) { console.log("⏭ Blogger: BLOG_ID/TOKEN not set, skipping"); return; }

  // Convert markdown to basic HTML (simple conversion)
  const htmlContent = article.body
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/\n\n/g, "</p><p>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>");

  const content = `<p><em>Bài gốc: <a href="${article.canonicalUrl}" rel="canonical">${article.title}</a></em></p>${htmlContent}<hr/><p><em>Nguồn: <a href="${SITE_URL}">Trái Cây Bến Tre</a></em></p>`;

  const res = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: article.title, content }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error(`✗ Blogger FAIL: ${res.status} ${err}`);
    return;
  }

  const data = await res.json();
  console.log(`✓ Blogger: ${data.url}`);
}

// ─────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────

async function syndicateArticle(article) {
  console.log(`\n📄 ${article.title}`);
  console.log(`   canonical: ${article.canonicalUrl}`);
  await publishToDevTo(article);
  await publishToHashnode(article);
  await publishToBlogger(article);
}

async function main() {
  const args = process.argv.slice(2);

  let articles;
  if (args.includes("--all")) {
    articles = loadAllPublished();
    console.log(`Found ${articles.length} published articles`);
  } else if (args.length > 0) {
    articles = args
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => loadArticle(f));
  } else {
    console.log("Usage: node syndicate-articles.js --all | <file1.mdx> [file2.mdx ...]");
    process.exit(1);
  }

  console.log(`\n🚀 Syndicating ${articles.length} articles to Dev.to + Hashnode + Blogger\n`);

  for (const article of articles) {
    await syndicateArticle(article);
  }

  console.log(`\n✅ Done — ${articles.length} articles syndicated`);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
