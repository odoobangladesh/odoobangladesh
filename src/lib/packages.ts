export type PackageSlug =
  | "starter"
  | "business"
  | "growth"
  | "enterprise"
  | "care-plan";

export type OdooPackage = {
  slug: PackageSlug;
  name: string;
  eyebrow: string;
  summary: string;
  bestFor: string;
  modules: string[];
  includes: string[];
  outcomes: string[];
  relatedIndustries: { href: string; label: string }[];
  relatedGuides: { href: string; label: string }[];
  ctaLabel: string;
};

/**
 * Commercial packaging for odoobangladesh.com (domain strategy §5–§6).
 * Scopes mirror Binary Quest’s fixed-scope practice offers without publishing
 * discounted price lists. Quotes follow a discovery call.
 */
export const packages: OdooPackage[] = [
  {
    slug: "starter",
    name: "Starter",
    eyebrow: "Finance & sales foundation",
    summary:
      "Replace spreadsheets or Tally with a clean Odoo finance and sales core: chart of accounts, VAT-ready invoicing, CRM, and quotation-to-invoice.",
    bestFor:
      "Trading houses, agencies, and service firms starting Odoo with a fixed first scope.",
    modules: ["Accounting", "Invoicing", "Sales", "CRM"],
    includes: [
      "Bangladesh chart of accounts and VAT-ready invoicing patterns",
      "Customer and supplier master data migration",
      "Quotation-to-invoice workflow with approvals",
      "Bilingual training for finance and sales users",
      "Written fixed quote after one discovery call",
    ],
    outcomes: [
      "One system of record for customers, invoices, and receivables",
      "Clear month-end close path without spreadsheet chaos",
      "A foundation you can grow into inventory and operations later",
    ],
    relatedIndustries: [
      { href: "/industries/services", label: "Odoo for services" },
      { href: "/industries/sme", label: "Odoo for SMEs" },
    ],
    relatedGuides: [
      { href: "/odoo-accounting-bangladesh", label: "Odoo Accounting in Bangladesh" },
      { href: "/implementation-guide", label: "Implementation guide" },
      { href: "/comparisons/odoo-vs-tally", label: "Odoo vs Tally" },
    ],
    ctaLabel: "Talk to Binary Quest about Starter",
  },
  {
    slug: "business",
    name: "Business",
    eyebrow: "Trading & distribution operations",
    summary:
      "Run sales, purchase, multi-warehouse inventory, and accounting together for importers, wholesalers, and distributors.",
    bestFor:
      "Businesses that need operational control beyond finance: stock, purchasing, credit limits, and dealer reporting.",
    modules: ["Sales", "Purchase", "Inventory", "Accounting"],
    includes: [
      "Multi-warehouse stock with lots, serials, and landed costs",
      "Purchase approvals and three-way bill matching",
      "Credit limits, pricelists, and dealer-level reporting",
      "Opening stock and ledger migration with reconciliation",
      "Care-plan options for go-live support",
    ],
    outcomes: [
      "Real-time stock visibility across warehouses",
      "Purchase-to-pay and order-to-cash in one flow",
      "Fewer stockouts and reconciliation surprises",
    ],
    relatedIndustries: [
      { href: "/industries/distribution", label: "Odoo for distribution" },
      { href: "/industries/retail", label: "Odoo for retail" },
    ],
    relatedGuides: [
      { href: "/modules/inventory", label: "Inventory module guide" },
      { href: "/modules/purchase", label: "Purchase module guide" },
      { href: "/implementation-guide", label: "Implementation guide" },
    ],
    ctaLabel: "Talk to Binary Quest about Business",
  },
  {
    slug: "growth",
    name: "Growth",
    eyebrow: "Manufacturing & expansion",
    summary:
      "Extend Odoo into MRP, quality, and deeper supply-chain control when your operation outgrows trading-only processes.",
    bestFor:
      "Manufacturers and growing multi-module teams ready for phased MRP after inventory and purchase are stable.",
    modules: ["MRP", "Inventory", "Purchase", "Sales", "Accounting", "Quality"],
    includes: [
      "Bills of material, routings, and work-centre planning",
      "Raw material to finished goods costing",
      "Shop-floor quality checks and non-conformity tracking",
      "Phased rollout: inventory and purchase first, MRP second",
      "Training for planners, store, and production leads",
    ],
    outcomes: [
      "Production planning tied to real stock and demand",
      "Cost visibility from materials to finished goods",
      "A scalable base before multi-company or heavy customisation",
    ],
    relatedIndustries: [
      { href: "/industries/manufacturing", label: "Odoo for manufacturing" },
      { href: "/industries/garments", label: "Odoo for garments" },
      { href: "/odoo-for-garments-industry", label: "Garments industry landing" },
    ],
    relatedGuides: [
      { href: "/modules/manufacturing", label: "Manufacturing module guide" },
      { href: "/odoo-implementation-cost-bangladesh", label: "Implementation cost guide" },
    ],
    ctaLabel: "Talk to Binary Quest about Growth",
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    eyebrow: "Complex & multi-company",
    summary:
      "For organisations that need multi-company structure, large HR/payroll, migration from older Odoo/OpenERP, or broader programme governance.",
    bestFor:
      "Groups with complex requirements: multi-entity finance, 100 to 5,000+ employees, or version migration with data integrity.",
    modules: [
      "Multi-company",
      "Accounting",
      "HR",
      "Payroll",
      "Migration",
      "Integrations",
    ],
    includes: [
      "Programme discovery and phased roadmap",
      "Multi-company and localisation architecture",
      "HR and Bangladesh payroll rules where in scope",
      "Migration and upgrade with validation and cut-over plan",
      "Integration planning for marketplaces or legacy systems",
    ],
    outcomes: [
      "One governed Odoo programme instead of ad-hoc module installs",
      "Safer upgrades and data cut-overs",
      "Clear ownership between business process and technical delivery",
    ],
    relatedIndustries: [
      { href: "/industries/manufacturing", label: "Odoo for manufacturing" },
      { href: "/industries/distribution", label: "Odoo for distribution" },
    ],
    relatedGuides: [
      { href: "/odoo-partners-bangladesh", label: "Odoo partners in Bangladesh" },
      { href: "/pricing-guide", label: "Pricing guide" },
      { href: "/packages/care-plan", label: "Care Plan (AMC + hosting)" },
    ],
    ctaLabel: "Talk to Binary Quest about Enterprise",
  },
  {
    slug: "care-plan",
    name: "Care Plan",
    eyebrow: "AMC + hosting after go-live",
    summary:
      "Named support, managed hosting, backups, patches, and planned upgrades so your live Odoo stays healthy after implementation.",
    bestFor:
      "Every live Odoo customer. The default offer after go-live, including Starter through Enterprise rollouts.",
    modules: ["Support SLA", "Hosting", "Backups", "Version upgrades"],
    includes: [
      "Named support channel with response-time SLA",
      "Managed hosting, monitoring, and daily backups",
      "Security patches and planned version upgrades",
      "Quarterly health review of your configuration",
    ],
    outcomes: [
      "Predictable support instead of ad-hoc firefighting",
      "Safer hosting and recovery posture",
      "A planned path for Odoo version upgrades",
    ],
    relatedIndustries: [],
    relatedGuides: [
      { href: "/packages", label: "All implementation packages" },
      { href: "/implementation-guide", label: "Implementation guide" },
      { href: "/contact?interest=talk-to-specialist&package=care-plan", label: "Request care-plan consultation" },
    ],
    ctaLabel: "Talk to Binary Quest about Care Plan",
  },
];

export function getPackage(slug: string): OdooPackage | undefined {
  return packages.find((p) => p.slug === slug);
}

export function packagePaths() {
  return packages.map((p) => ({ slug: p.slug }));
}
