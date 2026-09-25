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
  // "Lil Girl" cards on bachpan.html — two royal cards, one per screen. Each shows
  // the photo on top, a cursive title, a gold divider, then the message.
  // Placeholder text for now — replace title/msg with the real words.
  bachpanStory: [
    { src: "photos/bachpan1.jpg", title: "Title here", msg: "Message here — add the story behind this moment." },
    { src: "photos/bachpan2.jpg", title: "Title here", msg: "Message here — add the story behind this moment." },
  ],
  bachpan: [        // (unused) old album grid — childhood photos now live in bachpanStory above
    { src: "", cap: "Baby days" },
    { src: "", cap: "School days" },
    { src: "", cap: "With her parents" },
    { src: "", cap: "The cheeky one" },
  ],

  // Cute Moments tree on cute-moments.html — photos & videos alternating down a
  // center line. Tap one to open the royal card (media on top, then a cursive
  // title + message you'll add later). type: "video" or "image".
  cuteMoments: [
    { type: "video", src: "photos/cute-laugh.mp4",     title: "Title here", msg: "Message here — add the story behind this moment." },
    { type: "image", src: "photos/cutu.jpg",           title: "Title here", msg: "Message here — add the story behind this moment." },
    { type: "video", src: "photos/golden-hour.mp4",    title: "Title here", msg: "Message here — add the story behind this moment." },
    { type: "image", src: "photos/hehe.jpg",           title: "Title here", msg: "Message here — add the story behind this moment." },
    { type: "video", src: "photos/batting.mp4",        title: "Title here", msg: "Message here — add the story behind this moment." },
    { type: "image", src: "photos/air-hockey.jpg",     title: "Title here", msg: "Message here — add the story behind this moment." },
    { type: "video", src: "photos/udta-hi-phiro.mp4",  title: "Title here", msg: "Message here — add the story behind this moment." },
    { type: "image", src: "photos/murugan-aunty.jpg",  title: "Title here", msg: "Message here — add the story behind this moment." },
    { type: "video", src: "photos/pool.mp4",           title: "Title here", msg: "Message here — add the story behind this moment." },
    { type: "image", src: "photos/little-moyy.jpg",    title: "Title here", msg: "Message here — add the story behind this moment." },
    { type: "video", src: "photos/bowling.mp4",        title: "Title here", msg: "Message here — add the story behind this moment." },
    { type: "image", src: "photos/buaaaa.jpg",         title: "Title here", msg: "Message here — add the story behind this moment." },
    { type: "video", src: "photos/diwali-splash.mp4",  title: "Title here", msg: "Message here — add the story behind this moment." },
    { type: "image", src: "photos/coffee-date.jpg",    title: "Title here", msg: "Message here — add the story behind this moment." },
    { type: "video", src: "photos/control-majnu.mp4",  title: "Title here", msg: "Message here — add the story behind this moment." },
  ],

  // New tabs — royal-card pages (one card per entry). Add { src, title, msg }.
  // For a video card add type:"video". Leave a section empty → shows "Coming soon".
  // College Time — royal cards (same style as Lil Girl). Replace title/msg with the real words.
  collegeTime: [
    { src: "photos/college4.jpg",  title: "Title here", msg: "Message here — add the story behind this moment." },
    { src: "photos/college5.jpg",  title: "Title here", msg: "Message here — add the story behind this moment." },
    { src: "photos/college6.jpg",  title: "Title here", msg: "Message here — add the story behind this moment." },
    { src: "photos/college2.jpg",  title: "Title here", msg: "Message here — add the story behind this moment." },
    { src: "photos/college8.jpg",  title: "Title here", msg: "Message here — add the story behind this moment." },
    { src: "photos/college11.jpg", title: "Title here", msg: "Message here — add the story behind this moment." },
    { src: "photos/college9.jpg",  title: "Title here", msg: "Message here — add the story behind this moment." },
    { src: "photos/college3.jpg",  title: "Title here", msg: "Message here — add the story behind this moment." },
    { src: "photos/college1.jpg",  title: "Title here", msg: "Message here — add the story behind this moment." },
    { src: "photos/college7.jpg",  title: "Title here", msg: "Message here — add the story behind this moment." },
    { src: "photos/college10.jpg", title: "Title here", msg: "Message here — add the story behind this moment." },
    { src: "photos/college12.jpg", title: "Title here", msg: "Message here — add the story behind this moment." },
    { src: "photos/college13.jpg", title: "Title here", msg: "Message here — add the story behind this moment." },
    { src: "photos/college14.jpg", title: "Title here", msg: "Message here — add the story behind this moment." },
  ],
  northSouth: [],    // North & South (the marriage chapter)
  friends: [],       // Friends
  gift: [],          // Gift

  family: [         // family corner
    { src: "", cap: "The whole gang" },
    { src: "", cap: "With Dad" },
    { src: "", cap: "Festival day" },
    { src: "", cap: "Sunday lunch" },
  ],

  // Lekru page banners — full-width & swipeable at the top. Add 3–4 photo paths.
  lekruBanners: [
    "photos/LekruBanner1.jpg",
    "photos/LekruBanner2.png",
    // "photos/LekruBanner3.jpg",
    // "photos/LekruBanner4.jpg",
  ],
  // Small photo cards, 2 per row. First 4 show; the rest hide behind "See more".
  // Tap a card to open it big (title + message optional). For video add type:"video".
  lekrus: [
    { src: "", title: "", msg: "" },
    { src: "", title: "", msg: "" },
    { src: "", title: "", msg: "" },
    { src: "", title: "", msg: "" },
  ],

  // The "Best Lekru" game — best gets the party, other's button runs away 😜
  lekruGame: {
    best: "Rakshit",
    other: "Ashrit",
    certTitle: "Best Lekru",
    winSub: "Thaaankuuu Moyyyy !",          // second line shown on Rakshit's win
    // Ashrit reactions, shown in this exact order on 1st, 2nd, 3rd attempt:
    sadSequence: ["Hehe dhabbu moyy 😝", "Aga aga Aai 😭", "Nahi nah moyy plissh 🥺"],
    resetMs: 150000,                        // auto-reset the game after ~2.5 minutes
    // Each outcome: a video (YouTube or local mp4) then a photo that forms a framed certificate.
    // Drop the two photos in /photos with EXACTLY these names (or change the paths):
    winners: {
      rakshit: { name: "Rakshit", mood: "happy", video: "https://www.youtube.com/shorts/5M019f91XeM", photo: "photos/RakshitWin.jpg" },
      ashrit:  { name: "Ashrit",  mood: "sad",   video: "https://www.youtube.com/watch?v=WGbht0WtGGE", photo: "photos/AshritWin.png" },
    },
  },

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
    lekrus: { title: "Mom's Lekrus", eyebrow: "Rakshit & Ashrit", lead: "When North met South, they got East & West" },
  },
};
