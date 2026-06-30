// Local preview server for the IDC careers spec — no wrangler/workerd needed.
// The page handlers are pure (context) → Response, so a plain Node http server
// can render them. Lets you SEE both hero variants + role pages before deploying.
//
//   nvm use 22 && node preview.mjs   →  http://localhost:8788
//
// (Dev-only. The real app runs on Cloudflare Pages Functions — see README.)
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { onRequestGet as landing } from './functions/index.js';
import { onRequestGet as rolePage } from './functions/careers/[role].js';
import { onRequestPost as apply } from './functions/api/apply.js';

const PORT = 8788;
const TYPES = { css: 'text/css', js: 'text/javascript', svg: 'image/svg+xml', jpg: 'image/jpeg', png: 'image/png', mp4: 'video/mp4', webp: 'image/webp' };

const server = createServer(async (rq, rs) => {
  const url = new URL(rq.url, `http://localhost:${PORT}`);
  const path = url.pathname;
  try {
    // static assets
    if (path.startsWith('/assets/')) {
      const buf = await readFile(new URL('.' + path, import.meta.url));
      const ext = path.split('.').pop();
      rs.writeHead(200, { 'Content-Type': TYPES[ext] || 'application/octet-stream' });
      return rs.end(buf);
    }
    // POST /api/apply
    if (path === '/api/apply' && rq.method === 'POST') {
      const body = await new Promise((res) => { let d = ''; rq.on('data', (c) => (d += c)); rq.on('end', () => res(d)); });
      const ctx = { request: { json: async () => JSON.parse(body || '{}') }, env: {}, waitUntil() {} };
      const out = await apply(ctx);
      rs.writeHead(out.status, { 'Content-Type': 'application/json' });
      return rs.end(await out.text());
    }
    // role pages
    const m = path.match(/^\/careers\/([^/]+)\/?$/);
    let out;
    if (m) out = await rolePage({ params: { role: decodeURIComponent(m[1]) } });
    else if (path === '/' || path === '') out = await landing({ request: { url: url.href } });
    else { rs.writeHead(404); return rs.end('Not found'); }
    rs.writeHead(out.status, { 'Content-Type': 'text/html; charset=utf-8' });
    rs.end(await out.text());
  } catch (e) {
    rs.writeHead(500, { 'Content-Type': 'text/plain' });
    rs.end('Render error:\n' + (e && e.stack || e));
  }
});

server.listen(PORT, () => {
  console.log(`\n  IDC careers preview → http://localhost:${PORT}`);
  console.log(`  variant A (match+elevate): http://localhost:${PORT}/`);
  console.log(`  variant B (bold):          http://localhost:${PORT}/?v=bold`);
  console.log(`  a role page:               http://localhost:${PORT}/careers/bridge-structural-engineer-pe\n`);
});
