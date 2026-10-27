(function () {
  'use strict';

  var PAGE_SIZE = 25;
  var ABN_WEIGHTS = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

  var I18N = {
    ko: {
      brandTag: '법무법인 박앤코 · SHA-256 원문 검증 인텔리전스',
      navHub: '← 전체 12개 내비게이터 허브',
      navTracker: '비자 심사기간 (50%·90%)',
      heroOverline: 'HASH-BOUND AUSTRALIAN PRIMARY LEGAL INTELLIGENCE · LAWYER-REVIEWED RELEASE',
      heroTitleMain: '호주 공개 법률정보 · 제재 등록부 · FOI 원문 검증 센터',
      heroSub: '호주 국경수비대(ABF) 스폰서 제재·금지 고용주 법인 등록부, 연방법령 등록부(FRL)·소득기준(CSIT/SSIT/FWC) 개정 대조, 공정근로옴부즈만(FWO) 인사·노무 점검표, 내무부(DHA)·FWO 정보공개(FOI) 로그 및 행정재심심판소(ART) 통계를 원문 SHA-256 해시와 함께 검증합니다.',
      provReleaseLabel: '결정적 릴리즈 해시 (Release ID)',
      provAsOfLabel: '기준일 (As-Of Snapshot)',
      provApprovedLabel: '변호사 승인 공개 레코드',
      provSourcesLabel: '1차 공공 출처 상태',
      tabAll: '통합 원문 검색',
      tabAbf: 'F02 · ABF 법인 제재·금지 고용주',
      tabFrl: 'F04 · 법령·기준액 개정 대조',
      tabFwo: 'F05 · FWO 노무 패턴·시정 체크리스트',
      tabFoi: 'F07 · 공개 FOI & ART·시민권 통계',
      guardTitle: '법률 정보 범위 및 개인정보 보호 원칙:',
      guardText: '본 포털은 호주 연방 기관이 공개한 1차 공공 데이터를 SHA-256 해시로 고정·검증한 일반 법률 리서치 자료이며 개별 사건에 대한 법률 자문이 아닙니다. 개인정보 최소화를 위해 자연인·개인사업자(Sole Trader) 성명은 공개 법인 검색에서 자동 격리·제외되며, 검색어는 외부 분석 서버로 전송되지 않고 브라우저 내에서만 처리됩니다.',
      sourcesHeading: '공식 1차 공공 출처 수집 상태 및 라이선스 명세 (Allowlisted .gov.au Sources)',
      footerDisclaimer: '면책 및 저작권 고지: 본 시스템은 호주 정부 부처(Home Affairs, ABF, OPC Federal Register of Legislation, Fair Work Ombudsman, ART)와 제휴·보증 관계가 없는 독립 법률 정보 서비스입니다. CC BY 3.0 AU / CC BY 4.0 및 FWO CC BY-NC 4.0 메타데이터·링크 원칙을 준수하며, 수록 정보는 일반 참고용으로서 법적 효력을 갖는 자문서가 아닙니다.',
      searchPlaceholder: '법인명, 11자리 ABN, 비자 서브클래스(482/820), 법령 ID(F1996B03551), FOI 번호(FA 25/...) 검색',
      inspectBtn: '🔍 원문 증거 & SHA-256 검증',
      officialUrlBtn: '공식 원문 열기 ↗',
      copyCitBtn: '📋 출처·해시 인용문 복사',
      copiedBtn: '✓ 인용문 복사됨',
      noResults: '선택하신 검색어·필터 조건과 일치하는 승인 레코드가 없습니다.'
    },
    en: {
      brandTag: 'Park & Co Lawyers · Hash-Bound Legal Intelligence',
      navHub: '← All 12 Legal Navigators',
      navTracker: 'Visa Processing Times (50%·90%)',
      heroOverline: 'HASH-BOUND AUSTRALIAN PRIMARY LEGAL INTELLIGENCE · LAWYER-REVIEWED RELEASE',
      heroTitleMain: 'Australian Public Legal Intelligence & Provenance Centre',
      heroSub: 'Verify corporate ABF Sanctioned Sponsors & Prohibited Employers, Federal Register of Legislation (FRL) & threshold semantic diffs, Fair Work (FWO) HR compliance checklists, DHA/FWO FOI disclosure logs, and dual-denominator ART statistics with SHA-256 provenance.',
      provReleaseLabel: 'Deterministic Release ID',
      provAsOfLabel: 'As-Of Snapshot Date',
      provApprovedLabel: 'Lawyer-Approved Records',
      provSourcesLabel: 'Primary Source Health',
      tabAll: 'Unified Search',
      tabAbf: 'F02 · Corporate ABF Sanctions',
      tabFrl: 'F04 · Legislation & Threshold Diffs',
      tabFwo: 'F05 · FWO Patterns & HR Checklists',
      tabFoi: 'F07 · Official FOI & ART/Citizenship Stats',
      guardTitle: 'Legal Scope & Privacy Minimization Notice:',
      guardText: 'This portal presents hash-bound primary Australian government metadata for general legal research and does not constitute legal advice. Natural-person / sole-trader names are excluded from corporate search for privacy minimization, and search queries never leave your browser.',
      sourcesHeading: 'Allowlisted Primary .gov.au Source Health & Licence Matrix',
      footerDisclaimer: 'Disclaimer & Attribution: Independent legal intelligence published by Park & Co Lawyers (not affiliated with or endorsed by the Australian Government). Published under CC BY 3.0 AU / CC BY 4.0 and FWO CC BY-NC 4.0 metadata-and-link attribution rules.',
      searchPlaceholder: 'Search corporate name, 11-digit ABN, subclass (482/820), FRL Title ID, or FOI ref (FA 25/...)',
      inspectBtn: '🔍 Inspect SHA-256 Evidence',
      officialUrlBtn: 'Official Source ↗',
      copyCitBtn: '📋 Copy Verified Citation',
      copiedBtn: '✓ Citation Copied',
      noResults: 'No lawyer-approved records match the current search and filter criteria.'
    }
  };

  var state = {
    lang: 'ko',
    activeTab: 'all',
    query: '',
    stateFilter: '',
    subkindFilter: '',
    page: 1,
    manifest: null,
    records: [],
    lastFocusedEl: null
  };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function validateAbnMod89(raw) {
    var digits = String(raw || '').replace(/\D/g, '');
    if (digits.length !== 11) return null;
    var nums = digits.split('').map(Number);
    nums[0] -= 1;
    var total = 0;
    for (var i = 0; i < 11; i++) total += nums[i] * ABN_WEIGHTS[i];
    return { digits: digits, valid: total % 89 === 0 };
  }

  function formatAbn(abn) {
    if (!abn || String(abn).length !== 11) return abn || '—';
    var s = String(abn);
    return s.slice(0, 2) + ' ' + s.slice(2, 5) + ' ' + s.slice(5, 8) + ' ' + s.slice(8, 11);
  }

  function t(key) {
    return (I18N[state.lang] && I18N[state.lang][key]) || I18N.ko[key] || key;
  }

  function applyLanguage(lang) {
    state.lang = lang === 'en' ? 'en' : 'ko';
    document.documentElement.lang = state.lang;
    document.getElementById('lang-ko').classList.toggle('active', state.lang === 'ko');
    document.getElementById('lang-en').classList.toggle('active', state.lang === 'en');
    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      var k = node.getAttribute('data-i18n');
      if (I18N[state.lang][k]) node.textContent = I18N[state.lang][k];
    });
    var searchEl = document.getElementById('intel-search');
    if (searchEl) searchEl.placeholder = t('searchPlaceholder');
    renderAll();
  }

  function recordMatchesTab(rec) {
    if (state.activeTab === 'all') return true;
    if (state.activeTab === 'foi_and_stats') {
      return rec.domain === 'foi_disclosure' || rec.domain === 'tribunal_and_citizenship_stats';
    }
    return rec.domain === state.activeTab;
  }

  function recordMatchesFilters(rec) {
    if (!recordMatchesTab(rec)) return false;
    var p = rec.payload || {};

    if (state.stateFilter) {
      if ((p.state || '') !== state.stateFilter) return false;
    }

    if (state.subkindFilter) {
      var sk = state.subkindFilter;
      var matchedSub = (
        p.period_label === sk ||
        p.event_type === sk ||
        p.basis_tier === sk ||
        p.foi_agency === sk
      );
      if (!matchedSub) return false;
    }

    if (state.query) {
      var qNorm = state.query.toLowerCase();
      var qDigits = state.query.replace(/\D/g, '');
      var hay = JSON.stringify(p).toLowerCase() + ' ' + (rec.source_id || '').toLowerCase() + ' ' + (rec.agency || '').toLowerCase();
      if (qDigits.length >= 9 && p.abn && String(p.abn).indexOf(qDigits) >= 0) {
        return true;
      }
      var terms = qNorm.split(/\s+/).filter(Boolean);
      for (var i = 0; i < terms.length; i++) {
        if (hay.indexOf(terms[i]) === -1) return false;
      }
    }
    return true;
  }

  function sortRecords(list) {
    var domainPriority = {
      legislation_watch: 1,
      tribunal_and_citizenship_stats: 2,
      fwo_compliance: 3,
      abf_enforcement: 4,
      foi_disclosure: 5
    };
    return list.slice().sort(function (a, b) {
      if (state.activeTab === 'foi_and_stats') {
        var pa = a.domain === 'tribunal_and_citizenship_stats' ? 0 : 1;
        var pb = b.domain === 'tribunal_and_citizenship_stats' ? 0 : 1;
        if (pa !== pb) return pa - pb;
        var da = (a.payload && a.payload.disclosure_date) || '';
        var db = (b.payload && b.payload.disclosure_date) || '';
        return db.localeCompare(da);
      }
      if (state.activeTab === 'abf_enforcement') {
        var prohA = (a.payload && a.payload.event_type === 'prohibited_employer_declaration') ? 0 : 1;
        var prohB = (b.payload && b.payload.event_type === 'prohibited_employer_declaration') ? 0 : 1;
        if (prohA !== prohB) return prohA - prohB;
        var ia = (a.payload && a.payload.imposed_date) || '';
        var ib = (b.payload && b.payload.imposed_date) || '';
        return ib.localeCompare(ia);
      }
      if (state.activeTab === 'all' && !state.query) {
        var dpa = domainPriority[a.domain] || 9;
        var dpb = domainPriority[b.domain] || 9;
        if (dpa !== dpb) return dpa - dpb;
      }
      return 0;
    });
  }

  function addKv(grid, label, val, isMono) {
    var item = el('div', 'kv-item');
    item.appendChild(el('span', '', label));
    item.appendChild(el('strong', isMono ? 'mono num' : 'num', val == null || val === '' ? '—' : val));
    grid.appendChild(item);
  }

  function buildCard(rec) {
    var en = state.lang === 'en';
    var p = rec.payload || {};
    var card = el('article', 'intel-card');

    var top = el('div', 'intel-card__top');
    var badges = el('div', 'badges-row');
    badges.appendChild(el('span', 'badge badge--stone', rec.agency));

    if (rec.domain === 'abf_enforcement') {
      var isProh = p.event_type === 'prohibited_employer_declaration';
      badges.appendChild(
        el(
          'span',
          isProh ? 'badge badge--red' : 'badge badge--burgundy',
          isProh
            ? (en ? 's 245AYB Prohibited Employer' : 's 245AYB 금지 고용주 선언')
            : (en ? 'Administrative Sponsor Sanction' : 'ABF 스폰서 행정제재')
        )
      );
      var pCls = p.period_label === 'within_source_period' ? 'badge badge--warn' : 'badge badge--stone';
      var pTxt = p.period_label === 'within_source_period'
        ? (en ? 'Within Published Period' : '원문 기재 제재기간 내')
        : (p.period_label === 'source_period_ended'
          ? (en ? 'Published End Date Passed' : '원문 종료일 경과')
          : (en ? 'Boundary Unspecified' : '종료일 미기재'));
      badges.appendChild(el('span', pCls, pTxt));
      if (p.state) badges.appendChild(el('span', 'badge badge--navy', p.state + (p.postcode ? ' ' + p.postcode : '')));
    } else if (rec.domain === 'legislation_watch') {
      var isDiff = p.change_kind === 'statutory_threshold_diff';
      badges.appendChild(
        el('span', 'badge badge--burgundy', isDiff ? (en ? 'Threshold / Reform Diff' : '기준액·개정 시맨틱 대조') : 'FRL Compilation Watch')
      );
      if (p.future_compilation_scheduled) {
        badges.appendChild(el('span', 'badge badge--warn', (en ? 'Future End Scheduled: ' : '후속 개정 예정: ') + p.scheduled_end_date));
      }
      badges.appendChild(el('span', 'badge badge--navy', en ? (p.practice_area_en || 'Commonwealth Law') : (p.practice_area_ko || '호주 연방법')));
    } else if (rec.domain === 'fwo_compliance') {
      var tierCls = p.basis_tier === 'statutory_obligation' ? 'badge badge--burgundy'
        : (p.basis_tier === 'official_guidance' ? 'badge badge--navy' : 'badge badge--warn');
      badges.appendChild(el('span', tierCls, en ? (p.basis_badge_en || p.basis_tier) : (p.basis_badge_ko || p.basis_tier)));
    } else if (rec.domain === 'foi_disclosure') {
      badges.appendChild(el('span', 'badge badge--navy', 'FOI s 11C · ' + (p.foi_agency || rec.agency)));
      if (p.access_decision) badges.appendChild(el('span', 'badge badge--green', p.access_decision));
    } else if (rec.domain === 'tribunal_and_citizenship_stats') {
      badges.appendChild(el('span', 'badge badge--burgundy', en ? 'Dual-Denominator / Cohort Verified' : '분모 분리 · 코호트 검증 통계'));
    }

    top.appendChild(badges);
    top.appendChild(el('span', 'mono', 'SHA ' + String(rec.snapshot_sha256 || '').slice(0, 10)));
    card.appendChild(top);

    // Title & Body per domain
    if (rec.domain === 'abf_enforcement') {
      var titleStr = p.legal_name + (p.trading_name ? ' (t/a ' + p.trading_name + ')' : '');
      card.appendChild(el('h3', 'intel-card__title', titleStr));
      var kv = el('div', 'kv-grid');
      addKv(kv, 'ABN (Mod-89 Verified)', formatAbn(p.abn), true);
      addKv(kv, en ? 'State / Postcode' : '주 / 우편번호', (p.state || '—') + ' ' + (p.postcode || ''), true);
      addKv(kv, en ? 'Imposed Date' : '처분 부과일', p.imposed_date);
      addKv(kv, en ? 'Published End Date' : '원문 종료일', p.end_date || (en ? 'Not specified' : '원문 미기재'));
      addKv(kv, en ? 'Action / Sanction' : '처분 요약', p.action_summary);
      addKv(kv, en ? 'Regulations / Basis' : '관련 조문', p.obligations_raw || p.statutory_basis);
      card.appendChild(kv);
    } else if (rec.domain === 'legislation_watch') {
      var lTitle = p.change_kind === 'statutory_threshold_diff'
        ? (en ? p.title_en : p.title_ko)
        : (p.title_name + ' — ' + p.register_id + ' (Comp. ' + (p.compilation_number || '-') + ')');
      card.appendChild(el('h3', 'intel-card__title', lTitle));
      card.appendChild(el('p', 'intel-card__body', en ? p.summary_en : p.summary_ko));
      var kvL = el('div', 'kv-grid');
      if (p.change_kind === 'statutory_threshold_diff') {
        addKv(kvL, en ? 'Previous Setting' : '종전 기준', p.previous_value);
        addKv(kvL, en ? 'Current Setting' : '현행 기준', p.new_value);
        addKv(kvL, en ? 'Effective Window' : '적용 기준일', p.effective_window || p.effective_date);
        addKv(kvL, en ? 'Authority' : '법적 근거', p.statutory_authority);
      } else {
        addKv(kvL, 'FRL Title / Register ID', p.title_id + ' / ' + p.register_id, true);
        addKv(kvL, en ? 'Legal Start Date' : '법적 시행일 (start)', p.start_date);
        addKv(kvL, en ? 'FRL Registered Date' : 'FRL 등록일 (registeredAt)', p.registered_at_date);
        addKv(kvL, en ? 'Scheduled End Boundary' : '예정 종료 경계일 (end)', p.scheduled_end_date || 'Current (Open)');
      }
      card.appendChild(kvL);
      if (Array.isArray(p.affected_navigator_links) && p.affected_navigator_links.length > 0) {
        var navRow = el('div', 'badges-row');
        navRow.style.marginBottom = '10px';
        p.affected_navigator_links.forEach(function (nv) {
          var a = el('a', 'btn-link-ext', '🧭 ' + (en ? nv.label_en : nv.label_ko));
          a.href = nv.url;
          navRow.appendChild(a);
        });
        card.appendChild(navRow);
      }
    } else if (rec.domain === 'fwo_compliance') {
      card.appendChild(el('h3', 'intel-card__title', en ? p.title_en : p.title_ko));
      if (p.denominators) {
        var kvF = el('div', 'kv-grid');
        addKv(kvF, en ? 'Audited Businesses' : '감사 대상 사업장', p.denominators.audited_businesses);
        addKv(kvF, en ? 'Non-Compliant Businesses' : '위반 확인 사업장', p.denominators.non_compliant_businesses);
        addKv(kvF, en ? 'Monetary Recovery Cases' : '금전 환수 사업장', p.denominators.monetary_recovery_businesses);
        addKv(kvF, en ? 'Employees Back-Paid' : '환수 대상 근로자 수', p.denominators.employees_back_paid);
        addKv(kvF, en ? 'Total Recovered' : '총 환수 금액', p.denominators.total_recovered_aud);
        card.appendChild(kvF);
      }
      var steps = en ? p.checklist_steps_en : p.checklist_steps_ko;
      if (Array.isArray(steps) && steps.length) {
        var ul = el('ul', 'checklist-ul');
        steps.forEach(function (st) { ul.appendChild(el('li', '', st)); });
        card.appendChild(ul);
      }
    } else if (rec.domain === 'foi_disclosure') {
      card.appendChild(el('h3', 'intel-card__title', p.foi_ref + ' — ' + p.summary));
      var kvFoi = el('div', 'kv-grid');
      addKv(kvFoi, en ? 'FOI Reference' : '공개 참조번호', p.foi_ref, true);
      addKv(kvFoi, en ? 'Disclosure Date' : '공개일자', p.disclosure_date);
      addKv(kvFoi, en ? 'Agency / Year' : '기관 / 연도', (p.foi_agency || rec.agency) + (p.log_year ? ' (' + p.log_year + ')' : ''));
      addKv(kvFoi, en ? 'Access Scope' : '공개 범위', p.access_decision || 'Published s 11C');
      card.appendChild(kvFoi);
      if (Array.isArray(p.document_urls) && p.document_urls.length) {
        var docRow = el('div', 'badges-row');
        docRow.style.marginBottom = '10px';
        p.document_urls.forEach(function (u, idx) {
          var da = el('a', 'btn-link-ext', '📄 ' + (en ? 'Official Released PDF #' + (idx + 1) : '공식 공개 PDF 원문 #' + (idx + 1)) + ' ↗');
          da.href = u;
          da.target = '_blank';
          da.rel = 'noopener noreferrer';
          docRow.appendChild(da);
        });
        card.appendChild(docRow);
      }
    } else if (rec.domain === 'tribunal_and_citizenship_stats') {
      card.appendChild(el('h3', 'intel-card__title', en ? p.title_en : p.title_ko));
      card.appendChild(el('p', 'intel-card__body', en ? p.summary_en : p.summary_ko));
      var kvS = el('div', 'kv-grid');
      if (p.all_finalised_rate) {
        addKv(kvS, en ? 'All Finalisations Rate' : '전체 종결 분모 인용률', p.all_finalised_rate + ' (' + p.remitted_or_set_aside_count + '/' + p.all_finalised_denominator + ')');
        addKv(kvS, en ? 'Substantive Merits Rate' : '본안 판단 분모 인용률', p.substantive_restricted_rate + ' (' + p.remitted_or_set_aside_count + '/' + p.substantive_restricted_denominator + ')');
        addKv(kvS, en ? 'Procedural / Withdrawn' : '취하·각하 분리 건수', p.procedural_dismissal_or_withdrawn_count);
        addKv(kvS, en ? 'Series Transition Break' : '시계열 전환 경계일', p.structural_break_date);
      } else if (p.study_on_hand_share) {
        addKv(kvS, en ? 'Study On-Hand Stock Share' : '학생비자 계류 잔량(Stock) 비중', p.study_on_hand_share);
        addKv(kvS, en ? 'Working Stream Clearance' : '취업비자 기간 처리율(Clearance)', p.working_skilled_clearance_rate);
        addKv(kvS, en ? 'Series Transition Break' : '시계열 전환 경계일', p.structural_break_date);
      } else if (p.conferral_on_hand !== undefined) {
        addKv(kvS, en ? 'Conferral On-Hand Queue' : '시민권 Conferral 계류 건수', Number(p.conferral_on_hand).toLocaleString());
        addKv(kvS, en ? 'Percentile Additivity' : '단계별 백분위 합산 가능 여부', en ? 'Non-Additive (Independent Cohorts)' : '합산 불가 (독립 코호트)');
      }
      card.appendChild(kvS);
    }

    // Footer with scope warning + Official Link + F01 Evidence Drawer trigger
    var foot = el('div', 'intel-card__foot');
    var noteStr = en
      ? (p.source_lag_note_en || p.scope_warning_en || p.scope_note_en || p.date_separation_note_en || '')
      : (p.source_lag_note_ko || p.scope_warning_ko || p.scope_note_ko || p.date_separation_note_ko || '');
    foot.appendChild(el('div', 'scope-note', noteStr));

    var actWrap = el('div', 'badges-row');
    var extUrl = p.official_reference_url || rec.source_url;
    if (extUrl) {
      var extA = el('a', 'btn-link-ext', t('officialUrlBtn'));
      extA.href = extUrl;
      extA.target = '_blank';
      extA.rel = 'noopener noreferrer';
      actWrap.appendChild(extA);
    }
    var evBtn = el('button', 'btn-evidence', t('inspectBtn'));
    evBtn.type = 'button';
    evBtn.addEventListener('click', function () { openEvidenceDrawer(rec, evBtn); });
    actWrap.appendChild(evBtn);
    foot.appendChild(actWrap);

    card.appendChild(foot);
    return card;
  }

  function openEvidenceDrawer(rec, triggerEl) {
    state.lastFocusedEl = triggerEl || document.activeElement;
    var en = state.lang === 'en';
    var body = document.getElementById('drawer-body');
    body.textContent = '';

    // 1. Status Axes (8 Axes)
    var secAxes = el('div', 'drawer-section');
    secAxes.appendChild(el('h4', '', en ? '1. Verification & Governance Status Axes' : '1. 8대 검증·거버넌스 상태 축 (Status Axes)'));
    var axesGrid = el('div', 'axes-grid');
    var axes = rec.status_axes || {};
    Object.keys(axes).forEach(function (k) {
      var cell = el('div', '');
      cell.appendChild(el('strong', '', k + ': '));
      cell.appendChild(el('span', 'badge badge--green', axes[k]));
      axesGrid.appendChild(cell);
    });
    secAxes.appendChild(axesGrid);
    body.appendChild(secAxes);

    // 2. Cryptographic Hashes & Locator
    var secHash = el('div', 'drawer-section');
    secHash.appendChild(el('h4', '', en ? '2. Cryptographic SHA-256 Hashes & Exact Locator' : '2. 원문 스냅샷 · 정규화 팩트 SHA-256 해시 및 로케이터'));
    secHash.appendChild(el('div', '', 'Record ID: ' + rec.record_id + ' · Source ID: ' + rec.source_id));
    secHash.appendChild(el('div', '', en ? 'Raw Snapshot SHA-256:' : '원문 응답 바이트 SHA-256 (snapshot_sha256):'));
    secHash.appendChild(el('div', 'hash-box mono', rec.snapshot_sha256));
    secHash.appendChild(el('div', '', en ? 'Canonical Fact SHA-256:' : '정규화 팩트 SHA-256 (fact_sha256):'));
    secHash.appendChild(el('div', 'hash-box mono', rec.fact_sha256));
    secHash.appendChild(el('div', '', en ? 'Exact Source Locator:' : '원문 내 위치 로케이터 (locator):'));
    secHash.appendChild(el('div', 'hash-box mono', JSON.stringify(rec.locator)));
    body.appendChild(secHash);

    // 3. Separated Timestamps
    var secTime = el('div', 'drawer-section');
    secTime.appendChild(el('h4', '', en ? '3. Strictly Separated Timestamps' : '3. 시점 분리 기록 (수집일 vs 변호사 검토일)'));
    secTime.appendChild(el('div', 'mono', 'Retrieved (UTC): ' + rec.retrieved_at_utc));
    secTime.appendChild(el('div', 'mono', 'Lawyer Reviewed (UTC): ' + rec.reviewed_at_utc + ' (' + rec.reviewer_role + ')'));
    body.appendChild(secTime);

    // 4. Attribution & Citation Copy
    var secAttr = el('div', 'drawer-section');
    secAttr.appendChild(el('h4', '', en ? '4. Official Source & Licence Attribution' : '4. 공식 출처 URL 및 라이선스 출처 표시'));
    var attr = rec.attribution || {};
    secAttr.appendChild(el('div', '', (attr.licence || '') + ' — ' + (attr.attribution_text || '')));
    var srcLink = el('a', 'btn-link-ext', rec.source_url);
    srcLink.href = rec.source_url;
    srcLink.target = '_blank';
    srcLink.rel = 'noopener noreferrer';
    srcLink.style.marginTop = '8px';
    srcLink.style.wordBreak = 'break-all';
    secAttr.appendChild(srcLink);

    var copyBtn = el('button', 'btn-evidence', t('copyCitBtn'));
    copyBtn.type = 'button';
    copyBtn.style.marginTop = '12px';
    copyBtn.style.display = 'block';
    copyBtn.addEventListener('click', function () {
      var cit = '[' + rec.agency + '] ' + rec.source_url + ' | Locator: ' + JSON.stringify(rec.locator) +
        ' | Retrieved: ' + rec.retrieved_at_utc + ' | Snapshot SHA-256: ' + rec.snapshot_sha256;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cit).then(function () {
          copyBtn.textContent = t('copiedBtn');
        });
      }
    });
    secAttr.appendChild(copyBtn);
    body.appendChild(secAttr);

    var drawer = document.getElementById('evidence-drawer');
    var backdrop = document.getElementById('drawer-backdrop');
    drawer.classList.add('open');
    backdrop.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.getElementById('drawer-close-btn').focus();
  }

  function closeEvidenceDrawer() {
    var drawer = document.getElementById('evidence-drawer');
    var backdrop = document.getElementById('drawer-backdrop');
    if (!drawer.classList.contains('open')) return;
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    if (state.lastFocusedEl && typeof state.lastFocusedEl.focus === 'function') {
      state.lastFocusedEl.focus();
    }
  }

  function renderCounts() {
    var allN = state.records.length;
    var abfN = 0, frlN = 0, fwoN = 0, foiN = 0;
    state.records.forEach(function (r) {
      if (r.domain === 'abf_enforcement') abfN++;
      else if (r.domain === 'legislation_watch') frlN++;
      else if (r.domain === 'fwo_compliance') fwoN++;
      else if (r.domain === 'foi_disclosure' || r.domain === 'tribunal_and_citizenship_stats') foiN++;
    });
    document.getElementById('cnt-all').textContent = allN.toLocaleString();
    document.getElementById('cnt-abf').textContent = abfN.toLocaleString();
    document.getElementById('cnt-frl').textContent = frlN.toLocaleString();
    document.getElementById('cnt-fwo').textContent = fwoN.toLocaleString();
    document.getElementById('cnt-foi').textContent = foiN.toLocaleString();
  }

  function renderSourcesTable() {
    var tbody = document.getElementById('sources-status-tbody');
    tbody.textContent = '';
    if (!state.manifest || !Array.isArray(state.manifest.sources_status)) return;
    state.manifest.sources_status.forEach(function (s) {
      var tr = el('tr');
      var tdId = el('td', 'mono');
      var a = el('a', '', s.source_id);
      a.href = s.landing_url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      tdId.appendChild(a);
      tr.appendChild(tdId);
      tr.appendChild(el('td', '', s.agency));
      var tdSt = el('td');
      tdSt.appendChild(el('span', s.fetch_status === 'fetched' ? 'badge badge--green' : 'badge badge--warn', s.fetch_status));
      tr.appendChild(tdSt);
      tr.appendChild(el('td', 'num', Number(s.approved_records || 0).toLocaleString()));
      tr.appendChild(el('td', 'mono', s.snapshot_sha256 ? String(s.snapshot_sha256).slice(0, 16) + '…' : '—'));
      tr.appendChild(el('td', '', s.licence));
      tbody.appendChild(tr);
    });
  }

  function renderAll() {
    var abnBox = document.getElementById('abn-validation-msg');
    var abnCheck = validateAbnMod89(state.query);
    if (abnCheck) {
      abnBox.hidden = false;
      abnBox.style.color = abnCheck.valid ? '#2E6B4F' : '#B23A2E';
      abnBox.textContent = abnCheck.valid
        ? (state.lang === 'en' ? '✓ Valid 11-digit Australian Business Number (ATO Modulus-89 verified): ' : '✓ 유효한 11자리 호주 사업자등록번호(ABN Mod-89 검증 통과): ') + formatAbn(abnCheck.digits)
        : (state.lang === 'en' ? '⚠ Invalid 11-digit ABN checksum (ATO Modulus-89 failed)' : '⚠ 11자리 ABN 체크섬 불일치 (오타 여부를 확인하세요)');
    } else {
      abnBox.hidden = true;
    }

    var filtered = sortRecords(state.records.filter(recordMatchesFilters));
    var totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (state.page > totalPages) state.page = totalPages;

    var startIdx = (state.page - 1) * PAGE_SIZE;
    var slice = filtered.slice(startIdx, startIdx + PAGE_SIZE);

    var summaryEl = document.getElementById('results-summary-text');
    summaryEl.textContent = state.lang === 'en'
      ? ('Showing ' + (filtered.length ? (startIdx + 1) + '–' + (startIdx + slice.length) : '0') + ' of ' + filtered.length.toLocaleString() + ' lawyer-approved records')
      : ('변호사 승인 공개 레코드 총 ' + filtered.length.toLocaleString() + '건 중 ' + (filtered.length ? (startIdx + 1) + '–' + (startIdx + slice.length) : '0') + '건 표시');

    var container = document.getElementById('cards-container');
    container.textContent = '';
    if (!slice.length) {
      container.appendChild(el('div', 'intel-card', t('noResults')));
    } else {
      slice.forEach(function (rec) {
        container.appendChild(buildCard(rec));
      });
    }

    var pager = document.getElementById('pager-bar');
    pager.hidden = totalPages <= 1;
    document.getElementById('pager-status').textContent = state.page + ' / ' + totalPages;
    document.getElementById('btn-prev-page').disabled = state.page <= 1;
    document.getElementById('btn-next-page').disabled = state.page >= totalPages;
  }

  function bindEvents() {
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.tab-btn').forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        state.activeTab = btn.getAttribute('data-tab') || 'all';
        state.page = 1;
        renderAll();
      });
    });

    document.getElementById('intel-search').addEventListener('input', function (e) {
      state.query = e.target.value.trim();
      state.page = 1;
      renderAll();
    });

    document.getElementById('filter-state').addEventListener('change', function (e) {
      state.stateFilter = e.target.value;
      state.page = 1;
      renderAll();
    });

    document.getElementById('filter-subkind').addEventListener('change', function (e) {
      state.subkindFilter = e.target.value;
      state.page = 1;
      renderAll();
    });

    document.getElementById('btn-prev-page').addEventListener('click', function () {
      if (state.page > 1) { state.page--; renderAll(); window.scrollTo({ top: 260, behavior: 'smooth' }); }
    });
    document.getElementById('btn-next-page').addEventListener('click', function () {
      state.page++; renderAll(); window.scrollTo({ top: 260, behavior: 'smooth' });
    });

    document.getElementById('lang-ko').addEventListener('click', function () { applyLanguage('ko'); });
    document.getElementById('lang-en').addEventListener('click', function () { applyLanguage('en'); });

    document.getElementById('drawer-close-btn').addEventListener('click', closeEvidenceDrawer);
    document.getElementById('drawer-backdrop').addEventListener('click', closeEvidenceDrawer);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeEvidenceDrawer();
    });
  }

  function loadRelease() {
    fetch('./data/release-manifest.json')
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (manifest) {
        state.manifest = manifest;
        document.getElementById('prov-release-id').textContent = String(manifest.release_id || '').slice(0, 16) + '…';
        document.getElementById('prov-as-of').textContent = manifest.as_of || '—';
        var okSrc = (manifest.sources_status || []).filter(function (s) { return s.fetch_status === 'fetched'; }).length;
        var totSrc = (manifest.sources_status || []).length;
        document.getElementById('prov-sources-health').textContent = okSrc + ' / ' + totSrc + ' Verified (HTTP 200)';
        document.getElementById('bundle-sha-inline').textContent = 'Bundle SHA-256: ' + String(manifest.bundle_sha256 || '').slice(0, 20) + '…';
        renderSourcesTable();
        return fetch('./data/' + manifest.bundle_path);
      })
      .then(function (r) {
        if (!r.ok) throw new Error('Bundle HTTP ' + r.status);
        return r.json();
      })
      .then(function (bundle) {
        state.records = Array.isArray(bundle.records) ? bundle.records : [];
        document.getElementById('prov-record-count').textContent = state.records.length.toLocaleString() + ' Verified';
        renderCounts();
        renderAll();
      })
      .catch(function (err) {
        document.getElementById('results-summary-text').textContent = 'Failed to load verified release bundle: ' + err.message;
      });
  }

  bindEvents();
  var params = new URLSearchParams(window.location.search);
  if (params.get('lang') === 'en') applyLanguage('en');
  loadRelease();
})();
