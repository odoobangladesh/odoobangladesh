import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type ContentDoc = {
  slug: string;
  title: string;
  description: string;
  date?: string;
  tags?: string[];
  keywords?: string[];
  canonical?: string;
  image?: string;
  draft?: boolean;
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

export async function listCollectionSlugs(collection: string) {
  const dir = path.join(contentRoot, collection);
  const entries = await readDirSafe(dir);
  return entries
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getDoc(collection: string, slug: string): Promise<ContentDoc> {
  const file = path.join(contentRoot, collection, `${slug}.mdx`);
  const raw = await fs.readFile(file, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as Partial<ContentDoc>;

  return {
    slug,
    title: data.title ?? slugToTitle(slug),
    description: data.description ?? "",
    date: data.date,
    tags: data.tags ?? [],
    keywords: data.keywords ?? [],
    canonical: data.canonical,
    image: data.image,
    draft: data.draft ?? false,
    body: parsed.content,
  };
}

export async function listDocs(collection: string): Promise<ContentDoc[]> {
  const slugs = await listCollectionSlugs(collection);
  const docs = await Promise.all(slugs.map((s) => getDoc(collection, s)));
  return docs.filter((d) => !d.draft);
}

function slugToTitle(slug: string) {
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

