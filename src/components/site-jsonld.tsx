import "server-only";

import { siteConfig } from "@/lib/site";

function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
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
    logo: `${base}/icons/ob-horizontal.svg`,
    image: `${base}/icons/ob-og.png`,
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.facebook,
      siteConfig.operator.url,
    ],
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.operator.name,
      url: siteConfig.operator.url,
      email: siteConfig.operator.email,
      telephone: siteConfig.operator.phone,
      address: siteConfig.operator.address,
    },
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

