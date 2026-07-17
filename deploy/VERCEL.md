# Deploy na Vercel (recomendado)

Sem API token, sem Wrangler, sem VPS. Next.js roda nativo.

| Item | Valor |
|------|--------|
| Repo | https://github.com/thabomokoenaa99-rgb/descomplicalibras |
| Domínio | descomplicalibras.shop |
| Custo | Plano gratuito (Hobby) |

---

## Passo 1 — Importar no Vercel (2 min)

1. Acesse https://vercel.com e faça login com **GitHub**
2. **Add New → Project**
3. Importe o repo `thabomokoenaa99-rgb/descomplicalibras`
4. Deixe tudo padrão:
   - Framework: **Next.js** (detecta sozinho)
   - Build: `next build`
   - Root: `./`
5. **Environment Variables** — adicione:

| Nome | Valor |
|------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://descomplicalibras.shop` |
| `HOOPAY_CLIENT_ID` | *(seu ID)* |
| `HOOPAY_CLIENT_SECRET` | *(seu secret)* |
| `HOOPAY_WEBHOOK_SECRET` | Token aleatório (`openssl rand -hex 32`) |
| `HOOPAY_API_URL` | `https://api.pay.hoopay.com.br` |
| `UPSTASH_REDIS_REST_URL` | *(opcional, rate limit)* |
| `UPSTASH_REDIS_REST_TOKEN` | *(opcional, rate limit)* |

6. Clique **Deploy**

Pronto. Em ~2 min você ganha uma URL tipo `descomplicalibras.vercel.app`.

---

## Passo 2 — Domínio customizado

No projeto Vercel → **Settings → Domains**:

1. Adicione `descomplicalibras.shop`
2. Adicione `www.descomplicalibras.shop`

A Vercel mostra os registros DNS necessários.

---

## Passo 3 — DNS na Cloudflare

No painel Cloudflare do domínio → **DNS → Records**:

**Remova** o registro A antigo (`185.115.161.45`).

**Adicione** o que a Vercel pedir. Geralmente:

| Tipo | Nome | Conteúdo | Proxy |
|------|------|----------|-------|
| CNAME | `@` | `cname.vercel-dns.com` | DNS only (cinza) |
| CNAME | `www` | `cname.vercel-dns.com` | DNS only (cinza) |

> Use **DNS only (cinza)** na Cloudflare quando a Vercel pedir — evita conflito de SSL.

**SSL/TLS** na Cloudflare → **Full** ou **Full (strict)**.

Aguarde 5–15 min. Teste: https://descomplicalibras.shop

---

## Passo 4 — Fluxo daqui pra frente

```
Edita código → git push → Vercel deploya sozinho
```

Não precisa zip, RDP, XAMPP, API token, nem GitHub Actions.

---

## Webhook Hoopay

```
https://descomplicalibras.shop/api/webhooks/hoopay
```

---

## Se der erro no deploy

- Confira se `HOOPAY_CLIENT_ID` e `HOOPAY_CLIENT_SECRET` estão nas env vars
- Logs: Vercel → Project → **Deployments** → clique no deploy → **Building / Functions**
