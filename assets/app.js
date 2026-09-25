/* =================================================================
   Shared behaviour for every page. No need to edit.
   ================================================================= */
(function () {
  "use strict";
  var C = window.CONFIG || {};
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var revealAt = C.reveal ? new Date(C.reveal.date).getTime() : 0;
  var isRevealed = function () { return Date.now() >= revealAt; };

  // Pages in the top nav (share.html is intentionally excluded).
  var NAV = [
    { href: "bachpan.html", label: "Lil Girl" },
    { href: "college.html", label: "College Time" },
    { href: "north-south.html", label: "North & South" },
    { href: "lekrus.html", label: (C.labels && C.labels.lekrus && C.labels.lekrus.title) || "Mom's Lekrus" },
    { href: "family-corner.html", label: "Family Corner" },
    { href: "friends.html", label: "Dear Friends" },
    { href: "cute-moments.html", label: "Fun Moments" },
    { href: "gift.html", label: "Gift" },
  ];

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.body.hasAttribute("data-bare")) { injectNav(); injectFooter(); }
    bindText();
    renderReasons();
    renderTimelines();
    renderCardStacks();
    renderGalleries();
    renderCarousels();
    renderBanners();
    renderGrid();
    renderWishes();
    setupLightbox();
    setupCake();
    setupLekruGame();
    setupScratchCard();
    setupWall();
    setupShare();
    setupHeroSparkles();
    setupReveal();
    setupConfetti();
    // Celebratory confetti when the hero's "50" lands.
    if (!reduce && document.querySelector(".hero")) setTimeout(function () { if (window.fireConfetti) window.fireConfetti(); }, 950);
  });

  /* ---------- Navigation ---------- */
  function currentFile() {
    var p = location.pathname.split("/").pop();
    return p && p.length ? p : "index.html";
  }
  function injectNav() {
    var here = currentFile();
    var nav = document.createElement("nav");
    nav.className = "nav";
    var links = NAV.map(function (n) {
      var locked = n.href === "memories.html" && !isRevealed();
      var cur = n.href === here ? ' aria-current="page"' : "";
      return '<a href="' + n.href + '"' + cur + '>' + esc(n.label) + (locked ? ' <span class="lock">🔒</span>' : "") + "</a>";
    }).join("");
    nav.innerHTML =
      '<a class="brand" href="index.html"><b>50</b> · ' + esc(C.momName || "Mom") + "</a>" +
      '<button class="nav-toggle" aria-label="Menu" aria-expanded="false">' +
      "<span></span><span></span><span></span></button>" +
      '<div class="nav-links">' + links + "</div>";
    document.body.insertBefore(nav, document.body.firstChild);
    var btn = $(".nav-toggle", nav);
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  function injectFooter() {
    var f = document.createElement("footer");
    f.className = "foot";
    f.innerHTML = "<p>Made with <span class='heart'>&hearts;</span> for the best mom in the world.</p>";
    document.body.appendChild(f);
  }

  /* ---------- Text bindings ---------- */
  function resolve(path) {
    if (path === "lockedNote") return C.reveal && C.reveal.lockedNote;
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, C);
  }
  function bindText() {
    $$("[data-cfg]").forEach(function (el) {
      var v = resolve(el.getAttribute("data-cfg"));
      if (v != null) el.textContent = v;
    });
  }

  /* ---------- 50 reasons ---------- */
  function renderReasons() {
    var grid = $("[data-reasons]"); if (!grid) return;
    (C.reasons || []).forEach(function (r, i) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "card-flip reveal";
      b.setAttribute("aria-label", "Reveal reason " + (i + 1));
      b.innerHTML = '<div class="inner"><div class="face front"><div><div class="no">' + (i + 1) +
        '</div><div class="hint">Tap to reveal</div></div></div>' +
        '<div class="face back"><p>' + esc(r) + '<span class="heart">&hearts;</span></p></div></div>';
      b.addEventListener("click", function () { b.classList.toggle("flipped"); });
      grid.appendChild(b);
    });
  }

  /* ---------- Timelines (bachpan) ---------- */
  function renderTimelines() {
    $$("[data-timeline]").forEach(function (ol) {
      var items = C[ol.getAttribute("data-timeline")] || [];
      ol.innerHTML = items.map(function (t) {
        var inner;
        if (!t.src) {
          inner = '<span class="t-ph">Add photo</span>';
        } else {
          var isVideo = t.type === "video" || /\.(mp4|mov|webm|m4v)(\?|#|$)/i.test(t.src);
          var thumb = isVideo
            ? '<video src="' + esc(t.src) + '#t=0.1" muted playsinline preload="metadata"></video><span class="t-play" aria-hidden="true"></span>'
            : '<img src="' + esc(t.src) + '" alt="" loading="lazy" />';
          inner = '<button type="button" class="t-open" data-kind="' + (isVideo ? "video" : "image") + '"' +
            ' data-full="' + esc(t.src) + '" data-title="' + esc(t.title || "") + '" data-msg="' + esc(t.msg || "") + '"' +
            ' aria-label="Open ' + (isVideo ? "video" : "photo") + '">' + thumb + "</button>";
        }
        return '<li class="t-item reveal">' +
          '<figure class="t-photo">' + inner + "</figure>" +
          '<span class="t-node" aria-hidden="true"></span>' +
        "</li>";
      }).join("");
    });
  }

  /* ---------- "Lil Girl" royal cards shown inline (one per screen) ---------- */
  function renderCardStacks() {
    $$("[data-cards]").forEach(function (box) {
      var items = C[box.getAttribute("data-cards")] || [];
      var html = items.map(function (t) {
        if (!t.src) return "";
        var isVideo = t.type === "video" || /\.(mp4|mov|webm|m4v)(\?|#|$)/i.test(t.src);
        var media = isVideo
          ? '<video src="' + esc(t.src) + '" controls playsinline preload="metadata"></video>'
          : '<img src="' + esc(t.src) + '" alt="' + esc(t.title || "") + '" loading="lazy" />';
        var title = t.title ? '<h3 class="lb-title">' + esc(t.title) + "</h3>" : "";
        var divider = (t.title || t.msg) ? '<div class="lb-divider" aria-hidden="true"><span></span><i></i><span></span></div>' : "";
        var msg = t.msg ? '<p class="lb-msg">' + esc(t.msg) + "</p>" : "";
        return '<div class="card-screen reveal"><figure class="lb-card rcard">' +
          '<div class="lb-media">' + media + "</div>" + title + divider + msg +
        "</figure></div>";
      }).join("");
      box.innerHTML = html || '<p class="empty-note">Coming soon 💛</p>';
    });
  }

  /* ---------- Royal lightbox card (tap a tree photo/video to open) ---------- */
  function setupLightbox() {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.hidden = true;
    box.innerHTML =
      '<div class="lb-backdrop"></div>' +
      '<figure class="lb-card" role="dialog" aria-modal="true" aria-label="Moment">' +
        '<button type="button" class="lb-close" aria-label="Close">&times;</button>' +
        '<div class="lb-media"></div>' +
        '<h3 class="lb-title" hidden></h3>' +
        '<div class="lb-divider" aria-hidden="true" hidden><span></span><i></i><span></span></div>' +
        '<p class="lb-msg" hidden></p>' +
      "</figure>";
    document.body.appendChild(box);
    var media = box.querySelector(".lb-media");
    var titleEl = box.querySelector(".lb-title");
    var divEl = box.querySelector(".lb-divider");
    var msgEl = box.querySelector(".lb-msg");

    function stopMedia() {
      var v = media.querySelector("video");
      if (v) { try { v.pause(); } catch (e) {} }
      media.innerHTML = "";
    }
    function open(kind, src, title, text) {
      stopMedia();
      if (kind === "video") {
        media.innerHTML = '<video src="' + esc(src) + '" controls autoplay playsinline preload="auto"></video>';
        var v = media.querySelector("video");
        if (v) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
      } else {
        media.innerHTML = '<img src="' + esc(src) + '" alt="' + esc(title || "") + '" />';
      }
      if (title) { titleEl.textContent = title; titleEl.hidden = false; }
      else { titleEl.textContent = ""; titleEl.hidden = true; }
      if (text) { msgEl.textContent = text; msgEl.hidden = false; }
      else { msgEl.textContent = ""; msgEl.hidden = true; }
      divEl.hidden = !(title || text);
      box.hidden = false;
      document.body.classList.add("lb-open");
      box.querySelector(".lb-close").focus();
    }
    function close() {
      stopMedia();
      box.hidden = true;
      document.body.classList.remove("lb-open");
    }

    document.addEventListener("click", function (e) {
      var t = e.target;
      var btn = t.closest && t.closest(".t-open");
      if (btn) {
        open(btn.getAttribute("data-kind"), btn.getAttribute("data-full"),
             btn.getAttribute("data-title"), btn.getAttribute("data-msg"));
        return;
      }
      if (t.closest && (t.closest(".lb-close") || (t.classList && t.classList.contains("lb-backdrop")))) close();
    });
    document.addEventListener("keydown", function (e) {
      if ((e.key === "Escape" || e.key === "Esc") && !box.hidden) close();
    });
  }

  /* ---------- Galleries ---------- */
  function renderGalleries() {
    $$("[data-gallery]").forEach(function (box) {
      var items = C[box.getAttribute("data-gallery")] || [];
      if (!items.length) { box.innerHTML = '<p class="empty-note">Photos coming soon 💛</p>'; return; }
      box.innerHTML = items.map(function (p) {
        var media = p.src
          ? '<img src="' + esc(p.src) + '" alt="' + esc(p.cap || "") + '" loading="lazy" />'
          : '<div class="placeholder">Add photo</div>';
        var cap = p.cap ? '<figcaption class="cap">' + esc(p.cap) + "</figcaption>" : "";
        return '<figure class="photo reveal">' + media + cap + "</figure>";
      }).join("");
    });
  }

  /* ---------- Photo card carousel (one at a time on mobile) ---------- */
  function renderCarousels() {
    $$("[data-carousel]").forEach(function (box) {
      var items = C[box.getAttribute("data-carousel")] || [];
      if (!items.length) { box.innerHTML = '<p class="empty-note">Photos coming soon 💛</p>'; return; }
      var cards = items.map(function (p) {
        var media = p.src
          ? '<img src="' + esc(p.src) + '" alt="' + esc(p.cap || "") + '" loading="lazy" />'
          : '<div class="placeholder">Add photo</div>';
        var cap = p.cap ? '<h3 class="mc-cap">' + esc(p.cap) + "</h3>" : "";
        var msg = p.msg ? '<p class="mc-msg">' + esc(p.msg) + "</p>" : "";
        return '<figure class="mem-card">' + media + '<figcaption class="mc-body">' + cap + msg + "</figcaption></figure>";
      }).join("");
      box.innerHTML =
        '<button class="car-arrow prev" type="button" aria-label="Previous photo">‹</button>' +
        '<div class="car-track">' + cards + "</div>" +
        '<button class="car-arrow next" type="button" aria-label="Next photo">›</button>' +
        '<div class="car-dots"></div>';

      var track = box.querySelector(".car-track");
      var slides = Array.prototype.slice.call(track.children);
      var dotsBox = box.querySelector(".car-dots");
      dotsBox.innerHTML = slides.map(function (_, i) {
        return '<button class="dot' + (i === 0 ? " on" : "") + '" type="button" aria-label="Go to photo ' + (i + 1) + '"></button>';
      }).join("");
      var dots = Array.prototype.slice.call(dotsBox.children);

      function goTo(i) {
        i = Math.max(0, Math.min(slides.length - 1, i));
        var s = slides[i];
        track.scrollTo({ left: s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
      }
      function current() {
        var mid = track.scrollLeft + track.clientWidth / 2, best = 0, bd = Infinity;
        slides.forEach(function (s, i) { var d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - mid); if (d < bd) { bd = d; best = i; } });
        return best;
      }
      dots.forEach(function (d, i) { d.addEventListener("click", function () { goTo(i); }); });
      box.querySelector(".prev").addEventListener("click", function () { goTo(current() - 1); });
      box.querySelector(".next").addEventListener("click", function () { goTo(current() + 1); });
      var raf;
      track.addEventListener("scroll", function () {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () { var i = current(); dots.forEach(function (d, j) { d.classList.toggle("on", j === i); }); });
      });
    });
  }

  /* ---------- Lekru banners (full-width, swipeable) ---------- */
  function renderBanners() {
    $$("[data-banners]").forEach(function (box) {
      var raw = C[box.getAttribute("data-banners")] || [];
      var items = raw.map(function (it) { return typeof it === "string" ? { src: it } : it; })
                     .filter(function (it) { return it && it.src; });
      if (!items.length) { box.innerHTML = '<div class="banner-ph">Add banner photos</div>'; return; }
      var slides = items.map(function (it) {
        var cap = (it.title || it.msg)
          ? '<figcaption class="banner-cap">' +
              (it.title ? '<h3 class="banner-title">' + esc(it.title) + "</h3>" : "") +
              (it.title && it.msg ? '<span class="banner-rule" aria-hidden="true"></span>' : "") +
              (it.msg ? '<p class="banner-msg">' + esc(it.msg) + "</p>" : "") +
            "</figcaption>"
          : "";
        return '<figure class="banner-slide"><img src="' + esc(it.src) + '" alt="' + esc(it.title || "") + '" loading="lazy" />' + cap + "</figure>";
      }).join("");
      box.innerHTML = '<div class="banner-track">' + slides + "</div>" + (items.length > 1 ? '<div class="banner-dots"></div>' : "");
      if (items.length <= 1) return;
      var track = box.querySelector(".banner-track");
      var slidesEls = Array.prototype.slice.call(track.children);
      var dotsBox = box.querySelector(".banner-dots");
      dotsBox.innerHTML = slidesEls.map(function (_, i) { return '<button class="dot' + (i === 0 ? " on" : "") + '" type="button" aria-label="Banner ' + (i + 1) + '"></button>'; }).join("");
      var dots = Array.prototype.slice.call(dotsBox.children);
      function cur() { var mid = track.scrollLeft + track.clientWidth / 2, b = 0, bd = Infinity; slidesEls.forEach(function (s, i) { var d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - mid); if (d < bd) { bd = d; b = i; } }); return b; }
      dots.forEach(function (d, i) { d.addEventListener("click", function () { var s = slidesEls[i]; track.scrollTo({ left: s.offsetLeft, behavior: reduce ? "auto" : "smooth" }); }); });
      var raf; track.addEventListener("scroll", function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(function () { var i = cur(); dots.forEach(function (d, j) { d.classList.toggle("on", j === i); }); }); });
    });
  }

  /* ---------- Lekru photo grid (2 per row + See more) ---------- */
  function renderGrid() {
    $$("[data-grid]").forEach(function (box) {
      var items = C[box.getAttribute("data-grid")] || [];
      var LIMIT = 6;
      var cards = items.map(function (p, i) {
        var extra = i >= LIMIT ? " is-extra" : "";
        if (!p.src) return '<figure class="lg-card' + extra + '"><div class="placeholder">Add photo</div></figure>';
        var isVideo = p.type === "video" || /\.(mp4|mov|webm|m4v)(\?|#|$)/i.test(p.src);
        var thumb = isVideo
          ? '<video src="' + esc(p.src) + '#t=0.1" muted playsinline preload="metadata"></video><span class="t-play" aria-hidden="true"></span>'
          : '<img src="' + esc(p.src) + '" alt="' + esc(p.title || "") + '" loading="lazy" />';
        return '<figure class="lg-card' + extra + '"><button type="button" class="t-open" data-kind="' + (isVideo ? "video" : "image") +
          '" data-full="' + esc(p.src) + '" data-title="' + esc(p.title || "") + '" data-msg="' + esc(p.msg || "") + '" aria-label="Open">' + thumb + "</button></figure>";
      }).join("");
      var more = items.length > LIMIT ? '<div class="see-more-wrap"><button class="btn ghost see-more" type="button" data-more>See more</button></div>' : "";
      box.innerHTML = '<div class="lg-cards">' + cards + "</div>" + more;
      var moreBtn = box.querySelector("[data-more]");
      if (moreBtn) moreBtn.addEventListener("click", function () {
        var expanded = box.classList.toggle("grid-expanded");
        moreBtn.textContent = expanded ? "See less" : "See more";
      });
    });
  }

  /* ---------- Lekru wishes ---------- */
  function renderWishes() {
    $$("[data-wishes]").forEach(function (box) {
      var items = C[box.getAttribute("data-wishes")] || [];
      box.innerHTML = items.map(function (w) {
        return '<div class="wish-card reveal"><p class="quote">' + esc(w.text) + '</p><div class="who">' + esc(w.from) + "</div></div>";
      }).join("");
    });
  }

  /* ---------- Best Lekru game → winner reveal → framed certificate ---------- */
  function setupLekruGame() {
    var game = $("#lekru-game"); if (!game) return;
    var cfg = C.lekruGame || {};
    var play = $("#game-play"), arena = $("#arena"), mascot = $("#game-mascot"), result = $("#game-result");
    var best = $("#vote-best"), other = $("#vote-other");
    var video = $("#game-video"), cta = $("#reveal-cta"), cert = $("#game-cert"), replay = $("#game-replay");
    if (cfg.best) best.textContent = cfg.best;
    if (cfg.other) other.textContent = cfg.other;
    var seq = cfg.sadSequence && cfg.sadSequence.length ? cfg.sadSequence : ["Hehe dhabbu moyy 😝", "Aga aga Aai 😭", "Nahi nah moyy plissh 🥺"];
    var winners = cfg.winners || {};
    var certTitle = cfg.certTitle || "Best Lekru";
    var tries = 0, decided = false, resetTimer = null, resetMs = cfg.resetMs || 150000;

    function ytId(u) {
      var m = String(u || "").match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/);
      if (m) return m[1];
      return /^[A-Za-z0-9_-]{11}$/.test(u) ? u : "";
    }
    function scheduleReset() { clearTimeout(resetTimer); resetTimer = setTimeout(replayGame, resetMs); }

    function replayGame() {
      clearTimeout(resetTimer);
      decided = false; tries = 0; lastTry = 0;
      cert.hidden = true; cert.innerHTML = ""; cert.classList.remove("show");
      replay.hidden = true;
      play.hidden = false;
      arena.classList.remove("gone");
      mascot.textContent = "🙂"; mascot.className = "game-mascot";
      best.classList.remove("crowned");
      other.classList.remove("runaway"); other.style.transition = ""; other.style.transform = "";
      result.className = "game-result"; result.innerHTML = "";
      video.hidden = true; video.innerHTML = ""; delete video.dataset.loaded;
      cta.hidden = true; cta.innerHTML = "";
    }

    function showVideoCard(url) {
      video.hidden = false;
      var id = ytId(url);
      if (id) {
        var thumb = "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
        video.innerHTML = '<button class="video-play" type="button" style="background-image:url(' + thumb + ')" aria-label="Play the video with sound">' +
          '<span class="video-play-btn">►</span><span class="video-play-label">Tap to play with sound</span></button>';
        video.querySelector(".video-play").addEventListener("click", function () {
          video.innerHTML = '<iframe src="https://www.youtube.com/embed/' + id + '?autoplay=1&playsinline=1&rel=0" title="A message" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
        });
      } else if (url) {
        video.innerHTML = '<video src="' + esc(url) + '" playsinline controls preload="metadata"></video>';
      } else {
        video.hidden = true;
      }
    }

    function declareWinner(key) {
      if (decided) return; decided = true;
      var w = winners[key] || {};
      var happy = (w.mood || "happy") !== "sad";
      arena.classList.add("gone");            // retire the buttons
      best.classList.remove("crowned");
      if (happy) {
        mascot.textContent = "😎"; mascot.className = "game-mascot happy";
        result.className = "game-result win";
        result.innerHTML = '<span class="win-main">👑 ' + esc(certTitle) + "!</span>" +
          (cfg.winSub ? '<span class="sub">' + esc(cfg.winSub) + "</span>" : "");
        fireConfetti();
      } else {
        mascot.textContent = "😭"; mascot.className = "game-mascot sad";
        result.className = "game-result aww";   // keep the last cry line already shown
      }
      showVideoCard(w.video);
      cta.hidden = false;
      cta.innerHTML = '<button class="btn gold reveal-btn" type="button">Reveal the ' + esc(certTitle) + " certificate ✨</button>";
      cta.querySelector("button").addEventListener("click", function () { revealCertificate(key); });
      scheduleReset();
    }

    function revealCertificate(key) {
      var w = winners[key] || {};
      var happy = (w.mood || "happy") !== "sad";
      var photo = w.photo
        ? '<img src="' + esc(w.photo) + '" alt="' + esc(w.name || "") + '" onerror="this.style.display=&quot;none&quot;" />'
        : '<span class="cert-ph">☺</span>';
      cert.innerHTML =
        '<div class="cert" data-mood="' + (happy ? "happy" : "sad") + '">' +
          '<span class="cert-corner tl"></span><span class="cert-corner tr"></span>' +
          '<span class="cert-corner bl"></span><span class="cert-corner br"></span>' +
          '<p class="cert-kicker">Certificate of</p>' +
          '<h3 class="cert-title">' + esc(certTitle) + "</h3>" +
          '<div class="cert-photo">' + photo + "</div>" +
          '<p class="cert-awarded">is proudly awarded to</p>' +
          '<div class="cert-name script">' + esc(w.name || "") + "</div>" +
          '<div class="cert-rule"><span></span><i></i><span></span></div>' +
          '<p class="cert-foot">Golden Jubilee · Est. ' + esc(C.estYear || "1976") + "</p>" +
          '<div class="cert-seal" aria-hidden="true">★</div>' +
        "</div>";
      play.hidden = true;
      cert.hidden = false;
      void cert.offsetWidth;                  // flush before animating
      cert.classList.add("show");
      replay.hidden = false;
      if (happy) { fireConfetti(); setTimeout(fireConfetti, 550); }
      scheduleReset();
    }

    // Rakshit wins on click.
    best.addEventListener("click", function () { declareWinner("rakshit"); });

    // Ashrit's button glides away and can't be caught; after 3 tries he "wins" (sad finale).
    function moveAway(avoidX, avoidY) {
      var a = arena.getBoundingClientRect();
      var bw = other.offsetWidth || 120, bh = other.offsetHeight || 50;
      var maxX = Math.max(0, a.width - bw), maxY = Math.max(0, a.height - bh);
      var nx = 0, ny = 0;
      for (var t = 0; t < 16; t++) {
        nx = Math.random() * maxX; ny = Math.random() * maxY;
        if (typeof avoidX !== "number") break;
        if (Math.hypot((a.left + nx + bw / 2) - avoidX, (a.top + ny + bh / 2) - avoidY) > 150) break;
      }
      other.style.transform = "translate(" + nx + "px," + ny + "px)";
    }
    function goRunaway() {
      if (other.classList.contains("runaway")) return;
      var a = arena.getBoundingClientRect(), r = other.getBoundingClientRect();
      other.style.transition = "none";
      other.classList.add("runaway");
      other.style.transform = "translate(" + (r.left - a.left) + "px," + (r.top - a.top) + "px)";
      void other.offsetWidth;
      other.style.transition = "";
    }
    var lastMove = 0, lastTry = 0;
    function dodge(x, y) {
      if (decided) return;
      goRunaway();
      var now = Date.now();
      if (now - lastMove > 80) { moveAway(x, y); lastMove = now; }
      mascot.textContent = "😭"; mascot.className = "game-mascot sad";
      best.classList.remove("crowned");
      if (now - lastTry > 700) {
        lastTry = now; tries++;
        result.className = "game-result aww";
        result.textContent = seq[Math.min(tries - 1, seq.length - 1)] || "";
        if (tries >= 3) declareWinner("ashrit");
      }
      if (!decided) scheduleReset();
    }
    ["pointerenter", "pointerdown", "focus", "touchstart"].forEach(function (ev) {
      other.addEventListener(ev, function (e) {
        if (e && e.cancelable) e.preventDefault();
        var x = e && e.clientX, y = e && e.clientY;
        if (e && e.touches && e.touches[0]) { x = e.touches[0].clientX; y = e.touches[0].clientY; }
        dodge(x, y);
      }, { passive: false });
    });
    other.addEventListener("click", function (e) { e.preventDefault(); dodge(e.clientX, e.clientY); });
    arena.addEventListener("mousemove", function (e) {
      if (decided) return;
      var r = other.getBoundingClientRect();
      if (Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)) < 95) dodge(e.clientX, e.clientY);
    });

    replay.addEventListener("click", replayGame);
  }

  /* ---------- Gift scratch card ---------- */
  function setupScratchCard() {
    var card = $("#scratch-card"); if (!card) return;
    var canvas = $("#scratch-cover", card); if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var cfg = C.giftCard || {};
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var revealed = false, drawing = false, lastCheck = 0;

    // Build the prize that sits underneath the scratch cover.
    var prizeBox = $("#scratch-prize", card);
    if (prizeBox) {
      var council = (cfg.council || []).map(function (c) {
        return '<span class="mars-item"><b>' + esc(c[0]) + "</b>" + esc(String(c[1]).slice(1)) + "</span>";
      }).join("");
      prizeBox.innerHTML =
        '<div class="sc-emoji">' + esc(cfg.prizeEmoji || "🪙") + "</div>" +
        '<div class="sc-kicker">You are awarded</div>' +
        '<div class="sc-prize">' + esc(cfg.prize || "Gold") + "</div>" +
        '<p class="sc-msg">' + esc(cfg.message || "") + "</p>" +
        (council ? '<div class="sc-council-title">Council of the MARS Family</div><div class="mars-names">' + council + "</div>" : "");
    }

    function paintCover() {
      var w = card.clientWidth, h = card.clientHeight;
      if (!w || !h) return;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "#7f5f1f"); g.addColorStop(0.35, "#d7b24e"); g.addColorStop(0.5, "#f6e29a"); g.addColorStop(0.65, "#d7b24e"); g.addColorStop(1, "#7f5f1f");
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.16)";
      for (var i = 0; i < 46; i++) { ctx.beginPath(); ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 2 + 0.5, 0, 7); ctx.fill(); }
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(55,38,8,0.9)";
      var hint = (cfg.hint || "Golden Jubilee").toUpperCase();
      var fs = Math.round(Math.min(w, h) * 0.11);
      ctx.font = "600 " + fs + "px 'Cormorant SC', Georgia, serif";
      var tw = ctx.measureText(hint).width, maxw = w * 0.82;
      if (tw > maxw) { fs = Math.floor(fs * maxw / tw); ctx.font = "600 " + fs + "px 'Cormorant SC', Georgia, serif"; }
      ctx.fillText(hint, w / 2, h * 0.45);
      ctx.fillStyle = "rgba(55,38,8,0.72)";
      ctx.font = "italic " + Math.round(Math.min(w, h) * 0.052) + "px 'Cormorant Garamond', Georgia, serif";
      ctx.fillText(cfg.scratchLabel || "Scratch to reveal your gift", w / 2, h * 0.54);
      // little coin hint
      ctx.font = Math.round(Math.min(w, h) * 0.11) + "px serif";
      ctx.fillText("🪙", w / 2, h * 0.68);
    }
    function pos(e) { var r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
    function scratch(p) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath(); ctx.arc(p.x, p.y, 44, 0, 7); ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    }
    function clearedRatio() {
      var data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      var clear = 0, n = 0;
      for (var i = 3; i < data.length; i += 4 * 50) { n++; if (data[i] === 0) clear++; }
      return n ? clear / n : 0;
    }
    function finish() { if (revealed) return; revealed = true; card.classList.add("revealed"); if (window.fireConfetti) window.fireConfetti(); }

    paintCover();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (!revealed) paintCover(); });
    window.addEventListener("resize", function () { if (!revealed) paintCover(); });

    canvas.addEventListener("pointerdown", function (e) { if (revealed) return; drawing = true; scratch(pos(e)); if (e.cancelable) e.preventDefault(); });
    canvas.addEventListener("pointermove", function (e) {
      if (!drawing || revealed) return; scratch(pos(e));
      if (Date.now() - lastCheck > 60) { lastCheck = Date.now(); if (clearedRatio() > 0.14) finish(); }
      if (e.cancelable) e.preventDefault();
    });
    window.addEventListener("pointerup", function () { if (!drawing) return; drawing = false; if (!revealed && clearedRatio() > 0.09) finish(); });
  }

  /* ---------- Cake ---------- */
  function setupCake() {
    var wrap = $("#candles"); if (!wrap) return;
    for (var i = 0; i < 22; i++) { var c = document.createElement("div"); c.className = "candle"; c.innerHTML = '<div class="flame"></div>'; wrap.appendChild(c); }
    var btn = $("#blow-btn"), msg = $("#cake-msg"), blown = false;
    if (!btn) return;
    btn.addEventListener("click", function () {
      var candles = $$(".candle");
      if (blown) { candles.forEach(function (c) { c.classList.remove("out"); }); if (msg) msg.classList.remove("show"); btn.textContent = "Blow out the candles"; blown = false; return; }
      candles.forEach(function (c, i) { setTimeout(function () { c.classList.add("out"); }, reduce ? 0 : i * 45); });
      setTimeout(function () { if (msg) msg.classList.add("show"); fireConfetti(); }, reduce ? 0 : candles.length * 45 + 150);
      btn.textContent = "Relight & wish again"; blown = true;
    });
  }

  /* ---------- Memory wall ---------- */
  function driveThumb(raw) {
    if (!raw) return "";
    var first = String(raw).split(/[,\s]+/).filter(Boolean)[0] || "";
    var m = first.match(/[-\w]{25,}/);
    return m ? "https://drive.google.com/thumbnail?id=" + m[0] + "&sz=w1000" : "";
  }
  function memoryHTML(x) {
    var img = x.photo ? '<img src="' + esc(x.photo) + '" alt="A memory with ' + esc(C.momName || "Mom") + '" loading="lazy" referrerpolicy="no-referrer" />' : "";
    var msg = x.msg ? '<p class="msg">“' + esc(x.msg) + '”</p>' : "";
    var from = x.from ? '<div class="from">— ' + esc(x.from) + "</div>" : "";
    return '<figure class="memory reveal in">' + img + '<figcaption class="body">' + msg + from + "</figcaption></figure>";
  }
  function setupWall() {
    var section = $("#wall-section"); if (!section) return;
    var locked = $("#wall-locked"), open = $("#wall-open"), cd = $("#countdown");
    function renderCountdown() {
      var ms = Math.max(0, revealAt - Date.now());
      var d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
      cd.innerHTML = [["Days", d], ["Hours", h], ["Min", m], ["Sec", s]].map(function (u) {
        return '<div class="cd-unit"><div class="v">' + String(u[1]).padStart(2, "0") + '</div><div class="l">' + u[0] + "</div></div>";
      }).join("");
    }
    function loadWall() {
      var G = C.google || {}, grid = $("#wall-grid"), status = $("#wall-status");
      if (!G.sheetId) {
        grid.innerHTML = [{ from: "Add yours", msg: "Your photo and message will appear here." }, { from: "…and yours", msg: "Everyone's memories gather on this wall." }].map(memoryHTML).join("");
        status.textContent = "Connect your Google Sheet in assets/config.js to show real memories.";
        return;
      }
      status.textContent = "Loading memories…";
      var url = "https://docs.google.com/spreadsheets/d/" + G.sheetId + "/gviz/tq?tqx=out:json&sheet=" + encodeURIComponent(G.sheetName || "Form Responses 1");
      fetch(url).then(function (r) { return r.text(); }).then(function (txt) {
        var json = JSON.parse(txt.substring(txt.indexOf("{"), txt.lastIndexOf("}") + 1));
        var rows = (json.table && json.table.rows) || [], col = G.columns || {};
        var items = rows.map(function (r) {
          var c = r.c || [], val = function (i) { return (i >= 0 && c[i] ? c[i].v : ""); };
          var ok = col.approved < 0 ? true : /^(yes|true|1|y|✓)/i.test(String(val(col.approved)));
          return { from: val(col.name), msg: val(col.message), photo: driveThumb(val(col.photo)), approved: ok };
        }).filter(function (x) { return x.approved && (x.msg || x.photo); }).reverse();
        grid.innerHTML = items.map(memoryHTML).join("");
        status.textContent = items.length ? "" : "No memories yet — be the first to add one!";
      }).catch(function () {
        status.textContent = "Couldn't load the wall. Make sure the Sheet is shared “Anyone with the link: Viewer.”";
      });
    }
    if (isRevealed()) { open.hidden = false; loadWall(); }
    else {
      locked.hidden = false; renderCountdown();
      if (!reduce) {
        var t = setInterval(function () {
          renderCountdown();
          if (isRevealed()) { clearInterval(t); locked.hidden = true; open.hidden = false; loadWall(); fireConfetti(); }
        }, 1000);
      }
    }
  }

  /* ---------- Share form ---------- */
  function setupShare() {
    var openForm = $("#open-form"); if (!openForm) return;
    var G = C.google || {}, embed = $("#form-embed"), iframe = $("#form-iframe");
    if (G.formUrl) {
      openForm.href = G.formUrl;
      if (G.embedForm && iframe && embed) {
        iframe.src = G.formUrl.indexOf("embedded=true") >= 0 ? G.formUrl : G.formUrl + (G.formUrl.indexOf("?") >= 0 ? "&" : "?") + "embedded=true";
        embed.hidden = false;
      }
    } else {
      openForm.addEventListener("click", function (e) { e.preventDefault(); alert("Add your Google Form link in assets/config.js (google.formUrl). See README."); });
    }
  }

  /* ---------- Hero sparkles ---------- */
  function setupHeroSparkles() {
    var hero = $(".hero"); if (!hero || reduce) return;
    for (var i = 0; i < 22; i++) {
      var s = document.createElement("div"); s.className = "sparkle";
      var size = 2 + Math.random() * 4; s.style.width = s.style.height = size + "px";
      s.style.left = Math.random() * 100 + "%"; s.style.top = Math.random() * 100 + "%";
      s.style.animationDelay = (Math.random() * 4) + "s"; hero.appendChild(s);
    }
  }

  /* ---------- Reveal on scroll ---------- */
  function setupReveal() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  }

  /* ---------- Confetti ---------- */
  var canvas, ctx, pieces = [], raf = null, COLORS = ["#d4af37", "#e8c85a", "#c99a2e", "#f4e4b0", "#b5854a"];
  function setupConfetti() {
    canvas = $("#confetti"); if (!canvas) return;
    ctx = canvas.getContext("2d");
    function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
    resize(); addEventListener("resize", resize);
  }
  function fireConfetti() {
    if (reduce || !canvas) return;
    for (var i = 0; i < 130; i++) pieces.push({ x: Math.random() * canvas.width, y: -20 - Math.random() * canvas.height * 0.3, r: 4 + Math.random() * 6, c: COLORS[(Math.random() * COLORS.length) | 0], vx: -2 + Math.random() * 4, vy: 2 + Math.random() * 4, rot: Math.random() * Math.PI, vr: -0.2 + Math.random() * 0.4 });
    if (!raf) loop();
  }
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(function (p) { p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.rot += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c; ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6); ctx.restore(); });
    pieces = pieces.filter(function (p) { return p.y < canvas.height + 40; });
    if (pieces.length) raf = requestAnimationFrame(loop); else { ctx.clearRect(0, 0, canvas.width, canvas.height); raf = null; }
  }
  window.fireConfetti = fireConfetti;
})();
