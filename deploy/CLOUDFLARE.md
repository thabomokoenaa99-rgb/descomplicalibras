# Deploy — GitHub + Cloudflare Workers

Deploy automático: cada `git push` na branch `main` publica o site na Cloudflare.

| Item | Valor |
|------|--------|
| Repositório | https://github.com/thabomokoenaa99-rgb/descomplicalibras |
| Domínio | descomplicalibras.shop |
| Runtime | Cloudflare Workers (OpenNext) |
| Checkout API | `/api/checkout`, `/api/webhooks/hoopay` |

---

## Passo 1 — Secrets no GitHub

No repositório: **Settings → Secrets and variables → Actions**

### Secrets (aba Secrets)

| Nome | Onde pegar |
|------|------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare → My Profile → API Tokens → Create Token → template **Edit Cloudflare Workers** |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare → Workers & Pages → Overview → Account ID (barra lateral direita) |
| `HOOPAY_CLIENT_ID` | Painel Hoopay |
| `HOOPAY_CLIENT_SECRET` | Painel Hoopay |

### Variables (aba Variables, opcional)

| Nome | Valor |
|------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://descomplicalibras.shop` |

---

## Passo 2 — Domínio customizado na Cloudflare

1. Cloudflare → **Workers & Pages** → worker **descomplicalibras**
2. **Settings → Domains & Routes → Add Custom Domain**
3. Adicione:
   - `descomplicalibras.shop`
   - `www.descomplicalibras.shop`

A Cloudflare configura o DNS automaticamente quando o domínio já está na mesma conta.

---

## Passo 3 — Ajustar DNS (importante)

Se ainda existir registro **A** apontando para a VPS (`185.115.161.45`), **remova ou desative**.

Com Workers + custom domain, a Cloudflare roteia o tráfego para o Worker — não precisa mais da VPS.

| Tipo | Nome | Destino | Proxy |
|------|------|---------|-------|
| CNAME | `@` | *(auto pelo Workers)* | Proxied |
| CNAME | `www` | `descomplicalibras.shop` | Proxied |

**SSL/TLS** → modo **Full** (recomendado).

---

## Passo 4 — Publicar

Depois de configurar os secrets, faça push:

```powershell
cd "c:\dev\Descomplica Libras Brasil"
git add .
git commit -m "feat: deploy automático Cloudflare Workers"
git push
```

Acompanhe em: **GitHub → Actions → Deploy to Cloudflare**

---

## Deploy manual (alternativa)

Se preferir sem GitHub Actions, conecte o repo direto na Cloudflare:

1. **Workers & Pages → Create → Workers → Connect to Git**
2. Repositório: `thabomokoenaa99-rgb/descomplicalibras`
3. Build command: `npm run cf:build`
4. Deploy command: `npx wrangler deploy`
5. Variáveis de ambiente: `HOOPAY_CLIENT_ID`, `HOOPAY_CLIENT_SECRET`, `NEXT_PUBLIC_SITE_URL`

---

## Webhook Hoopay

URL de callback (já usada pelo checkout):

```
https://descomplicalibras.shop/api/webhooks/hoopay
```

---

## Comandos locais

```bash
npm run dev       # desenvolvimento
npm run cf:build  # build Cloudflare
npm run preview   # preview local no runtime Workers
npm run deploy    # deploy manual (precisa wrangler login)
```
