import Link from "next/link";
import { Metadata } from "next";
import { PageIntro } from "@/components/visual-ui";

export const metadata: Metadata = {
  title: "Odoo Partners in Bangladesh (Directory)",
  description:
    "A community directory to help you find Odoo partners and specialists in Bangladesh, based on expertise areas, industries, and training capability.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  return (
    <div className="site-container section-y">
      <PageIntro
        title="Odoo partners in Bangladesh"
        description="This is a community directory concept (work in progress). The goal is to help teams find the right specialists based on module expertise, industry experience, and training capability, without aggressive sales language."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="card-standard p-6">
          <div className="text-sm font-semibold text-ink">
            Functional specialists
          </div>
          <p className="mt-2 text-sm text-ink-muted">
            Accounting, Inventory, Manufacturing, HR, POS, reporting, UAT.
          </p>
        </div>
        <div className="card-standard p-6">
          <div className="text-sm font-semibold text-ink">
            Technical specialists
          </div>
          <p className="mt-2 text-sm text-ink-muted">
            Custom modules, integrations, performance optimization, deployment.
          </p>
        </div>
        <div className="card-standard p-6">
          <div className="text-sm font-semibold text-ink">Training providers</div>
          <p className="mt-2 text-sm text-ink-muted">
            Functional and technical training pathways with workshops/webinars.
          </p>
        </div>
      </div>

      <div className="mt-10 card-standard p-6 text-sm">
        <div className="font-medium text-ink">
          Need help finding the right expert?
        </div>
        <p className="mt-1 text-ink-muted">
          Share your industry, modules, and timeline. We’ll reply with resources
          first, then connect you with relevant specialists.
        </p>
        <Link href="/contact" className="btn-primary mt-4">
          Talk to an Odoo specialist
        </Link>
      </div>
    </div>
  );
}
