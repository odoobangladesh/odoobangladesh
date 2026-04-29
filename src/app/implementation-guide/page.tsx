import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Odoo Implementation Guide (Bangladesh)",
  description:
    "A neutral implementation guide for Odoo ERP projects in Bangladesh: discovery, scope, configuration, customization, UAT, training, and go-live.",
  pathname: "/implementation-guide",
});

export default function ImplementationGuidePage() {
  return (
    <div className="ob-container ob-section">
      <div className="max-w-3xl">
        <h1 className="ob-h1">Implementation guide</h1>
        <p className="ob-lead mt-4">
          A practical, neutral guide to implement Odoo ERP in Bangladesh — focused on scope clarity,
          change management, and long-term maintainability.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {[
          {
            title: "1) Discovery & scope",
            desc: "Define objectives, workflows, reports, and MVP scope.",
          },
          {
            title: "2) Configuration first",
            desc: "Use standard Odoo flows before customizing.",
          },
          {
            title: "3) Data & migration",
            desc: "Clean master data, map fields, validate imports.",
          },
          {
            title: "4) Testing (UAT)",
            desc: "Scenario-based tests with process owners and real data.",
          },
          {
            title: "5) Training & rollout",
            desc: "Champions, role-based training, and support plan.",
          },
          {
            title: "6) Post go-live",
            desc: "Monitor, iterate, document, and improve governance.",
          },
        ].map((s) => (
          <div key={s.title} className="ob-card p-6">
            <div className="text-lg font-semibold tracking-tight">{s.title}</div>
            <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 ob-card p-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="text-lg font-semibold tracking-tight">Free tools</div>
            <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
              Use the readiness checklist to align scope, data, roles, and timeline.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/resources/erp-checklist" className="ob-btn ob-btn-primary">
              ERP checklist
            </Link>
            <Link href="/contact" className="ob-btn ob-btn-secondary">
              Request consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

