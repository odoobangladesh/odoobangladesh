import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { listDocs } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Odoo Functional Training Topics",
  description:
    "Functional training topics for Odoo in Bangladesh: Sales, CRM, Purchase, Inventory, Accounting, Manufacturing, HR, Payroll, POS, and consulting skills.",
  pathname: "/training/functional",
});

export default function FunctionalTrainingTopicsPage() {
  const topics = listDocs("training-functional");

  return (
    <div className="ob-container ob-section">
      <div className="max-w-3xl">
        <h1 className="ob-h1">Functional training topics</h1>
        <p className="ob-lead mt-4">
          Designed for fresh graduates, ERP professionals, business analysts, accountants, and
          career switchers.
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

