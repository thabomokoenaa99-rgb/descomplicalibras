import { NextRequest, NextResponse } from "next/server";
import { HOOPAY_API_URL, hoopayAuthHeader } from "@/lib/hoopay";
import { extractHoopayPaymentStatus } from "@/lib/payment-status";
import { enforceStatusRateLimit } from "@/lib/security/rate-limit";
import { safeLog } from "@/lib/security/log";

export async function GET(req: NextRequest) {
  const rateLimited = await enforceStatusRateLimit(req);
  if (rateLimited) return rateLimited;

  const order = req.nextUrl.searchParams.get("order");
  if (!order || !/^[0-9a-f-]{36}$/i.test(order)) {
    return NextResponse.json({ error: "Pedido inválido" }, { status: 400 });
  }

  try {
    const res = await fetch(`${HOOPAY_API_URL}/pix/consult/${order}`, {
      headers: { Authorization: hoopayAuthHeader() },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ status: "pending" });
    }

    const data = await res.json();
    const status = extractHoopayPaymentStatus(data);

    return NextResponse.json(
      { status },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (err) {
    safeLog("[checkout status] error", {
      order,
      message: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json({ status: "pending" });
  }
}
