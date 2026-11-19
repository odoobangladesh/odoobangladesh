import Link from "next/link";
import { Metadata } from "next";
import { FeatureRows, PageIntro } from "@/components/visual-ui";
import { listDocs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Odoo Technical Training (Bangladesh)",
  description:
    "Odoo Technical training pathway in Bangladesh: development basics, module building, APIs, OWL, deployment, Docker, and performance optimization.",
  alternates: { canonical: "/training/technical" },
};

export default async function TechnicalTrainingPage() {
  const topics = (await listDocs("training-technical")).sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  return (
    <div className="site-container section-y">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <PageIntro
            title="Odoo Technical Training"
            description="For developers, software engineers, CS students, freelancers, and technical consultants."
          />

          <div className="mt-6 card-standard p-6">
            <div className="text-sm font-semibold text-ink">What you’ll learn</div>
            <div className="mt-3">
              <FeatureRows
                ariaLabel="What you’ll learn"
                items={[
                  {
                    icon: "book",
                    title: "Python for Odoo + PostgreSQL fundamentals",
                  },
                  {
                    icon: "database",
                    title: "Odoo ORM, models, security, and module architecture",
                  },
                  {
                    icon: "layers",
                    title: "Views: XML, QWeb, reports, website basics",
                  },
                  {
                    icon: "plug",
                    title: "Integrations: REST APIs, webhooks, third-party services",
                  },
                  {
                    icon: "wrench",
                    title: "OWL + modern frontend patterns in Odoo",
                  },
                  {
                    icon: "rocket",
                    title:
                      "Deployment, Docker, monitoring, performance optimization",
                  },
                ]}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Join next training batch
            </Link>
            <Link href="/resources/technical-syllabus" className="btn-secondary">
              Download syllabus
            </Link>
            <Link href="/events" className="btn-secondary">
              Register workshop
            </Link>
          </div>
        </div>

        <aside className="md:col-span-5">
          <div className="card-standard p-6">
            <div className="text-sm font-semibold text-ink">Technical topics</div>
            <p className="mt-1 text-sm text-ink-muted">
              Study one development area at a time.
            </p>
            <div className="mt-4 grid gap-0">
              {topics.map((t) => (
                <Link
                  key={t.slug}
                  className="group flex items-center justify-between border-b border-line py-3 text-sm text-ink last:border-b-0 hover:text-brand"
                  href={`/training/technical/${t.slug}`}
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
                  Add MDX in <code>content/training-technical</code>.
                </div>
              ) : null}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
