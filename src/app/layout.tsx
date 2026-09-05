import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { DeferredPixels } from "@/components/DeferredPixels";
import { JsonLd } from "@/components/JsonLd";
import { MetaPixel } from "@/components/MetaPixel";
import { MetaPixelEnsure } from "@/components/MetaPixelEnsure";
import { UrlParameterPropagation } from "@/components/UrlParameterPropagation";
import { SEO, SITE } from "@/lib/site";
import "@/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SEO.title,
  description: SEO.description,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SEO.ogTitle,
    description: SEO.ogDescription,
    images: [
      {
        url: "/images/mockup/hero-lcp-2x.webp",
        width: 1080,
        height: 752,
        alt: `${SITE.name} — +100 mapas mentais visuais e bônus`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.ogTitle,
    description: SEO.ogDescription,
    images: ["/images/mockup/hero-lcp-2x.webp"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/images/mockup/produto-principal.webp",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} scroll-smooth`} style={{ backgroundColor: "#f5f9ff" }}>
      <head>
        <JsonLd />
      </head>
      <body className="font-sans" style={{ paddingTop: 37, backgroundColor: "#f5f9ff" }}>
        <MetaPixel />
        <UrlParameterPropagation />
        <DeferredPixels />
        <MetaPixelEnsure />
        {children}
      </body>
    </html>
  );
}
