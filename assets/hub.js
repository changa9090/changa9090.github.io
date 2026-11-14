/* Park & Co Lawyers · Main Hub Router, Instant Filter, Directory, i18n & Live Source Status (2026.11) */
(function () {
  'use strict';

  var currentLang = 'ko';
  var routerState = { q1: null, q2: null, q3: null };
  var activeCat = 'all';
  var latestPollingData = null;

  var TOOLS = {
    guide: {
      toolId: 'visa-solution-guide',
      hrefKo: './parkco-visa-solution-guide/?lang=ko',
      hrefEn: './parkco-visa-solution-guide/?lang=en',
      titleKo: '호주 비자 솔루션 가이드 (714개 직종 · 로컬 이력서 판독)',
      titleEn: 'Australia Visa Solution Guide (714 SOL & Local CV Matcher)',
      timeKo: '소요 약 3분',
      timeEn: '~3 min'
    },
    crisis: {
      toolId: 'visa-crisis',
      hrefKo: './parkco-visa-crisis-navigator/?lang=ko',
      hrefEn: './parkco-visa-crisis-navigator/?lang=en',
      titleKo: '비자 거절 · 취소(NOICC/s 116/s 501) · 행정재심기구(ART) 기한 진단기',
      titleEn: 'Visa Refusal, Cancellation (NOICC) & ART Deadline Navigator',
      timeKo: '소요 약 1분',
      timeEn: '~1 min'
    },
    sid: {
      toolId: 'sid-ens',
      hrefKo: './parkco-sid-ens-navigator/?lang=ko',
      hrefEn: './parkco-sid-ens-navigator/?lang=en',
      titleKo: '고용주 스폰서(482 · 186 · 494) 연봉 · 8607 유예 · 제재 명부 진단기',
      titleEn: 'SID 482, ENS 186 & Sponsor Sanctions Navigator',
      timeKo: '소요 약 2분',
      timeEn: '~2 min'
    },
    gsm: {
      toolId: 'gsm-state',
      hrefKo: './parkco-gsm-state-navigator/?lang=ko',
      hrefEn: './parkco-gsm-state-navigator/?lang=en',
      titleKo: '일반기술이민(189 · 190 · 491) 점수 · 8개 주정부 배정 진단기',
      titleEn: 'GSM Points (189/190/491) & 8-State Nomination Navigator',
      timeKo: '소요 약 2분',
      timeEn: '~2 min'
    },
    dama: {
      toolId: 'dama',
      hrefKo: './parkco-dama-navigator/?lang=ko',
      hrefEn: './parkco-dama-navigator/?lang=en',
      titleKo: '호주 13개 지역 DAMA 협약 · 연령(만 50/55세) · 급여 완화 탐색기',
      titleEn: 'Australia 13 DAMA Agreements & Age Concession Explorer',
      timeKo: '소요 약 2분',
      timeEn: '~2 min'
    },
    whm: {
      toolId: 'whm',
      hrefKo: './parkco-whm-navigator/?lang=ko',
      hrefEn: './parkco-whm-navigator/?lang=en',
      titleKo: '워킹홀리데이(417 · 462) 88/179일 지정근로 · 8547 제한 판정기',
      titleEn: 'WHM (417/462) 88/179-Day Work & Condition 8547 Calculator',
      timeKo: '소요 약 2분',
      timeEn: '~2 min'
    },
    emp: {
      toolId: 'employment-law',
      hrefKo: './parkco-employment-law-navigator/?lang=ko',
      hrefEn: './parkco-employment-law-navigator/?lang=en',
      titleKo: '호주 고용법 · 부당해고 21일 기한 · 정리해고 · 스폰서 교차 진단기',
      titleEn: 'Australian Employment Law & FWC 21-Day Limit Navigator',
      timeKo: '소요 약 2분',
      timeEn: '~2 min'
    },
    family: {
      toolId: 'family-law',
      hrefKo: './parkco-family-law-navigator/?lang=ko',
      hrefEn: './parkco-family-law-navigator/?lang=en',
      titleKo: '호주 가족법 · 한·호 재산분할 · 양육권 · 파트너비자 교차 진단기',
      titleEn: 'Australian Family Law, Property Pool & Parenting Navigator',
      timeKo: '소요 약 3분',
      timeEn: '~3 min'
    },
    partner: {
      toolId: 'partner',
      hrefKo: './parkco-partner-graduate-navigator/?lang=ko',
      hrefEn: './parkco-partner-graduate-navigator/?lang=en',
      titleKo: '파트너 비자(820/801 · 309/100 · 300) · Schedule 3 · 복합사례 · 시민권 진단기',
      titleEn: 'Partner Visas (820/801, 309/100 & 300), Schedule 3, Complex Cases & Citizenship Navigator',
      timeKo: '소요 약 2분',
      timeEn: '~2 min'
    },
    partnerFaq: {
      toolId: 'faq-partner-spouse',
      hrefKo: 'https://faq.immispecialist.com/category/partner-spouse-visas?lang=ko',
      hrefEn: 'https://faq.immispecialist.com/category/partner-spouse-visas?lang=en',
      titleKo: '파트너·배우자·약혼비자(820/801 · 309/100 · 300) 60문항 지식 백과',
      titleEn: 'Partner, Spouse & Prospective Marriage Visa (820/309/300) 60-Item FAQ Guide',
      timeKo: '즉시 검색',
      timeEn: 'Instant search'
    },
    parent: {
      toolId: 'parent-visa',
      hrefKo: './parkco-parent-visa-navigator/?lang=ko',
      hrefEn: './parkco-parent-visa-navigator/?lang=en',
      titleKo: '부모초청 비자(143 · 864 · 870 등) 대기열 속도 · 재정보증 진단기',
      titleEn: 'Parent Visas Queue Velocity, AoS & Subclass 870 Navigator',
      timeKo: '소요 약 2분',
      timeEn: '~2 min'
    },
    settle: {
      toolId: 'parkco-settlement-cost-navigator',
      hrefKo: './parkco-settlement-cost-navigator/?lang=ko',
      hrefEn: './parkco-settlement-cost-navigator/?lang=en',
      titleKo: '비자별 주립 공립학비 · 메디케어 · 외국인 주택 취득세 비교기',
      titleEn: 'Settlement Cost Navigator (School Fees, Medicare & Stamp Duty)',
      timeKo: '소요 약 2분',
      timeEn: '~2 min'
    },
    vgpt: {
      toolId: 'vgpt',
      hrefKo: './visa-global-processing-time/?lang=ko',
      hrefEn: './visa-global-processing-time/?lang=en',
      titleKo: '호주 비자 심사기간 · 내 대기일수(D-Day) 예상 완료일 계산기',
      titleEn: 'Visa Global Processing Times & My Wait D-Day Calculator',
      timeKo: '소요 약 1분',
      timeEn: '~1 min'
    },
    diy: {
      toolId: 'diy-service-save-money',
      hrefKo: './diy-service-save-money/?lang=ko',
      hrefEn: './diy-service-save-money/?lang=en',
      titleKo: '혼자 해결하는 호주 법률 가이드 · 25개 어워드 임금 계산기',
      titleEn: 'DIY Legal Self-Help Guide & 25 Modern Awards Pay Calculator',
      timeKo: '소요 약 2분',
      timeEn: '~2 min'
    },
    'au-migration-law-tracker': {
      toolId: 'au-migration-law-tracker',
      hrefKo: 'https://changa9090.github.io/au-migration-law-tracker/?lang=ko',
      hrefEn: 'https://changa9090.github.io/au-migration-law-tracker/?lang=en',
      titleKo: '호주 이민법령 개정 쉬운 해설 트래커',
      titleEn: 'Australian Migration Law Reform Tracker',
      timeKo: '상시 업데이트',
      timeEn: 'Live tracker'
    },
    faq: {
      toolId: 'faq-immigration',
      hrefKo: 'https://faq.immispecialist.com/?lang=ko',
      hrefEn: 'https://faq.immispecialist.com/?lang=en',
      titleKo: '법무법인 박앤코 호주이민 대표 FAQ 백과',
      titleEn: 'Park & Co Immigration Law FAQ Encyclopedia',
      timeKo: '즉시 검색',
      timeEn: 'Instant search'
    },
    orgFaq: {
      toolId: 'faq-organisations',
      hrefKo: 'https://faq.immispecialist.com/organisations?lang=ko',
      hrefEn: 'https://faq.immispecialist.com/organisations?lang=en',
      titleKo: '기업 · 스폰서 인사담당자 전용 B2B 실무 FAQ',
      titleEn: 'Employer & Sponsor HR B2B FAQ Encyclopedia',
      timeKo: '즉시 검색',
      timeEn: 'Instant search'
    },
    empFaq: {
      toolId: 'faq-employment',
      hrefKo: 'https://faq.immispecialist.com/employment?lang=ko',
      hrefEn: 'https://faq.immispecialist.com/employment?lang=en',
      titleKo: '법무법인 박앤코 호주 고용법 대표 실무 FAQ',
      titleEn: 'Park & Co Employment Law FAQ Encyclopedia',
      timeKo: '즉시 검색',
      timeEn: 'Instant search'
    },
    familyFaq: {
      toolId: 'faq-family',
      hrefKo: 'https://faq.immispecialist.com/family?lang=ko',
      hrefEn: 'https://faq.immispecialist.com/family?lang=en',
      titleKo: '법무법인 박앤코 호주 가족법 대표 실무 FAQ',
      titleEn: 'Park & Co Family Law FAQ Encyclopedia',
      timeKo: '즉시 검색',
      timeEn: 'Instant search'
    },
    intel: {
      toolId: 'intelligence',
      hrefKo: './intelligence/',
      hrefEn: './intelligence/?lang=en',
      titleKo: '데이터 출처 및 1차 법령 자동 검증 레지스트리',
      titleEn: 'Primary-Source Verification & Audit Registry',
      timeKo: '실시간 검증',
      timeEn: 'Live audit'
    },
    emgSvc: {
      hrefKo: 'https://parklawyers.com.au/case-emergency/visa/?lang=ko',
      hrefEn: 'https://parklawyers.com.au/case-emergency/visa/',
      titleKo: '비자응급실 (s 57 · PIC 4020 · NOICC 무료 통지서 온라인 진단)',
      titleEn: 'Visa Emergency™ (Free Notice Diagnostic)'
    },
    artSvc: {
      hrefKo: 'https://parklawyers.com.au/appealing-visa-decision/?lang=ko',
      hrefEn: 'https://parklawyers.com.au/appealing-visa-decision/',
      titleKo: 'ART Case Review™ (거절·취소 무료 재심 승산 검토)',
      titleEn: 'ART Case Review™ (Free Merits Review Assessment)'
    }
  };

  var I18N = {
    ko: {
      pageTitle: '법무법인 박앤코 법률·비자 진단 허브 | 호주 이민법 · 고용법 · 가족법',
      metaDesc: '법무법인 박앤코(Park & Co Lawyers)가 1차 법령과 공식 통계를 바탕으로 운영하는 호주 이민법·고용법·가족법 통합 진단 허브입니다. 14개 양방향 진단·추적기와 5대 공식 실무 FAQ(이민·파트너 62문항·기업 B2B·고용·가족법) 및 출처 검증 레지스트리 등 총 20종 공개 법률 시스템을 제공합니다.',
      brandTitle: '법무법인 박앤코 법률·비자 진단 허브',
      navRouter: '내 상황 찾기',
      navPopular: '주요 진단기',
      navDir: '전체 도구(20)',
      navFaq: '이민 대표 FAQ',
      navOrgFaq: '기업·HR FAQ',
      navIntel: '데이터 출처',
      btnInquiry: '공식 문의 허브',
      urgentText: '기한 구분 안내: 호주 내 비자 취소 예고(NOICC) 소명 5영업일(만료 전 +5영업일 재량연장 신청 가능) · 일반 거절·취소 확정 후 ART 재심 28역일(통지일 구금 시 14역일 · 연장 불가) · 부당해고 구제 21일(예외적 사정 연장 심사)',
      urgentLink: '기한 계산기 바로가기 →',
      heroEyebrow: 'PARK & CO LAWYERS · PRIMARY-SOURCE LEGAL & VISA DIAGNOSTICS',
      heroTitle: '호주 비자 · 고용법 · 가족법 맞춤 진단 허브',
      heroSub: '호주 연방 법령과 이민성, 행정재심기구(ART), 공정근로위원회(FWC), 연방순회·가족법원(FCFCOA)의 공식 기준을 바탕으로 14개 양방향 진단·추적기와 5대 실무 FAQ 백과(파트너 비자 62문항 포함) 및 원문 검증 레지스트리(총 20종)를 제공합니다.',
      routerTitle: '내 상황에 맞는 진단 도구 찾기 (3문항 선택)',
      routerReset: '선택 초기화',
      q1Label: 'Q1. 어떤 문제를 해결하고 싶으신가요?',
      q1_pathway: '비자·영주권 경로 진단',
      q1_partner_visa: '파트너·배우자·약혼비자 (820·309·300)',
      q1_crisis: '비자 거절·취소·기한 긴급 대응',
      q1_sponsor_emp: '고용주 스폰서(482·186·494)·노무·임금',
      q1_family_partner: '호주 가족법 (이혼·재산분할·양육권·DVO)',
      q1_parent_settle: '부모 초청·자녀 학비·정착비',
      q1_diy_cost: '혼자 서류 준비(DIY)·수임료 비교',
      q2Label: 'Q2. 현재 누구의 입장에서 확인하시나요?',
      q2_onshore_temp: '호주 체류 중 (임시·브리징 비자)',
      q2_offshore: '해외 거주 중 (호주 입국 전)',
      q2_pr_citizen: '호주 영주권자·시민권자 (가족 초청·스폰서)',
      q2_employer_hr: '호주 사업주·인사담당자 (HR)',
      q3Label: 'Q3. 연령대 또는 시급한 사정이 있으신가요?',
      q3_urgent: '통지서 수령·마감 임박 (최우선)',
      q3_18_34: '만 18~34세',
      q3_35_44: '만 35~44세',
      q3_45_54: '만 45~54세',
      q3_55_any: '만 55세 이상 또는 연령 무관',
      emptyPrompt: '위 3가지 질문에서 현재 상황을 선택하시면 가장 알맞은 진단 도구로 바로 안내해 드립니다.',
      quickFilterLabel: '빠른 키워드 점프',
      quickFilterPlaceholder: '비자 번호·법률 키워드 즉시 필터 (482 · 186 · NOICC · 거절 · 이혼 · 부당해고 · 임금 · 학비 · 부모 · 워홀 · DAMA)...',
      quickFilterClear: '초기화 (Esc)',
      popTitle: '가장 많이 찾는 6대 핵심 진단기',
      popSub: '직종 판독부터 법정 기한 계산과 대기일수 확인까지 가장 자주 쓰이는 도구를 모았습니다.',
      dirTitle: '주제별 전체 도구 디렉터리 (14개 진단·추적기 + 5대 공식 FAQ · 검증 레지스트리 총 20종)',
      dirSub: '분야별 탭을 누르면 해당 분야 전체 도구가 즉시 표시되며 비자 번호나 법률 키워드로도 바로 검색할 수 있습니다.',
      cat_all: '전체 (20)',
      cat_crisis: '긴급·심사기간',
      cat_skilled: '기술·지방·워홀',
      cat_employer: '고용주·노무',
      cat_family: '가족·파트너·부모·정착',
      cat_selfhelp: '셀프법률·법령변동',
      searchPlaceholder: '비자 번호 또는 키워드 검색 (예: 482 · 186 · 189 · 820 · 870 · NOICC · 학비 · 부당해고 · 재산분할)...',
      svcTitle: '전문가 직접 검토가 필요한 단계라면 공식 온라인 서비스를 이용하십시오',
      svcSub: '자가 진단 후 접수 전 서류 점검이나 긴급 통지서·재심 승산 분석이 필요할 때 대표변호사가 직접 검토합니다.',
      trustDataTitle: '1차 법령·통계 출처 스냅샷 및 해시 무결성 점검 현황',
      trustDataDesc: '연방 법령 등록부(FRL)와 이민성 기준 금액(CSIT $79,423 · SSIT $146,576), 행정재심기구(ART) 통계, 주정부 공지의 원문 스냅샷 해시(SHA-256) 및 응답 상태를 정기 점검합니다(번들·스냅샷 바이트 무결성 확인용이며 개별 계산·법률 해석을 자동 보증하지 않음).',
      trustDataLink: '전체 데이터 출처 및 해시 검증 레지스트리 보기 →',
      trustLawyerTitle: '감수 및 운영 책임 변호사',
      trustLawyerName: '박창민 대표변호사 (Chang Min Park)',
      trustLawyerRole: '법무법인 박앤코 대표변호사 · 퀸즐랜드 변호사회 공인 이민법 전문변호사 (QLS Accredited Specialist in Immigration Law)',
      trustLawyerContact: '공식 이메일: enquiry@parkcolawyers.com · 사무소: Underwood QLD (Brisbane · Sydney · Perth)',
      footerInventory: '공개 법률 디렉터리 구성: 14개 양방향 진단·추적기 · 5대 분야별 공식 FAQ(이민·파트너 62문항·기업 B2B·고용·가족법) · 1차 출처 검증 레지스트리 등 총 20종 및 대표변호사 직접 검토 서비스 3종 운영',
      footerDisclaimer: '본 포털의 진단 결과와 가이드는 일반적인 법률 정보 제공을 목적으로 하며 개별 사안에 대한 법률 자문을 대신하지 않습니다. 법정 기한이 임박한 경우 즉시 전문변호사와 상의하시기 바랍니다.'
    },
    en: {
      pageTitle: 'Park & Co Legal & Visa Diagnostic Hub | Australian Immigration, Employment & Family Law',
      metaDesc: 'Interactive Australian immigration, employment, and family law diagnostic hub by Park & Co Lawyers featuring 14 primary-source navigators and trackers, 5 official practice FAQs (including Partner 62-FAQ and Employer B2B), and 1 live source registry (20 tools total).',
      brandTitle: 'Park & Co Legal & Visa Hub',
      navRouter: 'Find My Tool',
      navPopular: 'Popular Tools',
      navDir: 'All Tools (20)',
      navFaq: 'Immigration FAQ',
      navOrgFaq: 'Employer B2B FAQ',
      navIntel: 'Data Sources',
      btnInquiry: 'Official Inquiry Hub',
      urgentText: 'Statutory Deadlines: Onshore NOICC 5 working days (discretionary +5wd before expiry) · General Part 5 ART Review 28 calendar days (14 days if detained on day notified · non-extendable) · Unfair Dismissal 21 days (exceptional circumstances only)',
      urgentLink: 'Open Deadline Calculator →',
      heroEyebrow: 'PARK & CO LAWYERS · PRIMARY-SOURCE LEGAL & VISA DIAGNOSTICS',
      heroTitle: 'Australian Visa, Employment & Family Law Diagnostic Hub',
      heroSub: 'Explore 14 interactive diagnostic navigators and trackers, 5 bilingual FAQ encyclopedias (including the 62-question Partner Visa Hub and Employer B2B), and 1 primary-source verification registry (20 systems total) grounded in Federal Legislation, Home Affairs, ART, FWC, and FCFCOA data.',
      routerTitle: '3-Question Situation Router (Select Your Situation)',
      routerReset: 'Reset Selection',
      q1Label: 'Q1. What issue would you like to solve?',
      q1_pathway: 'Visa & PR Pathway Check',
      q1_partner_visa: 'Partner, Spouse & Fiancé Visas (820/309/300)',
      q1_crisis: 'Visa Refusal, Cancellation & Urgent Deadlines',
      q1_sponsor_emp: 'Employer Sponsor (482/186/494) & Workplace Law',
      q1_family_partner: 'Family Law (Divorce, Property, Parenting & DVO)',
      q1_parent_settle: 'Parent Visas, School Fees & Settlement Costs',
      q1_diy_cost: 'DIY Legal Prep & Fee Comparison',
      q2Label: 'Q2. Whose perspective are you checking from?',
      q2_onshore_temp: 'In Australia (Temporary / Bridging Visa)',
      q2_offshore: 'Outside Australia (Offshore Applicant)',
      q2_pr_citizen: 'Australian PR / Citizen (Sponsoring Family)',
      q2_employer_hr: 'Australian Employer / HR Manager',
      q3Label: 'Q3. Age band or urgent statutory deadline?',
      q3_urgent: 'Notice Received / Urgent Deadline (Top Priority)',
      q3_18_34: 'Age 18–34',
      q3_35_44: 'Age 35–44',
      q3_45_54: 'Age 45–54',
      q3_55_any: 'Age 55+ or Not Age-Sensitive',
      emptyPrompt: 'Select any option in the 3 questions above and we will guide you straight to the right diagnostic tool.',
      quickFilterLabel: 'Instant Keyword Jump',
      quickFilterPlaceholder: 'Jump to any visa or topic instantly (482, 186, NOICC, refusal, divorce, unfair dismissal, wages, school fees, parent, WHM, DAMA)...',
      quickFilterClear: 'Clear (Esc)',
      popTitle: '6 Most-Used Flagship Diagnostic Tools',
      popSub: 'Fast entry to occupation matching, statutory deadline checks, sponsor salary rules, and wait-time calculators.',
      dirTitle: 'Complete Tool Directory by Topic (14 Navigators & Trackers + 5 Official FAQs & Source Registry · 20 Total)',
      dirSub: 'Select a category tab to view all tools in that area, or search by subclass number or legal keyword.',
      cat_all: 'All (20)',
      cat_crisis: 'Urgent & Processing',
      cat_skilled: 'Skilled, Regional & WHM',
      cat_employer: 'Sponsor & Workplace',
      cat_family: 'Family, Partner, Parent & Settlement',
      cat_selfhelp: 'Self-Help, FAQ & Law Updates',
      searchPlaceholder: 'Search visa subclass or keyword (e.g. 482, 186, 189, 820, 870, NOICC, school fees, unfair dismissal)...',
      svcTitle: 'Official Online Legal Review Services by Principal Lawyer',
      svcSub: 'Need pre-lodgement document verification, urgent notice triage, or an ART merits review opinion after running a diagnostic?',
      trustDataTitle: 'Primary-Source Snapshot & SHA-256 Integrity Status',
      trustDataDesc: 'Regularly checks source snapshot hashes (SHA-256) and HTTP availability for the Federal Register of Legislation, Home Affairs thresholds (CSIT $79,423 · SSIT $146,576), ART statistics, and state releases (verifies snapshot byte-integrity, not automated legal advice certification).',
      trustDataLink: 'Inspect Full Source & SHA-256 Registry →',
      trustLawyerTitle: 'Supervising Principal Lawyer',
      trustLawyerName: 'Chang Min Park (Legal Practitioner Director)',
      trustLawyerRole: 'Principal Lawyer, Park & Co Lawyers · QLS Accredited Specialist in Immigration Law',
      trustLawyerContact: 'Official Email: enquiry@parkcolawyers.com · Office: Underwood QLD (Brisbane · Sydney · Perth)',
      footerInventory: 'Directory Inventory: 14 interactive navigators & trackers · 5 official FAQs (Immigration, Partner 62-FAQ, Employer B2B, Employment, Family Law) · 1 primary-source verification registry (20 systems total) + 3 Principal Lawyer review services',
      footerDisclaimer: 'General legal information only; does not constitute legal advice for individual matters. Seek urgent legal advice if a statutory deadline applies.'
    }
  };

  function computeRecommendation() {
    var q1 = routerState.q1;
    var q2 = routerState.q2;
    var q3 = routerState.q3;
    if (!q1 && !q2 && !q3) return null;

    var isUrgent = (q1 === 'crisis' || q3 === 'urgent');
    var primary = 'guide';
    var secondary = ['faq', 'vgpt'];
    var reasonKo = '714개 공식 직종 판별과 로컬 이력서 매칭으로 가능한 비자 경로와 점수를 한 번에 비교할 수 있습니다.';
    var reasonEn = 'Compare eligible visa pathways and points in one place with 714 SOL occupation matching and local CV parsing.';

    if (q1 === 'crisis' || (q3 === 'urgent' && q1 !== 'sponsor_emp' && q1 !== 'family_partner' && q1 !== 'partner_visa')) {
      primary = 'crisis';
      secondary = ['emgSvc', 'artSvc'];
      reasonKo = '취소 전 NOICC 소명(호주 내 5영업일 · 만료 전 재량연장 신청 가능)과 일반 거절·취소 확정 후 행정재심기구(ART) 재심(28역일 · 통지일 구금 시 14역일 · 연장 불가) 마감일을 주별 공휴일 기준으로 즉시 계산합니다.';
      reasonEn = 'Immediately calculates pre-cancellation NOICC (onshore 5 working days + discretionary extension) and non-extendable ART review (28 calendar days; 14 days if detained on day notified) deadlines with state public holidays.';
    } else if (q1 === 'partner_visa') {
      primary = 'partner';
      if (q3 === 'urgent') {
        secondary = ['crisis', 'partnerFaq', 'family', 'artSvc'];
        reasonKo = '파트너 비자 거절(호주 내 28일 재심 · 309는 비자 신청인 본인 청구 · 300은 호주 스폰서 청구 · r 4.02)과 관계 종료 통지, Schedule 3·s 48·8503 장벽 및 11대 복합 시나리오를 즉시 점검합니다.';
        reasonEn = 'Immediately checks Partner visa refusal review standing and 28-day limits (onshore/309 applicant vs 300 sponsor under r 4.02), relationship cessation rules, Schedule 3/s 48/8503 barriers, and 11 complex scenarios.';
      } else if (q2 === 'offshore') {
        secondary = ['partnerFaq', 'vgpt', 'family'];
        reasonKo = '해외 신청 파트너 비자(309/100)와 약혼비자(300→820/801) 경로 비교, 4대 관계 입증 요소, 6개 주 관계등록 효력 및 비이주 가족 신체검사(PIC 4007) 기준을 진단합니다.';
        reasonEn = 'Compares offshore Partner (309/100) and Prospective Marriage (300 to 820/801) pathways, 4 relationship pillars, 6-state registration rules, and non-migrating family health (PIC 4007) requirements.';
      } else if (q2 === 'pr_citizen') {
        secondary = ['partnerFaq', 'family', 'vgpt'];
        reasonKo = '스폰서 평생 2인·5년 간격 및 피초청 이력 제한(r 1.20J), 기여제 부모비자 출신 5년 제한(r 1.20KA), 미성년자 보호·범죄경력 심사(rr 1.20KB–1.20KD)와 4대 관계 입증 기준을 점검합니다.';
        reasonEn = 'Checks sponsor 2-person and 5-year spacing limits (r 1.20J), 5-year bar for contributory parent visa holders (r 1.20KA), child protection and criminal record checks (rr 1.20KB–1.20KD), and the 4 relationship pillars.';
      } else {
        secondary = ['partnerFaq', 'vgpt', 'crisis', 'family'];
        reasonKo = '호주 내 파트너 비자(820/801) 4대 관계 입증 기준과 12개월 사실혼·관계등록(WA·NT 제외 6개 주) 요건, Schedule 3·s 48·8503·491/494 장벽 및 60문항 지식허브를 차례대로 진단합니다.';
        reasonEn = 'Diagnoses onshore Partner visa (820/801) 4 relationship pillars, 12-month de facto and 6-state registration rules (excluding WA/NT), Schedule 3/s 48/8503/491 barriers, and the 60-item knowledge hub.';
      }
    } else if (q1 === 'sponsor_emp') {
      if (q3 === 'urgent') {
        primary = 'emp';
        secondary = ['sid', 'diy'];
        reasonKo = '해고일로부터 21일 이내에 접수해야 하는 공정근로위원회(FWC) 신청기한(예외적 사정 연장 심사 s 394(3))과 482 비자 180일 이직 유예 규정을 함께 점검합니다.';
        reasonEn = 'Checks the 21-day statutory FWC filing limit (extension only in exceptional circumstances under s 394(3)/s 366(2)) alongside Subclass 482 180-day work cessation rules.';
      } else if (q2 === 'employer_hr') {
        primary = 'sid';
        secondary = ['emp', 'dama', 'orgFaq'];
        reasonKo = '사업주와 인사담당자를 위해 CSIT($79,423)·AMSR 연봉 기준과 SAF 부담금 및 494 노미네이션 수수료($0 면제) 규정을 계산합니다.';
        reasonEn = 'Verifies CSIT ($79,423), AMSR salary layers, SAF levy, and Subclass 494 Nil ($0) nomination fee rules for employers and HR.';
      } else if (q3 === '45_54') {
        primary = 'dama';
        secondary = ['sid', 'emp'];
        reasonKo = '만 45세 이상 신청인을 위해 만 50세·55세 연령 상한 완화와 급여 감면이 적용되는 13개 DAMA 협약 직종을 탐색합니다.';
        reasonEn = 'Finds 13 DAMA regional occupations offering age 50/55 concessions and TSMIT/CSIT concessions for ages 45–54.';
      } else {
        primary = 'sid';
        secondary = ['emp', 'diy'];
        reasonKo = '482·186·494 스폰서 비자 3단계 연봉 요건과 186 영주권 전환 2년 경력 합산 및 Condition 8607 유예 기간을 확인합니다.';
        reasonEn = 'Checks 3-layer sponsor salary rules, 2-year 186 TRT aggregation, and Condition 8607 mobility periods.';
      }
    } else if (q1 === 'family_partner') {
      if (q2 === 'onshore_temp' && q3 !== 'urgent') {
        primary = 'partner';
        secondary = ['family', 'partnerFaq', 'familyFaq'];
        reasonKo = '파트너 비자(820/801 · 309/100) 4대 관계 입증 기준과 12개월 사실혼·관계등록 요건 및 Schedule 3 장벽을 차례대로 점검합니다.';
        reasonEn = 'Reviews Partner visa (820/309) relationship pillars, 12-month de facto and state registration rules, and Schedule 3 waiver criteria.';
      } else {
        primary = 'family';
        secondary = ['partner', 'partnerFaq', 'familyFaq'];
        reasonKo = '호주 가족법상 이혼 후 12개월·사실혼 해소 후 2년 법원 제소기한(s 44(3), s 44(5)–(6))과 한·호 통합 재산분할 및 연방순회·가족법원(FCFCOA) 양육 절차를 안내합니다.';
        reasonEn = 'Covers Australian family law court filing deadlines (s 44(3), s 44(5)–(6)), global property pools, FCFCOA parenting steps, and partner visa separation rules.';
      }
    } else if (q1 === 'parent_settle') {
      if (q2 === 'pr_citizen' || q3 === '55_any') {
        primary = 'parent';
        secondary = ['settle', 'faq'];
        reasonKo = '부모초청 비자(143 · 864 · 870 등) 최신 대기열 이동 속도와 가족균형테스트 및 재정보증(AoS) 소득 기준을 계산합니다.';
        reasonEn = 'Simulates Parent visa queue velocity, Balance of Family test, AoS income thresholds, and Subclass 870 sponsorship.';
      } else {
        primary = 'settle';
        secondary = ['parent', 'guide'];
        reasonKo = '체류 비자와 거주 예정 주(State)에 따른 자녀 주립 공립학비 면제·감면액과 메디케어 및 외국인 주택 취득세를 한눈에 비교합니다.';
        reasonEn = 'Compares public school tuition fees, Medicare eligibility, and foreign buyer stamp duty surcharges by visa and state.';
      }
    } else if (q1 === 'diy_cost') {
      primary = 'diy';
      secondary = ['faq', 'au-migration-law-tracker'];
      reasonKo = '혼자 준비할 수 있는 절차와 변호사 선임이 필요한 경계를 구분하고 25개 현대 어워드 임금과 무료 점검표를 제공합니다.';
      reasonEn = 'Clarifies what you can safely handle yourself versus when to instruct a lawyer, with 25 Modern Award calculators and checklists.';
    } else {
      if (q3 === '45_54') {
        primary = 'dama';
        secondary = ['guide', 'sid'];
        reasonKo = '일반 기술이민 연령 상한(만 45세) 이후에도 영주권 전환이 가능한 13개 DAMA 협약 직종과 스폰서 경로를 우선 비교합니다.';
        reasonEn = 'Prioritizes 13 DAMA regional agreements with age 50/55 PR pathways alongside employer-sponsored options.';
      } else if (q3 === '18_34' && q2 === 'onshore_temp') {
        primary = 'guide';
        secondary = ['gsm', 'whm'];
        reasonKo = '만 18~34세 구간에서 유리한 일반기술이민(189·190·491) 점수와 워킹홀리데이 연장 및 714개 직종 경로를 함께 진단합니다.';
        reasonEn = 'Diagnoses maximum-age-point GSM pathways, WHM extensions, and 714 SOL occupation options.';
      } else if (q2 === 'employer_hr') {
        primary = 'sid';
        secondary = ['dama', 'emp', 'orgFaq'];
        reasonKo = '기업 인사담당자 관점에서 스폰서 비자 연봉 요건과 노미네이션 절차 및 제재 리스크를 바로 점검합니다.';
        reasonEn = 'Checks sponsor salary compliance, nomination steps, and ABF sanction risks for employers.';
      } else {
        primary = 'guide';
        secondary = ['gsm', 'vgpt'];
      }
    }

    return {
      urgent: isUrgent,
      primary: TOOLS[primary],
      secondary: secondary.map(function (k) { return TOOLS[k]; }).filter(Boolean),
      reason: currentLang === 'en' ? reasonEn : reasonKo
    };
  }

  function renderRouter() {
    var box = document.getElementById('router-output');
    if (!box) return;
    var rec = computeRecommendation();
    if (!rec) {
      box.innerHTML = '<div class="pk-empty-prompt"><span>' + I18N[currentLang].emptyPrompt + '</span></div>';
      return;
    }
    var isEn = currentLang === 'en';
    var pHref = isEn ? rec.primary.hrefEn : rec.primary.hrefKo;
    var pTitle = isEn ? rec.primary.titleEn : rec.primary.titleKo;
    var pTime = isEn ? (rec.primary.timeEn || '') : (rec.primary.timeKo || '');
    var kicker = rec.urgent
      ? (isEn ? 'URGENT DEADLINE MATCH · RECOMMENDED FIRST STEP' : '긴급 기한 최우선 추천 도구')
      : (isEn ? 'BEST-FIT DIAGNOSTIC TOOL' : '맞춤 추천 1순위 진단 도구');
    var btnLabel = isEn ? 'Open Recommended Tool →' : '추천 진단기 바로 열기 →';
    var secLabel = isEn ? 'Related tools & guides:' : '함께 확인하면 좋은 도구:';

    var secLinks = rec.secondary.map(function (s) {
      var sh = isEn ? s.hrefEn : s.hrefKo;
      var st = isEn ? s.titleEn : s.titleKo;
      var ext = sh.indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '';
      return '<a href="' + sh + '"' + ext + '>' + st + '</a>';
    }).join(' · ');

    box.innerHTML =
      '<div class="hub-rec-card' + (rec.urgent ? ' hub-rec-card--urgent' : '') + '">' +
        '<span class="hub-rec-card__kicker">' + kicker + (pTime ? ' · ' + pTime : '') + '</span>' +
        '<h3 class="hub-rec-card__title">' + pTitle + '</h3>' +
        '<p class="hub-rec-card__reason">' + rec.reason + '</p>' +
        '<div class="hub-rec-card__actions">' +
          '<a class="pk-btn-cta" href="' + pHref + '">' + btnLabel + '</a>' +
        '</div>' +
        (secLinks ? '<div class="hub-rec-secondary"><span>' + secLabel + '</span>' + secLinks + '</div>' : '') +
      '</div>';
  }

  function getCardSearchHaystack(card) {
    var parts = [
      card.textContent || '',
      card.getAttribute('data-keywords') || '',
      card.getAttribute('data-tool-id') || ''
    ];
    if (card.querySelectorAll) {
      card.querySelectorAll('[data-ko],[data-en]').forEach(function (el) {
        parts.push(el.getAttribute('data-ko') || '');
        parts.push(el.getAttribute('data-en') || '');
      });
    }
    return parts.join(' ').toLowerCase();
  }

  function applyDirectoryFilter() {
    var quickEl = document.getElementById('hub-quick-filter');
    var qQuick = quickEl ? quickEl.value.trim().toLowerCase() : '';
    var searchEl = document.getElementById('hub-search-input');
    var qDir = searchEl ? searchEl.value.trim().toLowerCase() : '';
    var countEl = document.getElementById('hub-quick-filter-count');
    var clearBtn = document.getElementById('hub-quick-filter-clear');
    var dirResetBtn = document.getElementById('hub-dir-active-filter-reset');
    var popSection = document.getElementById('popular');
    var popCards = document.querySelectorAll('#popular-grid .hub-tool-card');
    var dirCards = document.querySelectorAll('#directory-grid .hub-tool-card');

    document.querySelectorAll('.hub-quick-chip[data-kw-ko]').forEach(function (chip) {
      var kwKo = (chip.getAttribute('data-kw-ko') || '').toLowerCase();
      var kwEn = (chip.getAttribute('data-kw-en') || '').toLowerCase();
      var active = Boolean(qQuick && (qQuick === kwKo || qQuick === kwEn));
      if (chip.classList) chip.classList.toggle('is-active', active);
    });

    if (!qQuick) {
      popCards.forEach(function (card) { card.style.display = ''; });
      if (popSection) popSection.style.display = '';
      if (countEl) countEl.hidden = true;
      if (clearBtn) clearBtn.hidden = true;

      var visibleDirCount = 0;
      dirCards.forEach(function (card) {
        var cats = (card.getAttribute('data-cat') || '').split(/\s+/);
        var catMatch = activeCat === 'all' || cats.indexOf(activeCat) >= 0;
        var text = getCardSearchHaystack(card);
        var qMatch = !qDir || text.indexOf(qDir) >= 0;
        var show = Boolean(catMatch && qMatch);
        card.style.display = show ? '' : 'none';
        if (show) visibleDirCount += 1;
      });

      if (dirResetBtn) {
        if (qDir || activeCat !== 'all') {
          dirResetBtn.hidden = false;
          dirResetBtn.textContent = currentLang === 'en'
            ? ('Reset Filter · Show All (' + dirCards.length + ') ×')
            : ('필터 해제 · 전체 (' + dirCards.length + ') 보기 ×');
        } else {
          dirResetBtn.hidden = true;
        }
      }
      return;
    }

    var popMatches = 0;
    popCards.forEach(function (card) {
      var match = getCardSearchHaystack(card).indexOf(qQuick) >= 0;
      card.style.display = match ? '' : 'none';
      if (match) popMatches += 1;
    });
    if (popSection) {
      popSection.style.display = popMatches > 0 ? '' : 'none';
    }

    var dirMatches = 0;
    dirCards.forEach(function (card) {
      var cats = (card.getAttribute('data-cat') || '').split(/\s+/);
      var catMatch = activeCat === 'all' || cats.indexOf(activeCat) >= 0;
      var text = getCardSearchHaystack(card);
      var quickMatch = text.indexOf(qQuick) >= 0;
      var dirSearchMatch = !qDir || text.indexOf(qDir) >= 0;
      var visible = Boolean(catMatch && quickMatch && dirSearchMatch);
      card.style.display = visible ? '' : 'none';
      if (visible) dirMatches += 1;
    });

    if (countEl) {
      countEl.hidden = false;
      countEl.textContent = currentLang === 'en'
        ? (dirMatches + (dirMatches === 1 ? ' matching tool' : ' matching tools'))
        : (dirMatches + '개 도구 일치');
    }
    if (clearBtn) {
      clearBtn.hidden = false;
    }
    if (dirResetBtn) {
      dirResetBtn.hidden = false;
      dirResetBtn.textContent = currentLang === 'en'
        ? ('Active Filter "' + qQuick + '" (' + dirMatches + ') · Show All (' + dirCards.length + ') ×')
        : ('키워드 필터 "' + qQuick + '" (' + dirMatches + '개) · 전체 (' + dirCards.length + ') 보기 ×');
    }
  }

  function applyCardStatusBadges(data) {
    if (!data) return;
    var seriesMap = {};
    (data.series || []).forEach(function (s) {
      if (s && s.id) seriesMap[s.id] = s;
    });
    if (!seriesMap['vgpt'] && seriesMap['trackers']) {
      seriesMap['vgpt'] = seriesMap['trackers'];
    }
    if (!seriesMap['au-migration-law-tracker'] && seriesMap['trackers']) {
      seriesMap['au-migration-law-tracker'] = seriesMap['trackers'];
    }

    document.querySelectorAll('.hub-tool-card[data-tool-id]').forEach(function (card) {
      if (!card.querySelector) return;
      var statusEl = card.querySelector('[data-card-status]');
      if (!statusEl) return;
      var toolId = card.getAttribute('data-tool-id') || '';
      var entry = seriesMap[toolId];
      var isCached = false;
      var koLabel = '● 출처 스냅샷 확인';
      var enLabel = '● Source Snapshot OK';

      if (entry) {
        var failedCnt = typeof entry.warning_or_failed_sources === 'number' ? entry.warning_or_failed_sources : 0;
        var cachedCnt = typeof entry.cached_fallback_sources === 'number' ? entry.cached_fallback_sources : 0;
        if (failedCnt > 0 || entry.status === 'degraded' || entry.status === 'warning') {
          isCached = true;
          koLabel = '● 캐시 백업';
          enLabel = '● Cached Backup';
        } else if (cachedCnt > 0 || entry.status === 'cached_fallback') {
          isCached = true;
          koLabel = '● 캐시 스냅샷';
          enLabel = '● Cached Snapshot';
        }
      } else if (toolId.indexOf('faq-') !== 0 && toolId !== 'intelligence') {
        return;
      }

      if (statusEl.classList) {
        statusEl.classList.toggle('hub-card-status--cached', isCached);
      }
      statusEl.setAttribute('data-ko', koLabel);
      statusEl.setAttribute('data-en', enLabel);
      statusEl.textContent = currentLang === 'en' ? enLabel : koLabel;
      statusEl.hidden = false;
    });
  }

  function applyLang(lang) {
    currentLang = lang === 'en' ? 'en' : 'ko';
    var dict = I18N[currentLang];
    document.documentElement.lang = currentLang;
    document.body.setAttribute('data-ui-lang', currentLang);
    document.title = dict.pageTitle;
    var descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', dict.metaDesc);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-ko][data-en]').forEach(function (el) {
      el.textContent = currentLang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-ko');
    });

    document.querySelectorAll('a[data-ko-href][data-en-href]').forEach(function (a) {
      a.setAttribute('href', currentLang === 'en' ? a.getAttribute('data-en-href') : a.getAttribute('data-ko-href'));
    });

    var searchEl = document.getElementById('hub-search-input');
    if (searchEl) searchEl.setAttribute('placeholder', dict.searchPlaceholder);

    var quickEl = document.getElementById('hub-quick-filter');
    if (quickEl) quickEl.setAttribute('placeholder', dict.quickFilterPlaceholder);

    var btnKo = document.getElementById('hub-lang-ko');
    var btnEn = document.getElementById('hub-lang-en');
    if (btnKo) btnKo.classList.toggle('active', currentLang === 'ko');
    if (btnEn) btnEn.classList.toggle('active', currentLang === 'en');

    try {
      localStorage.setItem('parkco_lang', currentLang);
      var url = new URL(window.location.href);
      if (currentLang === 'en') {
        url.searchParams.set('lang', 'en');
      } else {
        url.searchParams.delete('lang');
      }
      window.history.replaceState({}, '', url.toString());
    } catch (e) {}

    renderRouter();
    applyDirectoryFilter();
    if (latestPollingData) applyCardStatusBadges(latestPollingData);
  }

  function clearQuickFilter() {
    var quickEl = document.getElementById('hub-quick-filter');
    if (!quickEl) return;
    quickEl.value = '';
    applyDirectoryFilter();
    if (quickEl.focus) quickEl.focus();
  }

  function initEvents() {
    document.querySelectorAll('.hub-q-chip').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var group = btn.getAttribute('data-q');
        var val = btn.getAttribute('data-val');
        if (!group) return;
        if (routerState[group] === val) {
          routerState[group] = null;
          btn.classList.remove('is-selected');
        } else {
          routerState[group] = val;
          document.querySelectorAll('.hub-q-chip[data-q="' + group + '"]').forEach(function (sib) {
            sib.classList.toggle('is-selected', sib === btn);
          });
        }
        renderRouter();
      });
    });

    var resetBtn = document.getElementById('router-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        routerState = { q1: null, q2: null, q3: null };
        document.querySelectorAll('.hub-q-chip').forEach(function (b) { b.classList.remove('is-selected'); });
        renderRouter();
      });
    }

    document.querySelectorAll('.hub-cat-btn').forEach(function (tab) {
      tab.addEventListener('click', function () {
        activeCat = tab.getAttribute('data-cat') || 'all';
        document.querySelectorAll('.hub-cat-btn').forEach(function (t) {
          t.classList.toggle('active', t === tab);
        });
        var qEl = document.getElementById('hub-quick-filter');
        if (qEl && qEl.value) {
          qEl.value = '';
        }
        var sEl = document.getElementById('hub-search-input');
        if (sEl && sEl.value && activeCat === 'all') {
          sEl.value = '';
        }
        applyDirectoryFilter();
      });
    });

    var dirResetBtn = document.getElementById('hub-dir-active-filter-reset');
    if (dirResetBtn) {
      dirResetBtn.addEventListener('click', function () {
        activeCat = 'all';
        document.querySelectorAll('.hub-cat-btn').forEach(function (t) {
          t.classList.toggle('active', t.getAttribute('data-cat') === 'all');
        });
        var qEl = document.getElementById('hub-quick-filter');
        if (qEl) qEl.value = '';
        var sEl = document.getElementById('hub-search-input');
        if (sEl) sEl.value = '';
        applyDirectoryFilter();
      });
    }

    var searchEl = document.getElementById('hub-search-input');
    if (searchEl) {
      searchEl.addEventListener('input', applyDirectoryFilter);
      searchEl.addEventListener('keydown', function (ev) {
        if (ev && ev.key === 'Escape' && searchEl.value) {
          ev.preventDefault();
          searchEl.value = '';
          applyDirectoryFilter();
        }
      });
    }

    var quickEl = document.getElementById('hub-quick-filter');
    if (quickEl) {
      quickEl.addEventListener('input', applyDirectoryFilter);
      quickEl.addEventListener('search', applyDirectoryFilter);
      quickEl.addEventListener('keydown', function (ev) {
        if (ev && ev.key === 'Escape') {
          ev.preventDefault();
          clearQuickFilter();
        }
      });
    }

    var quickClearBtn = document.getElementById('hub-quick-filter-clear');
    if (quickClearBtn) {
      quickClearBtn.addEventListener('click', clearQuickFilter);
    }

    document.querySelectorAll('.hub-quick-chip[data-kw-ko]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        if (!quickEl) return;
        var kw = currentLang === 'en'
          ? (chip.getAttribute('data-kw-en') || chip.getAttribute('data-kw-ko') || '')
          : (chip.getAttribute('data-kw-ko') || '');
        if (quickEl.value.trim().toLowerCase() === kw.toLowerCase()) {
          quickEl.value = '';
        } else {
          quickEl.value = kw;
        }
        applyDirectoryFilter();
      });
    });

    if (typeof document.addEventListener === 'function') {
      document.addEventListener('keydown', function (ev) {
        if (ev && ev.key === 'Escape' && quickEl && quickEl.value) {
          clearQuickFilter();
        }
      });
    }

    var btnKo = document.getElementById('hub-lang-ko');
    var btnEn = document.getElementById('hub-lang-en');
    if (btnKo) btnKo.addEventListener('click', function () { applyLang('ko'); });
    if (btnEn) btnEn.addEventListener('click', function () { applyLang('en'); });
  }

  function loadLivePollingBadge() {
    fetch('./data/hub_polling_status.json')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data) return;
        latestPollingData = data;
        var badge = document.getElementById('ticker-verified-badge');
        var okCnt = typeof data.verified_ok_sources === 'number' ? data.verified_ok_sources : 119;
        var totCnt = typeof data.total_primary_sources === 'number' ? data.total_primary_sources : okCnt;
        var liveCnt = typeof data.live_verified_sources === 'number' ? data.live_verified_sources : okCnt;
        var cachedCnt = typeof data.cached_fallback_sources === 'number' ? data.cached_fallback_sources : 0;
        if (badge) {
          var koTxt = cachedCnt > 0
            ? ('● ' + okCnt + '/' + totCnt + '개 출처 스냅샷 점검 (실시간 ' + liveCnt + ' · 캐시 백업 ' + cachedCnt + ')')
            : ('● ' + okCnt + '/' + totCnt + '개 출처 스냅샷 해시 확인 완료');
          var enTxt = cachedCnt > 0
            ? ('● ' + okCnt + '/' + totCnt + ' Source Snapshots Checked (' + liveCnt + ' Live · ' + cachedCnt + ' Cached)')
            : ('● ' + okCnt + '/' + totCnt + ' Source Snapshots Checked');
          badge.setAttribute('data-ko', koTxt);
          badge.setAttribute('data-en', enTxt);
          badge.textContent = currentLang === 'en' ? enTxt : koTxt;
        }
        applyCardStatusBadges(data);
      })
      .catch(function () {});
  }

  initEvents();
  var qsLang = null;
  try {
    qsLang = new URLSearchParams(window.location.search).get('lang');
    if (!qsLang) qsLang = localStorage.getItem('parkco_lang');
  } catch (e) {}
  applyLang(qsLang === 'en' ? 'en' : 'ko');
  loadLivePollingBadge();
})();
