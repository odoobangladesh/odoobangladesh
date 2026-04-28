import "server-only";

import { siteConfig } from "@/lib/site";

function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data),
  };
}

export function SiteJsonLd() {
  const base = siteConfig.siteUrl.replace(/\/$/, "");

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: base,
    email: siteConfig.contactEmail,
    sameAs: Object.values(siteConfig.social),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: base,
    description: siteConfig.description,
    inLanguage: "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(organization)}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(website)} />
    </>
  );
}

