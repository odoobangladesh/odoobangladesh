import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about Odoo in Bangladesh: implementation, customization, training, and how to choose scope.",
  pathname: "/faq",
});

export default function FaqPage() {
  return (
    <div className="ob-container ob-section">
      <div className="max-w-3xl">
        <h1 className="ob-h1">FAQ</h1>
        <p className="ob-lead mt-4">
          Short answers with links to deeper guides. Community portal tone — neutral and practical.
        </p>
      </div>

      <div className="mt-10 grid gap-4">
        {[
          {
            q: "Is Odoo good for SMEs in Bangladesh?",
            a: "Often yes — if you start with a clear MVP scope and avoid over-customization early.",
            href: "/implementation-guide",
          },
          {
            q: "Should I learn functional or technical Odoo first?",
            a: "Functional for process + configuration; technical for customization + integrations. Both are valuable.",
            href: "/training",
          },
          {
            q: "What affects Odoo implementation cost?",
            a: "Scope, users, data migration, customizations, and training/adoption plan.",
            href: "/blog/odoo-implementation-cost-in-bangladesh",
          },
        ].map((x) => (
          <div key={x.q} className="ob-card p-6">
            <div className="text-lg font-semibold tracking-tight">{x.q}</div>
            <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">{x.a}</p>
            <div className="mt-4">
              <Link href={x.href} className="text-sm font-medium underline underline-offset-4">
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

