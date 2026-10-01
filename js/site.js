/*
  Everything you change day to day lives in this file:
  contact details, the drink menu, packages, prices, booked dates,
  reviews and where enquiries go.

  Fields ending in _no are the Norwegian version of the field before it.

  PLACEHOLDERS: every value marked PLACEHOLDER needs your real details
  before the site goes live. Search this file for PLACEHOLDER.
*/

window.SITE = {
  name: "Stille Matcha",
  email: "hei@stillematcha.no",                 // PLACEHOLDER
  phone: "+47 000 00 000",                       // PLACEHOLDER
  instagram: "https://www.instagram.com/",       // PLACEHOLDER: your profile link
  area: "Oslo and Eastern Norway",
  area_no: "Oslo og på Østlandet",
  orgNumber: "000 000 000",                      // PLACEHOLDER

  /*
    Where the enquiry form sends to.
    Leave empty and the form opens the visitor's email app with everything
    filled in, addressed to the email above.
    Paste a Formspree form URL (https://formspree.io/f/xxxxxxx) to receive
    enquiries without the visitor's email app. See the README.
  */
  formEndpoint: "",

  /*
    Dates that are already taken, as "YYYY-MM-DD". Add each booking here.
    Picking one of these in the form shows that it is taken and suggests
    the nearest free Saturdays.
    PLACEHOLDER: these three are examples. Delete them before launch.
  */
  bookedDates: ["2027-06-12", "2027-06-19", "2027-08-14"],

  /* Tasting for wedding couples, in NOK. PLACEHOLDER price. */
  tastingPrice: 450,

  /* The drinks served at the bar. "photo" is the photo slot in js/images.js */
  menu: [
    {
      name: "Iced matcha latte",
      name_no: "Iset matcha latte",
      note: "Whisked matcha poured over ice and cold milk. The one everyone asks for.",
      note_no: "Vispet matcha helt over is og kald melk. Den alle spør etter.",
      photo: "menu-iced-latte"
    },
    {
      name: "Strawberry matcha",
      name_no: "Jordbærmatcha",
      note: "Fresh strawberry at the bottom, milk in the middle, matcha on top.",
      note_no: "Friske jordbær i bunnen, melk i midten og matcha på toppen.",
      photo: "menu-strawberry"
    },
    {
      name: "Honey oat latte",
      name_no: "Havrelatte med honning",
      note: "Matcha, oat milk and a little honey. Hot or iced.",
      note_no: "Matcha, havremelk og litt honning. Varm eller iset.",
      photo: "menu-oat-latte"
    }
  ],
  menuExtras: "Also on request: classic whisked matcha in a bowl, vanilla or coconut, cream tops, and caffeine-light options for kids.",
  menuExtras_no: "Også på forespørsel: klassisk vispet matcha i bolle, vanilje eller kokos, krem på toppen og koffeinsvake varianter til barna.",

  /*
    Packages shown in "Packages". The "from" price is worked out from the
    quote prices below using the package's preset, so the two always agree.
    "Ask about ..." fills the quote builder with the preset.
  */
  packages: [
    {
      name: "Intimate",
      name_no: "Intim",
      guests: "Up to 40 guests",
      guests_no: "Opptil 40 gjester",
      preset: { guests: 30, hours: 2, extras: [] },
      includes: ["Two hours of service", "Three drinks from the menu", "One barista", "Cups, straws and bows"],
      includes_no: ["To timer servering", "Tre drikker fra menyen", "Én barista", "Kopper, sugerør og sløyfer"]
    },
    {
      name: "Celebration",
      name_no: "Feiring",
      guests: "Up to 100 guests",
      guests_no: "Opptil 100 gjester",
      preset: { guests: 80, hours: 3, extras: ["cups"] },
      includes: ["Three hours of service", "Three drinks from the menu", "Two baristas", "Cups printed with your names or date"],
      includes_no: ["Tre timer servering", "Tre drikker fra menyen", "To baristaer", "Kopper med navn eller dato på trykk"],
      featured: true
    },
    {
      name: "Grand",
      name_no: "Storslått",
      guests: "100 guests and more",
      guests_no: "100 gjester og flere",
      preset: { guests: 150, hours: 4, extras: ["cups", "sign", "signature"] },
      includes: ["Four hours of service", "A signature drink", "Three baristas", "A custom sign for the bar"],
      includes_no: ["Fire timer servering", "En signaturdrikk", "Tre baristaer", "Et eget skilt til baren"]
    }
  ],

  /*
    Quote builder prices, in NOK. PLACEHOLDER: set your own.

    total = baseFee + guests x perGuest + the hours price
            + extra baristas (added automatically, see guestsPerBarista)
            + travel outside Oslo
            + extra drinks beyond includedDrinks x extraDrinkPerGuest x guests
            + extras (per event, or per guest when perGuest is true)
    The total is never below "minimum", and is rounded to the nearest 100.
  */
  quote: {
    minGuests: 20,
    maxGuests: 250,
    defaultGuests: 60,
    baseFee: 2900,            // setup, the bar, travel inside Oslo, the first barista
    perGuest: 90,             // covers 2 hours and up to includedDrinks drinks
    minimum: 6900,
    depositPercent: 25,       // shown on the quote card
    /*
      Baristas are added automatically: one for every guestsPerBarista guests.
      Each one after the first costs extraBarista.base plus
      extraBarista.perServiceHour for every hour the bar is open.
    */
    guestsPerBarista: 70,
    extraBarista: { base: 1400, perServiceHour: 350 },

    /* Travel. Oslo is included in baseFee. price: null means "we quote it". */
    travel: [
      { id: "oslo", name: "In Oslo", name_no: "I Oslo", price: 0 },
      { id: "near", name: "Up to 50 km from Oslo", name_no: "Inntil 5 mil fra Oslo", price: 600 },
      { id: "mid", name: "50 to 100 km", name_no: "5 til 10 mil", price: 1200 },
      { id: "far", name: "Further away", name_no: "Lenger unna", price: null }
    ],

    hours: [
      { hours: 2, price: 0 },
      { hours: 3, price: 1900 },
      { hours: 4, price: 3800 }
    ],
    includedDrinks: 3,
    extraDrinkPerGuest: 12,

    /* Drinks guests can order at the bar. The first three are ticked by default. */
    drinks: [
      { id: "iced", name: "Iced matcha latte", name_no: "Iset matcha latte" },
      { id: "strawberry", name: "Strawberry matcha", name_no: "Jordbærmatcha" },
      { id: "oat", name: "Honey oat latte", name_no: "Havrelatte med honning" },
      { id: "bowl", name: "Classic whisked bowl", name_no: "Klassisk vispet bolle" },
      { id: "vanilla", name: "Vanilla matcha latte", name_no: "Vaniljematcha latte" },
      { id: "kids", name: "Strawberry milk, no matcha", name_no: "Jordbærmelk uten matcha" }
    ],

    extras: [
      { id: "cups", name: "Cups printed with your names or date", name_no: "Kopper med navn eller dato på trykk", price: 25, perGuest: true },
      { id: "sign", name: "A custom sign for the bar", name_no: "Et eget skilt til baren", price: 1500 },
      { id: "signature", name: "A signature drink named after you", name_no: "En signaturdrikk oppkalt etter dere", price: 900 },
      { id: "bows", name: "Bows and ribbons in your colours", name_no: "Sløyfer og bånd i deres farger", price: 600 },
      { id: "toppers", name: "Straw toppers and stickers for the kids", name_no: "Sugerørpynt og klistremerker til barna", price: 400 }
    ]
  },

  /* Options for "Occasion" in the form */
  occasions: ["Wedding", "Baby shower", "Birthday", "Company event", "Something else"],
  occasions_no: ["Bryllup", "Babyshower", "Bursdag", "Firmaarrangement", "Noe annet"],

  /*
    Reviews. PLACEHOLDER: the three below are empty frames, not reviews.
    Replace them with real quotes from real customers, with their permission.
    While a quote still starts with "[", the whole section stays hidden on
    the live site. It only shows in a local preview so you can see the layout.
  */
  reviews: [
    {
      quote: "[A real quote from a couple or guest, two or three sentences.]",
      quote_no: "[Et ekte sitat fra et brudepar eller en gjest, to eller tre setninger.]",
      name: "[First name]",
      name_no: "[Fornavn]",
      occasion: "[Wedding, June 2027]",
      occasion_no: "[Bryllup, juni 2027]"
    },
    {
      quote: "[A real quote from a baby shower host.]",
      quote_no: "[Et ekte sitat fra en som holdt babyshower.]",
      name: "[First name]",
      name_no: "[Fornavn]",
      occasion: "[Baby shower, Oslo]",
      occasion_no: "[Babyshower, Oslo]"
    },
    {
      quote: "[A real quote from a birthday or company event.]",
      quote_no: "[Et ekte sitat fra en bursdag eller et firmaarrangement.]",
      name: "[First name]",
      name_no: "[Fornavn]",
      occasion: "[Birthday, Bærum]",
      occasion_no: "[Bursdag, Bærum]"
    }
  ]
};
