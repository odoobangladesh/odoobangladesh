"use client";

import Link from "next/link";
import { useState } from "react";
import { mergeAttribution } from "@/lib/utm";

export function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const attribution = mergeAttribution();
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          consent: true,
          honeypot,
          ...attribution,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setEmail("");
      setConsent(false);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-1">
      <div className="text-sm font-semibold text-ink">Newsletter</div>
      <p className="mt-1 text-sm text-ink-muted">
        Get community-first updates: Odoo learning resources, training events,
        implementation checklists, and career guides.
      </p>
      <form className="mt-4 flex flex-col gap-3" onSubmit={onSubmit}>
        <label className="grid w-full gap-1 text-sm">
          <span className="text-ink-muted">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="you@example.com"
            className="input-field"
            autoComplete="email"
          />
        </label>

        <label className="flex items-start gap-2 text-xs leading-5 text-ink-muted">
          <input
            type="checkbox"
            className="mt-0.5"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
          />
          <span>
            I agree to receive Odoo Bangladesh updates by email. I can{" "}
            <Link href="/unsubscribe" className="underline underline-offset-2">
              unsubscribe
            </Link>{" "}
            anytime.
          </span>
        </label>

        <input
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />

        <button
          className="btn-primary w-full shrink-0 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          disabled={status === "loading" || !consent}
          type="submit"
        >
          {status === "loading" ? "Sending…" : "Subscribe"}
        </button>
      </form>
      {status === "success" ? (
        <p className="form-success mt-3 flex items-center gap-2 text-xs text-ink-muted">
          <SuccessCheck />
          Subscribed. Welcome to the community.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="form-error mt-3 text-xs text-accent">
          Something went wrong. Please confirm consent and try again.
        </p>
      ) : null}
      <p className="mt-4 text-xs text-ink-muted">
        We only email people who subscribe.{" "}
        <Link href="/unsubscribe" className="underline underline-offset-2">
          Unsubscribe help
        </Link>
        .
      </p>
    </div>
  );
}

function SuccessCheck() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="success-check"
    >
      <circle cx="8" cy="8" r="7" stroke="var(--brand)" strokeWidth="1.5" />
      <path
        d="M4.5 8.2 L6.8 10.5 L11.5 5.5"
        stroke="var(--brand)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="success-check-path"
      />
    </svg>
  );
}
