import "server-only";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { DocToc, ReadingProgress } from "@/components/doc-chrome";
import { JsonLd } from "@/components/json-ld";
import { RememberGuide } from "@/components/remember-guide";
import {
  ERP_CHECKLIST_UNLOCK_KEY,
  ResourceEmailGate,
} from "@/components/resource-email-gate";

const GATED_RESOURCES: Record<
  string,
  { asset: string; storageKey: string; submitLabel: string; teaser: string }
> = {
  "erp-checklist": {
    asset: "erp-checklist",
    storageKey: ERP_CHECKLIST_UNLOCK_KEY,
    submitLabel: "Unlock checklist",
    teaser:
      "Title and summary stay open. Enter your email once to unlock the full checklist on this device.",
  },
  "functional-syllabus": {
    asset: "functional-syllabus",
    storageKey: "obd_unlocked_functional-syllabus_v1",
    submitLabel: "Unlock functional syllabus",
    teaser:
      "Title and summary stay open. Enter your email once to unlock the functional syllabus on this device.",
  },
  "technical-syllabus": {
    asset: "technical-syllabus",
    storageKey: "obd_unlocked_technical-syllabus_v1",
    submitLabel: "Unlock technical syllabus",
    teaser:
      "Title and summary stay open. Enter your email once to unlock the technical syllabus on this device.",
  },
};
import { ConsultationBand } from "@/components/consultation-band";
import { DocVideo } from "@/components/doc-video";
import { RelatedLinks } from "@/components/related-links";
import {
  COLLECTION_META,
  getDoc,
  listCollectionSlugs,
  type Collection,
  type ContentDoc,
} from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { docSchemas } from "@/lib/schema";
import { bnMirrorForEnglishPath, languageAlternates } from "@/lib/i18n";
import { ogImagePath } from "@/lib/og";
import { siteConfig } from "@/lib/site";
import { extractToc } from "@/lib/toc";

const COMMERCIAL_COLLECTIONS = new Set<Collection>([
  "industries",
  "comparisons",
  "landings",
]);

function commercialInterest(
  collection: Collection,
): "erp-assessment" | "talk-to-specialist" {
  if (collection === "comparisons" || collection === "landings") {
    return "talk-to-specialist";
  }
  return "erp-assessment";
}

/**
 * Shared renderer for every MDX-backed detail page. Route files stay tiny and
 * all pages get the same header, meta line, body, FAQ schema, breadcrumbs and
 * related links (blueprint section 10, definition of done).
 */

type Params = Promise<{ slug: string }>;

export function staticParamsFor(collection: Collection) {
  return async function generateStaticParams() {
    const slugs = await listCollectionSlugs(collection);
    return slugs.map((slug) => ({ slug }));
  };
}

async function load(collection: Collection, slug: string) {
  try {
    const doc = await getDoc(collection, slug);
    return doc.draft ? null : doc;
  } catch {
    return null;
  }
}

export function metadataFor(collection: Collection) {
  return async function generateMetadata({
    params,
  }: {
    params: Params;
  }): Promise<Metadata> {
    const { slug } = await params;
    const doc = await load(collection, slug);
    if (!doc) return {};
    return docMetadata(doc);
  };
}

export function docMetadata(doc: ContentDoc): Metadata {
  const isCourse =
    doc.collection === "training-functional" ||
    doc.collection === "training-technical";
  const meta = COLLECTION_META[doc.collection];
  const image = ogImagePath(doc.title, meta.label);
  const bnPair = bnMirrorForEnglishPath(doc.path);
  const languages = bnPair
    ? languageAlternates(bnPair.enPath, bnPair.bnSlug)
    : null;
  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: doc.path,
      ...(languages
        ? {
            languages: {
              en: languages.en,
              bn: languages.bn,
              "x-default": languages.en,
            },
          }
        : {}),
    },
    keywords: doc.keywords,
    openGraph: {
      title: doc.title,
      description: doc.description,
      url: doc.path,
      type: isCourse ? "website" : "article",
      images: [{ url: image, width: 1200, height: 630, alt: doc.title }],
      ...(doc.date && !isCourse
        ? { publishedTime: doc.date, modifiedTime: doc.updated ?? doc.date }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [image],
    },
  };
}

/**
 * Page component for the collection's own route (/modules/[slug] etc).
 * When a doc declares a short canonical slug, the collection route 308s to it
 * so there is exactly one indexable URL per document (blueprint WS-A).
 */
