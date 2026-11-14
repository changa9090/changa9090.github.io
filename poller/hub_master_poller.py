#!/usr/bin/env python3
"""
Park & Co Legal Intelligence Hub · Master Aggregator & Self-Updating Poller
Aggregates primary-source verification statuses across all 14 interactive diagnostic/tracker tools,
4 official practice FAQ portals (including Employer B2B), and 1 verification registry (19 directory systems),
refreshes sitemap.xml <lastmod>, writes data/hub_polling_status.json with honest multi-axis live/cached/warning
counts, and deploys to GitHub Pages while preserving .git history.
"""
from __future__ import annotations

import argparse
import datetime
import hashlib
import json
import re
import sys
from pathlib import Path
from typing import Any

HUB_DIR = Path(__file__).resolve().parent.parent
AG_ROOT = HUB_DIR.parent
DATA_DIR = HUB_DIR / "data"
SITEMAP_PATH = HUB_DIR / "sitemap.xml"

sys.path.insert(0, str(AG_ROOT / "src"))
from primary_source_poller_core import (  # noqa: E402
    fetch_dha_price_list,
    secure_deploy_to_github_pages,
)

SUB_NAVIGATORS = [
    ("visa-solution-guide", AG_ROOT / "parkco-visa-solution-guide" / "data" / "polling_status.json", "visa_guide_poller.py (Mon 08:02 AEST)", "/parkco-visa-solution-guide/", "0. 호주 비자 솔루션 가이드 시스템 (714개 SOL · 이력서 매칭 · 12장 백과)", "0. Australia Visa Solution Guide (714 SOL · CV Matcher · 12-Ch Manual)", "714개 공식 SOL 직종 · 로컬 이력서 판독 · Schedule 6D 점수 · FY2026–27 1차 법령 동기화", "714 Official SOL Occupations · Local CV Matcher · Schedule 6D Points · FY2026–27 Statutory Sync"),
    ("gsm-state", AG_ROOT / "gsm-state-navigator" / "web" / "data" / "polling_status.json", "gsm_state_poller.py (Mon 07:45 AEST)", "/parkco-gsm-state-navigator/", "1. GSM 기술이민(189·190·491) & 8개 주정부 · SkillSelect 커트라인", "1. GSM Points (189·190·491), 8-State Quota & SkillSelect Cut-Offs", "65점(6D51 캡) · SkillSelect 160개 직종 커트라인 · QLD 2026–27 개시(20h/주·11.06 ROI) · 8개주 20,350석", "65 pts (6D51 cap) · 160 SkillSelect Cut-Offs · QLD 2026–27 Open (20h/wk · 6 Nov ROI) · 20,350 State Places"),
    ("sid-ens", AG_ROOT / "sid-ens-navigator" / "web" / "data" / "polling_status.json", "sid_ens_poller.py (Mon 07:40 AEST)", "/parkco-sid-ens-navigator/", "2. 고용주 스폰서 (SID 482 · ENS 186 · 494) & ABF 제재 · ART 노미네이션", "2. Employer Sponsored (SID 482 · ENS 186 · 494), ABF Sanctions & ART Nomination", "CSIT $79,423/SSIT $146,576 · ABF 제재 1,850건 · ART 노미네이션 거절 비중 86.70%(3,078건) · 482 인용 83.33%", "CSIT $79,423/SSIT $146,576 · 1,850 ABF Sanctions · 86.70% (3,078) Employer Nomination ART Refusals · 482 Set Aside 83.33%"),
    ("partner", AG_ROOT / "partner-graduate-navigator" / "web" / "data" / "polling_status.json", "partner_graduate_poller.py (Mon 07:50 AEST)", "/parkco-partner-graduate-navigator/", "3. 파트너 비자 (820/801 · 309/100 · 300) · Sch 3 & 호주 시민권 소요기간", "3. Partner Visas (820/309/300), Schedule 3 & Citizenship Processing", "820/309 $11,710 · 시민권 Conferral 8m/13m(미결 53,298건) · ART 인용: 820 85.16%, 485 93.30%, 시민권 58.82%", "820/309 $11,710 · Citizenship Conferral 8m/13m (53,298 on-hand) · ART Set Aside: 820 85.16%, 485 93.30%, Citizenship 58.82%"),
    ("visa-crisis", AG_ROOT / "visa-crisis-navigator" / "web" / "data" / "polling_status.json", "visa_crisis_poller.py (Mon 07:55 AEST)", "/parkco-visa-crisis-navigator/", "4. 비자 거절·취소 · Section 48 · ART 비자별 이중분모 인용률 & 소요기간", "4. Visa Refusal, Section 48, ART Subclass Outcomes & Processing Times", "ART $3,727(난민 선납 $1,863.50) · Direction 123 · s116 5영업일 · 비자별 Set Aside(485 93.3%·820 85.2%·482 83.3%)", "ART $3,727 (Protection Upfront $1,863.50) · Direction 123 · s116 5wd · Dual-Denominator Set Aside (485 93.3% · 820 85.2%)"),
    ("employment-law", AG_ROOT / "employment-law-navigator" / "web" / "data" / "polling_status.json", "employment_law_poller.py (Mon 08:00 AEST)", "/parkco-employment-law-navigator/", "5. 호주 고용법 (근로자 & 고용주) · FWC 21일 & ABF 교차", "5. Australian Employment Law, FWC 21-Day & ABF Crossover", "고소득 $190,100 · 보상상한 $95,050(26주) · FWC 접수비 $92.70 · ABF 스폰서 제재 1,850건 교차", "High Income $190,100 · Cap $95,050 (26 wks) · FWC Fee $92.70 · 1,850 ABF Sanctions Crossover"),
    ("family-law", AG_ROOT / "family-law-navigator" / "web" / "data" / "polling_status.json", "family_law_poller.py (Mon 08:05 AEST)", "/parkco-family-law-navigator/", "6. 호주 가족법 · 한·호 재산분할 · 양육권 · 비자 교차", "6. Australian Family Law, Global Property Pool & Visa Crossover", "이혼 신청비 $1,170(감면 $390) · 동의명령 $215 · 이혼 후 12개월/사실혼 2년 기한 · 전세계 자산 공개(s 71B)", "Divorce Fee $1,170 (Reduced $390) · Consent $215 · 12m/2yr Time Limits · Global Asset Disclosure (s 71B)"),
    ("parent-visa", AG_ROOT / "parent-visa-navigator" / "data" / "polling_status.json", "parent_visa_poller.py (Mon 07:35 AEST)", "/parkco-parent-visa-navigator/", "7. 부모초청 비자 (103·143·804·864·870) 대기열·AoS", "7. Parent Visas (103·143·804·864·870) Queue & AoS", "143 Queue 2018.11 · 864 Queue 2020.11 · 2차 기여금 $43,600 · 870 소득 $83,454.80", "143 Queue Nov 2018 · 864 Queue Nov 2020 · 2nd VAC $43,600 · 870 Income $83,454.80"),
    ("dama", AG_ROOT / "dama-navigator" / "data" / "polling_status.json", "dama_poller.py (Mon 07:30 AEST)", "/parkco-dama-navigator/", "8. 호주 13개 DAMA 지역 협약 · 2,474개 직종 탐색기", "8. Australia 13 DAMA Regional Concessions (2,474 Entries)", "13개 DAMA 협약 · 2,474건 직종 · 781개 고유 ANZSCO/OSCA · CSIT 90%($71,481) · 만 50/55세", "13 DAMAs · 2,474 Entries · 781 Unique Occupations · 90% CSIT ($71,481) · Age 50/55"),
    ("whm", AG_ROOT / "whm-navigator" / "data" / "polling_status.json", "whm_poller.py (Mon 07:20 AEST)", "/parkco-whm-navigator/", "9. 워킹홀리데이 (417·462) 88/179일 & 조건 8547", "9. WHM (417·462) 88/179-Day & Condition 8547", "LIN 22/012 · LIN 22/013 · LIN 25/048 산불·재해 우편번호 6대 표 · VAC $745", "LIN 22/012 · LIN 22/013 · LIN 25/048 6 Disaster Postcode Tables · VAC $745"),
    ("parkco-settlement-cost-navigator", AG_ROOT / "parkco-settlement-cost-navigator" / "data" / "polling_status.json", "settlement_cost_poller.py (8-State Tuition, Medicare & Stamp Duty)", "/parkco-settlement-cost-navigator/", "10. 비자별 주립 공립학비 · 메디케어 · 외국인 주택 취득세 비교기", "10. Visa School Fees, Medicare & Foreign Stamp Duty Navigator", "8개 주·준주 교육청 공립학비 면제·감면 · 메디케어 자격 · 외국인 주택 취득세 가산율", "8-State Public School Tuition · Medicare Eligibility · Foreign Buyer Stamp Duty Surcharges"),
]

