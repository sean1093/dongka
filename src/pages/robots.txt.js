// 注意：robots.txt 只有放在網域根目錄才有效。在 username.github.io/repo/ 這種專案網址下，
// 搜尋引擎不會讀到這個檔案；換成自訂網域（網站在根目錄）後才會生效。
export function GET({ site: origin }) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const root = `${(origin?.origin || '').replace(/\/$/, '')}${base}`;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${root}/sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
