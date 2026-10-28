// Verifies that every internal link / asset reference in the built site resolves to a file, and counts pages per language.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const pages = [];
const walk = (dir) => {
  for (const f of readdirSync(join(root, dir))) {
    const rel = join(dir, f);
    if (['node_modules', '.git', 'site', 'research', '.claude'].includes(f)) continue;
    if (statSync(join(root, rel)).isDirectory()) walk(rel);
    else if (f.endsWith('.html')) pages.push(rel);
  }
};
walk('');
const resolves = (url) => {
  const p = url.split('#')[0].split('?')[0];
  if (!p || p === '/') return existsSync(join(root, 'index.html'));
  const path = join(root, p);
  return existsSync(path) && statSync(path).isFile() ? true : existsSync(join(path, 'index.html'));
};
let bad = 0, links = 0;
for (const page of pages) {
  const html = readFileSync(join(root, page), 'utf8');
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    links++;
    if (!resolves(url)) { bad++; console.log(`BROKEN ${page}: ${url}`); }
  }
}
const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
for (const [, loc] of sitemap.matchAll(/<loc>https:\/\/remove-online\.com([^<]*)<\/loc>/g)) if (!resolves(loc)) { bad++; console.log(`SITEMAP ${loc}`); }
console.log(`${pages.length} html pages, ${links} internal references checked, ${bad} problems`);
