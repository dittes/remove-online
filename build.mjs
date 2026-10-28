// Static site generator for remove-online.com — plain Node, no dependencies.
//   node build.mjs
// Writes /index.html (language picker), /<lang>/… pages, 404.html, sitemap.xml, robots.txt and assets/styles.css
// next to this file, ready for GitHub Pages (see CNAME). All text comes from site/i18n/<lang>.mjs.
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { GUIDES, HUBS, LANGS, POPULAR, TOOLS } from './site/guides.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://remove-online.com';
const BRAND = 'Remove Online';
const EMAIL = 'remove-online@dittes.info';
/** Fixed so that builds are reproducible; bump when guides are re-checked. */
const REVIEWED = '2026-10-28';

/** Strict by default (no inline script/style, no network). Tools loosen it only where they need to. */
function cspFor({ wasm = false, fetch = false, media = false } = {}) {
  return [
    "default-src 'self'",
    `script-src 'self'${wasm ? " 'wasm-unsafe-eval'" : ''}`,
    "style-src 'self'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    media ? "media-src 'self' blob:" : "media-src 'none'",
    `connect-src ${fetch ? "'self'" : "'none'"}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
    'upgrade-insecure-requests',
  ].join('; ');
}
const CSP = cspFor();

// ------------------------------------------------------------------ helpers
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** `code`, **bold**, {Key} and [label](url) / [label](/site/path) inside already-escaped text. */
function inline(text, lang) {
  return esc(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\{([^{}]+)\}/g, '<kbd>$1</kbd>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
      if (url.startsWith('/')) return `<a href="/${lang}${url}">${label}</a>`;
      if (url.startsWith('mailto:')) return `<a href="${url}">${label}</a>`;
      return `<a href="${url}" rel="noopener noreferrer" target="_blank">${label}</a>`;
    });
}

const plain = (text) => text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[`*{}]/g, '');
const truncate = (s, n = 158) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…');

