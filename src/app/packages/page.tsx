import Link from "next/link";
import type { Metadata } from "next";
import { GroupedBars } from "@/components/charts";
import { PackageCta } from "@/components/package-cta";
import { PageIntro } from "@/components/visual-ui";
import { packages } from "@/lib/packages";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Odoo Implementation Packages Bangladesh",
  description:
    "Starter, Business, Growth, and Enterprise Odoo packages for Bangladesh, plus Care Plan AMC and hosting. Commercial clarity without public discounting. Talk to Binary Quest.",
  alternates: { canonical: "/packages" },
  keywords: [
    "Odoo packages Bangladesh",
    "Odoo implementation Bangladesh",
    "Odoo partner Dhaka",
    "Odoo Care Plan",
  ],
};

export default function PackagesPage() {
  const tiers = packages.filter((p) => p.slug !== "care-plan");
  const care = packages.find((p) => p.slug === "care-plan");

  return (
    <div className="site-container section-y">
      <PageIntro
        eyebrow={`Commercial packaging · Implemented by ${siteConfig.operator.name}`}
        title="Odoo packages for Bangladesh"
        description="Clear starting scopes for businesses evaluating Odoo. Learn here; request a consultation when you are ready. Pricing is quoted after discovery, not published as a discount sheet."
      />

      <div className="mt-8">
        <GroupedBars
          title="Scope density by package (modules, includes, outcomes)"
          keys={[
            { key: "modules", label: "Modules" },
            { key: "includes", label: "Includes" },
            { key: "outcomes", label: "Outcomes" },
          ]}
          items={tiers.map((pkg) => ({
            label: pkg.name,
            href: `/packages/${pkg.slug}`,
            series: [
              { key: "modules", value: pkg.modules.length },
              { key: "includes", value: pkg.includes.length },
              { key: "outcomes", value: pkg.outcomes.length },
            ],
          }))}
        />
      </div>

      <ol className="package-bands mt-10">
        {tiers.map((pkg, i) => (
          <li key={pkg.slug}>
            <Link href={`/packages/${pkg.slug}`} className="package-band group">
              <span className="package-band-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="package-band-copy min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
                    {pkg.name}
                  </h2>
                  <span className="badge-pill">{pkg.eyebrow}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  {pkg.summary}
                </p>
                <p className="mt-3 text-sm text-ink">
                  <span className="font-medium">Best for:</span> {pkg.bestFor}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {pkg.modules.slice(0, 4).map((m) => (
                    <span
                      key={m}
                      className="badge-pill border border-line bg-surface"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <span className="package-band-cta">
                Explore
                <span className="card-arrow" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {care ? (
        <section className="mt-8 rounded-[var(--radius-panel)] bg-brand-deep p-6 text-on-brand md:p-8">
          <div className="text-xs font-medium text-brand-tint">{care.eyebrow}</div>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
            {care.name}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-brand-tint">
            {care.summary}
          </p>
          <Link
            href="/packages/care-plan"
            className="mt-4 inline-flex text-sm font-medium text-on-brand underline underline-offset-4"
          >
            Explore Care Plan details
          </Link>
        </section>
      ) : null}

      <div className="mt-10">
        <PackageCta label="Request ERP consultation" />
      </div>

      <p className="mt-8 text-sm text-ink-muted">
        Full case studies and company background live on{" "}
        <a
          className="btn-tertiary"
          href={siteConfig.sisterSites.binaryquest.url}
          target="_blank"
          rel="noreferrer"
        >
          binaryquest.com
        </a>
        . This community portal stays educational.
      </p>
    </div>
  );
}
