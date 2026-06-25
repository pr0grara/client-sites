// POST /api/lead — validate, store in D1, fire an email alert to Auguste.
// Same infra pattern as the arabuilds contractor intake (D1 + Resend, best-effort email).
import { json } from '../_lib.js';

const FIELDS = ['name', 'email', 'phone', 'intent', 'message', 'source', 'address'];
const norm = (v) => (v == null ? '' : String(v)).trim();

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try { body = await request.json(); } catch { return json({ success: false, message: 'Invalid request' }, 400); }

  // Honeypot — silently accept, store nothing.
  if (body.botcheck) return json({ success: true });

  if (!norm(body.name)) return json({ success: false, message: 'Please add your name.' }, 400);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(norm(body.email))) {
    return json({ success: false, message: 'Please enter a valid email.' }, 400);
  }

  const now = new Date().toISOString();

  if (env.DB) {
    try {
      await env.DB.prepare(
        `INSERT INTO leads (created_at, name, email, phone, intent, message, source, address, data)
         VALUES (?,?,?,?,?,?,?,?,?)`
      ).bind(
        now, norm(body.name), norm(body.email), norm(body.phone), norm(body.intent),
        norm(body.message), norm(body.source) || 'site', norm(body.address), JSON.stringify(body)
      ).run();
    } catch {
      // Don't lose the lead if storage hiccups — the email alert below is the safety net.
    }
  }

  context.waitUntil(sendAlert(env, body).catch(() => {}));
  return json({ success: true });
}

async function sendAlert(env, body) {
  if (!env.RESEND_API_KEY || !env.ALERT_TO) return;
  const lines = ['NEW LEAD — auguste-realtor.com', ''];
  for (const f of FIELDS) { if (norm(body[f])) lines.push(`${f}: ${norm(body[f])}`); }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.ALERT_FROM || 'Auguste Realtor <onboarding@resend.dev>',
      to: [env.ALERT_TO],
      reply_to: norm(body.email) || undefined,
      subject: `New lead — ${norm(body.intent) || norm(body.source) || 'website'} — ${norm(body.name) || 'unknown'}`,
      text: lines.join('\n')
    })
  });
  if (!res.ok) throw new Error('Resend ' + res.status);
}
