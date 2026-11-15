/* Park & Co Universal Diagnostic Handoff & Prefilled Jotform SDK v1.0
 * Connects changa9090.github.io (15+ navigators), faq.immispecialist.com,
 * Case Review: Sponsorship (parkco-sponsorship-compass), active Jotform intake forms,
 * and 217/faq-auto-responder -> 218 PNC / 217 CounselDesk (:8813).
 */
(function () {
  'use strict';
  if (window.ParkCoHandoff) return;

  var STORAGE_KEY = 'parkco_shared_profile_v1';
  var HANDOFF_API_URL = (location.hostname === 'faq.immispecialist.com' || location.hostname === 'faq.parklawyers.com.au' || location.hostname === '127.0.0.1' || location.hostname === 'localhost')
    ? '/api/v1/handoff'
    : 'https://faq.immispecialist.com/api/v1/handoff';

  // Verified Active Jotform Registry (Air2 ego-lite audit 2026-11-15)
  // Note: 220391121528851 (DISABLED) is replaced by 262833157380863 (ENABLED)
  var JOTFORM_REGISTRY = {
    immi_ko: {
      id: '220391469091053',
      host: 'https://form.jotform.com/',
      practice: 'immigration',
      lang: 'ko',
      briefField: 'input14',
      fieldMap: { name: 'input4', phone: 'input5', email: 'emailAddress', referral: 'input6', visa: 'input10', state: 'input9', topic: 'input15' }
    },
    immi_en: {
      id: '262833157380863',
      host: 'https://form.jotform.com/',
      practice: 'immigration',
      lang: 'en',
      briefField: 'pleaseDescribe',
      fieldMap: { name: 'fullName', phone: 'phoneNumber', email: 'emailAddress', referral: 'howDid', visa: 'ifYou', state: 'whereAre', topic: 'assistanceType' }
    },
    visa_emergency_ko: {
      id: '220397353646865',
      host: 'https://form.jotform.com/',
      practice: 'immigration',
      lang: 'ko',
      briefField: 'input14',
      fieldMap: { email: 'input7', referral: 'input6', visa: 'input19', state: 'input9' }
    },
    visa_emergency_en: {
      id: '221317800584856',
      host: 'https://form.jotform.com/',
      practice: 'immigration',
      lang: 'en',
      briefField: 'whatIs',
      fieldMap: { email: 'emailAddress', referral: 'howDid', visa: 'ifYou', state: 'whereAre' }
    },
    art_ko: {
      id: '240147644629864',
      host: 'https://form.jotform.com/',
      practice: 'immigration',
      lang: 'ko',
      briefField: 'input14',
      fieldMap: { email: 'email', state: 'input9' }
    },
    art_en: {
      id: '233167697064869',
      host: 'https://form.jotform.com/',
      practice: 'immigration',
      lang: 'en',
      briefField: 'whatIs',
      fieldMap: { email: 'emailAddress', state: 'whereAre' }
    },
    sponsorship_pci: {
      id: '263178486400056',
      host: 'https://pci.jotform.com/form/',
      practice: 'immigration',
      lang: 'ko',
      briefField: 'adverseAndPriorHistory',
      fieldMap: {
        roleCapacity: 'roleCapacity',
        employerDocsReady: 'employerDocsReady',
        preferredLang: 'preferredLang',
        businessLegalName: 'businessLegalName',
        abnAcn: 'abnAcn',
        entityStructure: 'entityStructure',
        postcode: 'address[postal]',
        sbsStatus: 'sbsStatus',
        turnover: 'turnoverAndProfit',
        anzsco: 'nominatedOccupation',
        salary: 'proposedSalary',
        nomineeProfile: 'nomineeProfile'
      }
    },
    gsm_189: {
      id: '212646907913865',
      host: 'https://pci.jotform.com/form/',
      practice: 'immigration',
      lang: 'ko',
      briefField: 'input45',
      fieldMap: { email: 'email5', anzsco: 'Nominated62', visa: 'Current58' }
    },
    gsm_190: {
      id: '212646580965869',
      host: 'https://pci.jotform.com/form/',
      practice: 'immigration',
      lang: 'ko',
      briefField: 'input45',
      fieldMap: { email: 'email5', anzsco: 'Nominated62', visa: 'Current58' }
    },
    gsm_491: {
      id: '212498518526868',
      host: 'https://pci.jotform.com/form/',
      practice: 'immigration',
      lang: 'ko',
      briefField: 'input45',
      fieldMap: { email: 'email5', anzsco: 'Nominated62', visa: 'Current58' }
    },
    emp_ko: {
      id: '221801513691854',
      host: 'https://form.jotform.com/',
      practice: 'employment',
      lang: 'ko',
      briefField: 'detailedDescription14',
      fieldMap: { name: 'name4', phone: 'mobileNumber5', email: 'emailAddress7', state: 'input22', role: 'input23', visa: 'input24', employer: 'input16', jobTitle: 'jobTitle17' }
    },
    emp_en: {
      id: '221642058161853',
      host: 'https://form.jotform.com/',
      practice: 'employment',
      lang: 'en',
      briefField: 'detailedDescription14',
      fieldMap: { name: 'name4', phone: 'mobileNumber5', email: 'emailAddress7', state: 'location', role: 'areYou', visa: 'visaStatus', employer: 'whatIs', jobTitle: 'jobTitle17' }
    },
    emp_employee_ko: {
      id: '220670041641848',
      host: 'https://form.jotform.com/',
      practice: 'employment',
      lang: 'ko',
      briefField: 'input14',
      fieldMap: { name: 'name', phone: 'input5', email: 'input7', visa: 'input10', employer: 'input16', jobTitle: 'job17', hourlyRate: 'input21', state: 'input9' }
    },
    emp_employer_ko: {
      id: '262987760205061',
      host: 'https://form.jotform.com/',
      practice: 'organisations',
      lang: 'ko',
      briefField: 'input12',
      fieldMap: { employer: 'business', state: 'input10', industry: 'industry' }
    },
    family: {
      id: '262472844554060',
      host: 'https://form.jotform.com/',
      practice: 'family',
      lang: 'ko',
      briefField: 'q33_textarea31',
      fieldMap: { email: 'q13_email11', phone: 'q14_phone12' }
    },
    pi_ko: {
      id: '230431736921856',
      host: 'https://form.jotform.com/',
      practice: 'personal_injury',
      lang: 'ko',
      briefField: 'detailedDescription14',
      fieldMap: { name: 'name4', phone: 'mobileNumber5', email: 'emailAddress7', state: 'location' }
    },
    pi_en: {
      id: '230431523475854',
      host: 'https://form.jotform.com/',
      practice: 'personal_injury',
      lang: 'en',
      briefField: 'detailedDescription14',
      fieldMap: { name: 'name4', phone: 'mobileNumber5', email: 'emailAddress7', state: 'location' }
    },
    general_ko: {
      id: '262877742993881',
      host: 'https://form.jotform.com/',
      practice: 'general_other',
      lang: 'ko',
      briefField: 'detailedDescription14',
      fieldMap: { name: 'name4', phone: 'mobileNumber5', email: 'emailAddress7', state: 'location' }
    },
    general_en: {
      id: '230431458088861',
      host: 'https://form.jotform.com/',
      practice: 'general_other',
      lang: 'en',
      briefField: 'detailedDescription14',
      fieldMap: { name: 'name4', phone: 'mobileNumber5', email: 'emailAddress7', state: 'location' }
    }
  };

  var sessionToken = '';
  function getOrCreateToken() {
    if (sessionToken) return sessionToken;
    try {
      var existing = sessionStorage.getItem('parkco_handoff_token_v1');
      if (existing && /^PK-[A-Z0-9]{6,16}$/.test(existing)) {
        sessionToken = existing;
        return sessionToken;
      }
    } catch (_) {}
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var out = 'PK-';
    for (var i = 0; i < 8; i++) {
      out += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    sessionToken = out;
    try { sessionStorage.setItem('parkco_handoff_token_v1', sessionToken); } catch (_) {}
    return sessionToken;
  }

  function detectLang() {
    try {
      var qLang = new URLSearchParams(location.search).get('lang');
      if (qLang && qLang.toLowerCase().indexOf('en') === 0) return 'en';
      if (qLang && qLang.toLowerCase().indexOf('ko') === 0) return 'ko';
      var toggleEn = document.querySelector('#lang-en.active, .lang-btn[data-lang="en"].active, [data-lang-current="en"]');
      if (toggleEn) return 'en';
      var docLang = (document.documentElement.lang || '').toLowerCase();
      if (docLang.indexOf('en') === 0) return 'en';
    } catch (_) {}
    return 'ko';
  }

  function detectToolId() {
    var p = location.pathname || '/';
    if (location.hostname === 'changa9090.github.io') {
      var seg = p.split('/').filter(Boolean)[0];
      return seg || 'parkco-legal-hub';
    }
    if (p.indexOf('/organisations') === 0) return 'faq-organisations';
    if (p.indexOf('/employment') === 0) return 'faq-employment';
    if (p.indexOf('/family') === 0) return 'faq-family';
    if (p.indexOf('/disciplinary') === 0) return 'faq-disciplinary';
    return 'faq-immigration';
  }

  function loadSharedProfile() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (_) {}
    return {};
  }

  function saveSharedProfile(updates) {
    try {
      var cur = loadSharedProfile();
      var merged = Object.assign({}, cur, updates || {}, { updatedAt: new Date().toISOString() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    } catch (_) {
      return updates || {};
    }
  }

  function encodeCtxParam(profile) {
    try {
      var compact = {};
      ['anzsco', 'age', 'english', 'salary', 'visa', 'state', 'stream', 'turnover', 'token'].forEach(function (k) {
        if (profile[k] !== undefined && profile[k] !== null && String(profile[k]).trim() !== '') {
          compact[k] = String(profile[k]).trim().slice(0, 80);
        }
      });
      var jsonStr = JSON.stringify(compact);
      return btoa(unescape(encodeURIComponent(jsonStr))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    } catch (_) {
      return '';
    }
  }

  function decodeCtxParam(raw) {
    if (!raw) return null;
    try {
      var b64 = raw.replace(/-/g, '+').replace(/_/g, '/');
      while (b64.length % 4) b64 += '=';
      var jsonStr = decodeURIComponent(escape(atob(b64)));
      var obj = JSON.parse(jsonStr);
      return (obj && typeof obj === 'object') ? obj : null;
    } catch (_) {
      return null;
    }
  }

  function ingestUrlProfile() {
    try {
      var sp = new URLSearchParams(location.search);
      var incoming = {};
      var ctxObj = decodeCtxParam(sp.get('pk_ctx'));
      if (ctxObj) Object.assign(incoming, ctxObj);
      ['anzsco', 'age', 'english', 'salary', 'visa', 'state', 'stream', 'turnover'].forEach(function (k) {
        var v = sp.get(k);
        if (v && v.trim()) incoming[k] = v.trim();
      });
      if (Object.keys(incoming).length > 0) {
        saveSharedProfile(incoming);
      }
    } catch (_) {}
  }

  function scrapePageInputs() {
    var data = {};
    var sharedUpdates = {};
    var els = document.querySelectorAll('input, select, textarea');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (!el || el.type === 'password' || el.type === 'hidden' || el.type === 'file') continue;
      var key = (el.id || el.name || '').trim();
      if (!key || key === 'sow-preview-text' || key.indexOf('parkco-') === 0) continue;
      var val = '';
      if (el.type === 'checkbox' || el.type === 'radio') {
        if (!el.checked) continue;
        val = el.value || 'checked';
      } else if (el.tagName === 'SELECT') {
        var opt = el.options && el.options[el.selectedIndex];
        val = (opt && opt.text) ? (el.value + ' (' + opt.text.trim() + ')') : (el.value || '');
      } else {
        val = (el.value || '').trim();
      }
      if (!val) continue;
      data[key] = val.slice(0, 600);
      var kLow = key.toLowerCase();
      if (kLow.indexOf('anzsco') >= 0 || kLow.indexOf('occupation') >= 0) sharedUpdates.anzsco = (el.value || '').trim();
      else if (kLow.indexOf('salary') >= 0 || kLow.indexOf('earnings') >= 0 || kLow.indexOf('csit-base') >= 0 || kLow.indexOf('income') >= 0) sharedUpdates.salary = (el.value || '').trim();
      else if (kLow.indexOf('state') >= 0 || kLow.indexOf('region') >= 0) sharedUpdates.state = (el.value || '').trim();
      else if (kLow.indexOf('visa') >= 0) sharedUpdates.visa = (el.value || '').trim();
      else if (kLow.indexOf('age') >= 0) sharedUpdates.age = (el.value || '').trim();
      else if (kLow.indexOf('english') >= 0 || kLow.indexOf('ielts') >= 0) sharedUpdates.english = (el.value || '').trim();
    }
    if (Object.keys(sharedUpdates).length > 0) {
      saveSharedProfile(sharedUpdates);
    }
    return data;
  }

  function hydratePageInputsFromProfile() {
    var prof = loadSharedProfile();
    if (!prof || Object.keys(prof).length === 0) return;
    var sp = new URLSearchParams(location.search);
    var hasExplicitParams = sp.has('pk_ctx') || sp.has('anzsco') || sp.has('salary') || sp.has('state') || sp.has('visa');
    if (!hasExplicitParams) return;

    var candidates = [
      { key: 'anzsco', selectors: ['#anzsco-search', '#sid-anzsco', '#gsm-anzsco', '#dama-search', 'input[id*="anzsco"]', 'input[name*="anzsco"]'] },
      { key: 'salary', selectors: ['#sid-salary', '#csit-base', '#calc-salary', 'input[id*="salary"]'] },
      { key: 'state', selectors: ['#state-selector', '#gsm-state', '#sid-state', '#emp-state', 'select[id*="state"]'] }
    ];
    candidates.forEach(function (item) {
      var val = prof[item.key];
      if (!val) return;
      for (var i = 0; i < item.selectors.length; i++) {
        var el = document.querySelector(item.selectors[i]);
        if (el && !el.value) {
          el.value = val;
          try { el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); } catch (_) {}
          break;
        }
      }
    });
  }

  function extractLiveBriefText() {
    var briefSelectors = [
      '#brief-body-textarea',
      '#handoff-brief',
      '#consult-brief-box',
      '#sid-brief-box',
      '#gsm-brief-preview',
      '#pv-brief-preview',
      '#brief-preview',
      '#emp-brief-preview',
      '#fam-brief-preview',
      '#sow-preview-text',
      '#crisis-brief-preview',
      '#whm-brief-preview',
      '#dama-brief-preview',
      '#psDemandPreview',
      '[data-handoff-brief]'
    ];
    for (var i = 0; i < briefSelectors.length; i++) {
      var el = document.querySelector(briefSelectors[i]);
      if (!el) continue;
      var txt = (el.value !== undefined ? el.value : el.textContent || '').trim();
      if (txt && txt.length > 15) return txt;
    }
    var checkedRows = document.querySelectorAll('.check-row input[type="checkbox"]:checked');
    if (checkedRows && checkedRows.length > 0) {
      var chkLines = [];
      for (var c = 0; c < checkedRows.length; c++) {
        var rowLbl = checkedRows[c].closest('.check-row');
        var spanTxt = rowLbl ? (rowLbl.textContent || '').trim() : '';
        if (spanTxt) chkLines.push('  [✓] ' + spanTxt);
      }
      if (chkLines.length > 0) {
        var isEnChk = detectLang() === 'en';
        return (isEnChk ? '[Pre-Consultation Checklist & Self-Help Summary]\n' : '[상담 전 자가점검 체크리스트 요약]\n') + chkLines.join('\n');
      }
    }
    // Check if FAQ detail page has checklist items
    var faqCard = document.querySelector('article.faq-detail-article');
    if (faqCard) {
      var lang = detectLang();
      var h1 = faqCard.querySelector('h1.faq-title');
      var title = h1 ? h1.textContent.trim() : document.title;
      var checked = [];
      var unchecked = [];
      faqCard.querySelectorAll('.checklist-ul li').forEach(function (li) {
        var itemTxt = (li.textContent || '').replace(/^[\u2713\u2611\u2610\s]+/, '').trim();
        if (!itemTxt) return;
        if (li.getAttribute('data-checked') === '1') checked.push('  [✓] ' + itemTxt);
        else unchecked.push('  [ ] ' + itemTxt);
      });
      var lines = [
        lang === 'en' ? '[Park & Co Official FAQ Consultation Request]' : '[법무법인 박앤코 대표 FAQ 기반 상담 요청]',
        (lang === 'en' ? 'Reference Topic: ' : '참고 FAQ 문항: ') + title,
        'URL: ' + location.href
      ];
      if (checked.length) {
        lines.push(lang === 'en' ? 'Verified / Prepared Checklist Items:' : '확인·준비 완료된 체크리스트 항목:');
        lines.push(checked.join('\n'));
      }
      if (unchecked.length) {
        lines.push(lang === 'en' ? 'Items Needing Legal Review / Unchecked:' : '추가 검토가 필요한 체크리스트 항목:');
        lines.push(unchecked.join('\n'));
      }
      return lines.join('\n');
    }
    return '';
  }

  function resolveFormKeyForTool(toolId, lang, extraHint) {
    var isEn = (lang || detectLang()) === 'en';
    var hint = (extraHint || '').toLowerCase();
    var t = (toolId || detectToolId()).toLowerCase();

    if (hint.indexOf('sponsorship_pci') >= 0 || t.indexOf('sponsorship-compass') >= 0 || t.indexOf('case-review-sponsorship') >= 0) {
      return 'sponsorship_pci';
    }
    if (hint.indexOf('189') >= 0) return 'gsm_189';
    if (hint.indexOf('190') >= 0) return 'gsm_190';
    if (hint.indexOf('491') >= 0) return 'gsm_491';

    if (t.indexOf('family') >= 0 || hint.indexOf('family') >= 0) return 'family';
    if (t.indexOf('organisations') >= 0 || hint.indexOf('employer') >= 0 || hint.indexOf('organisations') >= 0) {
      return isEn ? 'emp_en' : 'emp_employer_ko';
    }
    if (t.indexOf('employment') >= 0 || hint.indexOf('employment') >= 0) {
      return isEn ? 'emp_en' : 'emp_ko';
    }
    if (t.indexOf('crisis') >= 0 || hint.indexOf('crisis') >= 0 || hint.indexOf('noicc') >= 0 || hint.indexOf('cancel') >= 0) {
      return isEn ? 'visa_emergency_en' : 'visa_emergency_ko';
    }
    if (hint.indexOf('art') >= 0 || hint.indexOf('refusal') >= 0) {
      return isEn ? 'art_en' : 'art_ko';
    }
    return isEn ? 'immi_en' : 'immi_ko';
  }

  function buildJotformUrl(formKeyOrId, structuredFields, briefText, token) {
    var entry = JOTFORM_REGISTRY[formKeyOrId];
    if (!entry) {
      for (var k in JOTFORM_REGISTRY) {
        if (JOTFORM_REGISTRY[k].id === String(formKeyOrId)) {
          entry = JOTFORM_REGISTRY[k];
          break;
        }
      }
    }
    if (!entry) entry = JOTFORM_REGISTRY[detectLang() === 'en' ? 'immi_en' : 'immi_ko'];

    var tok = token || getOrCreateToken();
    var finalBrief = (briefText || '').trim();
    if (finalBrief && finalBrief.indexOf(tok) < 0) {
      var headerLine = entry.lang === 'en'
        ? '[Park & Co Diagnostic Ref: #' + tok + ']'
        : '[박앤코 자가진단 연동코드: #' + tok + ']';
      finalBrief = headerLine + '\n' + finalBrief;
    } else if (!finalBrief) {
      finalBrief = (entry.lang === 'en'
        ? '[Park & Co Diagnostic Ref: #' + tok + ']\nSource: ' + location.href
        : '[박앤코 자가진단 연동코드: #' + tok + ']\n유입 페이지: ' + location.href);
    }

    var params = new URLSearchParams();
    if (entry.briefField && finalBrief) {
      params.set(entry.briefField, finalBrief.slice(0, 3500));
    }
    var fields = Object.assign({}, loadSharedProfile(), structuredFields || {});
    if (entry.fieldMap) {
      for (var logicalKey in entry.fieldMap) {
        var jfParam = entry.fieldMap[logicalKey];
        var val = fields[logicalKey];
        if (val !== undefined && val !== null && String(val).trim() !== '') {
          params.set(jfParam, String(val).trim().slice(0, 300));
        }
      }
    }
    return {
      url: entry.host + entry.id + '?' + params.toString(),
      formId: entry.id,
      practiceArea: entry.practice,
      lang: entry.lang,
      token: tok,
      briefText: finalBrief
    };
  }

  function sendHandoffBeacon(info, rawInputs) {
    var payload = {
      token: info.token,
      tool_id: detectToolId(),
      practice_area: info.practiceArea || 'immigration',
      lang: info.lang || detectLang(),
      target_form_id: info.formId || '',
      page_url: location.href,
      brief_text: info.briefText || '',
      payload: {
        shared_profile: loadSharedProfile(),
        inputs: rawInputs || scrapePageInputs(),
        title: document.title || '',
        timestamp: new Date().toISOString()
      }
    };
    try {
      var bodyStr = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        navigator.sendBeacon(HANDOFF_API_URL, new Blob([bodyStr], { type: 'application/json' }));
      } else if (window.fetch) {
        fetch(HANDOFF_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: bodyStr,
          keepalive: true,
          mode: 'cors'
        }).catch(function () {});
      }
    } catch (_) {}
  }

  function openPrefilledJotform(options) {
    var opts = options || {};
    var lang = opts.lang || detectLang();
    var toolId = opts.toolId || detectToolId();
    var rawInputs = opts.inputs || scrapePageInputs();
    var brief = opts.briefText || extractLiveBriefText();
    var formKey = opts.formKey || opts.formId || resolveFormKeyForTool(toolId, lang, brief + ' ' + (opts.hint || ''));
    var built = buildJotformUrl(formKey, opts.fields || {}, brief, opts.token);

    if (navigator.clipboard && built.briefText) {
      navigator.clipboard.writeText(built.briefText).catch(function () {});
    }
    sendHandoffBeacon(built, rawInputs);
    window.open(built.url, '_blank', 'noopener');
    return built;
  }

  function rewriteDeadJotformLinks() {
    // 220391121528851 is DISABLED -> replace with active 262833157380863
    var links = document.querySelectorAll('a[href*="220391121528851"]');
    for (var i = 0; i < links.length; i++) {
      links[i].href = links[i].href.replace('220391121528851', '262833157380863');
    }
  }

  function ensureSecondaryHubButton(primaryEl) {
    if (!primaryEl || !primaryEl.parentElement) return;
    var parent = primaryEl.parentElement;
    if (parent.querySelector('[data-parkco-secondary-hub="1"]')) return;
    // Check if there is already a sibling link to parklawyers.com.au/links
    var existingLinks = parent.querySelectorAll('a[href*="parklawyers.com.au/links"]');
    for (var i = 0; i < existingLinks.length; i++) {
      if (existingLinks[i] !== primaryEl) {
        existingLinks[i].setAttribute('data-parkco-secondary-hub', '1');
        return;
      }
    }
    var isEn = detectLang() === 'en';
    var hubBtn = document.createElement('a');
    hubBtn.href = isEn ? 'https://parklawyers.com.au/links/' : 'https://parklawyers.com.au/links/?lang=ko';
    hubBtn.target = '_blank';
    hubBtn.rel = 'noopener';
    hubBtn.setAttribute('data-parkco-secondary-hub', '1');
    hubBtn.className = primaryEl.className
      ? primaryEl.className.replace(/\bbtn-burgundy\b|\bbtn-primary\b|\bcta-btn-primary\b/g, '').trim() + ' btn-outline'
      : 'btn btn-outline';
    hubBtn.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:10px 14px;border:1px solid currentColor;border-radius:6px;text-decoration:none;font-weight:600;font-size:0.9rem;';
    hubBtn.textContent = isEn ? 'Official Inquiry Hub (All Links) ↗' : '공식 문의 허브 (전체 링크) ↗';
    primaryEl.insertAdjacentElement('afterend', hubBtn);
  }

  function upgradeNavigatorCtas() {
    rewriteDeadJotformLinks();

    // 1. Upgrade FAQ Detail Page interactive checklists & direct Jotform button
    var faqCard = document.querySelector('article.faq-detail-article');
    if (faqCard) {
      var lis = faqCard.querySelectorAll('.checklist-ul li');
      for (var i = 0; i < lis.length; i++) {
        (function (li) {
          if (li.getAttribute('data-parkco-chk-init')) return;
          li.setAttribute('data-parkco-chk-init', '1');
          li.setAttribute('data-checked', '0');
          li.style.cursor = 'pointer';
          var box = li.querySelector('.checklist-box');
          if (box) {
            box.textContent = '☐';
            box.style.fontWeight = '700';
          }
          li.addEventListener('click', function () {
            var checked = li.getAttribute('data-checked') === '1';
            li.setAttribute('data-checked', checked ? '0' : '1');
            if (box) box.textContent = checked ? '☐' : '☑';
            li.style.opacity = checked ? '1' : '0.88';
          });
        })(lis[i]);
      }
    }

    var faqJfBtns = document.querySelectorAll('[data-parkco-faq-jotform="1"]');
    for (var j = 0; j < faqJfBtns.length; j++) {
      (function (btn) {
        if (btn.getAttribute('data-parkco-bound')) return;
        btn.setAttribute('data-parkco-bound', '1');
        btn.addEventListener('click', function (ev) {
          ev.preventDefault();
          var pa = btn.getAttribute('data-practice') || '';
          var lang = btn.getAttribute('data-lang') || detectLang();
          openPrefilledJotform({ lang: lang, hint: pa });
        });
      })(faqJfBtns[j]);
    }

    // 2. Upgrade Navigator Primary Consultation CTA buttons & links
    var navCtaSelectors = [
      '#btn-inquiry-consult',
      '#btn-copy-and-book',
      'a.consult-cta-btn[href*="parklawyers.com.au/links"]',
      'a.btn-consult[href*="parklawyers.com.au/links"]',
      'a.cta-primary[href*="parklawyers.com.au/links"]',
      '.handoff-actions a[href*="parklawyers.com.au/links"]',
      '.consult-actions a[href*="parklawyers.com.au/links"]',
      '.brief-actions a[href*="parklawyers.com.au/links"]'
    ];
    var navBtns = document.querySelectorAll(navCtaSelectors.join(','));
    for (var k = 0; k < navBtns.length; k++) {
      (function (btn) {
        if (btn.getAttribute('data-parkco-upgraded')) return;
        btn.setAttribute('data-parkco-upgraded', '1');
        ensureSecondaryHubButton(btn);
        btn.addEventListener('click', function (ev) {
          ev.preventDefault();
          ev.stopPropagation();
          openPrefilledJotform({});
        });
      })(navBtns[k]);
    }

    // 3. Inject a Direct Prefilled Jotform Primary Button beside email-only brief buttons on navigators
    var emailBriefBtns = document.querySelectorAll('#btn-crisis-email, #btn-sid-email, #btn-gsm-email, #btn-pv-mailto, #btn-prefill-email, #btn-emp-mailto, #btn-fam-mailto');
    for (var m = 0; m < emailBriefBtns.length; m++) {
      (function (emailBtn) {
        if (!emailBtn || !emailBtn.parentElement || emailBtn.parentElement.querySelector('[data-parkco-injected-jf="1"]')) return;
        var isEn = detectLang() === 'en';
        var jfBtn = document.createElement('button');
        jfBtn.type = 'button';
        jfBtn.setAttribute('data-parkco-injected-jf', '1');
        jfBtn.className = emailBtn.className || 'btn btn-burgundy';
        jfBtn.textContent = isEn
          ? '📝 Open Prefilled Official Enquiry Form (Jotform) ↗'
          : '📝 진단 결과 자동입력 · 공식 문의폼(Jotform) 바로 열기 ↗';
        jfBtn.addEventListener('click', function () {
          openPrefilledJotform({});
        });
        emailBtn.parentElement.insertBefore(jfBtn, emailBtn);
        ensureSecondaryHubButton(emailBtn);
      })(emailBriefBtns[m]);
    }
  }

  // Intercept cross-navigator & Jotform link clicks so shared profile parameters and handoff tokens travel seamlessly
  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('220391121528851') >= 0) {
      href = href.replace('220391121528851', '262833157380863');
      a.setAttribute('href', href);
    }
    var u;
    try { u = new URL(a.href, location.href); } catch (_) { return; }
    if (u.hostname.indexOf('jotform.com') >= 0) {
      ensureSecondaryHubButton(a);
      var mForm = u.pathname.match(/\/(\d{12,20})\b/);
      if (mForm && !u.searchParams.has('pk_enriched')) {
        var rawInputs = scrapePageInputs();
        var existingBrief = u.searchParams.get('adverseAndPriorHistory') || u.searchParams.get('detailedDescription14') || u.searchParams.get('input12') || '';
        var brief = existingBrief || extractLiveBriefText();
        var built = buildJotformUrl(mForm[1], {}, brief);
        if (built && built.url) {
          var mergedUrl = new URL(built.url);
          u.searchParams.forEach(function (val, key) {
            if (!val) return;
            if (key === 'adverseAndPriorHistory' || key === 'detailedDescription14' || key === 'input12') return;
            if (!mergedUrl.searchParams.get(key)) {
              mergedUrl.searchParams.set(key, val);
            }
          });
          mergedUrl.searchParams.set('pk_enriched', '1');
          sendHandoffBeacon(built, rawInputs);
          a.href = mergedUrl.toString();
        }
      }
      return;
    }
    if (u.hostname === 'changa9090.github.io' || u.hostname === 'faq.immispecialist.com') {
      if (u.origin === location.origin && u.pathname === location.pathname) return;
      scrapePageInputs();
      var prof = loadSharedProfile();
      var ctxStr = encodeCtxParam(prof);
      if (ctxStr && !u.searchParams.has('pk_ctx')) {
        u.searchParams.set('pk_ctx', ctxStr);
        a.href = u.toString();
      }
    }
  }, true);

  function init() {
    ingestUrlProfile();
    hydratePageInputsFromProfile();
    upgradeNavigatorCtas();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  window.ParkCoHandoff = {
    version: '1.0.0',
    JOTFORM_REGISTRY: JOTFORM_REGISTRY,
    getOrCreateToken: getOrCreateToken,
    loadSharedProfile: loadSharedProfile,
    saveSharedProfile: saveSharedProfile,
    scrapePageInputs: scrapePageInputs,
    extractLiveBriefText: extractLiveBriefText,
    buildJotformUrl: buildJotformUrl,
    openPrefilledJotform: openPrefilledJotform,
    upgradeNavigatorCtas: upgradeNavigatorCtas
  };
})();
