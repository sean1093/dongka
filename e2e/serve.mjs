// 測試用的靜態伺服器：把 dist 掛在 /dongka 底下，和 GitHub Pages 一樣
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';

const root = new URL('../dist/', import.meta.url).pathname;
const port = +process.argv[2] || 4329;
const base = '/dongka';
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.wasm': 'application/wasm', '.pf_meta': 'application/octet-stream' };

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (!path.startsWith(base)) { res.writeHead(404).end(); return; }
  let file = join(root, normalize(path.slice(base.length)).replace(/^(\.\.[/\\])+/, ''));
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' }).end(body);
  } catch {
    const body = await readFile(join(root, '404.html')).catch(() => 'Not found');
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' }).end(body);
  }
}).listen(port, () => console.log(`serving dist at http://localhost:${port}${base}/`));
