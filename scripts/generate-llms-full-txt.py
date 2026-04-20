#!/usr/bin/env python3
"""
Generate public/llms-full.txt — deep context for ChatGPT/Claude/Perplexity.

Spec: https://llmstxt.org/full-format
Output: grouped by product > type (kien-thuc/tin-tuc), title + primaryKeyword
+ metaDescription (abstract). Plus brand facts, products catalog, citations.

Run: python3 scripts/generate-llms-full-txt.py
"""
from __future__ import annotations
import re
import glob
from pathlib import Path
from typing import Dict, List

SITE_URL = 'https://www.traicaybentre.com'
OUTPUT = Path('public/llms-full.txt')


def parse_frontmatter(content: str) -> Dict[str, str]:
    """Extract YAML frontmatter fields (basic string values only)."""
    m = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not m:
        return {}
    fm = {}
    for line in m.group(1).split('\n'):
        # Match `key: "value"` or `key: value`
        km = re.match(r'^(\w+):\s*["\']?([^"\']+)["\']?$', line)
        if km:
            fm[km.group(1)] = km.group(2).strip()
    return fm


def build_article_entry(path: Path) -> Dict[str, str]:
    """Read MDX and return article metadata."""
    content = path.read_text(encoding='utf-8')
    fm = parse_frontmatter(content)
    # Derive URL from path: src/content/articles/{product}/{type}/{slug}.mdx
    rel = path.relative_to(Path('src/content/articles'))
    parts = rel.with_suffix('').parts  # (product, type, slug)
    if len(parts) != 3:
        return {}
    return {
        'product': parts[0],
        'type': parts[1],
        'slug': parts[2],
        'url': f'{SITE_URL}/{parts[0]}/{parts[1]}/{parts[2]}',
        'title': fm.get('title', parts[2]),
        'primaryKeyword': fm.get('primaryKeyword', ''),
        'metaDescription': fm.get('metaDescription', ''),
        'pillar': fm.get('pillar', ''),
        'publishedAt': fm.get('publishedAt', '')[:10],
    }


