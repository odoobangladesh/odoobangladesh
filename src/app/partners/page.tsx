import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Odoo Partners in Bangladesh (Directory)",
  description:
    "A community directory to help you find Odoo partners and specialists in Bangladesh — based on expertise areas, industries, and training capability.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Odoo partners in Bangladesh
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          This is a community directory concept (work in progress). The goal is
          to help teams find the right specialists based on module expertise,
          industry experience, and training capability — without aggressive
          sales language.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-sm font-semibold">Functional specialists</div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Accounting, Inventory, Manufacturing, HR, POS, reporting, UAT.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-sm font-semibold">Technical specialists</div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Custom modules, integrations, performance optimization, deployment.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-sm font-semibold">Training providers</div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Functional and technical training pathways with workshops/webinars.
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="font-medium">Need help finding the right expert?</div>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Share your industry, modules, and timeline. We’ll reply with resources
          first, then connect you with relevant specialists.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
        >
          Talk to an Odoo specialist
        </Link>
      </div>
    </div>
  );
}

