# What people want to "remove" — keyword clusters and webapp options

Source: Ubersuggest export "remove" (494 keywords, ~52.8 M monthly searches, language/country not stated, so treat as global estimates).
Reproduce the table: `node research/cluster.mjs "<csv>" --md`. First matching rule wins; see the regexes in `cluster.mjs`.

## Clusters

| Cluster | Keywords | Volume | Vol. w/o top term | Wtd. CPC | Top terms |
|---|---:|---:|---:|---:|---|
| Background removal — images | 19 | 43,521,190 | 22,160,690 | $0.70 | remove background (21,360,500); remove bg (20,400,000); remove the background of a picture (450,000); remove image background (368,000) |
| Wrong intent (puzzles, games, dictionary, typos) | 101 | 2,858,650 | 1,358,650 | $1.09 | remote jobs (1,500,000); remove (1,220,000); remove synonym (49,500); remove before flight (27,100) |
| PDF (pages, password, text, links, metadata) | 29 | 2,414,330 | 1,414,330 | $0.33 | remove a page from pdf (1,000,000); remove pages from pdf (823,000); remove password from pdf (301,000); remove pdf (90,500) |
| Watermark / logo removal (third-party content) | 18 | 1,301,580 | 851,580 | $0.56 | remove watermark (450,000); remove watermark from video (301,000); remove watermark from image (110,000); remove watermark free (110,000) |
| Object / person / text removal in photos (inpainting) | 38 | 842,990 | 677,990 | $0.87 | remove object from photo (165,000); remove text from image (110,000); remove from photo (110,000); remove person from photo (74,000) |
| Physical household / car / DIY removal | 38 | 240,730 | 150,230 | $0.50 | remove rust (90,500); remove nail glue (22,200); remove rust from metal (22,200); remove oil stains from clothes (14,800) |
| Audio: voice / vocals / music / noise (incl. from video) | 20 | 239,000 | 198,500 | $0.51 | remove audio from video (40,500); remove voice from song (40,500); remove music (40,500); remove noise from audio (14,800) |
| Text, Excel, Word & list clean-up | 53 | 236,180 | 162,180 | $0.27 | remove duplicates excel (74,000); remove page from word (49,500); remove xlsx password (14,800); remove line breaks (12,100) |
| Background / green-screen removal — video & GIF | 11 | 213,060 | 139,060 | $0.77 | remove bg video (74,000); remove background from video (60,500); remove video background (27,100); remove green screen (22,200) |
| AI detection / AI provenance (SynthID, labels, AI metadata) | 20 | 190,200 | 99,700 | $1.30 | remove ai (90,500); remove gemini watermark (49,500); remove watermark ai (12,100); remove ai watermark (9,900) |
| Junk removal (local service, high CPC) | 3 | 169,320 | 4,320 | $12.69 | remove junk (165,000); remove junk for free (3,600); remove junk from house (720) |
| Developer & sysadmin (git, docker, linux, python, R) | 32 | 126,520 | 93,420 | $0.10 | remove directory linux (33,100); remove last commit git (27,100); remove docker container (14,800); remove untracked files git (9,900) |
| Social & app feature removal (reposts, Shorts, ads, followers) | 27 | 121,910 | 31,410 | $0.51 | remove all reposts tiktok (90,500); remove reposts tiktok (6,600); remove kindle ads (4,400); remove queue spotify (3,600) |
| Accounts, logins & payment cards | 23 | 93,510 | 71,310 | $0.62 | remove google account from phone (22,200); remove google account (18,100); remove google account from device (14,800); remove card from apple wallet (9,900) |
| Video clean-up (text, objects) | 4 | 79,400 | 18,900 | $0.53 | remove text from video (60,500); remove object from video (9,900); remove text from video online free (5,400); remove video (3,600) |
| Body / health (YMYL) | 11 | 77,570 | 50,470 | $1.27 | remove uterus (27,100); remove tartar from teeth (18,100); remove kidney stones (12,100); remove hair dye from skin (9,900) |
| Metadata / EXIF (photo, video) | 7 | 44,400 | 32,300 | $2.18 | remove metadata (12,100); remove metadata from image (9,900); remove image metadata (9,900); remove metadata from video (4,400) |
| PC / Mac clean-up & uninstalling software | 24 | 43,800 | 16,700 | $0.26 | remove app from mac (27,100); remove 360 total security (2,900); remove recycle bin from desktop (2,900); remove recovery partition (2,400) |
| Paywall bypass (circumvention) | 4 | 23,790 | 13,890 | $3.00 | remove paywall website (9,900); remove paywall article (8,100); remove paywall free (5,400); remove news paywall (390) |
| Privacy & reputation (address, reviews, data brokers) | 11 | 8,050 | 6,150 | $3.34 | remove open to work linkedin (1,900); remove learn about this picture (1,900); remove your media llc (1,900); remove your media (1,000) |
| Unassigned | 1 | 40 | 0 | $0.00 | remove quick views from teams (40) |

