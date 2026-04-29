import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { listDocs } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Odoo Modules Directory",
  description:
    "Explore Odoo modules with Bangladesh-focused notes: Accounting, Sales, CRM, Inventory, Purchase, Manufacturing, POS, and more.",
  pathname: "/modules",
});

export default function ModulesIndexPage() {
  const modules = listDocs("modules");

  return (
    <div className="ob-container ob-section">
      <div className="max-w-3xl">
        <h1 className="ob-h1">Odoo Modules</h1>
        <p className="ob-lead mt-4">
          A community directory of Odoo modules — written for Bangladesh-based businesses and
          learners. Start with the modules that match your scope.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {modules.map((m) => (
          <Link key={m.slug} href={m.canonicalPath} className="ob-card p-6 transition hover:shadow-md">
            <div className="text-lg font-semibold tracking-tight">{m.title}</div>
            {m.description ? (
              <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">{m.description}</p>
            ) : null}
            <div className="mt-4 text-sm font-medium">Open →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

