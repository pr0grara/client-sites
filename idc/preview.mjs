// Local preview server for the IDC careers spec — no wrangler/workerd needed.
// The page handlers are pure (context) → Response, so a plain Node http server
// can render them. Lets you SEE the multi-page clone + role pages before deploying.
//
//   nvm use 22 && node preview.mjs   →  http://localhost:8788
//
// (Dev-only. The real app runs on Cloudflare Pages Functions — see README.)
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { onRequestGet as landing } from './functions/index.js';
import { onRequestGet as services } from './functions/our-services.js';
import { onRequestGet as projects } from './functions/our-projects/index.js';
import { onRequestGet as projectPage } from './functions/our-projects/[project].js';
import { onRequestGet as about } from './functions/about.js';
import { onRequestGet as contact } from './functions/contact.js';
import { onRequestGet as careers } from './functions/careers/index.js';
import { onRequestGet as rolePage } from './functions/careers/[role].js';
import { onRequestPost as apply } from './functions/api/apply.js';

const PORT = 8788;
const TYPES = { css: 'text/css', js: 'text/javascript', svg: 'image/svg+xml', jpg: 'image/jpeg', png: 'image/png', mp4: 'video/mp4', webp: 'image/webp' };

// Static GET pages (file-routed on Cloudflare Pages). `landing` reads ?v=bold itself.
const PAGES = {
  '/': landing,
  '/our-services': services,
  '/our-projects': projects,
  '/about': about,
  '/contact': contact,
  '/careers': careers
};

const server = createServer(async (rq, rs) => {
  const url = new URL(rq.url, `http://localhost:${PORT}`);
  const path = url.pathname.replace(/\/$/, '') || '/';
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
    // role + project detail pages
    const m = path.match(/^\/careers\/([^/]+)$/);
    const mp = path.match(/^\/our-projects\/([^/]+)$/);
    let out;
    if (m) out = await rolePage({ params: { role: decodeURIComponent(m[1]) } });
    else if (mp) out = await projectPage({ params: { project: decodeURIComponent(mp[1]) } });
    else if (PAGES[path]) out = await PAGES[path]({ request: { url: url.href } });
    else { rs.writeHead(404); return rs.end('Not found'); }
    rs.writeHead(out.status, { 'Content-Type': 'text/html; charset=utf-8' });
    rs.end(await out.text());
  } catch (e) {
    rs.writeHead(500, { 'Content-Type': 'text/plain' });
    rs.end('Render error:\n' + (e && e.stack || e));
  }
});

server.listen(PORT, () => {
  console.log(`\n  IDC preview → http://localhost:${PORT}`);
  console.log('  Pages: /  /our-services  /our-projects  /about  /contact  /careers');
  console.log(`  Bold one-pager: http://localhost:${PORT}/?v=bold`);
  console.log(`  A role page:    http://localhost:${PORT}/careers/bridge-structural-engineer-pe\n`);
});