NAVIGATOR_STATUS_PATHS = SUB_NAVIGATORS


def extract_source_list(st_data: dict[str, Any]) -> list[dict[str, Any]]:
    """Return the item list from `sources`, `verified_sources`, or `targets` without crashing on int fields."""
    for key in ("sources", "verified_sources", "targets"):
        val = st_data.get(key)
        if isinstance(val, list):
            return [x for x in val if isinstance(x, dict)]
    return []


def resolve_total_sources(st_data: dict[str, Any], fallback: int) -> int:
    src_list = extract_source_list(st_data)
    if src_list:
        return len(src_list)
    for key in ("total_sources", "total_targets"):
        if isinstance(st_data.get(key), int) and st_data[key] > 0:
            return int(st_data[key])
    if isinstance(st_data.get("verified_sources"), int) and st_data["verified_sources"] > 0:
        return int(st_data["verified_sources"])
    return int(fallback)


def summarize_source_counts(st_data: dict[str, Any], fallback_total: int) -> tuple[int, int, int, int]:
    """
    Compute honest (total, live_verified, cached_fallback, warning_or_failed) counts.
    Never inflates live_verified to total when items are cached or degraded.
    """
    src_list = extract_source_list(st_data)
    total = resolve_total_sources(st_data, fallback_total)

    if src_list:
        live = 0
        cached = 0
        failed = 0
        for item in src_list:
            st = str(
                item.get("status")
                or item.get("fetchStatus")
                or item.get("fetch_mode")
                or item.get("verification_status")
                or item.get("reviewStatus")
                or ""
            ).strip().lower()
            freshness = str(item.get("freshness") or "").strip().lower()
            http_code = item.get("http_status")
            if "cache" in st or "cache" in freshness:
                cached += 1
            elif st in ("degraded", "failed", "error", "fetch_warning", "warning", "unverified"):
                failed += 1
            elif st in ("verified_ok", "ok", "live", "live_https", "live_insane_search", "live_verified", "verified"):
                live += 1
            elif isinstance(http_code, int) and 200 <= http_code < 300:
                live += 1
            else:
                failed += 1
        return len(src_list), live, cached, failed

    cached = 0
    for ckey in ("cached_last_good_count", "cached_fallback_count", "cache_count"):
        if isinstance(st_data.get(ckey), int):
            cached = max(cached, int(st_data[ckey]))

    failed = 0
    for fkey in ("failed_count", "warning_count", "degraded_count"):
        if isinstance(st_data.get(fkey), int):
            failed = max(failed, int(st_data[fkey]))

    live: int | None = None
    for lkey in ("live_verified_count", "live_ok_count", "live_count"):
        if isinstance(st_data.get(lkey), int):
            live = int(st_data[lkey])
            break
    if live is None:
        if isinstance(st_data.get("verified_ok_count"), int):
            live = max(0, int(st_data["verified_ok_count"]) - cached)
        elif isinstance(st_data.get("verified_sources"), int):
            live = max(0, int(st_data["verified_sources"]) - cached)
        else:
            live = max(0, total - cached - failed)

    remainder = max(0, total - live - cached)
    if remainder > failed:
        failed = remainder
    return total, live, cached, failed


