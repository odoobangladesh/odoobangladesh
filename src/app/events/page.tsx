import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/inquiry-form";
import { PageIntro } from "@/components/visual-ui";
import { upcomingEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Odoo Events & Webinars Bangladesh",
  description:
    "Register for Odoo webinars and workshops in Bangladesh. Date-intent MQLs with educational content first.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  return (
    <div className="site-container section-y">
      <PageIntro
        title="Events & webinars"
        description="Community learning sessions with date intent. Register below. Company training budgets become SQL opportunities; individual learners stay marked as learners."
      />

      <ul className="directory-list directory-list-1 mt-8">
        {upcomingEvents.map((event) => (
          <li key={event.slug}>
            <article className="py-5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
                <span className="badge-pill">{event.format}</span>
                <time dateTime={event.date}>{event.date}</time>
              </div>
              <h2 className="mt-3 font-display text-lg font-semibold tracking-tight text-ink">
                {event.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-ink-muted">
                {event.summary}
              </p>
              <p className="mt-2 text-sm text-ink">
                <span className="font-medium">Audience:</span> {event.audience}
              </p>
              <Link
                href="/contact?interest=webinar"
                className="mt-4 inline-flex text-sm font-medium text-brand underline underline-offset-4"
              >
                Register interest
              </Link>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">
            Register for the next session
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Tell us which topic you care about. We will confirm details by email.
          </p>
        </div>
        <InquiryForm defaultInterest="webinar" />
      </div>
    </div>
  );
}
