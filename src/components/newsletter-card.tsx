"use client";

import { useState } from "react";

type State = "idle" | "submitting" | "success" | "error";

export function NewsletterCard() {
  const [state, setState] = useState<State>("idle");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState<string | null>(null);

  async function submit() {
    setState("submitting");
    setNote(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) throw new Error(data?.error ?? "Subscription failed");
      setState("success");
      setNote("Subscribed. Check your inbox for future updates.");
      setEmail("");
    } catch (e) {
      setState("error");
      setNote(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  return (
    <div className="ob-card p-6">
      <div className="text-lg font-semibold tracking-tight">Subscribe</div>
      <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
        Get new Odoo Bangladesh resources, comparisons, and training updates.
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="you@example.com"
          className="w-full flex-1 rounded-[14px] border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/40"
        />
        <button
          className="ob-btn ob-btn-primary"
          onClick={submit}
          disabled={state === "submitting" || !email}
          type="button"
        >
          {state === "submitting" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>

      {note ? (
        <div className="mt-4 text-sm text-[color:var(--color-muted)]">{note}</div>
      ) : (
        <div className="mt-4 text-xs text-[color:var(--color-muted)]">
          No spam. Unsubscribe any time.
        </div>
      )}
    </div>
  );
}

