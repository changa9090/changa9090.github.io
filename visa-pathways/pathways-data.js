/* Park & Co Lawyers · Interactive Australian Visa Pathways Data (KO/EN)
   Primary-Source Grounded · Reviewed 20 NOV 2026
   Dynamic thresholds & deadlines are hydrated from ../shared/parkco-constants.json */
window.PARKCO_PATHWAYS_DATA = (function () {
  'use strict';

  var SOURCES = {
    s48: {
      code: 'Migration Act 1958 s 48',
      url: 'https://www.legislation.gov.au/C2004A00456/latest/text'
    },
    s116: {
      code: 'Migration Act s 116 / reg 2.44',
      url: 'https://www.legislation.gov.au/C2004A00456/latest/text'
    },
    s347: {
      code: 'Migration Act s 347(3) & (5)',
      url: 'https://www.legislation.gov.au/C2004A00456/latest/text'
    },
    s351: {
      code: 'Migration Act ss 351 / 501J',
      url: 'https://www.legislation.gov.au/C2004A00456/latest/text'
    },
    s477: {
      code: 'Migration Act s 477 (FCFCOA)',
      url: 'https://www.legislation.gov.au/C2004A00456/latest/text'
    },
    s500: {
      code: 'Migration Act s 500(6B)',
      url: 'https://www.legislation.gov.au/C2004A00456/latest/text'
    },
    f00640: {
      code: 'F2026L00640 (ART Student On-Papers)',
      url: '../au-migration-law-tracker/'
    },
    f01348: {
      code: 'F2026L01348 (Onshore 500 Preclusion)',
      url: '../au-migration-law-tracker/'
    },
    f01449: {
      code: 'F2026L01449 (407 Offshore Rule · 12 Nov 2026)',
      url: '../au-migration-law-tracker/'
    },
    f01500: {
      code: 'F2026L01500 (485 Graduate Reform 2026)',
      url: '../au-migration-law-tracker/'
    },
    f01503: {
      code: 'F2026L01503 (Visitor 8503 · 28 Nov 2026)',
      url: '../parkco-visa-conditions-explorer/'
    },
    f01448: {
      code: 'F2026L01448 (2026 Measures No. 1)',
      url: '../au-migration-law-tracker/'
    },
    regSch8: {
      code: 'Migration Regulations 1994 Sch 8',
      url: '../parkco-visa-conditions-explorer/'
    },
    intel: {
      code: 'Park & Co Primary-Source Registry',
      url: '../intelligence/'
    }
  };

  var TOOLS = {
    guide: {
      labelKo: '호주 비자 솔루션 가이드 (714 직종·이력서)',
      labelEn: 'Visa Solution Guide (714 SOL & CV)',
      hrefKo: '../parkco-visa-solution-guide/?lang=ko',
      hrefEn: '../parkco-visa-solution-guide/?lang=en'
    },
    sid: {
      labelKo: 'SID 482 · ENS 186 연봉·제재 진단기',
      labelEn: 'SID 482 & ENS 186 Navigator',
      hrefKo: '../parkco-sid-ens-navigator/?lang=ko',
      hrefEn: '../parkco-sid-ens-navigator/?lang=en'
    },
    sponsorReview: {
      labelKo: 'Sponsorship Case Review™ (기업 무료 진단)',
      labelEn: 'Sponsorship Case Review™ (Free Check)',
      hrefKo: '../case-review-sponsorship/',
      hrefEn: '../case-review-sponsorship/?lang=en'
    },
    gsm: {
      labelKo: '일반기술이민(189·190·491) 점수·8개주 진단기',
      labelEn: 'GSM Points & 8-State Navigator',
      hrefKo: '../parkco-gsm-state-navigator/?lang=ko',
      hrefEn: '../parkco-gsm-state-navigator/?lang=en'
    },
    dama: {
      labelKo: '13개 지역 DAMA 협약·완화 탐색기',
      labelEn: '13 Regional DAMA Explorer',
      hrefKo: '../parkco-dama-navigator/?lang=ko',
      hrefEn: '../parkco-dama-navigator/?lang=en'
    },
    whm: {
      labelKo: '워홀(417·462) 지정근로·8547 판정기',
      labelEn: 'WHM (417/462) & Condition 8547 Tool',
      hrefKo: '../parkco-whm-navigator/?lang=ko',
      hrefEn: '../parkco-whm-navigator/?lang=en'
    },
    partner: {
      labelKo: '파트너 비자(820·309·300)·시민권 진단기',
      labelEn: 'Partner Visa (820/309/300) Navigator',
      hrefKo: '../parkco-partner-graduate-navigator/?lang=ko',
      hrefEn: '../parkco-partner-graduate-navigator/?lang=en'
    },
    partnerFaq: {
      labelKo: '파트너 비자 62문항 실무 FAQ ↗',
      labelEn: 'Partner Visa 62-Item FAQ ↗',
      hrefKo: 'https://faq.immispecialist.com/category/partner-spouse-visas?lang=ko',
      hrefEn: 'https://faq.immispecialist.com/category/partner-spouse-visas?lang=en',
      external: true
    },
    parent: {
      labelKo: '부모초청 비자 대기열·AoS 진단기',
      labelEn: 'Parent Visa Queue & AoS Navigator',
      hrefKo: '../parkco-parent-visa-navigator/?lang=ko',
      hrefEn: '../parkco-parent-visa-navigator/?lang=en'
    },
    crisis: {
      labelKo: '비자 거절·취소(NOICC)·ART 기한 진단기',
      labelEn: 'Refusal, NOICC & ART Deadline Tool',
      hrefKo: '../parkco-visa-crisis-navigator/?lang=ko',
      hrefEn: '../parkco-visa-crisis-navigator/?lang=en'
    },
    conditions: {
      labelKo: '비자 컨디션(8101–8626) 해독기',
      labelEn: 'Visa Conditions (8101–8626) Explorer',
      hrefKo: '../parkco-visa-conditions-explorer/?lang=ko',
      hrefEn: '../parkco-visa-conditions-explorer/?lang=en'
    },
    vgpt: {
      labelKo: '비자 심사기간 · D-Day 계산기',
      labelEn: 'Visa Processing Times Calculator',
      hrefKo: '../visa-global-processing-time/?lang=ko',
      hrefEn: '../visa-global-processing-time/?lang=en'
    },
    tracker: {
      labelKo: '호주 이민법령 개정 트래커',
      labelEn: 'AU Migration Law Reform Tracker',
      hrefKo: '../au-migration-law-tracker/?lang=ko',
      hrefEn: '../au-migration-law-tracker/?lang=en'
    },
    faqImmi: {
      labelKo: '박앤코 호주이민 대표 FAQ ↗',
      labelEn: 'Park & Co Immigration FAQ ↗',
      hrefKo: 'https://faq.immispecialist.com/?lang=ko',
      hrefEn: 'https://faq.immispecialist.com/?lang=en',
      external: true
    },
    faqOrg: {
      labelKo: '기업·스폰서 HR 전용 B2B FAQ ↗',
      labelEn: 'Employer & Sponsor B2B FAQ ↗',
      hrefKo: 'https://faq.immispecialist.com/organisations?lang=ko',
      hrefEn: 'https://faq.immispecialist.com/organisations?lang=en',
      external: true
    },
    artReview: {
      labelKo: 'ART Case Review™ (무료 재심 검토) ↗',
      labelEn: 'ART Case Review™ (Free Assessment) ↗',
      hrefKo: 'https://parklawyers.com.au/appealing-visa-decision/?lang=ko',
      hrefEn: 'https://parklawyers.com.au/appealing-visa-decision/',
      external: true
    },
    emergency: {
      labelKo: '비자응급실 Visa Emergency™ (무료 진단) ↗',
      labelEn: 'Visa Emergency™ (Free Triage) ↗',
      hrefKo: 'https://parklawyers.com.au/case-emergency/visa/?lang=ko',
      hrefEn: 'https://parklawyers.com.au/case-emergency/visa/',
      external: true
    }
  };

  /* ── MAP 1: Big Picture Overview (6 Categories) ── */
  var OVERVIEW_CARDS = [
    {
      id: 'ov-employer',
      tone: 'default',
      tagKo: '고용주 스폰서',
      tagEn: 'Employer Sponsored',
      titleKo: '고용주 스폰서',
      titleEn: 'Employer Sponsored',
      linesKo: [
        '482 SID → 요건 충족 시 186',
        '186 Direct Entry 별도 검토',
        '494 지역 고용주 경로 → 191'
      ],
      linesEn: [
        '482 SID → 186 when eligible',
        '186 Direct Entry assessed separately',
        '494 Regional employer pathway → 191'
      ],
      detail: {
        summaryKo: [
          '호주 내 적격 고용주(스폰서)의 포지션 지명(Nomination)을 바탕으로 취업하고 영주권으로 이어지는 경로입니다.',
          '482 SID(Skills in Demand) 임시비자를 거쳐 186 TRT 영주비자로 전환하거나, 경력·기술심사 충족 시 186 Direct Entry로 바로 신청할 수 있습니다.',
          '지방 지역 고용주 지명인 494 비자는 3년 이상 적격 체류·조건 준수 후 191 영주비자로 전환합니다.'
        ],
        summaryEn: [
          'Employer-nominated pathways where an approved Australian sponsor nominates a genuine skilled position.',
          'Common routes include Subclass 482 (Skills in Demand) leading to Subclass 186 TRT, or direct permanent residency via 186 Direct Entry.',
          'Regional employer-sponsored Subclass 494 leads to Subclass 191 permanent residency after 3 years of eligible residence and compliance.'
        ],
        watchoutKo: '직종 목록(CSOL), 연봉 하한(CSIT/SSIT 및 시장임금 AMSR), 고용주의 재무 건전성(reg 2.72 / reg 5.19)과 SAF 부담금 요건을 모두 충족해야 합니다.',
        watchoutEn: 'Occupation eligibility, salary thresholds (CSIT/SSIT and AMSR), employer financial viability (reg 2.72 / reg 5.19), and SAF levy obligations all apply.',
        constChips: ['csit', 'ssit', 'vac482', 'vac186'],
        sources: [SOURCES.intel],
        tools: [TOOLS.sid, TOOLS.sponsorReview, TOOLS.faqOrg]
      }
    },
    {
      id: 'ov-skilled',
      tone: 'default',
      tagKo: '점수제 기술이민',
      tagEn: 'General Skilled Migration',
      titleKo: '기술이민',
      titleEn: 'Skilled Migration',
      linesKo: [
        '189 독립 / 190 주정부 지명',
        '491 주정부·적격 가족 후원 → 191',
        '기술심사·영어·점수·초청 요건'
      ],
      linesEn: [
        '189 Independent / 190 State Nominated',
        '491 State or Eligible Family → 191',
        'Skills assessment, English, points & invitation'
      ],
      detail: {
        summaryKo: [
          '고용주 스폰서 없이 본인의 직종·학력·경력·영어·연령 점수(Schedule 6D)로 경쟁해 초청(Invitation)을 받는 경로입니다.',
          '189(독립)·190(주정부 지명)은 승인 즉시 영주비자이며, 491(지방 임시비자)은 최소 3년 보유·조건 준수 후 191 영주비자로 전환합니다.',
          'EOI(의향서) 제출만으로 비자 신청이나 체류 연장이 되지 않으며, 반드시 정식 초청을 받아야 신청할 수 있습니다.'
        ],
        summaryEn: [
          'Points-tested migration (Schedule 6D) without requiring an employer sponsor, subject to competitive invitation rounds.',
          'Subclasses 189 and 190 grant direct permanent residence; Subclass 491 is a 5-year regional provisional visa leading to Subclass 191.',
          'Submitting an EOI is not a visa application and does not extend lawful stay; an invitation is mandatory.'
        ],
        watchoutKo: '통상 초청 시점 만 45세 미만이어야 하며, 최소 점수(65점)를 넘더라도 실제 초청 커트라인과 8개 주·준주별 자체 요건은 크게 다릅니다.',
        watchoutEn: 'Applicants must generally be under 45 at invitation. Meeting 65 points does not guarantee an invitation; state nomination rules vary across all 8 jurisdictions.',
        constChips: ['vac189', 'vac190'],
        sources: [SOURCES.intel],
        tools: [TOOLS.gsm, TOOLS.guide, TOOLS.faqImmi]
      }
    },
    {
      id: 'ov-family',
      tone: 'default',
      tagKo: '가족초청 이민',
      tagEn: 'Family Migration',
      titleKo: '가족이민',
      titleEn: 'Family Migration',
      linesKo: [
        '파트너 820 → 801 / 309 → 100',
        '부모 103·804·143·864',
        '단계형 173 → 143 / 884 → 864'
      ],
      linesEn: [
        'Partner 820 → 801 / 309 → 100',
        'Parent 103 · 804 · 143 · 864',
        'Two-stage 173 → 143 / 884 → 864'
      ],
      detail: {
        summaryKo: [
          '호주 시민권자·영주권자(또는 적격 뉴질랜드 시민)의 배우자·사실혼 파트너(820/801·309/100·약혼 300) 및 부모 초청 경로입니다.',
          '파트너 비자는 재정·가사·사회적 인식·상호 헌신의 4대 관계 기둥 입증이 핵심이며, 사실혼은 통상 12개월 동거 또는 주정부 관계등록이 검토됩니다.',
          '부모 비자는 가족균형검사(Balance of Family), 재정보증(AoS), 건강·신원 요건과 더불어 정원 제한에 따른 긴 대기기간을 확인해야 합니다.'
        ],
        summaryEn: [
          'Covers Partner/Spouse/Fiancé visas (820/801 onshore, 309/100 offshore, 300 prospective marriage) and Parent visas sponsored by eligible Australians.',
          'Partner visas assess the four relationship pillars (financial, household, social, commitment) plus de facto duration or state registration.',
          'Parent visas require Balance of Family test, Assurance of Support (AoS), and careful planning around multi-year statutory queues.'
        ],
        watchoutKo: '호주 내 불법체류 이력(Schedule 3), s 48 제한, Condition 8503, 스폰서 횟수 제한(reg 1.20J) 여부를 신청 전 반드시 점검해야 합니다.',
        watchoutEn: 'Check Schedule 3 criteria, section 48 bars, Condition 8503, and sponsorship limitations (reg 1.20J) before lodging onshore.',
        constChips: ['vacPartner', 'vacParent143'],
        sources: [SOURCES.s48, SOURCES.intel],
        tools: [TOOLS.partner, TOOLS.partnerFaq, TOOLS.parent]
      }
    },
    {
      id: 'ov-study',
      tone: 'default',
      tagKo: '유학 · 졸업생',
      tagEn: 'Study & Post-Study',
      titleKo: '유학과 졸업 후 취업',
      titleEn: 'Study & Post-Study Work',
      linesKo: [
        '학생 500 → 적격 졸업생 485',
        '2026년 학생·졸업생 가족 규정 개정',
        '현재 비자별 호주 내 신청 제한 확인'
      ],
      linesEn: [
        'Student 500 → Eligible Graduate 485',
        '2026 Student & Graduate family reforms',
        'Check onshore lodgement bans by visa'
      ],
      detail: {
        summaryKo: [
          '학생비자(500)로 학업을 마친 뒤 적격 요건(학업 기간·연령·영어 등)을 충족하면 졸업생비자(485)로 호주 경력을 쌓아 기술·스폰서 이민을 준비할 수 있습니다.',
          '2026년 10~11월 시행된 학생(F2026L01347·F2026L01348) 및 졸업생(F2026L01500) 개정으로 신청 자격·장소·가족 요건이 대폭 강화되었습니다.',
          '워홀(417·462), 482, 485, 방문비자 등 지정 17개 비자 소지자는 호주 내에서 학생비자(500/590)를 유효하게 신청할 수 없습니다.'
        ],
        summaryEn: [
          'Eligible Subclass 500 graduates may transition to Subclass 485 (Temporary Graduate) to gain Australian work experience toward skilled or sponsored pathways.',
          'Major 2026 reforms (F2026L01347, F2026L01348, F2026L01500) updated Student and Graduate eligibility, lodgement location, and family rules.',
          'Holders of 17 specified temporary visas (including 417, 462, 482, 485, and Visitor visas) cannot validly apply for Subclass 500/590 onshore.'
        ],
        watchoutKo: '학생비자 거절 시 ART 재심은 다수 사건이 구두 심리 없이 서면심리(on the papers · F2026L00640)로 진행되므로 초기 서류 완성도가 매우 중요합니다.',
        watchoutEn: 'Most Student visa refusal reviews at the ART are now decided on the papers without an oral hearing (F2026L00640), making initial evidence quality critical.',
        constChips: ['vac500', 'vac485'],
        sources: [SOURCES.f01348, SOURCES.f01500, SOURCES.f00640],
        tools: [TOOLS.tracker, TOOLS.conditions, TOOLS.vgpt]
      }
    },
    {
      id: 'ov-innovation',
      tone: 'default',
      tagKo: '혁신 · 기존 사업비자',
      tagEn: 'Innovation & Legacy Business',
      titleKo: '혁신 인재·기존 사업비자',
      titleEn: 'Innovation & Legacy Business',
      linesKo: [
        '858 National Innovation Visa는 초청 필요',
        '188 신규 접수는 2024년 7월 31일 종료',
        '기존 188 보유자는 888 적격 별도 검토'
      ],
      linesEn: [
        '858 National Innovation Visa (invitation only)',
        '188 closed to new applications (31 Jul 2024)',
        'Existing 188 holders check 888 transition'
      ],
      detail: {
        summaryKo: [
          'Subclass 858 National Innovation Visa(NIV)는 국제적으로 탁월한 성취를 입증하고 지명(Nomination) 및 초청을 받아야 신청하는 영주비자 경로입니다.',
          '기존 사업·투자이민(Subclass 188)은 2024년 7월 31일부로 신규 접수가 종료되었습니다.',
          '이미 188 비자를 보유한 신청자는 해당 스트림의 요건을 충족할 경우 888 영주비자 전환 경로를 별도로 검토할 수 있습니다.'
        ],
        summaryEn: [
          'Subclass 858 National Innovation Visa (NIV) is an invitation-only permanent visa for individuals with internationally recognised exceptional achievements.',
          'The Business Innovation and Investment (Subclass 188) program permanently closed to new applications on 31 July 2024.',
          'Existing Subclass 188 holders may still pursue Subclass 888 permanent residency if they satisfy stream-specific transitional criteria.'
        ],
        watchoutKo: '858 NIV는 단순 고소득이나 일반 사업 경력만으로 초청되지 않으며, 우선순위 분야와 객관적·국제적 성취 입증이 요구됩니다.',
        watchoutEn: '858 NIV requires an official invitation based on priority sectors and verifiable internationally recognised achievements.',
        constChips: ['vac858'],
        sources: [SOURCES.intel],
        tools: [TOOLS.guide, TOOLS.faqImmi]
      }
    },
    {
      id: 'ov-precheck',
      tone: 'highlight',
      tagKo: '필수 사전 점검',
      tagEn: 'Before You Choose',
      titleKo: '선택 전에 확인할 사항',
      titleEn: 'Checks Before Choosing',
      linesKo: [
        '연령·국적·직종·영어·관계·자금·비자 이력',
        '임시비자 보유나 지명·EOI만으로',
        '영주권이 확정되지는 않습니다'
      ],
      linesEn: [
        'Age, passport, occupation, English, history',
        'Holding a temporary visa, nomination or EOI',
        'does not guarantee permanent residency'
      ],
      detail: {
        summaryKo: [
          '모든 비자 경로는 신청 시점의 위치(호주 내/해외), 현재 비자 조건(8503·8534 등), 과거 거절·취소 이력(s 48·PIC 4020)부터 먼저 확인해야 합니다.',
          '건강(PIC 4005/4007) 및 신원(s 501) 요건은 임시·영주 비자 전반에 공통으로 적용됩니다.',
          'EOI 제출, 기술심사 통과, 주정부 관심표명(ROI)만으로는 합법 체류 기간이 연장되지 않습니다.'
        ],
        summaryEn: [
          'Always verify your physical location (onshore vs offshore), current visa conditions (e.g., 8503/8534), and prior refusal/cancellation history (s 48, PIC 4020).',
          'Health (PIC 4005/4007) and character (s 501) public interest criteria apply across visa subclasses.',
          'Lodging an EOI, skills assessment, or state ROI does not grant a bridging visa or extend lawful stay.'
        ],
        watchoutKo: '잘못된 비자 신청으로 거절되면 s 48 제한이 걸려 호주 내 재신청이 막힐 수 있으므로, 접수 전 유효 신청 요건을 반드시 대조하십시오.',
        watchoutEn: 'An onshore refusal can trigger a section 48 bar restricting further onshore applications. Verify validity criteria before lodging.',
        constChips: [],
        sources: [SOURCES.s48, SOURCES.regSch8, SOURCES.f01503],
        tools: [TOOLS.guide, TOOLS.conditions, TOOLS.crisis]
      }
    }
  ];

  /* ── MAP 2: From Current Visa to PR (4 Tracks × 3 Steps) ── */
  var START_FILTERS = [
    { id: 'all', labelKo: '전체 경로 보기', labelEn: 'All Pathways', tracks: ['t1', 't2', 't3', 't4'] },
    { id: 'whm', labelKo: '워홀 (417·462)', labelEn: 'Working Holiday (417/462)', tracks: ['t1', 't2', 't3', 't4'] },
    { id: 'student', labelKo: '학생 (500)', labelEn: 'Student (500)', tracks: ['t1', 't2', 't3'] },
    { id: 'grad', labelKo: '졸업생 (485)', labelEn: 'Graduate (485)', tracks: ['t1', 't2', 't3', 't4'] },
    { id: 'offshore', labelKo: '해외 거주자', labelEn: 'Offshore Applicant', tracks: ['t1', 't2', 't3', 't4'] }
  ];

  var PATHWAY_TRACKS = [
    {
      id: 't1',
      nodes: [
        {
          id: 'p-start',
          titleKo: '출발점',
          titleEn: 'Starting Point',
          bodyKo: '워홀 417·462 / 학생 500 / 졸업생 485\n각 비자의 취업·체류조건 확인',
          bodyEn: 'WHM 417·462 / Student 500 / Graduate 485\nVerify work & stay conditions first',
          detail: {
            summaryKo: [
              '현재 보유 비자의 취업 제한(예: 워홀 8547 동일 고용주 6개월, 학생 8105 학기 중 근로시간 제한)을 VEVO로 먼저 확인합니다.',
              '2026년 개정(F2026L01348)으로 417·462·482·485·방문비자 등 17개 비자 소지자는 호주 내에서 학생비자(500)로 전환할 수 없습니다.',
              '워홀 2·3차 연장을 계획 중이라면 2027.3.1 개편(120일·사전초청)과 2027.2.28 경과규정(88일)을 반드시 구분해야 합니다.'
            ],
            summaryEn: [
              'Check your current VEVO work and stay conditions first (e.g., WHM Condition 8547 6-month limit, Student Condition 8105 work hours).',
              'Under F2026L01348, holders of 17 temporary visas (including 417, 462, 482, 485, and Visitor visas) cannot validly apply for Subclass 500 onshore.',
              'WHM holders planning 2nd/3rd extensions should check the 28 Feb 2027 transitional cutoff (88 days) vs 1 Mar 2027 reform (120 days).'
            ],
            watchoutKo: '비자 만료 전 유효한 다음 비자를 접수하지 못하면 불법체류 및 s 48·Schedule 3 문제가 발생합니다.',
            watchoutEn: 'Failing to lodge a valid next application before expiry can lead to unlawful status, section 48 bars, and Schedule 3 barriers.',
            constChips: [],
            sources: [SOURCES.f01348, SOURCES.regSch8],
            tools: [TOOLS.conditions, TOOLS.whm, TOOLS.guide]
          }
        },
        {
          id: 'p-482',
          titleKo: '482 SID',
          titleEn: '482 SID',
          bodyKo: '고용주 지명·직종·급여·영어\nCore Skills 경력은 통상 최근 5년 내 1년 상당',
          bodyEn: 'Employer nomination, occupation, salary & English\nCore Skills: generally 1 yr full-time equiv. in last 5 yrs',
          detail: {
            summaryKo: [
              '482 Skills in Demand(SID) 비자는 Core Skills, Specialist Skills, Labour Agreement 스트림으로 나뉩니다.',
              'Core Skills 스트림은 CSOL 등재 직종과 최근 5년 내 통상 1년 상당의 관련 풀타임 경력, 영어 성적, CSIT 이상의 연봉 요건이 적용됩니다.',
              'Condition 8607 이직 유예 규정(단일 기간 최대 180일 · 비자 전체 기간 최대 365일)이 적용됩니다.'
            ],
            summaryEn: [
              'Subclass 482 (Skills in Demand) comprises Core Skills, Specialist Skills, and Labour Agreement streams.',
              'Core Skills generally requires a CSOL occupation, 1 year full-time equivalent relevant work experience within the last 5 years, English, and salary at or above CSIT and AMSR.',
              'Condition 8607 mobility rules allow up to 180 consecutive days (365 days total) between approved sponsors.'
            ],
            watchoutKo: '고용주 스폰서십(SBS)·포지션 진정성·시장임금(AMSR)·LMT 요건 중 하나라도 미충족 시 노미네이션이 거절될 수 있습니다.',
            watchoutEn: 'Nomination refusal risks include failing genuine position, AMSR salary benchmarking, LMT, or employer financial viability.',
            constChips: ['csit', 'ssit', 'vac482'],
            sources: [SOURCES.intel],
            tools: [TOOLS.sid, TOOLS.sponsorReview, TOOLS.faqOrg]
          }
        },
        {
          id: 'p-186trt',
          titleKo: '186 TRT',
          titleEn: '186 TRT',
          bodyKo: '통상 최근 3년 중 적격 스폰서 근무 2년\n연령·영어·고용주 지명 요건',
          bodyEn: 'Generally 2 yrs approved-sponsor work in last 3 yrs\nAge, English & employer nomination criteria',
          detail: {
            summaryKo: [
              '482 비자 보유자가 통상 최근 3년 중 2년간 적격 스폰서 고용주 하에서 풀타임 근무 요건을 충족하면 186 Temporary Residence Transition(TRT) 영주비자를 검토할 수 있습니다.',
              '원칙적으로 신청 시점 만 45세 미만이어야 하며(고소득 등 법정 면제 사유 별도 심사), Competent English 이상이 요구됩니다.',
              '승인 시 즉시 호주 영주권을 취득합니다.'
            ],
            summaryEn: [
              '482 holders who complete 2 years of eligible full-time sponsored employment within the last 3 years may qualify for Subclass 186 TRT permanent residency.',
              'Applicants must generally be under 45 at application (statutory exemptions such as high-income threshold assessed separately) and meet English requirements.',
              'Grants immediate Australian permanent residence upon approval.'
            ],
            watchoutKo: '만 45세 초과 시 연령 면제 요건(예: 공정근로 고소득 기준 FWHIT 연속 충족 등)을 사전에 정밀 계산해야 합니다.',
            watchoutEn: 'If aged 45 or over, verify statutory age exemptions (such as consecutive Fair Work High Income Threshold earnings) well in advance.',
            constChips: ['csit', 'fwhit', 'vac186'],
            sources: [SOURCES.intel],
            tools: [TOOLS.sid, TOOLS.sponsorReview]
          }
        }
      ]
    },
    {
      id: 't2',
      nodes: [
        {
          id: 'p-direct-chk',
          titleKo: '직접 영주권 검토',
          titleEn: 'Direct PR Check',
          bodyKo: '학력·직종·경력·영어·연령 확인',
          bodyEn: 'Verify qualifications, occupation, experience, English & age',
          detail: {
            summaryKo: [
              '임시비자를 거치지 않고 바로 영주권(186 DE, 189, 190)을 노릴 수 있는지 기술심사 가능 여부와 점수를 먼저 진단합니다.',
              '186 DE는 고용주 지명 + 기술심사 + 통상 3년 관련 경력이, 189·190은 기술심사 + EOI 점수 경쟁 + 초청이 핵심입니다.',
              '본인 직종이 714개 공식 직종 목록 중 어느 비자에 열려 있는지부터 확인하는 것이 출발점입니다.'
            ],
            summaryEn: [
              'Assess whether you qualify directly for permanent residency (186 DE, 189, or 190) without an intermediate temporary visa.',
              '186 DE requires employer nomination, a positive skills assessment, and generally 3 years relevant experience; 189/190 rely on competitive EOI invitations.',
              'Start by confirming which visa subclasses list your exact ANZSCO occupation.'
            ],
            watchoutKo: '기술심사 기관마다 요구하는 학력·경력·영어 기준과 심사 기간이 모두 다릅니다.',
            watchoutEn: 'Each skills assessing authority sets distinct qualification, work experience, and English rules.',
            constChips: [],
            sources: [SOURCES.intel],
            tools: [TOOLS.guide, TOOLS.gsm]
          }
        },
        {
          id: 'p-186de-gsm',
          titleKo: '186 DE 또는 189·190',
          titleEn: '186 DE or 189 · 190',
          bodyKo: '186 DE는 기술심사·관련 경력 등\n189·190은 EOI·초청·점수·주정부 요건',
          bodyEn: '186 DE: skills assessment & relevant experience\n189·190: EOI, invitation, points & state criteria',
          detail: {
            summaryKo: [
              '186 Direct Entry(DE): 적격 고용주의 지명, 유효한 기술심사, 통상 3년 이상의 관련 풀타임 경력 및 만 45세 미만(면제 별도) 요건을 충족해야 합니다.',
              '189(독립기술이민): 주정부·고용주 후원 없이 연방 SkillSelect 초청을 받아 신청합니다.',
              '190(주정부 지명): 8개 주·준주 중 한 곳의 지명(Nomination)을 받아 5점 가산 후 신청합니다.'
            ],
            summaryEn: [
              '186 Direct Entry: requires employer nomination, positive skills assessment, generally 3+ years full-time relevant work experience, and age under 45 (unless exempt).',
              '189 Skilled Independent: federal SkillSelect invitation without state or employer sponsorship.',
              '190 Skilled Nominated: requires nomination from one of Australia\'s 8 states/territories (+5 points).'
            ],
            watchoutKo: 'EOI에 과다 청구된 경력·학력 점수는 초청 후 비자 거절(및 PIC 4020 위험)로 직결되므로 접수 전 정밀 검증이 필수입니다.',
            watchoutEn: 'Over-claimed EOI points can lead to visa refusal (and PIC 4020 integrity risks) after invitation. Audit claims before lodging.',
            constChips: ['vac186', 'vac189', 'vac190'],
            sources: [SOURCES.intel],
            tools: [TOOLS.gsm, TOOLS.sid, TOOLS.guide]
          }
        },
        {
          id: 'p-pr',
          titleKo: '영주권',
          titleEn: 'Permanent Residency',
          bodyKo: '독립 요건을 모두 충족하여\n신청·심사 후 승인',
          bodyEn: 'Granted after full statutory assessment\nof all primary & public interest criteria',
          detail: {
            summaryKo: [
              '주신청자 및 동반가족 전원의 건강(PIC 4005/4007), 신원(s 501), 영어 및 비자별 법정 요건이 최종 확인되면 영주비자가 승인됩니다.',
              '영주권 승인 후에는 메디케어, 공립학교 학비 면제(주별 규정 확인), 향후 시민권(통상 4년 합법 거주 중 영주권 1년 이상) 경로가 열립니다.'
            ],
            summaryEn: [
              'Permanent residence is granted once all primary criteria plus health (PIC 4005/4007) and character (s 501) checks for all family members are satisfied.',
              'PR opens access to Medicare, domestic school/CSP settings, and eventual Australian citizenship (subject to statutory residence requirements).'
            ],
            watchoutKo: '영주권 승인 후에도 5년 여행 유효기간(Travel Facility)이 만료되면 해외 출국 전 RRV(155/157)가 필요합니다.',
            watchoutEn: 'Permanent visas carry a 5-year travel facility; you will need a Resident Return Visa (155/157) to re-enter Australia after that period.',
            constChips: [],
            sources: [SOURCES.intel],
            tools: [TOOLS.vgpt, TOOLS.partner]
          }
        }
      ]
    },
    {
      id: 't3',
      nodes: [
        {
          id: 'p-reg-chk',
          titleKo: '지역 경로 검토',
          titleEn: 'Regional Pathway Check',
          bodyKo: '주정부 지명 / 적격 가족 후원 / 고용주',
          bodyEn: 'State nomination / Eligible family / Regional employer',
          detail: {
            summaryKo: [
              '시드니·멜버른·브리즈번 대도시권을 제외한 지정 지방(Designated Regional Area)에서 거주·취업할 의사가 있다면 491 또는 494 경로를 활용할 수 있습니다.',
              '491은 주정부 지명 또는 지방 거주 적격 가족 후원으로 15점 가산을 받으며, 494는 지방 고용주의 지명으로 진행합니다.'
            ],
            summaryEn: [
              'Designated Regional Areas (most of Australia outside Sydney, Melbourne, and Brisbane metro) offer dedicated pathways via Subclass 491 or 494.',
              '491 adds +15 points via state nomination or eligible regional family sponsorship; 494 is nominated by a regional employer.'
            ],
            watchoutKo: '491·494 승인 시 지정 지방 거주·취업·학업 의무(Condition 8579)가 부착되며, 미준수 시 191 전환이나 비자 유지에 불이익이 발생합니다.',
            watchoutEn: 'Condition 8579 mandates living, working, and studying only in designated regional areas; breaches jeopardise Subclass 191 eligibility.',
            constChips: [],
            sources: [SOURCES.regSch8, SOURCES.intel],
            tools: [TOOLS.gsm, TOOLS.conditions]
          }
        },
        {
          id: 'p-491-494',
          titleKo: '491 또는 494',
          titleEn: '491 or 494',
          bodyKo: '491은 주정부 또는 적격 가족 후원\n494는 지역 고용주 지명',
          bodyEn: '491: State nominated or eligible family\n494: Regional employer nominated',
          detail: {
            summaryKo: [
              '491(Skilled Work Regional)과 494(Skilled Employer Sponsored Regional)는 모두 5년 유효기간의 지방 임시비자(Provisional)입니다.',
              '494는 지방 노미네이션 수수료가 $0(면제, 단 SAF 부담금은 별도)이며, RCB(지역인증기관) 조언과 기술심사·통상 3년 관련 경력이 검토됩니다.',
              '두 비자 모두 승인 후 3년간은 189·190·186·820 등 타 영주비자 전환 제한 규정이 적용됩니다.'
            ],
            summaryEn: [
              'Both Subclass 491 and Subclass 494 are 5-year provisional regional visas.',
              'Subclass 494 carries a $0 (Nil) nomination fee (SAF levy still applies) and generally requires RCB advice, skills assessment, and 3 years relevant experience.',
              'Statutory 3-year bars restrict transitioning to 189/190/186/820 while holding 491/494.'
            ],
            watchoutKo: '491·494 소지자는 3년 경과 전 다른 영주비자로의 우회가 법령으로 제한되므로 장기 거주 계획을 세워야 합니다.',
            watchoutEn: 'Statutory restrictions generally prevent switching from 491/494 to 189/190/186/820 for the first 3 years.',
            constChips: ['vac190', 'nom494'],
            sources: [SOURCES.intel],
            tools: [TOOLS.gsm, TOOLS.sid]
          }
        },
        {
          id: 'p-191',
          titleKo: '191',
          titleEn: '191',
          bodyKo: '적격 비자 최소 3년 보유·조건 준수\n3개 소득연도 ATO NOA·최저소득액 없음',
          bodyEn: 'Hold eligible visa 3+ yrs & comply with conditions\n3 ATO Notices of Assessment · No minimum income',
          detail: {
            summaryKo: [
              '491 또는 494 비자를 최소 3년 이상 보유하고 지정 지방 거주·취업 조건(8579 등)을 준수한 경우 Subclass 191 영주비자를 신청할 수 있습니다.',
              '비자 유효기간 중 3개 소득연도의 호주 국세청(ATO) 세금정산서(Notice of Assessment)를 제출해야 합니다.',
              '현재 191 비자에는 별도의 최저 소득 금액 요건이 적용되지 않습니다.'
            ],
            summaryEn: [
              'Holders of Subclass 491 or 494 who have held the visa for at least 3 years and complied with all regional conditions (including 8579) may apply for Subclass 191 permanent residency.',
              'Applicants must provide ATO Notices of Assessment for 3 income years during the visa period.',
              'There is currently no minimum taxable income threshold for Subclass 191.'
            ],
            watchoutKo: '최저소득액 기준이 없더라도 3개 소득연도 ATO NOA 제출 및 지방 거주·취업 조건(8579) 준수 입증은 필수입니다.',
            watchoutEn: 'Even without a minimum income threshold, 3 ATO NOAs and strict compliance with regional visa conditions (8579) remain mandatory.',
            constChips: [],
            sources: [SOURCES.regSch8, SOURCES.intel],
            tools: [TOOLS.gsm, TOOLS.conditions]
          }
        }
      ]
    },
    {
      id: 't4',
      nodes: [
        {
          id: 'p-dama-chk',
          titleKo: 'DAMA 경로 검토',
          titleEn: 'DAMA Pathway Check',
          bodyKo: '해당 지역·직종·고용주 적격 확인',
          bodyEn: 'Verify designated region, occupation & employer',
          detail: {
            summaryKo: [
              'DAMA(Designated Area Migration Agreement)는 호주 13개 지정 지역과 연방정부 간 협약으로, 일반 482/494/186보다 완화된 기준을 제공합니다.',
              '특히 만 45세 이상(지역·직종에 따라 만 50세 또는 55세까지 연령 상한 완화), 영어·급여(CSIT) 감면, 일반 목록에 없는 직종 스폰서가 가능한 경우가 있습니다.'
            ],
            summaryEn: [
              'Designated Area Migration Agreements (13 regional DAMAs) provide tailored concessions beyond standard 482/494/186 rules.',
              'Depending on the specific DAMA and occupation, concessions may include age limits up to 50 or 55, English or salary concessions, and expanded occupation lists.'
            ],
            watchoutKo: 'DAMA는 개인이 단독 신청할 수 없으며, 해당 지역 소재 고용주가 먼저 DAR(지역지정기관) 승인과 Labour Agreement를 받아야 합니다.',
            watchoutEn: 'Individuals cannot apply directly for DAMA; an employer operating in the designated region must first secure DAR endorsement and a Labour Agreement.',
            constChips: ['csit'],
            sources: [SOURCES.intel],
            tools: [TOOLS.dama, TOOLS.sid]
          }
        },
        {
          id: 'p-dama-dar',
          titleKo: 'DAR 승인 → Labour Agreement',
          titleEn: 'DAR Endorsement → Labour Agreement',
          bodyKo: '협약에 따른 482·494 등\n연령·영어·급여 완화는 개별 협약 확인',
          bodyEn: '482 / 494 under DAMA Labour Agreement\nVerify age, English & salary concessions per DAMA',
          detail: {
            summaryKo: [
              '1단계: 고용주가 해당 지역 DAR(Designated Area Representative)로부터 직종·인원·완화 조건에 대한 Endorsement(추천)를 받습니다.',
              '2단계: 이민성과 개별 Labour Agreement를 체결한 뒤 482 또는 494(Labour Agreement 스트림) 노미네이션·비자를 진행합니다.'
            ],
            summaryEn: [
              'Step 1: The regional employer obtains Endorsement from the local Designated Area Representative (DAR) for specific occupations and concessions.',
              'Step 2: The employer executes a Labour Agreement with Home Affairs, then lodges 482 or 494 (Labour Agreement stream) nominations and visas.'
            ],
            watchoutKo: '13개 DAMA마다 허용 직종, 연령 상한(50세/55세), 급여 감면율(예: 최대 10%) 및 영주권 전환 조건이 모두 다릅니다.',
            watchoutEn: 'Occupation lists, age caps (50/55), salary concessions, and PR transition rules differ across each of the 13 DAMAs.',
            constChips: [],
            sources: [SOURCES.intel],
            tools: [TOOLS.dama, TOOLS.faqOrg]
          }
        },
        {
          id: 'p-dama-pr',
          titleKo: '186 또는 191',
          titleEn: '186 or 191',
          bodyKo: '협약상 186 경로 또는\n494 보유자의 191 요건 검토',
          bodyEn: '186 (Labour Agreement) per DAMA terms\nor 191 pathway for 494 holders',
          detail: {
            summaryKo: [
              'DAMA 협약에 186(Labour Agreement 스트림) 영주권 전환 조항이 포함된 경우, 약정 근무 기간과 연령·영어 요건을 충족해 186 영주비자로 전환합니다.',
              'DAMA 494 비자로 진입한 경우 최소 3년 보유·조건 준수 및 3개 소득연도 ATO NOA 요건을 충족해 191 영주비자로 전환할 수 있습니다.'
            ],
            summaryEn: [
              'Where the DAMA includes a 186 Labour Agreement PR pathway, eligible holders transition to Subclass 186 after completing the agreed period.',
              'DAMA Subclass 494 holders may transition to Subclass 191 permanent residency after 3 years of compliance and 3 ATO NOAs.'
            ],
            watchoutKo: 'DAMA 186 전환 시점에도 협약상 지정된 연령 상한과 고용 유지 요건을 유지해야 합니다.',
            watchoutEn: 'Ensure you still satisfy the DAMA-specified age cap and ongoing employment criteria at the time of 186 lodgement.',
            constChips: ['vac186'],
            sources: [SOURCES.intel],
            tools: [TOOLS.dama, TOOLS.sid]
          }
        }
      ]
    }
  ];

  /* ── MAP 3: Visa Application, ART Review & Court Process (10 Nodes) ── */
  var PROCESS_NODES = [
    {
      id: 'pr-before',
      row: 1, col: 1, accent: 'crimson',
      titleKo: '신청 전 확인',
      titleEn: 'Before applying',
      linesKo: ['신청 장소 · s 48 · 8503', '현재 비자 · 신청 유효성'],
      linesEn: ['Location · s 48 · condition 8503', 'Current visa and validity'],
      detail: {
        summaryKo: [
          '호주 내 유효 신청 가능 여부(s 46)를 가장 먼저 확인합니다. 과거 거절·취소로 s 48 제한이 있거나 Condition 8503(추가 신청 금지)이 부착되어 있으면 호주 내 신청이 막힙니다.',
          '2026년 개정으로 417·462·482·485·방문비자 등의 호주 내 학생비자(500) 신청 금지(F2026L01348)와 407 해외 신청 원칙(F2026L01449)도 사전 확인 대상입니다.'
        ],
        summaryEn: [
          'Verify onshore validity (s 46) before lodging: section 48 bars or Condition 8503 (No Further Stay) can prevent a valid onshore application.',
          'Also check 2026 onshore preclusions, including F2026L01348 (17 visas barred from onshore Student 500) and F2026L01449 (Subclass 407 offshore rule).'
        ],
        watchoutKo: '무효 신청(Invalid Application)은 심사 자체가 개시되지 않으며 브리징 비자도 발급되지 않습니다.',
        watchoutEn: 'An invalid application is not assessed and does not generate a bridging visa, risking unlawful status.',
        constChips: [],
        sources: [SOURCES.s48, SOURCES.f01348, SOURCES.f01449, SOURCES.f01503],
        tools: [TOOLS.conditions, TOOLS.crisis]
      }
    },
    {
      id: 'pr-valid',
      row: 1, col: 2, accent: 'crimson',
      titleKo: '유효한 비자 신청',
      titleEn: 'Valid application',
      linesKo: ['필요한 증거를 제출하고', '추가자료 요청에 대응'],
      linesEn: ['Provide the required evidence', 'Respond to information requests'],
      detail: {
        summaryKo: [
          'Schedule 1 유효 신청 요건(정확한 양식·수수료·신청 장소 등)을 갖춰 접수하면 심사 단계로 진입합니다.',
          '심사 중 이민성의 추가자료 요청(s 56 RFI) 또는 불리한 정보 소명 통지(s 57 Natural Justice · PIC 4020)가 오면 지정된 법정 기한 내에 대응해야 합니다.'
        ],
        summaryEn: [
          'Once Schedule 1 validity criteria (form, VAC, location) are met, the Department assesses Schedule 2 criteria.',
          'If Home Affairs issues a s 56 Request for Information or s 57 Natural Justice / PIC 4020 invitation to comment, respond strictly within the statutory deadline.'
        ],
        watchoutKo: '허위·오도 문서 제출 시 PIC 4020이 적용되어 비자 거절 및 최대 3년(신원 위조 시 10년) 재신청 금지 제재가 부과될 수 있습니다.',
        watchoutEn: 'Bogus documents or false/misleading information trigger PIC 4020, carrying a 3-year (or 10-year for identity) exclusion period.',
        constChips: [],
        sources: [SOURCES.intel],
        tools: [TOOLS.vgpt, TOOLS.emergency]
      }
    },
    {
      id: 'pr-dept',
      row: 1, col: 3, accent: 'crimson',
      titleKo: '이민성 결정',
      titleEn: 'Department decision',
      linesKo: ['비자 승인 또는 거절', '취소는 별도 결정 절차'],
      linesEn: ['Grant or refusal', 'Cancellation has its own process'],
      detail: {
        summaryKo: [
          '이민성 심사관(Delegate)이 비자 승인(Grant) 또는 거절(Refusal)을 서면으로 통지합니다.',
          '기존 비자의 취소(Cancellation, 예: s 116 / s 109 / s 501)는 별도 절차로 진행되며, 호주 내 일반 취소 예고(NOICC) 소명 기한은 통상 5영업일(만료 전 +5영업일 재량연장 신청 가능)입니다.'
        ],
        summaryEn: [
          'A Departmental delegate notifies the decision in writing (grant or refusal).',
          'Visa cancellation (e.g., s 116, s 109, s 501) follows a separate statutory process; onshore NOICC response time is generally 5 working days (discretionary +5 working days extension if requested before expiry).'
        ],
        watchoutKo: '결정문·NOICC 통지서 수령일(또는 법정 송달 간주일)부터 기한이 즉시 계산되므로 이메일·ImmiAccount를 매일 확인해야 합니다.',
        watchoutEn: 'Statutory clocks start from deemed notification. Check ImmiAccount and email daily and verify exact deadlines immediately.',
        constChips: ['noicc'],
        sources: [SOURCES.s116, SOURCES.intel],
        tools: [TOOLS.crisis, TOOLS.emergency]
      }
    },
    {
      id: 'pr-grant',
      row: 1, col: 4, accent: 'teal',
      titleKo: '승인 및 조건 준수',
      titleEn: 'Grant & compliance',
      linesKo: ['VEVO · 취업 · 여행 조건', '변경사항과 만료일 관리'],
      linesEn: ['Check VEVO, work, travel', 'and the visa expiry date'],
      detail: {
        summaryKo: [
          '승인 즉시 VEVO에서 비자 만료일, 취업·학업·거주 조건(8xxx), 출입국(Travel Facility) 조건을 확인해야 합니다.',
          '여권 갱신, 주소·관계·고용주 변경 등 신고 의무(예: Condition 8533 / 8607)를 누락하면 향후 비자 취소 사유가 될 수 있습니다.'
        ],
        summaryEn: [
          'Upon grant, immediately verify expiry dates, travel facility, and all 8xxx conditions via VEVO.',
          'Report required changes (new passport, address, employment or relationship changes) to maintain compliance and avoid cancellation risks.'
        ],
        watchoutKo: '비자 조건 위반은 s 116 취소 사유이자 향후 영주권·시민권 심사 시 불이익 요인이 됩니다.',
        watchoutEn: 'Breaching visa conditions can trigger s 116 cancellation and affect future permanent residency or citizenship applications.',
        constChips: [],
        sources: [SOURCES.regSch8],
        tools: [TOOLS.conditions]
      }
    },
    {
      id: 'pr-rights',
      row: 2, col: 3, accent: 'teal',
      titleKo: 'ART 재심 적격 확인',
      titleEn: 'Review rights check',
      linesKo: ['재심 가능한 결정인지 확인', '신청권자·장소·통지·기한', '해당 기한 안에 신청'],
      linesEn: ['Reviewable decision · applicant', 'Location · notification · deadline', 'Apply within the statutory limit'],
      detail: {
        summaryKo: [
          '모든 거절·취소가 ART(행정재심기구) 재심 대상은 아니며, 결정 유형·신청인 위치·스폰서 청구권자 자격(s 347 / reg 4.02)을 확인해야 합니다.',
          '일반 Part 5 이민 거절·취소의 ART 재심 기한은 28역일(통지일 구금 시 14역일)이며 법정 불변 기한으로 연장이 불가합니다(s 347(3), (5)).',
          '호주 내 신원(s 501) 신속 재심은 9역일(s 500(6B))로 훨씬 짧습니다.'
        ],
        summaryEn: [
          'Confirm the decision is ART-reviewable and who has statutory standing (applicant vs Australian sponsor under s 347 / reg 4.02).',
          'General Part 5 migration ART filing limit is 28 calendar days (14 calendar days if in immigration detention on the day notified) — strictly non-extendable (s 347(3), (5)).',
          'Onshore character expedited reviews under s 500(6B) carry a strict 9-calendar-day limit.'
        ],
        watchoutKo: 'Part 5 ART 재심 기한(28일/14일)은 단 하루만 넘겨도 ART에 관할권이 없어 재심 자체가 각하됩니다.',
        watchoutEn: 'Part 5 ART deadlines (28d / 14d) cannot be extended; lodging even one day late removes the Tribunal\'s jurisdiction.',
        constChips: ['art28', 'art14', 'art9', 'artFee'],
        sources: [SOURCES.s347, SOURCES.s500, SOURCES.f01448],
        tools: [TOOLS.crisis, TOOLS.artReview]
      }
    },
    {
      id: 'pr-merits',
      row: 2, col: 2, accent: 'teal',
      titleKo: 'ART 본안 재심',
      titleEn: 'ART merits review',
      linesKo: ['서면 증거·진술 및 해당 심리', '학생비자 거절의 다수 사건은', '서면으로 심리'],
      linesEn: ['Written evidence and submissions', 'Hearing where applicable', 'Most student refusals on papers'],
      detail: {
        summaryKo: [
          'ART(Administrative Review Tribunal)는 이민성 결정의 사실관계와 법령 적용을 처음부터 다시 검토하는 본안 재심(Merits Review) 기관입니다.',
          '새로운 보강 증거와 법률 의견서(Submissions)를 제출할 수 있으며, 2026년 개정(F2026L00640)에 따라 학생비자 거절 사건의 다수는 구두 심리 없이 서면(on the papers)으로 심리됩니다.'
        ],
        summaryEn: [
          'The Administrative Review Tribunal (ART) conducts de novo merits review, reassessing facts, evidence, and statutory criteria afresh.',
          'Applicants may submit updated evidence and legal submissions. Under F2026L00640, most Student visa refusal reviews are decided on the papers without an oral hearing.'
        ],
        watchoutKo: '서면심리 사건은 별도 출석 기회 없이 제출된 서류만으로 최종 판단되므로 초기 서면 준비가 승패를 가릅니다.',
        watchoutEn: 'In on-the-papers reviews, there may be no oral hearing—complete, persuasive written evidence and legal submissions are decisive.',
        constChips: ['artFee'],
        sources: [SOURCES.f00640, SOURCES.s347],
        tools: [TOOLS.crisis, TOOLS.artReview]
      }
    },
    {
      id: 'pr-outcome',
      row: 2, col: 1, accent: 'teal', tint: true,
      titleKo: '재심 결과',
      titleEn: 'ART outcome',
      linesKo: ['원결정 유지·변경·대체', '또는 이민성으로 환송', '남은 요건 재심사'],
      linesEn: ['Affirm · vary · substitute', 'or remit for reconsideration', 'Outstanding criteria still apply'],
      detail: {
        summaryKo: [
          'ART는 이민성 원결정을 ① 유지(Affirm · 패소), ② 변경(Vary), ③ 대체(Substitute), 또는 ④ 지시와 함께 이민성으로 환송(Remit · 승소)할 수 있습니다.',
          '환송(Remit) 결정을 받더라도 비자가 즉시 발급되는 것은 아니며, 이민성이 건강·신원 등 남은 법정 요건을 추가 심사한 뒤 최종 승인합니다.'
        ],
        summaryEn: [
          'The ART may affirm (uphold refusal/cancellation), vary, substitute, or remit the decision to Home Affairs with directions.',
          'A remittal does not instantly grant the visa; Home Affairs must still assess any remaining criteria (such as health and character).'
        ],
        watchoutKo: '원결정이 유지(Affirm)된 경우 브리징 비자 만료일과 법원 제소기한(35일)을 즉시 확인해야 합니다.',
        watchoutEn: 'If affirmed, immediately check your bridging visa expiry (typically 35 days) and the 35-day court filing limit.',
        constChips: [],
        sources: [SOURCES.s347, SOURCES.s477],
        tools: [TOOLS.crisis, TOOLS.artReview]
      }
    },
    {
      id: 'pr-jr',
      row: 3, col: 2, accent: 'teal',
      titleKo: '법원 사법심사',
      titleEn: 'Judicial review',
      linesKo: ['관할상 법률오류 검토', '관할 법원·제소기한 확인', '통상 35일 · 연장 신청 가능'],
      linesEn: ['Jurisdictional error · proper court', 'Usual FCFCOA filing limit', '35 days from decision · Extension may be sought'],
      detail: {
        summaryKo: [
          '법원 사법심사(FCFCOA 등)는 사실관계를 다시 따지는 절차가 아니라, ART 결정에 관할상 법률오류(Jurisdictional Error)가 있었는지만 심사합니다.',
          '통상 이민 결정일로부터 35역일 이내에 제소해야 하며(Migration Act s 477), 기한 경과 시 법원에 사법상 이익을 근거로 기간 연장을 신청할 수 있습니다.'
        ],
        summaryEn: [
          'Judicial review (typically in the FCFCOA) examines only whether the Tribunal committed jurisdictional error — not the factual merits of the visa.',
          'Applications must generally be filed within 35 calendar days of the date of the migration decision (s 477); extensions may be sought in the interests of the administration of justice.'
        ],
        watchoutKo: '패소 시 상대방(장관) 소송비용 배상 명령(Costs Order)이 부과될 수 있으므로, 제소 전 법률오류 유무에 대한 전문변호사 검토가 필수입니다.',
        watchoutEn: 'Unsuccessful judicial review applications typically attract adverse legal costs orders. Obtain specialist advice on arguable jurisdictional error before filing.',
        constChips: ['fcfcoa35'],
        sources: [SOURCES.s477],
        tools: [TOOLS.crisis, TOOLS.artReview]
      }
    },
    {
      id: 'pr-court',
      row: 3, col: 3, accent: 'crimson',
      titleKo: '법원 판단',
      titleEn: 'Court outcome',
      linesKo: ['오류 인정 시 결정 취소·환송', '구제 거절 시 기각 가능', '상소 가능성 별도 검토'],
      linesEn: ['Set aside / remit, or dismiss', 'Further appeal depends', 'on jurisdiction and grounds'],
      detail: {
        summaryKo: [
          '법원이 관할상 법률오류를 인정하면 ART 결정을 취소(Quash/Set aside)하고 법에 따라 다시 심리하도록 ART로 환송합니다.',
          '법원은 비자를 직접 발급하지 않으며, 법률오류가 인정되지 않으면 청구를 기각(Dismiss)합니다. 상급 법원(Federal Court 등) 항소 여부는 관할과 상소 사유에 따라 별도 검토합니다.'
        ],
        summaryEn: [
          'If jurisdictional error is established, the Court sets aside the decision and remits it to the Tribunal for lawful reconsideration.',
          'A court does not grant a visa. If dismissed, any further appeal (e.g., to the Federal Court) depends on statutory jurisdiction and appealable error.'
        ],
        watchoutKo: '항소 기한 역시 엄격하며, 소송 진행 자체가 자동으로 비자나 취업권을 연장해 주지 않습니다.',
        watchoutEn: 'Appeal deadlines are strict, and court proceedings do not automatically secure a visa or work rights.',
        constChips: [],
        sources: [SOURCES.s477],
        tools: [TOOLS.crisis]
      }
    },
    {
      id: 'pr-mi',
      row: 3, col: 4, accent: 'crimson',
      titleKo: '장관 재량 개입',
      titleEn: 'Ministerial intervention',
      linesKo: ['법정 요건·현행 지침 확인', 'ss 351 / 501J', '검토·행사 의무 없음'],
      linesEn: ['Statutory gateway and instructions', 'Sections 351 / 501J', 'No duty to consider or intervene'],
      detail: {
        summaryKo: [
          'ART의 유효한 재심 결정 이후 공익상 예외적 사정이 있는 경우 장관에게 재량 개입(Migration Act s 351 또는 보호비자 s 501J)을 요청할 수 있습니다.',
          '장관의 개인적·비강제적 권한으로, 요청을 검토하거나 권한을 행사할 법적 의무가 없습니다.'
        ],
        summaryEn: [
          'Following a valid ART review decision, an applicant may request Ministerial Intervention in the public interest under s 351 (or s 501J for protection).',
          'These powers are personal and non-compellable; the Minister has no legal duty to consider or exercise them.'
        ],
        watchoutKo: '현행 장관 지침(Ministerial Instructions)의 문턱이 매우 높으며, 요청 제출만으로 체류 자격이나 취업권이 보장되지 않습니다.',
        watchoutEn: 'Current Ministerial Instructions set a high threshold, and lodging a request does not by itself grant lawful status or work rights.',
        constChips: [],
        sources: [SOURCES.s351],
        tools: [TOOLS.crisis]
      }
    }
  ];

  /* ── MAP 4: Major Visa Directory (10 Verified Categories) ── */
  var VISA_ROWS = [
    {
      id: 'v-sponsor',
      cat: 'sponsor_skilled',
      groupKo: '고용주 스폰서',
      groupEn: 'Employer Sponsored',
      structureKo: '482 SID 임시비자\n186 TRT / DE / Labour Agreement 영주비자',
      structureEn: '482 SID Temporary\n186 TRT / DE / Labour Agreement PR',
      checkKo: '직종·지명·영어·경력·급여. 482 Core Skills는 통상 관련 경력 1년 상당. 186 연령·경력·면제는 별도 심사.',
      checkEn: 'Occupation, nomination, English, experience & salary. 482 Core Skills: ~1 yr relevant work. 186 age/exemptions assessed separately.',
      detail: {
        summaryKo: [
          '482 SID는 Core Skills(CSOL + CSIT 이상), Specialist Skills(SSIT 이상), Labour Agreement 스트림으로 운영됩니다.',
          '186 영주비자는 TRT(482 2년 근무), Direct Entry(기술심사 + 통상 3년 경력), Labour Agreement(DAMA 포함) 3개 스트림이 있습니다.'
        ],
        summaryEn: [
          '482 SID operates across Core Skills (CSOL + CSIT), Specialist Skills (SSIT), and Labour Agreement streams.',
          '186 PR offers TRT (2 yrs on 482), Direct Entry (skills assessment + ~3 yrs work), and Labour Agreement streams.'
        ],
        watchoutKo: '고용주의 SAF 부담금 및 ABF 제재 이력 확인이 필수입니다.',
        watchoutEn: 'Confirm employer SAF levy obligations and check the ABF sponsor sanctions register.',
        constChips: ['csit', 'ssit', 'vac482', 'vac186'],
        sources: [SOURCES.intel],
        tools: [TOOLS.sid, TOOLS.sponsorReview]
      }
    },
    {
      id: 'v-regional',
      cat: 'sponsor_skilled',
      groupKo: '지역 이민',
      groupEn: 'Regional Skilled',
      structureKo: '491 / 494 임시비자 → 191 영주비자',
      structureEn: '491 / 494 Provisional → 191 PR',
      checkKo: '적격 비자 최소 3년 보유, 조건 준수, 3개 소득연도 ATO NOA. 현재 최저소득 금액 요건 없음.',
      checkEn: 'Hold eligible visa 3+ yrs, comply with regional conditions, 3 ATO NOAs. No minimum income threshold.',
      detail: {
        summaryKo: [
          '491(주정부/가족 후원)과 494(지방 고용주 지명)는 5년 지방 임시비자이며, 최소 3년 보유·조건 준수 후 191 영주비자로 전환합니다.',
          '191 영주비자는 3개 소득연도의 ATO Notice of Assessment가 필요하며 현재 최저소득액 요건은 없습니다.'
        ],
        summaryEn: [
          '491 (state/family) and 494 (regional employer) are 5-year provisional visas leading to 191 permanent residency after 3+ years.',
          '191 requires 3 income-year ATO Notices of Assessment with no current minimum taxable income figure.'
        ],
        watchoutKo: 'Condition 8579(지정 지방 거주·근무·학업) 준수 기록을 3년간 꼼꼼히 보관해야 합니다.',
        watchoutEn: 'Maintain clear documentary evidence of Condition 8579 regional compliance throughout the 3-year period.',
        constChips: ['vac190', 'nom494'],
        sources: [SOURCES.regSch8, SOURCES.intel],
        tools: [TOOLS.gsm, TOOLS.sid]
      }
    },
    {
      id: 'v-gsm',
      cat: 'sponsor_skilled',
      groupKo: '점수제 기술이민',
      groupEn: 'Points-Tested GSM',
      structureKo: '189 / 190 영주비자',
      structureEn: '189 / 190 Permanent Visas',
      checkKo: 'EOI·기술심사·영어·초청. 190은 주정부 지명 추가. 통상 초청 시 만 45세 미만, 최소점수 충족 후에도 초청 여부 별도.',
      checkEn: 'EOI, skills assessment, English & invitation (190 adds state nomination). Generally under 45; meeting 65 pts does not guarantee invite.',
      detail: {
        summaryKo: [
          '189(독립기술이민)와 190(주정부 지명)은 승인 즉시 영주권을 부여하는 대표 기술이민 비자입니다.',
          'SkillSelect EOI 점수 경쟁 방식이며, 190은 각 주·준주의 직종·거주·근무 요건과 연간 배정 쿼터에 좌우됩니다.'
        ],
        summaryEn: [
          'Subclasses 189 and 190 grant direct permanent residency via competitive SkillSelect invitation rounds.',
          'Subclass 190 additionally depends on individual state/territory nomination rules and annual quota allocations.'
        ],
        watchoutKo: '기술심사 유효기간과 영어 성적 유효기간이 초청 시점에 만료되지 않도록 관리해야 합니다.',
        watchoutEn: 'Ensure your skills assessment and English test remain valid at the exact date of invitation.',
        constChips: ['vac189', 'vac190'],
        sources: [SOURCES.intel],
        tools: [TOOLS.gsm, TOOLS.guide]
      }
    },
    {
      id: 'v-study',
      cat: 'study_innov',
      groupKo: '유학 · 연수',
      groupEn: 'Study & Training',
      structureKo: '500 학생 / 485 졸업생 / 407 연수',
      structureEn: '500 Student / 485 Graduate / 407 Training',
      checkKo: '학생비자 호주 내 신청 제한(17종)과 가족 개정 적용. 485 스트림별 학업 요건, 407 해외 신청·승인 원칙과 지정 예외 확인.',
      checkEn: 'Onshore Student 500 preclusions (17 visas) & 2026 family rules; 485 stream rules; 407 offshore lodgement/grant rule (from 12 Nov 2026).',
      detail: {
        summaryKo: [
          '학생비자(500): F2026L01348에 따라 방문·워홀(417·462)·482·485 등 17개 비자 소지자의 호주 내 신청이 금지됩니다.',
          '졸업생비자(485): 2026년 개정(F2026L01500) 및 스트림별 학업·연령·영어 요건을 확인해야 합니다.',
          '연수비자(407): 2026년 11월 12일 시행(F2026L01449)으로 원칙적 해외 신청·승인이 요구됩니다(장관 지정 예외 별도).'
        ],
        summaryEn: [
          'Student (500): F2026L01348 precludes onshore lodgement by holders of 17 specified visas (including Visitor, 417/462, 482, 485).',
          'Graduate (485): subject to 2026 reforms (F2026L01500) and stream-specific study, age, and English criteria.',
          'Training (407): from 12 Nov 2026 (F2026L01449), applicants must generally apply and be granted offshore (unless in a Minister-specified exempt class).'
        ],
        watchoutKo: '비자 호핑(임시비자 연쇄 연장) 규제가 2026년 대폭 강화되었으므로 만료 6개월 전부터 다음 경로를 설계해야 합니다.',
        watchoutEn: 'With tightened 2026 anti-visa-hopping rules, plan your next onshore/offshore transition at least 6 months before expiry.',
        constChips: ['vac500', 'vac485'],
        sources: [SOURCES.f01348, SOURCES.f01449, SOURCES.f01500],
        tools: [TOOLS.tracker, TOOLS.conditions]
      }
    },
    {
      id: 'v-innov',
      cat: 'study_innov',
      groupKo: '혁신 · 사업',
      groupEn: 'Innovation & Business',
      structureKo: '858 NIV 영주비자\n기존 188 → 888',
      structureEn: '858 NIV Permanent\nExisting 188 → 888',
      checkKo: '858은 국제적으로 탁월한 성취를 갖춘 초청 대상자 경로. 188 신규 종료(2024.7.31), 기존 보유자의 888 전환 요건 별도.',
      checkEn: '858 NIV is invitation-only for exceptional international achievement. 188 closed to new applicants (31 Jul 2024); existing holders check 888.',
      detail: {
        summaryKo: [
          'Subclass 858 National Innovation Visa는 초청 기반으로만 신청 가능한 영주비자입니다.',
          '188 비자는 2024년 7월 31일 신규 접수가 종료되었으며, 기존 188 보유자만 888 전환 자격을 별도 검토합니다.'
        ],
        summaryEn: [
          'Subclass 858 National Innovation Visa is strictly invitation-based permanent residency.',
          'Subclass 188 closed on 31 July 2024; only existing 188 holders may assess Subclass 888 transition.'
        ],
        watchoutKo: '종료된 188 경로를 전제로 한 구형 블로그 정보에 주의하십시오.',
        watchoutEn: 'Be wary of outdated guides still advertising new Subclass 188 business/investor applications.',
        constChips: ['vac858'],
        sources: [SOURCES.intel],
        tools: [TOOLS.guide, TOOLS.faqImmi]
      }
    },
    {
      id: 'v-partner',
      cat: 'family_parent',
      groupKo: '파트너 · 약혼',
      groupEn: 'Partner & Fiancé',
      structureKo: '820 → 801 호주 내 경로\n309 → 100 해외 경로\n300 약혼 임시비자',
      structureEn: '820 → 801 Onshore\n309 → 100 Offshore\n300 Prospective Marriage',
      checkKo: '관계·스폰서·신청 장소 확인. 300 승인 후 결혼과 후속 파트너비자 요건을 충족해야 합니다.',
      checkEn: 'Verify relationship pillars, sponsor eligibility & location. Subclass 300 requires marriage after grant and subsequent Partner application.',
      detail: {
        summaryKo: [
          '호주 내 신청은 820(임시)→801(영주), 해외 신청은 309(임시)→100(영주) 2단계 구조로 심사됩니다.',
          '300 약혼비자(해외 신청)는 입국 후 유효기간 내 결혼하고 820/801 파트너 비자를 별도 신청해야 합니다.'
        ],
        summaryEn: [
          'Two-stage structure: 820 → 801 onshore, or 309 → 100 offshore.',
          'Subclass 300 (offshore) allows entry to marry and subsequently lodge an onshore 820/801 Partner visa.'
        ],
        watchoutKo: '2026년 11월 28일 이후 접수되는 방문비자(600·601·651)의 Condition 8503 확대(F2026L01503)는 호주 내 820 신청 가능 여부에 직접 영향을 줍니다.',
        watchoutEn: 'Mandatory Condition 8503 expansion for Visitor visas lodged on/after 28 Nov 2026 (F2026L01503) directly affects onshore 820 eligibility.',
        constChips: ['vacPartner'],
        sources: [SOURCES.f01503, SOURCES.s48],
        tools: [TOOLS.partner, TOOLS.partnerFaq]
      }
    },
    {
      id: 'v-parent',
      cat: 'family_parent',
      groupKo: '부모이민',
      groupEn: 'Parent Migration',
      structureKo: '103 / 804 / 143 / 864 영주비자\n173 → 143 / 884 → 864 단계형',
      structureEn: '103 / 804 / 143 / 864 Permanent\n173 → 143 / 884 → 864 Two-stage',
      checkKo: '스폰서·가족균형검사·연령·재정보증(AoS)·건강 등 해당 기준 확인. 정원과 대기열에 따른 장기 대기 가능.',
      checkEn: 'Verify sponsor, Balance of Family test, age (for Aged Parent), AoS & health. Multi-year statutory queues apply.',
      detail: {
        summaryKo: [
          '기여형(143·864·단계형 173/884)과 일반형(103·804)으로 나뉘며, 804·864·884는 호주 연금 연령(Aged) 및 호주 내 신청 요건이 적용됩니다.',
          '모든 영주 부모비자는 가족균형검사(자녀의 절반 이상 또는 최다수가 호주 영주·시민권자)와 재정보증(AoS)이 핵심입니다.'
        ],
        summaryEn: [
          'Divided into Contributory (143/864, two-stage 173/884) and Non-Contributory (103/804); onshore Aged classes require meeting pension age.',
          'Balance of Family test and Assurance of Support (AoS) are core statutory requirements.'
        ],
        watchoutKo: '기여형 2차 비자신청비(VAC)와 연간 캡·대기열 이동 속도를 반드시 사전에 계산해야 합니다.',
        watchoutEn: 'Factor in substantial 2nd VAC instalments and multi-year cap-and-queue wait times before lodging.',
        constChips: ['vacParent143', 'vacParent103'],
        sources: [SOURCES.intel],
        tools: [TOOLS.parent, TOOLS.vgpt]
      }
    },
    {
      id: 'v-parent870',
      cat: 'family_parent',
      groupKo: '부모 임시방문',
      groupEn: 'Temporary Parent',
      structureKo: '870 임시비자',
      structureEn: '870 Sponsored Parent (Temporary)',
      checkKo: '적격 스폰서 필요(소득 요건 포함). 통상 3년 또는 5년 체류. 영주 부모비자 적격은 별도 검토.',
      checkEn: 'Requires approved Family Sponsor (with taxable income test). 3 or 5 yr stay; does not lead to PR.',
      detail: {
        summaryKo: [
          '가족균형검사가 면제되며, 적격 자녀 스폰서 승인(과세소득 기준 충족) 후 3년 또는 5년(누적 최대 10년) 체류할 수 있는 임시비자입니다.',
          '870 비자 보유 중에는 영주 부모비자를 신청할 수 없는 제한이 있습니다.'
        ],
        summaryEn: [
          'No Balance of Family test; allows 3- or 5-year stays (up to 10 years cumulative) backed by an approved Family Sponsor meeting the taxable income test.',
          'Holders cannot apply for a permanent Parent visa while holding Subclass 870.'
        ],
        watchoutKo: '870 비자는 메디케어 및 취업권이 없으며, 개인 의료보험 유지가 의무입니다.',
        watchoutEn: 'Subclass 870 does not grant work rights or Medicare; adequate private health insurance is mandatory.',
        constChips: ['income870', 'vac870'],
        sources: [SOURCES.intel],
        tools: [TOOLS.parent]
      }
    },
    {
      id: 'v-other-fam',
      cat: 'family_parent',
      groupKo: '기타 가족',
      groupEn: 'Other Family',
      structureKo: '115 / 835 Remaining Relative\n116 / 836 Carer',
      structureEn: '115 / 835 Remaining Relative\n116 / 836 Carer',
      checkKo: '엄격한 가족관계 또는 장기 돌봄 필요 등 해당 기준 적용. Carer의 가족 돌봄 요건과 일반 취업비자 요건을 각각 확인.',
      checkEn: 'Strict family-ties or certified long-term care need criteria apply, alongside lengthy statutory queues.',
      detail: {
        summaryKo: [
          'Remaining Relative(115 해외 / 835 호주 내)는 호주 외 지역에 근친 가족이 없는 등 매우 엄격한 요건과 장기 대기열이 적용됩니다.',
          'Carer(116 해외 / 836 호주 내)는 호주 거주 친족의 장기 의학적 돌봄 필요(Bupa Medical Visa Services 평가 등)와 호주 내 대안 부재를 입증해야 합니다.'
        ],
        summaryEn: [
          'Remaining Relative (115/835) requires having no near relatives outside Australia and faces very long queues.',
          'Carer (116/836) requires certified medical need for substantial, continuing assistance not reasonably obtainable in Australia.'
        ],
        watchoutKo: '기타 가족 비자 역시 연간 정원 제한으로 대기기간이 매우 길므로 체류·브리징 전략을 사전에 검토해야 합니다.',
        watchoutEn: 'Capped annual places create multi-year waits; assess onshore bridging and alternative pathways carefully.',
        constChips: [],
        sources: [SOURCES.intel],
        tools: [TOOLS.vgpt, TOOLS.faqImmi]
      }
    },
    {
      id: 'v-legacy',
      cat: 'transitional',
      groupKo: '종료 · 경과규정',
      groupEn: 'Closed & Transitional',
      structureKo: '457 / 187 / 489 / 132\n기존 보유자 887 / 888 등',
      structureEn: '457 / 187 / 489 / 132\nExisting holders: 887 / 888 etc.',
      checkKo: '종료된 비자와 기존 보유자 경과규정을 구분합니다. 기존 비자 지위·신청일·개별 스트림을 확인합니다.',
      checkEn: 'Distinguish closed visas from transitional pathways for existing holders based on grant/lodgement dates and stream.',
      detail: {
        summaryKo: [
          '457(구 취업비자), 187(RSMS), 489(구 지방임시), 132(사업영주), 188(사업임시)은 신규 접수가 종료된 과거 비자 체계입니다.',
          '다만 기존 489 보유자의 887 영주비자 전환, 기존 188 보유자의 888 전환 등 경과규정(Transitional Arrangements)은 보유 이력에 따라 별도 검토합니다.'
        ],
        summaryEn: [
          'Subclasses 457, 187 (RSMS), 489, 132, and 188 are closed to new primary applications.',
          'Existing holders may still access specific transitional pathways (such as 489 → 887 or 188 → 888) depending on dates and stream.'
        ],
        watchoutKo: '인터넷의 오래된 457·187·489·188 안내글을 현행 제도로 오인하지 않도록 주의하십시오.',
        watchoutEn: 'Do not rely on outdated web articles referencing closed subclasses (457, 187, 489, 132, 188) as active pathways.',
        constChips: [],
        sources: [SOURCES.intel],
        tools: [TOOLS.tracker, TOOLS.faqImmi]
      }
    }
  ];

  var POSTERS = {
    overview: {
      ko: './posters/01-overview-ko.png',
      en: './posters/01-overview-en.png',
      titleKo: '호주 이민 경로 한눈에 보기 (요약 포스터 · KO)',
      titleEn: 'Australia Immigration Pathways Overview (Summary Poster · EN)'
    },
    pathways: {
      ko: './posters/02-pathways-ko.png',
      en: './posters/02-pathways-en.png',
      titleKo: '지금의 비자에서 다음 단계로 (요약 포스터 · KO)',
      titleEn: 'From Your Current Visa to PR (Summary Poster · EN)'
    },
    process: {
      ko: './posters/03-process-ko.png',
      en: './posters/03-process-en.png',
      titleKo: '호주 비자 신청·재심·법원 절차 (요약 포스터 · KO)',
      titleEn: 'Australia Visa Process & Review Map (Summary Poster · EN)'
    },
    directory: {
      ko: './posters/04-visas-ko.png',
      en: './posters/04-visas-en.png',
      titleKo: '주요 비자 종류와 자격 점검 (요약 포스터 · KO)',
      titleEn: 'Major Australian Visa Types & Checks (Summary Poster · EN)'
    }
  };

  return {
    SOURCES: SOURCES,
    TOOLS: TOOLS,
    OVERVIEW_CARDS: OVERVIEW_CARDS,
    START_FILTERS: START_FILTERS,
    PATHWAY_TRACKS: PATHWAY_TRACKS,
    PROCESS_NODES: PROCESS_NODES,
    VISA_ROWS: VISA_ROWS,
    POSTERS: POSTERS
  };
})();
