// Clusters an Ubersuggest keyword export ("remove …") by search intent.
// Usage: node research/cluster.mjs "<path to csv>" [--md]
// First matching rule wins, so the order of CLUSTERS matters.
import { readFileSync } from 'node:fs';

const file = process.argv[2];
if (!file) throw new Error('usage: node research/cluster.mjs <csv> [--md]');

const rows = readFileSync(file, 'utf8')
  .trim()
  .split(/\r?\n/)
  .slice(1)
  .map((line) => {
    const [no, keyword, volume, cpc, paid] = line.split(',');
    return { keyword: keyword.trim(), volume: +volume, cpc: +cpc, paid: +paid };
  });

/** [id, label, regex] — see research/KEYWORDS.md for what each one means. */
const CLUSTERS = [
  ['noise', 'Wrong intent (puzzles, games, dictionary, typos)', /^remove$|synonym|definition|deutsch|in french|in german|ka matlab|ka hindi|remote jobs|sticks|matches|crossword|letters$|^remove \d+$|^remove 4k$|before flight|curse|your shoes|^remove japan|kebab|enchantment|xp command|quip head|embellishment|wow midnight|k digits|nth node|e2 80|jumper cables|70mai|^remove 7 12|\b(870|794|80 series|79 series|72 pin|10\/22|5070ti|60hz|500 and switch|60 day|59 hold|50 amp|5 gallon|5h limit|8 characters|6 digits|4 wisdom|8mm|4 in 1|7 crossword|403|10 arrows|4x4|0 from unique|0 from excel cells|000 in excel|0s in excel|5 from a number|4 black points|7 characters|5g|15 pro|16 pro|01 from driving|18 gst|5 vat|5th wheel|7 speed|802\.1x|3d print|401k|4k from|4 letters|1 star review)/],
  ['medical', 'Body / health (YMYL)', /uterus|kidney stone|tartar|under eye|xanthelasma|milia|skin tag|\bzit\b|5 o clock|hair dye|wisdom/],
  ['physical', 'Physical household / car / DIY removal', /rust|stain|glue|nail |gel nails|nail polish|urine|sticker residue|3m |gum from|faucet|keyboard keys|quick weave|zip tie|hard water|4l60e|02 sensor|japan cream|quick link|forend|oil stains|coffee|ketchup|wine|water from speaker/],
  ['junk', 'Junk removal (local service, high CPC)', /^remove junk$|junk for free|junk from house/],
  ['pc', 'PC / Mac clean-up & uninstalling software', /junk files|hibernation|recycle bin|recovery partition|bloatware|360 total|quick access|xbox game bar|keyboard layout|user profile windows|365 account|onedrive|xcode|homebrew|ollama|app from mac|from mac|quarantine/],
  ['paywall', 'Paywall bypass (circumvention)', /paywall/],
  ['privacy', 'Privacy & reputation (address, reviews, data brokers)', /home address|star review|your media|open to work|learn about this picture|reddit app popup|content warning|find hub|quest badge/],
  ['pdf', 'PDF (pages, password, text, links, metadata)', /pdf|^remove pages$|one page|1 page|1st page|2nd page|2 pages|0age|remove link|remove question mark|remove 0df/],
  ['metadata', 'Metadata / EXIF (photo, video)', /metadata|exif/],
  ['bgvideo', 'Background / green-screen removal — video & GIF', /(bg|background).*(video|gif)|video background|gif background|green screen|bg 8k/],
  ['bg', 'Background removal — images', /background|\bbg\b|hintergrund|white background|jpg$|^remove jpg|photo background|qr code background|^remove the background/],
  ['ai', 'AI detection / AI provenance (SynthID, labels, AI metadata)', /^(?!.*(object)).*(\bai\b|synthid|gemini watermark|gemini logo|chatgpt watermark|claude watermark|watermark claude|zom\.ai|ai detection|ai label|ai formatting|watermark ai)/],
  ['watermark', 'Watermark / logo removal (third-party content)', /watermark|logo|capcut/],
  ['audio', 'Audio: voice / vocals / music / noise (incl. from video)', /voice|vocal|instrumental|lyrics|music|noise|audio|sound|song/],
  ['video', 'Video clean-up (text, objects)', /video/],
  ['objects', 'Object / person / text removal in photos (inpainting)', /object|person|photo|picture|image|emoji|things from|something from|unwanted|item from|red eye|reflection|filter|color from|icon|^remove from|^remove text$|qr code|1 person/],
  ['social', 'Social & app feature removal (reposts, Shorts, ads, followers)', /follower|reposts|reels|kudos|youtube shorts|shorts|youtube recommendations|kindle ads|gemini from android|meta ai|lemon 8|x from|restrictions epic|spotify|tiktok|zoom|mcp from claude|hermes|claude from contributors|yahoo/],
  ['accounts', 'Accounts, logins & payment cards', /google account|2 step|2fa|2 factor|instagram account|x account|xbox account|xbox from|card from|esim|work profile|youtube account|x profile|jio|device from|xiaomi/],
  ['office', 'Text, Excel, Word & list clean-up', /excel|word|line break|new lines|spaces|empty|duplicate|formatting|hidden char|hyperlink|section break|header|horizontal line|html tags|pivot|0 from|zeros|characters from|digits from|first character|characters|phone number|text$|remove 0|3 buttons|3 letters|2 digits/],
  ['dev', 'Developer & sysadmin (git, docker, linux, python, R)', /git|docker|linux|symlink|directory|\bdir\b|conda|venv|from list|from set|dictionary|array|na in r|ggplot|legend|submodule|iframe|underline|key from|repository from github|zip file|7zip|7z|zip password|local branch|remote branch|item from list|list python|duplicates from|sorted|rows with na|tracking|\bsandbox|url$|\bhtml\b|css|javascript/],
];