const ICONS = {
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  shield: '<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M21 16l-5-5-8 9"/>',
  terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 10l3 2-3 2M12 15h5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  music: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
  table: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16"/>',
  text: '<path d="M4 6h16M4 12h16M4 18h10"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
};
const icon = (name, size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;

/** The Remove Online mark: Open Online's document tile with a "removed" badge. */
const logoMark = (size = 28) =>
  `<svg class="logo-mark" width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect width="32" height="32" rx="8" fill="#2557D6"/><path d="M10.5 6.5h7.4l5.6 5.6v10.4a1.5 1.5 0 0 1-1.5 1.5H10.5A1.5 1.5 0 0 1 9 22.5v-14.5a1.5 1.5 0 0 1 1.5-1.5z" fill="#fff"/><path d="M17.9 6.5v4.1a1.5 1.5 0 0 0 1.5 1.5h4.1z" fill="#A9C0F2"/><rect x="11.8" y="15.2" width="8.4" height="1.7" rx=".85" fill="#2557D6"/><rect x="11.8" y="18.6" width="4.4" height="1.7" rx=".85" fill="#2557D6" opacity=".55"/><circle cx="22.6" cy="22.6" r="6" fill="#2557D6"/><circle cx="22.6" cy="22.6" r="4.6" fill="#fff"/><path d="M20.5 20.5l4.2 4.2m0-4.2l-4.2 4.2" stroke="#2557D6" stroke-width="1.7" stroke-linecap="round"/></svg>`;

const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#2557D6"/><path d="M10.5 6.5h7.4l5.6 5.6v10.4a1.5 1.5 0 0 1-1.5 1.5H10.5A1.5 1.5 0 0 1 9 22.5v-14.5a1.5 1.5 0 0 1 1.5-1.5z" fill="#fff"/><path d="M17.9 6.5v4.1a1.5 1.5 0 0 0 1.5 1.5h4.1z" fill="#A9C0F2"/><rect x="11.8" y="15.2" width="8.4" height="1.7" rx=".85" fill="#2557D6"/><rect x="11.8" y="18.6" width="4.4" height="1.7" rx=".85" fill="#2557D6" opacity=".55"/><circle cx="22.6" cy="22.6" r="6" fill="#2557D6"/><circle cx="22.6" cy="22.6" r="4.6" fill="#fff"/><path d="M20.5 20.5l4.2 4.2m0-4.2l-4.2 4.2" stroke="#2557D6" stroke-width="1.7" stroke-linecap="round"/></svg>\n`;

const hubOf = (id) => HUBS.find((h) => h.id === id);
const guideOf = (id) => GUIDES.find((g) => g.id === id);
const hubPath = (hub) => `/${hub}/`;
const guidePath = (g) => `/${g.hub}/${g.id}/`;

// ------------------------------------------------------------------ content
const locales = {};
for (const l of LANGS) {
  const c = (await import(pathToFileURL(join(ROOT, 'site/i18n', `${l.code}.mjs`)).href)).default;
  const x = (await import(pathToFileURL(join(ROOT, 'site/i18n', `${l.code}.tools.mjs`)).href)).default;
  const more = (await import(pathToFileURL(join(ROOT, 'site/i18n', `${l.code}.tools-more.mjs`)).href)).default;
  Object.assign(c.ui, x.ui, more.ui);
  c.tools = { ...x.tools, ...more.tools };
  // The privacy policy gets a "Tools and your files" section after "No cookies…"; numbering is regenerated.
  c.privacy.sections.splice(2, 0, x.privacySection);
  c.privacy.sections.forEach((sec, i) => (sec.h = sec.h.replace(/^\d+\.\s*/, '') && `${i + 1}. ${sec.h.replace(/^\d+\.\s*/, '')}`));
  locales[l.code] = c;
}

function validate() {
  const errors = [];
  for (const l of LANGS) {
    const c = locales[l.code];
    for (const h of HUBS) if (!c.hubs?.[h.id]?.name || !c.hubs[h.id].lead) errors.push(`${l.code}: hub ${h.id} incomplete`);
    for (const g of GUIDES) {
      const t = c.guides?.[g.id];
      if (!t) {
        errors.push(`${l.code}: guide ${g.id} missing`);
        continue;
      }
      for (const k of ['title', 'short', 'lead', 'sections', 'faq']) if (!t[k]) errors.push(`${l.code}: ${g.id}.${k} missing`);
      if (t.sections?.some((s) => !s.h || !(s.steps || s.p || s.code))) errors.push(`${l.code}: ${g.id} has an incomplete section`);
    }
    for (const k of ['privacy', 'imprint', 'ui', 'tools']) if (!c[k]) errors.push(`${l.code}: ${k} missing`);
    for (const t of TOOLS) {
      const x = c.tools?.[t.id];
      if (!x) {
        errors.push(`${l.code}: tool ${t.id} missing`);
        continue;
      }
      for (const k of ['title', 'short', 'lead', 'desc', 'about', 'faq', ...(t.uiFrom ? [] : ['ui'])]) if (!x[k]) errors.push(`${l.code}: tool ${t.id}.${k} missing`);
    }
  }
  if (errors.length) throw new Error('Content check failed:\n  ' + errors.join('\n  '));
}
validate();

// ------------------------------------------------------------------ layout
const urlOf = (lang, path) => `${SITE_URL}/${lang}${path}`;

function languageLinks(lang, path) {
  return LANGS.map((l) => ({ ...l, href: `/${l.code}${path}`, current: l.code === lang }));
}

function head({ lang, path, title, description, type = 'website', jsonLd = [], csp = CSP }) {
  const alts = LANGS.map((l) => `<link rel="alternate" hreflang="${l.tag}" href="${urlOf(l.code, path)}">`).join('\n    ');
  const ld = jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`).join('\n    ');
  const loc = LANGS.find((l) => l.code === lang);
  return `<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta http-equiv="Content-Security-Policy" content="${csp}">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}">
    <link rel="canonical" href="${urlOf(lang, path)}">
    ${alts}
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/">
    <meta property="og:site_name" content="${BRAND}">
    <meta property="og:type" content="${type}">
    <meta property="og:title" content="${esc(title)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:url" content="${urlOf(lang, path)}">
    <meta property="og:locale" content="${loc.ogLocale}">
    <meta name="twitter:card" content="summary">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/assets/styles.css">
    <meta name="theme-color" content="#ffffff">
    <meta name="color-scheme" content="light">
    ${ld}`;
}

function header(lang, path, ui, hubNames, currentHub) {
  const langs = languageLinks(lang, path);
  const langList = langs.map((l) => `<li><a href="${l.href}" hreflang="${l.tag}" lang="${l.tag}"${l.current ? ' aria-current="true"' : ''}>${l.name}</a></li>`).join('');
  const toolsLink = `<li><a class="nav__link nav__link--tools" href="/${lang}/tools/"${currentHub === 'tools' ? ' aria-current="page"' : ''}>${esc(ui.toolsNav)}</a></li>`;
  const hubLinks = toolsLink + HUBS.map((h) => `<li><a class="nav__link" href="/${lang}${hubPath(h.id)}"${currentHub === h.id ? ' aria-current="page"' : ''}>${esc(hubNames[h.id])}</a></li>`).join('');
  const mobileLinks = `<li><a href="/${lang}/tools/">${esc(ui.toolsNav)}</a></li>` + HUBS.map((h) => `<li><a href="/${lang}${hubPath(h.id)}">${esc(hubNames[h.id])}</a></li>`).join('');
  const mobileLangs = langs.map((l) => `<li><a href="${l.href}" hreflang="${l.tag}" lang="${l.tag}"${l.current ? ' aria-current="true"' : ''}>${l.name}</a></li>`).join('');
  return `<header class="site-header">
      <div class="container site-header__inner">
        <a class="logo" href="/${lang}/" aria-label="${esc(ui.home)}">${logoMark()}<span class="logo__word" aria-hidden="true">${BRAND}</span></a>
        <nav class="nav" aria-label="${esc(ui.mainNav)}"><ul class="nav__list">${hubLinks}</ul></nav>
        <div class="site-header__actions">
          <details class="lang-menu">
            <summary class="btn btn--sm" aria-label="${esc(ui.language)}">${icon('globe', 16)}<span>${lang.toUpperCase()}</span></summary>
            <ul class="lang-menu__list">${langList}</ul>
          </details>
          <details class="mobile-menu">
            <summary class="icon-btn" aria-label="${esc(ui.menu)}">${icon('menu', 22)}</summary>
            <div class="mobile-menu__panel"><ul>${mobileLinks}</ul><ul class="mobile-langs">${mobileLangs}</ul></div>
          </details>
        </div>
      </div>
    </header>`;
}

function footer(lang, path, ui) {
  const langs = languageLinks(lang, path).map((l) => `<li><a href="${l.href}" hreflang="${l.tag}" lang="${l.tag}"${l.current ? ' aria-current="true"' : ''}>${l.name}</a></li>`).join('');
  return `<footer class="site-footer">
      <div class="container site-footer__inner">
        <div class="site-footer__brand">${logoMark(22)}<span>${esc(ui.tagline)}</span></div>
        <ul class="footer-langs" aria-label="${esc(ui.language)}">${langs}</ul>
        <ul class="site-footer__links" aria-label="${esc(ui.footerNav)}">
          <li><a href="/${lang}/privacy/">${esc(ui.privacy)}</a></li>
          <li><a href="/${lang}/imprint/">${esc(ui.imprint)}</a></li>
          <li><a href="https://open-online.com/${lang}/" rel="noopener noreferrer" target="_blank">Open Online</a></li>
        </ul>
      </div>
    </footer>`;
}

function page({ lang, path, title, description, body, hubId, type, jsonLd, home = false, csp, scripts = [] }) {
  const c = locales[lang];
  const hubNames = Object.fromEntries(HUBS.map((h) => [h.id, c.hubs[h.id].name]));
  return `<!doctype html>
<html lang="${lang}">
  <head>
    ${head({ lang, path, title, description, type, jsonLd, csp })}
  </head>
  <body>
    <a class="skip-link" href="#main">${esc(c.ui.skip)}</a>
    ${header(lang, path, c.ui, hubNames, hubId)}
    <main id="main"${home ? ' class="main-home"' : ''}>
${body}
    </main>
    ${footer(lang, path, c.ui)}
${scripts.map((src) => `    <script src="${src}" defer></script>`).join('\n')}
  </body>
</html>
`;
}

const breadcrumb = (items) =>
  `<ol class="breadcrumb" aria-label="Breadcrumb">${items.map((i, n) => (n === items.length - 1 ? `<li><span aria-current="page">${esc(i.label)}</span></li>` : `<li><a href="${i.href}">${esc(i.label)}</a></li>`)).join('')}</ol>`;

const breadcrumbLd = (lang, items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((i, n) => ({ '@type': 'ListItem', position: n + 1, name: i.label, item: SITE_URL + i.href })),
});

const guideCard = (lang, g) => {
  const t = locales[lang].guides[g.id];
  return `<li><a class="guide-card" href="/${lang}${guidePath(g)}"><span class="card__icon">${icon(hubOf(g.hub).icon)}</span><span class="card__body"><strong>${esc(t.short)}</strong><small>${esc(truncate(plain(t.lead), 90))}</small></span></a></li>`;
};

/** Link card to the matching open-online.com viewer page (same language). */
function openOnlineCard(lang, fmt) {
  if (!fmt) return '';
  const ui = locales[lang].ui;
  return `<aside class="side-card"><h2 class="side-card__title">${esc(ui.openOnlineTitle)}</h2><p class="side-card__text">${esc(ui.openOnlineText)}</p><p class="side-card__text"><a href="https://open-online.com/${lang}/${fmt}" rel="noopener noreferrer" target="_blank">${esc(ui.openOnlineLink)} →</a></p></aside>`;
}

const dateLong = (lang, iso) => new Intl.DateTimeFormat(lang, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(iso));

// -------------------------------------------------------------------- pages
function homePage(lang) {
  const c = locales[lang];
  const ui = c.ui;
  const popular = POPULAR.map((id) => guideCard(lang, guideOf(id))).join('');
  const topics = HUBS.map((h) => {
    const n = GUIDES.filter((g) => g.hub === h.id).length;
    return `<li><a class="category-card" href="/${lang}${hubPath(h.id)}"><span class="card__icon">${icon(h.icon)}</span><span class="card__body"><strong>${esc(c.hubs[h.id].name)}</strong><small>${esc(c.hubs[h.id].blurb)} · ${esc(ui.guideCount(n))}</small></span></a></li>`;
  }).join('');
  const features = ui.features.map((f, i) => `<li class="feature"><span class="feature__icon">${icon(['shield', 'lock', 'file'][i])}</span><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></li>`).join('');
  const body = `      <section class="hero">
        <div class="container hero__inner">
          <h1 class="hero__title">${esc(ui.h1)} <span class="hero__sub">${esc(ui.sub)}</span></h1>
          <p class="hero__lead">${esc(ui.lead)}</p>
          <nav class="shortcuts" aria-label="${esc(ui.topics)}">${HUBS.map((h) => `<a class="chip" href="/${lang}${hubPath(h.id)}">${esc(c.hubs[h.id].name)}</a>`).join('')}</nav>
          <p class="trust">${icon('shield', 16)}<span>${esc(ui.trust)}</span></p>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="section__head"><h2>${esc(ui.toolsName)}</h2><a href="/${lang}/tools/">${esc(ui.allTools)} →</a></div>
          <ul class="guide-grid">${TOOLS.filter((t) => t.home).map((t) => toolCard(lang, t)).join('')}</ul>
        </div>
      </section>
      <section class="section section--subtle">
        <div class="container">
          <div class="section__head"><h2>${esc(ui.popular)}</h2></div>
          <ul class="guide-grid">${popular}</ul>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="section__head"><h2>${esc(ui.topics)}</h2></div>
          <ul class="category-grid">${topics}</ul>
        </div>
      </section>
      <section class="section section--subtle">
        <div class="container">
          <h2 class="section__title">${esc(ui.whyTitle)}</h2>
          <ul class="feature-grid">${features}</ul>
        </div>
      </section>`;
  return page({
    lang,
    path: '/',
    title: ui.homeTitle,
    description: ui.homeDescription,
    body,
    home: true,
    jsonLd: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: BRAND, url: urlOf(lang, '/'), inLanguage: lang, description: ui.homeDescription }],
  });
}

function hubPage(lang, hub) {
  const c = locales[lang];
  const ui = c.ui;
  const h = c.hubs[hub.id];
  const guides = GUIDES.filter((g) => g.hub === hub.id).sort((a, b) => b.volume - a.volume);
  const crumbs = [
    { label: ui.homeCrumb, href: `/${lang}/` },
    { label: h.name, href: `/${lang}${hubPath(hub.id)}` },
  ];
  const body = `      <div class="container">
        ${breadcrumb(crumbs)}
        <header class="page-head"><span class="page-head__icon">${icon(hub.icon, 26)}</span><div><h1>${esc(h.name)}</h1><p class="page-head__lead">${esc(h.lead)}</p></div></header>
        <div class="page-body"><ul class="guide-grid">${guides.map((g) => guideCard(lang, g)).join('')}</ul></div>
      </div>`;
  return page({
    lang,
    path: hubPath(hub.id),
    title: `${h.name} – ${BRAND}`,
    description: truncate(h.lead),
    body,
    hubId: hub.id,
    jsonLd: [breadcrumbLd(lang, crumbs)],
  });
}

function guidePage(lang, g) {
  const c = locales[lang];
  const ui = c.ui;
  const t = c.guides[g.id];
  const hub = hubOf(g.hub);
  const crumbs = [
    { label: ui.homeCrumb, href: `/${lang}/` },
    { label: c.hubs[hub.id].name, href: `/${lang}${hubPath(hub.id)}` },
    { label: t.short, href: `/${lang}${guidePath(g)}` },
  ];
  const sections = t.sections
    .map((s) => {
      const parts = [`<h2>${inline(s.h, lang)}</h2>`];
      // Blocks render in the order they are written in the content file.
      for (const [key, value] of Object.entries(s)) {
        if (key === 'p' || key === 'after') for (const p of value) parts.push(`<p>${inline(p, lang)}</p>`);
        else if (key === 'steps') parts.push(`<ol class="steps">${value.map((x) => `<li>${inline(x, lang)}</li>`).join('')}</ol>`);
        else if (key === 'code') parts.push(`<pre><code>${esc(value)}</code></pre>`);
      }
      return parts.join('\n          ');
    })
    .join('\n          ');
  const callout = t.callout ? `<p class="callout${t.callout.type === 'warning' ? ' callout--warning' : ''}"><strong>${esc(t.callout.type === 'warning' ? ui.warning : ui.tip)}:</strong> ${inline(t.callout.text, lang)}</p>` : '';
  const faq = `<h2>${esc(ui.faq)}</h2>
          <div class="faq">${t.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${inline(a, lang)}</p></details>`).join('')}</div>`;
  const related = g.related.map((id) => guideOf(id)).filter(Boolean);
  const sideRelated = `<aside class="side-card"><h2 class="side-card__title">${esc(ui.related)}</h2><ul class="related">${related.map((r) => `<li><a href="/${lang}${guidePath(r)}">${esc(c.guides[r.id].short)}</a></li>`).join('')}</ul></aside>`;
  const sideNote = `<aside class="side-card"><h2 class="side-card__title">${esc(ui.goodToKnow)}</h2><p class="side-card__text">${esc(ui.disclaimer)}</p></aside>`;
  const body = `      <div class="container">
        ${breadcrumb(crumbs)}
        <header class="page-head"><span class="page-head__icon">${icon(hub.icon, 26)}</span><div><h1>${esc(t.title)}</h1><p class="page-head__lead">${inline(t.lead, lang)}</p></div></header>
        ${toolCtas(lang, g)}
        <div class="guide-layout">
          <article class="prose">
          ${sections}
          ${callout}
          ${faq}
          </article>
          <div class="guide-layout__side">${sideRelated}${openOnlineCard(lang, g.openOnline)}${sideNote}</div>
        </div>
      </div>`;
  const description = truncate(plain(t.desc ?? t.lead));
  return page({
    lang,
    path: guidePath(g),
    title: `${t.title} – ${BRAND}`,
    description,
    body,
    hubId: g.hub,
    type: 'article',
    jsonLd: [
      breadcrumbLd(lang, crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: t.title,
        description,
        inLanguage: lang,
        dateModified: REVIEWED,
        mainEntityOfPage: urlOf(lang, guidePath(g)),
        author: { '@type': 'Organization', name: BRAND },
        publisher: { '@type': 'Organization', name: BRAND, url: SITE_URL },
      },
    ],
  });
}

function legalShell(lang, path, title, lead, inner) {
  const c = locales[lang];
  const crumbs = [
    { label: c.ui.homeCrumb, href: `/${lang}/` },
    { label: title, href: `/${lang}${path}` },
  ];
  const body = `      <div class="container">
        ${breadcrumb(crumbs)}
        <header class="page-head"><div><h1>${esc(title)}</h1><p class="page-head__lead">${esc(lead)}</p></div></header>
        <div class="page-body"><div class="prose prose--legal">
          ${inner}
        </div></div>
      </div>`;
  return page({ lang, path, title: `${title} – ${BRAND}`, description: truncate(lead), body, jsonLd: [breadcrumbLd(lang, crumbs)] });
}

function privacyPage(lang) {
  const p = locales[lang].privacy;
  const inner = p.sections.map((s) => `<h2>${esc(s.h)}</h2>\n          ${s.p.map((x) => `<p>${inline(x.replaceAll('{EMAIL}', `[${EMAIL}](mailto:${EMAIL})`), lang)}</p>`).join('\n          ')}`).join('\n          ');
  return legalShell(lang, '/privacy/', p.title, p.lead, `${inner}\n          <p class="legal__updated">${esc(p.updated)}${p.note ? ` · ${esc(p.note)}` : ''}</p>`);
}

/*
 * Imprint according to § 5 DDG (Digitale-Dienste-Gesetz) — same provider details as open-online.com.
 * TODO(legal): see "Legal information to confirm" in README.md (operator form, summonable address,
 * second contact channel, VAT ID) before a public commercial launch.
 */
function imprintPage(lang) {
  const i = locales[lang].imprint;
  const inner = `<h2>Angaben gemäß § 5 DDG</h2>
          <address class="legal__address">${BRAND}<br>c/o Andreas Dittes<br>Bautzener Str. 35<br>10829 Berlin<br>${esc(i.country)}</address>
          <h2>${esc(i.contact)}</h2>
          <p>${esc(i.emailLabel)}: <a href="mailto:${EMAIL}">${EMAIL}</a></p>
          <h2>${esc(i.guidesTitle)}</h2>
          <p>${inline(i.guides, lang)}</p>${i.note ? `\n          <p class="legal__updated">${esc(i.note)}</p>` : ''}`;
  const title = lang === 'de' ? i.title : `${i.title} / Impressum`;
  return legalShell(lang, '/imprint/', title, i.lead, inner);
}

// -------------------------------------------------------------------- tools
const toolPath = (t) => `/tools/${t.id}/`;

function toolCtas(lang, g) {
  const c = locales[lang];
  return TOOLS.flatMap((t) => t.guides.filter((x) => x.id === g.id && x.cta !== false).map((x) => ({ t, x })))
    .map(({ t, x }) => `<p class="tool-cta"><span>${esc(c.ui.toolCta)} <strong>${esc(c.tools[t.id].short)}</strong></span><a class="btn btn--primary" href="/${lang}${toolPath(t)}${x.hash ? `#${x.hash}` : ''}">${esc(c.ui.openTool)}</a></p>`)
    .join('\n        ');
}

const toolCard = (lang, t) => {
  const x = locales[lang].tools[t.id];
  return `<li><a class="guide-card" href="/${lang}${toolPath(t)}"><span class="card__icon">${icon(t.icon)}</span><span class="card__body"><strong>${esc(x.short)}</strong><small>${esc(truncate(plain(x.lead), 90))}</small></span></a></li>`;
};

function toolsIndexPage(lang) {
  const c = locales[lang];
  const ui = c.ui;
  const crumbs = [
    { label: ui.homeCrumb, href: `/${lang}/` },
    { label: ui.toolsName, href: `/${lang}/tools/` },
  ];
  const body = `      <div class="container">
        ${breadcrumb(crumbs)}
        <header class="page-head"><span class="page-head__icon">${icon('shield', 26)}</span><div><h1>${esc(ui.toolsName)}</h1><p class="page-head__lead">${esc(ui.toolsLead)}</p></div></header>
        <div class="page-body"><ul class="guide-grid">${TOOLS.map((t) => toolCard(lang, t)).join('')}</ul>
        <p class="tool-privacy">${icon('shield', 16)}<span>${esc(ui.toolsPrivacy)}</span></p></div>
      </div>`;
  return page({ lang, path: '/tools/', title: `${ui.toolsName} – ${BRAND}`, description: truncate(ui.toolsLead), body, hubId: 'tools', jsonLd: [breadcrumbLd(lang, crumbs)] });
}

function toolPage(lang, t) {
  const c = locales[lang];
  const ui = c.ui;
  const x = c.tools[t.id];
  const uiData = (t.uiFrom ? c.tools[t.uiFrom] : x).ui;
  const crumbs = [
    { label: ui.homeCrumb, href: `/${lang}/` },
    { label: ui.toolsName, href: `/${lang}/tools/` },
    { label: x.short, href: `/${lang}${toolPath(t)}` },
  ];
  const guides = t.guides.map((g) => guideOf(g.id));
  const related = !guides.length ? '' : `<aside class="side-card"><h2 class="side-card__title">${esc(ui.relatedGuides)}</h2><ul class="related">${guides.map((g) => `<li><a href="/${lang}${guidePath(g)}">${esc(c.guides[g.id].short)}</a></li>`).join('')}</ul></aside>`;
  const otherTools = TOOLS.filter((o) => o.id !== t.id).slice(0, 4);
  const more = `<aside class="side-card"><h2 class="side-card__title">${esc(ui.moreTools)}</h2><ul class="related">${otherTools.map((o) => `<li><a href="/${lang}${toolPath(o)}">${esc(c.tools[o.id].short)}</a></li>`).join('')}</ul></aside>`;
  const faq = `<h2>${esc(ui.faq)}</h2>\n          <div class="faq">${x.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${inline(a, lang)}</p></details>`).join('')}</div>`;
  const body = `      <div class="container">
        ${breadcrumb(crumbs)}
        <header class="page-head"><span class="page-head__icon">${icon(t.icon, 26)}</span><div><h1>${esc(x.title)}</h1><p class="page-head__lead">${inline(x.lead, lang)}</p></div></header>
        <div class="tool" data-tool="${t.id}" data-lang="${lang}" data-i18n="${esc(JSON.stringify(uiData))}"${t.preset ? ` data-preset="${t.preset}"` : ''}><p class="tool__loading">${esc(ui.toolLoading)}</p><noscript><p class="notice notice--warning">${esc(ui.toolNoscript)}</p></noscript></div>
        <p class="tool-privacy">${icon('shield', 16)}<span>${esc(ui.toolsPrivacy)}</span></p>
        <div class="guide-layout">
          <article class="prose">
          <h2>${esc(x.aboutTitle ?? ui.howItWorks)}</h2>
          ${x.about.map((p) => `<p>${inline(p, lang)}</p>`).join('\n          ')}
          ${faq}
          </article>
          <div class="guide-layout__side">${related}${openOnlineCard(lang, t.openOnline)}${more}</div>
        </div>
      </div>`;
  const description = truncate(plain(x.desc));
  return page({
    lang,
    path: toolPath(t),
    title: `${x.title} – ${BRAND}`,
    description,
    body,
    hubId: 'tools',
    csp: cspFor(t.csp),
    scripts: t.scripts.map((s) => (s.startsWith('/') ? s : `/assets/tools/${s}`)),
    jsonLd: [
      breadcrumbLd(lang, crumbs),
      { '@context': 'https://schema.org', '@type': 'WebApplication', name: x.title, url: urlOf(lang, toolPath(t)), inLanguage: lang, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', isAccessibleForFree: true, description },
    ],
  });
}

// --------------------------------------------------------------- root + misc
function rootPage() {
  const items = LANGS.map((l) => {
    const ui = locales[l.code].ui;
    return `<li lang="${l.tag}"><a href="/${l.code}/" hreflang="${l.tag}"><strong>${l.name}</strong><span>${esc(ui.h1)} ${esc(ui.sub)}</span></a></li>`;
  }).join('');
  const alts = LANGS.map((l) => `<link rel="alternate" hreflang="${l.tag}" href="${SITE_URL}/${l.code}/">`).join('\n    ');
  const description = LANGS.map((l) => locales[l.code].ui.homeDescription).join(' · ');
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta http-equiv="Content-Security-Policy" content="${CSP}">
    <title>${BRAND}</title>
    <meta name="description" content="${esc(truncate(description, 300))}">
    <link rel="canonical" href="${SITE_URL}/">
    ${alts}
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/assets/styles.css">
    <meta name="theme-color" content="#ffffff">
    <script src="/assets/root.js" defer></script>
  </head>
  <body>
    <main id="main" class="root-page">
      <div class="root-page__inner">
        <span class="root-page__logo">${logoMark(44)}<span>${BRAND}</span></span>
        <ul class="root-page__langs">${items}</ul>
      </div>
    </main>
  </body>
</html>
`;
}

