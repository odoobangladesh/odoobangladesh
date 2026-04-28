import Link from "next/link";
import { Metadata } from "next";
import { listDocs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Odoo for Industries (Bangladesh)",
  description:
    "Industry-focused Odoo ERP guides for Bangladesh: garments, manufacturing, retail, distribution, services, and SMEs.",
  alternates: { canonical: "/industries" },
};

export default async function IndustriesIndexPage() {
  const industries = await listDocs("industries");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Odoo for Industries
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Programmatic industry pages designed for topical authority and
          internal linking across modules, implementation guides, and training.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {industries.map((i) => (
          <Link
            key={i.slug}
            href={`/industries/${i.slug}`}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
          >
            <div className="text-sm font-semibold">{i.title}</div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {i.description}
            </p>
          </Link>
        ))}
        {industries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
            Add MDX files in <code>content/industries</code>.
          </div>
        ) : null}
      </div>
    </div>
  );
}

