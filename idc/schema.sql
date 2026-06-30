-- D1 schema for careers.idcengineers.com application capture.
-- Apply with:  npx wrangler d1 execute idc-applications --file=./schema.sql --remote
CREATE TABLE IF NOT EXISTS applications (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at  TEXT NOT NULL,     -- ISO 8601 UTC
  name        TEXT,
  email       TEXT,
  phone       TEXT,
  role        TEXT,              -- role applied for (or General)
  message     TEXT,              -- their pitch / experience
  source      TEXT,              -- careers-apply / role:<slug>
  portfolio   TEXT,              -- portfolio or LinkedIn URL
  data        TEXT NOT NULL      -- full submission as JSON
);

CREATE INDEX IF NOT EXISTS idx_apps_created ON applications (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_apps_role    ON applications (role);
