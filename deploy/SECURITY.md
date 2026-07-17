# Segurança — checklist pós-deploy

## Variáveis obrigatórias na Vercel

| Variável | Descrição |
|----------|-----------|
| `HOOPAY_CLIENT_ID` | Credencial Hoopay |
| `HOOPAY_CLIENT_SECRET` | Credencial Hoopay |
| `HOOPAY_WEBHOOK_SECRET` | Token longo e aleatório para autenticar webhooks |
| `NEXT_PUBLIC_SITE_URL` | `https://descomplicalibras.shop` |

## Variáveis recomendadas

| Variável | Descrição |
|----------|-----------|
| `UPSTASH_REDIS_REST_URL` | Rate limit distribuído (free tier Upstash) |
| `UPSTASH_REDIS_REST_TOKEN` | Token Upstash |
| `ENABLE_CREDIT_CARD` | `false` para desativar cartão e usar só PIX |

## Gerar webhook secret

```bash
openssl rand -hex 32
```

Cole o resultado em `HOOPAY_WEBHOOK_SECRET` na Vercel.

O checkout registra automaticamente a URL:

```
https://descomplicalibras.shop/api/webhooks/hoopay?token=SEU_SECRET
```

## Rotação de credenciais (fazer agora se vazou)

1. **Hoopay** — gere novo `CLIENT_SECRET` no painel
2. **GitHub** — revogue PATs expostos em chat
3. **VPS** — se ainda existir, troque senha RDP ou desligue o servidor
4. **Vercel** — atualize env vars e redeploy

## O que foi implementado

- Webhook com token + HMAC + Bearer
- Rate limit checkout (8/min) e status (30/min)
- Security headers (CSP, HSTS, X-Frame-Options, etc.)
- Validação de CPF com dígitos verificadores
- Logs redacted (sem cartão/CPF/secrets)
- Erros genéricos ao cliente (sem vazar gateway)
- Replay protection em webhooks com timestamp
- Cache-Control no endpoint de status

## PCI / cartão

Dados de cartão ainda passam pelo servidor para a Hoopay API.
Para conformidade plena, migre para checkout hospedado/tokenizado da Hoopay
ou defina `ENABLE_CREDIT_CARD=false` e use só PIX.
