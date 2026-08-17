import { NextResponse } from "next/server";

type ContactRequest = {
  name?: unknown;
  email?: unknown;
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
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const projectType = typeof body.projectType === "string" ? body.projectType.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || !projectType || message.length < 20) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 422 });
  }

  console.info("[contact]", { name, email, company, projectType, message });
  return NextResponse.json({ ok: true });
}
