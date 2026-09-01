CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS nfc_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stock_code text UNIQUE NOT NULL
    CHECK (stock_code ~ '^V[0-9]{3,}$'),
  public_code text UNIQUE NOT NULL
    CHECK (public_code ~ '^[A-Z0-9]{12}$'),
  business_name text,
  google_review_url text,
  contact_name text,
  contact_email text,
  contact_phone text,
  status text NOT NULL DEFAULT 'inventory'
    CHECK (status IN ('inventory', 'active', 'paused', 'retired')),
  notes text NOT NULL DEFAULT '',
  scan_count bigint NOT NULL DEFAULT 0 CHECK (scan_count >= 0),
  last_scanned_at timestamptz,
  activated_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT active_nfc_card_has_target CHECK (
    status <> 'active'
    OR (business_name IS NOT NULL AND google_review_url IS NOT NULL)
  )
);

CREATE INDEX IF NOT EXISTS nfc_cards_status_idx
  ON nfc_cards (status, stock_code);
CREATE INDEX IF NOT EXISTS nfc_cards_business_name_idx
  ON nfc_cards (business_name);

CREATE TABLE IF NOT EXISTS nfc_daily_scans (
  card_id uuid NOT NULL REFERENCES nfc_cards(id) ON DELETE CASCADE,
  scan_date date NOT NULL,
  scan_count bigint NOT NULL DEFAULT 0 CHECK (scan_count >= 0),
  PRIMARY KEY (card_id, scan_date)
);

CREATE INDEX IF NOT EXISTS nfc_daily_scans_date_idx
  ON nfc_daily_scans (scan_date DESC);

INSERT INTO nfc_cards (stock_code, public_code)
SELECT
  'V' || lpad(series.value::text, 3, '0'),
  upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12))
FROM generate_series(1, 100) AS series(value)
ON CONFLICT DO NOTHING;

REVOKE ALL ON nfc_cards FROM PUBLIC;
REVOKE ALL ON nfc_daily_scans FROM PUBLIC;
