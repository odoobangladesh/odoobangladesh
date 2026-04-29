import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Odoo Pricing Guide (Bangladesh)",
  description:
    "A neutral pricing guide for Odoo in Bangladesh: edition choice, hosting, implementation scope, customization, training, and support.",
  pathname: "/pricing-guide",
});

export default function PricingGuidePage() {
  return (
    <div className="ob-container ob-section">
      <div className="max-w-3xl">
        <h1 className="ob-h1">Pricing guide</h1>
        <p className="ob-lead mt-4">
          A neutral overview of what typically impacts Odoo cost in Bangladesh — to help you plan
          budget and scope.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {[
          { t: "Edition choice", d: "Community vs Enterprise — features and trade-offs." },
          { t: "Hosting", d: "Cloud vs on-prem vs managed hosting." },
          { t: "Implementation scope", d: "Departments, workflows, and reporting requirements." },
          { t: "Customization", d: "Minimize custom code; optimize processes first." },
          { t: "Training", d: "Role-based training affects adoption and timeline." },
          { t: "Support", d: "Post go-live monitoring, updates, and governance." },
        ].map((x) => (
          <div key={x.t} className="ob-card p-6">
            <div className="text-lg font-semibold tracking-tight">{x.t}</div>
            <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">{x.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/blog/odoo-implementation-cost-in-bangladesh" className="ob-btn ob-btn-secondary">
          Implementation cost guide
        </Link>
        <Link href="/contact" className="ob-btn ob-btn-primary">
          Request consultation
        </Link>
      </div>
    </div>
  );
}

