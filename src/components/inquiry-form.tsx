"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "business" as Role,
    interest: "erp-assessment" as Interest,
    message: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        role: "business",
        interest: "erp-assessment",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
      onSubmit={onSubmit}
    >
      <div className="text-sm font-semibold">Request consultation</div>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Share a bit of context so we can point you to the right resources and
        next steps.
      </p>

      <div className="mt-5 grid gap-3">
        <div className="grid gap-2 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span className="text-zinc-700 dark:text-zinc-300">Name</span>
            <input
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-600"
              value={form.name}
              onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
              required
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-zinc-700 dark:text-zinc-300">Email</span>
            <input
              type="email"
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-600"
              value={form.email}
              onChange={(e) =>
                setForm((v) => ({ ...v, email: e.target.value }))
              }
              required
            />
          </label>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">
            <span className="text-zinc-700 dark:text-zinc-300">
              Phone (optional)
            </span>
            <input
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-600"
              value={form.phone}
              onChange={(e) =>
                setForm((v) => ({ ...v, phone: e.target.value }))
              }
              placeholder="+8801…"
            />
          </label>

          <label className="grid gap-1 text-sm">
            <span className="text-zinc-700 dark:text-zinc-300">You are</span>
            <select
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-600"
              value={form.role}
              onChange={(e) =>
                setForm((v) => ({ ...v, role: e.target.value as Role }))
              }
            >
              <option value="business">Business</option>
              <option value="professional">ERP professional</option>
              <option value="student">Student</option>
              <option value="developer">Developer</option>
              <option value="organization">Organization</option>
            </select>
          </label>
        </div>

        <label className="grid gap-1 text-sm">
          <span className="text-zinc-700 dark:text-zinc-300">
            What do you need?
          </span>
          <select
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-600"
            value={form.interest}
            onChange={(e) =>
              setForm((v) => ({ ...v, interest: e.target.value as Interest }))
            }
          >
            <option value="erp-assessment">Free ERP assessment</option>
            <option value="implementation-guidance">Implementation guidance</option>
            <option value="talk-to-specialist">Talk to an Odoo specialist</option>
            <option value="functional-training">Functional training</option>
            <option value="technical-training">Technical training</option>
            <option value="webinar">Webinar / workshop</option>
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-zinc-700 dark:text-zinc-300">
            Message (optional)
          </span>
          <textarea
            className="min-h-28 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-600"
            value={form.message}
            onChange={(e) =>
              setForm((v) => ({ ...v, message: e.target.value }))
            }
            placeholder="Tell us about your industry, timeline, or learning goals."
          />
        </label>
      </div>

      <button
        className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
        disabled={status === "loading"}
        type="submit"
      >
        Submit
      </button>
      {status === "success" ? (
        <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400">
          Received. We’ll reply with resources and next steps.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-3 text-xs text-red-600 dark:text-red-400">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </form>
  );
}

type Role = "business" | "professional" | "student" | "developer" | "organization";
type Interest =
  | "erp-assessment"
  | "implementation-guidance"
  | "talk-to-specialist"
  | "functional-training"
  | "technical-training"
  | "webinar";

