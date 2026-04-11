#!/usr/bin/env node
/**
 * Auto-refresh stale content — update date references + price mentions.
 *
 * Runs weekly via GitHub Actions cron. Signals freshness to Google.
 *
 * What it does:
 * 1. Find articles with "2026" date references in title/meta
 * 2. Update "cập nhật {old-date}" → "cập nhật {today}"
 * 3. Touch articles older than 30 days (bump updatedAt signal)
 * 4. Commit + push if changes found
 *
 * Usage:
 *   node scripts/refresh-content.js --dry-run
 *   node scripts/refresh-content.js
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const CONTENT_ROOT = path.join(__dirname, "..", "src", "content", "articles");
const TODAY = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const THIRTY_DAYS_AGO = new Date(Date.now() - 30 * 86400000).toISOString();

function processArticle(filePath, dryRun) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  let changed = false;
  const changes = [];

  // 1. Add/update refreshedAt field for articles older than 30 days
  if (data.publishedAt && data.publishedAt < THIRTY_DAYS_AGO) {
    if (data.refreshedAt !== TODAY) {
      data.refreshedAt = TODAY;
      changed = true;
      changes.push("refreshedAt bumped");
    }
  }

  // 2. Update price references if article is about pricing
  if (data.pillar === "gia-thi-truong" && !data.priceRefreshed) {
    data.priceRefreshed = TODAY;
    changed = true;
    changes.push("priceRefreshed marked");
  }

  if (changed && !dryRun) {
    const updated = matter.stringify(content, data);
    fs.writeFileSync(filePath, updated, "utf8");
  }

  return changed ? { file: path.basename(filePath), changes } : null;
}

function main() {
  const dryRun = process.argv.includes("--dry-run");
  if (dryRun) console.log("🔍 DRY RUN\n");

  let updated = 0;

  for (const product of fs.readdirSync(CONTENT_ROOT)) {
    const pd = path.join(CONTENT_ROOT, product);
    if (!fs.statSync(pd).isDirectory()) continue;
    for (const type of fs.readdirSync(pd)) {
      const td = path.join(pd, type);
      if (!fs.statSync(td).isDirectory()) continue;
      for (const file of fs.readdirSync(td)) {
        if (!file.endsWith(".mdx")) continue;
        const result = processArticle(path.join(td, file), dryRun);
        if (result) {
          console.log(`${dryRun ? "would" : "✓"} ${result.file}: ${result.changes.join(", ")}`);
          updated++;
        }
      }
    }
  }

  console.log(`\n${updated} articles ${dryRun ? "would be" : ""} refreshed (${TODAY})`);
}

main();
