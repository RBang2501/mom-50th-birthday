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
    { href: "index.html", label: "Home" },
    { href: "bachpan.html", label: "Bachpan" },
    { href: "cute-moments.html", label: "Cute Moments" },
    { href: "family-corner.html", label: "Family Corner" },
    { href: "lekrus.html", label: (C.labels && C.labels.lekrus && C.labels.lekrus.title) || "Lekru's" },
    { href: "memories.html", label: "Memories" },
  ];

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.body.hasAttribute("data-bare")) { injectNav(); injectFooter(); }
    bindText();
    renderReasons();
    renderTimelines();
    renderGalleries();
    renderWishes();
    setupCake();
    setupLekruGame();
    setupWall();
    setupShare();
    setupHeroSparkles();
    setupReveal();
    setupConfetti();
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
    f.innerHTML = "<p>Made with <span class='heart'>&hearts;</span> for the best mom in the world.</p>" +
      "<p style='font-size:.9rem'>" + esc(C.signoff || "") + "</p>";
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
        return '<li class="t-item reveal"><div class="t-year">' + esc(t.year) + '</div>' +
          '<h3 class="t-title">' + esc(t.title) + '</h3><p class="t-body">' + esc(t.body) + "</p></li>";
      }).join("");
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

  /* ---------- Lekru wishes ---------- */
  function renderWishes() {
    $$("[data-wishes]").forEach(function (box) {
      var items = C[box.getAttribute("data-wishes")] || [];
      box.innerHTML = items.map(function (w) {
        return '<div class="wish-card reveal"><p class="quote">' + esc(w.text) + '</p><div class="who">' + esc(w.from) + "</div></div>";
      }).join("");
    });
  }

  /* ---------- Best Lekru game (Ashrit's button runs away) ---------- */
  function spawnFloaty(txt, x, y) {
    if (reduce) return;
    var f = document.createElement("div"); f.className = "floaty"; f.textContent = txt;
    f.style.left = (x - 16) + "px"; f.style.top = (y - 20) + "px";
    document.body.appendChild(f);
    setTimeout(function () { f.remove(); }, 1300);
  }
  function setupLekruGame() {
    var game = $("#lekru-game"); if (!game) return;
    var cfg = C.lekruGame || {};
    var arena = $("#arena"), mascot = $("#game-mascot"), result = $("#game-result");
    var best = $("#vote-best"), other = $("#vote-other");
    if (cfg.best) best.textContent = cfg.best;
    if (cfg.other) other.textContent = cfg.other;
    var pokes = cfg.sadPokes && cfg.sadPokes.length ? cfg.sadPokes : ["Nice try!", "Too slow!", "Catch me if you can!"];
    var firstSad = true, resetTimer = null, resetMs = cfg.resetMs || 150000;

    function scheduleReset() { clearTimeout(resetTimer); resetTimer = setTimeout(resetGame, resetMs); }
    function resetGame() {
      mascot.textContent = "🙂"; mascot.className = "game-mascot";
      best.classList.remove("crowned");
      other.classList.remove("runaway"); other.style.transition = ""; other.style.transform = "";
      result.className = "game-result"; result.textContent = "";
      firstSad = true;
    }

    // Rakshit wins.
    best.addEventListener("click", function () {
      mascot.textContent = "🥳"; mascot.className = "game-mascot happy";
      best.classList.add("crowned");
      result.className = "game-result win";
      result.textContent = cfg.bestResult || "👑 Best Lekru!";
      fireConfetti();
      var r = best.getBoundingClientRect();
      ["🎉", "👑", "✨", "🏆", "💛"].forEach(function (e, i) {
        setTimeout(function () { spawnFloaty(e, r.left + r.width * (0.2 + Math.random() * 0.6), r.top); }, i * 110);
      });
      scheduleReset();
    });

    // Ashrit glides away smoothly and can't be caught. Reacts with a cry line.
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
      void other.offsetWidth;            // flush so the next move animates smoothly
      other.style.transition = "";
    }
    var lastMove = 0, lastPop = 0;
    function dodge(x, y) {
      goRunaway();
      var now = Date.now();
      if (now - lastMove > 80) { moveAway(x, y); lastMove = now; }
      mascot.textContent = "😭"; mascot.className = "game-mascot sad";
      best.classList.remove("crowned");
      result.className = "game-result aww";
      result.textContent = (firstSad && cfg.cryLine) ? cfg.cryLine : pokes[(Math.random() * pokes.length) | 0];
      firstSad = false;
      if (typeof x === "number" && now - lastPop > 240) { spawnFloaty(Math.random() < 0.5 ? "😭" : "💧", x, y); lastPop = now; }
      scheduleReset();
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
    // Desktop: dart away as the cursor gets close — alive and uncatchable.
    arena.addEventListener("mousemove", function (e) {
      var r = other.getBoundingClientRect();
      if (Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)) < 95) dodge(e.clientX, e.clientY);
    });
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
