import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/visual-ui";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Unsubscribe",
  description:
    "How to unsubscribe from Odoo Bangladesh newsletter and resource emails.",
  alternates: { canonical: "/unsubscribe" },
  robots: { index: false, follow: false },
};

export default function UnsubscribePage() {
  const mail = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    "Unsubscribe request",
  )}&body=${encodeURIComponent(
    "Please unsubscribe this email address from Odoo Bangladesh updates.",
  )}`;

  return (
    <div className="site-container section-y">
      <PageIntro
        eyebrow="Email preferences"
        title="Unsubscribe"
        description="We only send updates to people who subscribed or unlocked a gated resource. Until a full email platform is connected, unsubscribe requests are handled manually."
      />

      <div className="mt-8 max-w-xl space-y-4 text-sm leading-6 text-ink-muted">
        <p>
          To stop receiving Odoo Bangladesh emails, send a short request from
          the address you used to subscribe:
        </p>
        <p>
          <a
            href={mail}
            className="font-medium text-brand underline underline-offset-4"
          >
            Email {siteConfig.contactEmail}
          </a>
        </p>
        <p>
          Include the email address to remove. We will process the request and
          confirm when a mailing list platform is live.
        </p>
        <p>
          Prefer to keep learning? Return to the{" "}
          <Link
            href="/learning-center"
            className="font-medium text-brand underline underline-offset-4"
          >
            Learning Center
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
