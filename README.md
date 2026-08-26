# Cortessa — Marketing Website

The public marketing site for **Cortessa**: sovereign document intelligence for defence.

Static, **fully self-contained**, and offline-capable by design — no CDNs, no external web
fonts, no analytics or trackers, no external calls at runtime. Every asset is self-hosted,
including the typefaces (IBM Plex Sans / Plex Mono, OFL-licensed, vendored in
`assets/fonts/` — the same faces the product console ships). This mirrors the product's own
air-gap-safe posture and is a deliberate credibility signal.

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
Served via GitHub Pages at **https://cortessa.co.uk/** (www 301-redirects to the apex).
The custom domain is pinned by the committed `CNAME` file — **do not delete it**; without it a
push can drop the domain binding and 404 the site. The site is **indexable** (owner go,
2026-08-26): content pages carry canonical URLs and are listed in `sitemap.xml` (referenced
from `robots.txt`). The four legal pages remain `noindex` while they are placeholders — lift
that when counsel-approved copy is published.

## Status
- **Contact** is a holding state until a real pilot-enquiry inbox is wired in.
- **Legal pages** are placeholders pending counsel-approved copy.

## Standards
Content traces to approved facts; performance metrics always carry their test qualifier;
WCAG 2.2 AA targeted throughout (semantic landmarks, one `<h1>`/page, skip link, keyboard nav,
focus states, reduced-motion, responsive).

## Brand
Mark: the Cortessa orbital **jewel** render (`assets/img/cortessa-mark.png`, from
`renders/c_mark_jewel.png`, 2026-07-29 — the current mark; the earlier flat tile
`cortessa-logo.png` is retained only for history). Favicon `cortessa.ico` and
`apple-touch-icon.png` are derived from the same render; `og-card.png` is the social card.
Guilloche security-print motifs (`guilloche.svg`, `guilloche_tile.svg`) come from the product
design system. Typefaces: IBM Plex Sans / Plex Mono (vendored). Palette: navy `#0b121c`,
accent cyan `#5cd2e6` (dark-background only — it fails contrast on white), paper `#fbfcfd`,
ink `#10161d`.

Design direction (2026-08-26 overhaul): **"the controlled document"** — the visual grammar of
high-assurance engineering documentation (hairline rules, monospaced section designators,
EVIDENCE footnote blocks, tabular figures, a title-block footer) delivered with the restraint
of the top defence-technology marques: large weight-400 display type with tight tracking,
zero border-radius, zero drop shadows, and a dark navy opening chapter carrying the guilloche
motif. The reveal-on-scroll is progressive (inert without JS, off under reduced motion, with
an in-view check plus a 2.5 s failsafe so content can never be stuck hidden).
