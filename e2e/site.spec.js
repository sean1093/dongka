// 全站：sitemap 上每個網址都能打開、沒有 JS 錯誤、內部連結不壞
import { test, expect } from '@playwright/test';

async function urls(request) {
  const xml = await (await request.get('sitemap.xml')).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

test('sitemap 每頁都回 200，頁內連結指向存在的頁面', async ({ request }) => {
  test.setTimeout(240_000);
  const list = await urls(request);
  expect(list.length).toBeGreaterThan(100);
  const seen = new Map();
  const status = async (p) => {
    if (!seen.has(p)) seen.set(p, (await request.get(p)).status());
    return seen.get(p);
  };
  const broken = [];
  for (const p of list) {
    const r = await request.get(p);
    expect(r.status(), p).toBe(200);
    const html = await r.text();
    for (const [, href] of html.matchAll(/href="(\/dongka\/[^"#?]*)/g)) {
      if (/\.(xml|txt|json|png|jpg|svg|ico|webmanifest|css|js)$/.test(href)) continue;
      if ((await status(href)) !== 200) broken.push(`${p} → ${href}`);
    }
  }
  expect(broken).toEqual([]);
});

test('每頁開起來沒有 JavaScript 錯誤', async ({ page, request }) => {
  test.setTimeout(300_000);
  const list = await urls(request);
  const errors = [];
  page.on('pageerror', (e) => errors.push(`${page.url()}: ${e.message}`));
  for (const p of list) await page.goto(p, { waitUntil: 'load' });
  expect(errors).toEqual([]);
});
