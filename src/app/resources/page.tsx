import Link from "next/link";
import type { Metadata } from "next";
import { PageIntro } from "@/components/visual-ui";
import { listDocs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Odoo Resources Bangladesh",
  description:
    "Downloadable and practical Odoo resources for Bangladesh: ERP checklist, functional syllabus, and technical syllabus.",
  alternates: { canonical: "/resources" },
};

export default async function ResourcesIndexPage() {
  const resources = await listDocs("resources");

  return (
    <div className="site-container section-y">
      <PageIntro
        eyebrow="Downloads & worksheets"
        title="Resources"
        description="Practical assets that support learning and evaluation. Some items unlock with an email so we can send related updates."
      />

      <ul className="directory-list directory-list-1 mt-8">
        {resources.map((doc) => (
          <li key={doc.slug}>
            <Link href={doc.path} className="directory-row group">
              <span className="directory-row-copy min-w-0">
                <span className="directory-row-title">{doc.title}</span>
                <span className="directory-row-desc">{doc.description}</span>
              </span>
              <span className="directory-row-chevron" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
