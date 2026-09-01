import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/server/admin-auth";
import {
  createNfcCard,
  listNfcCards,
} from "@/lib/server/nfc";
import {
  DatabaseConfigurationError,
  isSameOrigin,
} from "@/lib/server/leads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOrigin(request) || !(await hasAdminSession())) {
    return NextResponse.json({ error: "Yetkisiz işlem." }, { status: 401 });
  }

  try {
    const id = await createNfcCard();
    const cards = await listNfcCards();
    const card = cards.find((item) => item.id === id);
    return card
      ? NextResponse.json({ card }, { status: 201 })
      : NextResponse.json({ error: "Kart oluşturulamadı." }, { status: 500 });
  } catch (error) {
    if (error instanceof DatabaseConfigurationError) {
      return NextResponse.json(
        { error: "Veritabanı yapılandırılmadı." },
        { status: 503 },
      );
    }
    console.error("[admin] nfc create failed", error);
    return NextResponse.json({ error: "Kart oluşturulamadı." }, { status: 500 });
  }
}
