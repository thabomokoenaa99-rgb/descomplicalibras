import { NextRequest, NextResponse } from "next/server";

/**
 * Webhook Hoopay — recebe confirmação de pagamento.
 * Por enquanto só registra e responde 200 (obrigatório para o charge não falhar).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[hoopay webhook]", JSON.stringify(body));
  } catch {
    // ignore malformed payloads
  }
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
