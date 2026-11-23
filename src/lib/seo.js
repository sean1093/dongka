// 結構化資料（JSON-LD）的小工具。只用 Google 目前仍支援的型別：Article、BreadcrumbList、WebSite。
import { site } from '../data/site.js';

const org = { '@type': 'Organization', name: `${site.name} ${site.nameEn}` };

export const breadcrumb = (origin, items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${origin}${path}` })),
});

export const article = (origin, { headline, description, path, type = 'Article' }) => ({
  '@context': 'https://schema.org',
  '@type': type,
  headline,
  description,
  inLanguage: 'zh-Hant-TW',
  mainEntityOfPage: `${origin}${path}`,
  datePublished: site.published,
  dateModified: site.updated,
  author: org,
  publisher: org,
  isAccessibleForFree: true,
  image: `${origin}${import.meta.env.BASE_URL.replace(/\/$/, '')}/og.png`,
});

export const website = (origin, base) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  alternateName: [site.nameEn, `${site.name} ${site.nameEn}`],
  url: `${origin}${base}/`,
  inLanguage: 'zh-Hant-TW',
  description: site.description,
});

export const itemList = (origin, name, items) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name,
  itemListElement: items.map(([n, path], i) => ({ '@type': 'ListItem', position: i + 1, name: n, url: `${origin}${path}` })),
});
