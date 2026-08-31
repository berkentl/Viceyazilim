CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS lead_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('contact', 'notify')),
  source text NOT NULL CHECK (char_length(source) BETWEEN 1 AND 160),
  name text,
  email text NOT NULL,
  phone text,
  company text,
  project_type text,
  message text,
  consent_scope text NOT NULL,
  consent_version text NOT NULL,
  consented_at timestamptz NOT NULL DEFAULT now(),
  request_fingerprint text NOT NULL,
  status text NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'qualified', 'won', 'archived')),
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS lead_submissions_created_at_idx
  ON lead_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS lead_submissions_status_idx
  ON lead_submissions (status, created_at DESC);
CREATE INDEX IF NOT EXISTS lead_submissions_fingerprint_idx
  ON lead_submissions (request_fingerprint, created_at DESC);

CREATE TABLE IF NOT EXISTS admin_login_attempts (
  fingerprint text PRIMARY KEY,
  attempts integer NOT NULL DEFAULT 1,
  window_started_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
