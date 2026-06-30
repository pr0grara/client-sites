// Shared password gate for Pili's private area (the dashboard + the study guide).
// One cookie, one password, scoped to the whole site so a single login covers both.
// Password comes from the DASH_PASS secret; the 'rebar' fallback lets it work on first
// deploy (the proposal password Pili already knows) — set the secret and rotate.

export const COOKIE = 'pwc_dash=1';

export function resolvePassword(env) {
  return (env.DASH_PASS || 'rebar').toLowerCase();
}

export function isAuthed(request) {
  const cookie = request.headers.get('Cookie') || '';
  return cookie.split(/;\s*/).indexOf(COOKIE) !== -1;
}

export function pwMatches(input, env) {
  return String(input || '').trim().toLowerCase() === resolvePassword(env);
}

// Site-wide (Path=/) so the dashboard and /guide/* share the same session.
export const setCookieHeader = COOKIE + '; Path=/; Max-Age=2592000; HttpOnly; SameSite=Lax; Secure';
export const clearCookieHeader = 'pwc_dash=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure';
