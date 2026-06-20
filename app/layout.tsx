import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://giridharan.dev';

// Safely build a URL object — falls back to the hardcoded domain if the env
// var is absent or malformed (important for static-generation builds).
function buildMetadataBase(): URL {
  try {
    return new URL(siteUrl);
  } catch {
    return new URL('https://giridharan.dev');
  }
}

export const metadata: Metadata = {
  title: {
    default: "Giridharan | Software Developer | Portfolio",
    template: "%s | Giridharan",
  },
  description:
    "Full-stack software developer specialising in Next.js, React, TypeScript and Firebase. Explore my projects, skills and get in touch.",
  keywords: [
    "portfolio",
    "web developer",
    "full stack",
    "Next.js",
    "React",
    "TypeScript",
    "Software Developer",
    "Firebase",
    "Giridharan",
  ],
  authors: [{ name: "Giridharan" }],
  creator: "Giridharan",
  metadataBase: buildMetadataBase(),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Giridharan | Portfolio",
    title: "Giridharan | Software Developer & Portfolio",
    description:
      "Full-stack software developer specialising in Next.js, React, TypeScript and Firebase. Explore my projects, skills and get in touch.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Giridharan – Software Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Giridharan | Software Developer & Portfolio",
    description:
      "Full-stack software developer specialising in Next.js, React, TypeScript and Firebase.",
    images: ["/og-image.png"],
    creator: "@giridharan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} font-sans antialiased`}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}

