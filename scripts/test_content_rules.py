#!/usr/bin/env python3
"""Proof tests for scripts/check_content_rules.py (pstack:correct).

Verifies every guardrail rule fails on real past mistakes and passes on clean copy.
"""
from __future__ import annotations

import subprocess
import sys
import tempfile
import pathlib

SCRIPT = pathlib.Path(__file__).resolve().parent / "check_content_rules.py"

BAD_SAMPLES = {
    "terminology_immi": "<p>호주 내무부 비자 심사 안내</p>\n",
    "terminology_firm": "<p>법무법인 박연코 상담 안내</p>\n",
    "unreleased_domain": '<a href="https://diy.lawfollow.com/kit">DIY Kit</a>\n',
    "corrupted_replace": "<p>NAARTI 공증 번역본 제출 필요</p>\n",
    "internal_marker": "<p>[UNVERIFIED] 2026 소득 기준</p>\n",
    "stale_domain_or_kakao": "<p>문의: pnclaw 카카오톡</p>\n",
}

CLEAN_SAMPLE = """<!DOCTYPE html>
<html lang="ko">
<body>
  <p>법무법인 박앤코 호주 이민성(DHA) 비자 및 NAATI 번역 안내.</p>
  <p>문의: enquiry@parkcolawyers.com (https://parklawyers.com.au/)</p>
  <!-- correct-ignore: historical quote example: 내무부 -->
</body>
</html>
"""


def run_check(content: str) -> subprocess.CompletedProcess[str]:
    with tempfile.NamedTemporaryFile("w", suffix=".html", encoding="utf-8", delete=False) as tf:
        tf.write(content)
        tmp = pathlib.Path(tf.name)
    try:
        return subprocess.run([sys.executable, str(SCRIPT), str(tmp)], capture_output=True, text=True)
    finally:
        tmp.unlink(missing_ok=True)


def main() -> int:
    for rule_id, sample in BAD_SAMPLES.items():
        res = run_check(sample)
        assert res.returncode == 2, f"Expected FAIL (2) for {rule_id}, got {res.returncode}: {res.stdout}"
        assert f"[{rule_id}]" in res.stdout, f"Expected [{rule_id}] in output: {res.stdout}"
        print(f"PASS (caught past mistake): {rule_id}")

    clean_res = run_check(CLEAN_SAMPLE)
    assert clean_res.returncode == 0, f"Expected PASS (0) for clean sample, got {clean_res.returncode}: {clean_res.stdout}"
    print("PASS (clean + correct-ignore accepted)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
