/*
  Fills the page from js/site.js: contact details, menu, packages and
  reviews, and re-renders them when the language changes. The quote
  builder is in js/quote.js. Day to day changes go in js/site.js, text in
  js/i18n.js and index.html, photos in js/images.js.
*/

(function () {
  "use strict";

  var site = window.SITE;
  var Lang = window.Lang;
  var Slots = window.Slots;
  if (!site || !Lang) return;

  var f = function (obj, name) { return Lang.field(obj, name); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };
  var kr = function (n) { return new Intl.NumberFormat("nb-NO").format(n) + " kr"; };
  var locale = function () { return Lang.current === "no" ? "nb-NO" : "en-GB"; };
  var fmtDate = function (iso) {
    return new Date(iso + "T12:00:00").toLocaleDateString(locale(), { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  };
  var isPreview = location.protocol === "file:" ||
    /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) ||
    /[?&]slots\b/.test(location.search);

  /* ---------- Contact details and prices that repeat across the page ---------- */
  function fillSite() {
    document.querySelectorAll("[data-site]").forEach(function (el) {
      var value = f(site, el.getAttribute("data-site"));
      if (value) el.textContent = value;
    });
    document.querySelectorAll("[data-site-email]").forEach(function (el) {
      el.textContent = site.email;
      el.href = "mailto:" + site.email;
    });
    document.querySelectorAll("[data-site-phone]").forEach(function (el) {
      el.textContent = site.phone;
      el.href = "tel:" + site.phone.replace(/\s/g, "");
    });
    document.querySelectorAll("[data-site-instagram]").forEach(function (el) {
      el.href = site.instagram;
    });
    document.querySelectorAll("[data-site-price]").forEach(function (el) {
      el.textContent = kr(site[el.getAttribute("data-site-price")]);
    });
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* Photo descriptions follow the language too */
  function updateAlts() {
    document.querySelectorAll("[data-alt]").forEach(function (el) {
      var img = el.querySelector(".slot-img");
      if (img) img.alt = el.getAttribute("data-alt");
    });
  }

  /* ---------- Header ---------- */
  var header = document.getElementById("site-header");
  var hero = document.querySelector(".hero");
  var menuOpen = false;
  function setHeader() {
    if (!header) return;
    var over = hero ? hero.getBoundingClientRect().bottom > header.offsetHeight + 8 : false;
    header.classList.toggle("is-over-hero", over && !menuOpen);
  }
  window.addEventListener("scroll", setHeader, { passive: true });
  window.addEventListener("resize", setHeader);
  setHeader();

  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    var setMenu = function (open) {
      mobileNav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      menuOpen = open;
      setHeader();
    };
    toggle.addEventListener("click", function () { setMenu(!menuOpen); });
    mobileNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setMenu(false);
    });
  }

  /* ---------- Photos ---------- */
  if (Slots) Slots.init();

  /* ---------- Drink menu: photos once, text per language ---------- */
  var menuGrid = document.getElementById("menu-grid");
  if (menuGrid && site.menu) {
    menuGrid.innerHTML = site.menu.map(function (d, i) {
      return '<article class="menu-item">' +
        '<div class="menu-photo" data-menu-photo="' + i + '" data-slot-fill></div>' +
        '<h3></h3><p></p>' +
      '</article>';
    }).join("");
    if (Slots) {
      site.menu.forEach(function (d, i) {
        var el = menuGrid.querySelector('[data-menu-photo="' + i + '"]');
        el.setAttribute("data-alt", d.name);
        Slots.fill(el, d.photo, Slots.config[d.photo] || {});
      });
    }
  }
  function renderMenu() {
    if (!menuGrid) return;
    site.menu.forEach(function (d, i) {
      var item = menuGrid.children[i];
      item.querySelector("h3").textContent = f(d, "name");
      item.querySelector("p").textContent = f(d, "note");
      item.querySelector(".menu-photo").setAttribute("data-alt", f(d, "name"));
    });
  }

  /* ---------- Packages ---------- */
  var packageGrid = document.getElementById("package-grid");
  function renderPackages() {
    if (!packageGrid) return;
    packageGrid.innerHTML = site.packages.map(function (p, i) {
      return '<article class="package' + (p.featured ? ' package-featured' : '') + '">' +
        '<h3>' + esc(f(p, "name")) + '</h3>' +
        '<p class="package-guests">' + esc(f(p, "guests")) + '</p>' +
        '<p class="package-price">' + esc(Lang.t("pkg.from")) + ' ' + kr(window.Quote ? window.Quote.priceFor(p.preset) : 0) + '</p>' +
        '<ul>' + f(p, "includes").map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>' +
        '<a class="button ' + (p.featured ? '' : 'button-outline') + ' button-block" href="#enquire" data-package-index="' + i + '">' +
          esc(Lang.t("pkg.ask", { name: f(p, "name") })) + '</a>' +
      '</article>';
    }).join("");
  }

  /* ---------- Reviews: real ones show, placeholders only in a local preview ---------- */
  var reviewSection = document.getElementById("reviews");
  var reviewGrid = document.getElementById("review-grid");
  function renderReviews() {
    if (!reviewSection) return;
    var list = (site.reviews || []).map(function (r) {
      return { r: r, placeholder: /^\s*\[/.test(r.quote) };
    });
    var real = list.filter(function (x) { return !x.placeholder; });
    var shown = real.length ? real : (isPreview ? list : []);
    reviewSection.hidden = shown.length === 0;
    reviewSection.classList.toggle("is-placeholder", !real.length);
    reviewGrid.innerHTML = shown.map(function (x) {
      return '<figure class="review' + (x.placeholder ? ' review-placeholder' : '') + '">' +
        '<blockquote>' + esc(f(x.r, "quote")) + '</blockquote>' +
        '<figcaption><span class="review-name">' + esc(f(x.r, "name")) + '</span>' +
        '<span class="review-occasion">' + esc(f(x.r, "occasion")) + '</span></figcaption>' +
        (x.placeholder ? '<p class="placeholder-note">' + esc(Lang.t("reviews.placeholder")) + '</p>' : '') +
      '</figure>';
    }).join("");
  }

  /* ---------- Language ---------- */
  document.addEventListener("langchange", function () {
    fillSite();
    renderMenu();
    updateAlts();
    renderPackages();
    renderReviews();
  });
  Lang.apply();
})();
