import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "./components/layout/footer";
import { Navbar } from "./components/layout/navbar";
import "./globals.css";
import { SITE_URL } from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ImageTools — Fast, Free Image Tools",
    template: "%s | ImageTools",
  },
  description:
    "Fast, free, and secure image tools. Compress, convert, resize, crop, and optimize images in seconds.",
  openGraph: {
    type: "website",
    siteName: "ImageTools",
    title: "ImageTools — Fast, Free Image Tools",
    description:
      "Fast, free, and secure image tools. Compress, convert, resize, crop, and optimize images in seconds.",
    images: [
      {
        url: `${SITE_URL}/og.svg`,
        width: 1200,
        height: 630,
        alt: "ImageTools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ImageTools — Fast, Free Image Tools",
    description:
      "Fast, free, and secure image tools. Compress, convert, resize, crop, and optimize images in seconds.",
    images: [`${SITE_URL}/og.svg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
