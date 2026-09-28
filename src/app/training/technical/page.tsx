import Link from "next/link";
import { Metadata } from "next";
import { listDocs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Odoo Technical Training (Bangladesh)",
  description:
    "Odoo Technical training pathway in Bangladesh: development basics, module building, APIs, OWL, deployment, Docker, and performance optimization.",
  alternates: { canonical: "/training/technical" },
};

export default async function TechnicalTrainingPage() {
  const topics = await listDocs("training-technical");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <h1 className="text-3xl font-semibold tracking-tight">
            Odoo Technical Training
          </h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            For developers, software engineers, CS students, freelancers, and
            technical consultants.
          </p>

          <div className="mt-6 rounded-2xl border border-zinc-200 p-6">
            <div className="text-sm font-semibold">What you’ll learn</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
              <li>Python for Odoo + PostgreSQL fundamentals</li>
              <li>Odoo ORM, models, security, and module architecture</li>
              <li>Views: XML, QWeb, reports, website basics</li>
              <li>Integrations: REST APIs, webhooks, third-party services</li>
              <li>OWL + modern frontend patterns in Odoo</li>
              <li>Deployment, Docker, monitoring, performance optimization</li>
            </ul>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Join next training batch
            </Link>
            <Link
              href="/resources/technical-syllabus"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-5 py-3 text-sm font-medium hover:bg-zinc-50"
            >
              Download syllabus
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-5 py-3 text-sm font-medium hover:bg-zinc-50"
            >
              Register workshop
            </Link>
          </div>
        </div>

        <aside className="md:col-span-5">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold">Technical topics</div>
            <p className="mt-1 text-sm text-zinc-600">
              Topic landing pages (programmatic SEO).
            </p>
            <div className="mt-4 grid gap-2">
              {topics.map((t) => (
                <Link
                  key={t.slug}
                  className="rounded-xl border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50"
                  href={`/training/technical/${t.slug}`}
                >
                  {t.title}
                </Link>
              ))}
              {topics.length === 0 ? (
                <div className="text-sm text-zinc-600">
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

