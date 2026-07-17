export function publicPaymentError(): string {
  return "Não foi possível processar o pagamento. Verifique os dados e tente novamente.";
}

export function publicGatewayError(): string {
  return "Falha de comunicação com o gateway de pagamento. Tente novamente em instantes.";
}

export function extractGatewayError(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const record = data as Record<string, unknown>;
  const payment = record.payment as Record<string, unknown> | undefined;
  const charges = payment?.charges as Array<Record<string, unknown>> | undefined;
  const chargeErrors = charges?.[0]?.errorMessages;
  if (Array.isArray(chargeErrors) && typeof chargeErrors[0] === "string") return chargeErrors[0];
  const errors = record.errors as Array<Record<string, unknown>> | undefined;
  if (typeof errors?.[0]?.message === "string") return errors[0].message;
  if (typeof payment?.message === "string") return payment.message;
  return null;
}
