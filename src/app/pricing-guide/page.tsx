import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Odoo Pricing Guide (Bangladesh)",
  description:
    "Community pricing guide for Odoo in Bangladesh: what affects total cost including implementation, customization, hosting, training, and support.",
  alternates: { canonical: "/pricing-guide" },
};

export default function PricingGuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">
        Odoo pricing guide (Bangladesh)
      </h1>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        This is a neutral overview of what usually contributes to Odoo ERP total
        cost. Exact cost depends on scope, complexity, and rollout approach.
      </p>

      <div className="prose prose-zinc mt-8 max-w-none">
        <h2>What typically affects cost</h2>
        <ul>
          <li>Number of users and departments</li>
          <li>Modules selected (Accounting, Inventory, Manufacturing, etc.)</li>
          <li>Customization vs configuration</li>
          <li>Integrations (eCommerce, logistics, payments, BI)</li>
          <li>Data migration complexity</li>
          <li>Hosting (cloud/on-prem), monitoring, backups</li>
          <li>Training and change management</li>
        </ul>

        <h2>How to reduce risk</h2>
        <ul>
          <li>Start with a small v1 scope and measurable outcomes</li>
          <li>Run a proof-of-concept for the hardest workflow</li>
          <li>Use a checklist for UAT and go-live readiness</li>
        </ul>
      </div>

      <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 text-sm shadow-sm">
        <div className="font-medium">Want a scope-based estimate?</div>
        <p className="mt-1 text-zinc-600">
          Share your industry, departments, and timeline. We’ll respond with a
          checklist-first approach and connect you to relevant specialists.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Request consultation
          </Link>
          <Link
            href="/resources/erp-checklist"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-5 py-3 text-sm font-medium hover:bg-zinc-50"
          >
            Download checklist
          </Link>
        </div>
      </div>
    </div>
  );
}

