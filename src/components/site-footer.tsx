import Link from "next/link";

const cols = [
  {
    title: "Community",
    links: [
      { href: "/about", label: "About the community" },
      { href: "/events", label: "Events & webinars" },
      { href: "/forum", label: "Forum (coming soon)" },
      { href: "/newsletter", label: "Newsletter" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/learning-center", label: "Learning center" },
      { href: "/developer-resources", label: "Developer resources" },
      { href: "/implementation-guide", label: "Implementation guide" },
      { href: "/odoo-career-guide", label: "Career path guide" },
    ],
  },
  {
    title: "Training",
    links: [
      { href: "/odoo-functional-training", label: "Functional training" },
      { href: "/odoo-technical-training", label: "Technical training" },
      { href: "/training", label: "Training schedule" },
      { href: "/resources/functional-syllabus", label: "Download syllabus" },
    ],
  },
  {
    title: "Compare",
    links: [
      { href: "/comparisons", label: "ERP comparisons" },
      { href: "/odoo-vs-erpnext", label: "Odoo vs ERPNext" },
      { href: "/comparisons/odoo-vs-sap-business-one", label: "Odoo vs SAP B1" },
      { href: "/comparisons/odoo-vs-microsoft-dynamics-365", label: "Odoo vs Dynamics 365" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--color-border)] bg-[color:var(--color-background)]">
      <div className="ob-container">
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="text-lg font-semibold tracking-tight">Odoo Bangladesh</div>
            <p className="mt-3 text-sm leading-6 text-[color:var(--color-muted)]">
              An independent, community-driven portal for learning Odoo ERP in Bangladesh: resources,
              implementation guidance, comparisons, and training.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/contact" className="ob-btn ob-btn-primary">
                Talk to an Odoo specialist
              </Link>
              <Link href="/resources/erp-checklist" className="ob-btn ob-btn-secondary">
                Free ERP checklist
              </Link>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title} className="lg:col-span-1">
              <div className="text-sm font-semibold">{col.title}</div>
              <ul className="mt-3 space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[color:var(--color-muted)] transition hover:text-[color:var(--color-foreground)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-[color:var(--color-border)] py-8 text-sm text-[color:var(--color-muted)] md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Odoo Bangladesh. Community portal.</div>
          <div className="flex gap-4">
            <Link href="/faq" className="hover:text-[color:var(--color-foreground)]">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-[color:var(--color-foreground)]">
              Contact
            </Link>
            <Link href="/about" className="hover:text-[color:var(--color-foreground)]">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

