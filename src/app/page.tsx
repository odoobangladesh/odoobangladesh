import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The Odoo Community Platform for Bangladesh",
  description:
    "Learn Odoo, explore implementation guidance, compare ERPs, and connect with the Odoo ecosystem in Bangladesh. Community-driven resources and training.",
  pathname: "/",
});

export default function Home() {
  return (
    <div>
      <section className="ob-hero-bg">
        <div className="ob-container ob-section">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="ob-fade-up">
              <p className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-white/60 px-3 py-1 text-xs text-[color:var(--color-muted)] shadow-sm backdrop-blur dark:bg-black/20">
                Community-driven • Educational • Bangladesh-focused
              </p>
              <h1 className="ob-h1 mt-5">
                The Odoo Community Platform for Bangladesh
              </h1>
              <p className="ob-lead mt-5 max-w-xl">
                Learn Odoo ERP, explore implementation guidance, compare ERP
                options, and connect with the Odoo ecosystem in Bangladesh —
                without corporate sales fluff.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/learning-center" className="ob-btn ob-btn-primary">
                  Explore resources
                </Link>
                <Link href="/contact" className="ob-btn ob-btn-secondary">
                  Request ERP consultation
                </Link>
                <Link href="/training" className="ob-btn ob-btn-ghost">
                  Explore training programs
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { k: "Modules", v: "Sales, CRM, Accounting, Inventory…" },
                  { k: "Industries", v: "Garments, retail, SME, services…" },
                  { k: "Training", v: "Functional & technical tracks" },
                ].map((item) => (
                  <div key={item.k} className="ob-card p-4">
                    <div className="text-sm font-semibold">{item.k}</div>
                    <div className="mt-1 text-sm text-[color:var(--color-muted)]">
                      {item.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ob-fade-up">
              <div className="ob-card p-6">
                <div className="text-sm font-semibold">Start here</div>
                <div className="mt-4 grid gap-3">
                  {[
                    {
                      title: "What is Odoo ERP?",
                      desc: "A quick intro for businesses, students, and developers.",
                      href: "/blog/what-is-odoo-erp",
                    },
                    {
                      title: "Odoo Implementation Cost in Bangladesh",
                      desc: "How scope, users, and customization affect budget.",
                      href: "/blog/odoo-implementation-cost-in-bangladesh",
                    },
                    {
                      title: "Odoo vs ERPNext",
                      desc: "A neutral comparison to shortlist the right ERP.",
                      href: "/odoo-vs-erpnext",
                    },
                    {
                      title: "Download: ERP Checklist",
                      desc: "A practical readiness checklist for ERP projects.",
                      href: "/resources/erp-checklist",
                    },
                  ].map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="group rounded-[18px] border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-4 transition hover:shadow-sm"
                    >
                      <div className="text-sm font-semibold group-hover:underline">
                        {c.title}
                      </div>
                      <div className="mt-1 text-sm text-[color:var(--color-muted)]">
                        {c.desc}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-5 rounded-[18px] border border-[color:var(--color-border)] bg-gradient-to-br from-[color:var(--color-brand)]/10 to-[color:var(--color-brand-2)]/10 p-4">
                  <div className="text-sm font-semibold">
                    Join the next community workshop
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--color-muted)]">
                    Free sessions on Odoo basics, career roadmap, and module overviews.
                  </div>
                  <div className="mt-3">
                    <Link href="/events" className="ob-btn ob-btn-primary py-2">
                      See events
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ob-section">
        <div className="ob-container">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h2 className="ob-h2">Programmatic SEO, built for learning</h2>
              <p className="ob-lead mt-4">
                Every module, industry, comparison, and training topic gets its
                own focused page — connected with internal links to build
                topical authority for searches like “Odoo Bangladesh”, “Odoo
                Training Bangladesh”, and “Open Source ERP Bangladesh”.
              </p>
              <div className="mt-6 flex gap-3">
                <Link href="/modules" className="ob-btn ob-btn-secondary">
                  Browse modules
                </Link>
                <Link href="/industries" className="ob-btn ob-btn-secondary">
                  Browse industries
                </Link>
              </div>
            </div>

            <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Implementation guide",
                  desc: "Discovery → scope → rollout → change management.",
                  href: "/implementation-guide",
                },
                {
                  title: "Pricing guide",
                  desc: "Community vs Enterprise, hosting, and services.",
                  href: "/pricing-guide",
                },
                {
                  title: "Functional training",
                  desc: "Sales, CRM, Inventory, Accounting, Manufacturing.",
                  href: "/odoo-functional-training",
                },
                {
                  title: "Technical training",
                  desc: "Python, ORM, module dev, XML views, QWeb, OWL.",
                  href: "/odoo-technical-training",
                },
              ].map((card) => (
                <Link key={card.href} href={card.href} className="ob-card p-6 transition hover:shadow-md">
                  <div className="ob-h3">{card.title}</div>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">{card.desc}</p>
                  <div className="mt-4 text-sm font-medium">Explore →</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ob-section">
        <div className="ob-container">
          <div className="ob-card p-8 sm:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="ob-h2">Need a quick ERP assessment?</h2>
                <p className="ob-lead mt-4">
                  Tell us your industry, company size, and goals. We’ll reply with a neutral scope outline and learning resources — plus suggested Odoo modules.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/contact" className="ob-btn ob-btn-primary">
                  Talk to an Odoo specialist
                </Link>
                <Link href="/resources/erp-checklist" className="ob-btn ob-btn-secondary">
                  Download ERP checklist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
