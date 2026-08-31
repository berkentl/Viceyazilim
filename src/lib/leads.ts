export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "won",
  "archived",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type LeadKind = "contact" | "notify";

export type Lead = {
  id: string;
  kind: LeadKind;
  source: string;
  name: string | null;
  email: string;
  phone: string | null;
  company: string | null;
  project_type: string | null;
  message: string | null;
  consent_scope: string;
  consent_version: string;
  consented_at: string;
  status: LeadStatus;
  notes: string;
  created_at: string;
  updated_at: string;
};
