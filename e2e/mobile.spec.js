// 390px 手機寬度與 150% 字級：不能出現橫向捲動，導覽列不能斷成直排
import { test, expect } from '@playwright/test';

test('手機寬度與放大字級下沒有橫向捲動', async ({ page, request }) => {
  test.setTimeout(300_000);
  const xml = await (await request.get('sitemap.xml')).text();
  const list = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  const bad = [];
  for (const p of list) {
    await page.goto(p);
    for (const size of ['100%', '150%']) {
      await page.evaluate((s) => (document.documentElement.style.fontSize = s), size);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (over > 1) bad.push(`${p} @${size}: 超出 ${over}px`);
    }
  }
  expect(bad).toEqual([]);
});

test('原生分享按鈕：瀏覽器支援時出現並帶入網址（#26）', async ({ page }) => {
  await page.addInitScript(() => {
    window.__shared = [];
    navigator.share = async (d) => { window.__shared.push(d); };
    navigator.canShare = () => true;
  });
  await page.goto('faq/no-scale-pour-over/');
  const btn = page.locator('[data-share="native"]').first();
  await expect(btn).toBeVisible();
  await btn.click();
  const shared = await page.evaluate(() => window.__shared);
  expect(shared[0].url).toContain('/dongka/faq/no-scale-pour-over/');
});
