/*
  Norwegian and English.

  The English text is written in index.html and personvern.html.
  The Norwegian text for the same places is in I18N.no below, under the
  key named in each element's data-i18n attribute. Text that only
  JavaScript shows (form messages, the price estimate) is here in both
  languages.

  The page opens in Norwegian for visitors whose browser is set to
  Norwegian, and in English for everyone else. The NO / EN buttons in the
  header switch it, and the choice is remembered in the visitor's browser.
  ?lang=no or ?lang=en in the address forces a language.
*/

window.I18N = {
  en: {
    "pkg.from": "from",
    "pkg.ask": "Ask about {name}",
    "date.free": "{date} is free. We confirm it when we reply.",
    "status.sending": "Sending...",
    "status.thanks": "Thank you, {name}. We'll reply to {email} with a menu and a quote.",
    "status.fail": "That didn't send. Email us at {email} and we'll pick it up from there.",
    "status.mailto": "Your email app should open with the enquiry filled in. If it doesn't, email us at {email}.",
    "mail.subject": "Matcha bar enquiry: {occasion} on {date}",
    "mail.name": "Name",
    "mail.email": "Email",
    "mail.phone": "Phone",
    "mail.occasion": "Occasion",
    "mail.date": "Date",
    "mail.guests": "Guests",
    "mail.where": "Where",
    "mail.package": "Package",
    "tasting.message": "We'd like to book a tasting for two.",
    "q.cal.prev": "Previous month",
    "q.custom.title": "Customise the bar",
    "q.custom.drinks": "{n} drinks",
    "q.custom.extra1": "1 extra",
    "q.custom.extras": "{n} extras",
    "q.custom.noextras": "no extras",
    "q.step.travel": "Where is it?",
    "q.travel.quote": "We quote it",
    "q.line.barista1": "One extra barista",
    "q.line.baristas": "{n} extra baristas",
    "q.line.travel": "Travel, {place}",
    "q.line.travelQuote": "Travel outside the area",
    "q.card.barista1": "One barista behind the bar",
    "q.card.baristas": "{n} baristas behind the bar, so the queue stays short",
    "q.mail.baristas": "Baristas",
    "q.mail.travel": "Travel",
    "f.venue": "Venue or address",
    "f.venue.ph": "For example Villa Grande, Oslo",
    "q.cal.next": "Next month",
    "q.cal.booked": "booked",
    "q.cal.legend": "Crossed-out dates are booked. Weekends are in bold.",
    "q.hours": "{n} hours",
    "q.included": "Included",
    "q.perGuest": "per guest",
    "q.drinks.hint": "{n} drinks are included. Each one more adds {price} per guest.",
    "q.drinks.none": "No drinks chosen yet",
    "q.card.title": "Your quote",
    "q.card.nodate": "date not chosen",
    "q.line.base": "Setup, the bar and the first barista",
    "q.line.guests": "{n} guests at {price}",
    "q.line.hours": "{n} hours of service",
    "q.line.drinks": "{n} extra drinks on the menu",
    "q.line.drink1": "One extra drink on the menu",
    "q.line.minimum": "Raised to the minimum order of {amount}",
    "q.total": "Estimated total",
    "q.deposit": "Deposit to hold the date ({pct}%)",
    "q.send": "Send my quote",
    "q.note": "A rough price. We confirm it in our reply, and travel outside Oslo comes on top.",
    "q.bar.see": "See quote",
    "q.err.date": "Pick a date in the calendar.",
    "q.err.drinks": "Pick at least one drink.",
    "q.mail.hours": "Hours",
    "q.mail.drinks": "Drinks",
    "q.mail.extras": "Extras",
    "reviews.placeholder": "Placeholder. Hidden on the live site until you add real reviews in js/site.js."
  },

  no: {
    /* JavaScript text */
    "pkg.from": "fra",
    "pkg.ask": "Spør om {name}",
    "date.free": "{date} er ledig. Vi bekrefter den når vi svarer.",
    "status.sending": "Sender ...",
    "status.thanks": "Takk, {name}. Vi svarer til {email} med meny og pristilbud.",
    "status.fail": "Det ble ikke sendt. Send oss en e-post på {email}, så tar vi det derfra.",
    "status.mailto": "E-postappen din skal åpne seg med forespørselen ferdig utfylt. Hvis den ikke gjør det, send en e-post til {email}.",
    "mail.subject": "Forespørsel om matchabar: {occasion} {date}",
    "mail.name": "Navn",
    "mail.email": "E-post",
    "mail.phone": "Telefon",
    "mail.occasion": "Anledning",
    "mail.date": "Dato",
    "mail.guests": "Gjester",
    "mail.where": "Sted",
    "mail.package": "Pakke",
    "tasting.message": "Vi vil gjerne booke en smaksprøve for to.",
    "q.cal.prev": "Forrige måned",
    "q.custom.title": "Tilpass baren",
    "q.custom.drinks": "{n} drikker",
    "q.custom.extra1": "1 tillegg",
    "q.custom.extras": "{n} tillegg",
    "q.custom.noextras": "ingen tillegg",
    "q.step.travel": "Hvor er det?",
    "q.travel.quote": "Pris etter avtale",
    "q.line.barista1": "Én ekstra barista",
    "q.line.baristas": "{n} ekstra baristaer",
    "q.line.travel": "Reise, {place}",
    "q.line.travelQuote": "Reise utenfor området",
    "q.card.barista1": "Én barista bak baren",
    "q.card.baristas": "{n} baristaer bak baren, så køen holdes kort",
    "q.mail.baristas": "Baristaer",
    "q.mail.travel": "Reise",
    "f.venue": "Lokale eller adresse",
    "f.venue.ph": "For eksempel Villa Grande, Oslo",
    "q.cal.next": "Neste måned",
    "q.cal.booked": "booket",
    "q.cal.legend": "Overstrekte datoer er booket. Helgene står i fet skrift.",
    "q.hours": "{n} timer",
    "q.included": "Inkludert",
    "q.perGuest": "per gjest",
    "q.drinks.hint": "{n} drikker er inkludert. Hver ekstra koster {price} per gjest.",
    "q.drinks.none": "Ingen drikker valgt ennå",
    "q.card.title": "Ditt pristilbud",
    "q.card.nodate": "dato ikke valgt",
    "q.line.base": "Oppsett, bar og første barista",
    "q.line.guests": "{n} gjester à {price}",
    "q.line.hours": "{n} timer servering",
    "q.line.drinks": "{n} ekstra drikker på menyen",
    "q.line.drink1": "Én ekstra drikk på menyen",
    "q.line.minimum": "Hevet til minstebestillingen på {amount}",
    "q.total": "Omtrentlig totalpris",
    "q.deposit": "Depositum for å holde av datoen ({pct} %)",
    "q.send": "Send pristilbudet",
    "q.note": "En omtrentlig pris. Vi bekrefter den i svaret vårt, og reise utenfor Oslo kommer i tillegg.",
    "q.bar.see": "Se pristilbudet",
    "q.err.date": "Velg en dato i kalenderen.",
    "q.err.drinks": "Velg minst én drikk.",
    "q.mail.hours": "Timer",
    "q.mail.drinks": "Drikker",
    "q.mail.extras": "Tillegg",
    "q.title": "Lag ditt pristilbud",
    "q.lead": "Tre valg gir deg en pris. Resten kan du tilpasse hvis du vil, eller la oss foreslå.",
    "q.step.occasion": "Anledningen",
    "q.step.date": "Datoen",
    "q.step.guests": "Antall gjester",
    "q.step.hours": "Hvor lenge baren er åpen",
    "q.step.drinks": "Drikker i baren",
    "q.step.extras": "Tillegg",
    "q.step.details": "Dine opplysninger",
    "q.guests.unit": "gjester",
    "reviews.placeholder": "Plassholder. Skjult på det publiserte nettstedet til du legger inn ekte omtaler i js/site.js.",

    /* Page text */
    "meta.title": "Stille Matcha",
    "meta.description": "En matchabar til bryllup, babyshower og bursdag. Hver drikk vispes på bestilling foran gjestene, i Oslo og på Østlandet.",
    "skip": "Hopp til innholdet",
    "nav.occasions": "Anledninger",
    "nav.menu": "Meny",
    "nav.packages": "Pakker",
    "nav.questions": "Spørsmål",
    "nav.cta": "Få pristilbud",
    "nav.toggle": "Meny",

    "hero.title": "En matchabar til bryllup, babyshower og bursdag",
    "hero.sub": "Hver drikk vispes på bestilling, foran gjestene dine",
    "hero.cta": "Lag ditt pristilbud",
    "hero.link": "Se menyen",

    "intro.text": "Vi tar med baren, matchaen, melken og folkene som visper. Du velger drikkene, fargene og koppene. Gjestene får en ordentlig matcha, laget mens de venter og prater.",

    "occ.title": "Hvor vi setter opp",
    "occ.lead": "Baren får plass i et hjørne av et lokale, en hage eller en stue. Vi trenger rundt to ganger tre meter og en stikkontakt. Resten tar vi med.",
    "occ.wedding.title": "Bryllup",
    "occ.wedding.text": "En drikk mellom vielsen og middagen, eller en sen bar når dansen starter. Brudepar kan booke en smaksprøve først.",
    "occ.baby.title": "Babyshower",
    "occ.baby.text": "Myke farger, kaninpynt på sugerørene og halvsterke drikker til den vordende forelderen.",
    "occ.birthday.title": "Bursdager",
    "occ.birthday.text": "Sløyfer i favorittfargen og jordbærmatcha med krem på toppen til den som har bursdag.",
    "occ.company.title": "Firmaarrangementer",
    "occ.company.text": "Lanseringer, fagdager og kundearrangementer. Hverdager er de letteste datoene å få.",

    "menu.title": "Menyen",
    "menu.lead": "Hver drikk vispes på bestilling i baren. Vanlig melk, havremelk og kokosmelk på dagen.",

    "personal.title": "Gjør den til din",
    "personal.lead": "Baren, pyntet for dagen din.",
    "personal.1": "Et skilt med navnene, datoen eller et ordspill",
    "personal.2": "Kopper med navn eller dato på trykk",
    "personal.3": "Sløyfer og bånd i dine farger",
    "personal.4": "Pynt til sugerørene og klistremerker til barnebordet",
    "personal.5": "En signaturdrikk oppkalt etter dere to",

    "steps.title": "Slik booker du",
    "steps.1.title": "Fortell om arrangementet",
    "steps.1.text": "Velg anledning, dato og antall gjester under, så ser du en pris med en gang.",
    "steps.2.title": "Vi bekrefter",
    "steps.2.text": "Vi svarer innen en dag med endelig pris og forslag til detaljene.",
    "steps.3.title": "Betal depositum",
    "steps.3.text": "Et depositum betalt med kort gjennom Stripe holder av datoen. Resten betales en uke før.",
    "steps.4.title": "Vi visper",
    "steps.4.text": "Vi kommer en time før, setter opp baren og serverer til siste kopp.",

    "packages.title": "Pakker",
    "packages.lead": "Utgangspunkt. Pristilbudet følger antall gjester, menyen og hvor lenge baren skal være åpen.",

    "tasting.title": "Smak først",
    "tasting.lead": "For brudepar som planlegger bryllup.",
    "tasting.text": "Prøv menyen før dere booker. En smaksprøve for to i Oslo tar rundt 45 minutter og koster <span data-site-price=\"tastingPrice\"></span>, som vi trekker fra sluttprisen hvis dere booker baren.",
    "tasting.cta": "Be om smaksprøve",

    "reviews.title": "Det gjestene sier",
    "reviews.lead": "Fra folk som har hatt baren på arrangementet sitt.",

    "story.title": "Stille",
    "story.lead": "Som i et stille øyeblikk.",
    "story.p1": "Det halve minuttet mellom at du bestiller en drikk og får den, når noen visper den foran deg og rommet blir litt roligere. Vi bygde baren rundt det øyeblikket.",
    "story.p2": "Stille Matcha er et lite team i Oslo. Vi bruker bare årets matcha fra Japan, og vi tar den med dit dere feirer.",

    "gallery.title": "Fra arrangementene våre",
    "gallery.lead": "Tagg oss på <a data-site-instagram href=\"#\">Instagram</a>, så havner kanskje bildet ditt her.",

    "f.name": "Navnet ditt",
    "f.email": "E-post",
    "f.phone": "Telefon <span class=\"optional\">(valgfritt)</span>",
    "f.location": "Hvor er det?",
    "f.location.ph": "Lokale eller sted",
    "f.message": "Noe mer? <span class=\"optional\">(valgfritt)</span>",
    "f.message.ph": "Farger, drikker dere ønsker, tidsplanen for dagen",
    "f.privacy": "Vi bruker opplysningene bare til å svare på forespørselen. <a href=\"personvern.html\">Les personvernerklæringen</a>.",

    "faq.title": "Spørsmål",
    "faq.lead": "Lurer du på noe annet, send en e-post til <a data-site-email href=\"#\"></a>.",
    "faq.1.q": "Hvor mye plass trenger dere?",
    "faq.1.a": "Rundt to ganger tre meter, et bord hvis lokalet har det, og en stikkontakt innen ti meter. Baren, koppene, isen og vannet tar vi med selv.",
    "faq.2.q": "Hvor langt reiser dere?",
    "faq.2.a": "Hvor som helst i <span data-site=\"area\"></span>. Lenger unna går også, med et reisetillegg i pristilbudet.",
    "faq.3.q": "Hvor tidlig bør vi booke?",
    "faq.3.a": "Sommerhelgene går først, så to til tre måneder før er trygt for et bryllup. For andre datoer holder det ofte med noen uker. Send skjemaet, så sier vi fra om datoen er ledig.",
    "faq.4.q": "Kan vi smake før vi booker?",
    "faq.4.a": "Ja. Brudepar kan booke en smaksprøve for to i Oslo. Den koster <span data-site-price=\"tastingPrice\"></span> og trekkes fra sluttprisen hvis dere booker.",
    "faq.5.q": "Har dere alternativer uten melk eller koffein?",
    "faq.5.a": "Havremelk og kokosmelk står alltid på baren. Matcha inneholder koffein, så til barn og gravide lager vi halvsterke drikker og en jordbærmelk uten matcha.",
    "faq.6.q": "Hvordan fungerer depositumet?",
    "faq.6.a": "Et depositum betalt med kort holder av datoen og trekkes fra sluttprisen. Du får det tilbake hvis du avbestiller mer enn 30 dager før arrangementet.",
    "faq.7.q": "Kan vi velge kopper, farger og skilt?",
    "faq.7.a": "Ja. Skriv fargene og navnene i skjemaet, så foreslår vi sløyfer, kopper og skilt som passer.",

    "footer.tagline": "Matchabar til arrangementer",
    "footer.small": "Depositum betales med kort gjennom Stripe. &copy; <span id=\"year\"></span> <span data-site=\"name\"></span>",
    "footer.privacy": "Personvern",
    "footer.book": "Pristilbud",

    "alt.hero-left": "To svaner og rosa roser på klart grønt vann",
    "alt.hero-center": "En hvit bar med salviegrønn parasoll, stearinlys og lykter i skumringen",
    "alt.hero-right": "En iset matcha latte i et glass med rosa sløyfer",
    "alt.wedding": "En matchameny i gullramme på et bryllupsbord",
    "alt.baby": "Kopper pakket inn i blonder ved siden av et grønt menyskilt",
    "alt.birthday": "Jordbær- og matchadrikker med krem og rosa sløyfer",
    "alt.company": "Et banner med teksten The Matcha Bar ved siden av hvite blomster",
    "alt.sign": "Et banner med teksten She found her perfect matcha, hengt opp med grønne sløyfer",
    "alt.tasting": "Et linduket bord med en matchabolle og to lagdelte drikker",
    "alt.story": "Bambusblader som kaster skygger på en grønn vegg ved et tynt gardin",

    /* Privacy page */
    "pv.title": "Personvern",
    "pv.updated": "Sist oppdatert: [dato]",
    "pv.who.h": "Hvem som er ansvarlig",
    "pv.who.p": "[Ditt navn eller firmanavn], org.nr <span data-site=\"orgNumber\"></span>, er ansvarlig for personopplysningene som er beskrevet her. Kontakt: <a data-site-email href=\"#\"></a>.",
    "pv.what.h": "Hva vi samler inn",
    "pv.what.p": "Når du sender forespørselsskjemaet, får vi navnet ditt, e-postadressen, telefonnummeret hvis du oppgir det, anledningen, datoen, antall gjester, stedet, pakken og det du skriver i meldingen. Når du betaler depositum, behandler Stripe kortopplysningene dine. Vi ser aldri og lagrer aldri kortnummeret ditt.",
    "pv.why.h": "Hva vi bruker det til",
    "pv.why.p": "Bare til å svare på forespørselen, sende deg et pristilbud, og planlegge og gjennomføre arrangementet hvis du booker. Behandlingsgrunnlaget er å gjennomføre tiltak du ber om før en avtale inngås, og deretter å oppfylle avtalen (personvernforordningen artikkel 6 nr. 1 bokstav b).",
    "pv.where.h": "Hvor det lagres",
    "pv.where.p": "Forespørsler kommer inn i e-postinnboksen vår hos [e-postleverandør, for eksempel Google Workspace]. [Hvis du bruker Formspree: Forespørsler går også gjennom Formspree, en skjematjeneste i USA.] Betalinger håndteres av Stripe. Vi deler ikke opplysningene dine med noen andre og bruker dem aldri til reklame.",
    "pv.long.h": "Hvor lenge vi tar vare på det",
    "pv.long.p": "Hvis du ikke booker, sletter vi forespørselen innen 12 måneder. Hvis du booker, oppbevarer vi det bokføringsloven krever, som fakturaer og kvitteringer, i fem år, og sletter resten innen 12 måneder etter arrangementet.",
    "pv.cookies.h": "Informasjonskapsler",
    "pv.cookies.p": "Nettstedet setter ingen informasjonskapsler og bruker ingen sporing eller analyseverktøy. Det husker språkvalget ditt i din egen nettleser. Skriftene ligger på dette nettstedet, så ingenting lastes fra Google.",
    "pv.rights.h": "Rettighetene dine",
    "pv.rights.p": "Du kan be om å se opplysningene vi har om deg, rette dem eller få dem slettet. Send en e-post til <a data-site-email href=\"#\"></a>. Mener du at vi behandler opplysningene dine feil, kan du klage til Datatilsynet (datatilsynet.no).",
    "pv.back": "Tilbake til forsiden"
  }
};

