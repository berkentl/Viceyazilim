import { NextResponse } from "next/server";

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  projectType?: unknown;
  message?: unknown;
};

export async function POST(request: Request) {
  let body: ContactRequest;

  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const projectType = typeof body.projectType === "string" ? body.projectType.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  const hasInvalidPhone = phone.length > 0 && phone.replace(/\D/g, "").length < 10;

  if (
    name.length < 2 ||
    name.length > 80 ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    email.length > 160 ||
    hasInvalidPhone ||
    phone.length > 40 ||
    !projectType ||
    projectType.length > 80 ||
    message.length < 20 ||
    message.length > 3000
  ) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 422 });
  }

  console.info("[contact]", { name, email, phone, company, projectType, message });
  return NextResponse.json({ ok: true });
}
