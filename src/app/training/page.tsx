import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Odoo Training Bangladesh",
  description:
    "Community-led Odoo Functional & Technical training pathways in Bangladesh: syllabus, workshops, batch calendar, and career consultation.",
  alternates: { canonical: "/training" },
};

export default function TrainingIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Odoo Training (Bangladesh)
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Choose a pathway: Functional (business processes + modules) or
          Technical (development + customization). This portal focuses on
          learning outcomes, roadmaps, and community support.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link
          href="/training/functional"
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-zinc-300"
        >
          <div className="text-sm font-semibold">Functional Training</div>
          <p className="mt-2 text-sm text-zinc-600">
            Sales, CRM, Purchase, Inventory, Accounting, Manufacturing, HR, POS,
            Project — plus business process analysis and consulting skills.
          </p>
          <div className="mt-4 text-sm font-medium underline underline-offset-4">
            Explore functional pathway
          </div>
        </Link>
        <Link
          href="/training/technical"
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-zinc-300"
        >
          <div className="text-sm font-semibold">Technical Training</div>
          <p className="mt-2 text-sm text-zinc-600">
            Python for Odoo, ORM, module development, XML/QWeb, API integrations,
            OWL, deployment, Docker, and performance optimization.
          </p>
          <div className="mt-4 text-sm font-medium underline underline-offset-4">
            Explore technical pathway
          </div>
        </Link>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <Link
          href="/resources/erp-checklist"
          className="rounded-2xl border border-zinc-200 p-6 text-sm hover:bg-zinc-50"
        >
          <div className="font-medium">Download ERP checklist</div>
          <p className="mt-1 text-zinc-600">
            A planning checklist for implementations and learning.
          </p>
        </Link>
        <Link
          href="/contact"
          className="rounded-2xl border border-zinc-200 p-6 text-sm hover:bg-zinc-50"
        >
          <div className="font-medium">Book a free career consultation</div>
          <p className="mt-1 text-zinc-600">
            Get a roadmap based on your background and goals.
          </p>
        </Link>
        <Link
          href="/events"
          className="rounded-2xl border border-zinc-200 p-6 text-sm hover:bg-zinc-50"
        >
          <div className="font-medium">Workshops & webinars</div>
          <p className="mt-1 text-zinc-600">
            Register for free sessions and community learning events.
          </p>
        </Link>
      </div>
    </div>
  );
}

