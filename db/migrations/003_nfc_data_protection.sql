CREATE TABLE IF NOT EXISTS nfc_card_history (
  id bigserial PRIMARY KEY,
  card_id uuid NOT NULL REFERENCES nfc_cards(id) ON DELETE RESTRICT,
  stock_code text NOT NULL,
  public_code text NOT NULL,
  business_name text,
  google_review_url text,
  contact_name text,
  contact_email text,
  contact_phone text,
  status text NOT NULL,
  notes text NOT NULL,
  activated_at timestamptz,
  previous_updated_at timestamptz NOT NULL,
  changed_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS nfc_card_history_card_changed_idx
  ON nfc_card_history (card_id, changed_at DESC);

CREATE OR REPLACE FUNCTION record_nfc_card_configuration_history()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF ROW(
    OLD.business_name,
    OLD.google_review_url,
    OLD.contact_name,
    OLD.contact_email,
    OLD.contact_phone,
    OLD.status,
    OLD.notes,
    OLD.activated_at
  ) IS DISTINCT FROM ROW(
    NEW.business_name,
    NEW.google_review_url,
    NEW.contact_name,
    NEW.contact_email,
    NEW.contact_phone,
    NEW.status,
    NEW.notes,
    NEW.activated_at
  ) THEN
    INSERT INTO nfc_card_history (
      card_id,
      stock_code,
      public_code,
      business_name,
      google_review_url,
      contact_name,
      contact_email,
      contact_phone,
      status,
      notes,
      activated_at,
      previous_updated_at
    ) VALUES (
      OLD.id,
      OLD.stock_code,
      OLD.public_code,
      OLD.business_name,
      OLD.google_review_url,
      OLD.contact_name,
      OLD.contact_email,
      OLD.contact_phone,
      OLD.status,
      OLD.notes,
      OLD.activated_at,
      OLD.updated_at
    );
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS nfc_card_configuration_history_trigger ON nfc_cards;
CREATE TRIGGER nfc_card_configuration_history_trigger
BEFORE UPDATE OF
  business_name,
  google_review_url,
  contact_name,
  contact_email,
  contact_phone,
  status,
  notes,
  activated_at
ON nfc_cards
FOR EACH ROW
EXECUTE FUNCTION record_nfc_card_configuration_history();

CREATE OR REPLACE FUNCTION prevent_nfc_card_delete()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION 'NFC kartları silinemez; kullanım dışı durumuna alınmalıdır.'
    USING ERRCODE = '55000';
END;
$$;

DROP TRIGGER IF EXISTS nfc_card_delete_protection_trigger ON nfc_cards;
CREATE TRIGGER nfc_card_delete_protection_trigger
BEFORE DELETE ON nfc_cards
FOR EACH ROW
EXECUTE FUNCTION prevent_nfc_card_delete();

REVOKE ALL ON nfc_card_history FROM PUBLIC;
