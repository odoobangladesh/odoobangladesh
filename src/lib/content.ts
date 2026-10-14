import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type RelatedLink = {
  href: string;
  label: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type Collection =
  | "blog"
  | "landings"
  | "modules"
  | "industries"
  | "comparisons"
  | "training-functional"
  | "training-technical"
  | "resources";

export const COLLECTIONS: Collection[] = [
  "blog",
  "landings",
  "modules",
  "industries",
  "comparisons",
  "training-functional",
  "training-technical",
  "resources",
];

/** Where each collection's detail pages live, used for paths, breadcrumbs and the sitemap. */
export const COLLECTION_META: Record<
  Collection,
  { basePath: string; label: string; priority: number }
> = {
  blog: { basePath: "/blog", label: "Blog", priority: 0.7 },
  landings: { basePath: "/landings", label: "Guides", priority: 0.8 },
  modules: { basePath: "/modules", label: "Modules", priority: 0.7 },
  industries: { basePath: "/industries", label: "Industries", priority: 0.7 },
  comparisons: { basePath: "/comparisons", label: "Comparisons", priority: 0.7 },
  "training-functional": {
    basePath: "/training/functional",
    label: "Functional training",
    priority: 0.8,
  },
  "training-technical": {
    basePath: "/training/technical",
    label: "Technical training",
    priority: 0.8,
  },
  resources: { basePath: "/resources", label: "Resources", priority: 0.6 },
};

export type ContentDoc = {
  collection: Collection;
  slug: string;
  /** The URL this document should be served and indexed at. */
  path: string;
  title: string;
  description: string;
  date?: string;
  updated?: string;
  author?: string;
  odooVersion?: string;
  tags?: string[];
  keywords?: string[];
  canonical?: string;
  image?: string;
  draft?: boolean;
  related: RelatedLink[];
  faq: FaqItem[];
  body: string;
};

const contentRoot = path.join(process.cwd(), "content");

async function readDirSafe(dir: string) {
  try {
    return await fs.readdir(dir);
  } catch {
    return [];
  }
}

export async function listCollectionSlugs(collection: Collection) {
  const dir = path.join(contentRoot, collection);
  const entries = await readDirSafe(dir);
  return entries
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getDoc(
  collection: Collection,
  slug: string,
): Promise<ContentDoc> {
  const file = path.join(contentRoot, collection, `${slug}.mdx`);
  const raw = await fs.readFile(file, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;

  const canonical =
    typeof data.canonical === "string" && data.canonical.startsWith("/")
      ? data.canonical
      : undefined;

  return {
    collection,
    slug,
    path: canonical ?? `${COLLECTION_META[collection].basePath}/${slug}`,
    title: typeof data.title === "string" ? data.title : slugToTitle(slug),
    description: typeof data.description === "string" ? data.description : "",
    date: readDate(data.date),
    updated: readDate(data.updated) ?? readDate(data.date),
    author: typeof data.author === "string" ? data.author : undefined,
    odooVersion:
      typeof data.odooVersion === "string" ? data.odooVersion : undefined,
    tags: readStringArray(data.tags),
    keywords: readStringArray(data.keywords),
    canonical,
    image: typeof data.image === "string" ? data.image : undefined,
    draft: data.draft === true,
    related: readRelated(data.related),
    faq: readFaq(data.faq),
    body: parsed.content,
  };
}

export async function listDocs(collection: Collection): Promise<ContentDoc[]> {
  const slugs = await listCollectionSlugs(collection);
  const docs = await Promise.all(slugs.map((s) => getDoc(collection, s)));
  return docs
    .filter((d) => !d.draft)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "") || a.title.localeCompare(b.title));
}

/** Every published document across every collection, for the sitemap. */
export async function listAllDocs(): Promise<ContentDoc[]> {
  const lists = await Promise.all(COLLECTIONS.map((c) => listDocs(c)));
  return lists.flat();
}

function readDate(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }
  return undefined;
}

function readStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string");
}

function readRelated(value: unknown): RelatedLink[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const href = typeof record.href === "string" ? record.href : "";
    const label = typeof record.label === "string" ? record.label.trim() : "";
    if (!href.startsWith("/") || label.length === 0) return [];
    return [{ href, label }];
  });
}

function readFaq(value: unknown): FaqItem[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const q = typeof record.q === "string" ? record.q.trim() : "";
    const a = typeof record.a === "string" ? record.a.trim() : "";
    if (!q || !a) return [];
    return [{ q, a }];
  });
}

function slugToTitle(slug: string) {
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}
