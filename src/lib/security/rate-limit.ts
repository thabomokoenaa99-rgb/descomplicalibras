import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

type RateLimitResult = {
  ok: boolean;
  retryAfter?: number;
};

type MemoryBucket = { count: number; reset: number };

declare global {
  var __rateLimitBuckets: Map<string, MemoryBucket> | undefined;
}

const memoryBuckets = globalThis.__rateLimitBuckets ?? new Map<string, MemoryBucket>();
globalThis.__rateLimitBuckets = memoryBuckets;

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "127.0.0.1"
  );
}

function memoryRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const bucket = memoryBuckets.get(key);

  if (!bucket || now > bucket.reset) {
    memoryBuckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true };
  }

  if (bucket.count >= limit) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((bucket.reset - now) / 1000)) };
  }

  bucket.count += 1;
  return { ok: true };
}

let checkoutLimiter: Ratelimit | null | undefined;
let statusLimiter: Ratelimit | null | undefined;

function getUpstashLimiter(kind: "checkout" | "status"): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const redis = new Redis({ url, token });
  if (kind === "checkout") {
    checkoutLimiter ??= new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(8, "1 m"),
      prefix: "rl:checkout",
    });
    return checkoutLimiter;
  }

  statusLimiter ??= new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, "1 m"),
    prefix: "rl:status",
  });
  return statusLimiter;
}

async function applyRateLimit(
  req: NextRequest,
  kind: "checkout" | "status",
  memoryLimit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const ip = getClientIp(req);
  const key = `${kind}:${ip}`;

  const upstash = getUpstashLimiter(kind);
  if (upstash) {
    const result = await upstash.limit(key);
    if (!result.success) {
      return {
        ok: false,
        retryAfter: Math.max(1, Math.ceil((result.reset - Date.now()) / 1000)),
      };
    }
    return { ok: true };
  }

  return memoryRateLimit(key, memoryLimit, windowMs);
}

export async function enforceCheckoutRateLimit(req: NextRequest): Promise<NextResponse | null> {
  const result = await applyRateLimit(req, "checkout", 8, 60_000);
  if (result.ok) return null;

  return NextResponse.json(
    { error: "Muitas tentativas. Aguarde um momento e tente novamente." },
    {
      status: 429,
      headers: result.retryAfter ? { "Retry-After": String(result.retryAfter) } : undefined,
    },
  );
}

export async function enforceStatusRateLimit(req: NextRequest): Promise<NextResponse | null> {
  const result = await applyRateLimit(req, "status", 30, 60_000);
  if (result.ok) return null;

  return NextResponse.json(
    { error: "Limite de consultas excedido." },
    {
      status: 429,
      headers: result.retryAfter ? { "Retry-After": String(result.retryAfter) } : undefined,
    },
  );
}

export { getClientIp };
