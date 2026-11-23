import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/inquiry-form";
import { JsonLd } from "@/components/json-ld";
import { NewsletterCard } from "@/components/newsletter-card";
import { PageIntro } from "@/components/visual-ui";
import {
  listPastEvents,
  listUpcomingEvents,
  type CommunityEvent,
} from "@/lib/events";
import { event as eventSchema, itemList } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Odoo Events & Webinars Bangladesh",
  description:
    "Register for Odoo webinars and workshops in Bangladesh. Date-intent MQLs with educational content first.",
  alternates: { canonical: "/events" },
};

function EventRow({ event }: { event: CommunityEvent }) {
  return (
    <li>
      <article className="py-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
          <span className="badge-pill">{event.format}</span>
          <time dateTime={event.startsAt}>{event.startsAt}</time>
          <span>{event.location}</span>
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-ink">
          <Link
            href={`/events/${event.slug}`}
            className="underline-offset-4 hover:underline"
          >
            {event.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-6 text-ink-muted">{event.summary}</p>
        <p className="mt-2 text-sm text-ink">
          <span className="font-medium">Audience:</span> {event.audience}
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
          <Link
            href={`/events/${event.slug}`}
            className="text-brand underline underline-offset-4"
          >
            Session details
          </Link>
          {event.status === "upcoming" ? (
            <Link
              href={`/events/${event.slug}#register`}
              className="text-brand underline underline-offset-4"
            >
              Register interest
            </Link>
          ) : null}
          {event.recordingUrl ? (
            <a
              href={event.recordingUrl}
              className="text-brand underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              Watch recording
            </a>
          ) : null}
          {event.recapPath ? (
            <Link
              href={event.recapPath}
              className="text-brand underline underline-offset-4"
            >
              Written follow-up
            </Link>
          ) : null}
        </div>
      </article>
    </li>
  );
}

export default function EventsPage() {
  const upcoming = listUpcomingEvents();
  const past = listPastEvents();
  const schemas = [
    itemList(
      "Odoo events and webinars in Bangladesh",
      [...upcoming, ...past].map((e) => ({
        name: e.title,
        path: `/events/${e.slug}`,
      })),
    ),
    ...[...upcoming, ...past].map((e) =>
      eventSchema({
        slug: e.slug,
        title: e.title,
        description: e.summary,
        startsAt: e.startsAt,
        endsAt: e.endsAt,
        location: e.location,
        format: e.format,
        status: e.status,
        recordingUrl: e.recordingUrl,
      }),
    ),
  ];

  return (
    <div className="site-container section-y">
      <JsonLd data={schemas} />
      <PageIntro
        title="Events & webinars"
        description="Community learning sessions with date intent. Register below. Company training budgets become SQL opportunities; individual learners stay marked as learners."
      />

      <section className="mt-10" aria-labelledby="upcoming-events-heading">
        <h2
          id="upcoming-events-heading"
          className="font-display text-lg font-semibold text-ink"
        >
          Upcoming
        </h2>
        {upcoming.length > 0 ? (
          <ul className="directory-list directory-list-1 mt-2">
            {upcoming.map((event) => (
              <EventRow key={event.slug} event={event} />
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-ink-muted">
            No upcoming sessions scheduled yet. Subscribe for announcements.
          </p>
        )}
      </section>

      <section className="mt-12" aria-labelledby="past-events-heading">
        <h2
          id="past-events-heading"
          className="font-display text-lg font-semibold text-ink"
        >
          Past sessions
        </h2>
        {past.length > 0 ? (
          <ul className="directory-list directory-list-1 mt-2">
            {past.map((event) => (
              <EventRow key={event.slug} event={event} />
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-ink-muted">
            Past sessions and recordings will appear here when published.
          </p>
        )}
      </section>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">
            Register for the next session
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Tell us which topic you care about. We will confirm details by email
            once the practice CRM notification path is live.
          </p>
        </div>
        <InquiryForm defaultInterest="webinar" />
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-start">
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">
            Event updates by email
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Get reminders for webinars and workshop open houses.
          </p>
        </div>
        <NewsletterCard />
      </div>
    </div>
  );
}
