import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Serif } from "next/font/google";
import Script from "next/script";
import { JsonLd } from "./components/JsonLd";
import "./globals.css";
import {
  absoluteUrl,
  defaultDescription,
  homeTitle,
  organizationJsonLd,
  siteName,
  siteUrl,
  websiteJsonLd,
} from "./lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const impactSiteVerificationMeta = {
  name: "impact-site-verification",
  value: "e8e4968e-dc34-49de-804d-382fe408b89f",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: homeTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    capable: true,
    title: siteName,
  },
  category: "shopping",
  keywords: [
    "affiliate shopping",
    "affiliate shopping market",
    "partner company product recommendations",
    "curated products",
    "trusted product picks",
    "premium shopping",
    "home and kitchen",
    "electronics",
    "gift guide",
  ],
  openGraph: {
    description: defaultDescription,
    images: [
      {
        alt: "Their Markets luxury logo",
        height: 1024,
        url: absoluteUrl("/full-logo.jpeg"),
        width: 1536,
      },
    ],
    locale: "en_US",
    siteName,
    title: homeTitle,
    type: "website",
    url: siteUrl,
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  twitter: {
    card: "summary_large_image",
    description: defaultDescription,
    images: [absoluteUrl("/full-logo.jpeg")],
    title: homeTitle,
  },
};

export const viewport: Viewport = {
  themeColor: "#121212",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} h-full antialiased`}
    >
      <head>
        <meta {...impactSiteVerificationMeta} />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        {children}
        <Script
          src="https://s.skimresources.com/js/302950X1790976.skimlinks.js"
          strategy="afterInteractive"
          type="text/javascript"
        />
      </body>
    </html>
  );
}
