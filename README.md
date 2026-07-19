# Cortessa — Marketing Website

The public marketing site for **Cortessa**: sovereign document intelligence for defence.

Static, **fully self-contained**, and offline-capable by design — no CDNs, no external web
fonts, no analytics or trackers, no external calls at runtime. Every asset is self-hosted.
This mirrors the product's own air-gap-safe posture and is a deliberate credibility signal.

## Run locally
No build step. Serve the folder statically:

```bash
python -m http.server 8099
# then open http://localhost:8099/index.html
```

## Pages
- **Content:** `index.html` (home), `how-it-works.html`, `security.html`, `sectors.html`,
  `about.html`, `contact.html`
- **Legal:** `legal/privacy.html`, `legal/terms.html`, `legal/cookies.html`,
  `legal/accessibility.html` — currently "coming soon" placeholders; the finalised versions
  publish after legal review.

## Deployment
Served via GitHub Pages. Pages are currently marked `noindex` (a soft pre-launch state) — remove
the `<meta name="robots" content="noindex, nofollow">` tags at full launch to allow search indexing.

## Status
- **Contact** is a holding state until a real pilot-enquiry inbox is wired in.
- **Legal pages** are placeholders pending counsel-approved copy.

## Standards
Content traces to approved facts; performance metrics always carry their test qualifier;
WCAG 2.2 AA targeted throughout (semantic landmarks, one `<h1>`/page, skip link, keyboard nav,
focus states, reduced-motion, responsive).

## Brand
Mark: the Cortessa orbital glyph (`assets/img/cortessa-logo.png`, favicon `cortessa.ico`).
Palette: navy `#0b121c`, accent cyan `#5cd2e6`.
