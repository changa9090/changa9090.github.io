/**
 * Park & Co Lawyers — Canonical Australian Statutory Date & Public Holiday Utility (2026–2027)
 * Eliminates UTC `.toISOString()` midnight shift bugs across AEST/AEDT/KST timezones and
 * applies state-specific public holidays for working-day counts and s 36(2) rollovers.
 */
(function (root) {
  "use strict";

  var NATIONAL_HOLIDAYS = {
    "2026-01-01": "New Year's Day",
    "2026-01-26": "Australia Day",
    "2026-04-03": "Good Friday",
    "2026-04-06": "Easter Monday",
    "2026-12-25": "Christmas Day",
    "2026-12-28": "Boxing Day (Additional Day)",
    "2027-01-01": "New Year's Day",
    "2027-01-26": "Australia Day",
    "2027-03-26": "Good Friday",
    "2027-03-29": "Easter Monday",
    "2027-04-26": "Anzac Day (Observed)",
    "2027-12-27": "Christmas Day (Additional Day)",
    "2027-12-28": "Boxing Day (Additional Day)"
  };

  var STATE_HOLIDAYS = {
    QLD: {
      "2026-04-04": "Easter Saturday",
      "2026-04-25": "Anzac Day",
      "2026-05-04": "Labour Day (QLD)",
      "2026-10-05": "King's Birthday (QLD)",
      "2027-05-03": "Labour Day (QLD)",
      "2027-10-04": "King's Birthday (QLD)"
    },
    NSW: {
      "2026-04-25": "Anzac Day",
      "2026-06-08": "King's Birthday (NSW)",
      "2026-10-05": "Labour Day (NSW)",
      "2027-06-14": "King's Birthday (NSW)",
      "2027-10-04": "Labour Day (NSW)"
    },
    VIC: {
      "2026-03-09": "Labour Day (VIC)",
      "2026-04-25": "Anzac Day",
      "2026-06-08": "King's Birthday (VIC)",
      "2026-11-03": "Melbourne Cup Day (VIC)",
      "2027-03-08": "Labour Day (VIC)",
      "2027-06-14": "King's Birthday (VIC)",
      "2027-11-02": "Melbourne Cup Day (VIC)"
    },
    WA: {
      "2026-03-02": "Labour Day (WA)",
      "2026-04-27": "Anzac Day (Observed WA)",
      "2026-06-01": "Western Australia Day",
      "2026-09-28": "King's Birthday (WA)",
      "2027-03-01": "Labour Day (WA)",
      "2027-06-07": "Western Australia Day",
      "2027-09-27": "King's Birthday (WA)"
    },
    SA: {
      "2026-03-09": "Adelaide Cup Day (SA)",
      "2026-04-25": "Anzac Day",
      "2026-06-08": "King's Birthday (SA)",
      "2026-10-05": "Labour Day (SA)",
      "2027-03-08": "Adelaide Cup Day (SA)",
      "2027-06-14": "King's Birthday (SA)",
      "2027-10-04": "Labour Day (SA)"
    },
    TAS: {
      "2026-03-09": "Eight Hours Day (TAS)",
      "2026-04-25": "Anzac Day",
      "2026-06-08": "King's Birthday (TAS)",
      "2027-03-08": "Eight Hours Day (TAS)",
      "2027-06-14": "King's Birthday (TAS)"
    },
    ACT: {
      "2026-03-09": "Canberra Day (ACT)",
      "2026-04-27": "Anzac Day (Observed ACT)",
      "2026-06-01": "Reconciliation Day (ACT)",
      "2026-06-08": "King's Birthday (ACT)",
      "2026-10-05": "Labour Day (ACT)",
      "2027-03-08": "Canberra Day (ACT)",
      "2027-05-31": "Reconciliation Day (ACT)",
      "2027-06-14": "King's Birthday (ACT)",
      "2027-10-04": "Labour Day (ACT)"
    },
    NT: {
      "2026-05-04": "May Day (NT)",
      "2026-06-08": "King's Birthday (NT)",
      "2026-08-03": "Picnic Day (NT)",
      "2027-05-03": "May Day (NT)",
      "2027-06-14": "King's Birthday (NT)",
      "2027-08-02": "Picnic Day (NT)"
    }
  };

  function pad2(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function parseIsoLocal(isoStr) {
    if (!isoStr || typeof isoStr !== "string") return null;
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoStr.trim());
    if (!m) return null;
    var y = parseInt(m[1], 10);
    var mo = parseInt(m[2], 10) - 1;
    var dy = parseInt(m[3], 10);
    var d = new Date(y, mo, dy, 12, 0, 0, 0);
    if (d.getFullYear() !== y || d.getMonth() !== mo || d.getDate() !== dy) return null;
    return d;
  }

  function formatIsoLocal(d) {
    if (!d || isNaN(d.getTime())) return "-";
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  }

  function todayBrisbaneIso() {
    try {
      var parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Australia/Brisbane",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).formatToParts(new Date());
      var map = {};
      for (var i = 0; i < parts.length; i++) map[parts[i].type] = parts[i].value;
      if (map.year && map.month && map.day) return map.year + "-" + map.month + "-" + map.day;
    } catch (_) {}
    return formatIsoLocal(new Date());
  }

  function getHolidayName(isoStr, stateCode) {
    var st = (stateCode || "QLD").toUpperCase();
    if (NATIONAL_HOLIDAYS[isoStr]) return NATIONAL_HOLIDAYS[isoStr];
    if (STATE_HOLIDAYS[st] && STATE_HOLIDAYS[st][isoStr]) return STATE_HOLIDAYS[st][isoStr];
    return null;
  }

  function isBusinessDay(d, stateCode) {
    var dow = d.getDay();
    if (dow === 0 || dow === 6) return false;
    var iso = formatIsoLocal(d);
    return !getHolidayName(iso, stateCode);
  }

  function addCalendarDays(d, days) {
    var next = new Date(d.getFullYear(), d.getMonth(), d.getDate() + days, 12, 0, 0, 0);
    return next;
  }

  function calcWorkingDaysDeadline(startIso, workingDays, stateCode) {
    var start = parseIsoLocal(startIso);
    if (!start) return null;
    var st = (stateCode || "QLD").toUpperCase();
    var cur = new Date(start.getTime());
    var added = 0;
    var skippedHolidays = [];
    while (added < workingDays) {
      cur = addCalendarDays(cur, 1);
      var dow = cur.getDay();
      var iso = formatIsoLocal(cur);
      var hName = getHolidayName(iso, st);
      if (dow !== 0 && dow !== 6) {
        if (hName) {
          skippedHolidays.push({ date: iso, name: hName });
        } else {
          added += 1;
        }
      }
    }
    var safe = addCalendarDays(cur, -1);
    while (safe > start && !isBusinessDay(safe, st)) {
      safe = addCalendarDays(safe, -1);
    }
    return {
      statutoryDate: formatIsoLocal(cur),
      safeDate: formatIsoLocal(safe),
      state: st,
      skippedHolidays: skippedHolidays
    };
  }

  function calcCalendarDaysDeadline(startIso, calendarDays, stateCode, rolloverToNextBusinessDay) {
    var start = parseIsoLocal(startIso);
    if (!start) return null;
    var st = (stateCode || "QLD").toUpperCase();
    var raw = addCalendarDays(start, calendarDays);
    var finalDate = new Date(raw.getTime());
    var rolledReason = null;
    if (rolloverToNextBusinessDay) {
      var reasons = [];
      while (!isBusinessDay(finalDate, st)) {
        var iso = formatIsoLocal(finalDate);
        var hName = getHolidayName(iso, st);
        var dow = finalDate.getDay();
        if (hName) reasons.push(hName);
        else if (dow === 6) reasons.push("Saturday");
        else if (dow === 0) reasons.push("Sunday");
        finalDate = addCalendarDays(finalDate, 1);
      }
      if (reasons.length > 0) rolledReason = reasons.join(" / ");
    }
    var safe = addCalendarDays(finalDate, -1);
    return {
      rawDate: formatIsoLocal(raw),
      statutoryDate: formatIsoLocal(finalDate),
      safeDate: formatIsoLocal(safe),
      state: st,
      rolledReason: rolledReason
    };
  }

  function diffDaysFromTodayBrisbane(targetIso) {
    var t = parseIsoLocal(targetIso);
    var now = parseIsoLocal(todayBrisbaneIso());
    if (!t || !now) return 0;
    return Math.round((t.getTime() - now.getTime()) / 86400000);
  }

  var api = {
    parseIsoLocal: parseIsoLocal,
    formatIsoLocal: formatIsoLocal,
    todayBrisbaneIso: todayBrisbaneIso,
    getHolidayName: getHolidayName,
    isBusinessDay: isBusinessDay,
    calcWorkingDaysDeadline: calcWorkingDaysDeadline,
    calcCalendarDaysDeadline: calcCalendarDaysDeadline,
    diffDaysFromTodayBrisbane: diffDaysFromTodayBrisbane
  };

  root.ParkCoDates = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof window !== "undefined" ? window : globalThis);
