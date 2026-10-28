// Structure of the site: topics ("hubs") and guides. Text lives in site/i18n/<lang>.mjs.
// Slugs are English and identical in every language, so /en/documents/remove-pages-from-pdf/
// maps to /de/documents/remove-pages-from-pdf/ with a one-segment swap (clean hreflang).
//
// `volume` is the combined monthly search volume of the keywords the guide answers
// (Ubersuggest export, see research/KEYWORDS.md) — only used to order "popular" guides.

export const HUBS = [
  { id: 'accounts', icon: 'user' },
  { id: 'privacy', icon: 'shield' },
  { id: 'documents', icon: 'file' },
  { id: 'media', icon: 'image' },
  { id: 'developer', icon: 'terminal' },
];

export const GUIDES = [
  { id: 'remove-pages-from-pdf', openOnline: 'pdf', hub: 'documents', volume: 2300000, related: ['remove-password-from-pdf', 'remove-page-from-word', 'remove-watermark'] },
  { id: 'remove-background-from-image', openOnline: 'png', hub: 'media', volume: 1500000, related: ['remove-object-from-photo', 'remove-watermark', 'remove-audio-from-video'] },
  { id: 'remove-password-from-pdf', openOnline: 'pdf', hub: 'documents', volume: 360000, related: ['remove-pages-from-pdf', 'remove-metadata-from-photos', 'remove-watermark'] },
  { id: 'remove-watermark', hub: 'media', volume: 900000, related: ['remove-object-from-photo', 'remove-pages-from-pdf', 'remove-background-from-image'] },
  { id: 'remove-object-from-photo', openOnline: 'jpg', hub: 'media', volume: 600000, related: ['remove-background-from-image', 'remove-metadata-from-photos', 'remove-watermark'] },
  { id: 'remove-duplicates-in-excel', openOnline: 'xlsx', hub: 'documents', volume: 90000, related: ['remove-line-breaks', 'remove-page-from-word', 'remove-pages-from-pdf'] },
  { id: 'remove-page-from-word', openOnline: 'docx', hub: 'documents', volume: 55000, related: ['remove-pages-from-pdf', 'remove-line-breaks', 'remove-duplicates-in-excel'] },
  { id: 'remove-audio-from-video', openOnline: 'mp4', hub: 'media', volume: 50000, related: ['remove-background-from-image', 'remove-metadata-from-photos', 'remove-object-from-photo'] },
  { id: 'remove-google-account-from-phone', hub: 'accounts', volume: 60000, related: ['delete-instagram-account', 'remove-personal-info-from-google', 'remove-metadata-from-photos'] },
  { id: 'delete-instagram-account', hub: 'accounts', volume: 9000, related: ['remove-google-account-from-phone', 'remove-personal-info-from-google', 'remove-metadata-from-photos'] },
  { id: 'remove-metadata-from-photos', openOnline: 'jpg', hub: 'privacy', volume: 45000, related: ['remove-personal-info-from-google', 'remove-password-from-pdf', 'delete-instagram-account'] },
  { id: 'remove-personal-info-from-google', hub: 'privacy', volume: 1000, related: ['remove-metadata-from-photos', 'delete-instagram-account', 'remove-google-account-from-phone'] },
  { id: 'remove-line-breaks', openOnline: 'txt', hub: 'documents', volume: 25000, related: ['remove-duplicates-in-excel', 'remove-page-from-word', 'remove-pages-from-pdf'] },
  { id: 'remove-directory-linux', hub: 'developer', volume: 40000, related: ['remove-last-git-commit', 'remove-docker-images-and-containers', 'remove-line-breaks'] },
  { id: 'remove-last-git-commit', hub: 'developer', volume: 40000, related: ['remove-directory-linux', 'remove-docker-images-and-containers', 'remove-line-breaks'] },
  { id: 'remove-docker-images-and-containers', hub: 'developer', volume: 35000, related: ['remove-directory-linux', 'remove-last-git-commit', 'remove-line-breaks'] },
];

/** Guides shown on the home page, in this order. */
export const POPULAR = [
  'remove-pages-from-pdf',
  'remove-background-from-image',
  'remove-password-from-pdf',
  'remove-watermark',
  'remove-object-from-photo',
  'remove-google-account-from-phone',
  'remove-duplicates-in-excel',
  'remove-metadata-from-photos',
];

