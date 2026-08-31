import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  adminCookieOptions,
  createAdminSessionToken,
  verifyAdminPassword,
} from "@/lib/server/admin-auth";
import {
  clearLoginAttempts,
  DatabaseConfigurationError,
  isSameOrigin,
  registerLoginAttempt,
  requestFingerprint,
} from "@/lib/server/leads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Geçersiz istek kaynağı." }, { status: 403 });
  }

  try {
    const payload = (await request.json()) as {
      username?: unknown;
      password?: unknown;
    };
    const username = typeof payload.username === "string" ? payload.username.trim() : "";
    const password = typeof payload.password === "string" ? payload.password : "";
    if (!username || username.length > 80 || password.length > 256) {
      return NextResponse.json({ error: "Giriş bilgilerini kontrol edin." }, { status: 422 });
    }

    const fingerprint = requestFingerprint(request);
    const attempts = await registerLoginAttempt(fingerprint);
    if (attempts > 8) {
      return NextResponse.json(
        { error: "Çok fazla deneme yapıldı. 15 dakika sonra yeniden deneyin." },
        { status: 429 },
      );
    }

    if (!verifyAdminPassword(username, password)) {
      return NextResponse.json({ error: "Kullanıcı adı veya parola hatalı." }, { status: 401 });
    }

    await clearLoginAttempts(fingerprint);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(
      ADMIN_COOKIE_NAME,
      createAdminSessionToken(username),
      adminCookieOptions,
    );
    return response;
  } catch (error) {
    if (error instanceof DatabaseConfigurationError) {
      return NextResponse.json({ error: "Yönetim paneli henüz yapılandırılmadı." }, { status: 503 });
    }
    console.error("[admin] login failed", error);
    return NextResponse.json({ error: "Giriş işlemi tamamlanamadı." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Geçersiz istek kaynağı." }, { status: 403 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    ...adminCookieOptions,
    maxAge: 0,
  });
  return response;
}
