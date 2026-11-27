// 端對端測試（#28）：先 `BASE_PATH=/dongka npm run build`，再 `npm run test:e2e`。
// 測的是建置後的 dist，用 astro preview 提供，網址前綴與 GitHub Pages 一樣是 /dongka。
import { defineConfig, devices } from '@playwright/test';

const PORT = 4329;
export default defineConfig({
  testDir: 'e2e',
  timeout: 60_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}/dongka/`,
    trace: 'off',
    locale: 'zh-TW',
    timezoneId: 'Asia/Taipei',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] }, testIgnore: /mobile\.spec/ },
    { name: 'mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true }, testMatch: /mobile\.spec/ },
  ],
  webServer: {
    command: `node e2e/serve.mjs ${PORT}`,
    url: `http://localhost:${PORT}/dongka/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