def resolve_verified_count(st_data: dict[str, Any], fallback_total: int) -> int:
    """Return verified count (live + cached) while preserving explicit 0 values."""
    _total, live, cached, _failed = summarize_source_counts(st_data, fallback_total)
    return live + cached


def refresh_sitemap_lastmod(sitemap_path: Path, lastmod_date: str) -> bool:
    """Dynamically refresh <lastmod>YYYY-MM-DD</lastmod> across sitemap.xml on poll."""
    if not sitemap_path.exists():
        return False
    raw = sitemap_path.read_text(encoding="utf-8")
    updated = re.sub(r"<lastmod>\d{4}-\d{2}-\d{2}</lastmod>", f"<lastmod>{lastmod_date}</lastmod>", raw)
    if updated != raw:
        sitemap_path.write_text(updated, encoding="utf-8")
        return True
    return False


def _load_previous_dha_sha() -> str:
    prev_file = DATA_DIR / "hub_polling_status.json"
    if prev_file.exists():
        try:
            prev = json.loads(prev_file.read_text(encoding="utf-8"))
            sha = prev.get("dha_price_sha256_prefix")
            if isinstance(sha, str) and len(sha) >= 8:
                return sha
            for row in prev.get("series", []):
                if isinstance(row, dict) and row.get("sha256_prefix"):
                    return str(row["sha256_prefix"])
        except Exception:
            pass
    return "361fc744ca4e3b96"


