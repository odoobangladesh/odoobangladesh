import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About the Community",
  description:
    "OdooBangladesh.com is an independent community portal for Odoo learners, professionals, developers, and businesses in Bangladesh.",
  pathname: "/about",
});

export default function AboutPage() {
  return (
    <div className="ob-container ob-section">
      <div className="max-w-3xl">
        <h1 className="ob-h1">About the community</h1>
        <p className="ob-lead mt-4">
          OdooBangladesh.com is an independent, community-driven knowledge platform for Odoo in
          Bangladesh. We focus on learning resources, implementation guidance, and career
          development — not corporate agency marketing.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <div className="ob-card p-6 lg:col-span-2">
          <div className="text-lg font-semibold tracking-tight">What you’ll find here</div>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-[color:var(--color-muted)]">
            <li>Programmatic SEO pages for modules, industries, comparisons, and training topics</li>
            <li>Neutral implementation guidance and scope planning checklists</li>
            <li>Training tracks for functional consultants and developers</li>
            <li>Community events, workshops, and curated learning roadmaps</li>
          </ul>
        </div>
        <div className="ob-card p-6">
          <div className="text-lg font-semibold tracking-tight">Get involved</div>
          <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
            Want to contribute a guide or share a local case study? Send a message.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <Link href="/contact" className="ob-btn ob-btn-primary">
              Contact
            </Link>
            <Link href="/newsletter" className="ob-btn ob-btn-secondary">
              Newsletter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

