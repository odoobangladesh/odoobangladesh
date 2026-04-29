import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Odoo Technical Training Bangladesh",
  description:
    "Learn Odoo development in Bangladesh: Python, ORM, module development, XML views, QWeb, OWL, integrations, deployment, Docker, and performance.",
  pathname: "/odoo-technical-training",
});

export default function OdooTechnicalTrainingPage() {
  return (
    <div className="ob-container ob-section">
      <div className="max-w-3xl">
        <h1 className="ob-h1">Odoo Technical Training</h1>
        <p className="ob-lead mt-4">
          A community-first technical track for developers in Bangladesh — focusing on practical
          Odoo customization, integrations, and deployment fundamentals.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <div className="ob-card p-6 lg:col-span-2">
          <div className="text-lg font-semibold tracking-tight">Topics</div>
          <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
            Python for Odoo, PostgreSQL, ORM, module development, XML views, QWeb, OWL, REST APIs,
            Docker deployment, and performance optimization.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/training/technical" className="ob-btn ob-btn-primary">
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
            <li>Developers</li>
            <li>Software engineers</li>
            <li>CS students</li>
            <li>Freelancers</li>
            <li>Technical consultants</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 ob-card p-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="text-lg font-semibold tracking-tight">Training lead-gen</div>
            <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
              Request the syllabus, join free webinars, or book a career consultation through the
              contact page.
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

