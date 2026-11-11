(function () {
  'use strict';

  var CSS = (typeof window !== 'undefined' && window.CSS && typeof window.CSS.escape === 'function')
    ? window.CSS
    : {
        escape: function (val) {
          return String(val == null ? '' : val).replace(/(["\\#.:[\]()>+~*^$|=\s'])/g, '\\$1');
        }
      };

  var PAGE_SIZE = 25;
  var ABN_WEIGHTS = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  var VALID_TABS = ['all', 'abf_enforcement', 'legislation_watch', 'fwo_compliance', 'foi_and_stats'];

  var I18N = {
    ko: {
      pageTitle: '법무법인 박앤코 (Park & Co Lawyers) · 데이터 출처 및 1차 법령 자동 검증 레지스트리',
      metaDesc: '호주 국경수비대(ABF) 법인 스폰서 제재·금지 고용주 조회, 연방법령(FRL)·소득기준 개정 대조, 공정근로옴부즈만(FWO) 법규준수 체크리스트, 이민성(DHA)·FWO FOI 공개문서 및 행정재심기구(ART) 이중분모 통계 원문 검증 포털.',
      langBtnKo: '한국어 (KO)',
      brandTag: '법무법인 박앤코 · SHA-256 원문 검증 인텔리전스',
      navHub: '← 박앤코 법률·비자 통합 허브',
      navDiy: '셀프 법률 해결 · 비용절감 가이드',
      navVisaGuide: '비자 솔루션 가이드',
      navFaq: '호주이민 FAQ',
      navOrgFaq: '기업·HR FAQ',
      navTracker: '비자 심사기간 (50%·90%)',
      navInquiry: '🔗 공식 상담 · 문의 ↗',
      footerFirmName: '법무법인 박앤코 (PNC Legal Pty Ltd t/a Park & Co Lawyers)',
      footerPracticeAreas: '호주 이민법 · 고용법 · 가족법',
      footerInquiry: '박앤코 공식 문의 · 상담 허브 (parklawyers.com.au/links)',
      footerHubLink: '박앤코 법률·비자 진단 허브',
      footerDiy: '셀프 법률 해결 · 비용절감 가이드',
      footerVisaGuide: '호주 비자 솔루션 가이드',
      footerFaq: '호주이민 실전 FAQ',
      footerOrgFaq: '기업·스폰서 B2B FAQ',
      vcTotal: '누적 방문',
      vcToday: '오늘 방문',
      vcVisitors: '방문자',
      vcTitle: '클릭하면 최근 30일 방문 추이와 유입 경로를 볼 수 있습니다',
      heroOverline: 'HASH-BOUND AUSTRALIAN PRIMARY LEGAL INTELLIGENCE · LAWYER-REVIEWED RELEASE',
      heroTitleMain: '호주 공개 법률정보 · 제재 등록부 · FOI 원문 검증 센터',
      heroSub: '호주 국경수비대(ABF) 스폰서 제재·금지 고용주 법인 등록부, 연방법령 등록부(FRL)·소득기준(CSIT/SSIT/FWC) 개정 대조, 공정근로옴부즈만(FWO) 인사·노무 점검표, 이민성(DHA)·FWO 정보공개(FOI) 목록 및 행정재심기구(ART) 통계를 원문 SHA-256 해시와 함께 검증합니다.',
      provReleaseLabel: '결정적 릴리즈 해시 (Release ID)',
      provAsOfLabel: '기준일 (As-Of Snapshot)',
      provApprovedLabel: '변호사 승인 공개 레코드',
      provSourcesLabel: '1차 공공 출처 상태',
      tabAll: '통합 원문 검색',
      tabAbf: 'F02 · ABF 법인 제재·금지 고용주',
      tabFrl: 'F04 · 법령·기준액 개정 대조',
      tabFwo: 'F05 · FWO 노무 패턴·시정 체크리스트',
      tabFoi: 'F07 · 공개 FOI & ART·시민권 통계',
      optStateAll: '전체 주/관할 (All States)',
      optStateCth: '연방 공통 관할 (Commonwealth-Wide)',
      optTypeAll: '전체 세부유형 (All Types)',
      optTypeWithin: 'ABF 원문 제재기간 내 (Within Period)',
      optTypeEnded: 'ABF 원문 종료일 경과 (Period Ended)',
      optTypeProh: 's 245AYB 금지 고용주 (Prohibited Employer)',
      optTypeFrlComp: 'FRL 연방법령 컴필레이션 추적 (FRL Watch)',
      optTypeFrlDiff: '기준액·제도 개정 대조 (Threshold Diff)',
      optTypeStat: 'FWO 법정 강행의무 (Statutory Duty)',
      optTypeGuid: 'FWO 행정 가이드라인 (Official Guidance)',
      optTypeEu: 'FWO s 715 집행약정 패턴 (EU Pattern)',
      optTypeAudit: 'FWO 캠페인·실태조사 보고서 (Audit Report)',
      optTypeDha: '이민성 FOI (DHA Disclosure Log)',
      optTypeFwo: '공정근로 FOI (FWO Disclosure Log)',
      optTypeArtStats: '행정재심기구(ART) 재심 통계 (ART Stats)',
      optTypeCitStats: '시민권 부여 단계별 통계 (Citizenship Stats)',
      resetFiltersBtn: '검색·필터 초기화',
      drawerTitle: '원문 증거 및 해시 검증 상세',
      guardTitle: '법률 정보 범위 및 개인정보 보호 원칙:',
      guardText: '이 포털은 호주 연방 기관이 공개한 1차 공공 데이터를 SHA-256 해시로 검증해 제공하는 일반 법률 리서치 자료로 개별 사건의 법률 자문이 아닙니다. 개인정보 최소화를 위해 자연인·개인사업자(Sole Trader) 성명은 공개 법인 검색에서 제외하고 입력한 검색어는 외부 서버로 전송하지 않고 브라우저 안에서만 처리합니다.',
      sourcesHeading: '공식 1차 공공 출처 수집 상태 및 라이선스 명세 (Allowlisted .gov.au Sources)',
      thSourceId: '출처 ID',
      thAgency: '관할 기관',
      thStatus: '수집 상태',
      thApproved: '승인 레코드',
      thSnapshotSha: '스냅샷 SHA-256',
      thLicence: '라이선스',
      footerDisclaimer: '면책 및 저작권 고지: 이 시스템은 호주 정부 부처(이민성, ABF, 연방법령 등록부 FRL, 공정근로옴부즈만 FWO, 행정재심기구 ART)와 제휴·보증 관계가 없는 독립 법률 정보 서비스입니다. CC BY 3.0 AU / CC BY 4.0 및 FWO CC BY-NC 4.0 메타데이터·링크 원칙을 준수하고 수록 정보는 일반 참고용일 뿐 법적 효력을 갖는 자문서가 아닙니다.',
      searchPlaceholder: '법인명, 11자리 ABN, 비자 번호(482/820/500), 한글 키워드(학생비자/시민권/브리즈번), FOI 번호(FA 25/...) 검색',
      inspectBtn: '🔍 원문 증거 & SHA-256 검증',
      officialUrlBtn: '공식 원문 열기 ↗',
      copyCitBtn: '📋 출처·해시 인용문 복사',
      copiedBtn: '✓ 인용문 복사됨',
      copyLinkBtn: '🔗 직접 링크 복사 (?id=…)',
      copiedLinkBtn: '✓ 직접 링크 복사됨',
      noResults: '선택하신 검색어·필터 조건과 일치하는 승인 레코드가 없습니다.',
      loadingDomain: '데이터 샤드를 불러오는 중…'
    },
    en: {
      pageTitle: 'Park & Co Lawyers · Australian Public Legal Intelligence & SHA-256 Provenance Centre',
      metaDesc: 'Hash-bound Australian public legal intelligence portal by Park & Co Lawyers covering corporate ABF sanctions, Federal Register of Legislation (FRL) compilation & threshold diffs, Fair Work compliance checklists, DHA/FWO FOI disclosures, and ART dual-denominator statistics.',
      langBtnKo: 'Korean (KO)',
      brandTag: 'Park & Co Lawyers · Hash-Bound Legal Intelligence',
      navHub: '← Park & Co Legal & Visa Hub',
      navDiy: 'DIY Legal & Save-Money Guide',
      navVisaGuide: 'Visa Solution Guide',
      navFaq: 'Immigration FAQ',
      navOrgFaq: 'Employer B2B FAQ',
      navTracker: 'Visa Processing Times (50%·90%)',
      navInquiry: '🔗 Official Inquiry ↗',
      footerFirmName: 'PNC Legal Pty Ltd t/a Park & Co Lawyers',
      footerPracticeAreas: 'Australian Immigration · Employment · Family Law',
      footerInquiry: 'Park & Co Official Inquiry Hub (parklawyers.com.au/links)',
      footerHubLink: 'Park & Co Legal & Visa Hub',
      footerDiy: 'DIY Legal & Save-Money Guide',
      footerVisaGuide: 'Australian Visa Solution Guide',
      footerFaq: 'Australian Immigration FAQ',
      footerOrgFaq: 'Employer & Sponsor B2B FAQ',
      vcTotal: 'Total Visits',
      vcToday: 'Today',
      vcVisitors: 'Visitors',
      vcTitle: 'Click to view 30-day visit trend & referral channels',
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
      optStateAll: 'All States & Jurisdictions',
      optStateCth: 'Commonwealth-Wide Workspace',
      optTypeAll: 'All Record Categories',
      optTypeWithin: 'ABF Within Published Period',
      optTypeEnded: 'ABF Published End Date Passed',
      optTypeProh: 's 245AYB Prohibited Employer',
      optTypeFrlComp: 'FRL Compilation Watch',
      optTypeFrlDiff: 'Statutory Threshold / Reform Diff',
      optTypeStat: 'FWO Statutory Obligation',
      optTypeGuid: 'FWO Official Agency Guidance',
      optTypeEu: 'FWO s 715 EU Pattern',
      optTypeAudit: 'FWO Aggregate Audit / Inquiry Report',
      optTypeDha: 'Home Affairs FOI (DHA Log)',
      optTypeFwo: 'Fair Work FOI (FWO Log)',
      optTypeArtStats: 'ART Review Caseload & Outcomes',
      optTypeCitStats: 'Citizenship Conferral 3-Stage Stats',
      resetFiltersBtn: 'Reset Search & Filters',
      drawerTitle: 'Cryptographic Source Evidence & SHA-256 Details',
      guardTitle: 'Legal Scope & Privacy Minimization Notice:',
      guardText: 'This portal presents hash-bound primary Australian government metadata for general legal research and does not constitute legal advice. Natural-person / sole-trader names are excluded from corporate search for privacy minimization, and search queries never leave your browser.',
      sourcesHeading: 'Allowlisted Primary .gov.au Source Health & Licence Matrix',
      thSourceId: 'Source ID',
      thAgency: 'Agency',
      thStatus: 'Status',
      thApproved: 'Approved Records',
      thSnapshotSha: 'Snapshot SHA-256',
      thLicence: 'Licence',
      footerDisclaimer: 'Disclaimer & Attribution: Independent legal intelligence published by Park & Co Lawyers (not affiliated with or endorsed by the Australian Government). Published under CC BY 3.0 AU / CC BY 4.0 and FWO CC BY-NC 4.0 metadata-and-link attribution rules.',
      searchPlaceholder: 'Search corporate name, 11-digit ABN, subclass (482/820/500), FRL ID, or FOI ref (FA 25/...)',
      inspectBtn: '🔍 Inspect SHA-256 Evidence',
      officialUrlBtn: 'Official Source ↗',
      copyCitBtn: '📋 Copy Verified Citation',
      copiedBtn: '✓ Citation Copied',
      copyLinkBtn: '🔗 Copy Direct Link (?id=…)',
      copiedLinkBtn: '✓ Direct Link Copied',
      noResults: 'No lawyer-approved records match the current search and filter criteria.',
      loadingDomain: 'Loading primary-source shards…'
    }
  };

  /* Deterministic Korean <-> English legal & jurisdiction query expansion */
  var KO_EN_SYNONYMS = {
    '학생비자': ['student visa', 'student', 'subclass 500', '500'],
    '학생': ['student', 'subclass 500', 'study'],
    '유학생': ['student', 'international student', 'subclass 500'],
    '파트너비자': ['partner visa', 'partner visas', 'subclass 820', 'subclass 801', 'subclass 309', '820', '309'],
    '파트너': ['partner visa', 'partner visas', 'subclass 820', 'subclass 801', 'subclass 309', 'de facto', 'spouse'],
    '배우자': ['partner visa', 'partner visas', 'spouse', 'subclass 820', 'subclass 309'],
    '사실혼': ['de facto', 'partner', 'family law'],
    '가족법': ['family law', 'fcfcoa', 'divorce', 'property'],
    '이혼': ['divorce', 'family law', 'fcfcoa'],
    '재산분할': ['property', 'family law', 'fcfcoa'],
    '기술이민': ['skilled', 'skillselect', 'subclass 189', 'subclass 190', 'subclass 491', 'gsm'],
    '주정부': ['state nomination', 'subclass 190', 'subclass 491'],
    '고용주': ['sponsor', 'employer', 'prohibited employer', 'subclass 482', 'subclass 186'],
    '스폰서': ['sponsor', 'sanction', 'bar', 'infringement', 'subclass 482', 'subclass 186'],
    '스폰서십': ['sponsor', 'sponsorship', 'nomination'],
    '노미네이션': ['nomination', 'sponsor', 'subclass 482', 'subclass 186'],
    '금지고용주': ['prohibited employer', '245ayb'],
    '제재': ['sanction', 'bar', 'infringement', 'prohibited employer'],
    '벌금': ['infringement', 'pecuniary penalty', 'fine'],
    '워홀': ['working holiday', '417', '462'],
    '워킹홀리데이': ['working holiday', '417', '462'],
    '졸업생': ['graduate', 'subclass 485', '485'],
    '졸업생비자': ['temporary graduate', 'subclass 485', '485'],
    '부모비자': ['parent visa', 'parent', '143', '864', '870'],
    '부모초청': ['parent', '143', '864', '870'],
    '방문비자': ['visitor', 'subclass 600', 'tourist'],
    '관광비자': ['visitor', 'subclass 600', 'tourist'],
    '보호비자': ['protection', '866', 'refugee'],
    '난민': ['protection', 'refugee', '866'],
    '브리징': ['bridging', 'bva', 'bvb', 'bvc', 'bve'],
    '시민권': ['citizenship', 'conferral', 'descent', 'ceremony'],
    '거절': ['refusal', 'refused', 'affirm'],
    '취소': ['cancellation', 'cancelled', 'cancel', 'noicc', '116', '501'],
    '인성': ['character', '501', 'direction'],
    '범죄': ['character', 'criminal', '501'],
    '구금': ['detention', 'nzyq', 'bridging'],
    '재심': ['art', 'tribunal', 'aat', 'remitted', 'set aside'],
    '심사기간': ['processing time', 'on-hand', 'clearance', 'percentile'],
    '적체': ['backlog', 'on-hand', 'on hand', 'queue'],
    '부당해고': ['unfair dismissal', 'high income threshold', 'fair work'],
    '고용법': ['fair work', 'fwo', 'fwc', 'underpayment', 'payroll'],
    '임금': ['salary', 'wage', 'underpayment', 'payroll', 'back-paid', 'csit', 'ssit', 'tsmit'],
    '급여': ['salary', 'wage', 'payroll', 'underpayment', 'csit', 'ssit'],
    '임금체불': ['underpayment', 'back-pay', 'enforceable undertaking', 'remediation'],
    '체불': ['underpayment', 'back-pay', 'remediation'],
    '연봉': ['salary', 'csit', 'ssit', 'tsmit', '79,423', '146,576'],
    '식당': ['restaurant', 'dining', 'kitchen', 'bistro', 'sushi', 'noodle', 'bbq', 'thai', 'indian', 'korean'],
    '레스토랑': ['restaurant', 'ristorante', 'bistro', 'dining', 'kitchen'],
    '카페': ['cafe', 'coffee', 'bakery', 'espresso'],
    '청소': ['cleaning', 'cleaner', 'services'],
    '건설': ['construction', 'building', 'carpentry', 'tiling', 'plastering', 'painting'],
    '농장': ['farm', 'agricultural', 'horticulture', 'harvest', 'labour'],
    '미용': ['hair', 'beauty', 'salon', 'massage', 'nail'],
    '정보공개': ['foi', 'disclosure', 'fa '],
    '이민성': ['dha', 'home affairs', 'migration'],
    '공정근로': ['fwo', 'fair work']
  };

  /* City & State Korean/English spatial mapping (matches state code + metro postcode bands) */
  var GEO_RULES = {
    '퀸즐랜드': { state: 'QLD', terms: ['queensland', 'qld'] },
    '브리즈번': { state: 'QLD', terms: ['brisbane'], postcodes: [[4000, 4179], [4300, 4305], [4500, 4519]] },
    'brisbane': { state: 'QLD', terms: ['brisbane'], postcodes: [[4000, 4179], [4300, 4305], [4500, 4519]] },
    '골드코스트': { state: 'QLD', terms: ['gold coast', 'southport', 'surfers'], postcodes: [[4207, 4230]] },
    '뉴사우스웨일스': { state: 'NSW', terms: ['new south wales', 'nsw'] },
    '시드니': { state: 'NSW', terms: ['sydney', 'parramatta', 'chatswood', 'strathfield', 'eastwood', 'lidcombe', 'blacktown'], postcodes: [[2000, 2234], [2555, 2570], [2745, 2770]] },
    'sydney': { state: 'NSW', terms: ['sydney', 'parramatta', 'chatswood', 'strathfield', 'blacktown'], postcodes: [[2000, 2234], [2555, 2570], [2745, 2770]] },
    '빅토리아': { state: 'VIC', terms: ['victoria', 'vic'] },
    '멜버른': { state: 'VIC', terms: ['melbourne'], postcodes: [[3000, 3207], [3750, 3810], [3975, 3978]] },
    '멜번': { state: 'VIC', terms: ['melbourne'], postcodes: [[3000, 3207], [3750, 3810], [3975, 3978]] },
    'melbourne': { state: 'VIC', terms: ['melbourne'], postcodes: [[3000, 3207], [3750, 3810], [3975, 3978]] },
    '서호주': { state: 'WA', terms: ['western australia', 'wa'] },
    '퍼스': { state: 'WA', terms: ['perth'], postcodes: [[6000, 6199]] },
    'perth': { state: 'WA', terms: ['perth'], postcodes: [[6000, 6199]] },
    '남호주': { state: 'SA', terms: ['south australia', 'sa'] },
    '애들레이드': { state: 'SA', terms: ['adelaide'], postcodes: [[5000, 5199]] },
    'adelaide': { state: 'SA', terms: ['adelaide'], postcodes: [[5000, 5199]] },
    '태즈메이니아': { state: 'TAS', terms: ['tasmania', 'tas', 'hobart'] },
    '호바트': { state: 'TAS', terms: ['hobart', 'tasmania'], postcodes: [[7000, 7055]] },
    '캔버라': { state: 'ACT', terms: ['canberra', 'act'], postcodes: [[2600, 2620], [2900, 2920]] },
    '다윈': { state: 'NT', terms: ['darwin', 'northern territory', 'nt'], postcodes: [[800, 832]] }
  };

  var state = {
    lang: 'ko',
    activeTab: 'all',
    query: '',
    stateFilter: '',
    subkindFilter: '',
    selectedRecordId: null,
    pendingDeepLinkId: null,
    page: 1,
    manifest: null,
    records: [],
    recordIds: {},
    shardsLoaded: {},
    fullyLoaded: false,
    loadError: null,
    lastFocusedEl: null
  };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function queryCardByRecordId(id) {
    if (!id || typeof document.querySelector !== 'function') return null;
    return document.querySelector('[data-record-id="' + CSS.escape(id) + '"]');
  }

  function findRecordById(id) {
    if (!id) return null;
    for (var i = 0; i < state.records.length; i++) {
      if (state.records[i] && state.records[i].record_id === id) {
        return state.records[i];
      }
    }
    return null;
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
    if (!abn || String(abn).length !== 11) return abn || '-';
    var s = String(abn);
    return s.slice(0, 2) + ' ' + s.slice(2, 5) + ' ' + s.slice(5, 8) + ' ' + s.slice(8, 11);
  }

  function t(key) {
    return (I18N[state.lang] && I18N[state.lang][key]) || I18N.ko[key] || key;
  }

  function isStateApplicableToTab(tab) {
    return tab === 'all' || tab === 'abf_enforcement';
  }

  function syncFilterControlsForTab() {
    var stateSel = document.getElementById('filter-state');
    if (stateSel) {
      var allowState = isStateApplicableToTab(state.activeTab);
      stateSel.disabled = !allowState;
      var firstOpt = stateSel.querySelector('option[value=""]');
      if (firstOpt) {
        firstOpt.textContent = allowState ? t('optStateAll') : t('optStateCth');
      }
    }

    var subSel = document.getElementById('filter-subkind');
    if (subSel) {
      var currentSubStillValid = false;
      subSel.querySelectorAll('option').forEach(function (opt) {
        var val = opt.value;
        if (!val) {
          opt.hidden = false;
          if (state.subkindFilter === '') currentSubStillValid = true;
          return;
        }
        var tabsAttr = opt.getAttribute('data-tabs') || 'all';
        var allowedTabs = tabsAttr.split(',');
        var ok = allowedTabs.indexOf(state.activeTab) >= 0;
        opt.hidden = !ok;
        if (ok && val === state.subkindFilter) currentSubStillValid = true;
      });
      if (!currentSubStillValid) {
        state.subkindFilter = '';
        subSel.value = '';
      }
    }
  }

  function syncUrlState() {
    try {
      var u = new URL(window.location.href);
      if (state.lang === 'en') {
        u.searchParams.set('lang', 'en');
      } else {
        u.searchParams.delete('lang');
      }
      if (state.activeTab && state.activeTab !== 'all') {
        u.searchParams.set('tab', state.activeTab);
      } else {
        u.searchParams.delete('tab');
      }
      if (state.query) {
        u.searchParams.set('q', state.query);
      } else {
        u.searchParams.delete('q');
      }
      if (state.stateFilter && isStateApplicableToTab(state.activeTab)) {
        u.searchParams.set('state', state.stateFilter);
      } else {
        u.searchParams.delete('state');
      }
      if (state.subkindFilter) {
        u.searchParams.set('type', state.subkindFilter);
      } else {
        u.searchParams.delete('type');
      }
      var activeId = state.selectedRecordId || state.pendingDeepLinkId;
      if (activeId) {
        u.searchParams.set('id', activeId);
      } else {
        u.searchParams.delete('id');
      }
      window.history.replaceState({}, '', u.toString());
    } catch (e) {}
  }

  function buildDirectRecordUrl(recordId) {
    try {
      var u = new URL(window.location.href);
      u.search = '';
      if (state.lang === 'en') {
        u.searchParams.set('lang', 'en');
      }
      u.searchParams.set('id', recordId);
      return u.toString();
    } catch (e) {
      return 'https://changa9090.github.io/intelligence/?' + (state.lang === 'en' ? 'lang=en&' : '') + 'id=' + encodeURIComponent(recordId);
    }
  }

  function applyLanguage(lang, skipUrlSync) {
    state.lang = lang === 'en' ? 'en' : 'ko';
    document.documentElement.lang = state.lang;
    if (document.body) document.body.setAttribute('data-ui-lang', state.lang);
    try { localStorage.setItem('parkco_lang', state.lang); } catch (e) {}
    if (I18N[state.lang] && I18N[state.lang].pageTitle) {
      document.title = I18N[state.lang].pageTitle;
    }
    if (typeof document.querySelector === 'function') {
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && I18N[state.lang].metaDesc) {
        metaDesc.setAttribute('content', I18N[state.lang].metaDesc);
      }
    }
    var vcBox = document.getElementById('visit-counter');
    if (vcBox && I18N[state.lang].vcTitle) {
      vcBox.setAttribute('title', I18N[state.lang].vcTitle);
    }
    document.getElementById('lang-ko').classList.toggle('active', state.lang === 'ko');
    document.getElementById('lang-en').classList.toggle('active', state.lang === 'en');
    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      var k = node.getAttribute('data-i18n');
      if (I18N[state.lang][k]) node.textContent = I18N[state.lang][k];
    });
    document.querySelectorAll('.intel-inquiry-link').forEach(function (lnk) {
      var href = state.lang === 'en' ? lnk.getAttribute('data-en-href') : lnk.getAttribute('data-ko-href');
      if (href) lnk.setAttribute('href', href);
    });
    var searchEl = document.getElementById('intel-search');
    if (searchEl) searchEl.placeholder = t('searchPlaceholder');
    syncFilterControlsForTab();
    if (!skipUrlSync) syncUrlState();
    renderCounts();
    renderAll();
    if (state.selectedRecordId) {
      var openRec = findRecordById(state.selectedRecordId);
      var drawer = document.getElementById('evidence-drawer');
      if (openRec && drawer && drawer.classList.contains('open')) {
        openEvidenceDrawer(openRec, state.lastFocusedEl);
      }
    }
  }

  function getSearchIndex(rec) {
    if (rec._searchCache) return rec._searchCache;
    var p = rec.payload || {};
    var primaryParts = [
      rec.record_id,
      p.legal_name,
      p.trading_name,
      p.title_ko,
      p.title_en,
      p.title_name,
      p.title_id,
      p.register_id,
      p.foi_ref,
      p.card_code,
      p.statutory_authority,
      p.statutory_basis
    ];
    var secondaryParts = [
      rec.source_id,
      rec.agency,
      p.summary,
      p.summary_ko,
      p.summary_en,
      p.sunset_status_note_ko,
      p.sunset_status_note_en,
      p.action_summary,
      p.obligations_raw,
      p.basis_badge_ko,
      p.basis_badge_en,
      p.basis_tier,
      p.category,
      p.practice_area_ko,
      p.practice_area_en,
      p.previous_value,
      p.previous_value_en,
      p.new_value,
      p.new_value_en,
      p.effective_window,
      p.effective_window_en,
      p.state,
      p.access_decision,
      p.foi_agency,
      p.stat_category
    ];
    if (Array.isArray(p.checklist_steps_ko)) secondaryParts.push(p.checklist_steps_ko.join(' '));
    if (Array.isArray(p.checklist_steps_en)) secondaryParts.push(p.checklist_steps_en.join(' '));
    if (Array.isArray(p.stage_definitions_ko)) secondaryParts.push(p.stage_definitions_ko.join(' '));
    if (Array.isArray(p.stage_definitions_en)) secondaryParts.push(p.stage_definitions_en.join(' '));
    if (Array.isArray(p.amending_reasons)) {
      p.amending_reasons.forEach(function (ar) {
        if (ar) secondaryParts.push(ar.amending_name, ar.amending_title_id, ar.summary);
      });
    }

    var foiNorm = String(p.foi_ref || '').toLowerCase().replace(/\s+/g, '_');
    var abnDigits = String(p.abn || '').replace(/\D/g, '');
    var postcodeNum = p.postcode && /^\d{3,4}$/.test(String(p.postcode).trim()) ? Number(p.postcode) : null;

    rec._searchCache = {
      primary: primaryParts.filter(Boolean).join(' ').toLowerCase(),
      secondary: secondaryParts.filter(Boolean).join(' ').toLowerCase(),
      foiNorm: foiNorm,
      abnDigits: abnDigits,
      stateCode: String(p.state || '').toUpperCase(),
      postcodeStr: String(p.postcode || '').trim(),
      postcodeNum: postcodeNum
    };
    return rec._searchCache;
  }

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function matchesSingleCandidate(idx, cand, isShortBounded) {
    if (!cand) return 0;
    if (isShortBounded) {
      var re = new RegExp('(?:^|[^a-z0-9])' + escapeRegex(cand) + '(?:$|[^a-z0-9])', 'i');
      if (re.test(idx.primary)) return 3;
      if (re.test(idx.secondary)) return 1;
      return 0;
    }
    if (idx.primary.indexOf(cand) >= 0) return 3;
    if (idx.secondary.indexOf(cand) >= 0) return 1;
    return 0;
  }

  function scoreRecordForQuery(rec, rawQuery) {
    if (!rawQuery) return 1;
    var idx = getSearchIndex(rec);
    var qClean = rawQuery.trim().toLowerCase();
    var qDigits = rawQuery.replace(/\D/g, '');

    if (rec.record_id && rec.record_id.toLowerCase() === qClean) {
      return 2000;
    }

    /* 1. Direct ABN match (9-11 digits entered, e.g. spaced 11-digit ABN) */
    if (qDigits.length >= 9 && idx.abnDigits && idx.abnDigits.indexOf(qDigits) >= 0) {
      return 1200;
    }

    /* 2. Exact 4-digit Australian postcode check when user enters a standalone 4-digit number */
    var isStandalone4Digit = /^\d{4}$/.test(qClean);

    /* Normalize multi-part FOI reference prefixes like "FA 25" or "FA 26/02" into a single token "fa_25..." */
    var normalizedQuery = qClean
      .replace(/\bfa\s+(\d{2}(?:[\/\-][a-z0-9]+)*)/gi, 'fa_$1')
      .replace(/\bs\s+(\d+[a-z]*)\b/gi, 's $1');

    var tokens = normalizedQuery.split(/\s+/).filter(Boolean);
    if (!tokens.length) return 1;

    var totalScore = 0;

    for (var i = 0; i < tokens.length; i++) {
      var tok = tokens[i];
      var tokenScore = 0;

      /* Special handling: FOI reference prefix token like fa_25 or fa-250401411 */
      if (tok.indexOf('fa_') === 0 || /^fa-\d{4,}/.test(tok)) {
        var foiTarget = tok.replace(/^fa[-_]/, 'fa_');
        var compactTarget = tok.replace(/[^a-z0-9]/g, '');
        var compactFoi = idx.foiNorm.replace(/[^a-z0-9]/g, '');
        if (idx.foiNorm && (idx.foiNorm.indexOf(foiTarget) >= 0 || compactFoi.indexOf(compactTarget) >= 0)) {
          tokenScore = 600;
        }
        if (tokenScore === 0) return 0;
        totalScore += tokenScore;
        continue;
      }

      /* Special handling: Geographic city/state rules (e.g. 브리즈번, 시드니, 멜버른, 퍼스, 퀸즐랜드) */
      var geo = GEO_RULES[tok];
      if (geo) {
        if (geo.postcodes && idx.postcodeNum !== null && idx.stateCode === geo.state) {
          for (var g = 0; g < geo.postcodes.length; g++) {
            if (idx.postcodeNum >= geo.postcodes[g][0] && idx.postcodeNum <= geo.postcodes[g][1]) {
              tokenScore = Math.max(tokenScore, 260);
            }
          }
        } else if (!geo.postcodes && idx.stateCode === geo.state) {
          tokenScore = Math.max(tokenScore, 240);
        }
        for (var gt = 0; gt < geo.terms.length; gt++) {
          var gm = matchesSingleCandidate(idx, geo.terms[gt], geo.terms[gt].length <= 3);
          if (gm > 0) tokenScore = Math.max(tokenScore, gm * 90);
        }
      }

      /* Direct literal match on primary/secondary text */
      var isShortAsciiOrNum = /^[a-z0-9]{1,4}$/.test(tok);
      var directHit = matchesSingleCandidate(idx, tok, isShortAsciiOrNum);
      if (directHit > 0) {
        tokenScore = Math.max(tokenScore, directHit * 140);
      }

      /* Exact 4-digit postcode match (without colliding with 3-digit visa subclasses!) */
      if (isStandalone4Digit && idx.postcodeStr === tok) {
        tokenScore = Math.max(tokenScore, 220);
      }

      /* Partial ABN prefix/substring when user types 6-8 digits */
      if (/^\d{6,8}$/.test(tok) && idx.abnDigits && idx.abnDigits.indexOf(tok) >= 0) {
        tokenScore = Math.max(tokenScore, 300);
      }

      /* Synonym expansion (Korean <-> English legal & visa terms) */
      var syns = KO_EN_SYNONYMS[tok];
      if (syns) {
        for (var s = 0; s < syns.length; s++) {
          var syn = syns[s];
          var synShort = /^[a-z0-9]{1,4}$/.test(syn);
          var sm = matchesSingleCandidate(idx, syn, synShort);
          if (sm > 0) {
            tokenScore = Math.max(tokenScore, sm * 85);
          }
        }
      }

      if (tokenScore === 0) return 0;
      totalScore += tokenScore;
    }

    return totalScore;
  }

  function recordMatchesTab(rec) {
    if (state.activeTab === 'all') return true;
    if (state.activeTab === 'foi_and_stats') {
      return rec.domain === 'foi_disclosure' || rec.domain === 'tribunal_and_citizenship_stats';
    }
    return rec.domain === state.activeTab;
  }

  function recordMatchesSubkind(rec, sk) {
    if (!sk) return true;
    var p = rec.payload || {};
    return (
      p.period_label === sk ||
      p.event_type === sk ||
      p.change_kind === sk ||
      p.basis_tier === sk ||
      p.foi_agency === sk ||
      p.stat_category === sk
    );
  }

  function filterAndRankRecords() {
    var applyState = Boolean(state.stateFilter && isStateApplicableToTab(state.activeTab));
    var hasQuery = Boolean(state.query);
    var domainPriority = {
      legislation_watch: 1,
      tribunal_and_citizenship_stats: 2,
      fwo_compliance: 3,
      foi_disclosure: 4,
      abf_enforcement: 5
    };

    var matched = [];
    for (var i = 0; i < state.records.length; i++) {
      var rec = state.records[i];
      if (!recordMatchesTab(rec)) continue;
      var p = rec.payload || {};

      if (applyState && (p.state || '') !== state.stateFilter) continue;
      if (state.subkindFilter && !recordMatchesSubkind(rec, state.subkindFilter)) continue;

      var qScore = hasQuery ? scoreRecordForQuery(rec, state.query) : 1;
      if (qScore <= 0) continue;

      matched.push({ rec: rec, score: qScore });
    }

    matched.sort(function (itemA, itemB) {
      var a = itemA.rec;
      var b = itemB.rec;
      if (hasQuery && itemB.score !== itemA.score) {
        return itemB.score - itemA.score;
      }
      if (state.activeTab === 'foi_and_stats' && !hasQuery) {
        var pa = a.domain === 'tribunal_and_citizenship_stats' ? 0 : 1;
        var pb = b.domain === 'tribunal_and_citizenship_stats' ? 0 : 1;
        if (pa !== pb) return pa - pb;
      }
      if (state.activeTab === 'abf_enforcement' && !hasQuery) {
        var prohA = (a.payload && a.payload.event_type === 'prohibited_employer_declaration') ? 0 : 1;
        var prohB = (b.payload && b.payload.event_type === 'prohibited_employer_declaration') ? 0 : 1;
        if (prohA !== prohB) return prohA - prohB;
      }
      var dpa = domainPriority[a.domain] || 9;
      var dpb = domainPriority[b.domain] || 9;
      if (dpa !== dpb) return dpa - dpb;

      var dateA = (a.payload && (a.payload.disclosure_date || a.payload.imposed_date || a.payload.start_date)) || '';
      var dateB = (b.payload && (b.payload.disclosure_date || b.payload.imposed_date || b.payload.start_date)) || '';
      return dateB.localeCompare(dateA);
    });

    return matched.map(function (m) { return m.rec; });
  }

  function addKv(grid, label, val, isMono) {
    var item = el('div', 'kv-item');
    item.appendChild(el('span', '', label));
    item.appendChild(el('strong', isMono ? 'mono num' : 'num', val == null || val === '' ? '-' : val));
    grid.appendChild(item);
  }

  function cleanFrlSummaryText(rawText, en) {
    if (!rawText) return '';
    if (en) {
      return String(rawText)
        .replace('Compilation No. - (): ', 'Current in-force instrument (FRL compilation number pending): ')
        .replace('FRL registeredAt: N/A', 'FRL registeredAt: pending consolidation');
    }
    return String(rawText)
      .replace('현행 컴필레이션 제-호 (): ', '현행 시행 법령 (FRL 컴필레이션 번호 갱신 대기): ')
      .replace('FRL 등록일(registeredAt) 미상', 'FRL 등록일 메타데이터 갱신 대기');
  }

  function buildCard(rec) {
    var en = state.lang === 'en';
    var p = rec.payload || {};
    var isSelected = Boolean(state.selectedRecordId && state.selectedRecordId === rec.record_id);
    var card = el('article', isSelected ? 'intel-card intel-card--highlight' : 'intel-card');
    card.setAttribute('data-record-id', rec.record_id);

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
        badges.appendChild(
          el(
            'span',
            'badge badge--warn',
            (en ? 'Compilation Cutover: ' : '컴필레이션 전환 경계일: ') + p.scheduled_end_date
          )
        );
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

    /* Title & Body per domain */
    if (rec.domain === 'abf_enforcement') {
      var titleStr = p.legal_name + (p.trading_name ? ' (t/a ' + p.trading_name + ')' : '');
      card.appendChild(el('h3', 'intel-card__title', titleStr));
      var kv = el('div', 'kv-grid');
      addKv(kv, 'ABN (Mod-89 Verified)', formatAbn(p.abn), true);
      addKv(kv, en ? 'State / Postcode' : '주 / 우편번호', (p.state || '-') + ' ' + (p.postcode || ''), true);
      addKv(kv, en ? 'Imposed Date' : '처분 부과일', p.imposed_date);
      addKv(kv, en ? 'Published End Date' : '원문 종료일', p.end_date || (en ? 'Not specified' : '원문 미기재'));
      addKv(kv, en ? 'Action / Sanction' : '처분 요약', p.action_summary);
      addKv(kv, en ? 'Regulations / Basis' : '관련 조문', p.obligations_raw || p.statutory_basis);
      card.appendChild(kv);
    } else if (rec.domain === 'legislation_watch') {
      var lTitle;
      if (p.change_kind === 'statutory_threshold_diff') {
        lTitle = en ? p.title_en : p.title_ko;
      } else {
        var idLabel = p.register_id || p.title_id || '';
        var compSuffix = p.compilation_number
          ? ' (Comp. ' + p.compilation_number + ')'
          : (p.future_compilation_scheduled ? (en ? ' (In Force · Consolidation Pending)' : ' (현행 유효 · 개정 통합 대기)') : '');
        lTitle = p.title_name + (idLabel ? ' · ' + idLabel : '') + compSuffix;
      }
      card.appendChild(el('h3', 'intel-card__title', lTitle));
      card.appendChild(el('p', 'intel-card__body', cleanFrlSummaryText(en ? p.summary_en : p.summary_ko, en)));
      var kvL = el('div', 'kv-grid');
      if (p.change_kind === 'statutory_threshold_diff') {
        var prevSetting = en ? (p.previous_value_en || p.previous_value) : (p.previous_value_ko || p.previous_value);
        var currSetting = en ? (p.new_value_en || p.new_value) : (p.new_value_ko || p.new_value);
        var effWindow = en
          ? (p.effective_window_en || p.effective_window || p.effective_date)
          : (p.effective_window_ko || p.effective_window || p.effective_date);
        addKv(kvL, en ? 'Previous Setting' : '종전 기준', prevSetting);
        addKv(kvL, en ? 'Current Setting' : '현행 기준', currSetting);
        addKv(kvL, en ? 'Effective Window' : '적용 기준일', effWindow);
        addKv(kvL, en ? 'Authority' : '법적 근거', p.statutory_authority);
      } else {
        addKv(kvL, 'FRL Title / Register ID', p.register_id ? (p.title_id + ' / ' + p.register_id) : p.title_id, true);
        addKv(kvL, en ? 'Legal Start Date' : '법적 시행일 (start)', p.start_date);
        addKv(kvL, en ? 'FRL Registered Date' : 'FRL 등록일 (registeredAt)', p.registered_at_date || (en ? 'Pending FRL consolidation' : '후속 컴필레이션 등록 대기'));
        addKv(kvL, en ? 'Compilation End Boundary' : '컴필레이션 전환 경계일 (end)', p.scheduled_end_date || (en ? 'Current (In Force)' : '현행 유효 (무기한)'));
      }
      card.appendChild(kvL);
      if (Array.isArray(p.affected_navigator_links) && p.affected_navigator_links.length > 0) {
        var navRow = el('div', 'badges-row');
        navRow.style.marginBottom = '10px';
        p.affected_navigator_links.forEach(function (nv) {
          var a = el('a', 'btn-link-ext', '🧭 ' + (en ? nv.label_en : nv.label_ko));
          a.href = en && nv.url && nv.url.indexOf('?') === -1 ? (nv.url + '?lang=en') : nv.url;
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
      card.appendChild(el('h3', 'intel-card__title', p.foi_ref + ' · ' + p.summary));
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
          da.rel = 'noopener';
          docRow.appendChild(da);
        });
        card.appendChild(docRow);
      }
    } else if (rec.domain === 'tribunal_and_citizenship_stats') {
      card.appendChild(el('h3', 'intel-card__title', en ? p.title_en : p.title_ko));
      card.appendChild(el('p', 'intel-card__body', en ? p.summary_en : p.summary_ko));
      var kvS = el('div', 'kv-grid');
      var breakDateLabel = en
        ? (p.structural_break_date_en || p.structural_break_date)
        : (p.structural_break_date_ko || p.structural_break_date);
      if (p.all_finalised_rate) {
        addKv(kvS, en ? 'All Finalisations Rate' : '전체 종결 분모 인용률', p.all_finalised_rate + ' (' + p.remitted_or_set_aside_count + '/' + p.all_finalised_denominator + ')');
        addKv(kvS, en ? 'Substantive Merits Rate' : '본안 판단 분모 인용률', p.substantive_restricted_rate + ' (' + p.remitted_or_set_aside_count + '/' + p.substantive_restricted_denominator + ')');
        addKv(kvS, en ? 'Procedural / Withdrawn' : '취하·각하 분리 건수', p.procedural_dismissal_or_withdrawn_count);
        addKv(kvS, en ? 'Series Transition Break' : '시계열 전환 경계일', breakDateLabel);
      } else if (p.study_on_hand_share) {
        addKv(kvS, en ? 'Study On-Hand Stock Share' : '학생비자 계류 잔량(Stock) 비중', p.study_on_hand_share);
        addKv(kvS, en ? 'Working Stream Clearance' : '취업비자 기간 처리율(Clearance)', p.working_skilled_clearance_rate);
        addKv(kvS, en ? 'Series Transition Break' : '시계열 전환 경계일', breakDateLabel);
      } else if (p.conferral_on_hand !== undefined) {
        addKv(kvS, en ? 'Conferral On-Hand Queue' : '시민권 Conferral 계류 건수', Number(p.conferral_on_hand).toLocaleString());
        addKv(kvS, en ? 'Percentile Additivity' : '단계별 백분위 합산 가능 여부', en ? 'Non-Additive (Independent Cohorts)' : '합산 불가 (독립 코호트)');
      }
      card.appendChild(kvS);

      if (Array.isArray(p.stage_percentiles) && p.stage_percentiles.length) {
        var cTbl = el('table', 'cit-stage-table');
        var cHead = el('thead');
        var cHr = el('tr');
        cHr.appendChild(el('th', '', en ? 'Citizenship Conferral Stage' : '시민권 Conferral 단계'));
        cHr.appendChild(el('th', '', en ? '50th Percentile' : '50% 백분위'));
        cHr.appendChild(el('th', '', en ? '90th Percentile' : '90% 백분위'));
        cHead.appendChild(cHr);
        cTbl.appendChild(cHead);
        var cBody = el('tbody');
        p.stage_percentiles.forEach(function (sr) {
          var rTr = el('tr');
          rTr.appendChild(el('td', '', en ? sr.stage_en : sr.stage_ko));
          rTr.appendChild(el('td', 'num', en ? sr.p50_en : sr.p50_ko));
          rTr.appendChild(el('td', 'num', en ? sr.p90_en : sr.p90_ko));
          cBody.appendChild(rTr);
        });
        cTbl.appendChild(cBody);
        card.appendChild(cTbl);
      }

      var citDefs = en ? p.stage_definitions_en : p.stage_definitions_ko;
      if (Array.isArray(citDefs) && citDefs.length) {
        var cUl = el('ul', 'checklist-ul');
        citDefs.forEach(function (df) { cUl.appendChild(el('li', '', df)); });
        card.appendChild(cUl);
      }
    }

    var foot = el('div', 'intel-card__foot');
    var noteStr = en
      ? (p.sunset_status_note_en || p.source_lag_note_en || p.scope_warning_en || p.scope_note_en || p.date_separation_note_en || '')
      : (p.sunset_status_note_ko || p.source_lag_note_ko || p.scope_warning_ko || p.scope_note_ko || p.date_separation_note_ko || '');
    foot.appendChild(el('div', 'scope-note', noteStr));

    var actWrap = el('div', 'badges-row');
    var extUrl = p.official_reference_url || rec.source_url;
    if (extUrl) {
      var extA = el('a', 'btn-link-ext', t('officialUrlBtn'));
      extA.href = extUrl;
      extA.target = '_blank';
      extA.rel = 'noopener';
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
    state.selectedRecordId = rec.record_id;
    syncUrlState();

    var en = state.lang === 'en';
    var body = document.getElementById('drawer-body');
    body.textContent = '';

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

    var secTime = el('div', 'drawer-section');
    secTime.appendChild(el('h4', '', en ? '3. Strictly Separated Timestamps' : '3. 시점 분리 기록 (수집일 vs 변호사 검토일)'));
    secTime.appendChild(el('div', 'mono', 'Retrieved (UTC): ' + rec.retrieved_at_utc));
    secTime.appendChild(el('div', 'mono', 'Lawyer Reviewed (UTC): ' + rec.reviewed_at_utc + ' (' + rec.reviewer_role + ')'));
    body.appendChild(secTime);

    var secAttr = el('div', 'drawer-section');
    secAttr.appendChild(el('h4', '', en ? '4. Official Source, Direct Link & Licence Attribution' : '4. 공식 출처 URL · 직접 링크 및 라이선스 표시'));
    var attr = rec.attribution || {};
    secAttr.appendChild(el('div', '', (attr.licence || '') + ' · ' + (attr.attribution_text || '')));
    var srcLink = el('a', 'btn-link-ext', rec.source_url);
    srcLink.href = rec.source_url;
    srcLink.target = '_blank';
    srcLink.rel = 'noopener';
    srcLink.style.marginTop = '8px';
    srcLink.style.wordBreak = 'break-all';
    secAttr.appendChild(srcLink);

    var btnRow = el('div', 'drawer-btn-row');

    var copyBtn = el('button', 'btn-evidence', t('copyCitBtn'));
    copyBtn.type = 'button';
    copyBtn.addEventListener('click', function () {
      var cit = '[' + rec.agency + '] ' + rec.source_url + ' | Locator: ' + JSON.stringify(rec.locator) +
        ' | Retrieved: ' + rec.retrieved_at_utc + ' | Snapshot SHA-256: ' + rec.snapshot_sha256;
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cit).then(function () {
          copyBtn.textContent = t('copiedBtn');
        });
      }
    });
    btnRow.appendChild(copyBtn);

    var directUrl = buildDirectRecordUrl(rec.record_id);
    var copyLinkBtn = el('button', 'btn-evidence', t('copyLinkBtn'));
    copyLinkBtn.type = 'button';
    copyLinkBtn.id = 'drawer-copy-link-btn';
    copyLinkBtn.setAttribute('data-direct-url', directUrl);
    copyLinkBtn.addEventListener('click', function () {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(directUrl).then(function () {
          copyLinkBtn.textContent = t('copiedLinkBtn');
        });
      } else {
        copyLinkBtn.textContent = t('copiedLinkBtn');
      }
    });
    btnRow.appendChild(copyLinkBtn);

    secAttr.appendChild(btnRow);
    body.appendChild(secAttr);

    var cardEl = queryCardByRecordId(rec.record_id);
    if (cardEl && cardEl.classList) {
      cardEl.classList.add('intel-card--highlight');
    }

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
    if (state.selectedRecordId) {
      var prevCard = queryCardByRecordId(state.selectedRecordId);
      if (prevCard && prevCard.classList) {
        prevCard.classList.remove('intel-card--highlight');
      }
      state.selectedRecordId = null;
      syncUrlState();
    }
    if (state.lastFocusedEl && typeof state.lastFocusedEl.focus === 'function') {
      state.lastFocusedEl.focus();
    }
  }

  function tryResolveDeepLink() {
    if (!state.pendingDeepLinkId) return;
    var target = findRecordById(state.pendingDeepLinkId);
    if (!target) {
      if (state.fullyLoaded) {
        state.pendingDeepLinkId = null;
        syncUrlState();
      }
      return;
    }
    state.pendingDeepLinkId = null;
    state.selectedRecordId = target.record_id;
    renderAll();
    var cardNode = queryCardByRecordId(target.record_id);
    openEvidenceDrawer(target, cardNode);
  }

  function renderCounts() {
    if (!state.manifest && state.records.length === 0 && !state.fullyLoaded) {
      document.getElementById('cnt-all').textContent = '…';
      document.getElementById('cnt-abf').textContent = '…';
      document.getElementById('cnt-frl').textContent = '…';
      document.getElementById('cnt-fwo').textContent = '…';
      document.getElementById('cnt-foi').textContent = '…';
      document.getElementById('prov-record-count').textContent = state.lang === 'en' ? 'Loading…' : '불러오는 중…';
      return;
    }

    var mc = (state.manifest && state.manifest.counts) || null;
    if (mc && !state.fullyLoaded) {
      var mTotal = Number(mc.total || 0);
      var mAbf = Number(mc.abf_enforcement || 0);
      var mFrl = Number(mc.legislation_watch || 0);
      var mFwo = Number(mc.fwo_compliance || 0);
      var mFoi = Number(mc.foi_disclosure || 0) + Number(mc.tribunal_and_citizenship_stats || 0);
      document.getElementById('cnt-all').textContent = mTotal.toLocaleString();
      document.getElementById('cnt-abf').textContent = mAbf.toLocaleString();
      document.getElementById('cnt-frl').textContent = mFrl.toLocaleString();
      document.getElementById('cnt-fwo').textContent = mFwo.toLocaleString();
      document.getElementById('cnt-foi').textContent = mFoi.toLocaleString();
      document.getElementById('prov-record-count').textContent = mTotal.toLocaleString() + ' Verified';
      return;
    }

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
    if (allN > 0) {
      document.getElementById('prov-record-count').textContent = allN.toLocaleString() + ' Verified';
    }
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
      a.rel = 'noopener';
      tdId.appendChild(a);
      tr.appendChild(tdId);
      tr.appendChild(el('td', '', s.agency));
      var tdSt = el('td');
      tdSt.appendChild(el('span', s.fetch_status === 'fetched' ? 'badge badge--green' : 'badge badge--warn', s.fetch_status));
      tr.appendChild(tdSt);
      tr.appendChild(el('td', 'num', Number(s.approved_records || 0).toLocaleString()));
      tr.appendChild(el('td', 'mono', s.snapshot_sha256 ? String(s.snapshot_sha256).slice(0, 16) + '…' : '-'));
      tr.appendChild(el('td', '', s.licence));
      tbody.appendChild(tr);
    });
  }

  function resetAllFilters() {
    state.query = '';
    state.stateFilter = '';
    state.subkindFilter = '';
    state.page = 1;
    var searchEl = document.getElementById('intel-search');
    var stateSel = document.getElementById('filter-state');
    var subSel = document.getElementById('filter-subkind');
    if (searchEl) searchEl.value = '';
    if (stateSel) stateSel.value = '';
    if (subSel) subSel.value = '';
    syncUrlState();
    renderAll();
  }

  function renderActiveFilterBar() {
    var bar = document.getElementById('active-filters-bar');
    var tagsWrap = document.getElementById('active-filter-tags');
    if (!bar || !tagsWrap) return;
    tagsWrap.textContent = '';

    var en = state.lang === 'en';
    var effectiveState = isStateApplicableToTab(state.activeTab) ? state.stateFilter : '';
    var hasAny = Boolean(state.query || effectiveState || state.subkindFilter);
    bar.hidden = !hasAny;
    if (!hasAny) return;

    function addChip(label, onRemove) {
      var chip = el('span', 'filter-chip');
      chip.appendChild(el('span', '', label));
      var xBtn = el('button', '', '×');
      xBtn.type = 'button';
      xBtn.setAttribute('aria-label', en ? 'Remove filter' : '필터 해제');
      xBtn.addEventListener('click', onRemove);
      chip.appendChild(xBtn);
      tagsWrap.appendChild(chip);
    }

    if (state.query) {
      addChip((en ? 'Query: ' : '검색어: ') + state.query, function () {
        state.query = '';
        state.page = 1;
        document.getElementById('intel-search').value = '';
        syncUrlState();
        renderAll();
      });
    }
    if (effectiveState) {
      addChip((en ? 'State: ' : '관할: ') + effectiveState, function () {
        state.stateFilter = '';
        state.page = 1;
        document.getElementById('filter-state').value = '';
        syncUrlState();
        renderAll();
      });
    }
    if (state.subkindFilter) {
      var subSel = document.getElementById('filter-subkind');
      var selOpt = subSel && subSel.querySelector('option[value="' + CSS.escape(state.subkindFilter) + '"]');
      var subLabel = selOpt ? selOpt.textContent : state.subkindFilter;
      addChip((en ? 'Category: ' : '유형: ') + subLabel, function () {
        state.subkindFilter = '';
        state.page = 1;
        if (subSel) subSel.value = '';
        syncUrlState();
        renderAll();
      });
    }
  }

  function isTabStillSyncing() {
    if (state.fullyLoaded || state.loadError) return false;
    if (!state.manifest) return true;
    if (state.activeTab === 'abf_enforcement') return !state.shardsLoaded.abf_enforcement;
    if (state.activeTab === 'foi_and_stats') return !state.shardsLoaded.foi_disclosure;
    if (state.activeTab === 'legislation_watch') return !state.shardsLoaded.legislation_watch;
    if (state.activeTab === 'fwo_compliance') return !state.shardsLoaded.fwo_compliance;
    return state.records.length === 0;
  }

  function renderAll() {
    renderActiveFilterBar();

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

    var summaryEl = document.getElementById('results-summary-text');
    var container = document.getElementById('cards-container');
    var pager = document.getElementById('pager-bar');

    if (state.loadError) {
      summaryEl.textContent = 'Failed to load verified release bundle: ' + state.loadError;
      pager.hidden = true;
      return;
    }

    var filtered = filterAndRankRecords();

    /* Show crisp loading state while primary-source shards are arriving so count never flashes 0 */
    if (!filtered.length && (!state.fullyLoaded && (isTabStillSyncing() || state.query || state.stateFilter || state.subkindFilter))) {
      summaryEl.textContent = t('loadingDomain');
      container.textContent = '';
      container.appendChild(el('div', 'intel-card empty-state-card', t('loadingDomain')));
      pager.hidden = true;
      return;
    }

    var totalAvailable = filtered.length;
    if (!state.fullyLoaded && state.activeTab === 'all' && !state.query && !state.stateFilter && !state.subkindFilter && state.manifest && state.manifest.counts) {
      totalAvailable = Number(state.manifest.counts.total || filtered.length);
    }

    var totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (state.page > totalPages) state.page = totalPages;

    var startIdx = (state.page - 1) * PAGE_SIZE;
    var slice = filtered.slice(startIdx, startIdx + PAGE_SIZE);

    summaryEl.textContent = state.lang === 'en'
      ? ('Showing ' + (filtered.length ? (startIdx + 1) + '–' + (startIdx + slice.length) : '0') + ' of ' + totalAvailable.toLocaleString() + ' lawyer-approved records')
      : ('변호사 승인 공개 레코드 총 ' + totalAvailable.toLocaleString() + '건 중 ' + (filtered.length ? (startIdx + 1) + '–' + (startIdx + slice.length) : '0') + '건 표시');

    container.textContent = '';
    if (!slice.length) {
      var emptyCard = el('div', 'intel-card empty-state-card');
      emptyCard.appendChild(el('p', '', t('noResults')));
      if (state.query || state.stateFilter || state.subkindFilter) {
        var resetBtn = el('button', 'btn-reset-filters', t('resetFiltersBtn'));
        resetBtn.type = 'button';
        resetBtn.addEventListener('click', resetAllFilters);
        emptyCard.appendChild(resetBtn);
      }
      container.appendChild(emptyCard);
    } else {
      slice.forEach(function (rec) {
        container.appendChild(buildCard(rec));
      });
    }

    pager.hidden = totalPages <= 1;
    document.getElementById('pager-status').textContent = state.page + ' / ' + totalPages;
    document.getElementById('btn-prev-page').disabled = state.page <= 1;
    document.getElementById('btn-next-page').disabled = state.page >= totalPages;
  }

  function activateTab(tabId, skipUrlSync) {
    var nextTab = VALID_TABS.indexOf(tabId) >= 0 ? tabId : 'all';
    state.activeTab = nextTab;
    state.page = 1;
    document.querySelectorAll('.tab-btn').forEach(function (b) {
      var isAct = b.getAttribute('data-tab') === nextTab;
      b.classList.toggle('active', isAct);
      b.setAttribute('aria-selected', isAct ? 'true' : 'false');
    });
    syncFilterControlsForTab();
    if (!skipUrlSync) syncUrlState();
    renderAll();
  }

  function mergeShardRecords(shardName, list) {
    if (!Array.isArray(list)) return;
    for (var i = 0; i < list.length; i++) {
      var rec = list[i];
      if (!rec || !rec.record_id) continue;
      if (!state.recordIds[rec.record_id]) {
        state.recordIds[rec.record_id] = true;
        state.records.push(rec);
      }
    }
    if (shardName) state.shardsLoaded[shardName] = true;
  }

  function bindEvents() {
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activateTab(btn.getAttribute('data-tab') || 'all', false);
      });
    });

    document.getElementById('intel-search').addEventListener('input', function (e) {
      state.query = e.target.value.trim();
      state.page = 1;
      syncUrlState();
      renderAll();
    });

    document.getElementById('filter-state').addEventListener('change', function (e) {
      state.stateFilter = e.target.value;
      state.page = 1;
      syncUrlState();
      renderAll();
    });

    document.getElementById('filter-subkind').addEventListener('change', function (e) {
      state.subkindFilter = e.target.value;
      state.page = 1;
      syncUrlState();
      renderAll();
    });

    var resetBtn = document.getElementById('btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetAllFilters);
    }

    document.getElementById('btn-prev-page').addEventListener('click', function () {
      if (state.page > 1) { state.page--; renderAll(); window.scrollTo({ top: 260, behavior: 'smooth' }); }
    });
    document.getElementById('btn-next-page').addEventListener('click', function () {
      state.page++; renderAll(); window.scrollTo({ top: 260, behavior: 'smooth' });
    });

    document.getElementById('lang-ko').addEventListener('click', function () { applyLanguage('ko', false); });
    document.getElementById('lang-en').addEventListener('click', function () { applyLanguage('en', false); });

    document.getElementById('drawer-close-btn').addEventListener('click', closeEvidenceDrawer);
    document.getElementById('drawer-backdrop').addEventListener('click', closeEvidenceDrawer);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeEvidenceDrawer();
    });
  }

  function fetchShardJson(relPath) {
    return fetch('./data/' + relPath).then(function (r) {
      if (!r.ok) throw new Error('Shard HTTP ' + r.status);
      return r.json();
    });
  }

  function loadBundleFallback(manifest) {
    return fetch('./data/' + manifest.bundle_path)
      .then(function (r) {
        if (!r.ok) throw new Error('Bundle HTTP ' + r.status);
        return r.json();
      })
      .then(function (bundle) {
        state.records = [];
        state.recordIds = {};
        mergeShardRecords('bundle', Array.isArray(bundle.records) ? bundle.records : []);
        state.fullyLoaded = true;
        renderCounts();
        renderAll();
        tryResolveDeepLink();
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
        document.getElementById('prov-as-of').textContent = manifest.as_of || '-';
        var okSrc = (manifest.sources_status || []).filter(function (s) { return s.fetch_status === 'fetched'; }).length;
        var totSrc = (manifest.sources_status || []).length;
        document.getElementById('prov-sources-health').textContent = okSrc + ' / ' + totSrc + ' Verified (HTTP 200)';
        document.getElementById('bundle-sha-inline').textContent = 'Bundle SHA-256: ' + String(manifest.bundle_sha256 || '').slice(0, 20) + '…';
        renderSourcesTable();
        renderCounts();

        var shards = manifest.shards || null;
        var priorityNames = ['legislation_watch', 'tribunal_and_citizenship_stats', 'fwo_compliance'];
        var bulkNames = ['foi_disclosure', 'abf_enforcement'];

        var hasAllShards = shards && priorityNames.concat(bulkNames).every(function (k) { return Boolean(shards[k]); });
        if (!hasAllShards) {
          return loadBundleFallback(manifest);
        }

        /* Launch ALL 5 domain shards concurrently; render Page 1 immediately once the 3 tiny shards finish */
        var priorityPromises = priorityNames.map(function (name) {
          return fetchShardJson(shards[name]).then(function (payload) {
            mergeShardRecords(name, payload && payload.records);
          });
        });

        var bulkPromises = bulkNames.map(function (name) {
          return fetchShardJson(shards[name]).then(function (payload) {
            mergeShardRecords(name, payload && payload.records);
            renderAll();
            tryResolveDeepLink();
          });
        });

        return Promise.all(priorityPromises)
          .then(function () {
            renderAll();
            tryResolveDeepLink();
            return Promise.all(bulkPromises);
          })
          .then(function () {
            state.fullyLoaded = true;
            renderCounts();
            renderAll();
            tryResolveDeepLink();
          })
          .catch(function () {
            return loadBundleFallback(manifest);
          });
      })
      .catch(function (err) {
        state.loadError = err.message || String(err);
        renderAll();
      });
  }

  bindEvents();

  var params = new URLSearchParams(window.location.search);
  var initTab = params.get('tab');
  var initQ = params.get('q');
  var initState = params.get('state');
  var initType = params.get('type');
  var initId = params.get('id');
  var initLang = params.get('lang');
  if (!initLang) {
    try { initLang = localStorage.getItem('parkco_lang'); } catch (e) {}
  }

  if (initId && initId.trim()) {
    state.pendingDeepLinkId = initId.trim();
  }
  if (initQ) {
    state.query = initQ.trim();
    var sInput = document.getElementById('intel-search');
    if (sInput) sInput.value = state.query;
  }
  if (initState) {
    var stSel = document.getElementById('filter-state');
    if (stSel && stSel.querySelector('option[value="' + CSS.escape(initState) + '"]')) {
      state.stateFilter = initState;
      stSel.value = initState;
    }
  }
  if (initType) {
    var sbSel = document.getElementById('filter-subkind');
    if (sbSel && sbSel.querySelector('option[value="' + CSS.escape(initType) + '"]')) {
      state.subkindFilter = initType;
      sbSel.value = initType;
    }
  }
  if (initTab && VALID_TABS.indexOf(initTab) >= 0) {
    activateTab(initTab, true);
  } else {
    syncFilterControlsForTab();
  }

  applyLanguage(initLang === 'en' ? 'en' : 'ko', true);
  loadRelease();
})();
