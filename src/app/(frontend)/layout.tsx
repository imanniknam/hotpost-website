import type { Metadata } from "next";

import localFont from "next/font/local";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getSiteSettings } from "@/lib/queries";

import "./globals.css";

/**
 * Self-hosted rather than next/font/google: the font is fetched at build time,
 * and Google Fonts is not reliably reachable from Iranian build/deploy hosts.
 * Vazirmatn is SIL OFL licensed, so bundling it is fine.
 */
const vazirmatn = localFont({
  src: "../../fonts/Vazirmatn-Variable.woff2",
  variable: "--font-vazirmatn",
  weight: "100 900",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    title: {
      default: settings.defaultTitle,
      template: `%s | هات پست`,
    },
    description: settings.defaultDescription,
    openGraph: {
      type: "website",
      locale: "fa_IR",
      siteName: "هات پست",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
