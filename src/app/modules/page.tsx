import Link from "next/link";
import { Metadata } from "next";
import { listDocs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Odoo Modules Directory (Bangladesh)",
  description:
    "Browse Odoo ERP modules with Bangladesh-focused use cases, implementation notes, and learning resources.",
  alternates: { canonical: "/modules" },
};

export default async function ModulesIndexPage() {
  const modules = await listDocs("modules");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Odoo Modules Directory
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Neutral module overviews for businesses and learners in Bangladesh,
          with implementation considerations and learning pathways.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {modules.map((m) => (
          <Link
            key={m.slug}
            href={`/modules/${m.slug}`}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
          >
            <div className="text-sm font-semibold">{m.title}</div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {m.description}
            </p>
          </Link>
        ))}
        {modules.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
            Add MDX files in <code>content/modules</code>.
          </div>
        ) : null}
      </div>
    </div>
  );
}

