#!/usr/bin/env node
/**
 * Shared AEO validator for auto-generated MDX articles.
 *
 * Used by: generate-daily-article.js
 *
 * Usage (module):
 *   const { validateAeo } = require('./validate-aeo');
 *   const result = validateAeo(mdxString, frontmatter);
 *   // result: { ok: true, warnings: [] } or throws Error on hard failure
 *
 * Hard failures (throws): missing TL;DR, no question H2, < 3 FAQ, missing required fields, word count out of range
 * Warnings (non-throwing): word count near limits, soft style issues
 */

const QUESTION_WORDS = [
  'Vì sao', 'Cách', 'Bao nhiêu', 'Khi nào', 'Có nên',
  'Làm sao', 'Như thế nào', 'Là gì', 'Tại sao', 'Nên', 'Có thể',
];

const REQUIRED_FRONTMATTER_FIELDS = ['title', 'description', 'pubDate', 'author', 'image', 'faq'];
// Also accept common aliases used in this project
const REQUIRED_FRONTMATTER_ALIASES = {
  description: ['metaDescription'],
  pubDate: ['publishedAt'],
  image: ['ogImage'],
};

const WORD_COUNT_MIN = 800;
const WORD_COUNT_MAX = 2500;
const FAQ_MIN = 3;

/**
 * Count words in a Vietnamese/mixed string.
 * Splits on whitespace — adequate for CJK-adjacent scripts.
 */
function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Strip frontmatter block from MDX string, return body only.
 */
function stripFrontmatter(mdx) {
  if (!mdx.startsWith('---')) return mdx;
  const end = mdx.indexOf('---', 3);
  if (end === -1) return mdx;
  return mdx.slice(end + 3).trim();
}

/**
 * Check if a frontmatter field exists, accounting for aliases.
 * @param {Record<string, unknown>} fm
 * @param {string} field
 */
function hasFrontmatterField(fm, field) {
  if (fm[field] !== undefined && fm[field] !== null && fm[field] !== '') return true;
  const aliases = REQUIRED_FRONTMATTER_ALIASES[field];
  if (!aliases) return false;
  return aliases.some((alias) => fm[alias] !== undefined && fm[alias] !== null && fm[alias] !== '');
}

/**
 * Validate MDX content for AEO compliance.
 *
 * @param {string} mdxString - Full MDX content (with or without frontmatter)
 * @param {Record<string, unknown>} frontmatter - Parsed frontmatter object
 * @returns {{ ok: true, warnings: string[] }}
 * @throws {Error} on any hard validation failure
 */
function validateAeo(mdxString, frontmatter) {
  const warnings = [];
  const body = stripFrontmatter(mdxString);

  // --- Word count ---
  const wordCount = countWords(body);
  if (wordCount < WORD_COUNT_MIN) {
    throw new Error(`Word count too low: ${wordCount} words (minimum ${WORD_COUNT_MIN})`);
  }
  if (wordCount > WORD_COUNT_MAX) {
    throw new Error(`Word count too high: ${wordCount} words (maximum ${WORD_COUNT_MAX})`);
  }
  if (wordCount < WORD_COUNT_MIN + 100) {
    warnings.push(`Word count ${wordCount} is close to minimum (${WORD_COUNT_MIN})`);
  }

  // --- TL;DR block ---
  const hasTldr =
    />\s*\*\*Trả lời nhanh:/i.test(body) ||
    /^##\s+TL;DR/im.test(body) ||
    /^>\s*\*\*TL;DR/im.test(body);
  if (!hasTldr) {
    throw new Error('Missing TL;DR block (expected "> **Trả lời nhanh:** ..." or "## TL;DR")');
  }

  // --- At least one question-word H2 ---
  const h2Lines = body.match(/^##\s+.+$/gm) || [];
  const hasQuestionH2 = h2Lines.some((line) =>
    QUESTION_WORDS.some((qw) => line.replace(/^##\s+/, '').startsWith(qw))
  );
  if (!hasQuestionH2) {
    throw new Error(
      `No H2 starting with a question word. Expected one of: ${QUESTION_WORDS.join(', ')}`
    );
  }

  // --- FAQ frontmatter ---
  const faq = frontmatter.faq;
  if (!faq) {
    throw new Error('Missing faq field in frontmatter');
  }
  if (!Array.isArray(faq)) {
    throw new Error('faq frontmatter must be an array');
  }
  if (faq.length < FAQ_MIN) {
    throw new Error(`FAQ has ${faq.length} entries — minimum is ${FAQ_MIN}`);
  }
  // Validate each FAQ entry has q and a
  faq.forEach((entry, i) => {
    if (!entry.q || !entry.a) {
      throw new Error(`FAQ entry ${i + 1} is missing "q" or "a" field`);
    }
  });

  // --- Required frontmatter fields ---
  const missingFields = REQUIRED_FRONTMATTER_FIELDS.filter(
    (field) => !hasFrontmatterField(frontmatter, field)
  );
  if (missingFields.length > 0) {
    throw new Error(`Missing required frontmatter fields: ${missingFields.join(', ')}`);
  }

  return { ok: true, warnings };
}

module.exports = { validateAeo };
