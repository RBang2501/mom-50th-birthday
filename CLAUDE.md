# Dev Environment SOP — Mom's 50th Birthday Website

Static, multi-page keepsake site. **No build step, no framework** — plain HTML/CSS/JS.
Auto-deploys to GitHub Pages on every push to `main`.

- **Live:** https://rbang2501.github.io/mom-50th-birthday/
- **Repo:** https://github.com/RBang2501/mom-50th-birthday (public, GitHub Free)
- **Share-with-guests link:** `/share.html` (standalone, no nav to the rest)

## Layout
```
index.html  bachpan.html  cute-moments.html  family-corner.html
lekrus.html  memories.html  share.html
assets/style.css   ← shared design system (all visual styling)
assets/app.js      ← shared behaviour (nav inject, carousel, game, wall, confetti)
assets/config.js   ← ALL editable content lives here
photos/            ← image files
.github/workflows/deploy.yml  ← the deploy pipeline
```
Nav + footer are injected by `app.js` (per-page via `<body data-page="…">`); `share.html`
uses `data-bare` to stay isolated.

## Edit content
Only touch **`assets/config.js`** for names, text, timeline, reasons, photos, the
Lekru game, and the Google Form/Sheet IDs. Don't hardcode content into the HTML.

## Run locally
```bash
python3 -m http.server 8123    # → http://localhost:8123
```

## Verify a change (no live browser needed)
Use headless Chrome to render + screenshot:
```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --virtual-time-budget=4000 --force-device-scale-factor=2 \
  --window-size=390,844 --screenshot=/tmp/shot.png \
  "http://localhost:8123/index.html?v=$(date +%s)"
# then Read /tmp/shot.png
```
`--dump-dom` (same flags) verifies JS-generated DOM.
**Gotcha:** headless screenshots are captured mid font-swap, so text can look clipped
even when layout is fine. To check real overflow, measure `scrollWidth` / painted text
width **after `document.fonts.ready`** in a same-origin harness — don't trust the raw screenshot.

## Deploy (pipeline)
Push to `main` → GitHub Actions builds & deploys (~1 min). `git commit` alone does nothing.
```bash
git add -A && git commit -m "…" && git push
# watch:
RID=$(gh run list --repo RBang2501/mom-50th-birthday --limit 1 --json databaseId -q '.[0].databaseId')
gh run watch "$RID" --repo RBang2501/mom-50th-birthday --exit-status
```
`gh` CLI must be authed (`gh auth login`). Commits use a `@users.noreply.github.com` email
(set repo-locally) to keep the work email out of public history.

## Design / theme (keep consistent)
Rich **jewel theme**: deep velvet base, rose-velvet glow (top) + emerald glow (bottom),
gold as the metal, cream text. All tokens are OKLCH in `:root` of `style.css`.
Site accent = rose velvet; **Lekru page accent = emerald green** (`body[data-page="lekrus"]`),
plus a gold-bloom entrance animation and a gilded title. Mobile-first; respect
`prefers-reduced-motion`.

## Lekru page specifics
- Photo **carousel** (one card per screen on mobile) fed by `config.lekrus` (`{src, msg}`).
- **"Best Lekru" game**: Rakshit = win (gold, confetti, "👑 Best Lekru!" + "Mujhe Thaaankuuu Moyyyy !", 😎).
  Ashrit's button glides away and can't be caught; 1st→2nd→3rd attempts show
  `Hehe dhabbu moyy` → `Aga aga Aai` → `Nahi nah moyy plissh`, then reveals the video.
  Auto-resets after ~2.5 min. Config in `config.lekruGame`.
- **Video**: YouTube link in `config.lekruGame.video`. Shown as a **tap-to-play poster**
  after 3 tries (autoplay-with-sound is blocked by browsers; a tap is the only way to get audio).

## Hard constraints / gotchas
- **Do exactly what's asked — don't add content the user didn't request** (photos, messages,
  captions come from the user).
- **Public site = public photos.** GitHub Pages has no login (free or Pro). To gate access,
  move to Cloudflare Pages + Access (free email gate) — decision pending.
- Google Form file-upload (Memory Wall) **requires guests to sign in with Google**.
- Secrets: never commit tokens. Redact them from any command output.
