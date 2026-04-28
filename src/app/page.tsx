import Link from "next/link";
import { NewsletterCard } from "@/components/newsletter-card";
import { SeoSectionCard } from "@/components/seo-section-card";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <section className="grid gap-10 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Independent Odoo community portal for Bangladesh
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Learn, explore & connect with the Odoo ecosystem in Bangladesh.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Guides for Odoo ERP implementation, module learning paths, career
            roadmaps, comparison articles, events, and training resources — built
            for businesses, professionals, developers, and learners.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/learning-center"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
            >
              Explore resources
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              Request ERP consultation
            </Link>
            <Link
              href="/training"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              Explore training programs
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="rounded-full border border-zinc-200 px-3 py-1 dark:border-zinc-800">
              Odoo Bangladesh
            </span>
            <span className="rounded-full border border-zinc-200 px-3 py-1 dark:border-zinc-800">
              Odoo ERP Bangladesh
            </span>
            <span className="rounded-full border border-zinc-200 px-3 py-1 dark:border-zinc-800">
              Odoo functional training
            </span>
            <span className="rounded-full border border-zinc-200 px-3 py-1 dark:border-zinc-800">
              Odoo technical training
            </span>
          </div>
        </div>

        <div className="md:col-span-5">
          <NewsletterCard />
        </div>
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-3">
        <SeoSectionCard
          title="Odoo ERP implementation in Bangladesh"
          description="Implementation guide, planning checklist, timelines, and common pitfalls."
          href="/implementation-guide"
        />
        <SeoSectionCard
          title="Odoo training (functional & technical)"
          description="Learning paths, batch calendar, syllabus downloads, and workshop registration."
          href="/training"
        />
        <SeoSectionCard
          title="Odoo modules directory"
          description="Browse ERP modules with Bangladesh-focused use-cases and learning resources."
          href="/modules"
        />
      </section>

      <section className="mt-14 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <h2 className="text-lg font-semibold">Popular Odoo pages</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Programmatic landing pages designed for topical authority and internal
          linking.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Link className="underline underline-offset-4" href="/odoo-accounting-bangladesh">
            Odoo Accounting in Bangladesh
          </Link>
          <Link className="underline underline-offset-4" href="/odoo-for-garments-industry">
            Odoo for Garments Industry
          </Link>
          <Link className="underline underline-offset-4" href="/odoo-vs-erpnext">
            Odoo vs ERPNext
          </Link>
          <Link className="underline underline-offset-4" href="/odoo-functional-training">
            Odoo Functional Training
          </Link>
        </div>
      </section>
    </div>
  );
}
