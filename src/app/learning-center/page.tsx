import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Odoo Learning Center",
  description:
    "A learning hub for Odoo in Bangladesh: beginner guides, implementation roadmap, module directory, and training tracks.",
  pathname: "/learning-center",
});

export default function LearningCenterPage() {
  return (
    <div className="ob-container ob-section">
      <div className="max-w-3xl">
        <h1 className="ob-h1">Learning center</h1>
        <p className="ob-lead mt-4">
          Start from basics, then go deeper. This hub connects blogs, module pages, industry pages,
          comparisons, and training topics.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {[
          { href: "/blog", title: "Blog", desc: "Guides on Odoo ERP in Bangladesh." },
          { href: "/modules", title: "Modules", desc: "Explore module-by-module capability." },
          { href: "/industries", title: "Industries", desc: "Industry-specific Odoo notes." },
          { href: "/comparisons", title: "Comparisons", desc: "Neutral ERP shortlisting guides." },
        ].map((c) => (
          <Link key={c.href} href={c.href} className="ob-card p-6 transition hover:shadow-md">
            <div className="text-lg font-semibold tracking-tight">{c.title}</div>
            <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">{c.desc}</p>
            <div className="mt-4 text-sm font-medium">Open →</div>
          </Link>
        ))}
      </div>

      <div className="mt-10 ob-card p-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="text-lg font-semibold tracking-tight">Choose a track</div>
            <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
              Functional consulting vs technical development — both have clear career paths in
              Bangladesh.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/odoo-functional-training" className="ob-btn ob-btn-primary">
              Functional track
            </Link>
            <Link href="/odoo-technical-training" className="ob-btn ob-btn-secondary">
              Technical track
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

