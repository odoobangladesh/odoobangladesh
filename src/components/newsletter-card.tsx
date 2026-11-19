"use client";

import { useState } from "react";

export function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setEmail("");
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
      <form className="mt-4 flex flex-col gap-2 sm:flex-row" onSubmit={onSubmit}>
        <label className="grid w-full gap-1 text-sm">
          <span className="text-ink-muted">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="you@example.com"
            className="input-field"
          />
        </label>
        <button
          className="btn-primary mt-auto shrink-0 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-6"
          disabled={status === "loading"}
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
          Something went wrong. Please try again.
        </p>
      ) : null}
      <p className="mt-4 text-xs text-ink-muted">
        Unsubscribe anytime. We don’t sell your data.
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
