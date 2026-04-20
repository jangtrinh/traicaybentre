#!/usr/bin/env python3
"""
Convert H2 statements → natural Vietnamese questions for AEO.

Conservative rule-based: only converts H2s matching high-confidence patterns.
Leaves ambiguous/verb-based H2s alone (they work fine for Google).

Run: python3 scripts/aeo-h2-to-questions.py
"""
from __future__ import annotations
import re
import glob
from pathlib import Path
from typing import Optional

# Pattern → suffix rules (conservative, high-confidence only)
# Only applies if H2 doesn't end with `?` already.
CONVERSIONS = [
    # noun-start → append context question
    (r'^(Đặc điểm)(\s+[^?]+)?$', r'\1\2 như thế nào?'),
    (r'^(Nguồn gốc)(\s+[^?]+)?$', r'\1\2 từ đâu?'),
    (r'^(Công dụng)(\s+[^?]+)?$', r'\1\2 gồm gì?'),
    (r'^(Lợi ích)(\s+[^?]+)?$', r'\1\2 là gì?'),
    (r'^(Tác dụng)(\s+[^?]+)?$', r'\1\2 ra sao?'),
    (r'^(Thành phần)(\s+[^?]+)?$', r'\1\2 gồm những gì?'),
    (r'^(Mùa vụ)(\s+[^?]+)?$', r'\1\2 khi nào?'),
    (r'^(Vùng trồng)(\s+[^?]+)?$', r'\1\2 ở đâu?'),
    (r'^(Kỹ thuật)(\s+[^?]+)?$', r'\1\2 như thế nào?'),
    (r'^(Quy trình)(\s+[^?]+)?$', r'\1\2 ra sao?'),
    (r'^(Tiêu chuẩn)(\s+[^?]+)?$', r'\1\2 là gì?'),
    (r'^(Chứng nhận)(\s+[^?]+)?$', r'\1\2 nào?'),
    (r'^(Điều kiện)(\s+[^?]+)?$', r'\1\2 gì?'),
    (r'^(Phân loại)(\s+[^?]+)?$', r'\1\2 như thế nào?'),
    (r'^(So sánh)(\s+[^?]+)?$', r'\1\2 khác nhau chỗ nào?'),
    (r'^(Nhận biết)(\s+[^?]+)?$', r'\1\2 bằng cách nào?'),
    (r'^(Giá trị)(\s+[^?]+)?$', r'\1\2 thế nào?'),
    (r'^(Hạn chế)(\s+[^?]+)?$', r'\1\2 là gì?'),
    (r'^(Ưu điểm)(\s+[^?]+)?$', r'\1\2 gồm gì?'),
    (r'^(Nhược điểm)(\s+[^?]+)?$', r'\1\2 gồm gì?'),
    (r'^(Lưu ý)(\s+[^?]+)?$', r'\1\2 gì?'),
    (r'^(Tại sao)(\s+[^?]+)?$', r'\1\2?'),
    (r'^(Ai nên ăn)(\s+[^?]+)?$', r'\1\2?'),
    (r'^(Khi nào)(\s+[^?]+)?$', r'\1\2?'),
]

# NEVER convert — keep as statements (conclusion, summary, CTA)
SKIP_PATTERNS = [
    r'^Kết luận',
    r'^Tổng kết',
    r'^Tóm lại',
    r'^FAQ',
    r'^Câu hỏi thường gặp',  # already question context
    r'^Đặt hàng',
    r'^Liên hệ',
    r'^Bảng',
    r'^Bước \d+',  # numbered steps are fine
    r'^\d+\.',
]


def convert_h2(h2_text: str) -> Optional[str]:
    """Return converted H2 or None if no change needed."""
    # Already a question
    if h2_text.rstrip().endswith('?'):
        return None
    # Skip list
    for pattern in SKIP_PATTERNS:
        if re.match(pattern, h2_text, re.IGNORECASE):
            return None
    # Try conversions
    for pattern, replacement in CONVERSIONS:
        new_text = re.sub(pattern, replacement, h2_text)
        if new_text != h2_text:
            return new_text
    return None


def process_file(path: Path) -> int:
    """Return count of H2s converted."""
    content = path.read_text(encoding='utf-8')
    lines = content.split('\n')
    count = 0
    for i, line in enumerate(lines):
        # Match H2 only (## but not ###)
        m = re.match(r'^##\s+([^\n#].*)$', line)
        if not m:
            continue
        h2_text = m.group(1).strip()
        converted = convert_h2(h2_text)
        if converted:
            lines[i] = f'## {converted}'
            count += 1
    if count > 0:
        path.write_text('\n'.join(lines), encoding='utf-8')
    return count


def main():
    articles = glob.glob('src/content/articles/**/*.mdx', recursive=True)
    total_files = 0
    total_h2s = 0
    for a in articles:
        path = Path(a)
        converted = process_file(path)
        if converted > 0:
            total_files += 1
            total_h2s += converted
            print(f'  {converted:2d} × {a}')
    print(f'\nTotal: {total_h2s} H2 converted across {total_files} files')


if __name__ == '__main__':
    main()
