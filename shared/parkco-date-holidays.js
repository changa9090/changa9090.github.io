/**
 * Park & Co Lawyers — Canonical Australian Statutory Date & Public Holiday Utility (2026–2030+)
 * Eliminates UTC `.toISOString()` midnight shift bugs across AEST/AEDT/KST timezones,
 * computes movable Easter dates via Anonymous Gregorian Computus for any year, and
 * applies all 8 state/territory public holidays for working-day counts and s 36(2) rollovers.
 */
(function (root) {
  "use strict";

  var NATIONAL_HOLIDAYS = {
    // 2026
    "2026-01-01": "New Year's Day",
    "2026-01-26": "Australia Day",
    "2026-04-03": "Good Friday",
    "2026-04-06": "Easter Monday",
    "2026-12-25": "Christmas Day",
    "2026-12-28": "Boxing Day (Additional Day)",
    // 2027
    "2027-01-01": "New Year's Day",
    "2027-01-26": "Australia Day",
    "2027-03-26": "Good Friday",
    "2027-03-29": "Easter Monday",
    "2027-12-25": "Christmas Day",
    "2027-12-27": "Christmas Day (Additional Day)",
    "2027-12-28": "Boxing Day (Additional Day)",
    // 2028
    "2028-01-01": "New Year's Day",
    "2028-01-03": "New Year's Day (Additional Day)",
    "2028-01-26": "Australia Day",
    "2028-04-14": "Good Friday",
    "2028-04-17": "Easter Monday",
    "2028-04-25": "Anzac Day",
    "2028-12-25": "Christmas Day",
    "2028-12-26": "Boxing Day",
    // 2029
    "2029-01-01": "New Year's Day",
    "2029-01-26": "Australia Day",
    "2029-03-30": "Good Friday",
    "2029-04-02": "Easter Monday",
    "2029-04-25": "Anzac Day",
    "2029-12-25": "Christmas Day",
    "2029-12-26": "Boxing Day",
    // 2030
    "2030-01-01": "New Year's Day",
    "2030-01-26": "Australia Day",
    "2030-01-28": "Australia Day (Additional Day)",
    "2030-04-19": "Good Friday",
    "2030-04-22": "Easter Monday",
    "2030-04-25": "Anzac Day",
    "2030-12-25": "Christmas Day",
    "2030-12-26": "Boxing Day"
  };

  var STATE_HOLIDAYS = {
    QLD: {
      "2026-04-04": "Easter Saturday",
      "2026-04-05": "Easter Sunday",
      "2026-04-25": "Anzac Day",
      "2026-05-04": "Labour Day (QLD)",
      "2026-08-12": "Royal Queensland Show (Brisbane)",
      "2026-10-05": "King's Birthday (QLD)",
      "2027-03-27": "Easter Saturday",
      "2027-03-28": "Easter Sunday",
      "2027-04-25": "Anzac Day",
      "2027-04-26": "Anzac Day (Observed QLD)",
      "2027-05-03": "Labour Day (QLD)",
      "2027-08-11": "Royal Queensland Show (Brisbane)",
      "2027-10-04": "King's Birthday (QLD)",
      "2028-04-15": "Easter Saturday",
      "2028-04-16": "Easter Sunday",
      "2028-05-01": "Labour Day (QLD)",
      "2028-08-16": "Royal Queensland Show (Brisbane)",
      "2028-10-02": "King's Birthday (QLD)",
      "2029-03-31": "Easter Saturday",
      "2029-04-01": "Easter Sunday",
      "2029-05-07": "Labour Day (QLD)",
      "2029-08-15": "Royal Queensland Show (Brisbane)",
      "2029-10-01": "King's Birthday (QLD)",
      "2030-04-20": "Easter Saturday",
      "2030-04-21": "Easter Sunday",
      "2030-05-06": "Labour Day (QLD)",
      "2030-08-14": "Royal Queensland Show (Brisbane)",
      "2030-10-07": "King's Birthday (QLD)"
    },
    NSW: {
      "2026-04-04": "Easter Saturday",
      "2026-04-05": "Easter Sunday",
      "2026-04-25": "Anzac Day",
      "2026-06-08": "King's Birthday (NSW)",
      "2026-10-05": "Labour Day (NSW)",
      "2027-03-27": "Easter Saturday",
      "2027-03-28": "Easter Sunday",
      "2027-04-25": "Anzac Day",
      "2027-06-14": "King's Birthday (NSW)",
      "2027-10-04": "Labour Day (NSW)",
      "2028-04-15": "Easter Saturday",
      "2028-04-16": "Easter Sunday",
      "2028-06-12": "King's Birthday (NSW)",
      "2028-10-02": "Labour Day (NSW)",
      "2029-03-31": "Easter Saturday",
      "2029-04-01": "Easter Sunday",
      "2029-06-11": "King's Birthday (NSW)",
      "2029-10-01": "Labour Day (NSW)",
      "2030-04-20": "Easter Saturday",
      "2030-04-21": "Easter Sunday",
      "2030-06-10": "King's Birthday (NSW)",
      "2030-10-07": "Labour Day (NSW)"
    },
    VIC: {
      "2026-03-09": "Labour Day (VIC)",
      "2026-04-04": "Easter Saturday",
      "2026-04-05": "Easter Sunday",
      "2026-04-25": "Anzac Day",
      "2026-06-08": "King's Birthday (VIC)",
      "2026-09-25": "Friday before AFL Grand Final (VIC)",
      "2026-11-03": "Melbourne Cup Day (VIC)",
      "2027-03-08": "Labour Day (VIC)",
      "2027-03-27": "Easter Saturday",
      "2027-03-28": "Easter Sunday",
      "2027-04-25": "Anzac Day",
      "2027-06-14": "King's Birthday (VIC)",
      "2027-09-24": "Friday before AFL Grand Final (VIC)",
      "2027-11-02": "Melbourne Cup Day (VIC)",
      "2028-03-13": "Labour Day (VIC)",
      "2028-04-15": "Easter Saturday",
      "2028-04-16": "Easter Sunday",
      "2028-06-12": "King's Birthday (VIC)",
      "2028-09-29": "Friday before AFL Grand Final (VIC)",
      "2028-11-07": "Melbourne Cup Day (VIC)",
      "2029-03-12": "Labour Day (VIC)",
      "2029-03-31": "Easter Saturday",
      "2029-04-01": "Easter Sunday",
      "2029-06-11": "King's Birthday (VIC)",
      "2029-09-28": "Friday before AFL Grand Final (VIC)",
      "2029-11-06": "Melbourne Cup Day (VIC)",
      "2030-03-11": "Labour Day (VIC)",
      "2030-04-20": "Easter Saturday",
      "2030-04-21": "Easter Sunday",
      "2030-06-10": "King's Birthday (VIC)",
      "2030-09-27": "Friday before AFL Grand Final (VIC)",
      "2030-11-05": "Melbourne Cup Day (VIC)"
    },
    WA: {
      "2026-03-02": "Labour Day (WA)",
      "2026-04-05": "Easter Sunday",
      "2026-04-25": "Anzac Day",
      "2026-04-27": "Anzac Day (Observed WA)",
      "2026-06-01": "Western Australia Day",
      "2026-09-28": "King's Birthday (WA)",
      "2027-03-01": "Labour Day (WA)",
      "2027-03-28": "Easter Sunday",
      "2027-04-25": "Anzac Day",
      "2027-04-26": "Anzac Day (Observed WA)",
      "2027-06-07": "Western Australia Day",
      "2027-09-27": "King's Birthday (WA)",
      "2028-03-06": "Labour Day (WA)",
      "2028-04-16": "Easter Sunday",
      "2028-06-05": "Western Australia Day",
      "2028-09-25": "King's Birthday (WA)",
      "2029-03-05": "Labour Day (WA)",
      "2029-04-01": "Easter Sunday",
      "2029-06-04": "Western Australia Day",
      "2029-09-24": "King's Birthday (WA)",
      "2030-03-04": "Labour Day (WA)",
      "2030-04-21": "Easter Sunday",
      "2030-06-03": "Western Australia Day",
      "2030-09-30": "King's Birthday (WA)"
    },
    SA: {
      "2026-03-09": "Adelaide Cup Day (SA)",
      "2026-04-04": "Easter Saturday",
      "2026-04-25": "Anzac Day",
      "2026-06-08": "King's Birthday (SA)",
      "2026-10-05": "Labour Day (SA)",
      "2027-03-08": "Adelaide Cup Day (SA)",
      "2027-03-27": "Easter Saturday",
      "2027-04-26": "Anzac Day (Observed SA)",
      "2027-06-14": "King's Birthday (SA)",
      "2027-10-04": "Labour Day (SA)",
      "2028-03-13": "Adelaide Cup Day (SA)",
      "2028-04-15": "Easter Saturday",
      "2028-06-12": "King's Birthday (SA)",
      "2028-10-02": "Labour Day (SA)",
      "2029-03-12": "Adelaide Cup Day (SA)",
      "2029-03-31": "Easter Saturday",
      "2029-06-11": "King's Birthday (SA)",
      "2029-10-01": "Labour Day (SA)",
      "2030-03-11": "Adelaide Cup Day (SA)",
      "2030-04-20": "Easter Saturday",
      "2030-06-10": "King's Birthday (SA)",
      "2030-10-07": "Labour Day (SA)"
    },
    TAS: {
      "2026-03-09": "Eight Hours Day (TAS)",
      "2026-04-07": "Easter Tuesday (TAS Public Service)",
      "2026-04-25": "Anzac Day",
      "2026-06-08": "King's Birthday (TAS)",
      "2027-03-08": "Eight Hours Day (TAS)",
      "2027-03-30": "Easter Tuesday (TAS Public Service)",
      "2027-04-25": "Anzac Day",
      "2027-06-14": "King's Birthday (TAS)",
      "2028-03-13": "Eight Hours Day (TAS)",
      "2028-04-18": "Easter Tuesday (TAS Public Service)",
      "2028-06-12": "King's Birthday (TAS)",
      "2029-03-12": "Eight Hours Day (TAS)",
      "2029-04-03": "Easter Tuesday (TAS Public Service)",
      "2029-06-11": "King's Birthday (TAS)",
      "2030-03-11": "Eight Hours Day (TAS)",
      "2030-04-23": "Easter Tuesday (TAS Public Service)",
      "2030-06-10": "King's Birthday (TAS)"
    },
    ACT: {
      "2026-03-09": "Canberra Day (ACT)",
      "2026-04-04": "Easter Saturday",
      "2026-04-05": "Easter Sunday",
      "2026-04-25": "Anzac Day",
      "2026-04-27": "Anzac Day (Observed ACT)",
      "2026-06-01": "Reconciliation Day (ACT)",
      "2026-06-08": "King's Birthday (ACT)",
      "2026-10-05": "Labour Day (ACT)",
      "2027-03-08": "Canberra Day (ACT)",
      "2027-03-27": "Easter Saturday",
      "2027-03-28": "Easter Sunday",
      "2027-04-25": "Anzac Day",
      "2027-04-26": "Anzac Day (Observed ACT)",
      "2027-05-31": "Reconciliation Day (ACT)",
      "2027-06-14": "King's Birthday (ACT)",
      "2027-10-04": "Labour Day (ACT)",
      "2028-03-13": "Canberra Day (ACT)",
      "2028-04-15": "Easter Saturday",
      "2028-04-16": "Easter Sunday",
      "2028-05-29": "Reconciliation Day (ACT)",
      "2028-06-12": "King's Birthday (ACT)",
      "2028-10-02": "Labour Day (ACT)",
      "2029-03-12": "Canberra Day (ACT)",
      "2029-03-31": "Easter Saturday",
      "2029-04-01": "Easter Sunday",
      "2029-05-28": "Reconciliation Day (ACT)",
      "2029-06-11": "King's Birthday (ACT)",
      "2029-10-01": "Labour Day (ACT)",
      "2030-03-11": "Canberra Day (ACT)",
      "2030-04-20": "Easter Saturday",
      "2030-04-21": "Easter Sunday",
      "2030-05-27": "Reconciliation Day (ACT)",
      "2030-06-10": "King's Birthday (ACT)",
      "2030-10-07": "Labour Day (ACT)"
    },
    NT: {
      "2026-04-04": "Easter Saturday",
      "2026-04-25": "Anzac Day",
      "2026-05-04": "May Day (NT)",
      "2026-06-08": "King's Birthday (NT)",
      "2026-08-03": "Picnic Day (NT)",
      "2027-03-27": "Easter Saturday",
      "2027-04-26": "Anzac Day (Observed NT)",
      "2027-05-03": "May Day (NT)",
      "2027-06-14": "King's Birthday (NT)",
      "2027-08-02": "Picnic Day (NT)",
      "2028-04-15": "Easter Saturday",
      "2028-05-01": "May Day (NT)",
      "2028-06-12": "King's Birthday (NT)",
      "2028-08-07": "Picnic Day (NT)",
      "2029-03-31": "Easter Saturday",
      "2029-05-07": "May Day (NT)",
      "2029-06-11": "King's Birthday (NT)",
      "2029-08-06": "Picnic Day (NT)",
      "2030-04-20": "Easter Saturday",
      "2030-05-06": "May Day (NT)",
      "2030-06-10": "King's Birthday (NT)",
      "2030-08-05": "Picnic Day (NT)"
    }
  };

  function pad2(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function easterSundayIso(year) {
    var a = year % 19;
    var b = Math.floor(year / 100);
    var c = year % 100;
    var d = Math.floor(b / 4);
    var e = b % 4;
    var f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3);
    var h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4);
    var k = c % 4;
    var l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var month = Math.floor((h + l - 7 * m + 114) / 31);
    var day = ((h + l - 7 * m + 114) % 31) + 1;
    return year + "-" + pad2(month) + "-" + pad2(day);
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

  function addCalendarDays(d, days) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days, 12, 0, 0, 0);
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

  function getDynamicFallbackHoliday(isoStr) {
    var d = parseIsoLocal(isoStr);
    if (!d) return null;
    var y = d.getFullYear();
    if (y <= 2030) return null;
    var md = isoStr.slice(5);
    if (md === "01-01") return "New Year's Day";
    if (md === "01-26") return "Australia Day";
    if (md === "04-25") return "Anzac Day";
    if (md === "12-25") return "Christmas Day";
    if (md === "12-26") return "Boxing Day";
    var es = parseIsoLocal(easterSundayIso(y));
    if (es) {
      if (formatIsoLocal(addCalendarDays(es, -2)) === isoStr) return "Good Friday";
      if (formatIsoLocal(addCalendarDays(es, 1)) === isoStr) return "Easter Monday";
    }
    return null;
  }

  function getHolidayName(isoStr, stateCode) {
    var st = (stateCode || "QLD").toUpperCase();
    if (NATIONAL_HOLIDAYS[isoStr]) return NATIONAL_HOLIDAYS[isoStr];
    if (STATE_HOLIDAYS[st] && STATE_HOLIDAYS[st][isoStr]) return STATE_HOLIDAYS[st][isoStr];
    return getDynamicFallbackHoliday(isoStr);
  }

  function isBusinessDay(d, stateCode) {
    var dow = d.getDay();
    if (dow === 0 || dow === 6) return false;
    var iso = formatIsoLocal(d);
    return !getHolidayName(iso, stateCode);
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
    var weekendWarning = null;
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
    } else if (!isBusinessDay(finalDate, st)) {
      var rawIso = formatIsoLocal(finalDate);
      weekendWarning = getHolidayName(rawIso, st) || (finalDate.getDay() === 6 ? "Saturday" : "Sunday");
    }
    var safe = addCalendarDays(finalDate, -1);
    while (safe > start && !isBusinessDay(safe, st)) {
      safe = addCalendarDays(safe, -1);
    }
    return {
      rawDate: formatIsoLocal(raw),
      statutoryDate: formatIsoLocal(finalDate),
      safeDate: formatIsoLocal(safe),
      state: st,
      rolledReason: rolledReason,
      weekendWarning: weekendWarning
    };
  }

  function diffDaysFromTodayBrisbane(targetIso) {
    var t = parseIsoLocal(targetIso);
    var now = parseIsoLocal(todayBrisbaneIso());
    if (!t || !now) return 0;
    return Math.round((t.getTime() - now.getTime()) / 86400000);
  }

  var api = {
    NATIONAL_HOLIDAYS: NATIONAL_HOLIDAYS,
    STATE_HOLIDAYS: STATE_HOLIDAYS,
    easterSundayIso: easterSundayIso,
    parseIsoLocal: parseIsoLocal,
    formatIsoLocal: formatIsoLocal,
    addCalendarDays: addCalendarDays,
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
