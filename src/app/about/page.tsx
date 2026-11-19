import type { Metadata } from "next";
import Link from "next/link";
import { SiteLogo } from "@/components/site-logo";
import { FeatureRows, PageIntro } from "@/components/visual-ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About / Who runs Odoo Bangladesh",
  description:
    "Odoo Bangladesh is an independent educational portal for Odoo ERP in Bangladesh, operated by Binary Quest Limited. Learn how the site relates to Binary Quest and ERP Bangladesh.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="site-container section-y">
      <div className="mx-auto max-w-[var(--reading)]">
        <div className="mb-8">
          <SiteLogo variant="stacked" className="h-20 w-auto sm:h-24" />
        </div>
        <PageIntro
          eyebrow="Operator disclosure"
          title="Who runs this portal"
          description={
            <>
              Odoo Bangladesh is a community-style educational site for people
              and businesses exploring Odoo ERP in Bangladesh. It is operated by{" "}
              <a
                className="btn-tertiary"
                href={siteConfig.operator.url}
                target="_blank"
                rel="noreferrer"
              >
                {siteConfig.operator.name}
              </a>
              , an Odoo implementation partner. We keep an educational tone for
              trust; commercial delivery is handled by Binary Quest, not
              presented as a different company.
            </>
          }
        />

        <div className="mt-10 grid gap-6">
          <section className="card-standard p-6">
            <h2 className="font-display text-lg font-semibold text-ink">
              What this portal is
            </h2>
            <div className="mt-4">
              <FeatureRows
                items={[
                  {
                    icon: "book",
                    title:
                      "Guides, industry pages, module explainers, and comparisons",
                  },
                  {
                    icon: "graduation",
                    title:
                      "Training pathways for professionals and company teams",
                  },
                  {
                    icon: "boxes",
                    title:
                      "Package overviews and consultation forms for business buyers",
                  },
                  {
                    icon: "users",
                    title: "Events, webinars, and newsletter nurture",
                  },
                ]}
              />
            </div>
          </section>

          <section className="card-standard p-6">
            <h2 className="font-display text-lg font-semibold text-ink">
              What this portal is not
            </h2>
            <div className="mt-4">
              <FeatureRows
                items={[
                  { icon: "shield", title: "Not affiliated with Odoo S.A." },
                  {
                    icon: "alert",
                    title: "Not a substitute for Binary Quest’s corporate site",
                  },
                  {
                    icon: "alert",
                    title:
                      "Not the place for broad “what is ERP” education (that is ERP Bangladesh)",
                  },
                ]}
              />
            </div>
          </section>

          <section className="card-standard p-6">
            <h2 className="font-display text-lg font-semibold text-ink">
              How the three domains work together
            </h2>
            <div className="mt-4">
              <FeatureRows
                items={[
                  {
                    icon: "layers",
                    title: "odoobangladesh.com",
                    description:
                      "Odoo education, SEO, packages, training, and consultation MQLs",
                  },
                  {
                    icon: "link",
                    title: (
                      <a
                        href={siteConfig.sisterSites.binaryquest.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-tertiary"
                      >
                        binaryquest.com
                      </a>
                    ),
                    description:
                      "Company credibility, full case studies, careers",
                  },
                  {
                    icon: "link",
                    title: (
                      <a
                        href={siteConfig.sisterSites.erpbangladesh.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-tertiary"
                      >
                        erpbangladesh.com
                      </a>
                    ),
                    description:
                      "Early-stage ERP research before Odoo is chosen",
                  },
                ]}
              />
            </div>
          </section>

          <section className="card-standard p-6">
            <h2 className="font-display text-lg font-semibold text-ink">
              Contact
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              For ERP consultation and implementation:{" "}
              <a
                className="btn-tertiary"
                href={`mailto:${siteConfig.operator.email}`}
              >
                {siteConfig.operator.email}
              </a>
              , {siteConfig.operator.phone}, or WhatsApp via the site button.
            </p>
          </section>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/packages" className="btn-primary">
            View packages
          </Link>
          <Link href="/contact" className="btn-secondary">
            Request consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
