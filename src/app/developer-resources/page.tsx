import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Odoo Developer Resources (Bangladesh)",
  description:
    "Developer resources for learning Odoo: module development, ORM, XML/QWeb, OWL, integrations, deployment, and best practices.",
  alternates: { canonical: "/developer-resources" },
};

export default function DeveloperResourcesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Odoo developer resources
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          A curated, community-first starting point for technical learners in
          Bangladesh.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link
          href="/training/technical"
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
        >
          <div className="text-sm font-semibold">Technical training pathway</div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Structured learning path from basics to module development and
            deployment.
          </p>
        </Link>

        <Link
          href="/training/technical/module-development"
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
        >
          <div className="text-sm font-semibold">Module development topic</div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Models, security, views, menus, data files, and best practices.
          </p>
        </Link>
      </div>

      <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="font-medium">Need guidance?</div>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Ask for a roadmap based on your background (CS student, developer,
          freelancer, etc.).
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
        >
          Book a free career consultation
        </Link>
      </div>
    </div>
  );
}

