export const KVKK_NOTICE_VERSION = "KVKK-2026-08-31";

export const CONSENT_SCOPES = {
  contact: "contact_request_processing",
  launch: "launch_notification",
} as const;

export type ConsentScope =
  (typeof CONSENT_SCOPES)[keyof typeof CONSENT_SCOPES];
