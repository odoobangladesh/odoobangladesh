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
import { extractToc } from "@/lib/toc";

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
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: doc.path },
    keywords: doc.keywords,
    openGraph: {
      title: doc.title,
      description: doc.description,
      url: doc.path,
      type: isCourse ? "website" : "article",
      ...(doc.date && !isCourse
        ? { publishedTime: doc.date, modifiedTime: doc.updated ?? doc.date }
        : {}),
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
  const gateChecklist =
    doc.collection === "resources" && doc.slug === "erp-checklist";

  const body = (
    <>
      <div className="prose prose-obd mt-8 max-w-none">{content}</div>
      {doc.related.length > 0 ? (
        <RelatedLinks
          title={RELATED_TITLE[doc.collection] ?? "Related"}
          links={doc.related}
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
          {gateChecklist ? (
            <ResourceEmailGate
              asset="erp-checklist"
              storageKey={ERP_CHECKLIST_UNLOCK_KEY}
              submitLabel="Unlock checklist"
              teaser={
                <p className="mt-8 text-sm leading-6 text-ink-muted">
                  Title and summary stay open. Enter your email once to unlock
                  the full checklist on this device.
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
