/* Resilient Visit Counters + Daily Chart (hub-hist-v1) + Privacy-Safe Referral Channels v2.1 */
(function () {
  var NS = 'changa9090.github.io', API = 'https://abacus.jasoncameron.dev/', START = '2026-10-20';
  var SELF_PATH = '/';
  var IS_PROD = (location.hostname === 'changa9090.github.io');
  var P = 'hub' + (IS_PROD ? '' : '-dev');
  var BASE_P = 'hub';
  var LEGACY_TOTAL = IS_PROD ? 116 : 0;
  var LEGACY_VIS = IS_PROD ? 89 : 0;
  var CACHE_KEY = P + '-counts-cache-v1';
  var HIST_KEY = P + '-hist-v1';
  var REF_BUCKETS = [
    { id: 'naver-search', ko: '네이버 통합·웹검색', en: 'Naver Search' },
    { id: 'naver-cafe', ko: '네이버 카페 (호주이민 사랑방 등)', en: 'Naver Cafe' },
    { id: 'kakaotalk', ko: '카카오톡 공유·오픈채팅', en: 'KakaoTalk In-App / Share' },
    { id: 'google', ko: '구글 검색 (Google)', en: 'Google Search' },
    { id: 'threads-ig', ko: '스레드 · 인스타그램', en: 'Threads & Instagram' },
    { id: 'youtube', ko: '유튜브 (@immispecialist 등)', en: 'YouTube' },
    { id: 'faq-portal', ko: '박앤코 이민 FAQ 백과', en: 'Park & Co FAQ Portal' },
    { id: 'diy-guide', ko: '박앤코 셀프 법률·비용절감 가이드', en: 'Park & Co DIY Legal Guide' },
    { id: 'parkco-hub', ko: '박앤코 법률·비자 허브 · 내비게이터', en: 'Park & Co Legal Hub & Navigators' },
    { id: 'parkco-sites', ko: '박앤코 공식 홈페이지 · 블로그', en: 'Park & Co Website & Blog' },
    { id: 'other-web', ko: '기타 외부 웹사이트·커뮤니티', en: 'Other External Referrers' },
    { id: 'direct', ko: '직접 접속 · 북마크 · 개인 공유', en: 'Direct / Bookmark / Private Link' }
  ];
  var SHARE_CHANNELS = [
    { ref: 'cafe', ko: '네이버 카페', en: 'Naver Cafe' },
    { ref: 'kakao', ko: '카카오톡', en: 'KakaoTalk' },
    { ref: 'threads', ko: '스레드·인스타', en: 'Threads / IG' },
    { ref: 'youtube', ko: '유튜브', en: 'YouTube' },
    { ref: 'blog', ko: '블로그', en: 'Blog' }
  ];
  var box = document.getElementById('visit-counter');
  if (!box) return;

  function uiLang() {
    var bLang = document.body && (document.body.getAttribute('data-ui-lang') || document.body.getAttribute('data-lang'));
    if (bLang === 'en' || bLang === 'ko') return bLang;
    var hLang = (document.documentElement && document.documentElement.getAttribute('lang')) || '';
    if (hLang.toLowerCase().indexOf('en') === 0) return 'en';
    if (hLang.toLowerCase().indexOf('ko') === 0) return 'ko';
    try {
      var q = new URLSearchParams(location.search || '').get('lang');
      if (q === 'en') return 'en';
    } catch (e) {}
    return 'ko';
  }

  function isSelfPath(p) {
    var clean = (p || '/').toLowerCase();
    if (SELF_PATH === '/') {
      return clean === '/' || clean === '/index.html';
    }
    return clean === SELF_PATH || clean.indexOf(SELF_PATH + '/') === 0;
  }

  function syncCounterLang() {
    var en = uiLang() === 'en';
    var lt = document.getElementById('vc-lbl-total');
    var ld = document.getElementById('vc-lbl-today');
    var lv = document.getElementById('vc-lbl-visitors');
    if (lt) lt.textContent = en ? 'Total visits' : '누적 방문';
    if (ld) ld.textContent = en ? 'Today' : '오늘 방문';
    if (lv) lv.textContent = en ? 'Visitors' : '방문자';
    box.title = en
      ? 'Click for daily visits & referral sources'
      : '클릭하면 일별 방문 추이와 유입 경로를 확인할 수 있습니다';
    var mt = document.getElementById('vc-modal-title');
    if (mt) {
      mt.innerHTML = en
        ? 'Daily Visits &amp; Referral Sources <small>(Brisbane time)</small>'
        : '일별 방문 추이 · 유입 경로 <small>(브리즈번 시간 기준)</small>';
    }
  }
  syncCounterLang();
  if (typeof MutationObserver !== 'undefined') {
    try {
      var mo = new MutationObserver(syncCounterLang);
      if (document.documentElement) mo.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'data-lang'] });
      if (document.body) mo.observe(document.body, { attributes: true, attributeFilter: ['data-ui-lang', 'data-lang', 'class'] });
    } catch (e) {}
  }

  /* Preserve cross-system referral attribution across changa9090.github.io & faq.immispecialist.com */
  document.addEventListener('click', function (ev) {
    try {
      var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
      if (!a) return;
      var raw = a.getAttribute('href') || '';
      if (!raw || raw.charAt(0) === '#') return;
      var u = new URL(a.href, location.href);
      if (u.protocol !== 'http:' && u.protocol !== 'https:') return;
      var th = (u.hostname || '').toLowerCase();
      var tp = (u.pathname || '/').toLowerCase();
      if (th !== 'changa9090.github.io' && th !== 'faq.immispecialist.com') return;
      if (th === location.hostname && isSelfPath(tp)) return;
      if (!u.searchParams.get('ref') && !u.searchParams.get('utm_source')) {
        u.searchParams.set('ref', BASE_P);
        a.href = u.toString();
      }
    } catch (e) {}
  }, true);

  function bne(d) { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Brisbane' }).format(d); }
  var today = bne(new Date()), day = today.replace(/-/g, '');
  var seen = false, lastDay = null, lastRefDay = null, cached = {};
  try {
    seen = !!localStorage.getItem(P + '-seen');
    lastDay = localStorage.getItem(P + '-day');
    lastRefDay = localStorage.getItem(P + '-ref-day');
    cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}') || {};
  } catch (e) {}

  var liveTodayViews = (cached.day === day && typeof cached.today === 'number') ? cached.today : null;
  var liveTodayVis = (cached.day === day && typeof cached.todayVis === 'number') ? cached.todayVis : null;
  var liveRefHints = {};

  function classifyReferralBucket() {
    try {
      var qs = new URLSearchParams(location.search || '');
      var utm = (qs.get('utm_source') || qs.get('ref') || qs.get('channel') || '').toLowerCase().trim();
      if (utm) {
        if (utm.indexOf('cafe') >= 0) return 'naver-cafe';
        if (utm.indexOf('naver') >= 0) return 'naver-search';
        if (utm.indexOf('kakao') >= 0) return 'kakaotalk';
        if (utm.indexOf('google') >= 0) return 'google';
        if (utm.indexOf('thread') >= 0 || utm.indexOf('insta') >= 0 || utm === 'ig') return 'threads-ig';
        if (utm.indexOf('youtube') >= 0 || utm === 'yt') return 'youtube';
        if (utm.indexOf('faq') >= 0) return 'faq-portal';
        if (utm.indexOf('diy') >= 0) return 'diy-guide';
        if (utm.indexOf('blog') >= 0 || utm.indexOf('aussielife') >= 0 || utm.indexOf('parklawyers') >= 0 || utm === 'website') return 'parkco-sites';
        if (
          utm.indexOf('hub') >= 0 || utm.indexOf('guide') >= 0 || utm.indexOf('parkco') >= 0 ||
          utm.indexOf('vgpt') >= 0 || utm.indexOf('aumlt') >= 0 || utm.indexOf('dama') >= 0 ||
          utm.indexOf('whm') >= 0 || utm.indexOf('parent') >= 0 || utm.indexOf('gsm') >= 0 ||
          utm.indexOf('sid') >= 0 || utm.indexOf('crisis') >= 0 || utm.indexOf('partner') >= 0 ||
          utm.indexOf('employment') >= 0 || utm.indexOf('family') >= 0 || utm.indexOf('settlement') >= 0 ||
          utm.indexOf('intel') >= 0
        ) return 'parkco-hub';
        return 'other-web';
      }
      var ref = String(document.referrer || '').trim();
      var ua = String((navigator && navigator.userAgent) || '');
      if (ref) {
        if (ref.indexOf('android-app://com.google') === 0) return 'google';
        var u = new URL(ref);
        var h = (u.hostname || '').toLowerCase();
        var p = (u.pathname || '/').toLowerCase();
        if (h === location.hostname && (IS_PROD ? isSelfPath(p) : true)) {
          /* Same-app internal navigation; fall through to mobile UA / direct */
        } else if (h.indexOf('cafe.naver.') >= 0) {
          return 'naver-cafe';
        } else if (h.indexOf('naver.') >= 0) {
          return 'naver-search';
        } else if (h.indexOf('kakao.') >= 0 || h.indexOf('daum.') >= 0) {
          return 'kakaotalk';
        } else if (h.indexOf('google.') >= 0) {
          return 'google';
        } else if (h.indexOf('threads.') >= 0 || h.indexOf('instagram.') >= 0) {
          return 'threads-ig';
        } else if (h.indexOf('youtube.') >= 0 || h === 'youtu.be') {
          return 'youtube';
        } else if (h.indexOf('immispecialist.com') >= 0) {
          return 'faq-portal';
        } else if (h === 'changa9090.github.io' && p.indexOf('/diy-service-save-money') === 0) {
          return 'diy-guide';
        } else if (h === 'changa9090.github.io') {
          return 'parkco-hub';
        } else if (h.indexOf('aussielife.org') >= 0 || h.indexOf('parklawyers.com.au') >= 0 || h.indexOf('parkcolawyers.com') >= 0 || h.indexOf('hojuro.net') >= 0) {
          return 'parkco-sites';
        } else {
          return 'other-web';
        }
      }
      if (/KAKAOTALK/i.test(ua)) return 'kakaotalk';
      if (/NAVER\(inapp/i.test(ua)) return 'naver-search';
      if (/Barcelona|Threads|Instagram/i.test(ua)) return 'threads-ig';
    } catch (e) {}
    return 'direct';
  }

  function fmt(n) { return typeof n === 'number' && !isNaN(n) ? Number(n).toLocaleString('en-AU') : '-'; }

  function renderBadge(tot, tod, vis) {
    var elTot = document.getElementById('vc-total');
    var elTod = document.getElementById('vc-today');
    var elVis = document.getElementById('vc-visitors');
    if (tot != null && elTot) elTot.textContent = fmt(tot);
    if (tod != null && elTod) elTod.textContent = fmt(tod);
    if (vis != null && elVis) elVis.textContent = fmt(vis);
    if (tot != null || tod != null || vis != null) box.hidden = false;
  }

  var seedTot = Number(box.getAttribute('data-seed-total')) || LEGACY_TOTAL || 0;
  var seedVis = Number(box.getAttribute('data-seed-visitors')) || LEGACY_VIS || 0;
  var initTot = Math.max(cached.total || 0, seedTot) || null;
  var initVis = Math.max(cached.visitors || 0, seedVis) || null;
  if (initTot != null || initVis != null) {
    renderBadge(initTot, liveTodayViews, initVis);
  }

  /* 429-aware retry spanning >15s across retries to cleanly outlast Abacus 30;w=10 windows */
  function fetchRetry(url, isHit, attempt) {
    var tries = attempt || 0;
    var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 15000) : null;
    var opts = { mode: 'cors' };
    if (ctrl) opts.signal = ctrl.signal;
    if (isHit) opts.keepalive = true;
    return fetch(url, opts)
      .then(function (r) {
        if (timer) clearTimeout(timer);
        if (!isHit && r.status === 404) return { value: 0 };
        if (r.status === 429) {
          var err429 = new Error('HTTP 429');
          err429.isRateLimit = true;
          throw err429;
        }
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (j) {
        if (typeof j.value !== 'number') throw new Error('bad payload');
        return j.value;
      })
      .catch(function (err) {
        if (timer) clearTimeout(timer);
        var maxTries = (err && err.isRateLimit) ? 3 : 2;
        if (tries < maxTries) {
          var waitMs = (err && err.isRateLimit) ? (3800 + tries * 3600) : (1100 * (tries + 1));
          return new Promise(function (res) { setTimeout(res, waitMs); })
            .then(function () { return fetchRetry(url, isHit, tries + 1); });
        }
        throw err;
      });
  }

  function call(kind, key) {
    return fetchRetry(API + kind + '/' + NS + '/' + P + '-' + key, kind === 'hit', 0);
  }
  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  if (lastDay !== day) {
    call('hit', 'vday-' + day).then(function (v) {
      liveTodayVis = v;
      try {
        localStorage.setItem(P + '-day', day);
        var cur = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}') || {};
        cur.todayVis = v;
        cur.day = day;
        localStorage.setItem(CACHE_KEY, JSON.stringify(cur));
      } catch (e) {}
    }).catch(function () {});
  }

  if (lastRefDay !== day) {
    var refBucket = classifyReferralBucket();
    delay(220).then(function () {
      return call('hit', 'ref-' + refBucket + '-' + day);
    }).then(function (rv) {
      liveRefHints[refBucket] = rv;
      try {
        localStorage.setItem(P + '-ref-day', day);
        localStorage.setItem(P + '-ref-bucket', refBucket);
      } catch (e) {}
    }).catch(function () {});
  }

  Promise.allSettled([
    call('hit', 'total'),
    delay(80).then(function () { return call('hit', 'day-' + day); }),
    delay(160).then(function () {
      return call(seen ? 'get' : 'hit', 'visitors').then(function (val) {
        if (!seen) {
          try { localStorage.setItem(P + '-seen', '1'); } catch (e) {}
        }
        return val;
      });
    })
  ]).then(function (res) {
    var tot = res[0].status === 'fulfilled' ? (res[0].value + LEGACY_TOTAL) : initTot;
    var tod = res[1].status === 'fulfilled' ? res[1].value : liveTodayViews;
    var vis = res[2].status === 'fulfilled' ? (res[2].value + LEGACY_VIS) : initVis;
    if (typeof tod === 'number') liveTodayViews = tod;
    renderBadge(tot, tod, vis);
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        total: tot != null ? tot : initTot,
        today: tod != null ? tod : liveTodayViews,
        todayVis: liveTodayVis,
        visitors: vis != null ? vis : initVis,
        day: day
      }));
    } catch (e) {}
  });

  function lastDays(n) {
    var p = today.split('-').map(Number), base = Date.UTC(p[0], p[1] - 1, p[2]), out = [];
    for (var i = n - 1; i >= 0; i--) {
      var s = new Date(base - i * 864e5).toISOString().slice(0, 10);
      if (s >= START) out.push(s);
    }
    return out.length ? out : [today];
  }

  var activeRange = 7;
  var modal = document.createElement('div');
  modal.id = 'vc-modal';
  modal.innerHTML = '<div class="vc-dialog" role="dialog" aria-modal="true" aria-labelledby="vc-modal-title">' +
    '<button type="button" class="vc-close" aria-label="Close">&times;</button>' +
    '<h3 id="vc-modal-title"></h3>' +
    '<div class="vc-body">Loading&hellip;</div></div>';
  document.body.appendChild(modal);
  syncCounterLang();

  function close() { modal.classList.remove('open'); }
  modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
  modal.querySelector('.vc-close').addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  function copyShareLink(refCode, btnEl) {
    try {
      var u = new URL(location.href);
      u.searchParams.delete('utm_source');
      u.searchParams.set('ref', refCode);
      var text = u.toString();
      var done = function () {
        if (!btnEl) return;
        var prev = btnEl.getAttribute('data-orig') || btnEl.textContent;
        btnEl.setAttribute('data-orig', prev);
        btnEl.textContent = uiLang() === 'en' ? 'Copied ✓' : '복사됨 ✓';
        setTimeout(function () { btnEl.textContent = prev; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        done();
      }
    } catch (e) {}
  }

  modal.addEventListener('click', function (e) {
    var chip = e.target && e.target.closest ? e.target.closest('.vc-share-chip') : null;
    if (chip) {
      var rc = chip.getAttribute('data-ref-code');
      if (rc) copyShareLink(rc, chip);
      return;
    }
    var rbtn = e.target && e.target.closest ? e.target.closest('.vc-range-btn') : null;
    if (rbtn) {
      var nr = Number(rbtn.getAttribute('data-range')) || 7;
      if (nr !== activeRange) {
        activeRange = nr;
        loadAndRenderModal(false);
      }
    }
  });

  function renderShareBar(isEn) {
    var lbl = isEn
      ? 'Copy Tracked Referral Share Link (?ref=)'
      : '채널별 유입 측정 공유 링크 복사 (?ref=)';
    var chips = SHARE_CHANNELS.map(function (c) {
      var name = isEn ? c.en : c.ko;
      return '<button type="button" class="vc-share-chip" data-ref-code="' + c.ref + '">' +
        name + ' (?ref=' + c.ref + ')</button>';
    }).join('');
    return '<div id="vc-share-box" class="vc-share-box"><div class="vc-share-lbl">' + lbl +
      '</div><div class="vc-share-chips">' + chips + '</div></div>';
  }

  function renderToolbar(isEn, fullDaysLen) {
    if (fullDaysLen <= 7) return '';
    var b7 = '<button type="button" class="vc-range-btn' + (activeRange === 7 ? ' active' : '') + '" data-range="7">' +
      (isEn ? 'Last 7 days' : '최근 7일') + '</button>';
    var b30 = '<button type="button" class="vc-range-btn' + (activeRange === 30 ? ' active' : '') + '" data-range="30">' +
      (isEn ? 'Last 30 days' : '최근 30일') + '</button>';
    return '<div class="vc-toolbar"><div class="vc-range-tabs">' + b7 + b30 + '</div></div>';
  }

  function renderChartSvg(days, rows, isEn) {
    var W = 640, H = 240, L = 40, R = 12, T = 14, B = 38;
    var max = Math.max(1, Math.max.apply(null, rows.map(function (r) { return Math.max(r[0], r[1]); })));
    var step = (W - L - R) / days.length, bw = Math.min(36, Math.max(4, step * 0.6));
    var y = function (v) { return T + (H - T - B) * (1 - v / max); };
    var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="vc-svg" role="img" aria-label="Daily visits chart">';
    [0, 0.5, 1].forEach(function (f) {
      var v = Math.round(max * f), yy = y(v);
      svg += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + yy + '" y2="' + yy + '" class="vc-grid"/>' +
        '<text x="' + (L - 6) + '" y="' + (yy + 4) + '" class="vc-ylab">' + fmt(v) + '</text>';
    });
    var pts = [];
    days.forEach(function (d, i) {
      var cx = L + step * i + step / 2, views = rows[i][0], vis = rows[i][1];
      svg += '<rect x="' + (cx - bw / 2) + '" y="' + y(views) + '" width="' + bw + '" height="' +
        (H - B - y(views)) + '" class="vc-bar"><title>' + d + ': ' + fmt(views) + (isEn ? ' page views' : '회 조회') + '</title></rect>';
      pts.push(cx + ',' + y(vis));
      if (days.length <= 10 || i % Math.ceil(days.length / 8) === 0 || i === days.length - 1)
        svg += '<text x="' + cx + '" y="' + (H - B + 16) + '" class="vc-xlab">' + d.slice(5) + '</text>';
    });
    svg += '<polyline points="' + pts.join(' ') + '" class="vc-line"/>';
    pts.forEach(function (p, i) {
      var xy = p.split(',');
      svg += '<circle cx="' + xy[0] + '" cy="' + xy[1] + '" r="3.5" class="vc-dot"><title>' + days[i] + ': ' +
        fmt(rows[i][1]) + (isEn ? ' visitors' : '명 방문자') + '</title></circle>';
    });
    svg += '</svg>';
    var sum = rows.reduce(function (a, r) { return [a[0] + r[0], a[1] + r[1]]; }, [0, 0]);
    var summaryLine = isEn
      ? (days.length + ' day(s) &middot; ' + fmt(sum[0]) + ' page views &middot; ' + fmt(sum[1]) + ' daily visitors (since ' + START + '; 1 daily visitor per browser).')
      : ('표시 구간 ' + days.length + '일 합계 &middot; 페이지 조회 ' + fmt(sum[0]) + '회 &middot; 일별 순방문자 ' + fmt(sum[1]) + '명 (' + START + ' 집계 시작 &middot; 하루 브라우저당 1회)');
    return svg + '<div class="vc-legend"><span><i class="vc-k-bar"></i>' + (isEn ? 'Page views' : '페이지 조회') + '</span>' +
      '<span><i class="vc-k-line"></i>' + (isEn ? 'Daily visitors' : '일별 순방문자') + '</span></div>' +
      '<p class="vc-sum">' + summaryLine + '</p>';
  }

  function loadTodayReferrers(dayKey) {
    if (liveTodayViews === 0 && liveTodayVis === 0) {
      return Promise.resolve({});
    }
    var out = {};
    var remaining = [];
    REF_BUCKETS.forEach(function (b) {
      if (typeof liveRefHints[b.id] === 'number') {
        out[b.id] = liveRefHints[b.id];
      } else {
        remaining.push(b);
      }
    });
    var firstSlice = remaining.slice(0, 6);
    var secondSlice = remaining.slice(6);
    return Promise.all(firstSlice.map(function (b) {
      return call('get', 'ref-' + b.id + '-' + dayKey).catch(function () { return 0; }).then(function (v) { out[b.id] = v || 0; });
    })).then(function () {
      return secondSlice.length ? delay(260) : Promise.resolve();
    }).then(function () {
      return Promise.all(secondSlice.map(function (b) {
        return call('get', 'ref-' + b.id + '-' + dayKey).catch(function () { return 0; }).then(function (v) { out[b.id] = v || 0; });
      }));
    }).then(function () {
      return out;
    });
  }

  function renderReferrerBox(countsMap) {
    var isEn = uiLang() === 'en';
    var items = REF_BUCKETS.map(function (b) {
      return { id: b.id, label: isEn ? b.en : b.ko, count: countsMap[b.id] || 0 };
    }).filter(function (x) { return x.count > 0; }).sort(function (a, b) { return b.count - a.count; });
    var totalRef = items.reduce(function (acc, x) { return acc + x.count; }, 0);
    var head = '<div class="vc-ref-title"><span>' +
      (isEn ? ('Today&rsquo;s Referral Channels (' + today + ')') : ('오늘 유입 채널 분포 (' + today + ')')) +
      '</span><small>' + (isEn ? ('Tracked visitors: ' + fmt(totalRef)) : ('채널 집계 방문자: ' + fmt(totalRef) + '명')) + '</small></div>';
    if (!items.length) {
      return head + '<p class="vc-ref-note">' +
        (isEn
          ? 'Anonymous referral channel buckets (Naver, Cafe, KakaoTalk, Threads, Hub, Direct) are recorded once per browser per day as new visits arrive (zero personal or URL path data stored).'
          : '익명 유입 경로(검색·카페·카카오톡·스레드·허브 이동 등) 집계는 신규 방문부터 하루 브라우저당 1회씩 기록됩니다 (세부 URL·개인정보 미수집).') +
        '</p>';
    }
    var rowsHtml = items.map(function (item) {
      var pct = totalRef > 0 ? Math.round((item.count / totalRef) * 100) : 0;
      return '<div class="vc-ref-row">' +
        '<span class="vc-ref-name" title="' + item.label + '">' + item.label + '</span>' +
        '<div class="vc-ref-track"><div class="vc-ref-fill" style="width:' + Math.max(4, pct) + '%"></div></div>' +
        '<span class="vc-ref-val">' + fmt(item.count) + ' (' + pct + '%)</span>' +
        '</div>';
    }).join('');
    var note = isEn
      ? 'Privacy-safe coarse channel buckets only (1 per browser/day; zero IP, query string, or full referrer URL stored).'
      : '개인정보 보호형 채널 그룹 집계 (하루 브라우저당 1회 기준 &middot; 검색어·세부 URL·IP 미수집)';
    return head + '<div class="vc-ref-list">' + rowsHtml + '</div><p class="vc-ref-note">' + note + '</p>';
  }

  function loadHistoryRows(days) {
    var histCache = {};
    try { histCache = JSON.parse(localStorage.getItem(HIST_KEY) || '{}') || {}; } catch (e) {}
    var results = new Array(days.length);
    var pending = [];
    days.forEach(function (d, idx) {
      if (d < today && Array.isArray(histCache[d])) {
        results[idx] = histCache[d];
      } else if (d === today && typeof liveTodayViews === 'number' && typeof liveTodayVis === 'number') {
        results[idx] = [liveTodayViews, liveTodayVis];
      } else {
        pending.push({ d: d, idx: idx });
      }
    });

    var batchSize = pending.length > 7 ? 4 : 6;
    var pauseMs = pending.length > 7 ? 2900 : 180;
    var chain = Promise.resolve();
    for (var c = 0; c < pending.length; c += batchSize) {
      (function (slice, waitFirst) {
        chain = chain.then(function () {
          return (waitFirst ? delay(pauseMs) : Promise.resolve()).then(function () {
            return Promise.all(slice.map(function (item) {
              var k = item.d.replace(/-/g, '');
              var pViews = (item.d === today && typeof liveTodayViews === 'number')
                ? Promise.resolve(liveTodayViews)
                : call('get', 'day-' + k).catch(function () { return null; });
              var pVis = (item.d === today && typeof liveTodayVis === 'number')
                ? Promise.resolve(liveTodayVis)
                : call('get', 'vday-' + k).catch(function () { return null; });
              return Promise.all([pViews, pVis]).then(function (pair) {
                var v0 = pair[0] == null ? 0 : pair[0];
                var v1 = pair[1] == null ? 0 : pair[1];
                results[item.idx] = [v0, v1];
                if (item.d < today && pair[0] !== null && pair[1] !== null) {
                  histCache[item.d] = [v0, v1];
                }
              });
            }));
          });
        });
      })(pending.slice(c, c + batchSize), c > 0);
    }
    return chain.then(function () {
      try { localStorage.setItem(HIST_KEY, JSON.stringify(histCache)); } catch (e) {}
      return results.map(function (r) { return r || [0, 0]; });
    });
  }

  var cachedRefMap = null;

  function loadAndRenderModal(refreshRefs) {
    syncCounterLang();
    var isEn = uiLang() === 'en';
    var fullDays = lastDays(30);
    var days = activeRange === 7 ? lastDays(7) : fullDays;
    var body = modal.querySelector('.vc-body');
    var chartWaitMsg = isEn ? 'Loading daily statistics&hellip;' : '일별 통계를 불러오는 중입니다&hellip;';
    var refWaitMsg = isEn ? 'Loading today&rsquo;s referral channels&hellip;' : '오늘 유입 채널 집계를 불러오는 중입니다&hellip;';
    var existingRefHtml = (!refreshRefs && cachedRefMap) ? renderReferrerBox(cachedRefMap) : ('<div class="vc-ref-note">' + refWaitMsg + '</div>');

    /* Render toolbar, loading placeholder, referral box, and 1-click share bar IMMEDIATELY (0ms) */
    body.innerHTML = renderToolbar(isEn, fullDays.length) +
      '<div id="vc-chart-slot"><p class="vc-sum">' + chartWaitMsg + '</p></div>' +
      '<div id="vc-ref-box" class="vc-ref-box">' + existingRefHtml + '</div>' +
      renderShareBar(isEn);

    loadHistoryRows(days)
      .then(function (rows) {
        var slot = document.getElementById('vc-chart-slot');
        if (slot) slot.innerHTML = renderChartSvg(days, rows, uiLang() === 'en');
        if (!refreshRefs && cachedRefMap) return cachedRefMap;
        return delay(180).then(function () { return loadTodayReferrers(day); });
      })
      .then(function (refMap) {
        if (refMap) cachedRefMap = refMap;
        var refBox = document.getElementById('vc-ref-box');
        if (refBox && refMap) refBox.innerHTML = renderReferrerBox(refMap);
      })
      .catch(function () {
        var slot = document.getElementById('vc-chart-slot');
        if (slot && !slot.querySelector('svg')) {
          slot.textContent = uiLang() === 'en' ? 'Could not load the chart.' : '그래프를 불러오지 못했습니다.';
        }
      });
  }

  function open() {
    activeRange = 7;
    modal.classList.add('open');
    loadAndRenderModal(true);
  }
  box.setAttribute('role', 'button');
  box.setAttribute('tabindex', '0');
  box.addEventListener('click', open);
  box.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
})();
