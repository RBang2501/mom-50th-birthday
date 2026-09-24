# 🎉 Mom's 50th — Golden Jubilee Website

A mobile-first, multi-page keepsake with an Art-Deco golden-jubilee theme.

## Pages
| File | What it is |
|---|---|
| `index.html` | Home — hero, blow-out-the-candles cake, 50 reasons, links to every section |
| `bachpan.html` | Childhood story timeline + photo album |
| `cute-moments.html` | Gallery of cute moments |
| `family-corner.html` | Family photos |
| `lekrus.html` | The little ones (rename in config) |
| `memories.html` | **Memory Wall** — locked with a countdown until her birthday, then shows everyone's photos + notes from the Google Sheet |
| `share.html` | **Standalone form page to share with guests.** No navigation or links to the rest of the site |

All content is edited in **one file: `assets/config.js`**. Shared styling is
`assets/style.css`; shared behaviour is `assets/app.js` (don't need to touch).

> **Privacy note:** `share.html` shows no links to the other pages, but on a
> public GitHub Pages site the other pages are still reachable if someone
> guesses a URL — it's "unlisted," not access-controlled. Real privacy needs a
> login/backend.

---

## 1. Edit your content — `assets/config.js`
- `momName`, `estYear`, `tagline`, `signoff`
- `wishText` / `wishSub` — the candle message on Home
- `reasons` — up to 50 lines
- `bachpanStory` — childhood milestones (`{year,title,body}`)
- Photo lists: `bachpan`, `cuteMoments`, `family`, `lekrus` — each `{src, cap}`
- `labels.lekrus` — rename the Lekru's page (title/eyebrow/lead)
- `reveal.date` — when `memories.html` unlocks (guest's local time)

## 2. Add photos
Put images in **`photos/`**, then point entries at them, e.g.
`{ src: "photos/mom-1998.jpg", cap: "1998" }`. Leave `src: ""` for a
placeholder tile. Resize large images to ~1200px wide so pages load fast.

## 3. Collect memories (Google Form → Sheet) — for the Memory Wall
1. **forms.google.com** → new form. Add questions **in this order**:
   Short answer "Your name" · Paragraph "Your message" · **File upload** "A photo of you and Mom".
2. On the File-upload question: **allow images only** + set a **max file size** and **max 1 file** (security best practice, per ARCC Secure File Upload guidance).
3. **Send → 🔗 → copy link** into `config.js` → `google.formUrl`.
4. Responses → **Link to Sheets**. In that Sheet: **Share → Anyone with the link → Viewer.** Copy its ID (`/spreadsheets/d/`**`ID`**`/edit`) into `google.sheetId`.
5. In **Google Drive**, share the form's upload folder **Anyone with the link → Viewer** (so photos display).

> ⚠️ Google requires guests to **sign in with a Google account** to use a File-upload question. If that's a problem, swap it for a "paste a photo link" short-answer, or ask me to move to a no-login backend (Supabase).

**Moderation (optional):** add an `Approved` column in the Sheet, type `yes` on rows to show, and set `google.columns.approved` to that column index. Leave `-1` to show all.

## 4. Publish to GitHub Pages
```bash
git add . && git commit -m "Mom's 50th birthday site"
git remote add origin https://github.com/<you>/<repo>.git
git branch -M main && git push -u origin main
```
GitHub → **Settings → Pages → Deploy from a branch → `main` / root**.
Live at `https://<you>.github.io/<repo>/`. Share `.../share.html` with guests.

## 5. Preview locally
```bash
python3 -m http.server 8000   # http://localhost:8000
```
To preview the revealed wall early, temporarily set `reveal.date` to the past.

---
### Notes
- Fully responsive, tuned for phones; respects "reduce motion".
- Guest text/photos are HTML-escaped before display (safe from injection); the wall only renders image thumbnails.

Happy 50th, Mom. 💛
