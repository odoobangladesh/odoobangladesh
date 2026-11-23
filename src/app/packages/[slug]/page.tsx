import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/inquiry-form";
import { PackageCta } from "@/components/package-cta";
import { FeatureRows, PageIntro } from "@/components/visual-ui";
import { ogImagePath } from "@/lib/og";
import { getPackage, packagePaths, packages } from "@/lib/packages";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return packagePaths();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return {};
  const title = `${pkg.name} Odoo Package Bangladesh`;
  const image = ogImagePath(title, "Packages");
  return {
    title,
    description: pkg.summary,
    alternates: { canonical: `/packages/${pkg.slug}` },
    openGraph: {
      title,
      description: pkg.summary,
      url: `/packages/${pkg.slug}`,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: pkg.summary,
      images: [image],
    },
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  return (
    <div className="site-container section-y">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-muted">
        <Link href="/packages" className="hover:text-ink hover:underline">
          Packages
        </Link>
        <span className="mx-2" aria-hidden="true">
          /
        </span>
        <span className="text-ink">{pkg.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <PageIntro
            eyebrow={pkg.eyebrow}
            title={`${pkg.name} package`}
            description={pkg.summary}
          />
          <p className="mt-4 text-sm leading-6 text-ink">
            <span className="font-medium">Best for:</span> {pkg.bestFor}
          </p>

          <h2 className="mt-10 font-display text-lg font-semibold text-ink">
            Modules in scope
          </h2>
          <div className="mt-3 flex flex-wrap gap-2" aria-label="Modules">
            {pkg.modules.map((m) => (
              <span key={m} className="badge-pill">
                {m}
              </span>
            ))}
          </div>

          <h2 className="mt-10 font-display text-lg font-semibold text-ink">
            What is included
          </h2>
          <div className="mt-3">
            <FeatureRows
              ariaLabel="What is included"
              items={pkg.includes.map((item) => ({
                icon: "check" as const,
                title: item,
              }))}
            />
          </div>

          <h2 className="mt-10 font-display text-lg font-semibold text-ink">
            Outcomes
          </h2>
          <div className="mt-3">
            <FeatureRows
              ariaLabel="Outcomes"
              items={pkg.outcomes.map((item) => ({
                icon: "target" as const,
                title: item,
              }))}
            />
          </div>
        </div>

        <aside className="space-y-4 lg:col-span-5">
          <PackageCta packageSlug={pkg.slug} label={pkg.ctaLabel} />
          <InquiryForm
            defaultInterest={
              pkg.slug === "care-plan" ? "care-plan" : "talk-to-specialist"
            }
            defaultPackage={pkg.slug}
          />

          {pkg.relatedIndustries.length > 0 ? (
            <div className="card-standard p-6">
              <div className="text-sm font-semibold text-ink">
                Related industry pages
              </div>
              <ul className="mt-3 grid gap-0 text-sm">
                {pkg.relatedIndustries.map((l) => (
                  <li key={l.href}>
                    <Link
                      className="group flex items-center justify-between border-b border-line py-3 text-ink last:border-b-0 hover:text-brand"
                      href={l.href}
                    >
                      <span>{l.label}</span>
                      <span
                        className="card-arrow text-ink-muted transition-transform duration-[var(--dur-fast)] group-hover:translate-x-[3px]"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {pkg.relatedGuides.length > 0 ? (
            <div className="card-standard p-6">
              <div className="text-sm font-semibold text-ink">Related guides</div>
              <ul className="mt-3 grid gap-0 text-sm">
                {pkg.relatedGuides.map((l) => (
                  <li key={l.href}>
                    <Link
                      className="group flex items-center justify-between border-b border-line py-3 text-ink last:border-b-0 hover:text-brand"
                      href={l.href}
                    >
                      <span>{l.label}</span>
                      <span
                        className="card-arrow text-ink-muted transition-transform duration-[var(--dur-fast)] group-hover:translate-x-[3px]"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="card-standard p-6 text-sm leading-6 text-ink-muted">
            Delivered by{" "}
            <a
              className="btn-tertiary"
              href={siteConfig.operator.odooPartnerUrl}
              target="_blank"
              rel="noreferrer"
            >
              {siteConfig.operator.name}
            </a>
            , Odoo implementation partner for Bangladesh. Case studies:{" "}
            <a
              className="btn-tertiary"
              href={siteConfig.sisterSites.binaryquest.url}
              target="_blank"
              rel="noreferrer"
            >
              binaryquest.com
            </a>
            .
          </div>
        </aside>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-lg font-semibold text-ink">
          Compare packages
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {packages
            .filter((p) => p.slug !== pkg.slug && p.slug !== "care-plan")
            .map((p) => (
              <Link
                key={p.slug}
                href={`/packages/${p.slug}`}
                className="card-interactive card-standard p-4 text-sm transition-[border-color,box-shadow] duration-[var(--dur-fast)]"
              >
                <div className="font-medium text-ink">{p.name}</div>
                <p className="mt-1 text-ink-muted">{p.eyebrow}</p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
