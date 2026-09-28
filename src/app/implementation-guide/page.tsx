import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Odoo Implementation Guide (Bangladesh)",
  description:
    "A practical, community implementation guide for Odoo ERP in Bangladesh: scope, data, processes, timeline, UAT, training, and go-live.",
  alternates: { canonical: "/implementation-guide" },
};

export default function ImplementationGuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">
        Odoo implementation guide (Bangladesh)
      </h1>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        A neutral guide to help teams plan an Odoo ERP implementation — from
        discovery to go-live. Use this as a checklist for discussions with
        internal stakeholders and external specialists.
      </p>

      <div className="prose prose-zinc mt-8 max-w-none">
        <h2>Phase 1: Discovery and scope</h2>
        <ul>
          <li>Define success metrics (time, cost, accuracy, visibility)</li>
          <li>List must-have workflows per department</li>
          <li>Decide what’s out-of-scope for v1</li>
        </ul>

        <h2>Phase 2: Process mapping</h2>
        <ul>
          <li>Document “as-is” process and pain points</li>
          <li>Design “to-be” process and approvals</li>
          <li>Confirm reporting requirements</li>
        </ul>

        <h2>Phase 3: Data readiness</h2>
        <ul>
          <li>Identify master data owners (products, customers, COA)</li>
          <li>Clean and standardize data early</li>
          <li>Plan migration rounds (dry run → final)</li>
        </ul>

        <h2>Phase 4: Configuration and customization</h2>
        <ul>
          <li>Prefer configuration first, customize only when needed</li>
          <li>Keep customizations documented and testable</li>
          <li>Plan integrations (accounting, eCommerce, logistics)</li>
        </ul>

        <h2>Phase 5: Testing (UAT) and training</h2>
        <ul>
          <li>UAT scripts for your critical flows</li>
          <li>Role-based training for end users</li>
          <li>Admin training for system owners</li>
        </ul>

        <h2>Phase 6: Go-live and stabilization</h2>
        <ul>
          <li>Cutover checklist and rollback plan</li>
          <li>Hypercare support window</li>
          <li>Post go-live improvements roadmap</li>
        </ul>
      </div>

      <div className="mt-10 grid gap-3 rounded-2xl border border-zinc-200 bg-white p-6 text-sm shadow-sm">
        <div className="font-medium">Helpful next steps</div>
        <div className="grid gap-2">
          <Link className="underline underline-offset-4" href="/resources/erp-checklist">
            Download ERP readiness checklist
          </Link>
          <Link className="underline underline-offset-4" href="/modules">
            Review module-by-module scope
          </Link>
          <Link className="underline underline-offset-4" href="/contact">
            Request a free ERP assessment call
          </Link>
        </div>
      </div>
    </div>
  );
}

