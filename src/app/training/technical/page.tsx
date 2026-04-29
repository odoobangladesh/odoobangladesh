import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { listDocs } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Odoo Technical Training Topics",
  description:
    "Technical training topics for Odoo development in Bangladesh: Python, PostgreSQL, ORM, module development, XML views, QWeb, OWL, APIs, Docker, and deployment.",
  pathname: "/training/technical",
});

export default function TechnicalTrainingTopicsPage() {
  const topics = listDocs("training-technical");

  return (
    <div className="ob-container ob-section">
      <div className="max-w-3xl">
        <h1 className="ob-h1">Technical training topics</h1>
        <p className="ob-lead mt-4">
          Designed for developers, software engineers, CS students, freelancers, and technical
          consultants.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {topics.map((t) => (
          <Link key={t.slug} href={t.canonicalPath} className="ob-card p-6 transition hover:shadow-md">
            <div className="text-lg font-semibold tracking-tight">{t.title}</div>
            {t.description ? (
              <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">{t.description}</p>
            ) : null}
            <div className="mt-4 text-sm font-medium">Open →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

