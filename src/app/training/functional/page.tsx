import Link from "next/link";
import { Metadata } from "next";
import { FeatureRows, PageIntro } from "@/components/visual-ui";
import { listDocs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Odoo Functional Training (Bangladesh)",
  description:
    "Odoo Functional training pathway in Bangladesh: module topics, consulting skills, batch schedule, syllabus download, and workshop registration.",
  alternates: { canonical: "/training/functional" },
};

export default async function FunctionalTrainingPage() {
  const topics = (await listDocs("training-functional")).sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  return (
    <div className="site-container section-y">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <PageIntro
            title="Odoo Functional Training"
            description="For fresh graduates, ERP professionals, business analysts, accountants, entrepreneurs, and career switchers."
          />

          <div className="mt-6 card-standard p-6">
            <div className="text-sm font-semibold text-ink">What you’ll learn</div>
            <div className="mt-3">
              <FeatureRows
                ariaLabel="What you’ll learn"
                items={[
                  {
                    icon: "search",
                    title: "Business process analysis and requirement discovery",
                  },
                  {
                    icon: "boxes",
                    title:
                      "Core modules: Sales, CRM, Purchase, Inventory, Accounting",
                  },
                  {
                    icon: "settings",
                    title: "Operations: Manufacturing, HR, Payroll, POS, Project",
                  },
                  {
                    icon: "users",
                    title:
                      "Consulting skills: scope, UAT, training, change management",
                  },
                ]}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Join next training batch
            </Link>
            <Link href="/resources/functional-syllabus" className="btn-secondary">
              Download syllabus
            </Link>
            <Link href="/events" className="btn-secondary">
              Register workshop
            </Link>
          </div>
        </div>

        <aside className="md:col-span-5">
          <div className="card-standard p-6">
            <div className="text-sm font-semibold text-ink">Functional topics</div>
            <p className="mt-1 text-sm text-ink-muted">
              Study one module area at a time.
            </p>
            <div className="mt-4 grid gap-0">
              {topics.map((t) => (
                <Link
                  key={t.slug}
                  className="group flex items-center justify-between border-b border-line py-3 text-sm text-ink last:border-b-0 hover:text-brand"
                  href={`/training/functional/${t.slug}`}
                >
                  <span>{t.title}</span>
                  <span
                    className="card-arrow text-ink-muted transition-transform duration-[var(--dur-fast)] group-hover:translate-x-[3px]"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              ))}
              {topics.length === 0 ? (
                <div className="text-sm text-ink-muted">
                  Add MDX in <code>content/training-functional</code>.
                </div>
              ) : null}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