(function () {
  "use strict";

  var STORE = "stille-lang";

  function detect() {
    var q = /[?&]lang=(no|en)\b/.exec(location.search);
    if (q) return q[1];
    try {
      var saved = localStorage.getItem(STORE);
      if (saved === "no" || saved === "en") return saved;
    } catch (e) { /* storage blocked, fall through */ }
    var langs = (navigator.languages || [navigator.language || ""]).join(",").toLowerCase();
    return /(^|,)(nb|nn|no)\b/.test(langs) ? "no" : "en";
  }

  var lang = detect();

  function t(key, vars) {
    var s = (window.I18N[lang] || {})[key];
    if (s == null) s = window.I18N.en[key];
    if (s == null) return "";
    return s.replace(/\{(\w+)\}/g, function (m, k) {
      return vars && vars[k] != null ? vars[k] : m;
    });
  }

  function apply() {
    var no = window.I18N.no;
    document.documentElement.lang = lang === "no" ? "nb" : "en";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      if (el._en == null) el._en = el.innerHTML;
      var v = lang === "no" ? no[el.getAttribute("data-i18n")] : null;
      el.innerHTML = v != null ? v : el._en;
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var parts = pair.split(":");
        var attr = parts[0].trim(), key = parts[1].trim(), store = "_en_" + attr;
        if (el[store] == null) el[store] = el.getAttribute(attr) || "";
        var v = lang === "no" ? no[key] : null;
        el.setAttribute(attr, v != null ? v : el[store]);
      });
    });

    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });

    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  }

  function set(l) {
    lang = l;
    try { localStorage.setItem(STORE, l); } catch (e) { /* not saved, still switches */ }
    apply();
  }

  window.Lang = {
    get current() { return lang; },
    t: t,
    set: set,
    apply: apply,
    /* Picks the _no version of a field from js/site.js when the page is in Norwegian */
    field: function (obj, name) {
      return lang === "no" && obj[name + "_no"] != null ? obj[name + "_no"] : obj[name];
    }
  };

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-lang]");
    if (b) set(b.getAttribute("data-lang"));
  });
})();
