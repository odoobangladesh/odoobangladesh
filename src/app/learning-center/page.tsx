import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Odoo Learning Center (Bangladesh)",
  description:
    "Learning paths, resources, and guides for Odoo ERP in Bangladesh: functional pathway, technical pathway, implementation, pricing, and career guidance.",
  alternates: { canonical: "/learning-center" },
};

export default function LearningCenterPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Learning Center</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          A structured starting point for learning Odoo ERP in Bangladesh — for
          businesses, professionals, students, and developers.
        </p>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <Link
          href="/training/functional"
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-zinc-300"
        >
          <div className="text-sm font-semibold">Functional pathway</div>
          <p className="mt-2 text-sm text-zinc-600">
            Learn business process analysis, ERP implementation concepts, and
            core modules like Sales, Inventory, and Accounting.
          </p>
        </Link>

        <Link
          href="/training/technical"
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-zinc-300"
        >
          <div className="text-sm font-semibold">Technical pathway</div>
          <p className="mt-2 text-sm text-zinc-600">
            Learn Odoo development: Python, ORM, module development, XML/QWeb,
            OWL, deployment, and performance.
          </p>
        </Link>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <Link
          href="/implementation-guide"
          className="rounded-2xl border border-zinc-200 p-6 text-sm hover:bg-zinc-50"
        >
          <div className="font-medium">Implementation Guide</div>
          <p className="mt-1 text-zinc-600">
            Scope, timeline, data, UAT, training, go-live, and common mistakes.
          </p>
        </Link>
        <Link
          href="/pricing-guide"
          className="rounded-2xl border border-zinc-200 p-6 text-sm hover:bg-zinc-50"
        >
          <div className="font-medium">Pricing Guide</div>
          <p className="mt-1 text-zinc-600">
            Understand cost components: licenses, implementation, customization,
            hosting, and training.
          </p>
        </Link>
        <Link
          href="/odoo-career-guide"
          className="rounded-2xl border border-zinc-200 p-6 text-sm hover:bg-zinc-50"
        >
          <div className="font-medium">Career Path Guide</div>
          <p className="mt-1 text-zinc-600">
            Role map, skills checklist, portfolio ideas, and interview prep.
          </p>
        </Link>
      </section>

      <section className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold">Explore by topic</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Link className="underline underline-offset-4" href="/modules">
            Odoo modules directory
          </Link>
          <Link className="underline underline-offset-4" href="/industries">
            Odoo for industries (Bangladesh)
          </Link>
          <Link className="underline underline-offset-4" href="/comparisons">
            Odoo vs other ERP comparisons
          </Link>
          <Link className="underline underline-offset-4" href="/resources/erp-checklist">
            Free ERP checklist (Bangladesh)
          </Link>
        </div>
      </section>
    </div>
  );
}

