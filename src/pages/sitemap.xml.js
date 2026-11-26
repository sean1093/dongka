import { lessons, tools } from '../data/lessons.js';
import { glossary } from '../data/glossary.js';
import { drinks } from '../data/drinks.js';
import { faqs } from '../data/faq.js';
import { comparisons } from '../data/compare.js';
import { sheets } from '../data/cheatsheets.js';
import { origins } from '../data/atlas.js';
import { site, slugify } from '../data/site.js';
import { hasOriginPage } from '../lib/origin-pages.js';

export function GET({ site: origin }) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const root = `${(origin?.origin || '').replace(/\/$/, '')}${base}`;
  const paths = [
    ['/', 1.0], ['/start/', 0.8], ['/faq/', 0.8], ['/compare/', 0.8], ['/cheatsheets/', 0.8],
    ...faqs.map((f) => [`/faq/${f.slug}/`, 0.7]),
    ...comparisons.map((c) => [`/compare/${c.slug}/`, 0.7]),
    ...sheets.map((s) => [`/cheatsheets/${s.slug}/`, 0.7]),
    ...origins.filter(hasOriginPage).map((o) => [`/atlas/${o.key}/`, 0.6]),
    ...lessons.map((l) => [`/lessons/${l.slug}/`, 0.9]),
    ['/atlas/', 0.8], ['/drinks/', 0.8], ['/glossary/', 0.8], ['/tools/', 0.7],
    ['/first-cup/', 0.9],
    ...tools.filter((t) => /^\/(tools|practice)\//.test(t.path)).map((t) => [t.path, t.slug === 'review' ? 0.4 : 0.6]),
    ...drinks.map((d) => [`/drinks/${d.key}/`, 0.6]),
    ...glossary.map((g) => [`/glossary/${slugify(g.en)}/`, 0.5]),
    ['/about/', 0.4], ['/my-data/', 0.2], ['/privacy/', 0.2], ['/terms/', 0.2],
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map(([p, pr]) => `  <url><loc>${root}${p}</loc><lastmod>${site.updated}</lastmod><priority>${pr}</priority></url>`)
    .join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
