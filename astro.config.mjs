import { defineConfig } from 'astro/config';

// GitHub Pages：部署時由 workflow 帶入 SITE_ORIGIN 與 BASE_PATH（依 repo 名稱自動決定），
// 所以 repo 改名或換成自訂網域都不用改這裡。本機開發用下面的預設值。
export default defineConfig({
  site: process.env.SITE_ORIGIN || 'https://sean1093.github.io',
  base: process.env.BASE_PATH || '/dongka',
  trailingSlash: 'always',
});
