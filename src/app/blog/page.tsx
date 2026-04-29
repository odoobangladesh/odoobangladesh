import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { listDocs } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Odoo Blog (Bangladesh)",
  description:
    "Community-written guides on Odoo ERP, implementation, careers, and training in Bangladesh. Practical, neutral, and learning-focused.",
  pathname: "/blog",
});

export default function BlogIndexPage() {
  const posts = listDocs("blog");

  return (
    <div className="ob-container ob-section">
      <div className="max-w-3xl">
        <h1 className="ob-h1">Odoo Blog</h1>
        <p className="ob-lead mt-4">
          Guides on Odoo ERP in Bangladesh: implementation cost, module overviews, career roadmaps,
          and neutral comparisons.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <Link key={p.slug} href={p.canonicalPath} className="ob-card p-6 transition hover:shadow-md">
            <div className="text-xs text-[color:var(--color-muted)]">
              {p.minutes} min read{p.date ? ` · ${p.date}` : ""}
            </div>
            <div className="mt-2 text-lg font-semibold tracking-tight">{p.title}</div>
            {p.description ? (
              <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">{p.description}</p>
            ) : null}
            <div className="mt-4 text-sm font-medium">Read →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

