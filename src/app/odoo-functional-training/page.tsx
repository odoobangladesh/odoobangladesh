import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Odoo Functional Training Bangladesh",
  description:
    "Learn Odoo functional consulting in Bangladesh: Sales, CRM, Purchase, Inventory, Accounting, Manufacturing, POS, HR and process analysis.",
  pathname: "/odoo-functional-training",
});

export default function OdooFunctionalTrainingPage() {
  return (
    <div className="ob-container ob-section">
      <div className="max-w-3xl">
        <h1 className="ob-h1">Odoo Functional Training</h1>
        <p className="ob-lead mt-4">
          A community-first training track for functional consultants and ERP professionals in
          Bangladesh — focusing on business processes, configuration, and implementation discipline.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <div className="ob-card p-6 lg:col-span-2">
          <div className="text-lg font-semibold tracking-tight">Topics</div>
          <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
            Sales, CRM, Purchase, Inventory, Accounting, Manufacturing, HR, Payroll, POS, and
            consulting skills (process analysis, UAT, training, change management).
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/training/functional" className="ob-btn ob-btn-primary">
              View topic pages
            </Link>
            <Link href="/contact" className="ob-btn ob-btn-secondary">
              Course inquiry
            </Link>
          </div>
        </div>

        <div className="ob-card p-6">
          <div className="text-lg font-semibold tracking-tight">Audience</div>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-[color:var(--color-muted)]">
            <li>Fresh graduates</li>
            <li>ERP professionals</li>
            <li>Business analysts</li>
            <li>Accountants</li>
            <li>Entrepreneurs</li>
            <li>Career switchers</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 ob-card p-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="text-lg font-semibold tracking-tight">Training lead-gen</div>
            <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
              Get the syllabus, free workshop schedule, and a “book a career consultation” option
              via the contact form.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/resources/erp-checklist" className="ob-btn ob-btn-secondary">
              Free checklist
            </Link>
            <Link href="/contact" className="ob-btn ob-btn-primary">
              Book consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

