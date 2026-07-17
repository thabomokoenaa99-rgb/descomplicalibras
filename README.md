# Descomplica Libras Brasil

Landing page mobile-first reconstruída a partir da estrutura do produto de referência, com código novo, copy reescrita e foco em conversão (Meta Ads).

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- Framer Motion (opcional / leve)
- `next/image` + WebP

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Configure em `.env.local`:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CHECKOUT_BASIC`
- `NEXT_PUBLIC_CHECKOUT_COMPLETE`

## Scripts

- `npm run dev` — desenvolvimento
- `npm run build` — build de produção
- `npm run start` — servidor de produção
- `npm run lint` — ESLint
