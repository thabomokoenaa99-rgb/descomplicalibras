import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { MetaPixel } from "@/components/MetaPixel";
import { MetaPixelEnsure } from "@/components/MetaPixelEnsure";
import { MetritoScript } from "@/components/MetritoScript";
import { SEO, SITE } from "@/lib/site";
import "@/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
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
        url: "/images/mockup/hero-bundle.webp",
        width: 1024,
        height: 731,
        alt: `${SITE.name} — +300 mapas mentais visuais e bônus`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.ogTitle,
    description: SEO.ogDescription,
    images: ["/images/mockup/hero-bundle.webp"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/images/mockup/produto-principal.webp",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} scroll-smooth`}>
      <head>
        <MetaPixel />
        <MetritoScript />
        <JsonLd />
      </head>
      <body className="font-sans" style={{ paddingTop: 37 }}>
        <MetaPixelEnsure />
        {children}
      </body>
    </html>
  );
}
