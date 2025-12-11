import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scamkontroll - Sveriges största scam-databas",
  description: "Sök bluffnummer och få varningar om telefonbedrägerier i Sverige",
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico", sizes: "any" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16" },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
  openGraph: {
    images: [
      {
        url: "/favicon_io/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Scamkontroll logotyp",
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
      </head>
      <body>{children}</body>
    </html>
  );
}
