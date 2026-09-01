import { copy } from "@/lib/content";
import { SITE, SEO } from "@/lib/site";

export function JsonLd() {
  const faqSchema = {
    "@type": "FAQPage",
    mainEntity: copy.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const organization = {
    "@type": "Organization",
    name: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/images/mockup/produto-principal.webp`,
  };

  const course = {
    "@type": "Course",
    name: `${SITE.name} — +100 Mapas Mentais Visuais`,
    description: SEO.description,
    provider: {
      "@type": "Organization",
      name: SITE.legalName,
      sameAs: SITE.url,
    },
    offers: [
      {
        "@type": "Offer",
        category: "Paid",
        priceCurrency: "BRL",
        price: "27.90",
        availability: "https://schema.org/InStock",
        url: `${SITE.url}/#oferta`,
      },
    ],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT2H",
    },
  };

  const product = {
    "@type": "Product",
    name: SITE.name,
    description: SEO.description,
    image: `${SITE.url}/images/mockup/hero-bundle.webp`,
    brand: {
      "@type": "Brand",
      name: SITE.name,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      ratingCount: "2847",
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "17.90",
      highPrice: "27.90",
      priceCurrency: "BRL",
      offerCount: "2",
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Oferta",
        item: `${SITE.url}/#oferta`,
      },
    ],
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, product, course, faqSchema, breadcrumb],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
