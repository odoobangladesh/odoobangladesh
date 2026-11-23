import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryForm } from "@/components/inquiry-form";
import { JsonLd } from "@/components/json-ld";
import { PageIntro } from "@/components/visual-ui";
import {
  communityEvents,
  getEvent,
  type CommunityEvent,
} from "@/lib/events";
import { ogImagePath } from "@/lib/og";
import { breadcrumbList, event as eventSchema } from "@/lib/schema";

type Params = { slug: string };

export function generateStaticParams() {
  return communityEvents.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};
  const image = ogImagePath(event.title, "Events");
  return {
    title: event.title,
    description: event.summary,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      title: event.title,
      description: event.summary,
      url: `/events/${event.slug}`,
      images: [{ url: image, width: 1200, height: 630, alt: event.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.summary,
      images: [image],
    },
  };
}

function EventMeta({ event }: { event: CommunityEvent }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2 text-xs text-ink-muted">
      <span className="badge-pill">{event.format}</span>
      <span className="badge-pill">
        {event.status === "upcoming" ? "Upcoming" : "Past"}
      </span>
      <time dateTime={event.startsAt}>{event.startsAt}</time>
      <span>{event.location}</span>
    </div>
  );
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const schemas = [
    breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Events", path: "/events" },
      { name: event.title, path: `/events/${event.slug}` },
    ]),
    eventSchema({
      slug: event.slug,
      title: event.title,
      description: event.summary,
      startsAt: event.startsAt,
      endsAt: event.endsAt,
      location: event.location,
      format: event.format,
      status: event.status,
      recordingUrl: event.recordingUrl,
    }),
  ];

  const defaultMessage = `Webinar registration interest: ${event.title} (${event.slug})`;

  return (
    <div className="site-container section-y">
      <JsonLd data={schemas} />
      <PageIntro
        eyebrow="Events & webinars"
        title={event.title}
        description={event.summary}
      />
      <EventMeta event={event} />

      <div className="prose-docs mt-8 max-w-3xl text-sm leading-7 text-ink-muted">
        <p>{event.body}</p>
        <p className="mt-4">
          <span className="font-medium text-ink">Audience:</span>{" "}
          {event.audience}
        </p>
      </div>

      {event.recordingUrl || event.recapPath ? (
        <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
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
      ) : null}

      <div id="register" className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">
            {event.status === "upcoming"
              ? "Register interest"
              : "Ask about the next batch"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            {event.status === "upcoming"
              ? "We will confirm session details by email. Company training budgets become commercial opportunities; individual learners stay marked as learners."
              : "This session has ended. Tell us if you want the next similar workshop or a written follow-up."}
          </p>
          <p className="mt-4 text-sm">
            <Link
              href="/events"
              className="font-medium text-brand underline underline-offset-4"
            >
              ← All events
            </Link>
          </p>
        </div>
        <InquiryForm
          defaultInterest="webinar"
          defaultMessage={defaultMessage}
        />
      </div>
    </div>
  );
}
