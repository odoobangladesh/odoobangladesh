import { jsonLdSafeStringify } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function SiteJsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    description: siteConfig.tagline,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdSafeStringify(org) }}
    />
  );
}

