import type { Metadata } from "next";
import { ContinueExploring } from "@/components/continue-exploring";
import { MetricStrip } from "@/components/metric-strip";
import { PackageCta } from "@/components/package-cta";
import { ScrollReveal } from "@/components/scroll-reveal";
import { LinkTiles, PageIntro } from "@/components/visual-ui";
import { listDocs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Odoo for Industries (Bangladesh)",
  description:
    "Industry-focused Odoo ERP guides for Bangladesh: garments, manufacturing, retail, distribution, food & beverage, services, and SMEs.",
  alternates: { canonical: "/industries" },
};

const industryIcons: Record<string, "layers" | "boxes" | "target" | "users" | "plug" | "rocket"> = {
  garments: "layers",
  manufacturing: "boxes",
  retail: "target",
  distribution: "rocket",
  "food-beverage": "plug",
  services: "users",
  sme: "target",
  construction: "layers",
  education: "users",
};

export default async function IndustriesIndexPage() {
  const industries = await listDocs("industries");

  return (
    <div>
      <ScrollReveal />
      <section className="site-container section-y">
        <div data-reveal>
          <PageIntro
            eyebrow="Industry playbooks"
            title="Odoo for industries in Bangladesh"
            description="Sector guides that connect module maps, local constraints, and a practical next step. Each page is education-first; consultation is optional."
          />
          <div className="mt-8 max-w-3xl">
            <MetricStrip
              ariaLabel="Industry coverage"
              items={[
                {
                  value: industries.length,
                  label: "Published industry guides",
                },
                {
                  value: industries.filter((i) =>
                    ["garments", "manufacturing", "food-beverage"].includes(
                      i.slug,
                    ),
                  ).length,
                  label: "Production-heavy sectors",
                },
                {
                  value: industries.filter((i) =>
                    ["retail", "distribution", "sme"].includes(i.slug),
                  ).length,
                  label: "Trade and SME guides",
                },
              ]}
            />
          </div>
        </div>

        <div data-reveal className="mt-10">
          <LinkTiles
            ariaLabel="Industry guides"
            items={industries.map((i) => ({
              href: `/industries/${i.slug}`,
              title: i.title,
              description: i.description,
              icon: industryIcons[i.slug] ?? "layers",
              featured: i.slug === "food-beverage" || i.slug === "garments",
            }))}
          />
        </div>

        <ContinueExploring excludeHref="/industries" />

        <div data-reveal className="mt-10">
          <PackageCta label="Request industry consultation" />
        </div>
      </section>
    </div>
  );
}
