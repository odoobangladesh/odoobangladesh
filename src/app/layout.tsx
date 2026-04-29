import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { ExitIntentLeadModal } from "@/components/exit-intent-lead-modal";
import { SiteJsonLd } from "@/components/site-jsonld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Odoo Community Portal",
    description:
      "Community-driven Odoo resources, implementation guidance, comparisons, and functional/technical training for Bangladesh.",
    pathname: "/",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          // Light is the default; only apply dark if user explicitly chose it.
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('ob_theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}",
          }}
        />
        <SiteJsonLd />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <StickyCta />
        <WhatsAppFab />
        <ExitIntentLeadModal />
      </body>
    </html>
  );
}
