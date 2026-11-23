import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { BN_MIRRORS, bnPathForSlug, listBnSlugs } from "@/lib/i18n";

export type BnDoc = {
  slug: string;
  path: string;
  enPath: string;
  title: string;
  description: string;
  updated?: string;
  body: string;
};

const bnRoot = path.join(process.cwd(), "content", "bn");

export async function getBnDoc(slug: string): Promise<BnDoc | null> {
  const mirror = BN_MIRRORS[slug];
  if (!mirror) return null;
  try {
    const raw = await fs.readFile(path.join(bnRoot, `${slug}.mdx`), "utf8");
    const parsed = matter(raw);
    const data = parsed.data as Record<string, unknown>;
    return {
      slug,
      path: bnPathForSlug(slug),
      enPath: mirror.enPath,
      title: typeof data.title === "string" ? data.title : slug,
      description:
        typeof data.description === "string" ? data.description : "",
      updated:
        typeof data.updated === "string"
          ? data.updated.slice(0, 10)
          : typeof data.date === "string"
            ? data.date.slice(0, 10)
            : undefined,
      body: parsed.content,
    };
  } catch {
    return null;
  }
}

export async function listBnDocs(): Promise<BnDoc[]> {
  const docs = await Promise.all(listBnSlugs().map((s) => getBnDoc(s)));
  return docs.filter((d): d is BnDoc => Boolean(d));
}
