import Link from "next/link";
import { Metadata } from "next";
import { listDocs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Odoo Blog",
  description:
    "Community articles about Odoo ERP in Bangladesh: implementation guidance, module explainers, career paths, comparisons, and training roadmaps.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const posts = (await listDocs("blog")).sort((a, b) =>
    (b.date ?? "").localeCompare(a.date ?? ""),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Odoo Blog</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Neutral, Bangladesh-focused guides to help you learn Odoo, plan ERP
          implementations, and build your career.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-zinc-300"
          >
            <div className="text-sm font-semibold">{p.title}</div>
            <p className="mt-2 text-sm text-zinc-600">
              {p.description}
            </p>
            {p.date ? (
              <div className="mt-4 text-xs text-zinc-500">{p.date}</div>
            ) : null}
          </Link>
        ))}
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-600">
            No posts yet. Add MDX files in <code>content/blog</code>.
          </div>
        ) : null}
      </div>
    </div>
  );
}

