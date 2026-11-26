#!/usr/bin/env python3
"""Pre-commit & CI content guardrail for changa9090.github.io (pstack:correct).

Blocks recurring Park & Co publishing mistakes before they reach GitHub Pages:
  1. Prohibited Korean terminology ('내무부' -> '이민성', '박연코' -> '박앤코')
  2. Unreleased store links ('diy.lawfollow.com')
  3. Corrupted bulk-replace tokens ('NAARTI', 'ARTI' from NAATI->ART bug)
  4. Leaked internal review markers ('[검토 필요', '[UNVERIFIED]', 'NOT_PUBLISHABLE', etc.)
  5. Stale/typo domains & legacy Kakao handles ('pnclaw', 'beemate', 'parkcolawyers.com.au')

Escape hatch: add 'correct-ignore:' with a reason on the offending line.
Exit 0 = clean, Exit 2 = blocking findings.
"""
from __future__ import annotations

import argparse
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
CHECK_EXTS = {".html", ".htm", ".js", ".mjs", ".json", ".md", ".txt", ".xml"}
SKIP_DIRS = {".git", "node_modules", "__pycache__", ".venv", "rclone-evernote"}
SKIP_FILES = {"scripts/check_content_rules.py", "scripts/test_content_rules.py", "CLAUDE.md", "AGENTS.md"}

RULES: list[tuple[str, re.Pattern[str], str]] = [
    ("terminology_immi", re.compile(r"내무부"), "Replace '내무부' with '이민성' or '호주 이민성'."),
    ("terminology_firm", re.compile(r"박연코"), "Replace '박연코' with '박앤코'."),
    ("unreleased_domain", re.compile(r"diy\.lawfollow\.com", re.I), "Remove unreleased 'diy.lawfollow.com' link from public pages."),
    ("corrupted_replace", re.compile(r"\b(?:NAARTI|ARTI)\b"), "Restore corrupted NAATI->ART token back to 'NAATI'."),
    ("internal_marker", re.compile(r"\[(?:검토 필요|REQUIRES VERIFICATION|UNVERIFIED|VERIFY|출처 확인 필요)\]|REVIEW_ONLY|NOT_PUBLISHABLE"), "Remove internal review marker before publishing."),
    ("stale_domain_or_kakao", re.compile(r"\b(?:pnclaw|beemate|parkcolawyers\.com\.au)\b", re.I), "Use official firm channels (enquiry@parkcolawyers.com / parklawyers.com.au)."),
]


def scan_file(path: pathlib.Path) -> list[str]:
    rel = str(path.resolve().relative_to(ROOT)) if path.resolve().is_relative_to(ROOT) else str(path)
    if rel in SKIP_FILES:
        return []
    try:
        lines = path.read_text(encoding="utf-8").splitlines()
    except (UnicodeDecodeError, OSError):
        return []
    findings: list[str] = []
    for idx, line in enumerate(lines, start=1):
        if "correct-ignore:" in line:
            continue
        for rule_id, pattern, fix in RULES:
            m = pattern.search(line)
            if m:
                findings.append(f"{rel}:{idx}: [{rule_id}] matched '{m.group(0)}' -> {fix}")
    return findings


def staged_files() -> list[pathlib.Path]:
    res = subprocess.run(
        ["git", "-C", str(ROOT), "diff", "--cached", "--name-only", "--diff-filter=ACM"],
        capture_output=True, text=True, check=True,
    )
    out = []
    for rel in res.stdout.splitlines():
        p = ROOT / rel
        if p.is_file() and p.suffix.lower() in CHECK_EXTS and not (set(p.parts) & SKIP_DIRS):
            out.append(p)
    return out


def all_files() -> list[pathlib.Path]:
    out = []
    for p in ROOT.rglob("*"):
        if not p.is_file() or p.suffix.lower() not in CHECK_EXTS:
            continue
        if set(p.relative_to(ROOT).parts) & SKIP_DIRS:
            continue
        out.append(p)
    return sorted(out)


def main() -> int:
    ap = argparse.ArgumentParser(description="Check changa9090.github.io content guardrails.")
    ap.add_argument("--staged", action="store_true", help="Scan git staged files (for pre-commit hook)")
    ap.add_argument("--all", action="store_true", help="Scan all publishable files in repo")
    ap.add_argument("files", nargs="*", help="Explicit file paths to scan")
    args = ap.parse_args()

    targets: list[pathlib.Path] = []
    if args.staged:
        targets = staged_files()
    elif args.all:
        targets = all_files()
    elif args.files:
        targets = [pathlib.Path(f) for f in args.files]
    else:
        ap.error("Specify --staged, --all, or file paths")

    all_findings: list[str] = []
    for p in targets:
        all_findings.extend(scan_file(p))

    if all_findings:
        print(f"BLOCKED: {len(all_findings)} content guardrail violation(s) found:")
        for item in all_findings:
            print(f"  - {item}")
        return 2
    print(f"OK: {len(targets)} file(s) passed content guardrails.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
