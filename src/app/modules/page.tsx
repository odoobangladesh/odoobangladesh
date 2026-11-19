import type { Metadata } from "next";
import { ContinueExploring } from "@/components/continue-exploring";
import { MetricStrip } from "@/components/metric-strip";
import { ProcessDiagram } from "@/components/process-diagram";
import { ScrollReveal } from "@/components/scroll-reveal";
import { LinkTiles, PageIntro } from "@/components/visual-ui";
import { listDocs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Odoo Modules Directory (Bangladesh)",
  description:
    "Browse Odoo ERP modules with Bangladesh-focused use cases, implementation notes, and learning resources.",
  alternates: { canonical: "/modules" },
};

const moduleIcons: Record<
  string,
  "clipboard" | "boxes" | "users" | "target" | "layers" | "plug" | "rocket" | "settings"
> = {
  accounting: "clipboard",
  inventory: "boxes",
  sales: "target",
  purchase: "layers",
  crm: "users",
  manufacturing: "settings",
  pos: "plug",
  hr: "users",
  payroll: "clipboard",
  project: "rocket",
};

export default async function ModulesIndexPage() {
  const modules = await listDocs("modules");

  const core = modules.filter((m) =>
    ["accounting", "sales", "purchase", "inventory"].includes(m.slug),
  );
  const ops = modules.filter((m) =>
    ["manufacturing", "pos", "project"].includes(m.slug),
  );
  const people = modules.filter((m) => ["hr", "payroll", "crm"].includes(m.slug));

  return (
    <div>
      <ScrollReveal />
      <section className="site-container section-y">
        <div data-reveal>
          <PageIntro
            eyebrow="Module directory"
            title="Odoo modules for Bangladesh"
            description="Neutral module overviews with local use cases. Counts below are published guides on this site."
          />
          <div className="mt-8">
            <MetricStrip
              items={[
                { value: modules.length, label: "Module guides" },
                { value: core.length, label: "Finance & trade core" },
                { value: ops.length, label: "Operations apps" },
                { value: people.length, label: "People & pipeline" },
              ]}
            />
          </div>
        </div>

        <div data-reveal className="mt-12">
          <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-[var(--tracking-h2)] text-ink">
            Typical adoption order
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            A common sequence for Bangladesh SMEs. Your industry page may reorder
            this.
          </p>
          <div className="mt-6">
            <ProcessDiagram
              nodes={[
                {
                  id: "acc",
                  label: "Accounting",
                  detail: "Books + VAT patterns",
                  href: "/modules/accounting",
                  icon: "clipboard",
                },
                {
                  id: "sales",
                  label: "Sales / CRM",
                  detail: "Quotes to invoice",
                  href: "/modules/sales",
                  icon: "target",
                },
                {
                  id: "stock",
                  label: "Inventory",
                  detail: "Warehouses & lots",
                  href: "/modules/inventory",
                  icon: "boxes",
                },
                {
                  id: "ops",
                  label: "Ops apps",
                  detail: "MRP, POS, Project",
                  href: "/modules/manufacturing",
                  icon: "settings",
                },
              ]}
            />
          </div>
        </div>

        <div data-reveal className="mt-12">
          <h2 className="font-display text-[length:var(--text-h2)] font-semibold tracking-[var(--tracking-h2)] text-ink">
            All modules
          </h2>
          <div className="mt-4">
            <LinkTiles
              ariaLabel="All module guides"
              items={modules.map((m) => ({
                href: `/modules/${m.slug}`,
                title: m.title,
                description: m.description,
                icon: moduleIcons[m.slug] ?? "layers",
              }))}
            />
          </div>
        </div>

        <ContinueExploring excludeHref="/modules" />
      </section>
    </div>
  );
}