export function pageFor(collection: Collection) {
  return async function Page({ params }: { params: Params }) {
    const { slug } = await params;
    const doc = await load(collection, slug);
    if (!doc) notFound();
    const own = `${COLLECTION_META[collection].basePath}/${slug}`;
    if (doc.path !== own) permanentRedirect(doc.path);
    return <DocPage doc={doc} />;
  };
}

/** Page component for a short canonical slug (/odoo-pricing-bangladesh). */
export function canonicalPageFor(collection: Collection, slug: string) {
  return async function Page() {
    const doc = await load(collection, slug);
    if (!doc) notFound();
    return <DocPage doc={doc} />;
  };
}

export function canonicalMetadataFor(collection: Collection, slug: string) {
  return async function generateMetadata(): Promise<Metadata> {
    const doc = await load(collection, slug);
    return doc ? docMetadata(doc) : {};
  };
}

const RELATED_TITLE: Partial<Record<Collection, string>> = {
  comparisons: "Decision support",
  "training-functional": "Continue the track",
  "training-technical": "Continue the track",
};

function formatDate(iso?: string) {
  if (!iso) return null;
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export async function DocPage({ doc }: { doc: ContentDoc }) {
  const content = await renderMdx(doc.body);
  const toc = extractToc(doc.body);
  const meta = COLLECTION_META[doc.collection];
  const hubPath =
    doc.collection === "landings" ? "/learning-center" : meta.basePath;
  const hubLabel =
    doc.collection === "landings" ? "Learning Center" : meta.label;
  const isArticle = doc.collection === "blog";
  const Wrapper = isArticle ? "article" : "div";
  const gatedResource =
    doc.collection === "resources"
      ? GATED_RESOURCES[doc.slug]
      : undefined;
  const showConsultation = COMMERCIAL_COLLECTIONS.has(doc.collection);

  const body = (
    <>
      <div className="prose prose-obd mt-8 max-w-none">{content}</div>
      {doc.related.length > 0 ? (
        <RelatedLinks
          title={RELATED_TITLE[doc.collection] ?? "Related"}
          links={doc.related}
        />
      ) : null}
      {showConsultation ? (
        <ConsultationBand
          title="Request a consultation"
          description={`Educational first. When you need scoped implementation help, ${siteConfig.operator.name} follows up with source tagged as ${siteConfig.leadSource}.`}
          defaultInterest={commercialInterest(doc.collection)}
        />
      ) : null}
    </>
  );

  return (
    <>
      <ReadingProgress />
      <RememberGuide href={doc.path} title={doc.title} />
      <Wrapper
        id="doc-article"
        className="site-container grid gap-10 py-10 lg:grid-cols-[minmax(0,720px)_240px] lg:justify-center"
      >
        <div className="min-w-0">
          <JsonLd data={docSchemas(doc)} />
          <nav aria-label="Breadcrumb" className="text-xs text-ink-muted">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link href="/" className="hover:text-ink hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-ink-muted">
                /
              </li>
              <li>
                <Link href={hubPath} className="hover:text-ink hover:underline">
                  {hubLabel}
                </Link>
              </li>
            </ol>
          </nav>
          <header className="mt-4">
            <h1 className="font-display text-[length:var(--text-h1)] font-bold tracking-[var(--tracking-h1)] text-ink">
              {doc.title}
            </h1>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              {doc.description}
            </p>
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted">
              {doc.updated ? (
                <span>
                  Updated{" "}
                  <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
                </span>
              ) : null}
              {doc.odooVersion ? (
                <span>Applies to Odoo {doc.odooVersion}</span>
              ) : null}
              {doc.author ? <span>By {doc.author}</span> : null}
            </p>
          </header>
          {isArticle ? <DocVideo src={doc.video} title={doc.title} /> : null}
          {gatedResource ? (
            <ResourceEmailGate
              asset={gatedResource.asset}
              storageKey={gatedResource.storageKey}
              submitLabel={gatedResource.submitLabel}
              teaser={
                <p className="mt-8 text-sm leading-6 text-ink-muted">
                  {gatedResource.teaser}
                </p>
              }
            >
              {body}
            </ResourceEmailGate>
          ) : (
            body
          )}
        </div>
        <aside className="hidden lg:block">
          <DocToc items={toc} />
        </aside>
      </Wrapper>
    </>
  );
}
