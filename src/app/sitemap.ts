import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { listDocs, type ContentCollection } from "@/lib/content";

const collections: ContentCollection[] = [
  "blog",
  "modules",
  "industries",
  "comparisons",
  "resources",
  "training-functional",
  "training-technical",
  "landings",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/contact",
    "/blog",
    "/modules",
    "/industries",
    "/comparisons",
    "/resources",
    "/learning-center",
    "/training",
    "/training/functional",
    "/training/technical",
    "/odoo-functional-training",
    "/odoo-technical-training",
    "/implementation-guide",
    "/pricing-guide",
    "/developer-resources",
    "/events",
    "/faq",
  ];

  const contentRoutes = collections.flatMap((c) => listDocs(c).map((d) => d.canonicalPath));

  const urls = [...staticRoutes, ...contentRoutes];

  return urls.map((pathname) => ({
    url: `${siteConfig.url}${pathname}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: pathname === "/" ? 1 : 0.7,
  }));
}

