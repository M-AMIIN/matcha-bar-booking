/*
  Photo positions ("slots").

  Any element with data-slot="name" becomes a frame for the photo listed
  under that name in js/images.js. If the photo file exists, it is shown.
  If it doesn't, a sketch is drawn in its place that says which photo
  belongs there, at what shape and size, and where to save it.

  The line drawing inside each sketch sits at the slot's focus point, so
  it also shows where the main subject of the photo should land.

  data-slot-optional     the frame stays hidden until its photo exists
                         (used for mood photos the page works without)
  data-slot-group-root   put on a section: it stays hidden until every
                         photo inside it exists (used for the customer wall)
  With ?slots in the address, hidden frames and sections are shown.
*/

(function () {
  "use strict";

  var SLOTS = window.IMAGE_SLOTS || {};
  var phone = window.matchMedia("(max-width: 720px)");
  var registered = [];

  if (/[?&]slots\b/.test(location.search)) {
    document.documentElement.classList.add("show-slots");
  }

  /* Line drawings, all on a 100 x 100 grid */
  var SUBJECTS = {
    "bowl-top":
      '<circle cx="50" cy="50" r="40"/><circle cx="50" cy="50" r="31"/>' +
      '<circle cx="40" cy="40" r="2"/><circle cx="52" cy="36" r="1.5"/><circle cx="60" cy="46" r="2.5"/>' +
      '<circle cx="45" cy="55" r="1.5"/><circle cx="56" cy="61" r="2"/><circle cx="38" cy="63" r="1.2"/><circle cx="66" cy="57" r="1.2"/>',
    "bowl-side":
      '<path d="M14 42h72c0 24-16 38-36 38S14 66 14 42z"/><path d="M40 80v6h20v-6"/>' +
      '<path d="M22 42c6-5 14-5 20 0s14 5 20 0 10-4 16 0"/>',
    "tin":
      '<rect x="30" y="30" width="40" height="56" rx="2"/><rect x="28" y="18" width="44" height="13" rx="2"/>' +
      '<rect x="38" y="46" width="24" height="24"/><circle cx="50" cy="55" r="4"/><path d="M43 64h14"/>',
    "glass":
      '<path d="M32 14l5 72h26l5-72z"/><path d="M34 42h32M35 58h30"/>',
    "glass-iced":
      '<path d="M32 14l5 72h26l5-72z"/><path d="M35 58h30"/>' +
      '<rect x="39" y="28" width="10" height="10" transform="rotate(12 44 33)"/>' +
      '<rect x="52" y="34" width="9" height="9" transform="rotate(-10 56 38)"/><path d="M60 4l-7 62"/>',
    "cup":
      '<path d="M20 38h50v24c0 12-11 20-25 20s-25-8-25-20z"/>' +
      '<path d="M70 44h6c6 0 8 4 8 7s-2 7-8 7h-7"/><path d="M12 88h72"/>' +
      '<path d="M36 28c0-4 4-4 4-9M50 28c0-4 4-4 4-9"/>',
    "whisk":
      '<rect x="44" y="8" width="12" height="34" rx="3"/><path d="M42 42c-12 14-12 30 8 44 20-14 20-30 8-44z"/>' +
      '<path d="M46 44c-5 12-5 26 4 40M54 44c5 12 5 26-4 40M50 44v40"/>',
    "hand-glass":
      '<path d="M38 8l4 64h18l4-64z"/><path d="M40 30h24"/>' +
      '<path d="M30 50c4-3 9-3 12 0h22c4 0 4 6 0 6H44"/><path d="M30 58c4 3 9 4 14 4h20c4 0 4 6 0 6H46"/>' +
      '<path d="M30 66c2 8 9 14 20 14h12c4 0 4-6 0-6"/><path d="M30 50c-5 6-5 12 0 16"/><path d="M22 92l8-26"/>',
    "flatlay":
      '<circle cx="36" cy="44" r="21"/><circle cx="36" cy="44" r="14"/>' +
      '<rect x="66" y="18" width="18" height="30" rx="2"/><path d="M58 76l28-9"/><circle cx="56" cy="77" r="4"/>' +
      '<path d="M12 84c5-5 11-5 16 0"/>'
  };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function current(cfg) {
    var useMobile = phone.matches && cfg.mobileFile;
    return {
      files: useMobile ? [cfg.mobileFile, cfg.file] : [cfg.file],
      ratio: (phone.matches && cfg.mobileRatio) || cfg.ratio,
      file: useMobile ? cfg.mobileFile : cfg.file
    };
  }

  function sketchHTML(name, cfg, view) {
    /* A slot can bring its own stand-in drawing (product cards do) */
    if (cfg.fallback) {
      return '<div class="slot-sketch slot-fallback" aria-hidden="true">' + cfg.fallback + '</div>';
    }
    var focus = (cfg.focus || "50% 50%").split(/\s+/);
    return '<div class="slot-sketch" aria-hidden="true" style="--fx:' + focus[0] + ';--fy:' + (focus[1] || "50%") + '">' +
      '<span class="slot-corner c1"></span><span class="slot-corner c2"></span>' +
      '<span class="slot-corner c3"></span><span class="slot-corner c4"></span>' +
      '<svg class="slot-subject" viewBox="0 0 100 100">' + (SUBJECTS[cfg.subject] || SUBJECTS["bowl-top"]) + '</svg>' +
      '<div class="slot-info">' +
        '<p class="slot-name">' + esc(name) + '</p>' +
        '<p class="slot-spec">' + esc(view.ratio) + ', ' + esc(cfg.size) + '</p>' +
        '<p class="slot-hint">' + esc(cfg.hint) + '</p>' +
        '<p class="slot-file">' + esc(view.file) + '</p>' +
      '</div>' +
    '</div>';
  }

  /*
    Fill one element. name is what the sketch shows, cfg is the slot's
    settings (see js/images.js). Can be called again to swap the photo,
    which the brew calculator does when you pick another drink.
  */
  function fill(el, name, cfg) {
    var view = current(cfg);
    var token = {};
    el._slotToken = token;
    el._slot = { name: name, cfg: cfg };

    el.classList.add("slot");
    el.classList.remove("is-loaded", "is-empty");
    if (cfg.tone) el.setAttribute("data-tone", cfg.tone);
    if (!el.hasAttribute("data-slot-fill") && view.ratio) {
      el.style.aspectRatio = view.ratio.replace(":", " / ");
    }

    el.innerHTML = sketchHTML(name, cfg, view) +
      '<span class="slot-tag">' + esc(name) + ', ' + esc(view.ratio) + '</span>';

    var img = document.createElement("img");
    img.className = "slot-img";
    img.alt = el.getAttribute("data-alt") || cfg.alt || "";
    img.decoding = "async";
    if (!el.hasAttribute("data-eager") && !el.hasAttribute("data-slot-optional")) img.loading = "lazy";
    img.style.objectPosition = cfg.focus || "50% 50%";

    var files = view.files.filter(Boolean);
    var i = 0;
    img.onload = function () {
      if (el._slotToken !== token) return;
      el.classList.add("is-loaded");
      checkGroup(el);
    };
    img.onerror = function () {
      if (el._slotToken !== token) return;
      i += 1;
      if (i < files.length) {
        img.src = files[i];
      } else {
        img.remove();
        el.classList.add("is-empty");
        checkGroup(el);
      }
    };

    if (files.length) {
      el.appendChild(img);
      img.src = files[0];
    } else {
      el.classList.add("is-empty");
    }

    if (registered.indexOf(el) === -1) registered.push(el);
  }

  function checkGroup(el) {
    var root = el.closest("[data-slot-group-root]");
    if (!root) return;
    var slots = root.querySelectorAll("[data-slot]");
    var loaded = root.querySelectorAll("[data-slot].is-loaded");
    root.classList.toggle("is-complete", slots.length > 0 && slots.length === loaded.length);
  }

  function fillByName(el) {
    var name = el.getAttribute("data-slot");
    var cfg = SLOTS[name];
    if (cfg) fill(el, name, cfg);
  }

  /* Re-fill slots that have a separate phone crop when the screen crosses 720px */
  phone.addEventListener("change", function () {
    registered.forEach(function (el) {
      if (el._slot && el._slot.cfg.mobileFile) fill(el, el._slot.name, el._slot.cfg);
    });
  });

  window.Slots = {
    fill: fill,
    config: SLOTS,
    init: function (root) {
      (root || document).querySelectorAll("[data-slot]").forEach(fillByName);
    }
  };
})();