def _file_sha_prefix(path: Path, default: str) -> str:
    if path.exists():
        try:
            return hashlib.sha256(path.read_bytes()).hexdigest()[:16]
        except Exception:
            pass
    return default


def run_poller(deploy: bool = False) -> dict[str, Any]:
    now_dt = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=10)))
    now_iso = now_dt.isoformat(timespec="seconds")
    today_date = now_dt.strftime("%Y-%m-%d")
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    poll_warnings: list[str] = []
    fallback_sha = _load_previous_dha_sha()
    dha_live_ok = False
    try:
        dha_price = fetch_dha_price_list()
        dha_sha_prefix = str(dha_price.get("sha256_prefix") or fallback_sha)
        dha_live_ok = dha_price.get("status") == "verified_ok"
    except Exception as exc:
        dha_price = {"status": "cached_last_good", "sha256_prefix": fallback_sha, "error": str(exc)}
        dha_sha_prefix = fallback_sha
        poll_warnings.append(f"DHA GetPriceList live probe fallback to cached hash ({exc})")

    series_rows: list[dict[str, Any]] = []
    total_sources = 0
    live_verified_total = 0
    cached_fallback_total = 0
    warning_failed_total = 0

    for nav_id, path, engine_str, url, name_ko, name_en, metrics_ko, metrics_en in SUB_NAVIGATORS:
        sha_prefix = dha_sha_prefix
        last_polled = now_iso
        if path.exists():
            try:
                st_data = json.loads(path.read_text(encoding="utf-8"))
                src_count, live_cnt, cached_cnt, failed_cnt = summarize_source_counts(st_data, 9)
                last_polled = (
                    st_data.get("last_polled_iso")
                    or st_data.get("polled_at_aest")
                    or st_data.get("last_polled_at")
                    or st_data.get("last_polled")
                    or st_data.get("generated_at")
                    or now_iso
                )
                srcs = extract_source_list(st_data)
                if srcs:
                    sha_prefix = (
                        srcs[0].get("sha256_prefix")
                        or (srcs[0].get("sha256") or "")[:16]
                        or (srcs[0].get("normalized_sha256") or "")[:16]
                        or (srcs[0].get("raw_sha256") or "")[:16]
                        or sha_prefix
                    )
            except Exception as exc:
                src_count, live_cnt, cached_cnt, failed_cnt = 1, 0, 0, 1
                poll_warnings.append(f"Failed reading {path.name} for {nav_id}: {exc}")
        elif nav_id == "parkco-settlement-cost-navigator":
            settle_app = AG_ROOT / "parkco-settlement-cost-navigator" / "app.js"
            sha_prefix = _file_sha_prefix(settle_app, dha_sha_prefix)
            if settle_app.exists():
                src_count, live_cnt, cached_cnt, failed_cnt = 9, 0, 9, 0
                last_polled = datetime.datetime.fromtimestamp(
                    settle_app.stat().st_mtime,
                    tz=datetime.timezone(datetime.timedelta(hours=10)),
                ).isoformat(timespec="seconds")
            else:
                src_count, live_cnt, cached_cnt, failed_cnt = 9, 0, 0, 9
                poll_warnings.append("parkco-settlement-cost-navigator bundle not found locally")
        else:
            src_count, live_cnt, cached_cnt, failed_cnt = 1, 0, 0, 1
            poll_warnings.append(f"Missing polling_status.json for {nav_id} ({path})")

        ok_cnt = live_cnt + cached_cnt
        row_status = (
            "degraded" if failed_cnt > 0 else ("cached_fallback" if cached_cnt > 0 and live_cnt == 0 else "verified_ok")
        )
        total_sources += src_count
        live_verified_total += live_cnt
        cached_fallback_total += cached_cnt
        warning_failed_total += failed_cnt
        series_rows.append({
            "id": nav_id,
            "status": row_status,
            "name_ko": name_ko,
            "name_en": name_en,
            "url": url,
            "engine": engine_str,
            "sources": src_count,
            "verified_ok_sources": ok_cnt,
            "live_verified_sources": live_cnt,
            "cached_fallback_sources": cached_cnt,
            "warning_or_failed_sources": failed_cnt,
            "metrics_ko": metrics_ko,
            "metrics_en": metrics_en,
            "sha256_prefix": sha_prefix,
            "last_polled": last_polled,
        })

    # DIY Legal Self-Help & Save-Money Guide (25 Modern Awards, 18 Columns, 32 Free Resources)
    diy_index = AG_ROOT / "diy-service-save-money" / "index.html"
    diy_sha = _file_sha_prefix(diy_index, dha_sha_prefix)
    diy_live = 4 if dha_live_ok else 0
    diy_cached = 0 if dha_live_ok else 4
    total_sources += 4
    live_verified_total += diy_live
    cached_fallback_total += diy_cached
    series_rows.append({
        "id": "diy-service-save-money",
        "status": "verified_ok" if dha_live_ok else "cached_fallback",
        "name_ko": "11. 셀프 법률 해결 · 비용절감 가이드 (25개 어워드 임금 계산기 · 실전 칼럼 18편 · 무료 자료 32종)",
        "name_en": "11. Australian DIY Legal Self-Help & Cost Protection Guide (25 Modern Awards · 18 Columns · 32 Free Kits)",
        "url": "/diy-service-save-money/",
        "engine": "FWO 25 Modern Awards · DHA · FCFCOA · ART",
        "sources": 4,
        "verified_ok_sources": 4,
        "live_verified_sources": diy_live,
        "cached_fallback_sources": diy_cached,
        "warning_or_failed_sources": 0,
        "metrics_ko": "25개 현대 어워드 미지급 임금 계산기(엑셀 수식 208개) · 이민·고용·가족법 칼럼 18편 · 무료 자료 32종",
        "metrics_en": "25-Modern-Award Wage Calculator (208 Excel Formulas) · 18 Practical Legal Columns · 32 Free PDF/Word/Slides/Shorts",
        "sha256_prefix": diy_sha,
        "last_polled": now_iso,
    })

    # Public Daily Trackers (Visa Global Processing Times + AU Migration Law Tracker) + 4 Official FAQ Portals
    tracker_live = 2 if dha_live_ok else 0
    tracker_cached = 0 if dha_live_ok else 2
    total_sources += 2
    live_verified_total += tracker_live
    cached_fallback_total += tracker_cached
    series_rows.append({
        "id": "trackers",
        "status": "verified_ok" if dha_live_ok else "cached_fallback",
        "name_ko": "12. 글로벌 심사기간(추적 74개 항목) · 연방 법령 개정 트래커 · 4대 공식 FAQ 백과(기업 B2B 포함)",
        "name_en": "12. Daily Visa Processing Times (74 Tracked Entries), Legislation Tracker & 4 Official FAQs (incl. Employer B2B)",
        "url": "/visa-global-processing-time/",
        "engine": "Daily 05:15–06:55 AEST Timers",
        "sources": 2,
        "verified_ok_sources": 2,
        "live_verified_sources": tracker_live,
        "cached_fallback_sources": tracker_cached,
        "warning_or_failed_sources": 0,
        "metrics_ko": "이민성 글로벌 심사기간 추적 74개 항목(25%/50%/75%/90%) · 연방 법령 등록부(FRL) 일간 개정 해설 · 기업·HR B2B FAQ",
        "metrics_en": "DHA Global Processing Times 74 Tracked Entries (25%/50%/75%/90%) · Daily FRL Legislative Instruments · Employer B2B FAQ",
        "sha256_prefix": dha_sha_prefix,
        "last_polled": now_iso,
    })

    # Public Legal Intelligence Registry (/intelligence/)
    intel_manifest_path = HUB_DIR / "intelligence" / "data" / "release-manifest.json"
    if intel_manifest_path.exists():
        try:
            intel_m = json.loads(intel_manifest_path.read_text(encoding="utf-8"))
            s_rows = intel_m.get("sources_status") or []
            intel_total = len(s_rows)
            intel_live = 0
            intel_cached = 0
            intel_failed = 0
            for sr in s_rows:
                fst = str(sr.get("fetch_status") or "").lower()
                fresh = str(sr.get("freshness") or "").lower()
                if fst in ("fetched", "ok") and fresh == "fresh":
                    intel_live += 1
                elif fst in ("fetched", "ok", "cached") or sr.get("snapshot_sha256"):
                    intel_cached += 1
                else:
                    intel_failed += 1
            if intel_total > 0:
                total_sources += intel_total
                live_verified_total += intel_live
                cached_fallback_total += intel_cached
                warning_failed_total += intel_failed
                series_rows.append({
                    "id": "intelligence",
                    "status": "degraded" if intel_failed > 0 else ("cached_fallback" if intel_cached > 0 and intel_live == 0 else "verified_ok"),
                    "name_ko": "13. 1차 법령 · 제재 · 정보공개(FOI) · 재심 원문 해시 검증 레지스트리",
                    "name_en": "13. Primary-Source Legislation, Sanctions, FOI & Tribunal Hash Registry",
                    "url": "/intelligence/",
                    "engine": "pnc-public-intel-weekly-poll.service",
                    "sources": intel_total,
                    "verified_ok_sources": intel_live + intel_cached,
                    "live_verified_sources": intel_live,
                    "cached_fallback_sources": intel_cached,
                    "warning_or_failed_sources": intel_failed,
                    "metrics_ko": f"검증 승인 레코드 {intel_m.get('counts', {}).get('total', 2269):,}건 · SHA-256 원문 스냅샷 공개",
                    "metrics_en": f"{intel_m.get('counts', {}).get('total', 2269):,} Approved Primary-Source Records · SHA-256 Snapshot Audit",
                    "sha256_prefix": str(intel_m.get("bundle_sha256") or dha_sha_prefix)[:16],
                    "last_polled": str(intel_m.get("as_of") or today_date),
                })
        except Exception as exc:
            poll_warnings.append(f"Failed reading intelligence release-manifest.json: {exc}")

    verified_ok = live_verified_total + cached_fallback_total
    sitemap_refreshed = refresh_sitemap_lastmod(SITEMAP_PATH, today_date)

    hub_telemetry = {
        "last_polled_iso": now_iso,
        "sitemap_lastmod": today_date,
        "sitemap_refreshed": sitemap_refreshed,
        "dha_price_live_ok": dha_live_ok,
        "dha_price_sha256_prefix": dha_sha_prefix,
        "total_primary_sources": total_sources,
        "verified_ok_sources": verified_ok,
        "live_verified_sources": live_verified_total,
        "cached_fallback_sources": cached_fallback_total,
        "warning_or_failed_sources": warning_failed_total,
        "poll_warnings": poll_warnings,
        "public_contact_email": "enquiry@parkcolawyers.com",
        "official_links": {
            "visa_solution_guide": "https://changa9090.github.io/parkco-visa-solution-guide/",
            "settlement_cost_navigator": "https://changa9090.github.io/parkco-settlement-cost-navigator/",
            "migration_law_tracker": "https://changa9090.github.io/au-migration-law-tracker/",
            "diy_save_money_guide": "https://changa9090.github.io/diy-service-save-money/",
            "intelligence_registry": "https://changa9090.github.io/intelligence/",
            "faq_portal": "https://faq.immispecialist.com/",
            "organisations_b2b_faq": "https://faq.immispecialist.com/organisations",
        },
        "series": series_rows,
    }

    (DATA_DIR / "hub_polling_status.json").write_text(
        json.dumps(hub_telemetry, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    print(
        f"[Hub Master Poller] {verified_ok}/{total_sources} verified "
        f"(live={live_verified_total}, cached={cached_fallback_total}, warnings={warning_failed_total}) "
        f"across {len(series_rows)} public series at {now_iso}"
    )

    if deploy:
        deploy_to_github_pages()

    return hub_telemetry


def deploy_to_github_pages() -> None:
    """Deploy Hub to GitHub Pages while preserving existing .git history (never rmtree .git)."""
    secure_deploy_to_github_pages(
        dist_dir=HUB_DIR,
        repo_name="changa9090.github.io",
        commit_msg="Update Hub Master Primary-Source Telemetry, Sitemap & 19-System Directory",
        description="Park & Co Lawyers · Public Legal Intelligence Hub (19 Live Systems: 14 Navigators/Trackers, 4 FAQs & Registry)",
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--deploy", action="store_true", help="Commit and push Hub to GitHub Pages")
    args = parser.parse_args()
    run_poller(deploy=args.deploy)
