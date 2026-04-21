#!/usr/bin/env node
/**
 * Weekly rank tracker — check traicaybentre.com positions via SerpAPI.
 *
 * Usage:
 *   node scripts/rank-tracker.js             # live SerpAPI calls
 *   node scripts/rank-tracker.js --dry-run   # mock responses, no API calls
 *
 * Env vars:
 *   SERPAPI_KEY  — required (unless --dry-run)
 *
 * Output:
 *   plans/reports/rank-tracker-{YYMMDD}.md
 *
 * Exit codes:
 *   0 — success
 *   1 — missing SERPAPI_KEY (non dry-run), file system error, fetch error
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.join(__dirname, '..');
const TRACKED_KW_PATH = path.join(ROOT, 'data', 'tracked-keywords.json');
const REPORTS_DIR = path.join(ROOT, 'plans', 'reports');
const TARGET_DOMAIN = 'traicaybentre.com';

const isDryRun = process.argv.includes('--dry-run');

// --- Date helpers ---

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

function toReportDateStamp(isoDate) {
  // YYMMDD format
  return isoDate.replace(/-/g, '').slice(2);
}

// --- HTTP helper ---

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`SerpAPI returned HTTP ${res.statusCode}: ${data.slice(0, 200)}`));
          return;
        }
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse SerpAPI response: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

// --- SerpAPI ---

function buildSerpApiUrl(keyword, apiKey) {
  const params = new URLSearchParams({
    q: keyword,
    engine: 'google',
    google_domain: 'google.com.vn',
    gl: 'vn',
    hl: 'vi',
    num: '100',
    api_key: apiKey,
  });
  return `https://serpapi.com/search?${params.toString()}`;
}

function findPositionInResults(organicResults) {
  if (!Array.isArray(organicResults)) return null;
  for (let i = 0; i < organicResults.length; i++) {
    const result = organicResults[i];
    const url = (result.link || result.url || '').toLowerCase();
    if (url.includes(TARGET_DOMAIN)) {
      return {
        position: i + 1,
        url: result.link || result.url || '',
        snippet: (result.snippet || '').slice(0, 100),
      };
    }
  }
  return null;
}

function mockSerpResponse(keyword, index) {
  // Simulate some keywords ranking and some not
  const mockPositions = [3, 7, 12, 25, 45, null, 8, 2, 18, null];
  const pos = mockPositions[index % mockPositions.length];
  if (!pos) return { organic_results: [] };

  const results = [];
  for (let i = 1; i <= 100; i++) {
    if (i === pos) {
      results.push({
        position: i,
        link: `https://${TARGET_DOMAIN}/xoai-tu-quy/kien-thuc/${keyword.replace(/\s+/g, '-').replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a').replace(/[èéẹẻẽêềếệểễ]/g, 'e').replace(/[ìíịỉĩ]/g, 'i').replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o').replace(/[ùúụủũưừứựửữ]/g, 'u').replace(/[ỳýỵỷỹ]/g, 'y').replace(/[đ]/g, 'd')}`,
        snippet: `Hướng dẫn chi tiết về ${keyword} từ vựa Phúc Giang Bến Tre. Thông tin chính xác, cập nhật mới nhất.`,
      });
    } else {
      results.push({
        position: i,
        link: `https://example-competitor-${i}.com/page-${i}`,
        snippet: `Result ${i} for ${keyword}`,
      });
    }
  }
  return { organic_results: results };
}

// --- Previous report parser ---

function loadPreviousReport() {
  if (!fs.existsSync(REPORTS_DIR)) return {};

  const files = fs.readdirSync(REPORTS_DIR)
    .filter((f) => f.startsWith('rank-tracker-') && f.endsWith('.md'))
    .sort()
    .reverse();

  if (files.length === 0) return {};

  const prevPath = path.join(REPORTS_DIR, files[0]);
  const content = fs.readFileSync(prevPath, 'utf8');
  const prevPositions = {};

  // Parse table rows: | keyword | position | ...
  const tableRowRe = /^\|\s*([^|]+?)\s*\|\s*(\d+|—)\s*\|/gm;
  let match;
  while ((match = tableRowRe.exec(content)) !== null) {
    const kw = match[1].trim();
    const pos = match[2].trim();
    if (kw && kw !== 'Keyword' && kw !== '---') {
      prevPositions[kw] = pos === '—' ? null : parseInt(pos, 10);
    }
  }

  return prevPositions;
}

// --- Report builder ---

function formatDelta(current, previous) {
  if (current === null && previous === null) return '—';
  if (current === null && previous !== null) return `▼ (dropped out)`;
  if (current !== null && previous === null) return `▲ (new entry)`;
  const delta = previous - current; // positive = improved (lower position number = better)
  if (delta === 0) return '0';
  return delta > 0 ? `▲ ${delta}` : `▼ ${Math.abs(delta)}`;
}

function buildReport(results, today) {
  const dateVN = today.split('-').reverse().join('/');
  const ranked = results.filter((r) => r.position !== null);
  const notRanked = results.filter((r) => r.position === null);

  const top3 = ranked.filter((r) => r.position <= 3).length;
  const top10 = ranked.filter((r) => r.position <= 10).length;
  const top20 = ranked.filter((r) => r.position <= 20).length;
  const avgPos = ranked.length > 0
    ? (ranked.reduce((sum, r) => sum + r.position, 0) / ranked.length).toFixed(1)
    : 'N/A';

  const sortedResults = [...results].sort((a, b) => {
    if (a.position === null && b.position === null) return 0;
    if (a.position === null) return 1;
    if (b.position === null) return -1;
    return a.position - b.position;
  });

  const tableRows = sortedResults.map((r) => {
    const pos = r.position !== null ? r.position : '—';
    const delta = formatDelta(r.position, r.prevPosition);
    const url = r.url ? r.url.replace('https://traicaybentre.com', '') : '—';
    const snippet = r.snippet ? r.snippet.slice(0, 80).replace(/\|/g, '\\|') : '—';
    return `| ${r.keyword} | ${pos} | ${delta} | ${url} | ${snippet} |`;
  });

  return `# Rank Tracker Report — ${dateVN}

**Domain:** ${TARGET_DOMAIN}
**Keywords tracked:** ${results.length}
**Generated:** ${today}

## Summary

| Metric | Value |
|--------|-------|
| Top 3 | ${top3} |
| Top 10 | ${top10} |
| Top 20 | ${top20} |
| Not in top 100 | ${notRanked.length} |
| Avg position (ranked only) | ${avgPos} |

## Keyword Positions

| Keyword | Pos | Δ | URL | Snippet |
|---------|-----|---|-----|---------|
${tableRows.join('\n')}

---
*Report generated by scripts/rank-tracker.js*
`;
}

// --- Main ---

async function main() {
  const today = todayISO();
  const dateStamp = toReportDateStamp(today);
  const reportPath = path.join(REPORTS_DIR, `rank-tracker-${dateStamp}.md`);

  console.log(`Running rank tracker for ${today}${isDryRun ? ' [dry-run]' : ''}`);

  // Check API key early (not dry-run)
  const apiKey = process.env.SERPAPI_KEY;
  if (!isDryRun && !apiKey) {
    console.error(
      'Error: SERPAPI_KEY environment variable is not set.\n' +
      'Get your free API key at: https://serpapi.com/manage-api-key\n' +
      'Add it as a GitHub secret named SERPAPI_KEY.\n' +
      'Run with --dry-run to test without an API key.'
    );
    process.exit(1);
  }

  // Load keywords
  const { keywords } = JSON.parse(fs.readFileSync(TRACKED_KW_PATH, 'utf8'));
  console.log(`Tracking ${keywords.length} keywords`);

  // Load previous report for delta computation
  const prevPositions = loadPreviousReport();
  const hasPrev = Object.keys(prevPositions).length > 0;
  if (!hasPrev) {
    console.log('No previous report found — delta column will show "new entry" for all ranked KW');
  }

  // Query SerpAPI for each keyword
  const results = [];
  for (let i = 0; i < keywords.length; i++) {
    const kw = keywords[i];
    process.stdout.write(`[${i + 1}/${keywords.length}] "${kw}" ... `);

    let serpData;
    if (isDryRun) {
      serpData = mockSerpResponse(kw, i);
    } else {
      try {
        const url = buildSerpApiUrl(kw, apiKey);
        serpData = await fetchJson(url);
        // Rate limit: 1 request per second to stay within SerpAPI limits
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (err) {
        console.error(`\nFailed to fetch for "${kw}": ${err.message}`);
        process.exit(1);
      }
    }

    const found = findPositionInResults(serpData.organic_results);
    const prevPos = prevPositions[kw] !== undefined ? prevPositions[kw] : null;

    results.push({
      keyword: kw,
      position: found ? found.position : null,
      url: found ? found.url : null,
      snippet: found ? found.snippet : null,
      prevPosition: prevPos,
    });

    console.log(found ? `pos ${found.position}` : 'not found');
  }

  // Build and write report
  const report = buildReport(results, today);

  if (isDryRun) {
    console.log('\n[dry-run] Report preview (first 500 chars):');
    console.log(report.slice(0, 500) + '\n...');
    console.log(`[dry-run] Would write to: ${path.relative(ROOT, reportPath)}`);
    return;
  }

  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  fs.writeFileSync(reportPath, report, 'utf8');
  console.log(`\nReport written to: ${path.relative(ROOT, reportPath)}`);

  // Print summary
  const ranked = results.filter((r) => r.position !== null);
  console.log(`Summary: ${ranked.length}/${results.length} keywords ranked in top 100`);
  console.log(`Top 3: ${ranked.filter((r) => r.position <= 3).length}`);
  console.log(`Top 10: ${ranked.filter((r) => r.position <= 10).length}`);
}

main().catch((err) => {
  console.error(`Unexpected error: ${err.message}`);
  process.exit(1);
});