export const LANGS = [
  { code: 'en', tag: 'en', ogLocale: 'en_GB', name: 'English' },
  { code: 'de', tag: 'de', ogLocale: 'de_DE', name: 'Deutsch' },
  { code: 'cs', tag: 'cs', ogLocale: 'cs_CZ', name: 'Čeština' },
  { code: 'pl', tag: 'pl', ogLocale: 'pl_PL', name: 'Polski' },
];

/**
 * Browser tools. Text lives in site/i18n/<lang>.tools.mjs; code in site/tools/ (copied to assets/tools/).
 * `scripts` load in order (bare names come from assets/tools/). `csp` loosens the page policy only as far as needed.
 * `guides` links a tool to guides ({cta:false} = related link only). `preset` / `uiFrom` make a variant page of another tool
 * (own title and copy for SEO, same script and UI strings). `openOnline` is the open-online.com format page to link to.
 * `home` tools are featured on the home page.
 */
export const TOOLS = [
  { id: 'background-remover', icon: 'image', home: true, openOnline: 'png', scripts: ['common.js', 'background.js'], csp: { wasm: true, fetch: true }, guides: [{ id: 'remove-background-from-image' }] },
  { id: 'white-background-remover', icon: 'image', uiFrom: 'background-remover', preset: 'white', openOnline: 'png', scripts: ['common.js', 'background.js'], csp: { wasm: true, fetch: true }, guides: [{ id: 'remove-background-from-image', cta: false }] },
  { id: 'green-screen-remover', icon: 'image', uiFrom: 'background-remover', preset: 'green', openOnline: 'png', scripts: ['common.js', 'background.js'], csp: { wasm: true, fetch: true }, guides: [{ id: 'remove-background-from-image', cta: false }] },
  { id: 'pdf-page-remover', icon: 'file', home: true, openOnline: 'pdf', scripts: ['/assets/vendor/pdf-lib.min.js', 'common.js', 'pdf-pages.js'], csp: {}, guides: [{ id: 'remove-pages-from-pdf' }, { id: 'remove-metadata-from-photos', cta: false }] },
  { id: 'pdf-metadata-remover', icon: 'file', uiFrom: 'pdf-page-remover', preset: 'meta', openOnline: 'pdf', scripts: ['/assets/vendor/pdf-lib.min.js', 'common.js', 'pdf-pages.js'], csp: {}, guides: [{ id: 'remove-metadata-from-photos', cta: false }, { id: 'remove-pages-from-pdf', cta: false }] },
  { id: 'image-metadata-remover', icon: 'shield', home: true, openOnline: 'jpg', scripts: ['common.js', 'image-metadata.js'], csp: {}, guides: [{ id: 'remove-metadata-from-photos' }] },
  { id: 'office-metadata-remover', icon: 'shield', openOnline: 'docx', scripts: ['/assets/vendor/fflate.min.js', 'common.js', 'office-metadata.js'], csp: {}, guides: [{ id: 'remove-metadata-from-photos', cta: false }] },
  { id: 'text-cleaner', icon: 'text', home: true, openOnline: 'txt', scripts: ['common.js', 'text-cleaner.js'], csp: {}, guides: [{ id: 'remove-line-breaks', hash: 'lines' }, { id: 'remove-duplicates-in-excel', hash: 'duplicates', cta: false }] },
  { id: 'table-cleaner', icon: 'table', home: true, openOnline: 'csv', scripts: ['common.js', 'table-cleaner.js'], csp: {}, guides: [{ id: 'remove-duplicates-in-excel' }] },
  { id: 'character-remover', icon: 'text', openOnline: 'txt', scripts: ['common.js', 'character-remover.js'], csp: {}, guides: [{ id: 'remove-line-breaks', cta: false }] },
  { id: 'formatting-remover', icon: 'text', openOnline: 'txt', scripts: ['common.js', 'formatting-remover.js'], csp: {}, guides: [{ id: 'remove-line-breaks', cta: false }] },
  { id: 'vocal-remover', icon: 'music', openOnline: 'wav', scripts: ['common.js', 'vocal-remover.js'], csp: { media: true }, guides: [{ id: 'remove-audio-from-video', cta: false }] },
  { id: 'removal-request-generator', icon: 'mail', home: true, scripts: ['common.js', 'letter.js'], csp: {}, guides: [{ id: 'remove-personal-info-from-google' }] },
];
