"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function InquiryForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setState("submitting");
    setMessage(null);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      topic: String(formData.get("topic") ?? ""),
      company: String(formData.get("company") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) throw new Error(data?.error ?? "Request failed");
      setState("success");
      setMessage("Thanks — we received your inquiry. We’ll reply soon.");
    } catch (e) {
      setState("error");
      setMessage(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1">
          <div className="text-sm font-medium">Name</div>
          <input
            name="name"
            required
            className="w-full rounded-[14px] border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/40"
            placeholder="Your name"
          />
        </label>
        <label className="space-y-1">
          <div className="text-sm font-medium">Email</div>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-[14px] border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/40"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1">
          <div className="text-sm font-medium">Topic</div>
          <select
            name="topic"
            className="w-full rounded-[14px] border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/40"
            defaultValue="erp"
          >
            <option value="erp">ERP consultation</option>
            <option value="functional-training">Functional training</option>
            <option value="technical-training">Technical training</option>
            <option value="developer">Developer question</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label className="space-y-1">
          <div className="text-sm font-medium">Company / Role (optional)</div>
          <input
            name="company"
            className="w-full rounded-[14px] border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/40"
            placeholder="e.g., Garments SME / Student / Developer"
          />
        </label>
      </div>

      <label className="space-y-1">
        <div className="text-sm font-medium">Message</div>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full resize-y rounded-[14px] border border-[color:var(--color-border)] bg-[color:var(--color-background)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--color-brand)]/40"
          placeholder="Tell us your goals, timeline, modules, and constraints."
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="ob-btn ob-btn-primary"
          disabled={state === "submitting"}
        >
          {state === "submitting" ? "Sending…" : "Send inquiry"}
        </button>
        <div className="text-xs text-[color:var(--color-muted)]">
          By sending, you agree to receive a reply related to your inquiry.
        </div>
      </div>

      {message ? (
        <div
          className={[
            "rounded-[14px] border p-3 text-sm",
            state === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-100"
              : state === "error"
                ? "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-100"
                : "border-[color:var(--color-border)]",
          ].join(" ")}
        >
          {message}
        </div>
      ) : null}
    </form>
  );
}

