import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type OpenGraphType = "website" | "article";

export function absoluteUrl(pathname: string) {
  if (!pathname.startsWith("/")) return `${siteConfig.url}/${pathname}`;
  return `${siteConfig.url}${pathname}`;
}

export function buildMetadata(opts: {
  title?: string;
  description?: string;
  pathname?: string;
  ogType?: OpenGraphType;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const title = opts.title ? `${opts.title} · ${siteConfig.name}` : siteConfig.name;
  const description =
    opts.description ??
    "Community-driven Odoo resources, implementation guidance, comparisons, and functional/technical training for Bangladesh.";
  const url = absoluteUrl(opts.pathname ?? "/");
  const image = absoluteUrl(opts.image ?? "/opengraph-image");

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    alternates: { canonical: url },
    robots: opts.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: opts.ogType ?? "website",
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function jsonLdSafeStringify(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

