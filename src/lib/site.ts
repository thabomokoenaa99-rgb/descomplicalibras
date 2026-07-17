export const SITE = {
  name: "Descomplica Libras",
  legalName: "Descomplica Libras Brasil",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://descomplicallibras.com.br",
  locale: "pt_BR",
  rating: "4.9/5",
  students: "2.847",
  prices: {
    basic: "17,90",
    complete: "27,90",
    completeOriginal: "297,00",
    savings: "269,10",
  },
  checkout: {
    basic: process.env.NEXT_PUBLIC_CHECKOUT_BASIC ?? "#oferta",
    complete: process.env.NEXT_PUBLIC_CHECKOUT_COMPLETE ?? "#oferta",
  },
} as const;

export const SEO = {
  title: "Descomplica Libras | +100 Mapas Mentais Visuais para aprender Libras",
  description:
    "+100 Mapas Mentais Visuais para dominar Libras de forma rápida e simples. Perfeito para quem começa do zero e quer só os sinais que realmente usa.",
  ogTitle: "Descomplica Libras | +100 Mapas Mentais Visuais",
  ogDescription:
    "Domine Libras de forma rápida, visual e simples — sem cursos intermináveis.",
} as const;
