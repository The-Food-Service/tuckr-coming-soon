import type { Metadata } from "next";
import { Poppins, Fira_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const firaMono = Fira_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-fira-mono",
});

export const metadata: Metadata = {
  title: "Tuckr | Coming Soon | One Stop Pick & Go Solution",
  description: "Tuckr is under development and will soon be available for download on Apple Store & Google Play Store. Your One Stop Pick & Go Solution.",
  keywords: [
    "Tuckr",
    "Coming Soon",
    "Pick and Go",
    "Food App",
    "BITS Hyderabad",
    "Apple Store",
    "Google Play Store",
    "Food Delivery",
    "Startup",
    "Tuckr Foods",
    "Tuckr Foods Hyderabad",
    "Tuckr Food Pick & Go",
    "Tuckr Food App",
    "Food Pick & Go",
    "College Food App",
    "Gen Z Food App",
    "BITS Hyderabad Start Up",
    "Pick & Go",
    "Pick & Go App",
    "Pick & Go Food",
    "Pick & Go Food App",
    "Pick & Go Food Delivery",
    "Pick & Go Food Delivery App",
    "Pick & Go Food Delivery App",
    "Tucker",
    "Tucker Foods",
    "Tucker Food Pick Up",
    "Tucker Pick and Go",
    "Tucker BITS Hyderabad",
    "Tuckr BITS Pilani",
    "Tucker BITS Hyderabad",
  ],
  openGraph: {
    title: "Tuckr | Coming Soon",
    description: "Tuckr is under development and will soon be available for download on Apple Store & Google Play Store. Your One Stop Pick & Go Solution for college food outlets.",
    url: "https://tuckr.in/",
    siteName: "Tuckr",
    images: [
      {
        url: "/tuckr-og-image.png",
        width: 1200,
        height: 630,
        alt: "Tuckr Coming Soon"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Tuckr | Coming Soon",
    description: "Tuckr is under development and will soon be available for download on Apple Store & Google Play Store. Your One Stop Pick & Go Solution for college food outlets.",
    site: "@tuckrfoods",
    creator: "@tuckrfoods",
    images: ["/tuckr-og-image.png"]
  },
  metadataBase: new URL("https://tuckr.in/"),
  themeColor: "#6FC06E",
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Tuckr",
    statusBarStyle: "default",
    capable: true
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Extra meta tags for SEO and social platforms */}
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
        <meta name="google-site-verification" content="google8167aa05152c4bdd.html" />
      </head>
      <body
        className={`${poppins.variable} ${firaMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
