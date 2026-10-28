# Remove Online

Step-by-step guides for removing things online — **[remove-online.com](https://remove-online.com)**. Same design and imprint as [open-online.com](https://open-online.com), in English, Deutsch, Čeština and Polski (`/en/`, `/de/`, `/cs/`, `/pl/`).

Plain static HTML/CSS plus a few **browser tools** (`/<lang>/tools/`). Guides need no JavaScript; the tools run entirely on the visitor's device — no uploads, no cookies, no analytics, nothing loaded from third parties (strict CSP, loosened per tool page only as far as needed).

## Build

```bash
node build.mjs
```

No dependencies (Node 22+). It regenerates `index.html`, `404.html`, `en/ de/ cs/ pl/`, `sitemap.xml`, `robots.txt`, `favicon.svg` and `assets/` — these are committed because GitHub Pages serves the repository root (see `CNAME`). Preview with `python3 -m http.server 4180`.

| Path | What |
| --- | --- |
| `site/guides.mjs` | Topics ("hubs"), guides, related links, languages |
| `site/i18n/<lang>.mjs` | All text per language: UI, hubs, guides, privacy, imprint |
| `site/tools/*.js` | The tools' code (vanilla JS), copied to `assets/tools/` |
| `site/i18n/<lang>.tools.mjs`, `<lang>.tools-more.mjs` | Tool pages, tool UI strings and the privacy-policy section on tools, per language |
| `assets/vendor/`, `assets/models/` | Self-hosted pdf-lib, fflate, onnxruntime-web (all MIT) and the U²-Net-small model (Apache-2.0); see `assets/vendor/README.md` |
| `site/styles.css` | Design tokens and components (copied from Open Online), becomes `assets/styles.css` |
| `build.mjs` | Generator + content completeness check (fails if a language misses a guide) |
| `research/` | Keyword clustering script, `KEYWORDS.md` (clusters + webapp recommendation), `check-links.mjs` |

URLs are `/<lang>/<topic>/<guide>/` with identical English slugs in every language, so hreflang is a one-segment swap.

## Tools

| Tool | What it does | Built with |
| --- | --- | --- |
| Background remover (+ white background, green screen pages) | AI cut-out (U²-Net-small, ~4.5 MB, onnxruntime-web/WASM) and a colour / green-screen mode; transparent PNG | `background.js` |
| PDF page remover (+ PDF metadata page) | Delete pages, optionally strip metadata; builds a new file from the kept pages so removed pages leave no trace | `pdf-pages.js`, pdf-lib |
| Photo metadata remover | Lossless EXIF/GPS/XMP/IPTC removal for JPG, PNG, WebP, shows what was found | `image-metadata.js` |
| Office metadata remover | Blanks author, last editor, company etc. in .docx/.xlsx/.pptx; optional thumbnail/date removal | `office-metadata.js`, fflate |
| Text cleaner | Line breaks, duplicate/empty lines, spaces, invisible characters | `text-cleaner.js` |
| Table cleaner | Duplicate rows (all or chosen columns), empty rows/columns for pasted cells or CSV | `table-cleaner.js` |
| Character remover | Emoji, digits, letters, punctuation, accents, chosen characters, first/last N per line | `character-remover.js` |
| Formatting remover | Rich text / HTML to plain text, straight quotes, plain bullets | `formatting-remover.js` |
| Vocal remover | Centre-channel cancellation with bass preservation, mono WAV | `vocal-remover.js` |
| Erasure request generator | GDPR Art. 17 letter in en/de/cs/pl | `letter.js` |

Variant pages (`white-background-remover`, `green-screen-remover`, `pdf-metadata-remover`) reuse a script with `preset` / `uiFrom` in `TOOLS` and only need their own title, lead and copy. Guides and tools link to the matching [Open Online](https://open-online.com) viewer page via `openOnline`; every page footer links to it as well.

Add one: write `site/tools/<name>.js` (use `RO.h`, `RO.dropzone` … from `common.js`), add the entry to `TOOLS` in `site/guides.mjs`, and add its text to all four `site/i18n/*.tools*.mjs`. Tool scripts must set text with `textContent` (the helpers do), and a tool that needs `fetch` or WASM declares it in `csp` so only its page gets those permissions.

## Adding a guide

1. Add `{ id, hub, volume, related }` to `GUIDES` in `site/guides.mjs`.
2. Add the guide to all four `site/i18n/*.mjs` files (same block order). Inline markup: `` `code` ``, `**bold**`, `{Key}`, `[label](/path/)`.
3. `node build.mjs && node research/check-links.mjs`.

## Legal information to confirm

The imprint repeats Open Online's provider details (Andreas Dittes, Bautzener Str. 35, 10829 Berlin) with the contact `remove-online@dittes.info`. As for Open Online, confirm before a public commercial launch: operator form, a summonable address, a second contact channel, VAT ID if any, and have the privacy policy/imprint reviewed. Czech and Polish texts are translations that defer to the English/German versions and have not been reviewed by native-speaking editors.
