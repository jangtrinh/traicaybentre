#!/usr/bin/env node
/**
 * Daily price snapshot: bump price-data.ts lastUpdated + write MDX snapshot article.
 *
 * Usage:
 *   node scripts/daily-price-snapshot.js             # apply changes
 *   node scripts/daily-price-snapshot.js --dry-run   # preview, no writes
 *
 * No API key required — pure template substitution.
 *
 * Exit codes:
 *   0 — success
 *   1 — unexpected error (missing files, bad JSON, etc.)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PRICES_PATH = path.join(ROOT, 'data', 'daily-prices.json');
const TEMPLATE_PATH = path.join(ROOT, 'prompts', 'daily-price-template.md');
const PRICE_DATA_TS = path.join(ROOT, 'src', 'lib', 'price-data.ts');
const TIN_TUC_DIR = path.join(ROOT, 'src', 'content', 'articles', 'xoai-tu-quy', 'tin-tuc');

const isDryRun = process.argv.includes('--dry-run');

// --- Date helpers ---

function todayISO() {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

function parseDate(isoDate) {
  const [year, month, day] = isoDate.split('-');
  return { year, month, day };
}

/** "21/4/2026" style for Vietnamese display */
function formatDateVN(isoDate) {
  const { year, month, day } = parseDate(isoDate);
  return `${parseInt(day, 10)}/${parseInt(month, 10)}/${year}`;
}

// --- Price data helpers ---

function loadPrices() {
  const raw = fs.readFileSync(PRICES_PATH, 'utf8');
  return JSON.parse(raw);
}

/**
 * Find today's entry or fall back to most recent date.
 */
function resolveEntry(prices, today) {
  if (prices[today]) return { date: today, entry: prices[today] };

  const dates = Object.keys(prices).sort().reverse();
  if (dates.length === 0) throw new Error('daily-prices.json has no entries');

  const fallback = dates[0];
  console.warn(`[warn] No entry for ${today} — using most recent: ${fallback}`);
  return { date: fallback, entry: prices[fallback] };
}

function formatRange(min, max) {
  return `${(min / 1000).toFixed(0)}.000–${(max / 1000).toFixed(0)}.000`;
}

// --- price-data.ts update ---

function bumpPriceDataTs(entry, today) {
  let src = fs.readFileSync(PRICE_DATA_TS, 'utf8');

  // Bump lastUpdated
  src = src.replace(
    /lastUpdated:\s*"[^"]*"/,
    `lastUpdated: "${today}"`
  );

  // Bump VIP tier
  src = src.replace(
    /(sku:\s*"xoai-tu-quy-vip"[\s\S]*?priceRange:\s*")[^"]*"/,
    `$1${formatRange(entry.vipMin, entry.vipMax)}"`
  );
  src = src.replace(
    /(sku:\s*"xoai-tu-quy-vip"[\s\S]*?priceMin:\s*)\d+/,
    `$1${entry.vipMin}`
  );
  src = src.replace(
    /(sku:\s*"xoai-tu-quy-vip"[\s\S]*?priceMax:\s*)\d+/,
    `$1${entry.vipMax}`
  );

  // Bump Loại 1 tier
  src = src.replace(
    /(sku:\s*"xoai-tu-quy-loai-1"[\s\S]*?priceRange:\s*")[^"]*"/,
    `$1${formatRange(entry.loai1Min, entry.loai1Max)}"`
  );
  src = src.replace(
    /(sku:\s*"xoai-tu-quy-loai-1"[\s\S]*?priceMin:\s*)\d+/,
    `$1${entry.loai1Min}`
  );
  src = src.replace(
    /(sku:\s*"xoai-tu-quy-loai-1"[\s\S]*?priceMax:\s*)\d+/,
    `$1${entry.loai1Max}`
  );

  // Bump Loại 2 tier
  src = src.replace(
    /(sku:\s*"xoai-tu-quy-loai-2"[\s\S]*?priceRange:\s*")[^"]*"/,
    `$1${formatRange(entry.loai2Min, entry.loai2Max)}"`
  );
  src = src.replace(
    /(sku:\s*"xoai-tu-quy-loai-2"[\s\S]*?priceMin:\s*)\d+/,
    `$1${entry.loai2Min}`
  );
  src = src.replace(
    /(sku:\s*"xoai-tu-quy-loai-2"[\s\S]*?priceMax:\s*)\d+/,
    `$1${entry.loai2Max}`
  );

  return src;
}

// --- MDX generation ---

function buildMdx(template, entry, isoDate) {
  const dateVN = formatDateVN(isoDate);

  return template
    .replace(/\{date\}/g, isoDate)
    .replace(/\{dateVN\}/g, dateVN)
    .replace(/\{vipRange\}/g, formatRange(entry.vipMin, entry.vipMax))
    .replace(/\{loai1Range\}/g, formatRange(entry.loai1Min, entry.loai1Max))
    .replace(/\{loai2Range\}/g, formatRange(entry.loai2Min, entry.loai2Max))
    .replace(/\{note\}/g, entry.note || 'Giá ổn định theo thị trường')
    .replace(/\{weather\}/g, entry.weather || 'Thời tiết bình thường');
}

function getSnapshotPath(isoDate) {
  const { day, year } = parseDate(isoDate);
  // Match existing pattern: gia-xoai-tu-quy-{DD}-{YYYY}.mdx
  return path.join(TIN_TUC_DIR, `gia-xoai-tu-quy-${parseInt(day, 10)}-${year}.mdx`);
}

// --- Main ---

function main() {
  const today = todayISO();
  console.log(`Running daily price snapshot for ${today}${isDryRun ? ' [dry-run]' : ''}`);

  // Load data
  const prices = loadPrices();
  const { date: entryDate, entry } = resolveEntry(prices, today);

  console.log(`Using price entry from: ${entryDate}`);
  console.log(`VIP: ${formatRange(entry.vipMin, entry.vipMax)}đ/kg`);
  console.log(`Loại 1: ${formatRange(entry.loai1Min, entry.loai1Max)}đ/kg`);
  console.log(`Loại 2: ${formatRange(entry.loai2Min, entry.loai2Max)}đ/kg`);
  console.log(`Note: ${entry.note}`);

  // Load template
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  // Generate MDX
  const mdx = buildMdx(template, entry, today);
  const snapshotPath = getSnapshotPath(today);

  console.log(`Snapshot path: ${path.relative(ROOT, snapshotPath)}`);

  // Update price-data.ts
  const updatedTs = bumpPriceDataTs(entry, today);
  const tsChanged = updatedTs !== fs.readFileSync(PRICE_DATA_TS, 'utf8');

  if (isDryRun) {
    console.log('[dry-run] Would write snapshot MDX to:', path.relative(ROOT, snapshotPath));
    console.log('[dry-run] price-data.ts would be updated:', tsChanged ? 'yes' : 'no change');
    console.log('[dry-run] MDX preview (first 300 chars):');
    console.log(mdx.slice(0, 300) + '...');
    return;
  }

  // Write MDX snapshot (idempotent — overwrite OK)
  fs.mkdirSync(TIN_TUC_DIR, { recursive: true });
  fs.writeFileSync(snapshotPath, mdx + '\n', 'utf8');
  console.log(`Written snapshot: ${path.relative(ROOT, snapshotPath)}`);

  // Write price-data.ts
  if (tsChanged) {
    fs.writeFileSync(PRICE_DATA_TS, updatedTs, 'utf8');
    console.log(`Updated price-data.ts lastUpdated → ${today}`);
  } else {
    console.log('price-data.ts already up to date — no change');
  }

  console.log('Done.');
}

try {
  main();
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
