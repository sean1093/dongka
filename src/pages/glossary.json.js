// 名詞面板的資料：名詞本身、對應插圖、出現在哪幾篇。
import { glossary } from '../data/glossary.js';
import { lessons } from '../data/lessons.js';
import { figByKey } from '../lib/figures.js';

const files = import.meta.glob('../content/lessons/*.md', { query: '?raw', import: 'default', eager: true });

export function GET() {
  const figs = {};
  const terms = glossary.map((g) => {
    if (g.fig && figByKey[g.fig] && !figs[g.fig]) figs[g.fig] = figByKey[g.fig]();
    const words = [g.term, ...(g.alias || [])];
    const inLessons = lessons
      .filter((l) => words.some((w) => files[`../content/lessons/${l.id}.md`].includes(w)))
      .map((l) => ({ id: l.id, slug: l.slug, title: l.title }));
    return { ...g, lessons: inLessons };
  });
  return new Response(JSON.stringify({ terms, figs }), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
