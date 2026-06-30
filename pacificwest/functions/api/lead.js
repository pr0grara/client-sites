// POST /api/lead — validate, store in D1, fire an email alert.
// Same infra pattern as the auguste site (D1 + Resend, best-effort email). For a contractor
// the phone is the key contact, so we require name + phone; email is optional but validated
// if present.
import { json } from '../_lib.js';

const FIELDS = ['name', 'phone', 'email', 'town', 'project', 'message', 'source'];
const norm = (v) => (v == null ? '' : String(v)).trim();

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try { body = await request.json(); } catch { return json({ success: false, message: 'Invalid request' }, 400); }

  // Honeypot — silently accept, store nothing.
  if (body.botcheck) return json({ success: true });

  if (!norm(body.name)) return json({ success: false, message: 'Please add your name.' }, 400);
  if (!norm(body.phone)) return json({ success: false, message: 'Please add a phone number so we can reach you.' }, 400);
  if (norm(body.email) && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(norm(body.email))) {
    return json({ success: false, message: 'That email doesn’t look right — leave it blank or fix it.' }, 400);
  }

  const now = new Date().toISOString();

  if (env.DB) {
    try {
      await env.DB.prepare(
        `INSERT INTO leads (created_at, name, phone, email, town, project, message, source, data)
         VALUES (?,?,?,?,?,?,?,?,?)`
      ).bind(
        now, norm(body.name), norm(body.phone), norm(body.email), norm(body.town),
        norm(body.project), norm(body.message), norm(body.source) || 'site', JSON.stringify(body)
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
  const lines = ['NEW QUOTE REQUEST — Pacific West Concrete', ''];
  for (const f of FIELDS) { if (norm(body[f])) lines.push(`${f}: ${norm(body[f])}`); }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.ALERT_FROM || 'Pacific West Concrete <onboarding@resend.dev>',
      to: [env.ALERT_TO],
      reply_to: norm(body.email) || undefined,
      subject: `New quote request — ${norm(body.name) || 'unknown'}${norm(body.town) ? ' · ' + norm(body.town) : ''}`,
      text: lines.join('\n')
    })
  });
  if (!res.ok) throw new Error('Resend ' + res.status);
}
