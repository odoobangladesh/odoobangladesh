import type { Metadata } from "next";
import { ContinueExploring } from "@/components/continue-exploring";
import { MetricStrip } from "@/components/metric-strip";
import { ScrollReveal } from "@/components/scroll-reveal";
import { LinkTiles, PageIntro } from "@/components/visual-ui";
import { listDocs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Odoo vs Other ERP (Comparisons)",
  description:
    "ERP comparison guides for Bangladesh: Odoo vs ERPNext, SAP Business One, Dynamics 365, and Tally, with practical selection checklists.",
  alternates: { canonical: "/comparisons" },
};

const comparisonIcons: Record<string, "scale" | "target" | "layers" | "clipboard"> = {
  "odoo-vs-erpnext": "scale",
  "odoo-vs-sap-business-one": "layers",
  "odoo-vs-microsoft-dynamics-365": "target",
  "odoo-vs-tally": "clipboard",
};

export default async function ComparisonsIndexPage() {
  const comparisons = await listDocs("comparisons");

  return (
    <div>
      <ScrollReveal />
      <section className="site-container section-y">
        <div data-reveal>
          <PageIntro
            eyebrow="Neutral shortlists"
            title="Odoo vs other ERP options"
            description="Side-by-side guides for Bangladesh budgets, localisation, and partner reality. Use them to shortlist, not to replace a discovery workshop."
          />
          <div className="mt-8 max-w-3xl">
            <MetricStrip
              ariaLabel="Comparison coverage"
              items={[
                {
                  value: comparisons.length,
                  label: "Published comparisons",
                },
                {
                  value: comparisons.filter((c) =>
                    c.slug.includes("erpnext"),
                  ).length,
                  label: "Open-source matchup",
                },
                {
                  value: comparisons.filter((c) => c.slug.includes("tally"))
                    .length,
                  label: "Bookkeeping upgrade path",
                },
              ]}
            />
          </div>
        </div>

        <div data-reveal className="mt-10">
          <LinkTiles
            ariaLabel="ERP comparisons"
            items={comparisons.map((c) => ({
              href: c.path,
              title: c.title,
              description: c.description,
              icon: comparisonIcons[c.slug] ?? "scale",
              featured: c.slug === "odoo-vs-tally" || c.slug === "odoo-vs-erpnext",
            }))}
          />
        </div>

        <ContinueExploring excludeHref="/comparisons" />
      </section>
    </div>
  );
}