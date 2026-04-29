import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { listDocs } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Odoo Industries (Bangladesh)",
  description:
    "Industry-focused Odoo pages for Bangladesh: garments, retail, distribution, services, and SMEs — with recommended modules and rollout notes.",
  pathname: "/industries",
});

export default function IndustriesIndexPage() {
  const industries = listDocs("industries");

  return (
    <div className="ob-container ob-section">
      <div className="max-w-3xl">
        <h1 className="ob-h1">Industries</h1>
        <p className="ob-lead mt-4">
          Industry pages designed for programmatic SEO and practical learning. Each page links back
          to relevant modules, comparisons, and the implementation guide.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {industries.map((i) => (
          <Link key={i.slug} href={i.canonicalPath} className="ob-card p-6 transition hover:shadow-md">
            <div className="text-lg font-semibold tracking-tight">{i.title}</div>
            {i.description ? (
              <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">{i.description}</p>
            ) : null}
            <div className="mt-4 text-sm font-medium">Explore →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

