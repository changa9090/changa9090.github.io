/* Park & Co Lawyers · Interactive Visa Pathways Controller (KO/EN) */
(function () {
  'use strict';

  var DATA = window.PARKCO_PATHWAYS_DATA;
  if (!DATA) return;

  var state = {
    lang: 'ko',
    tab: 'overview',
    selectedId: 'ov-employer',
    startFilter: 'all',
    visaCat: 'all',
    constants: null
  };

  var UI = {
    ko: {
      brandTitle: '법무법인 박앤코 법률·비자 진단 허브',
      navHub: '허브 홈',
      navOverview: '전체 지도',
      navPathways: '내 비자→영주권',
      navProcess: '재심·법원 절차',
      navVisas: '비자 종류 비교',
      btnInquiry: '공식 문의 허브',
      urgentText: '기한 구분 안내: 호주 내 비자 취소 예고(NOICC) 소명 5영업일(만료 전 +5영업일 재량연장 신청 가능) · 일반 거절·취소 확정 후 ART 재심 28역일(통지일 구금 시 14역일 · 연장 불가) · 법원 사법심사 통상 35역일',
      urgentLink: '기한 계산기 바로가기 →',
      bcHome: '박앤코 진단 허브',
      bcCurrent: '비자 패스웨이 비주얼 맵',
      heroEyebrow: 'INTERACTIVE VISUAL PATHWAYS · PRIMARY-SOURCE VERIFIED',
      heroTitle: '한눈에 보는 호주 비자 · 영주권 · 재심 패스웨이 지도',
      heroSub: '호주 이민을 처음 접하는 분도 전체 구조를 빠르게 파악할 수 있도록 4단계 인터랙티브 지도로 정리했습니다. 각 카드를 클릭하면 1차 법령 기준의 핵심 요약과 바로 실행할 수 있는 진단 도구가 우측 패널에 표시됩니다.',
      pillVerified: '● 1차 법령 대조 완료 (2026.11 기준)',
      pillLive: 'FY26–27 상수 자동 연동 (CSIT · 기한 · VAC)',
      pillBilingual: '한·영 이중언어 + 고해상도 요약 이미지 다운로드',
      clickTip: '💡 아래 항목을 클릭하면 우측(모바일 하단)에 법령 근거·주의사항·연계 진단기가 표시됩니다.',
      startFilterLabel: '현재 내 비자:',
      visaCatAll: '전체 (10)',
      visaCatSkilled: '스폰서·기술·지역',
      visaCatStudy: '유학·연수·혁신',
      visaCatFamily: '파트너·부모·가족',
      visaCatLegacy: '종료·경과규정',
      colGroup: '분야',
      colStruct: '비자와 구조',
      colCheck: '신청 전 핵심 확인',
      btnViewPoster: '요약 이미지 크게 보기',
      btnDlKo: 'KO PNG',
      btnDlEn: 'EN PNG',
      inspEyebrow: '선택한 경로 상세 근거',
      inspWatchout: '실무 핵심 주의사항',
      inspTools: '바로 실행할 수 있는 박앤코 진단 도구 · FAQ',
      inspSources: '1차 법령 및 검증 출처',
      postersTitle: '한·영 고해상도 요약 포스터 (저장 · 공유용)',
      postersSub: '오타·어절 줄바꿈·2026년 최신 시행령 기준을 모두 검수해 제작한 한국어·영문 요약 이미지입니다. 클릭하면 크게 보거나 PNG로 저장할 수 있습니다.',
      btnZoom: '크게 보기',
      btnDownload: 'PNG 저장',
      lbClose: '닫기',
      footerDisclaimer: '본 비주얼 맵과 요약 포스터는 호주 이민법의 전체 구조를 이해하기 위한 일반 법률 정보이며 개별 사안에 대한 법률 자문을 대신하지 않습니다. 기한이 임박하거나 복잡한 이력이 있는 경우 즉시 전문변호사와 상의하십시오.'
    },
    en: {
      brandTitle: 'Park & Co Lawyers · Legal & Visa Hub',
      navHub: 'Hub Home',
      navOverview: 'Overview Map',
      navPathways: 'Current Visa → PR',
      navProcess: 'Review & Courts',
      navVisas: 'Visa Directory',
      btnInquiry: 'Official Inquiry Hub',
      urgentText: 'Statutory Deadlines: Onshore NOICC 5 working days (+5 wd discretionary extension before expiry) · General Part 5 ART review 28 calendar days (14 days if detained on day notified · non-extendable) · FCFCOA judicial review usually 35 days',
      urgentLink: 'Open Deadline Calculator →',
      bcHome: 'Park & Co Hub',
      bcCurrent: 'Visual Visa Pathways',
      heroEyebrow: 'INTERACTIVE VISUAL PATHWAYS · PRIMARY-SOURCE VERIFIED',
      heroTitle: 'Australia Visa, PR & Review Pathways at a Glance',
      heroSub: 'Designed for newcomers to Australian immigration to grasp the big picture quickly. Click any card or stage below to inspect verified statutory rules, key pitfalls, and direct links to Park & Co diagnostic tools.',
      pillVerified: '● Primary-Source Verified (Nov 2026)',
      pillLive: 'Synced with FY26–27 Constants (CSIT · Limits · VAC)',
      pillBilingual: 'Full KO/EN + High-Res Summary Posters',
      clickTip: '💡 Click any card, pathway step, or table row below to inspect verified rules and launch matching calculators.',
      startFilterLabel: 'Your starting point:',
      visaCatAll: 'All (10)',
      visaCatSkilled: 'Sponsor & Skilled',
      visaCatStudy: 'Study & Innovation',
      visaCatFamily: 'Partner & Family',
      visaCatLegacy: 'Closed & Transitional',
      colGroup: 'Category',
      colStruct: 'Visa & Structure',
      colCheck: 'Key Pre-Lodgement Checks',
      btnViewPoster: 'View Summary Poster',
      btnDlKo: 'KO PNG',
      btnDlEn: 'EN PNG',
      inspEyebrow: 'VERIFIED PATHWAY DETAILS',
      inspWatchout: 'Key Practical Caution',
      inspTools: 'Matching Park & Co Diagnostic Tools & FAQs',
      inspSources: 'Primary Legislation & Verification Sources',
      postersTitle: 'Bilingual High-Resolution Summary Posters (KO & EN)',
      postersSub: 'Typography-checked, primary-source verified summary posters in Korean and English. Click to enlarge or download PNG.',
      btnZoom: 'Enlarge',
      btnDownload: 'Download PNG',
      lbClose: 'Close',
      footerDisclaimer: 'These visual maps and summary posters provide general legal information only and do not constitute tailored legal advice. Individual eligibility, dates, and visa history determine outcomes.'
    }
  };

  var STAGE_META = {
    overview: {
      eyebrowKo: 'MAP 01 · BIG PICTURE',
      eyebrowEn: 'MAP 01 · BIG PICTURE',
      titleKo: '호주 이민 경로 한눈에 보기',
      titleEn: 'Australian Immigration Pathways at a Glance',
      subKo: '나의 적격 요건과 신청 장소부터 확인합니다 · 각 카드를 클릭하세요',
      subEn: 'Start by checking your eligibility and lodgement location · Click any card',
      defaultId: 'ov-employer'
    },
    pathways: {
      eyebrowKo: 'MAP 02 · VISA TO PR',
      eyebrowEn: 'MAP 02 · VISA TO PR',
      titleKo: '지금의 비자에서 다음 단계로',
      titleEn: 'From Your Current Visa to Permanent Residency',
      subKo: '화살표는 요건 충족 시 검토할 수 있는 경로를 표시합니다. 모든 경로에 개별 적격 심사가 적용됩니다.',
      subEn: 'Arrows show potential routes where criteria are met. Individual statutory assessment applies at every stage.',
      defaultId: 'p-482'
    },
    process: {
      eyebrowKo: 'MAP 03 · APPLICATION, ART & COURTS',
      eyebrowEn: 'MAP 03 · APPLICATION, ART & COURTS',
      titleKo: '호주 비자 신청 · 재심(ART) · 법원 절차',
      titleEn: 'Australia Visa Process, ART Review & Judicial Review Map',
      subKo: '호주 내 신청을 중심으로 보는 의사결정 흐름 · 각 단계를 클릭해 법정 기한을 확인하세요',
      subEn: 'Onshore decision flow — check decision type, standing, location, and statutory deadlines at every stage',
      defaultId: 'pr-rights'
    },
    directory: {
      eyebrowKo: 'MAP 04 · VISA DIRECTORY',
      eyebrowEn: 'MAP 04 · VISA DIRECTORY',
      titleKo: '주요 비자 종류와 자격 점검',
      titleEn: 'Major Australian Visa Categories & Pre-Lodgement Checks',
      subKo: '임시체류·영주권·가족이민 및 종료·경과규정 비자를 한 표에서 비교합니다',
      subEn: 'Compare temporary, permanent, family, and closed/transitional visa structures in one reference table',
      defaultId: 'v-sponsor'
    }
  };

  function getLangFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var l = (params.get('lang') || '').toLowerCase();
    return l === 'en' ? 'en' : 'ko';
  }

  function getTabFromHash() {
    var h = (window.location.hash || '').replace('#', '').toLowerCase();
    if (STAGE_META[h]) return h;
    return 'overview';
  }

  function fmtAud(n) {
    if (typeof n !== 'number') return '';
    return '$' + n.toLocaleString('en-AU');
  }

  function buildConstChip(key) {
    var c = state.constants;
    if (!c) return null;
    var t = c.thresholds_fy2026_27 || {};
    var d = c.deadlines || {};
    var f = c.fees_aud || {};
    var isKo = state.lang === 'ko';
    switch (key) {
      case 'csit':
        return { text: 'CSIT ' + fmtAud(t.csit_aud), urgent: false };
      case 'ssit':
        return { text: 'SSIT ' + fmtAud(t.ssit_aud), urgent: false };
      case 'fwhit':
        return { text: 'FWHIT ' + fmtAud(t.fair_work_high_income_threshold_aud), urgent: false };
      case 'income870':
        return { text: (isKo ? '870 스폰서 소득 ' : '870 Sponsor Income ') + fmtAud(t.sponsor_870_taxable_income_aud), urgent: false };
      case 'vac482':
        return { text: '482 VAC ' + fmtAud(f.vac_sid_482_primary), urgent: false };
      case 'vac186':
        return { text: '186 VAC ' + fmtAud(f.vac_ens_186_primary), urgent: false };
      case 'vac189':
        return { text: '189 VAC ' + fmtAud(f.vac_gsm_189_primary), urgent: false };
      case 'vac190':
        return { text: '190/491 VAC ' + fmtAud(f.vac_gsm_190_491_primary), urgent: false };
      case 'vac500':
        return { text: '500 VAC ' + fmtAud(f.vac_student_500_primary), urgent: false };
      case 'vac485':
        return { text: '485 VAC ' + fmtAud(f.vac_graduate_485_primary), urgent: false };
      case 'vac858':
        return { text: '858 VAC ' + fmtAud(f.vac_national_innovation_858_primary), urgent: false };
      case 'vacPartner':
        return { text: (isKo ? '파트너 VAC ' : 'Partner VAC ') + fmtAud(f.vac_partner_820_309_primary), urgent: false };
      case 'vacParent143':
        return { text: (isKo ? '143 1차 ' : '143 1st ') + fmtAud(f.vac_parent_143_864_1st_primary) + ' / 2nd ' + fmtAud(f.vac_parent_143_864_2nd), urgent: false };
      case 'vacParent103':
        return { text: (isKo ? '103 1차 ' : '103 1st ') + fmtAud(f.vac_parent_103_804_1st_primary), urgent: false };
      case 'vac870':
        return { text: '870 1st ' + fmtAud(f.vac_parent_870_1st) + ' + 3yr ' + fmtAud(f.vac_parent_870_2nd_3yr) + ' / 5yr ' + fmtAud(f.vac_parent_870_2nd_5yr), urgent: false };
      case 'nom494':
        return { text: isKo ? '494 노미네이션 $0 (SAF 별도)' : '494 Nomination $0 (SAF applies)', urgent: false };
      case 'noicc':
        return { text: isKo ? 'NOICC 소명 ' + d.s116_noicc_response_working_days + '영업일 (+5일 연장신청)' : 'NOICC ' + d.s116_noicc_response_working_days + ' working days (+5d ext.)', urgent: true };
      case 'art28':
        return { text: isKo ? 'ART 일반 ' + d.part5_art_review_calendar_days + '역일 (연장불가)' : 'ART General ' + d.part5_art_review_calendar_days + 'd (non-extendable)', urgent: true };
      case 'art14':
        return { text: isKo ? '구금 시 ' + d.detention_art_review_calendar_days + '역일' : 'Detained ' + d.detention_art_review_calendar_days + 'd', urgent: true };
      case 'art9':
        return { text: isKo ? 's 500(6B) 신원 ' + d.s500_character_art_calendar_days + '역일' : 's 500(6B) Character ' + d.s500_character_art_calendar_days + 'd', urgent: true };
      case 'artFee':
        return { text: (isKo ? 'ART 신청비 ' : 'ART Fee ') + fmtAud(f.art_standard_migration_review), urgent: false };
      case 'fcfcoa35':
        return { text: isKo ? 'FCFCOA 통상 ' + d.fcfcoa_judicial_review_calendar_days + '역일' : 'FCFCOA usually ' + d.fcfcoa_judicial_review_calendar_days + ' days', urgent: true };
      default:
        return null;
    }
  }

  function findItemById(id) {
    var i, j;
    for (i = 0; i < DATA.OVERVIEW_CARDS.length; i++) {
      if (DATA.OVERVIEW_CARDS[i].id === id) return DATA.OVERVIEW_CARDS[i];
    }
    for (i = 0; i < DATA.PATHWAY_TRACKS.length; i++) {
      for (j = 0; j < DATA.PATHWAY_TRACKS[i].nodes.length; j++) {
        if (DATA.PATHWAY_TRACKS[i].nodes[j].id === id) return DATA.PATHWAY_TRACKS[i].nodes[j];
      }
    }
    for (i = 0; i < DATA.PROCESS_NODES.length; i++) {
      if (DATA.PROCESS_NODES[i].id === id) return DATA.PROCESS_NODES[i];
    }
    for (i = 0; i < DATA.VISA_ROWS.length; i++) {
      if (DATA.VISA_ROWS[i].id === id) return DATA.VISA_ROWS[i];
    }
    return DATA.OVERVIEW_CARDS[0];
  }

  function isVisitor8503InForce() {
    var now = new Date();
    var eff = new Date('2026-11-28T00:00:00+10:00');
    return now >= eff;
  }

  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderInspector() {
    var item = findItemById(state.selectedId);
    if (!item || !item.detail) return;
    var isKo = state.lang === 'ko';
    var ui = UI[state.lang];
    var title = isKo ? (item.titleKo || item.groupKo) : (item.titleEn || item.groupEn);
    var summary = isKo ? item.detail.summaryKo : item.detail.summaryEn;
    var watchout = isKo ? item.detail.watchoutKo : item.detail.watchoutEn;

    var constHtml = '';
    if (item.detail.constChips && item.detail.constChips.length) {
      var chips = item.detail.constChips.map(buildConstChip).filter(Boolean);
      if (chips.length) {
        constHtml = '<div class="vp-const-row">' + chips.map(function (ch) {
          return '<span class="vp-const-chip' + (ch.urgent ? ' vp-const-chip--urgent' : '') + '">' + esc(ch.text) + '</span>';
        }).join('') + '</div>';
      }
    }

    var listHtml = '<ul class="vp-inspector__list">' + summary.map(function (s) {
      return '<li>' + esc(s) + '</li>';
    }).join('') + '</ul>';

    var watchHtml = watchout
      ? '<div class="vp-watchout"><strong>' + esc(ui.inspWatchout) + '</strong>' + esc(watchout) + '</div>'
      : '';

    var toolsHtml = '';
    if (item.detail.tools && item.detail.tools.length) {
      toolsHtml = '<div class="vp-inspector__sec-label">' + esc(ui.inspTools) + '</div>' +
        '<div class="vp-tool-links">' +
        item.detail.tools.map(function (t) {
          var href = isKo ? t.hrefKo : t.hrefEn;
          var lbl = isKo ? t.labelKo : t.labelEn;
          var ext = t.external ? ' target="_blank" rel="noopener"' : '';
          return '<a class="vp-tool-link" href="' + esc(href) + '"' + ext + '><span>' + esc(lbl) + '</span><span>→</span></a>';
        }).join('') +
        '</div>';
    }

    var srcHtml = '';
    if (item.detail.sources && item.detail.sources.length) {
      srcHtml = '<div class="vp-inspector__sec-label">' + esc(ui.inspSources) + '</div>' +
        '<div class="vp-source-chips">' +
        item.detail.sources.map(function (s) {
          var ext = s.url.indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '';
          return '<a class="vp-source-chip" href="' + esc(s.url) + '"' + ext + '>' + esc(s.code) + '</a>';
        }).join('') +
        '</div>';
    }

    document.getElementById('vp-inspector').innerHTML =
      '<div class="vp-inspector__eyebrow">' + esc(ui.inspEyebrow) + '</div>' +
      '<h3 class="vp-inspector__title">' + esc(title) + '</h3>' +
      constHtml +
      listHtml +
      watchHtml +
      toolsHtml +
      srcHtml;
  }

  function renderStage() {
    var isKo = state.lang === 'ko';
    var ui = UI[state.lang];
    var meta = STAGE_META[state.tab];
    var poster = DATA.POSTERS[state.tab];

    var headHtml =
      '<div class="vp-stage__head">' +
        '<div>' +
          '<div class="vp-stage__eyebrow">' + esc(isKo ? meta.eyebrowKo : meta.eyebrowEn) + '</div>' +
          '<h2 class="vp-stage__title">' + esc(isKo ? meta.titleKo : meta.titleEn) + '</h2>' +
          '<p class="vp-stage__sub">' + esc(isKo ? meta.subKo : meta.subEn) + '</p>' +
        '</div>' +
        '<div class="vp-stage__actions">' +
          '<button type="button" class="vp-poster-btn" data-open-poster="' + esc(state.tab) + '">🖼️ ' + esc(ui.btnViewPoster) + '</button>' +
          '<a class="vp-poster-btn" href="' + esc(poster.ko) + '" download>' + esc(ui.btnDlKo) + ' ↓</a>' +
          '<a class="vp-poster-btn" href="' + esc(poster.en) + '" download>' + esc(ui.btnDlEn) + ' ↓</a>' +
        '</div>' +
      '</div>' +
      '<div class="vp-click-tip">' + esc(ui.clickTip) + '</div>';

    var bodyHtml = '';
    var calloutHtml = '';

    if (state.tab === 'overview') {
      bodyHtml = '<div class="vp-overview-grid">' +
        DATA.OVERVIEW_CARDS.map(function (c) {
          var sel = state.selectedId === c.id ? ' is-selected' : '';
          var tone = c.tone === 'highlight' ? ' vp-node--highlight' : '';
          var lines = isKo ? c.linesKo : c.linesEn;
          return '<button type="button" class="vp-node' + tone + sel + '" data-select-id="' + esc(c.id) + '" aria-pressed="' + (sel ? 'true' : 'false') + '">' +
            '<h3 class="vp-node__title">' + esc(isKo ? c.titleKo : c.titleEn) + '</h3>' +
            '<ul class="vp-node__lines">' + lines.map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul>' +
          '</button>';
        }).join('') +
      '</div>';

      calloutHtml = isKo
        ? '<div class="vp-callout"><strong>과거 비자 표시 갱신 및 2026년 신청장소 변경:</strong> 457·187·489·132·188은 신규 종료되었으며 기존 보유자의 887·888 등 경과규정을 별도 검토합니다. 연수비자 407은 2026년 11월 12일부터 원칙적으로 해외 신청·승인이 요구됩니다(F2026L01449).</div>'
        : '<div class="vp-callout"><strong>Closed Visas &amp; 2026 Location Rules:</strong> Subclasses 457, 187, 489, 132 &amp; 188 are closed to new primary applications (existing holders check transitional 887/888 routes). Subclass 407 generally requires offshore application and grant from 12 Nov 2026 (F2026L01449).</div>';
    } else if (state.tab === 'pathways') {
      var activeFilterObj = DATA.START_FILTERS.find(function (f) { return f.id === state.startFilter; }) || DATA.START_FILTERS[0];
      var filterHtml = '<div class="vp-filter-bar"><span class="vp-filter-label">' + esc(ui.startFilterLabel) + '</span>' +
        DATA.START_FILTERS.map(function (f) {
          var act = f.id === state.startFilter ? ' active' : '';
          return '<button type="button" class="vp-chip' + act + '" data-start-filter="' + esc(f.id) + '">' + esc(isKo ? f.labelKo : f.labelEn) + '</button>';
        }).join('') +
      '</div>';

      var tracksHtml = '<div class="vp-tracks">' +
        DATA.PATHWAY_TRACKS.map(function (tr) {
          var dim = activeFilterObj.tracks.indexOf(tr.id) === -1 ? ' is-dimmed' : '';
          return '<div class="vp-track-row' + dim + '">' +
            tr.nodes.map(function (n, idx) {
              var sel = state.selectedId === n.id ? ' is-selected' : '';
              var lines = (isKo ? n.bodyKo : n.bodyEn).split('\n');
              var arrow = idx < tr.nodes.length - 1 ? '<div class="vp-arrow-h" aria-hidden="true">→</div>' : '';
              return '<button type="button" class="vp-node' + sel + '" data-select-id="' + esc(n.id) + '" aria-pressed="' + (sel ? 'true' : 'false') + '">' +
                '<h3 class="vp-node__title">' + esc(isKo ? n.titleKo : n.titleEn) + '</h3>' +
                '<ul class="vp-node__lines">' + lines.map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul>' +
              '</button>' + arrow;
            }).join('') +
          '</div>';
        }).join('') +
      '</div>';

      bodyHtml = filterHtml + tracksHtml;
      calloutHtml = isKo
        ? '<div class="vp-callout"><strong>2026년 신청 장소 제한:</strong> F2026L01348에 따라 417·462·482·485·방문비자 등 지정 17개 비자 소지자의 학생비자(500/590) 신청은 해외에서 진행해야 합니다. 407도 2026년 11월 12일부터 원칙적 해외 신청·승인이 요구됩니다(F2026L01449). EOI 제출과 위 화살표만으로 체류 기간이 연장되지는 않습니다.</div>'
        : '<div class="vp-callout"><strong>2026 Lodgement Location Rules:</strong> Under F2026L01348, holders of 17 specified visas (including 417, 462, 482, 485 &amp; Visitor visas) must apply for Student (500/590) offshore. Subclass 407 generally requires offshore application &amp; grant from 12 Nov 2026 (F2026L01449). Lodging an EOI does not extend stay.</div>';
    } else if (state.tab === 'process') {
      var gridMap = {
        'pr-before': { r: 1, c: 1, cls: 'vp-proc-arrow-right' },
        'pr-valid': { r: 1, c: 2, cls: 'vp-proc-arrow-right' },
        'pr-dept': { r: 1, c: 3, cls: 'vp-proc-arrow-right' },
        'pr-grant': { r: 1, c: 4, cls: '' },
        'pr-outcome': { r: 3, c: 1, cls: '' },
        'pr-merits': { r: 3, c: 2, cls: 'vp-proc-arrow-left' },
        'pr-rights': { r: 3, c: 3, cls: 'vp-proc-arrow-left' },
        'pr-jr': { r: 5, c: 2, cls: 'vp-proc-arrow-right' },
        'pr-court': { r: 5, c: 3, cls: '' },
        'pr-mi': { r: 5, c: 4, cls: '' }
      };

      var slotsHtml = DATA.PROCESS_NODES.map(function (n) {
        var pos = gridMap[n.id];
        var sel = state.selectedId === n.id ? ' is-selected' : '';
        var acc = n.accent === 'crimson' ? ' vp-node--crimson' : ' vp-node--teal';
        var tint = n.tint ? ' vp-node--tint' : '';
        var lines = isKo ? n.linesKo : n.linesEn;
        return '<div class="vp-proc-slot ' + pos.cls + '" style="grid-row:' + pos.r + ';grid-column:' + pos.c + ';">' +
          '<button type="button" class="vp-node' + acc + tint + sel + '" data-select-id="' + esc(n.id) + '" aria-pressed="' + (sel ? 'true' : 'false') + '">' +
            '<h3 class="vp-node__title">' + esc(isKo ? n.titleKo : n.titleEn) + '</h3>' +
            '<ul class="vp-node__lines">' + lines.map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul>' +
          '</button>' +
        '</div>';
      }).join('');

      var branchLabel = isKo ? '불리한 결정 등 → 사법심사 / 점선: 장관 재량 개입' : 'Adverse decision → Judicial review / Dashed: Ministerial intervention';

      var branchSvg =
        '<div class="vp-proc-connector-down" aria-hidden="true">↓</div>' +
        '<div class="vp-proc-connector-branch" aria-hidden="true">' +
          '<svg class="vp-proc-branch-svg" viewBox="0 0 1000 34" preserveAspectRatio="none">' +
            '<path d="M 120 0 L 120 24 L 368 24 L 368 34" fill="none" stroke="#0E3A3E" stroke-width="2.2" />' +
            '<path d="M 180 0 L 180 11 L 875 11 L 875 34" fill="none" stroke="#0E3A3E" stroke-width="2" stroke-dasharray="6 5" />' +
          '</svg>' +
          '<div style="position:absolute;left:130px;bottom:0;font-size:11px;font-weight:700;color:var(--pk-ink-2);background:#F4EFE6;padding:0 5px;">' + esc(branchLabel) + '</div>' +
        '</div>';

      bodyHtml = '<div class="vp-process-canvas"><div class="vp-process-grid">' + slotsHtml + branchSvg + '</div></div>';
      calloutHtml = isKo
        ? '<div class="vp-callout"><strong>각 단계에서 체류자격을 따로 확인합니다.</strong> 재심·소송·장관 개입 요청 자체로 비자, 취업권 또는 출국·재입국 권리가 보장되지 않습니다. 법원의 구제는 법률오류에 대한 취소·환송 등이며, 법원이 비자를 직접 부여하지 않습니다.</div>'
        : '<div class="vp-callout"><strong>Check lawful stay separately.</strong> Review, court proceedings and an intervention request do not themselves secure a visa, work rights or travel permission. Judicial relief may return a decision for lawful reconsideration; a court does not grant a visa.</div>';
    } else if (state.tab === 'directory') {
      var cats = [
        { id: 'all', lbl: ui.visaCatAll },
        { id: 'sponsor_skilled', lbl: ui.visaCatSkilled },
        { id: 'study_innov', lbl: ui.visaCatStudy },
        { id: 'family_parent', lbl: ui.visaCatFamily },
        { id: 'transitional', lbl: ui.visaCatLegacy }
      ];
      var catHtml = '<div class="vp-filter-bar">' + cats.map(function (c) {
        var act = c.id === state.visaCat ? ' active' : '';
        return '<button type="button" class="vp-chip' + act + '" data-visa-cat="' + esc(c.id) + '">' + esc(c.lbl) + '</button>';
      }).join('') + '</div>';

      var filtered = DATA.VISA_ROWS.filter(function (r) {
        return state.visaCat === 'all' || r.cat === state.visaCat;
      });

      var tableHtml = '<div class="vp-table-wrap"><table class="vp-table">' +
        '<thead><tr><th>' + esc(ui.colGroup) + '</th><th>' + esc(ui.colStruct) + '</th><th>' + esc(ui.colCheck) + '</th></tr></thead>' +
        '<tbody>' + filtered.map(function (r) {
          var sel = state.selectedId === r.id ? ' class="is-selected"' : '';
          return '<tr' + sel + ' data-select-id="' + esc(r.id) + '" tabindex="0">' +
            '<td class="vp-table__group">' + esc(isKo ? r.groupKo : r.groupEn) + '</td>' +
            '<td class="vp-table__struct">' + esc(isKo ? r.structureKo : r.structureEn) + '</td>' +
            '<td class="vp-table__check">' + esc(isKo ? r.checkKo : r.checkEn) + '</td>' +
          '</tr>';
        }).join('') + '</tbody></table></div>';

      bodyHtml = catHtml + tableHtml;
      var inForce = isVisitor8503InForce();
      if (isKo) {
        calloutHtml = '<div class="vp-callout"><strong>방문비자 Condition 8503 확대 규정 (F2026L01503):</strong> 2026년 11월 28일 이후 새로 접수되는 관광·상용(600)·ETA(601)·eVisitor(651) 신청에 적용됩니다' + (inForce ? ' (현재 시행 중).' : ' (2026.11.28 시행 예정).') + ' 각 비자에는 건강·신원 및 신청 시점·장소 요건이 사안별로 적용됩니다.</div>';
      } else {
        calloutHtml = '<div class="vp-callout"><strong>Visitor Visa Condition 8503 Expansion (F2026L01503):</strong> Applies to new Visitor (600), ETA (601) and eVisitor (651) applications lodged on or after 28 November 2026' + (inForce ? ' (now in force).' : ' (commencing 28 Nov 2026).') + ' Health, character, and validity criteria apply to every application.</div>';
      }
    }

    document.getElementById('vp-stage').innerHTML = headHtml + bodyHtml + calloutHtml;
    bindStageEvents();
  }

  function renderPostersGallery() {
    var isKo = state.lang === 'ko';
    var ui = UI[state.lang];
    var keys = ['overview', 'pathways', 'process', 'directory'];
    var grid = document.getElementById('vp-posters-grid');
    if (!grid) return;

    grid.innerHTML = keys.map(function (k) {
      var p = DATA.POSTERS[k];
      var src = isKo ? p.ko : p.en;
      var title = isKo ? p.titleKo : p.titleEn;
      return '<div class="vp-poster-card">' +
        '<img class="vp-poster-card__thumb" src="' + esc(src) + '" alt="' + esc(title) + '" loading="lazy" data-open-poster="' + esc(k) + '" />' +
        '<div class="vp-poster-card__body">' +
          '<h3 class="vp-poster-card__title">' + esc(title) + '</h3>' +
          '<div class="vp-poster-card__links">' +
            '<button type="button" data-open-poster="' + esc(k) + '">' + esc(ui.btnZoom) + '</button>' +
            '<a href="' + esc(p.ko) + '" download>KO ↓</a>' +
            '<a href="' + esc(p.en) + '" download>EN ↓</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    grid.querySelectorAll('[data-open-poster]').forEach(function (el) {
      el.addEventListener('click', function () {
        openLightbox(el.getAttribute('data-open-poster'));
      });
    });
  }

  function openLightbox(tabKey) {
    var p = DATA.POSTERS[tabKey] || DATA.POSTERS.overview;
    var isKo = state.lang === 'ko';
    var lb = document.getElementById('vp-lightbox');
    document.getElementById('vp-lb-title').textContent = isKo ? p.titleKo : p.titleEn;
    document.getElementById('vp-lb-img').src = isKo ? p.ko : p.en;
    document.getElementById('vp-lb-img').alt = isKo ? p.titleKo : p.titleEn;
    document.getElementById('vp-lb-dl-ko').href = p.ko;
    document.getElementById('vp-lb-dl-en').href = p.en;
    lb.hidden = false;
  }

  function closeLightbox() {
    document.getElementById('vp-lightbox').hidden = true;
  }

  function bindStageEvents() {
    var stage = document.getElementById('vp-stage');
    stage.querySelectorAll('[data-select-id]').forEach(function (el) {
      el.addEventListener('click', function () {
        state.selectedId = el.getAttribute('data-select-id');
        renderStage();
        renderInspector();
      });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          state.selectedId = el.getAttribute('data-select-id');
          renderStage();
          renderInspector();
        }
      });
    });

    stage.querySelectorAll('[data-start-filter]').forEach(function (el) {
      el.addEventListener('click', function () {
        state.startFilter = el.getAttribute('data-start-filter');
        renderStage();
      });
    });

    stage.querySelectorAll('[data-visa-cat]').forEach(function (el) {
      el.addEventListener('click', function () {
        state.visaCat = el.getAttribute('data-visa-cat');
        renderStage();
      });
    });

    stage.querySelectorAll('[data-open-poster]').forEach(function (el) {
      el.addEventListener('click', function () {
        openLightbox(el.getAttribute('data-open-poster'));
      });
    });
  }

  function applyStaticI18n() {
    var isKo = state.lang === 'ko';
    var ui = UI[state.lang];
    document.documentElement.lang = state.lang;
    document.body.setAttribute('data-ui-lang', state.lang);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (ui[k]) el.textContent = ui[k];
    });

    document.querySelectorAll('[data-ko][data-en]').forEach(function (el) {
      el.textContent = isKo ? el.getAttribute('data-ko') : el.getAttribute('data-en');
    });

    document.querySelectorAll('[data-ko-href][data-en-href]').forEach(function (el) {
      el.setAttribute('href', isKo ? el.getAttribute('data-ko-href') : el.getAttribute('data-en-href'));
    });

    document.getElementById('vp-lang-ko').classList.toggle('active', isKo);
    document.getElementById('vp-lang-en').classList.toggle('active', !isKo);
  }

  function setTab(tabKey, pushHash) {
    if (!STAGE_META[tabKey]) tabKey = 'overview';
    state.tab = tabKey;
    state.selectedId = STAGE_META[tabKey].defaultId;

    document.querySelectorAll('.vp-tab').forEach(function (btn) {
      var act = btn.getAttribute('data-tab') === tabKey;
      btn.classList.toggle('active', act);
      btn.setAttribute('aria-selected', act ? 'true' : 'false');
    });

    if (pushHash && history.replaceState) {
      var url = new URL(window.location.href);
      url.hash = tabKey;
      history.replaceState(null, '', url.toString());
    }

    renderStage();
    renderInspector();
  }

  function setLang(lang) {
    state.lang = lang === 'en' ? 'en' : 'ko';
    if (history.replaceState) {
      var url = new URL(window.location.href);
      url.searchParams.set('lang', state.lang);
      history.replaceState(null, '', url.toString());
    }
    applyStaticI18n();
    renderStage();
    renderInspector();
    renderPostersGallery();
  }

  function init() {
    state.lang = getLangFromUrl();
    state.tab = getTabFromHash();
    state.selectedId = STAGE_META[state.tab].defaultId;

    document.getElementById('vp-lang-ko').addEventListener('click', function () { setLang('ko'); });
    document.getElementById('vp-lang-en').addEventListener('click', function () { setLang('en'); });

    document.querySelectorAll('.vp-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTab(btn.getAttribute('data-tab'), true);
      });
    });

    document.getElementById('vp-lb-close').addEventListener('click', closeLightbox);
    document.getElementById('vp-lightbox').addEventListener('click', function (e) {
      if (e.target === this) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });

    window.addEventListener('hashchange', function () {
      setTab(getTabFromHash(), false);
    });

    applyStaticI18n();
    setTab(state.tab, false);
    renderPostersGallery();

    fetch('../shared/parkco-constants.json')
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (json) {
        if (json) {
          state.constants = json;
          renderInspector();
        }
      })
      .catch(function () {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
