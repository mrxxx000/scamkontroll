import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scamkontroll - Sveriges största scam-databas",
  description: "Sök bluffnummer och få varningar om telefonbedrägerier i Sverige",
  icons: {
    icon: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
  },
  openGraph: {
    url: 'https://scamkontroll.xyz',
    title: 'Scamkontroll',
    description: 'Sök bluffnummer och få varningar om telefonbedrägerier i Sverige',
    images: [
      {
        url: '/logo/logo-512.png',
        width: 512,
        height: 512,
        alt: 'Scamkontroll logotyp',
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <head>
        {/* Google AdSense - include when NEXT_PUBLIC_ADSENSE_CLIENT is set */}
        {/* Set NEXT_PUBLIC_ADSENSE_CLIENT in Vercel or .env.local to enable ads */}
        {
          // Use a runtime value inserted at build time by Next.js environment variables
        }
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-9726025514115935'}`}
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon_io/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon_io/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon_io/favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="apple-touch-icon"
          href="/favicon_io/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
        <meta
          property="og:image"
          content="/favicon_io/android-chrome-512x512.png"
        />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:alt" content="Scamkontroll logotyp" />
        {/* Organization structured data for Google logo in search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Scamkontroll',
              url: 'https://scamkontroll.xyz',
              logo: 'https://scamkontroll.xyz/logo/logo-512.png',
              image: 'https://scamkontroll.xyz/logo/logo-512.png',
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
