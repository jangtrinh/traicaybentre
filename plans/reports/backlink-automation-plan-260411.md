---
type: backlink-automation
date: 2026-04-11
slug: backlink-automation-plan
---

# Backlink Automation Plan — 100% Programmatic

## Golden Strategy: MDX → Multi-Platform Syndication via GitHub Actions

**Insight:** Site đã có 94+ MDX articles. Mỗi bài auto-syndicate lên 3 platform = 3 backlinks (canonical URL trỏ về traicaybentre.com). 94 × 3 = **282 backlinks** white-hat.

**Flow:**
```
MDX article merged to main
  → GitHub Actions trigger
    → Publish to Dev.to (REST API)
    → Publish to Hashnode (GraphQL)
    → Publish to Blogger (Google API)
  → Each post has canonical_url = traicaybentre.com/{article}
  → Google treats traicaybentre.com as original source
```

## Tier 1: Fully Automatable (code once, run forever)

### 1. Dev.to API ✅
- **Auth:** API key (Settings → Extensions → Generate)
- **Endpoint:** `POST https://dev.to/api/articles`
- **Link type:** Canonical URL (dofollow on profile, nofollow in body)
- **Cost:** Free
- **Rate limit:** 10 req/sec
- **Setup:** 2 hours
```javascript
// publish-to-devto.js
const axios = require('axios');
async function publishToDevTo(article) {
  return axios.post('https://dev.to/api/articles', {
    article: {
      title: article.title,
      body_markdown: article.body,
      canonical_url: `https://www.traicaybentre.com${article.urlPath}`,
      tags: ['vietnam', 'agriculture', 'food'],
      published: true
    }
  }, {
    headers: { 'api-key': process.env.DEVTO_API_KEY }
  });
}
```

### 2. Hashnode GraphQL API ✅
- **Auth:** Personal Access Token (Settings → Developer)
- **Endpoint:** `https://gql.hashnode.com`
- **Link type:** Canonical URL (dofollow)
- **Cost:** Free
- **Rate limit:** Generous
- **Setup:** 3 hours
```javascript
// publish-to-hashnode.js
const query = `
  mutation PublishPost($input: PublishPostInput!) {
    publishPost(input: $input) {
      post { id slug url }
    }
  }
`;
const variables = {
  input: {
    title: article.title,
    contentMarkdown: article.body,
    publicationId: process.env.HASHNODE_PUB_ID,
    originalArticleURL: `https://www.traicaybentre.com${article.urlPath}`,
    tags: [{ slug: "food", name: "Food" }]
  }
};
```

### 3. Blogger/Blogspot API ✅
- **Auth:** Google OAuth 2.0 (refresh token in GitHub Secrets)
- **Endpoint:** `POST https://www.googleapis.com/blogger/v3/blogs/{blogId}/posts`
- **Link type:** Dofollow (blogspot.com subdomain)
- **Cost:** Free
- **Setup:** 4 hours (OAuth token dance)
```javascript
// publish-to-blogger.js
const { google } = require('googleapis');
const blogger = google.blogger({ version: 'v3', auth: oauth2Client });
await blogger.posts.insert({
  blogId: process.env.BLOGGER_ID,
  requestBody: {
    title: article.title,
    content: `<p>Bài gốc: <a href="https://www.traicaybentre.com${article.urlPath}" rel="canonical">${article.title}</a></p>${htmlContent}`
  }
});
```

### 4. GitHub Pages / GitHub Profile ✅
- **Auth:** `gh` CLI (already authenticated)
- **Method:** Create repo `traicaybentre-blog` with README linking to main site
- **Link type:** Dofollow (github.com DA 100)
- **Cost:** Free
- **Setup:** 30 minutes
```bash
gh repo create traicaybentre-blog --public \
  --description "Vựa Trái Cây Bến Tre — Xoài Tứ Quý CDĐL #00124 + Dừa Xiêm" \
  --homepage "https://www.traicaybentre.com"
```

### 5. Google Business Profile API ✅
- **Auth:** Google Cloud OAuth 2.0 + My Business API enabled
- **npm:** `googleapis`
- **Link type:** Dofollow (google.com DA 100)
- **Cost:** Free
- **Setup:** 3 hours (GCP project + OAuth + verify business)
- **One-time:** Create/update listing with website URL
- **Ongoing:** Post updates (new products, events) with links

### 6. npm Package Homepage ✅
- **Method:** Create tiny open-source package (e.g. `vietnamese-fruit-seasons`)
- **Homepage field:** `https://www.traicaybentre.com`
- **Link type:** Dofollow (npmjs.com DA 95)
- **Cost:** Free
- **Setup:** 1 hour
```bash
mkdir vietnamese-fruit-seasons && cd $_
npm init -y # set homepage to traicaybentre.com
# publish minimal utility package
npm publish
```

## Tier 2: One-Time Script (run once, permanent links)

### 7. Directory Submissions (Puppeteer script)
- **Target:** 20-30 high-DA directories from verified lists
- **Method:** Puppeteer script auto-fills forms (name, address, phone, URL, description)
- **Risk:** Captchas may block. Script brittle.
- **Estimated links:** 15-25 (some will review + approve within 1-4 weeks)
- **Effort:** 6 hours scripting, expect 60% success rate
- **Key directories:** yellowpages.vn, hotfrog.vn, jasmine-directory.com, web-directory-sites.org, abilogic.com

