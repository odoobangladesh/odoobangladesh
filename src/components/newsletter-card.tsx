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
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="text-sm font-semibold">Newsletter</div>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Get community-first updates: Odoo learning resources, training events,
        implementation checklists, and career guides.
      </p>
      <form className="mt-4 flex gap-2" onSubmit={onSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-600"
        />
        <button
          className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
          disabled={status === "loading"}
          type="submit"
        >
          Subscribe
        </button>
      </form>
      {status === "success" ? (
        <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400">
          Subscribed. Welcome to the community.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-3 text-xs text-red-600 dark:text-red-400">
          Something went wrong. Please try again.
        </p>
      ) : null}
      <p className="mt-4 text-xs text-zinc-500">
        Unsubscribe anytime. We don’t sell your data.
      </p>
    </div>
  );
}

