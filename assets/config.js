/* =================================================================
   ██  EDIT EVERYTHING HERE  ██  (one file powers every page)
   ================================================================= */
window.CONFIG = {
  // ---- The basics ----
  momName: "Mom",                    // used on the home hero + nav brand
  estYear: "1976",
  tagline: "Fifty golden years, and every one made someone's life warmer.",
  signoff: "— With all our love, your family · 2026",

  // ---- Home: candle wish message ----
  wishText: "Here's to you, always.",
  wishSub: "Fifty candles, and not one shines as bright as you do. We love you. ✨",

  // ---- 50 reasons (home). Add up to 50; the grid adapts. ----
  reasons: [
    "You always know exactly what to say.",
    "Your hugs fix everything.",
    "The way you laugh at your own jokes.",
    "You never gave up on any of us.",
    "Your cooking tastes like home.",
    "You're the calm in every storm.",
    "You believed in me before I did.",
    "Your endless, patient love.",
  ],

  // ================================================================
  // PHOTO SECTIONS — put images in /photos and list them here.
  // Leave src:"" to show a labelled placeholder tile.
  // ================================================================
  bachpanStory: [   // childhood — shown as a little timeline on bachpan.html
    { year: "1976", title: "The beginning", body: "The day the world got a little brighter. (Add her birth story.)" },
    { year: "1982", title: "First day of school", body: "Ribbons, a giant bag, and that unstoppable smile." },
    { year: "1990", title: "Growing up", body: "A favourite childhood memory goes here." },
  ],
  bachpan: [        // childhood photos
    { src: "", cap: "Baby days" },
    { src: "", cap: "School days" },
    { src: "", cap: "With her parents" },
    { src: "", cap: "The cheeky one" },
  ],

  cuteMoments: [    // cute moments
    { src: "", cap: "That laugh" },
    { src: "", cap: "Caught mid-dance" },
    { src: "", cap: "Her happy place" },
    { src: "", cap: "Golden hour" },
    { src: "", cap: "The famous pose" },
    { src: "", cap: "Pure joy" },
  ],

  family: [         // family corner
    { src: "", cap: "The whole gang" },
    { src: "", cap: "With Dad" },
    { src: "", cap: "Festival day" },
    { src: "", cap: "Sunday lunch" },
  ],

  // "Lekru" = little one. Rename LABELS below if you like (e.g. grandkids).
  lekrus: [
    { src: "", cap: "The littlest one" },
    { src: "", cap: "Story time with Aaji" },
    { src: "", cap: "Partners in crime" },
    { src: "", cap: "First steps" },
  ],

  // ================================================================
  // MEMORIES FROM OTHERS — Google Form + Sheet (see README)
  // ================================================================
  reveal: {
    date: "2026-10-15T20:00:00",     // <-- when memories.html unlocks (local time)
    lockedNote: "The Memory Wall opens once the celebration begins. Add yours now — it'll be waiting here.",
  },
  google: {
    formUrl: "",        // Google Form /viewform link (used by share.html)
    embedForm: true,    // embed the form on share.html
    sheetId: "",        // responses Sheet id, shared "Anyone with link: Viewer"
    sheetName: "Form Responses 1",
    columns: { name: 1, message: 2, photo: 3, approved: -1 }, // 0-based; approved:-1 = show all
  },

  // ---- Editable labels for the section pages ----
  labels: {
    lekrus: { title: "Lekru's Corner", eyebrow: "For the little ones", lead: "The tiniest hearts who adore her most." },
  },
};
