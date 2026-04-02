import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { TabAttentionTitle } from "@/components/TabAttentionTitle";
import { SITE_DOCUMENT_TITLE } from "@/lib/siteTitle";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: SITE_DOCUMENT_TITLE,
  description:
    "Pre-order from campus outlets, check what's in stock, pick up when it's ready. Pilots with colleges, canteens, and food courts.",
  keywords: [
    "Tuckr",
    "campus food",
    "pre-order",
    "college canteen",
    "food court",
    "skip the queue",
    "Hyderabad",
    "student food app",
    "Tuckr Foods",
  ],
  openGraph: {
    title: SITE_DOCUMENT_TITLE,
    description:
      "Pre-order from campus outlets, pay online or at the counter, and pick up when your order is ready.",
    url: "https://tuckr.in/",
    siteName: "Tuckr",
    images: [
      {
        url: "/tuckr-og-image.png",
        width: 1200,
        height: 630,
        alt: "Tuckr",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_DOCUMENT_TITLE,
    description:
      "Pre-order from campus outlets, pay online or at the counter, and pick up when your order is ready.",
    site: "@tuckrfoods",
    creator: "@tuckrfoods",
    images: ["/tuckr-og-image.png"],
  },
  metadataBase: new URL("https://tuckr.in/"),
  themeColor: "#6FC06E",
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Tuckr",
    statusBarStyle: "default",
    capable: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Tuckr Foods" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tuckr" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tuckrfoods" />
        <meta name="twitter:creator" content="@tuckrfoods" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#6FC06E" />
        <meta
          name="google-site-verification"
          content="SJFL1iOZBlLSRY79_WGViScqEzMdT7lsKIqefVZF46k"
        />
      </head>
      <body className={`${syne.variable} ${dmSans.variable} antialiased`}>
        <TabAttentionTitle />
        {children}
      </body>
    </html>
  );
}
