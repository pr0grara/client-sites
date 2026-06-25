-- D1 schema for auguste-realtor.com lead capture.
-- Apply with:  npx wrangler d1 execute auguste-leads --file=./schema.sql --remote
CREATE TABLE IF NOT EXISTS leads (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at  TEXT NOT NULL,     -- ISO 8601 UTC
  name        TEXT,
  email       TEXT,
  phone       TEXT,
  intent      TEXT,              -- selling / buying / valuation / renting / question
  message     TEXT,
  source      TEXT,              -- homepage-contact / home-value / city page / etc.
  address     TEXT,              -- property address (valuation requests)
  data        TEXT NOT NULL      -- full submission as JSON
);

CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_source  ON leads (source);
