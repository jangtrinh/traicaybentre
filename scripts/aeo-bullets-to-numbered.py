#!/usr/bin/env python3
"""
Convert bullet lists → numbered lists for step-based content (AEO).

Only converts bullets under step-context H2s (Cách, Hướng dẫn, Quy trình, Bước).
Skips feature lists, pros/cons, general enumerations.

Run: python3 scripts/aeo-bullets-to-numbered.py
"""
from __future__ import annotations
import re
import glob
from pathlib import Path


# H2 patterns that indicate step/procedure content
STEP_H2_PATTERNS = [
    r'^Cách\s',           # "Cách làm", "Cách bảo quản"
    r'^Hướng dẫn\s',      # "Hướng dẫn đóng gói"
    r'^Quy trình\s',      # "Quy trình thu hoạch"
    r'^Các bước\b',       # "Các bước thực hiện"
    r'^Bước\s+\d+',       # "Bước 1", "Bước 2"
    r'^Thực hiện',        # "Thực hiện như sau"
    r'^Làm\s',            # "Làm sao", "Làm thế nào"
    r'^\d+\s+bước',       # "5 bước", "7 bước"
]

# H3 patterns indicating sub-step sections
STEP_H3_PATTERNS = [
    r'^Các bước',
    r'^Bước\s+\d+',
    r'^Cách làm',
    r'^Thực hiện',
]


def is_step_heading(heading_text: str) -> bool:
    """Return True if heading indicates step-based content."""
    for pattern in STEP_H2_PATTERNS + STEP_H3_PATTERNS:
        if re.search(pattern, heading_text, re.IGNORECASE):
            return True
    return False


def process_file(path: Path) -> int:
    """Convert bullet lists under step-headings to numbered lists.
    Returns count of bullet blocks converted.
    """
    content = path.read_text(encoding='utf-8')
    lines = content.split('\n')
    new_lines = []
    converted_blocks = 0

    i = 0
    in_step_section = False
    while i < len(lines):
        line = lines[i]
        # Track if current section is step-based
        h_match = re.match(r'^(#{2,4})\s+(.+)$', line)
        if h_match:
            level = len(h_match.group(1))
            text = h_match.group(2).strip()
            # H2 resets step-section. H3/H4 inherit if no new H2.
            if level == 2:
                in_step_section = is_step_heading(text)
            elif level >= 3 and not in_step_section:
                # H3/H4 can itself be step-heading
                in_step_section = is_step_heading(text)
            new_lines.append(line)
            i += 1
            continue

        # Detect start of bullet block (3+ consecutive `- ` bullets)
        if in_step_section and re.match(r'^-\s+\S', line):
            # Gather the block
            block_start = i
            block_lines = []
            while i < len(lines) and (re.match(r'^-\s+\S', lines[i]) or
                                       (lines[i].startswith('  ') and lines[i].strip())):
                block_lines.append(lines[i])
                i += 1
            # Only convert if ≥3 top-level bullets
            top_bullets = [l for l in block_lines if re.match(r'^-\s+', l)]
            if len(top_bullets) >= 3:
                counter = 1
                for bl in block_lines:
                    m = re.match(r'^-\s+(.+)$', bl)
                    if m:
                        new_lines.append(f'{counter}. {m.group(1)}')
                        counter += 1
                    else:
                        new_lines.append(bl)  # preserve indented sub-content
                converted_blocks += 1
            else:
                new_lines.extend(block_lines)
            continue

        new_lines.append(line)
        i += 1

    if converted_blocks > 0:
        path.write_text('\n'.join(new_lines), encoding='utf-8')
    return converted_blocks


def main():
    articles = glob.glob('src/content/articles/**/*.mdx', recursive=True)
    total_files = 0
    total_blocks = 0
    for a in articles:
        path = Path(a)
        n = process_file(path)
        if n > 0:
            total_files += 1
            total_blocks += n
            print(f'  {n} block(s) × {a}')
    print(f'\nTotal: {total_blocks} bullet blocks → numbered across {total_files} files')


if __name__ == '__main__':
    main()
