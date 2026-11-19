import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/inquiry-form";
import { PageIntro, StepRail } from "@/components/visual-ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request ERP Consultation",
  description:
    "Request an Odoo ERP consultation in Bangladesh. Forms tag source as odoobangladesh.com and route qualified interest to Binary Quest.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="site-container section-y">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-6">
          <PageIntro
            title="Request ERP consultation"
            description="Use this form for business assessments, package discussions, care plans, webinars, or company training. Student-only learning requests are marked as learner leads and are not pushed as sales SQLs."
          />

          <div className="card-standard mt-6 p-6 text-sm">
            <div className="font-medium text-ink">What happens next</div>
            <div className="mt-4">
              <StepRail
                ariaLabel="What happens next"
                steps={[
                  {
                    title:
                      "Your submission is stored with source = odoobangladesh.com",
                  },
                  {
                    title:
                      "UTM and page path are kept for advertising attribution",
                  },
                  {
                    title: "Binary Quest reviews commercial fit and budget",
                  },
                  {
                    title: (
                      <>
                        Full case studies live on{" "}
                        <a
                          className="btn-tertiary"
                          href={siteConfig.sisterSites.binaryquest.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          binaryquest.com
                        </a>
                      </>
                    ),
                  },
                ]}
              />
            </div>
          </div>

          <div className="mt-6 text-sm leading-6 text-ink-muted">
            Prefer packages first?{" "}
            <Link className="btn-tertiary" href="/packages">
              Browse Starter to Enterprise
            </Link>
            .
          </div>
        </div>
        <div className="md:col-span-6">
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}
