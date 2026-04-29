import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type ContentCollection =
  | "blog"
  | "modules"
  | "industries"
  | "comparisons"
  | "landings"
  | "resources"
  | "training-functional"
  | "training-technical";

export type ContentDoc = {
  collection: ContentCollection;
  slug: string;
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  canonicalPath: string;
  minutes?: number;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

function collectionDir(collection: ContentCollection) {
  switch (collection) {
    case "training-functional":
      return path.join(CONTENT_ROOT, "training-functional");
    case "training-technical":
      return path.join(CONTENT_ROOT, "training-technical");
    default:
      return path.join(CONTENT_ROOT, collection);
  }
}

function canonicalBase(collection: ContentCollection) {
  switch (collection) {
    case "blog":
      return "/blog";
    case "modules":
      return "/modules";
    case "industries":
      return "/industries";
    case "comparisons":
      return "/comparisons";
    case "landings":
      return "/landings";
    case "resources":
      return "/resources";
    case "training-functional":
      return "/training/functional";
    case "training-technical":
      return "/training/technical";
  }
}

function listMdxFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .sort();
}

export function listDocs(collection: ContentCollection): ContentDoc[] {
  const dir = collectionDir(collection);
  const base = canonicalBase(collection);
  return listMdxFiles(dir).map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const rt = readingTime(content);

    const title = (data.title as string | undefined) ?? slugToTitle(slug);
    const description = data.description as string | undefined;
    const date = data.date as string | undefined;
    const tags = Array.isArray(data.tags) ? (data.tags as string[]) : undefined;

    return {
      collection,
      slug,
      title,
      description,
      date,
      tags,
      canonicalPath: `${base}/${slug}`,
      minutes: Math.max(1, Math.round(rt.minutes)),
    };
  });
}

export function getDoc(collection: ContentCollection, slug: string): ContentDoc | null {
  const docs = listDocs(collection);
  return docs.find((d) => d.slug === slug) ?? null;
}

export async function importMdxBySlug(collection: ContentCollection, slug: string) {
  // Keep imports explicit per collection to preserve bundler analyzability.
  switch (collection) {
    case "blog":
      return import(`../../content/blog/${slug}.mdx`);
    case "modules":
      return import(`../../content/modules/${slug}.mdx`);
    case "industries":
      return import(`../../content/industries/${slug}.mdx`);
    case "comparisons":
      return import(`../../content/comparisons/${slug}.mdx`);
    case "landings":
      return import(`../../content/landings/${slug}.mdx`);
    case "resources":
      return import(`../../content/resources/${slug}.mdx`);
    case "training-functional":
      return import(`../../content/training-functional/${slug}.mdx`);
    case "training-technical":
      return import(`../../content/training-technical/${slug}.mdx`);
  }
}

function slugToTitle(slug: string) {
  return slug
    .split("-")
    .map((w) => (w.length ? w[0]!.toUpperCase() + w.slice(1) : w))
    .join(" ");
}

