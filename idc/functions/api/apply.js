// POST /api/apply — validate a job application, store in D1, email careers@.
// Same infra as the client-sites lead intake (D1 + Resend, best-effort email),
// repurposed for applications: `intent` = role applied for, `address` = portfolio/LinkedIn.
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
        `INSERT INTO applications (created_at, name, email, phone, role, message, source, portfolio, data)
         VALUES (?,?,?,?,?,?,?,?,?)`
      ).bind(
        now, norm(body.name), norm(body.email), norm(body.phone), norm(body.intent),
        norm(body.message), norm(body.source) || 'careers', norm(body.address), JSON.stringify(body)
      ).run();
    } catch {
      // Don't lose the application if storage hiccups — the email alert is the safety net.
    }
  }

  context.waitUntil(sendAlert(env, body).catch(() => {}));
  return json({ success: true });
}

async function sendAlert(env, body) {
  if (!env.RESEND_API_KEY || !env.ALERT_TO) return;
  const role = norm(body.intent) || 'General application';
  const lines = ['NEW APPLICATION — careers.idcengineers.com', '', `Role: ${role}`, ''];
  for (const f of FIELDS) { if (f !== 'intent' && norm(body[f])) lines.push(`${f}: ${norm(body[f])}`); }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.ALERT_FROM || 'IDC Careers <onboarding@resend.dev>',
      to: [env.ALERT_TO],
      reply_to: norm(body.email) || undefined,
      subject: `New application — ${role} — ${norm(body.name) || 'unknown'}`,
      text: lines.join('\n')
    })
  });
  if (!res.ok) throw new Error('Resend ' + res.status);
}
