import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Odoo Developer Resources (Bangladesh)",
  description:
    "Developer resources for learning Odoo in Bangladesh: Python, ORM, module patterns, views, QWeb, OWL, integrations, and deployment.",
  pathname: "/developer-resources",
});

export default function DeveloperResourcesPage() {
  return (
    <div className="ob-container ob-section">
      <div className="max-w-3xl">
        <h1 className="ob-h1">Developer resources</h1>
        <p className="ob-lead mt-4">
          Curated learning paths for Odoo development — designed for Bangladesh-based learners and
          professionals.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Link href="/training/technical" className="ob-card p-6 transition hover:shadow-md">
          <div className="text-lg font-semibold tracking-tight">Technical topic pages</div>
          <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
            Module development, ORM, XML views, QWeb, OWL, APIs, Docker, deployment.
          </p>
          <div className="mt-4 text-sm font-medium">Explore →</div>
        </Link>
        <Link href="/contact" className="ob-card p-6 transition hover:shadow-md">
          <div className="text-lg font-semibold tracking-tight">Ask a developer question</div>
          <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
            Share your use case and constraints. We’ll point you to relevant docs and patterns.
          </p>
          <div className="mt-4 text-sm font-medium">Contact →</div>
        </Link>
      </div>
    </div>
  );
}