const ROOT_JS = `// Forwards visitors from "/" to their browser language. Crawlers and visitors without JavaScript get the plain links.
(function () {
  var langs = ${JSON.stringify(LANGS.map((l) => l.code))};
  var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
  var pick = 'en';
  for (var i = 0; i < prefs.length; i++) {
    var base = String(prefs[i]).toLowerCase().split('-')[0];
    if (langs.indexOf(base) !== -1) { pick = base; break; }
  }
  location.replace('/' + pick + '/' + location.hash);
})();
`;

function notFoundPage() {
  const items = LANGS.map((l) => `<li lang="${l.tag}"><a href="/${l.code}/" hreflang="${l.tag}"><strong>${l.name}</strong><span>${esc(locales[l.code].ui.notFound)}</span></a></li>`).join('');
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta http-equiv="Content-Security-Policy" content="${CSP}">
    <meta name="robots" content="noindex">
    <title>404 – ${BRAND}</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/assets/styles.css">
  </head>
  <body>
    <main id="main" class="root-page">
      <div class="root-page__inner">
        <span class="root-page__logo">${logoMark(44)}<span>${BRAND}</span></span>
        <ul class="root-page__langs">${items}</ul>
      </div>
    </main>
  </body>
</html>
`;
}

// -------------------------------------------------------------------- write
const written = [];
function write(rel, content) {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  written.push(rel);
}

for (const l of LANGS) rmSync(join(ROOT, l.code), { recursive: true, force: true });

const urls = []; // [path] without language prefix
for (const l of LANGS) {
  const lang = l.code;
  write(`${lang}/index.html`, homePage(lang));
  write(`${lang}/privacy/index.html`, privacyPage(lang));
  write(`${lang}/imprint/index.html`, imprintPage(lang));
  for (const h of HUBS) write(`${lang}${hubPath(h.id)}index.html`, hubPage(lang, h));
  for (const g of GUIDES) write(`${lang}${guidePath(g)}index.html`, guidePage(lang, g));
  write(`${lang}/tools/index.html`, toolsIndexPage(lang));
  for (const t of TOOLS) write(`${lang}${toolPath(t)}index.html`, toolPage(lang, t));
}
urls.push('/', '/tools/', '/privacy/', '/imprint/', ...TOOLS.map(toolPath), ...HUBS.map((h) => hubPath(h.id)), ...GUIDES.map(guidePath));

write('index.html', rootPage());
write('404.html', notFoundPage());
write('favicon.svg', FAVICON);
write('assets/root.js', ROOT_JS);
cpSync(join(ROOT, 'site/styles.css'), join(ROOT, 'assets/styles.css'));
rmSync(join(ROOT, 'assets/tools'), { recursive: true, force: true });
cpSync(join(ROOT, 'site/tools'), join(ROOT, 'assets/tools'), { recursive: true });

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.flatMap((l) =>
  urls.map((p) => {
    const alts = LANGS.map((a) => `\n    <xhtml:link rel="alternate" hreflang="${a.tag}" href="${urlOf(a.code, p)}"/>`).join('');
    return `  <url>\n    <loc>${urlOf(l.code, p)}</loc>\n    <lastmod>${REVIEWED}</lastmod>${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/"/>\n  </url>`;
  }),
).join('\n')}
</urlset>
`;
write('sitemap.xml', sitemap);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`Built ${written.length} files: ${LANGS.length} languages × ${urls.length} pages + root, 404, sitemap.`);
