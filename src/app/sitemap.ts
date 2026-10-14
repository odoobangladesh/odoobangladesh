import type { MetadataRoute } from "next";
import { COLLECTION_META, listAllDocs } from "@/lib/content";
import { siteConfig } from "@/lib/site";

/**
 * One entry per indexable URL (blueprint WS-A):
 *  - static hubs and pillars with a fixed review date
 *  - every published content doc at its canonical path, dated from frontmatter
 * Legacy slugs that only redirect (/landings/*, /odoo-functional-training) are
 * deliberately absent.
 */

// Bump when a static page is materially edited; never "now" at build time.
const STATIC_REVIEWED = new Date("2026-10-14");

const staticRoutes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/learning-center", priority: 0.9, changeFrequency: "weekly" },
  { path: "/implementation-guide", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing-guide", priority: 0.9, changeFrequency: "monthly" },
  { path: "/odoo-career-guide", priority: 0.8, changeFrequency: "monthly" },
  { path: "/training", priority: 0.9, changeFrequency: "weekly" },
  { path: "/training/functional", priority: 0.9, changeFrequency: "weekly" },
  { path: "/training/technical", priority: 0.9, changeFrequency: "weekly" },
  { path: "/modules", priority: 0.8, changeFrequency: "weekly" },
  { path: "/industries", priority: 0.8, changeFrequency: "weekly" },
  { path: "/comparisons", priority: 0.8, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/developer-resources", priority: 0.6, changeFrequency: "monthly" },
  { path: "/partners", priority: 0.6, changeFrequency: "monthly" },
  { path: "/events", priority: 0.7, changeFrequency: "weekly" },
  { path: "/forum", priority: 0.5, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  const docs = await listAllDocs();

  const statics: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: STATIC_REVIEWED,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const content: MetadataRoute.Sitemap = docs.map((doc) => {
    const stamp = doc.updated ?? doc.date;
    return {
      url: `${base}${doc.path}`,
      lastModified: stamp ? new Date(`${stamp}T00:00:00Z`) : STATIC_REVIEWED,
      changeFrequency: "monthly",
      priority: doc.canonical ? 0.8 : COLLECTION_META[doc.collection].priority,
    };
  });

  return [...statics, ...content];
}
