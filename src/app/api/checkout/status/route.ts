import { NextRequest, NextResponse } from "next/server";
import { HOOPAY_API_URL, hoopayAuthHeader } from "@/lib/hoopay";

export async function GET(req: NextRequest) {
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
    const status =
      data?.status ?? data?.payment?.status ?? data?.charge?.status ?? "pending";

    return NextResponse.json({ status });
  } catch {
    return NextResponse.json({ status: "pending" });
  }
}
