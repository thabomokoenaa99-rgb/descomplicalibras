import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest } from "next/server";

const SIGNATURE_HEADERS = [
  "x-hoopay-signature",
  "x-signature",
  "x-webhook-signature",
  "x-hub-signature-256",
];

function getWebhookSecret(): string | null {
  return process.env.HOOPAY_WEBHOOK_SECRET ?? process.env.HOOPAY_CLIENT_SECRET ?? null;
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function verifyHmac(rawBody: string, signature: string, secret: string): boolean {
  const normalized = signature.startsWith("sha256=") ? signature.slice(7) : signature;
  const expectedHex = createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBase64 = createHmac("sha256", secret).update(rawBody).digest("base64");

  return safeEqual(normalized, expectedHex) || safeEqual(normalized, expectedBase64);
}

export function buildWebhookCallbackUrl(siteUrl: string): string {
  const base = `${siteUrl.replace(/\/$/, "")}/api/webhooks/hoopay`;
  const secret = getWebhookSecret();
  if (!secret) return base;
  return `${base}?token=${encodeURIComponent(secret)}`;
}

export function verifyWebhookRequest(req: NextRequest, rawBody: string): boolean {
  const secret = getWebhookSecret();
  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }

  const token = req.nextUrl.searchParams.get("token");
  if (token && safeEqual(token, secret)) return true;

  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true;

  for (const header of SIGNATURE_HEADERS) {
    const signature = req.headers.get(header);
    if (signature && verifyHmac(rawBody, signature, secret)) return true;
  }

  return false;
}

export function isWebhookReplay(payload: unknown, maxAgeSeconds = 300): boolean {
  if (!payload || typeof payload !== "object") return false;
  const record = payload as Record<string, unknown>;
  const ts =
    record.timestamp ??
    record.createdAt ??
    record.created_at ??
    (record.data as Record<string, unknown> | undefined)?.timestamp;

  if (typeof ts === "number") {
    const age = Date.now() / 1000 - ts;
    return age > maxAgeSeconds;
  }
  if (typeof ts === "string") {
    const age = Date.now() - new Date(ts).getTime();
    return age > maxAgeSeconds * 1000;
  }
  return false;
}

export function extractOrderId(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  const candidates = [
    record.orderUUID,
    record.order_uuid,
    record.orderId,
    record.order_id,
    (record.data as Record<string, unknown> | undefined)?.orderUUID,
    (record.payment as Record<string, unknown> | undefined)?.orderUUID,
  ];
  for (const value of candidates) {
    if (typeof value === "string" && value.length > 0) return value;
  }
  return null;
}

export function extractPaymentStatus(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  const payment = record.payment as Record<string, unknown> | undefined;
  const data = record.data as Record<string, unknown> | undefined;
  const candidates = [record.status, payment?.status, data?.status, record.event];
  for (const value of candidates) {
    if (typeof value === "string" && value.length > 0) return value.toLowerCase();
  }
  return null;
}
