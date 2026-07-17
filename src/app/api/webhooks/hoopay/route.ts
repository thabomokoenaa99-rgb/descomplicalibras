import { NextRequest, NextResponse } from "next/server";
import {
  extractOrderId,
  extractPaymentStatus,
  isWebhookReplay,
  verifyWebhookRequest,
} from "@/lib/security/webhook";
import { safeLog } from "@/lib/security/log";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  if (!verifyWebhookRequest(req, rawBody)) {
    safeLog("[hoopay webhook] rejected: invalid auth");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = rawBody ? JSON.parse(rawBody) : {};
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (isWebhookReplay(payload)) {
    safeLog("[hoopay webhook] rejected: replay");
    return NextResponse.json({ error: "Stale webhook" }, { status: 400 });
  }

  const orderId = extractOrderId(payload);
  const status = extractPaymentStatus(payload);

  safeLog("[hoopay webhook] accepted", {
    orderId,
    status,
    event: typeof payload === "object" && payload && "event" in payload ? (payload as { event?: string }).event : undefined,
  });

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
