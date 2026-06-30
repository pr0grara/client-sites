-- D1 schema for Pacific West Concrete lead capture.
-- Apply with:  npx wrangler d1 execute pacific-west-concrete-leads --file=./schema.sql --remote
CREATE TABLE IF NOT EXISTS leads (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at  TEXT NOT NULL,     -- ISO 8601 UTC
  name        TEXT,
  phone       TEXT,
  email       TEXT,
  town        TEXT,              -- service town (Alameda / Berkeley / …)
  project     TEXT,              -- foundation / retaining wall / driveway / …
  message     TEXT,
  source      TEXT,              -- homepage-quote / etc.
  data        TEXT NOT NULL      -- full submission as JSON
);

CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_project ON leads (project);
