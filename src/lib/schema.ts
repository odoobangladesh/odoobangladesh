import "server-only";

import type { ContentDoc } from "@/lib/content";
import { COLLECTION_META } from "@/lib/content";
import { siteConfig } from "@/lib/site";

/**
 * Typed JSON-LD builders (blueprint section 4, WS-C). Pages never hand-write
 * schema objects; they call these and render the result with <JsonLd/>.
 */

const base = siteConfig.siteUrl.replace(/\/$/, "");

export type JsonLdObject = Record<string, unknown>;

function abs(path: string) {
  return `${base}${path}`;
}

export function breadcrumbList(
  items: { name: string; path: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function faqPage(faq: { q: string; a: string }[]): JsonLdObject | null {
  if (faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function organization() {
  return {
    "@type": "Organization",
    name: siteConfig.name,
    url: base,
  };
}

export function article(doc: ContentDoc, type: "Article" | "BlogPosting" = "Article"): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: doc.title,
    description: doc.description,
    url: abs(doc.path),
    mainEntityOfPage: abs(doc.path),
    datePublished: doc.date,
    dateModified: doc.updated ?? doc.date,
    author: {
      "@type": "Organization",
      name: doc.author ?? siteConfig.name,
      url: base,
    },
    publisher: organization(),
    keywords: doc.keywords?.join(", "),
    inLanguage: "en",
  };
}

export function course(doc: ContentDoc): JsonLdObject {
  const track =
    doc.collection === "training-technical" ? "Technical" : "Functional";
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: doc.title,
    description: doc.description,
    url: abs(doc.path),
    provider: organization(),
    educationalLevel: track === "Technical" ? "Intermediate" : "Beginner",
    about: `Odoo ${track.toLowerCase()} training` + (doc.odooVersion ? ` (Odoo ${doc.odooVersion})` : ""),
    inLanguage: "en",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      category: "Free",
      price: 0,
      priceCurrency: "BDT",
      availability: "https://schema.org/InStock",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT6H",
    },
  };
}

export function itemList(
  name: string,
  items: { name: string; path: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: abs(item.path),
    })),
  };
}

/** Breadcrumb trail for a content document: Home, collection hub, page. */
export function docBreadcrumbs(doc: ContentDoc): JsonLdObject {
  const meta = COLLECTION_META[doc.collection];
  const hubPath =
    doc.collection === "landings" ? "/learning-center" : meta.basePath;
  const hubName = doc.collection === "landings" ? "Learning Center" : meta.label;
  return breadcrumbList([
    { name: "Home", path: "/" },
    { name: hubName, path: hubPath },
    { name: doc.title, path: doc.path },
  ]);
}

/** All schema objects a content page should emit, by collection. */
export function docSchemas(doc: ContentDoc): JsonLdObject[] {
  const out: JsonLdObject[] = [docBreadcrumbs(doc)];
  switch (doc.collection) {
    case "blog":
      out.push(article(doc, "BlogPosting"));
      break;
    case "training-functional":
    case "training-technical":
      out.push(course(doc));
      break;
    default:
      out.push(article(doc, "Article"));
  }
  const faq = faqPage(doc.faq);
  if (faq) out.push(faq);
  return out;
}
