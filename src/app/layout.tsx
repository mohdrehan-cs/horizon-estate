import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { RoleSwitcher } from "@/components/demo/RoleSwitcher";
import { siteConfig } from "@/config/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://horizonestates.in"),
  title: {
    default: `${siteConfig.name} — Property in Delhi, Noida & Greater Noida`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "property in Delhi",
    "flats in Noida",
    "property in Greater Noida",
    "3 BHK Noida",
    "builder floor Delhi",
    "new projects Noida",
    "real estate Delhi NCR",
  ],
  openGraph: {
    title: `${siteConfig.name} — Delhi NCR Property`,
    description: siteConfig.description,
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream text-ink antialiased">
        <AppProviders>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <RoleSwitcher />
        </AppProviders>
      </body>
    </html>
  );
}
