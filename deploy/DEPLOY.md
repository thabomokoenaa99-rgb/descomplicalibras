# Deploy — descomplicalibras.shop (Windows VPS + XAMPP)

## Resumo

O site é **Next.js com API** (checkout Hoopay). O XAMPP/Apache só faz **proxy reverso** para o Node na porta 3000.

| Item | Valor |
|------|--------|
| Hospedagem | Vercel (recomendado) — veja `deploy/VERCEL.md` |
| Domínio | descomplicalibras.shop |
| Checkout | `/checkout/basico` e `/checkout/completo` |

---

## 1. Cloudflare (DNS)

No painel do domínio `descomplicalibras.shop`:

| Tipo | Nome | Conteúdo | Proxy |
|------|------|----------|-------|
| A | `@` | `185.115.161.45` | Proxied (laranja) |
| A | `www` | `185.115.161.45` | Proxied |

**SSL/TLS** → modo **Flexible** (Cloudflare → VPS em HTTP na porta 80).

Aguarde alguns minutos para propagar.

---

## 2. No seu PC — gerar pacote

Na pasta do projeto:

```powershell
cd "c:\dev\Descomplica Libras Brasil"
powershell -ExecutionPolicy Bypass -File .\deploy\package.ps1
```

Isso gera `deploy\descomplicalibras-deploy.zip`.

---

## 3. Na VPS (RDP)

1. Conecte em **185.115.161.45:3389** (usuário Administrator).
2. Instale **Node.js 20 LTS** se não tiver: https://nodejs.org/
3. Copie `descomplicalibras-deploy.zip` para `C:\apps\`
4. Extraia em `C:\apps\descomplicalibras\`
5. Copie `.env.local` do seu PC para `C:\apps\descomplicalibras\.env.local` e edite:

```env
NEXT_PUBLIC_SITE_URL=https://descomplicalibras.shop
```

(mantenha `HOOPAY_CLIENT_ID` e `HOOPAY_CLIENT_SECRET`)

6. Abra **PowerShell como Administrador**:

```powershell
cd C:\apps\descomplicalibras
powershell -ExecutionPolicy Bypass -File .\deploy\install-vps.ps1
```

7. No **XAMPP Control Panel** → Apache → **Restart**

8. Teste: https://descomplicalibras.shop

---

## 4. Apache (XAMPP) — manual se o script falhar

Em `C:\xampp\apache\conf\httpd.conf`, descomente:

```apache
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
Include conf/extra/httpd-vhosts.conf
```

Cole o conteúdo de `deploy\apache-vhost.conf` em `C:\xampp\apache\conf\extra\httpd-vhosts.conf`.

---

## 5. Serviço Node (PM2)

O script instala PM2 e registra:

```powershell
pm2 status
pm2 logs descomplicalibras
pm2 restart descomplicalibras
```

---

## 6. Firewall Windows

Libere portas **80** e **443** (entrada) se o site não abrir externamente:

```powershell
New-NetFirewallRule -DisplayName "HTTP" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow
```

---

## Segurança

- Nunca commite `.env.local` ou `deploy/env.vps.local` no Git.
- Configure `HOOPAY_WEBHOOK_SECRET` na Vercel — veja `deploy/SECURITY.md`.
- Webhook Hoopay: `https://descomplicalibras.shop/api/webhooks/hoopay?token=SEU_SECRET`
- Se a VPS não for mais usada, desligue o servidor e remova credenciais RDP antigas.
