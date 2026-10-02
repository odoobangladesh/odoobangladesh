import Link from "next/link";
import { NewsletterCard } from "@/components/newsletter-card";
import { SeoSectionCard } from "@/components/seo-section-card";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <section className="grid gap-10 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7">
          <p className="text-sm font-medium text-zinc-600">
            Independent community portal. Not affiliated with Odoo S.A.
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            The Odoo Community Platform for Bangladesh
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
            Learning paths, implementation guidance, and career support for
            businesses, professionals, developers, and learners exploring Odoo
            in Bangladesh.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/learning-center"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Explore resources
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              Request ERP consultation
            </Link>
            <Link
              href="/training"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              Explore training programs
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-zinc-600">
            <span className="rounded-full border border-zinc-200 px-3 py-1">
              Odoo Bangladesh
            </span>
            <span className="rounded-full border border-zinc-200 px-3 py-1">
              Odoo ERP Bangladesh
            </span>
            <span className="rounded-full border border-zinc-200 px-3 py-1">
              Odoo functional training
            </span>
            <span className="rounded-full border border-zinc-200 px-3 py-1">
              Odoo technical training
            </span>
          </div>
        </div>

        <div className="md:col-span-5">
          <NewsletterCard />
        </div>
      </section>

      <section className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SeoSectionCard
          title="Odoo implementation guide"
          description="Planning checklist, timelines, and common pitfalls for teams in Bangladesh."
          href="/implementation-guide"
        />
        <SeoSectionCard
          title="Odoo modules directory"
          description="Browse ERP modules with Bangladesh-focused use-cases and learning resources."
          href="/modules"
        />
        <SeoSectionCard
          title="Odoo for industries"
          description="How garments, retail, distribution, services, and other sectors use Odoo."
          href="/industries"
        />
        <SeoSectionCard
          title="Odoo training pathways"
          description="Functional and technical learning paths, syllabi, and workshop registration."
          href="/training"
        />
        <SeoSectionCard
          title="Odoo comparisons"
          description="Neutral comparisons to shortlist Odoo against other ERP options."
          href="/comparisons"
        />
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold">How to use this portal</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            A neutral reading order. Start with the topic, then decide whether
            you need a person.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-zinc-700">
            <li>
              <Link className="underline underline-offset-4" href="/learning-center">
                Learning Center
              </Link>{" "}
              to pick a pathway.
            </li>
            <li>
              <Link className="underline underline-offset-4" href="/modules">
                Modules
              </Link>{" "}
              and{" "}
              <Link className="underline underline-offset-4" href="/industries">
                Industries
              </Link>{" "}
              to map Odoo to a business.
            </li>
            <li>
              <Link className="underline underline-offset-4" href="/comparisons">
                Comparisons
              </Link>{" "}
              to shortlist ERP options.
            </li>
            <li>
              <Link className="underline underline-offset-4" href="/training">
                Training
              </Link>{" "}
              to plan functional or technical skills.
            </li>
          </ol>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Community principles</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            This site explains Odoo. It does not sell an implementation.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-700">
            <li>Neutral guides, with no agency pitch and no aggressive marketing.</li>
            <li>Resources come first. A consultation is optional.</li>
            <li>Open to businesses, professionals, students, and developers.</li>
            <li>Not affiliated with Odoo S.A.</li>
          </ul>
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-zinc-200 p-6">
        <h2 className="text-lg font-semibold">Popular Odoo pages</h2>
        <p className="mt-1 text-sm text-zinc-600">
          Starting points for accounting, garments, ERP comparisons, and
          functional training.
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
