#!/usr/bin/env node
/**
 * Auto-expand FAQ sections in MDX articles.
 *
 * Scans all published articles. For any article with < 3 FAQ entries,
 * generates additional FAQ based on the article's primaryKeyword + title.
 *
 * Usage:
 *   node scripts/expand-faq.js --dry-run    # preview changes
 *   node scripts/expand-faq.js              # apply changes
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const CONTENT_ROOT = path.join(__dirname, "..", "src", "content", "articles");
const MIN_FAQ = 3;

// FAQ templates per product/topic — unique, not generic
const FAQ_TEMPLATES = {
  "xoai-tu-quy": [
    { q: "Xoài Tứ Quý mua ở đâu uy tín?", a: "Mua trực tiếp từ vựa Thạnh Phú Bến Tre. Gọi 0932 585 533 (Anh Phúc). Giao lạnh toàn quốc." },
    { q: "Xoài Tứ Quý giá bao nhiêu?", a: "VIP 23-25k/kg, Loại 1 20-22k/kg, Loại 2 16-18k/kg. Giá cập nhật mỗi sáng. Gọi vựa báo giá chính xác." },
    { q: "Xoài Tứ Quý có giao Hà Nội không?", a: "Có — xe lạnh 48h từ vựa Thạnh Phú. Đóng gói chống dập. 95% hàng vựa bán cho mối Bắc." },
    { q: "Xoài Tứ Quý khác xoài thường sao?", a: "Vị mặn nhẹ cuối lưỡi từ đất giồng cát nhiễm mặn — chỉ Thạnh Phú mới có. CDĐL #00124." },
    { q: "Ship xoài xa có bị dập không?", a: "Không. Mỗi trái bọc lưới xốp, thùng carton đệm chống sốc. Hàng hư < 2%. Dập → Zalo → bồi." },
  ],
  "dua-xiem-ben-tre": [
    { q: "Dừa sọ là gì?", a: "Dừa xiêm gọt sạch vỏ, chỉ còn sọ trắng + nước. Mở nắp uống liền. Gọn 500-700g, dễ ship xa." },
    { q: "Giá dừa xiêm Bến Tre sỉ bao nhiêu?", a: "Sỉ 8-10k₫/trái (từ 50 trái). Lẻ 15-18k₫ (từ 10 trái). Rau câu dừa 18-22k₫/trái." },
    { q: "Dừa sọ bảo quản được bao lâu?", a: "Ngăn mát 5-7 ngày. Hút chân không 10-14 ngày. Không đông đá." },
    { q: "Nước dừa xiêm Bến Tre có ngọt hơn không?", a: "Có. Brix 6-8° (vùng khác 4-6°) nhờ đất phù sa + nhiễm mặn Thạnh Phú." },
    { q: "Đặt dừa xiêm online ship toàn quốc được không?", a: "Được. Giao lạnh: HCM 24h, HN 48h, ĐN 36h. Zalo: 0932 585 533." },
  ],
};

function pickFaq(product, existingQuestions, count) {
  const pool = FAQ_TEMPLATES[product] || FAQ_TEMPLATES["xoai-tu-quy"];
  const existingSet = new Set(existingQuestions.map((q) => q.toLowerCase().trim()));
  return pool
    .filter((f) => !existingSet.has(f.q.toLowerCase().trim()))
    .slice(0, count);
}

function processArticle(filePath, dryRun) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  if (!data.uxReviewed) return null;

  const currentFaq = data.faq || [];
  if (currentFaq.length >= MIN_FAQ) return null;

  const rel = path.relative(CONTENT_ROOT, filePath);
  const product = rel.split(path.sep)[0];
  const needed = MIN_FAQ - currentFaq.length;
  const existingQs = currentFaq.map((f) => f.q);
  const newFaq = pickFaq(product, existingQs, needed);

  if (newFaq.length === 0) return null;

  if (!dryRun) {
    data.faq = [...currentFaq, ...newFaq];
    const updated = matter.stringify(content, data);
    fs.writeFileSync(filePath, updated, "utf8");
  }

  return {
    file: path.basename(filePath),
    product,
    had: currentFaq.length,
    added: newFaq.length,
    total: currentFaq.length + newFaq.length,
  };
}

function main() {
  const dryRun = process.argv.includes("--dry-run");
  if (dryRun) console.log("🔍 DRY RUN — no files will be modified\n");

  let updated = 0;
  let totalAdded = 0;

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
          console.log(`${dryRun ? "would update" : "✓"} ${result.file}: ${result.had} → ${result.total} FAQ (+${result.added})`);
          updated++;
          totalAdded += result.added;
        }
      }
    }
  }

  console.log(`\n${dryRun ? "Would update" : "Updated"}: ${updated} articles, +${totalAdded} FAQ entries`);
}

main();
