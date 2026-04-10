import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "./components/analytics/google-analytics";
import "./globals.css";
import { getRequestLanguage } from "./lib/i18n-server";
import { SITE_URL } from "./lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const languageCode = await getRequestLanguage();

  return (
    <html lang={languageCode}>
      <body
        className={`${inter.variable} ${inter.className} antialiased`}
      >
        <Suspense fallback={null}>
          <GoogleAnalytics
            measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
