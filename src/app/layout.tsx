import type { Metadata } from "next";
import { Bricolage_Grotesque, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import "./landing.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";
import { ExitIntentLeadModal } from "@/components/exit-intent-lead-modal";
import { SiteJsonLd } from "@/components/site-jsonld";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { siteConfig } from "@/lib/site";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  // Icons come from file conventions only: favicon.ico, icon.svg, apple-icon.png
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.siteUrl,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: "/icons/ob-og.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/icons/ob-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${hindSiliguri.variable} js h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-ink">
        {/* No-JS: keep motion targets visible when CSS assumes `.js` is present. */}
        <noscript>
          <style>{`.js .hero-reveal,.js .reveal-pending,.js .rb-reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-control)] focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:shadow-2"
        >
          Skip to content
        </a>
        <SiteJsonLd />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <StickyCta />
        <ExitIntentLeadModal />
        <WhatsAppFab />
      </body>
    </html>
  );
}
