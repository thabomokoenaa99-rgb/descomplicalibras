const PAID_STATUSES = new Set([
  "paid",
  "approved",
  "completed",
  "complete",
  "confirmed",
  "success",
  "succeeded",
  "pago",
  "aprovado",
  "concluido",
  "concluído",
]);

export function isPaymentConfirmed(status: string | undefined | null): boolean {
  if (!status) return false;
  const normalized = status.toLowerCase().trim();
  if (PAID_STATUSES.has(normalized)) return true;
  return normalized.includes("paid") || normalized.includes("approved");
}

export function extractHoopayPaymentStatus(data: unknown): string {
  if (!data || typeof data !== "object") return "pending";

  const root = data as Record<string, unknown>;
  const payment = root.payment as Record<string, unknown> | undefined;
  const charge = root.charge as Record<string, unknown> | undefined;
  const charges = (payment?.charges ?? root.charges) as unknown[] | undefined;
  const firstCharge =
    Array.isArray(charges) && charges[0] && typeof charges[0] === "object"
      ? (charges[0] as Record<string, unknown>)
      : undefined;

  const candidates = [
    root.status,
    payment?.status,
    charge?.status,
    firstCharge?.status,
    (root.data as Record<string, unknown> | undefined)?.status,
  ];

  for (const value of candidates) {
    if (typeof value === "string" && value.trim()) {
      return value.toLowerCase().trim();
    }
  }

  return "pending";
}
