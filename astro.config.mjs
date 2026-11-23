import { defineConfig } from 'astro/config';

// GitHub Pages：https://sean1093.github.io/seed-to-cup/
// 若改用自訂網域，把 site 換成網域、base 改成 '/'。
export default defineConfig({
  site: 'https://sean1093.github.io',
  base: '/seed-to-cup',
  trailingSlash: 'always',
});