Total: 494 keywords, 52,846,220 monthly searches

"Vol. w/o top term" matters: the single head term "remove background" / "remove bg" (≈41.8 M) is 79 % of the whole file, and "remote jobs" / "remove" are typos or noise.

## Can we deliver it as a webapp? (browser-only, no upload, like Open Online)

| Cluster | In-browser feasible? | How | Effort | Competition | Risk |
|---|---|---|---|---|---|
| Background removal (image) | Yes | ONNX/WebGPU segmentation model (IS-Net / U²-Net / BiRefNet-class; **check model licences — RMBG is non-commercial**), ~40–180 MB model download, cached | M | Very high (remove.bg, Canva, Adobe) but demand is enormous | Low |
| PDF: delete pages, unlock, metadata, links | Yes | pdf-lib (MIT), pdf.js; unlocking only with a known password (qpdf-wasm) | S | High (iLovePDF, Smallpdf), but "private, no upload" is a real wedge | Low |
| Metadata / EXIF removal | Yes | Re-encode via canvas/exifr; PDF/Office via JSZip + pdf-lib | S | Medium | Low; CPC $1.8–5 (highest of any buildable cluster) |
| Text / Excel / Word clean-up (line breaks, duplicates, spaces, hidden chars, N chars from left) | Yes | Plain JS + SheetJS | S | Low–medium, long tail of ~50 pages | Low |
| Object / person / text removal (inpainting) | Yes, heavier | LaMa ONNX (~200 MB) with a brush UI | L | High | Low–medium (misuse: faking evidence) |
| Audio: noise, vocals/instrumental, audio from video | Partly | RNNoise-wasm (easy); Demucs/MDX stems in ONNX (heavy); ffmpeg.wasm to strip audio | M–L | Medium | Low |
| Video background / green screen | Technically yes, slow | Per-frame segmentation + WebCodecs | XL | High | Low |
| Watermark / logo removal (third-party) | Technically yes (inpainting) | Same engine as above | L | High | **High: removing copyright-management info is unlawful in many places (§95c UrhG, DMCA §1202, Art. 7 InfoSoc Directive)** |
| AI provenance (SynthID, AI labels, "remove AI detection") | — | — | — | — | **Do not build:** helps deceive; platform and regulatory exposure |
| Paywall bypass | — | — | — | — | **Do not build:** circumvention |
| Accounts, devices, social features, privacy/reputation | No (needs the user's own accounts) | Guides + checklists only | S | Medium | Low |
| Developer snippets (git, docker, linux) | No tool needed | Guides / cheat-sheets | S | High, low CPC | Low |
| Junk removal (local service) | No | Off-brand physical service | — | — | Skip (CPC $12.7 is service-lead intent) |
| Household stains / car parts / medical | No | Off-brand, YMYL for medical | — | — | Skip |
| Wrong intent (puzzles, dictionary, typos) | — | — | — | — | Ignore |

## Recommendation

**Build, in this order** (all run locally, so the privacy-first positioning of the sister site Open Online carries over):

1. **PDF toolbox** — remove pages, unlock with known password, strip metadata. ≈2.4 M searches, small build (days), low risk. Ships first and proves the pattern.
2. **Background remover** — the market is 80 % of the whole dataset. Hardest piece is model choice (licence) and the first-load download, but a "your photo never leaves the browser" angle is differentiating. Add PNG/transparent output and white-background variants as SEO pages from the same engine.
3. **Metadata cleaner (photo/PDF/Office/video)** — ≈44 k searches but the best CPC and a natural fit with the "remove personal data" brand; mostly shares code with 1.
4. **Text & spreadsheet cleaner** — many tiny pages (remove line breaks, duplicates, empty lines/rows, spaces, hidden characters, N characters in Excel) off one engine; cheap, low competition.
5. **Later:** object/text remover (LaMa) and audio tools (noise, strip audio from video) once the model-download UX exists from step 2.

**Not as apps:** accounts/devices/social/privacy — covered by the guides on the site. **Not at all:** watermark removal for third-party content, AI-provenance removal, paywall bypass.

Gap worth testing outside this CSV: a **removal-request generator** (GDPR Art. 17 erasure letter, Google/Bing removal requests, data-broker opt-outs) — fits the domain name best, runs client-side, and has high-value intent even though this export barely shows it.

## Status

Live on the site (all in-browser): **background remover** (AI + colour mode; also as white-background and green-screen pages), **PDF page/metadata remover**, **photo metadata remover**, **Office metadata remover**, **text cleaner**, **table cleaner**, **character remover**, **formatting remover**, **vocal remover** (centre cancellation, not AI) and the **erasure request generator**.

Not built yet: unlocking PDFs with a known password, object/text removal in photos (LaMa), proper stem separation (Demucs), audio noise removal, stripping audio from video (needs ffmpeg.wasm or an MP4 rewriter), reading .xlsx directly in the table cleaner.