const buckets = new Map(CLUSTERS.map(([id, label]) => [id, { id, label, kws: [] }]));
const other = { id: 'other', label: 'Unassigned', kws: [] };
for (const r of rows) {
  const hit = CLUSTERS.find(([, , re]) => re.test(r.keyword));
  (hit ? buckets.get(hit[0]) : other).kws.push(r);
}
const all = [...buckets.values(), other].filter((b) => b.kws.length);

const total = rows.reduce((s, r) => s + r.volume, 0);
const fmt = (n) => n.toLocaleString('en-US');
const stats = all
  .map((b) => {
    const vol = b.kws.reduce((s, r) => s + r.volume, 0);
    const cpcW = b.kws.reduce((s, r) => s + r.cpc * r.volume, 0) / (vol || 1);
    const top = [...b.kws].sort((a, c) => c.volume - a.volume);
    return { ...b, vol, cpc: cpcW, n: b.kws.length, top };
  })
  .sort((a, b) => b.vol - a.vol);

if (process.argv.includes('--md')) {
  console.log('| Cluster | Keywords | Volume | Vol. w/o top term | Wtd. CPC | Top terms |\n|---|---:|---:|---:|---:|---|');
  for (const s of stats) {
    const rest = s.vol - s.top[0].volume;
    console.log(`| ${s.label} | ${s.n} | ${fmt(s.vol)} | ${fmt(rest)} | $${s.cpc.toFixed(2)} | ${s.top.slice(0, 4).map((k) => `${k.keyword} (${fmt(k.volume)})`).join('; ')} |`);
  }
  console.log(`\nTotal: ${rows.length} keywords, ${fmt(total)} monthly searches`);
} else {
  for (const s of stats) {
    console.log(`\n## ${s.label} [${s.id}] — ${s.n} kws, vol ${fmt(s.vol)}, cpc $${s.cpc.toFixed(2)}`);
    for (const k of s.top.slice(0, process.argv.includes('--all') ? 999 : 8)) console.log(`   ${fmt(k.volume).padStart(11)}  ${k.keyword}`);
  }
  console.log(`\nTotal: ${rows.length} keywords, ${fmt(total)}`);
}
