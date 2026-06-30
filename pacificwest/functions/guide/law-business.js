// GET/POST /guide/law-business — the branded Law & Business study guide, gated behind
// Pili's dashboard password (the same one that opens /dashboard). `?s=<sectionId>`
// selects a section; no `?s` shows the table of contents.
//
// Content + renderer are vendored from _shared/guides via `npm run sync` (the underscore
// files below). The route just handles auth + brand and hands off to renderGuide().
import { BRAND } from '../_data.js';
import { LAW_BUSINESS_GUIDE } from './_law-business-data.js';
import { renderGuide, renderGate } from './_guide.js';
import { isAuthed, pwMatches, setCookieHeader } from '../_auth.js';

const BASE = '/guide/law-business';
const htmlRes = (body, status = 200, extra) =>
  new Response(body, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', ...(extra || {}) } });

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'POST') {
    const form = await request.formData().catch(() => null);
    if (form && pwMatches(form.get('pw'), env)) {
      return new Response(null, { status: 303, headers: { Location: BASE, 'Set-Cookie': setCookieHeader } });
    }
    return htmlRes(renderGate(BRAND, { error: true, action: BASE }), 401);
  }

  const url = new URL(request.url);
  const qpw = url.searchParams.get('pw');
  let authed = isAuthed(request);
  let setCookie = null;
  if (!authed && qpw && pwMatches(qpw, env)) { authed = true; setCookie = setCookieHeader; }
  if (!authed) return htmlRes(renderGate(BRAND, { error: false, action: BASE }));

  const section = url.searchParams.get('s') || '';
  const res = htmlRes(renderGuide(BRAND, LAW_BUSINESS_GUIDE, { section, basePath: BASE }));
  if (setCookie) res.headers.append('Set-Cookie', setCookie);
  return res;
}
