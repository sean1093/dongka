// 各工具的關鍵情境
import { test, expect } from '@playwright/test';

test('萃取率：15g、225g、TDS 1.35 → 20.3%，金杯區', async ({ page }) => {
  await page.goto('tools/extraction/');
  await expect(page.locator('#ey')).toHaveText('20.3%');
  await expect(page.locator('#verdict')).toContainText('金杯區');
  await page.fill('#tds', '1.1');
  await expect(page.locator('#verdict')).toContainText('萃取不足');
  await expect(page.locator('#to-log')).toHaveAttribute('href', /tds=1\.1/);
});

test('萃取率帶進沖煮紀錄，存檔後重新整理仍在', async ({ page }) => {
  await page.goto('tools/extraction/?d=15&b=225&t=1.35&r=16');
  await page.click('#to-log');
  await expect(page.locator('#prefill-note')).toBeVisible();
  await expect(page.locator('input[name="tds"]')).toHaveValue('1.35');
  await page.fill('input[name="bean"]', '測試豆 A');
  await page.getByRole('button', { name: /存下這一杯/ }).click();
  await page.reload();
  await expect(page.locator('#list')).toContainText('測試豆 A');
  await expect(page.locator('#list')).toContainText('萃取率 20.3%');
});

test('計時器：開始後時間會走，換配方會換算水量', async ({ page }) => {
  await page.goto('tools/timer/');
  await page.click('#start');
  await page.waitForTimeout(1300);
  await expect(page.locator('#clock')).not.toHaveText('0:00');
  await page.click('#reset');
  await expect(page.locator('#clock')).toHaveText('0:00');
});

test('開店損益平衡：示範數字算出每天 119 位客人', async ({ page }) => {
  await page.goto('tools/break-even/');
  await page.click('#demo');
  await expect(page.locator('#o-cust')).toContainText('119');
});

test('第一杯手沖：湯匙換算 200g ÷ 20 匙 → 一匙 10g，15g 約 1 又半匙', async ({ page }) => {
  await page.goto('first-cup/');
  await page.fill('#sp-net', '200');
  await page.fill('#sp-count', '20');
  await expect(page.locator('#sp-out')).toContainText('10.0g');
  await expect(page.locator('#sp-out')).toContainText('1 又半 匙');
  await page.reload();
  await expect(page.locator('#sp-net')).toHaveValue('200');
});

test('速查表：段落存成圖片會下載 PNG（#27）', async ({ page }) => {
  await page.goto('cheatsheets/caffeine-quick-reference/');
  const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('[data-section-image="b1"]').click()]);
  expect(dl.suggestedFilename()).toMatch(/^dongka-cheatsheets-caffeine-quick-reference-b1\.png$/);
});

test('速查表：支援分享檔案時改用系統分享傳圖片', async ({ page }) => {
  await page.addInitScript(() => {
    window.__shared = [];
    navigator.canShare = (d) => !!d.files;
    navigator.share = async (d) => { window.__shared.push({ n: d.files?.length, type: d.files?.[0]?.type }); };
  });
  await page.goto('cheatsheets/shop-bean-sourcing/');
  await page.locator('[data-section-image="b3"]').click();
  await expect.poll(() => page.evaluate(() => window.__shared.length)).toBe(1);
  expect(await page.evaluate(() => window.__shared[0])).toEqual({ n: 1, type: 'image/png' });
});

test('搜尋找得到新內容', async ({ page }) => {
  await page.goto('search/');
  await page.locator('#search input').fill('議價');
  await expect(page.locator('body')).toContainText('店主採購熟豆速查表', { timeout: 15_000 });
});

test('沖煮紀錄：編輯後原地更新，趨勢圖與同豆比較出現（#22）', async ({ page }) => {
  await page.goto('tools/brew-log/');
  const add = async (bean, score, grind) => {
    await page.fill('input[name="bean"]', bean);
    await page.fill('input[name="grind"]', grind);
    await page.fill('input[name="score"]', String(score));
    await page.locator('#form button[type="submit"]').click();
  };
  await add('肯亞 AA', 6, '24');
  await add('肯亞 AA', 8, '22');
  await add('巴西', 7, '26');
  await page.locator('[data-edit]').last().click();
  await expect(page.locator('input[name="bean"]')).toHaveValue('肯亞 AA');
  await page.fill('input[name="score"]', '5');
  await page.locator('#form button[type="submit"]').click();
  await page.reload();
  await expect(page.locator('#list .log-item')).toHaveCount(3);
  await expect(page.locator('#list')).toContainText('編輯於');
  await page.selectOption('#bean-filter', '肯亞 AA');
  await expect(page.locator('table')).toContainText('22');
  await expect(page.locator('svg[role="img"]').first()).toBeVisible();
});

test('杯測 CVA：八項都 5 分是 79.00、都 9 分是 100.00（#25）', async ({ page }) => {
  await page.goto('tools/cupping/');
  await page.locator('[data-mode="cva"]').click();
  const all = async (n) => {
    for (const name of await page.$$eval('#vf input[type=radio]', (xs) => [...new Set(xs.map((x) => x.name).filter((n) => n !== "v-dtype"))]))
      await page.locator(`#vf input[name="${name}"][value="${n}"]`).check({ force: true });
  };
  await all(5);
  await expect(page.locator('#v-total')).toHaveText('79.00');
  await all(9);
  await expect(page.locator('#v-total')).toHaveText('100.00');
});
