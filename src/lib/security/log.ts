const SENSITIVE_KEYS = new Set([
  "number",
  "cvv",
  "cvc",
  "card",
  "password",
  "secret",
  "document",
  "cpf",
  "authorization",
  "token",
  "pixpayload",
  "pixqrcode",
]);

function redactValue(key: string, value: unknown): unknown {
  const lower = key.toLowerCase();
  if (SENSITIVE_KEYS.has(lower) || lower.includes("secret") || lower.includes("password")) {
    return "[REDACTED]";
  }
  if (typeof value === "string" && value.includes("@")) {
    const [user, domain] = value.split("@");
    if (user && domain) return `${user.slice(0, 2)}***@${domain}`;
  }
  return value;
}

export function redactForLog(input: unknown): unknown {
  if (input == null || typeof input !== "object") return input;
  if (Array.isArray(input)) return input.map((item) => redactForLog(item));

  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (value && typeof value === "object") {
      out[key] = redactForLog(value);
    } else {
      out[key] = redactValue(key, value);
    }
  }
  return out;
}

export function safeLog(label: string, payload?: unknown) {
  if (payload === undefined) {
    console.info(label);
    return;
  }
  console.info(label, JSON.stringify(redactForLog(payload)));
}
