import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events & Webinars",
  description:
    "Community workshops and webinars for Odoo learners and professionals in Bangladesh. Register for upcoming sessions and access recordings.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Events & webinars</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Upcoming community learning sessions will appear here. For now, use
          the inquiry form to register interest and get notified.
        </p>
      </div>
      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold">Next steps</div>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
          <li>Free workshop registration</li>
          <li>Webinar announcements</li>
          <li>Community learning events</li>
        </ul>
        <Link
          href="/contact"
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Register interest
        </Link>
      </div>
    </div>
  );
}

