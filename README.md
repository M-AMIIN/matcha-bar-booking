# Matcha bar booking site

**Live site:** https://m-amiin.github.io/matcha-bar-booking/

A booking site for a matcha bar that people hire for weddings, baby showers, birthdays and company events. The business, Stille Matcha, is a concept: prices, contact details and the photos are placeholders, and no payments are taken.

## What it does

- **Live quote builder.** Visitors pick the occasion, a date and the number of guests, and get a price straight away. Service time, drinks, travel zone and extras sit folded under "Customise the bar", with sensible defaults. The quote card updates on every change and shows the deposit.
- **Pricing in one place.** Every price lives in `js/site.js`: a base fee, a price per guest, an extra barista for every set number of guests, travel zones, longer service times, extra drinks and add-ons, with a minimum total. The "from" prices on the package cards are calculated from the same numbers, so they always match the builder.
- **Booked dates.** Dates listed in `bookedDates` are crossed out in the calendar and can't be picked.
- **Norwegian and English.** The page opens in Norwegian for visitors whose browser is set to Norwegian and in English for everyone else, with a NO / EN switch in the header that the browser remembers.
- **Enquiries without a server.** Sending a quote opens the visitor's email app with everything filled in. Setting `formEndpoint` to a Formspree address sends it directly instead.
- **Privacy page** (`personvern.html`) describing what the form collects and where it goes.

## How it's built

Plain HTML, CSS and JavaScript, no framework and no build step. Fonts (Shippori Mincho B1 and Jost, both under the SIL Open Font License) are embedded in `css/fonts.css`, so the site works offline from disk.

```
index.html        the page, English text
personvern.html   privacy page
css/              styles and embedded fonts
js/site.js        prices, menu, packages, booked dates, contact details
js/i18n.js        Norwegian text and form messages
js/quote.js       the quote builder and quote card
js/images.js      every photo slot: file, shape, export size, focus point
js/slots.js       draws each photo, or a sketch of the shot if the file is missing
js/app.js         fills the page from site.js
```

## What I'd improve next

- Replace the placeholder photos with my own, shot on a Fujifilm X-T5.
- Connect deposits to Stripe Payment Links once the business is real.
- Point the share-preview tags at the live address.
