import Link from "next/link";
import { Metadata } from "next";
import { PageIntro } from "@/components/visual-ui";
import { listDocs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Odoo Blog",
  description:
    "Community articles about Odoo ERP in Bangladesh: implementation guidance, module explainers, career paths, comparisons, and training roadmaps.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const posts = (await listDocs("blog")).sort((a, b) =>
    (b.date ?? "").localeCompare(a.date ?? ""),
  );

  return (
    <div className="site-container section-y">
      <PageIntro
        title="Odoo Blog"
        description="Neutral, Bangladesh-focused guides to help you learn Odoo, plan ERP implementations, and build your career."
      />

      <ul className="directory-list directory-list-1 mt-8">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="directory-row group">
              <span className="directory-row-copy min-w-0">
                <span className="directory-row-title">
                  {p.title}
                  {p.date ? (
                    <span className="directory-row-meta">{p.date}</span>
                  ) : null}
                </span>
                <span className="directory-row-desc">{p.description}</span>
              </span>
              <span className="directory-row-chevron" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {posts.length === 0 ? (
        <div className="mt-8 border border-dashed border-line px-4 py-6 text-sm text-ink-muted">
          No posts yet. Add MDX files in <code>content/blog</code>.
        </div>
      ) : null}
    </div>
  );
}
