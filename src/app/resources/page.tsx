import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { listDocs } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Odoo Resources (Bangladesh)",
  description:
    "Free resources for Odoo and ERP projects in Bangladesh: checklists, syllabuses, guides, and learning roadmaps.",
  pathname: "/resources",
});

export default function ResourcesIndexPage() {
  const docs = listDocs("resources");

  return (
    <div className="ob-container ob-section">
      <div className="max-w-3xl">
        <h1 className="ob-h1">Resources</h1>
        <p className="ob-lead mt-4">
          Downloadable checklists and learning material to help you plan and execute Odoo ERP
          projects in Bangladesh.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {docs.map((d) => (
          <Link key={d.slug} href={d.canonicalPath} className="ob-card p-6 transition hover:shadow-md">
            <div className="text-lg font-semibold tracking-tight">{d.title}</div>
            {d.description ? (
              <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">{d.description}</p>
            ) : null}
            <div className="mt-4 text-sm font-medium">Open →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