### 8. Social Profile Links (one-time setup)
- **Facebook Page:** About → Website field (nofollow but trust signal)
- **YouTube channel:** About → Links (nofollow)
- **TikTok business:** Bio link (nofollow)
- **Zalo Official Account:** Profile link
- **Pinterest:** Profile website field (dofollow!)
- **Effort:** 1 hour manual setup, permanent links

## Tier 3: Not Automatable / Deprecated

| Platform | Reason |
|---|---|
| Medium API | No new integration tokens since 2023 (deprecated) |
| LinkedIn API | Heavily restricted, automated posts throttled |
| Reddit API | Strict self-promotion rules, subreddit bans |
| Twitter/X API | Elevated access required, expensive |

**Medium workaround:** Publish to Dev.to first → use Medium's "Import a Story" (manual, but sets canonical).

## GitHub Actions Workflow (THE KEY AUTOMATION)

```yaml
# .github/workflows/syndicate-articles.yml
name: Syndicate MDX articles to Dev.to + Hashnode + Blogger

on:
  push:
    branches: [main]
    paths: ['src/content/articles/**/*.mdx']

jobs:
  syndicate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2  # need diff against previous commit

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Find new/changed MDX articles
        id: changed
        run: |
          CHANGED=$(git diff --name-only HEAD~1 HEAD -- 'src/content/articles/**/*.mdx')
          echo "files=$CHANGED" >> $GITHUB_OUTPUT

      - name: Install dependencies
        if: steps.changed.outputs.files != ''
        run: npm install gray-matter axios

      - name: Publish to Dev.to + Hashnode
        if: steps.changed.outputs.files != ''
        env:
          DEVTO_API_KEY: ${{ secrets.DEVTO_API_KEY }}
          HASHNODE_PAT: ${{ secrets.HASHNODE_PAT }}
          HASHNODE_PUB_ID: ${{ secrets.HASHNODE_PUB_ID }}
          BLOGGER_REFRESH_TOKEN: ${{ secrets.BLOGGER_REFRESH_TOKEN }}
        run: node scripts/syndicate-articles.js ${{ steps.changed.outputs.files }}
```

## Estimated Backlink Yield

| Source | Links per article | Total (94 articles) | DA estimate | Type |
|---|---|---|---|---|
| Dev.to | 1 (canonical) | 94 | 50-60 | Canonical |
| Hashnode | 1 (canonical) | 94 | 40-50 | Canonical |
| Blogger | 1 (dofollow) | 94 | 30-40 | Dofollow |
| GitHub repo | 1 (homepage) | 1 | 100 | Dofollow |
| npm package | 1 (homepage) | 1 | 95 | Dofollow |
| Google Business | 1 (listing) | 1 | 100 | Dofollow |
| Directories (20) | 1 each | 20 | 20-60 | Mixed |
| Social profiles (5) | 1 each | 5 | 50-95 | Nofollow |
| **TOTAL** | | **~310 links** | | |

## Action Items (Priority Order)

| # | Action | Effort | Automation level | Links |
|---|---|---|---|---|
| 1 | Create GitHub repo `traicaybentre-blog` | 10 min | 100% CLI | 1 |
| 2 | Create npm package `vietnamese-fruit-seasons` | 1 hr | 100% CLI | 1 |
| 3 | Setup Dev.to account + API key | 15 min | Manual setup → auto after | ∞ |
| 4 | Setup Hashnode publication + PAT | 15 min | Manual setup → auto after | ∞ |
| 5 | Create Blogger blog + OAuth token | 1 hr | Manual setup → auto after | ∞ |
| 6 | Write `scripts/syndicate-articles.js` | 3 hr | Code | - |
| 7 | Write GitHub Actions workflow | 1 hr | Code | - |
| 8 | Setup Google Business Profile | 1 hr | Manual + API verify | 1 |
| 9 | Social profile links | 1 hr | Manual (one-time) | 5 |
| 10 | Directory submission script | 6 hr | Semi-auto (Puppeteer) | 15-25 |

**Total setup effort:** ~15 hours one-time
**Ongoing effort:** 0 (GitHub Actions runs on every push)
**Expected backlinks:** 300+ over 30 days

## Unresolved

1. Dev.to account: anh đã có chưa?
2. Hashnode: tạo publication name gì? (suggest: "Trái Cây Bến Tre Blog")
3. Blogger: tạo blog tên gì? (suggest: "traicaybentre.blogspot.com")
4. npm package: utility function gì bên trong? (suggest: Vietnamese fruit seasonality data — useful, not spam)
5. Google Business: đã verify ownership chưa?

Sources:
- [Dev.to Publishing API 2026](https://dev.to/ankitg12/publishing-to-devto-programmatically-in-2026-what-actually-works-2nkd)
- [Cross-Publishing GitHub Actions Pipeline](https://dev.to/navinvarma/blog-syndication-cross-publishing-blog-posts-to-devto-hashnode-and-medium-1a5d)
- [Hashnode GraphQL API](https://dev.to/retrorom/automating-hashnode-with-graphql-getting-api-publishing-working-3eg9)
- [GitHub Actions Multi-Platform Blog](https://earezki.com/ai-news/2026-03-18-github-actions-/)
- [Google Business Profile API](https://developers.google.com/my-business)
- [8 Backlink APIs 2026](https://sheetsformarketers.com/marketing-apis/backlink-apis/)
- [Free Directory Sites 2026](https://collaborator.pro/blog/free-backlinks)
- [Medium API Deprecated](https://github.com/Medium/medium-api-docs)
