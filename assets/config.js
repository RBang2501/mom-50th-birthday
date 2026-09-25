/* =================================================================
   ██  EDIT EVERYTHING HERE  ██  (one file powers every page)
   ================================================================= */
window.CONFIG = {
  // ---- The basics ----
  momName: "Mom",                    // used on the home hero + nav brand
  brand: "Moyy",                     // top-left site title (styled gold + elegant script)
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
    { src: "photos/bachpan1.jpg", title: "The Baby of the Bunch", msg: "The littlest one on the right, already the star of every frame." },
    { src: "photos/bachpan2.jpg", title: "Little Miss Sunshine",  msg: "A flower in her hair and mischief in her eyes, right at the centre of it all." },
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
    { type: "video", src: "photos/cute-laugh.mp4",     title: "Hehe",                    msg: "Kar di phir koi cutu harkat." },
    { type: "image", src: "photos/cutu.jpg",           title: "Cuteness Overload",       msg: "Seat number 68 aur haath mein snacks. Moyy ka rule: pet pehle, view baad mein." },
    { type: "video", src: "photos/golden-hour.mp4",    title: "Full Bollywood Mode",     msg: "Ek purana gaana kya baja, full filmy, full cute." },
    { type: "image", src: "photos/hehe.jpg",           title: "🥺",                       msg: "Kaan pakda gaya. Maiyaa, sorry sorry maiyaaa!" },
    { type: "video", src: "photos/batting.mp4",        title: "Cricket Moyy",            msg: "Kidhar gayi ball, kidhar gayii? Are are, bacha balance!" },
    { type: "image", src: "photos/air-hockey.jpg",     title: "Focus Focus!",            msg: "Yeh waala look aa gaya? Ab haarne ki baat hi mat karo." },
    { type: "video", src: "photos/udta-hi-phiro.mp4",  title: "Just Ladies Thing",       msg: "Haan, yeh karlo pehle.." },
    { type: "image", src: "photos/murugan-aunty.jpg",  title: "Murugan Aunty",           msg: "Kasavu saree, gajra aur woh signature nazar." },
    { type: "video", src: "photos/pool.mp4",           title: "Pool Champion (Almost)",  msg: "Itna time leke, kar diya foul!" },
    { type: "image", src: "photos/little-moyy.jpg",    title: "Chhoti Si Moyy",          msg: "Beta lamba ho gaya, par boss abhi bhi Moyy hi hai." },
    { type: "video", src: "photos/bowling.mp4",        title: "Strike?",                 msg: "Is baar bacha le re baba!" },
    { type: "image", src: "photos/buaaaa.jpg",         title: "Pyari Bua",               msg: "Woh bua jo sabko hasati hai." },
    { type: "video", src: "photos/diwali-splash.mp4",  title: "Kuch Bhi",                msg: "Nahi Nahi, Kuch Bhiiii !!!!" },
    { type: "image", src: "photos/coffee-date.jpg",    title: "Coffee Date",             msg: "Cold coffee, aur Moyy ki smile on point." },
    { type: "video", src: "photos/control-majnu.mp4",  title: "Control, Majnu!",         msg: "Gaadi Moyy ke haath mein, aur sab peeche se: Control Majnu, control!" },
  ],

  // New tabs — royal-card pages (one card per entry). Add { src, title, msg }.
  // For a video card add type:"video". Leave a section empty → shows "Coming soon".
  // College Time — royal cards (same style as Lil Girl). Replace title/msg with the real words.
  collegeTime: [
    { src: "photos/college4.jpg",  title: "Where It All Began",         msg: "Head down and dreams up, the long road to becoming a doctor starts here." },
    { src: "photos/college5.jpg",  title: "Files, Faith & First Steps", msg: "Notes held tight, with Dhanvantari watching over the future doctors." },
    { src: "photos/college6.jpg",  title: "Canteen Confessions",        msg: "Every big day deserved a little treat and a lot of gossip." },
    { src: "photos/college2.jpg",  title: "The Hostel Gang",            msg: "Between lectures, the corridor became the whole world." },
    { src: "photos/college8.jpg",  title: "Off the Beaten Path",        msg: "New roads, a borrowed hat, and not a care in the world." },
    { src: "photos/college11.jpg", title: "A Day by the Water",         msg: "Books shut and shoes off, an afternoon stolen by the shore." },
    { src: "photos/college9.jpg",  title: "Golden Afternoons",          msg: "Piled together in the grass, with time slowing just for them." },
    { src: "photos/college3.jpg",  title: "Under the College Sign",     msg: "Government Ayurvedic College, Nagpur, where the story found its home." },
    { src: "photos/college1.jpg",  title: "Full Filmy Mode",            msg: "Four friends, one filmy pose, and a whole lot of joy." },
    { src: "photos/college7.jpg",  title: "The Whole Batch",            msg: "The girls who turned classmates into family." },
    { src: "photos/college10.jpg", title: "Dressed to the Nines",       msg: "Saris pressed and best smiles on, all ready for the frame." },
    { src: "photos/college12.jpg", title: "The White Coats",            msg: "Aprons on and stethoscopes ready, the dream in uniform at last." },
    { src: "photos/college14.jpg", title: "Till We Meet Again",         msg: "The last frame of a golden chapter, friends forever." },
  ],
  // North & South banner (marriage chapter) — swipeable, styled like the Lekru banner.
  northSouthBanners: [
    { src: "photos/ns-mom.jpg",     title: "One World",     msg: "" },
    { src: "photos/ns-dad.jpg",     title: "Another World", msg: "" },
    { src: "photos/ns-wedding.jpg", title: "One Home",      msg: "" },
  ],
  gift: [],          // (legacy, unused)

  // Gift page — scratch off the gold cover to reveal the gift underneath.
  giftCard: {
    hint: "Golden Jubilee",
    scratchLabel: "Scratch to reveal your gift",
    prizeEmoji: "👑",
    prize: "A Gift of Gold",
    message: "Fifty golden years, and you have made every single one of them shine. So the whole MARS family got together and agreed on the only gift worthy of our golden girl: {{GOLD}}, as precious as you are. Happy 50th, Mom. We love you.",
    council: [ ["M", "Manisha"], ["A", "Ashrit"], ["R", "Rakshit"], ["S", "Sanjay"] ],
  },

  family: [         // family corner — masonry photo wall (add a cap: "..." for a caption)
    { src: "photos/family1.jpg" },
    { src: "photos/family2.jpg" },
    { src: "photos/family3.jpg" },
    { src: "photos/family4.jpg" },
    { src: "photos/family5.jpg" },
    { src: "photos/family6.jpg" },
    { src: "photos/family7.jpg" },
    { src: "photos/family8.jpg" },
    { src: "photos/family9.jpg" },
    { src: "photos/family10.jpg" },
    { src: "photos/family11.jpg" },
    { src: "photos/family12.jpg" },
    { src: "photos/family13.jpg" },
    { src: "photos/family14.jpg" },
    { src: "photos/family15.jpg" },
    { src: "photos/family16.jpg" },
    { src: "photos/family17.jpg" },
  ],

  // Lekru page banners — full-width & swipeable at the top. Add 3–4 photo paths.
  lekruBanners: [
    { src: "photos/LekruBanner1.jpg", title: "The Innocent Trio", msg: "Maa and her two little boys." },
    { src: "photos/LekruBanner2.png", title: "The Two Cutus",     msg: "Two brothers, always together." },
  ],
  // Small photo cards, 2 per row. First 4 show; the rest hide behind "See more".
  // Tap a card to open it big (title + message optional). For video add type:"video".
  lekrus: [
    { src: "photos/lekru1.jpg" },
    { src: "photos/lekru2.jpg" },
    { src: "photos/lekru3.jpg" },
    { src: "photos/lekru4.jpg" },
    { src: "photos/lekru5.jpg" },
    { src: "photos/lekru6.jpg" },
    { src: "photos/lekru7.jpg" },
    { src: "photos/lekru8.jpg" },
    { src: "photos/lekru9.jpg" },
    { src: "photos/lekru10.jpg" },
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
