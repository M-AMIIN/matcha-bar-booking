/*
  The quote builder in "Build your quote".

  Visitors pick the occasion, a date in the calendar, the number of guests,
  how long the bar is open, the drinks and any extras. The quote card
  updates as they go. Sending it goes to Formspree when formEndpoint is set
  in js/site.js, and otherwise opens the visitor's email app with the whole
  quote filled in.

  Prices, drinks and extras are in js/site.js under "quote".
  Text for both languages is in js/i18n.js (keys starting with q.).
*/

(function () {
  "use strict";

  var site = window.SITE, Lang = window.Lang, Slots = window.Slots;
  if (!site || !site.quote || !Lang) return;
  var Q = site.quote;

  var f = function (o, n) { return Lang.field(o, n); };
  var t = function (k, v) { return Lang.t(k, v); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };
  var kr = function (n) { return new Intl.NumberFormat("nb-NO").format(n) + " kr"; };
  var locale = function () { return Lang.current === "no" ? "nb-NO" : "en-GB"; };
  var pad = function (n) { return String(n).padStart(2, "0"); };
  var isoOf = function (d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); };
  var longDate = function (iso) {
    return new Date(iso + "T12:00:00").toLocaleDateString(locale(), { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  };

  /* ---------- Prices ---------- */
  function price(sel) {
    var lines = [];
    var hours = Q.hours.filter(function (h) { return h.hours === sel.hours; })[0] || Q.hours[0];
    var extraDrinks = Math.max(0, sel.drinks.length - Q.includedDrinks);

    var baristas = Math.max(1, Math.ceil(sel.guests / Q.guestsPerBarista));
    var travel = Q.travel.filter(function (x) { return x.id === sel.travel; })[0] || Q.travel[0];

    lines.push({ key: "base", amount: Q.baseFee });
    lines.push({ key: "guests", amount: sel.guests * Q.perGuest });
    if (hours.price) lines.push({ key: "hours", amount: hours.price });
    if (baristas > 1) {
      lines.push({ key: "baristas", n: baristas - 1,
        amount: (baristas - 1) * (Q.extraBarista.base + Q.extraBarista.perServiceHour * hours.hours) });
    }
    if (travel.price) lines.push({ key: "travel", travel: travel, amount: travel.price });
    if (extraDrinks) lines.push({ key: "drinks", amount: extraDrinks * Q.extraDrinkPerGuest * sel.guests, n: extraDrinks });
    Q.extras.forEach(function (x) {
      if (sel.extras.indexOf(x.id) !== -1) {
        lines.push({ key: "extra", extra: x, amount: x.perGuest ? x.price * sel.guests : x.price });
      }
    });
    var sum = lines.reduce(function (a, l) { return a + l.amount; }, 0);
    var total = Math.round(Math.max(Q.minimum, sum) / 100) * 100;
    return {
      lines: lines,
      hours: hours,
      baristas: baristas,
      travel: travel,
      raisedToMinimum: sum < Q.minimum,
      total: total,
      deposit: Math.round(total * Q.depositPercent / 100 / 100) * 100
    };
  }

  /* Used by the Packages section to show a "from" price that matches the builder */
  window.Quote = {
    priceFor: function (preset) {
      return price({
        guests: preset.guests,
        hours: preset.hours,
        travel: Q.travel[0].id,
        drinks: Q.drinks.slice(0, Q.includedDrinks).map(function (d) { return d.id; }),
        extras: preset.extras || []
      }).total;
    }
  };

  var form = document.getElementById("quote-form");
  if (!form) return;

  /* ---------- State ---------- */
  var today = new Date(); today.setHours(12, 0, 0, 0);
  var state = {
    occasion: 0,
    date: "",
    guests: Q.defaultGuests,
    hours: Q.hours[0].hours,
    travel: Q.travel[0].id,
    drinks: Q.drinks.slice(0, Q.includedDrinks).map(function (d) { return d.id; }),
    extras: [],
    month: new Date(today.getFullYear(), today.getMonth(), 1)
  };
  var OCCASION_PHOTOS = ["occasion-wedding", "occasion-babyshower", "occasion-birthday", "occasion-company", null];

  var el = function (id) { return document.getElementById(id); };
  var occasionsEl = el("q-occasions"), calEl = el("q-cal"), dateNote = el("q-date-note"),
      guestsRange = el("q-guests"), guestsOut = el("q-guests-out"),
      hoursEl = el("q-hours"), drinksEl = el("q-drinks"), drinksHint = el("q-drinks-hint"),
      extrasEl = el("q-extras"), travelEl = el("q-travel"), customEl = el("q-custom"), customSub = el("q-custom-sub"), card = el("quote-card"), bar = el("quote-bar"),
      statusEl = el("form-status");

  guestsRange.min = Q.minGuests;
  guestsRange.max = Q.maxGuests;
  guestsRange.step = 5;
  el("q-range-min").textContent = Q.minGuests;
  el("q-range-max").textContent = Q.maxGuests + "+";

  /* ---------- Occasions ---------- */
  function renderOccasions() {
    var names = f(site, "occasions");
    occasionsEl.innerHTML = names.map(function (n, i) {
      return '<label class="q-card">' +
        '<input type="radio" name="occasion" value="' + esc(n) + '"' + (i === state.occasion ? " checked" : "") + ' data-i="' + i + '">' +
        '<span class="q-card-photo' + (OCCASION_PHOTOS[i] ? '' : ' is-blank') + '" data-q-photo="' + i + '">' + (OCCASION_PHOTOS[i] ? '' : '+') + '</span>' +
        '<span class="q-card-name">' + esc(n) + '</span>' +
      '</label>';
    }).join("");
    if (Slots) {
      OCCASION_PHOTOS.forEach(function (slot, i) {
        if (!slot) return;
        var ph = occasionsEl.querySelector('[data-q-photo="' + i + '"]');
        ph.setAttribute("data-slot-fill", "");
        Slots.fill(ph, slot, Slots.config[slot] || {});
      });
    }
  }
  occasionsEl.addEventListener("change", function (e) {
    state.occasion = parseInt(e.target.getAttribute("data-i"), 10);
    renderCard();
  });

  /* ---------- Calendar ---------- */
  function renderCalendar() {
    var m = state.month;
    var first = new Date(m.getFullYear(), m.getMonth(), 1, 12);
    var days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
    var lead = (first.getDay() + 6) % 7; /* weeks start on Monday */
    var booked = site.bookedDates || [];
    var todayIso = isoOf(today);
    var canGoBack = m.getFullYear() > today.getFullYear() || (m.getFullYear() === today.getFullYear() && m.getMonth() > today.getMonth());

    var dows = [];
    for (var d = 0; d < 7; d++) {
      dows.push(new Date(2024, 0, 1 + d).toLocaleDateString(locale(), { weekday: "short" }).replace(".", ""));
    }

    var cells = "";
    for (var b = 0; b < lead; b++) cells += "<span></span>";
    for (var day = 1; day <= days; day++) {
      var date = new Date(m.getFullYear(), m.getMonth(), day, 12);
      var iso = isoOf(date);
      var isBooked = booked.indexOf(iso) !== -1;
      var past = iso < todayIso;
      var weekend = date.getDay() === 0 || date.getDay() === 6;
      var label = date.toLocaleDateString(locale(), { weekday: "long", day: "numeric", month: "long" }) + (isBooked ? ", " + t("q.cal.booked") : "");
      cells += '<button type="button" class="q-day' + (weekend ? " is-weekend" : "") + (isBooked ? " is-booked" : "") + (iso === todayIso ? " is-today" : "") + '"' +
        ' data-date="' + iso + '" aria-label="' + esc(label) + '" aria-pressed="' + (iso === state.date) + '"' +
        (past || isBooked ? " disabled" : "") + '>' + day + '</button>';
    }

    calEl.innerHTML =
      '<div class="q-cal-head">' +
        '<button type="button" class="q-cal-nav" data-nav="-1" aria-label="' + esc(t("q.cal.prev")) + '"' + (canGoBack ? "" : " disabled") + '>&lsaquo;</button>' +
        '<span class="q-cal-month" aria-live="polite">' + esc(first.toLocaleDateString(locale(), { month: "long", year: "numeric" })) + '</span>' +
        '<button type="button" class="q-cal-nav" data-nav="1" aria-label="' + esc(t("q.cal.next")) + '">&rsaquo;</button>' +
      '</div>' +
      '<div class="q-cal-grid">' +
        dows.map(function (w) { return '<span class="q-cal-dow">' + esc(w) + '</span>'; }).join("") + cells +
      '</div>' +
      '<p class="q-cal-legend">' + esc(t("q.cal.legend")) + '</p>';
  }
  calEl.addEventListener("click", function (e) {
    var nav = e.target.closest("[data-nav]");
    if (nav) {
      state.month = new Date(state.month.getFullYear(), state.month.getMonth() + parseInt(nav.getAttribute("data-nav"), 10), 1);
      renderCalendar();
      return;
    }
    var day = e.target.closest("[data-date]");
    if (day && !day.disabled) {
      state.date = day.getAttribute("data-date");
      el("q-err-date").textContent = "";
      renderCalendar();
      renderDateNote();
      renderCard();
      var again = calEl.querySelector('[data-date="' + state.date + '"]');
      if (again) again.focus();
    }
  });
  function renderDateNote() {
    dateNote.textContent = state.date ? t("date.free", { date: longDate(state.date) }) : "";
  }

  /* ---------- Guests ---------- */
  function setGuests(n) {
    state.guests = Math.min(Q.maxGuests, Math.max(Q.minGuests, n));
    guestsRange.value = state.guests;
    guestsOut.textContent = state.guests;
    renderHours();
    renderExtras();
    renderCard();
  }
  guestsRange.addEventListener("input", function () { setGuests(parseInt(guestsRange.value, 10)); });
  el("q-g-minus").addEventListener("click", function () { setGuests(state.guests - 5); });
  el("q-g-plus").addEventListener("click", function () { setGuests(state.guests + 5); });

  /* ---------- Hours ---------- */
  function renderHours() {
    hoursEl.innerHTML = Q.hours.map(function (h) {
      return '<label class="q-pill"><input type="radio" name="hours" value="' + h.hours + '"' + (h.hours === state.hours ? " checked" : "") + '>' +
        '<span>' + esc(t("q.hours", { n: h.hours })) + '<small>' + (h.price ? "+ " + kr(h.price) : esc(t("q.included"))) + '</small></span></label>';
    }).join("");
  }
  hoursEl.addEventListener("change", function (e) {
    state.hours = parseInt(e.target.value, 10);
    renderCard();
  });

  /* ---------- Travel ---------- */
  function renderTravel() {
    travelEl.innerHTML = Q.travel.map(function (x) {
      var p = x.price === null ? t("q.travel.quote") : (x.price ? "+ " + kr(x.price) : t("q.included"));
      return '<label class="q-pill"><input type="radio" name="travel" value="' + esc(x.id) + '"' + (x.id === state.travel ? " checked" : "") + '>' +
        '<span>' + esc(f(x, "name")) + '<small>' + esc(p) + '</small></span></label>';
    }).join("");
  }
  travelEl.addEventListener("change", function (e) {
    state.travel = e.target.value;
    renderCard();
  });

  /* ---------- Drinks ---------- */
  function renderDrinks() {
    drinksHint.textContent = t("q.drinks.hint", { n: Q.includedDrinks, price: kr(Q.extraDrinkPerGuest) });
    drinksEl.innerHTML = Q.drinks.map(function (d) {
      return '<label class="q-check"><input type="checkbox" name="drinks" value="' + esc(d.id) + '"' + (state.drinks.indexOf(d.id) !== -1 ? " checked" : "") + '>' +
        '<span><span>' + esc(f(d, "name")) + '</span></span></label>';
    }).join("");
  }
  drinksEl.addEventListener("change", function (e) {
    var id = e.target.value;
    if (e.target.checked) { if (state.drinks.indexOf(id) === -1) state.drinks.push(id); }
    else state.drinks = state.drinks.filter(function (x) { return x !== id; });
    el("q-err-drinks").textContent = "";
    renderCard();
  });

  /* ---------- Extras ---------- */
  function renderExtras() {
    extrasEl.innerHTML = Q.extras.map(function (x) {
      var p = x.perGuest ? kr(x.price) + " " + t("q.perGuest") : kr(x.price);
      return '<label class="q-check"><input type="checkbox" name="extras" value="' + esc(x.id) + '"' + (state.extras.indexOf(x.id) !== -1 ? " checked" : "") + '>' +
        '<span><span>' + esc(f(x, "name")) + '</span><span class="q-check-price">' + esc(p) + '</span></span></label>';
    }).join("");
  }
  extrasEl.addEventListener("change", function (e) {
    var id = e.target.value;
    if (e.target.checked) { if (state.extras.indexOf(id) === -1) state.extras.push(id); }
    else state.extras = state.extras.filter(function (x) { return x !== id; });
    renderCard();
  });

  /* ---------- Quote card ---------- */
  var ORNAMENT = '<svg class="qc-ornament" viewBox="0 0 72 10" aria-hidden="true"><path d="M0 5h28M44 5h28" stroke="currentColor"/><circle cx="36" cy="5" r="3" fill="none" stroke="currentColor"/></svg>';

  function lineLabel(l, sel, p) {
    if (l.key === "base") return t("q.line.base");
    if (l.key === "guests") return t("q.line.guests", { n: sel.guests, price: kr(Q.perGuest) });
    if (l.key === "hours") return t("q.line.hours", { n: p.hours.hours });
    if (l.key === "drinks") return l.n === 1 ? t("q.line.drink1") : t("q.line.drinks", { n: l.n });
    if (l.key === "extra") return f(l.extra, "name");
    if (l.key === "baristas") return l.n === 1 ? t("q.line.barista1") : t("q.line.baristas", { n: l.n });
    if (l.key === "travel") return t("q.line.travel", { place: f(l.travel, "name").toLowerCase() });
    return "";
  }

  function currentSelection() {
    return { guests: state.guests, hours: state.hours, travel: state.travel, drinks: state.drinks, extras: state.extras };
  }

  function renderCard() {
    var sel = currentSelection();
    var p = price(sel);
    var occasion = f(site, "occasions")[state.occasion];
    var sub = occasion + ", " + (state.date ? longDate(state.date) : t("q.card.nodate"));
    var drinkNames = Q.drinks.filter(function (d) { return state.drinks.indexOf(d.id) !== -1; })
      .map(function (d) { return f(d, "name"); });

    var lines = p.lines.map(function (l) {
      return '<li class="qc-line"><span class="qc-label">' + esc(lineLabel(l, sel, p)) + '</span><span class="qc-dots"></span><span class="qc-amount">' + kr(l.amount) + '</span></li>';
    });
    if (p.hours.price === 0) {
      lines.splice(2, 0, '<li class="qc-line is-muted"><span class="qc-label">' + esc(t("q.line.hours", { n: p.hours.hours })) + '</span><span class="qc-dots"></span><span class="qc-amount">' + esc(t("q.included")) + '</span></li>');
    }
    if (p.travel.price === null) {
      lines.push('<li class="qc-line is-muted"><span class="qc-label">' + esc(t("q.line.travelQuote")) + '</span><span class="qc-dots"></span><span class="qc-amount">' + esc(t("q.travel.quote")) + '</span></li>');
    }
    lines.push('<li class="qc-line is-muted"><span class="qc-label">' + esc(t(p.baristas === 1 ? "q.card.barista1" : "q.card.baristas", { n: p.baristas })) + '</span></li>');
    lines.push('<li class="qc-line is-muted"><span class="qc-label">' + esc(drinkNames.length ? drinkNames.join(", ") : t("q.drinks.none")) + '</span></li>');
    if (p.raisedToMinimum) {
      lines.push('<li class="qc-line is-muted"><span class="qc-label">' + esc(t("q.line.minimum", { amount: kr(Q.minimum) })) + '</span></li>');
    }

    card.innerHTML =
      '<p class="qc-title">' + esc(t("q.card.title")) + '</p>' + ORNAMENT +
      '<p class="qc-sub">' + esc(sub) + '</p>' +
      '<ul class="qc-lines">' + lines.join("") + '</ul>' +
      '<div class="qc-total"><span>' + esc(t("q.total")) + '</span><strong>' + kr(p.total) + '</strong></div>' +
      '<p class="qc-deposit"><span>' + esc(t("q.deposit", { pct: Q.depositPercent })) + '</span><span>' + kr(p.deposit) + '</span></p>' +
      '<button class="button" type="submit" form="quote-form">' + esc(t("q.send")) + '</button>' +
      '<p class="qc-note">' + esc(t("q.note")) + '</p>';

    var extrasCount = state.extras.length;
    customSub.textContent = [
      t("q.hours", { n: state.hours }),
      t("q.custom.drinks", { n: state.drinks.length }),
      f(p.travel, "name").charAt(0).toLowerCase() + f(p.travel, "name").slice(1),
      extrasCount ? t(extrasCount === 1 ? "q.custom.extra1" : "q.custom.extras", { n: extrasCount }) : t("q.custom.noextras")
    ].join(", ");

    if (bar) {
      bar.innerHTML = '<span>' + esc(t("q.total")) + ' <strong>' + kr(p.total) + '</strong></span><a href="#quote-card">' + esc(t("q.bar.see")) + '</a>';
    }
  }

  /* ---------- Package buttons and the tasting button fill the builder ---------- */
  document.addEventListener("click", function (e) {
    var pk = e.target.closest("[data-package-index]");
    if (pk) {
      var preset = site.packages[parseInt(pk.getAttribute("data-package-index"), 10)].preset;
      state.hours = preset.hours;
      state.extras = (preset.extras || []).slice();
      customEl.open = true;
      setGuests(preset.guests);
      renderHours();
      renderExtras();
      renderCard();
    }
    if (e.target.closest("[data-tasting]")) {
      state.occasion = 0;
      renderOccasions();
      renderCard();
      var msg = el("q-message");
      if (!msg.value) msg.value = t("tasting.message");
    }
  });

  /* ---------- Sending ---------- */
  function quoteText() {
    var sel = currentSelection(), p = price(sel);
    var rows = [
      t("mail.occasion") + ": " + f(site, "occasions")[state.occasion],
      t("mail.date") + ": " + (state.date ? longDate(state.date) + " (" + state.date + ")" : ""),
      t("mail.guests") + ": " + state.guests,
      t("q.mail.hours") + ": " + state.hours,
      t("q.mail.baristas") + ": " + price(currentSelection()).baristas,
      t("q.mail.travel") + ": " + f(price(currentSelection()).travel, "name"),
      t("q.mail.drinks") + ": " + Q.drinks.filter(function (d) { return state.drinks.indexOf(d.id) !== -1; }).map(function (d) { return f(d, "name"); }).join(", "),
      t("q.mail.extras") + ": " + (Q.extras.filter(function (x) { return state.extras.indexOf(x.id) !== -1; }).map(function (x) { return f(x, "name"); }).join(", ") || "-"),
      t("q.total") + ": " + kr(p.total)
    ];
    return rows.join("\n");
  }

  function setStatus(text, ok) {
    statusEl.textContent = text;
    statusEl.classList.toggle("is-error", !ok);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    if (!state.date) {
      el("q-err-date").textContent = t("q.err.date");
      ok = false;
    }
    if (!state.drinks.length) {
      el("q-err-drinks").textContent = t("q.err.drinks");
      ok = false;
    }
    if (!ok) {
      var first = form.querySelector(".q-error:not(:empty)");
      if (first) {
        var d = first.closest("details");
        if (d) d.open = true;
        first.closest("fieldset").scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var data = new FormData(form);
    var name = data.get("name");
    var summary = quoteText();
    var p = price(currentSelection());
    var send = new FormData();
    send.append("name", name);
    send.append("email", data.get("email"));
    send.append("phone", data.get("phone") || "");
    send.append("location", data.get("location") || "");
    send.append("occasion", f(site, "occasions")[state.occasion]);
    send.append("date", state.date);
    send.append("guests", state.guests);
    send.append("hours", state.hours);
    send.append("estimate", kr(p.total));
    send.append("quote", summary);
    send.append("message", data.get("message") || "");
    send.append("language", Lang.current);

    if (site.formEndpoint) {
      var buttons = document.querySelectorAll('[form="quote-form"], #quote-form button[type=submit]');
      buttons.forEach(function (b) { b.disabled = true; });
      setStatus(t("status.sending"), true);
      fetch(site.formEndpoint, { method: "POST", body: send, headers: { Accept: "application/json" } })
        .then(function (res) {
          if (!res.ok) throw new Error(res.status);
          setStatus(t("status.thanks", { name: name, email: data.get("email") }), true);
        })
        .catch(function () { setStatus(t("status.fail", { email: site.email }), false); })
        .then(function () { buttons.forEach(function (b) { b.disabled = false; }); });
      return;
    }

    var body = [
      t("mail.name") + ": " + name,
      t("mail.email") + ": " + data.get("email"),
      t("mail.phone") + ": " + (data.get("phone") || ""),
      t("mail.where") + ": " + (data.get("location") || ""),
      "",
      summary,
      "",
      data.get("message") || ""
    ].join("\n");
    var subject = t("mail.subject", { occasion: f(site, "occasions")[state.occasion], date: state.date });
    window.location.href = "mailto:" + site.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    setStatus(t("status.mailto", { email: site.email }), true);
  });

  /* ---------- Language ---------- */
  document.addEventListener("langchange", function () {
    renderOccasions();
    renderCalendar();
    renderDateNote();
    renderHours();
    renderDrinks();
    renderTravel();
    renderExtras();
    renderCard();
    statusEl.textContent = "";
  });

  guestsRange.value = state.guests;
  guestsOut.textContent = state.guests;
})();
