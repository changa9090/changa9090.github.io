# changa9090.github.io — Park & Co Public Portal

Public GitHub Pages site (`https://changa9090.github.io/`) for Park & Co Lawyers' bilingual visa pathways, sponsorship case review, and public legal intelligence tools.

## Enforced Content Guardrails (`pstack:correct`)

Every staged commit is automatically checked by `.git/hooks/pre-commit` -> `scripts/check_content_rules.py`.

| Rule | Enforced By | Fix When Blocked |
| :--- | :--- | :--- |
| Department of Home Affairs = `이민성` (never `내무부`) | `scripts/check_content_rules.py` (`terminology_immi`) | Replace `내무부` with `이민성` or `호주 이민성` |
| Firm name = `박앤코` (never `박연코`) | `scripts/check_content_rules.py` (`terminology_firm`) | Replace `박연코` with `박앤코` |
| Keep unreleased `diy.lawfollow.com` links off public build | `scripts/check_content_rules.py` (`unreleased_domain`) | Remove `diy.lawfollow.com` link |
| Block corrupted bulk-replace `NAARTI` / `ARTI` tokens | `scripts/check_content_rules.py` (`corrupted_replace`) | Restore to `NAATI` |
| Block leaked internal markers (`[UNVERIFIED]`, `[검토 필요`, etc.) | `scripts/check_content_rules.py` (`internal_marker`) | Resolve and remove internal marker |
| Block legacy Kakao/stale typo domains (`pnclaw`, `beemate`, `parkcolawyers.com.au`) | `scripts/check_content_rules.py` (`stale_domain_or_kakao`) | Use `enquiry@parkcolawyers.com` / `parklawyers.com.au` |

Run full repo audit manually: `python3 scripts/check_content_rules.py --all`
Run proof tests: `python3 scripts/test_content_rules.py`
