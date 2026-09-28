import Link from "next/link";
import { Metadata } from "next";
import { listDocs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Odoo vs Other ERP (Comparisons)",
  description:
    "ERP comparison guides for Bangladesh: Odoo vs ERPNext, Odoo vs SAP Business One, and more — with practical selection checklists.",
  alternates: { canonical: "/comparisons" },
};

export default async function ComparisonsIndexPage() {
  const comparisons = await listDocs("comparisons");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Odoo vs Other ERP
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Neutral comparisons to help you shortlist ERP options based on your
          industry, budget, and operational needs.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {comparisons.map((c) => (
          <Link
            key={c.slug}
            href={`/comparisons/${c.slug}`}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-zinc-300"
          >
            <div className="text-sm font-semibold">{c.title}</div>
            <p className="mt-2 text-sm text-zinc-600">
              {c.description}
            </p>
          </Link>
        ))}
        {comparisons.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-600">
            Add MDX files in <code>content/comparisons</code>.
          </div>
        ) : null}
      </div>
    </div>
  );
}