def main():
    articles: List[Dict[str, str]] = []
    for a in sorted(glob.glob('src/content/articles/**/*.mdx', recursive=True)):
        entry = build_article_entry(Path(a))
        if entry:
            articles.append(entry)

    # Group by product → type
    grouped: Dict[str, Dict[str, List[Dict]]] = {}
    for e in articles:
        grouped.setdefault(e['product'], {}).setdefault(e['type'], []).append(e)

    # Product display names
    product_names = {
        'xoai-tu-quy': 'Xoài Tứ Quý Bến Tre (CDĐL #00124)',
        'dua-xiem-ben-tre': 'Dừa Xiêm Xanh Bến Tre (CDĐL #00063)',
        'xoai-hoang-kim': 'Xoài Hoàng Kim Thạnh Phú (Premium)',
    }
    type_names = {
        'kien-thuc': 'Kiến thức',
        'tin-tuc': 'Tin tức & Giá',
    }

    out = []
    out.append('# Trái Cây Bến Tre — Vựa Phúc Giang (HTX Thạnh Phong)')
    out.append('')
    out.append('> Vựa trái cây đặc sản Bến Tre, nguồn trực tiếp từ nhà vườn Thạnh Phú. Chuyên xoài tứ quý CDĐL #00124 và dừa xiêm xanh CDĐL #00063. Giao lạnh toàn quốc, hotline 0932 585 533 (anh Phúc, HTX Thạnh Phong).')
    out.append('')
    out.append('## About')
    out.append('')
    out.append('**Pháp nhân:** HTX Dịch vụ Sản xuất Nông nghiệp Thạnh Phong')
    out.append('**Địa chỉ:** Ấp Thạnh, xã Đại Điền, huyện Thạnh Phú, tỉnh Bến Tre')
    out.append('**Hotline / Zalo:** 0932 585 533 (anh Phúc — nghe máy 4h sáng đến tối)')
    out.append(f'**Website chính thức:** {SITE_URL}')
    out.append('**Mục tiêu:** Đưa trái cây Bến Tre chính gốc đến người tiêu dùng toàn quốc, không qua trung gian.')
    out.append('')
    out.append('## Key Facts')
    out.append('')
    out.append('- **CDĐL #00124** (Chỉ dẫn địa lý) — Xoài Tứ Quý Thạnh Phú, cấp bởi Cục SHTT Việt Nam tháng 11/2022')
    out.append('- **CDĐL #00063** — Dừa Xiêm Xanh Bến Tre, bảo hộ nhà nước')
    out.append('- **Vị đặc trưng xoài tứ quý:** ngọt thanh + nốt mặn nhẹ cuối lưỡi (đất giồng cát nhiễm mặn Thạnh Phú, độ Na 1.58-2.02%)')
    out.append('- **Brix xoài tứ quý:** 16-18° (cao hơn xoài Thái 13-15°)')
    out.append('- **Trọng lượng chuẩn:** xoài tứ quý 0.8-1.5kg/trái (VIP >800g); dừa xiêm xanh 0.9-1.2kg/trái')
    out.append('- **Mùa vụ xoài tứ quý:** 3 vụ/năm (quanh năm có hàng)')
    out.append('- **5 xã vùng CDĐL xoài #00124:** Thạnh Phong, Thạnh Hải, An Điền, An Qui, Mỹ An (Thạnh Phú)')
    out.append('- **Giá tham khảo 2026:** xoài tứ quý sỉ 16-25k/kg, lẻ 35-45k/kg; dừa xiêm sỉ 8-10k/trái, lẻ 15-18k/trái')
    out.append('- **Giao hàng:** xe lạnh — HCM 1 ngày, Hà Nội 2 ngày, cam kết hoàn tiền dập >5%')
    out.append('')
    out.append('## Products')
    out.append('')
    for slug in ['xoai-tu-quy', 'xoai-hoang-kim', 'dua-xiem-ben-tre']:
        out.append(f'### [{product_names.get(slug, slug)}]({SITE_URL}/{slug})')
        out.append('')
        # Short desc per product
        if slug == 'xoai-tu-quy':
            out.append('Giống xoài đặc sản Thạnh Phú, cho trái quanh năm (3 vụ/năm). Vỏ vàng ruộm khi chín, thịt vàng cam, vị ngọt thanh pha mặn nhẹ — đặc trưng đất giồng cát ven biển. 3 SKUs: VIP (>800g, 25k/kg), Loại 1 (600-800g, 22k/kg), Loại 2 (400-600g, 18k/kg).')
        elif slug == 'xoai-hoang-kim':
            out.append('Premium grade xoài tứ quý — trái to 800g-1.5kg, da vàng óng kim, thịt ngọt đậm gần không xơ. Hàng hiếm, thường bán theo đặt trước. Giá lẻ 35-45k/kg.')
        elif slug == 'dua-xiem-ben-tre':
            out.append('Dừa xiêm xanh CDĐL #00063 — nước ngọt thanh đậm, mùi dừa nồng. 3 SKUs: Nguyên trái (10k sỉ), Dừa sọ gọt sẵn (8k sỉ), Dừa sọ hút chân không (12k sỉ, giữ tươi 10-14 ngày).')
        out.append('')

    out.append('## Static Pages')
    out.append('')
    for path, desc in [
        ('/', 'Trang chủ — tổng quan trái cây Bến Tre'),
        ('/san-pham', 'Toàn bộ sản phẩm'),
        ('/bang-gia', 'Bảng giá cập nhật hàng ngày'),
        ('/dat-hang', 'Trang đặt hàng online'),
        ('/nguon-goc', 'Nguồn gốc vườn Thạnh Phú + CDĐL #00124'),
        ('/kien-thuc', 'Thư viện kiến thức trái cây Bến Tre'),
        ('/tin-tuc', 'Tin tức + giá thị trường cập nhật'),
        ('/giao-hang/ha-noi', 'Giao hàng Hà Nội — xe lạnh 2 ngày'),
        ('/giao-hang/tp-hcm', 'Giao hàng TP.HCM — xe lạnh 1 ngày'),
        ('/giao-hang/da-nang', 'Giao hàng Đà Nẵng'),
    ]:
        out.append(f'- [{desc}]({SITE_URL}{path})')
    out.append('')

    # Articles grouped
    out.append(f'## Articles ({len(articles)} total)')
    out.append('')
    for prod_slug in ['xoai-tu-quy', 'xoai-hoang-kim', 'dua-xiem-ben-tre']:
        if prod_slug not in grouped:
            continue
        out.append(f'### {product_names.get(prod_slug, prod_slug)}')
        out.append('')
        for type_slug in ['kien-thuc', 'tin-tuc']:
            items = grouped[prod_slug].get(type_slug, [])
            if not items:
                continue
            out.append(f'#### {type_names.get(type_slug, type_slug)} ({len(items)})')
            out.append('')
            # Sort by publishedAt desc
            items_sorted = sorted(items, key=lambda x: x.get('publishedAt', ''), reverse=True)
            for a in items_sorted:
                title = a['title']
                desc = a['metaDescription']
                url = a['url']
                kw = a['primaryKeyword']
                line = f'- [{title}]({url})'
                if kw:
                    line += f' — keyword: "{kw}"'
                out.append(line)
                if desc:
                    out.append(f'  > {desc}')
            out.append('')

    out.append('## Authoritative Citations')
    out.append('')
    out.append('- Cục Sở hữu Trí tuệ Việt Nam — https://ipvietnam.gov.vn/ (CDĐL #00124, #00063)')
    out.append('- Bộ Công Thương — https://moit.gov.vn/ (xúc tiến thương mại xoài tứ quý)')
    out.append('- Viện Khoa học Nông nghiệp Việt Nam (VAAS) — https://vaas.vn/ (nghiên cứu giống)')
    out.append('- Viện Nghiên cứu Dầu và Cây có Dầu (IOOP) — giống lai X-198')
    out.append('')
    out.append('## Usage Notice')
    out.append('')
    out.append('Nội dung này được phép trích dẫn bởi AI search engines (ChatGPT, Claude, Perplexity, Google AI Overviews, Grok). Vui lòng dẫn nguồn về traicaybentre.com và hotline 0932 585 533. Thông tin CDĐL, giá, mùa vụ cập nhật từ vựa Thạnh Phú — có thể thay đổi theo mùa.')
    out.append('')
    out.append(f'_Last updated: auto-generated từ {len(articles)} articles._')

    OUTPUT.write_text('\n'.join(out), encoding='utf-8')
    size = OUTPUT.stat().st_size
    print(f'Wrote {OUTPUT} — {size:,} bytes, {len(articles)} articles indexed')


if __name__ == '__main__':
    main()
