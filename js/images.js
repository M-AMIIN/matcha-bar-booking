/*
  Every photo position on the page is listed here.

  To change a photo, save the new one at the path in "file" (or change the
  path). It shows up the next time the page loads. Nothing else needs editing.

  file         where the photo goes
  ratio        the shape the frame has, roughly (width:height)
  size         pixel size to export at (about twice the display size)
  focus        which part of the photo stays in view when the frame crops it,
               as "x% y%". "50% 50%" is the centre, "70% 40%" is right of centre.
  subject      which sketch to draw while the photo is missing
  hint         what kind of shot fits here

  Most frames take their size from the layout and crop the photo around the
  focus point, so a subject that gets cut off is fixed by changing "focus".

  Add ?slots to the address (index.html?slots) to see every position's name.
*/

window.IMAGE_SLOTS = {
  /* Opening row of three */
  "hero-left": {
    file: "images/hero-left.jpg", ratio: "1:2", size: "900 x 1800", focus: "60% 50%",
    subject: "flatlay", hint: "A mood shot: water, flowers, soft light."
  },
  "hero-center": {
    file: "images/hero-center.jpg", ratio: "2:3", size: "1200 x 1800", focus: "52% 55%",
    subject: "flatlay", hint: "The bar itself, set up at an event. Your most important photo."
  },
  "hero-right": {
    file: "images/hero-right.jpg", ratio: "1:2", size: "900 x 1800", focus: "58% 62%",
    subject: "glass-iced", hint: "One drink up close, pretty and styled."
  },

  /* Occasions */
  "occasion-wedding": {
    file: "images/occasion-wedding.jpg", ratio: "3:4", size: "900 x 1200", focus: "50% 45%",
    subject: "flatlay", hint: "A wedding: the bar or the menu at a venue."
  },
  "occasion-babyshower": {
    file: "images/occasion-babyshower.jpg", ratio: "3:4", size: "900 x 1200", focus: "40% 55%",
    subject: "glass-iced", hint: "A baby shower: soft colours, lace, cute details."
  },
  "occasion-birthday": {
    file: "images/occasion-birthday.jpg", ratio: "3:4", size: "900 x 1200", focus: "50% 70%",
    subject: "cup", hint: "A birthday: bows, cream tops, a table full of drinks."
  },

  "occasion-company": {
    file: "images/occasion-company.jpg", ratio: "3:4", size: "900 x 1200", focus: "45% 50%",
    subject: "cup", hint: "A company event: the bar at an office, launch or venue."
  },

  /* Drink menu */
  "menu-iced-latte": {
    file: "images/menu-iced-latte.jpg", ratio: "4:5", size: "1000 x 1250", focus: "40% 55%",
    subject: "glass-iced", hint: "Iced latte with the green sinking into the milk."
  },
  "menu-strawberry": {
    file: "images/menu-strawberry.jpg", ratio: "4:5", size: "1000 x 1250", focus: "24% 72%",
    subject: "glass-iced", hint: "Strawberry matcha showing the red, white and green layers."
  },
  "menu-oat-latte": {
    file: "images/menu-oat-latte.jpg", ratio: "4:5", size: "1000 x 1250", focus: "50% 62%",
    subject: "cup", hint: "Oat latte, hot in a cup or iced in a glass."
  },

  /* Side-by-side sections */
  "custom-sign": {
    file: "images/custom-sign.jpg", ratio: "4:5", size: "1200 x 1500", focus: "45% 42%",
    subject: "flatlay", hint: "Personal touches: a sign or banner, printed cups, bows."
  },
  "tasting": {
    file: "images/tasting.jpg", ratio: "4:5", size: "1200 x 1500", focus: "50% 40%",
    subject: "bowl-side", hint: "A small table set for a tasting."
  },
  "story": {
    file: "images/story.jpg", ratio: "4:5", size: "1200 x 1500", focus: "40% 55%",
    subject: "flatlay", hint: "A calm shot for the story: shadows, plants, light."
  },

  /* Behind the enquiry form */
  "enquiry": {
    file: "images/enquiry.jpg", ratio: "16:9", size: "2400 x 1350", focus: "50% 45%",
    subject: "flatlay", hint: "A soft background photo. The form sits on top of it."
  },

  /* Optional customer wall, hidden until all five exist */
  "gallery-1": { file: "images/gallery/1.jpg", ratio: "2:3", size: "800 x 1200", focus: "50% 50%", subject: "hand-glass", hint: "Photo from an event, tall." },
  "gallery-2": { file: "images/gallery/2.jpg", ratio: "1:1", size: "800 x 800", focus: "50% 50%", subject: "cup", hint: "Photo from an event, square." },
  "gallery-3": { file: "images/gallery/3.jpg", ratio: "1:1", size: "800 x 800", focus: "50% 50%", subject: "whisk", hint: "Photo from an event, square." },
  "gallery-4": { file: "images/gallery/4.jpg", ratio: "2:1", size: "1600 x 800", focus: "50% 50%", subject: "flatlay", hint: "Photo from an event, wide." },
  "gallery-5": { file: "images/gallery/5.jpg", ratio: "2:3", size: "800 x 1200", focus: "50% 50%", subject: "glass", hint: "Photo from an event, tall." }
};
