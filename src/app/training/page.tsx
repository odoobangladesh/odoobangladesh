import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Odoo Training Bangladesh",
  description:
    "Odoo Functional and Technical Training in Bangladesh. Track-based learning: functional consulting and Odoo development.",
  pathname: "/training",
});

export default function TrainingHubPage() {
  return (
    <div className="ob-container ob-section">
      <div className="max-w-3xl">
        <h1 className="ob-h1">Odoo Training in Bangladesh</h1>
        <p className="ob-lead mt-4">
          Choose your track. Functional training is for process and ERP consulting. Technical training
          is for Odoo development and customization. This portal is community-focused and
          education-first.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <Link href="/odoo-functional-training" className="ob-card p-8 transition hover:shadow-md">
          <div className="text-sm text-[color:var(--color-muted)]">Track 1</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight">Functional Training</div>
          <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
            Sales, CRM, Purchase, Inventory, Accounting, Manufacturing, HR, Payroll, POS, and business
            process analysis.
          </p>
          <div className="mt-5 text-sm font-medium">Explore topics →</div>
        </Link>

        <Link href="/odoo-technical-training" className="ob-card p-8 transition hover:shadow-md">
          <div className="text-sm text-[color:var(--color-muted)]">Track 2</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight">Technical Training</div>
          <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
            Python for Odoo, PostgreSQL, ORM, module development, XML views, QWeb, OWL, integrations,
            deployment, Docker, and performance.
          </p>
          <div className="mt-5 text-sm font-medium">Explore topics →</div>
        </Link>
      </div>

      <div className="mt-10 ob-card p-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="text-lg font-semibold tracking-tight">Lead-gen (built into learning)</div>
            <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
              Want a syllabus, workshop schedule, or career consultation? Use the contact form and
              select “Training inquiry”.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/contact" className="ob-btn ob-btn-primary">
              Course inquiry
            </Link>
            <Link href="/resources" className="ob-btn ob-btn-secondary">
              Download syllabus resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

