"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { mergeAttribution } from "@/lib/utm";

type Status = "idle" | "loading" | "success" | "error";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

type Role =
  | "business"
  | "professional"
  | "student"
  | "developer"
  | "organization";

type Interest =
  | "erp-assessment"
  | "implementation-guidance"
  | "talk-to-specialist"
  | "functional-training"
  | "technical-training"
  | "company-training"
  | "webinar"
  | "care-plan";

const INTERESTS: { value: Interest; label: string }[] = [
  { value: "erp-assessment", label: "Free ERP assessment" },
  { value: "implementation-guidance", label: "Implementation guidance" },
  { value: "talk-to-specialist", label: "Talk to Binary Quest" },
  { value: "care-plan", label: "Care Plan / AMC" },
  { value: "company-training", label: "Company training" },
  { value: "functional-training", label: "Functional training (individual)" },
  { value: "technical-training", label: "Technical training (individual)" },
  { value: "webinar", label: "Webinar / workshop" },
];

function resolveInterest(
  raw: string | null | undefined,
  fallback: Interest,
): Interest {
  if (raw && INTERESTS.some((i) => i.value === raw)) return raw as Interest;
  return fallback;
}

function InquiryFormFields({
  defaultInterest,
  defaultPackage,
  defaultMessage,
}: {
  defaultInterest?: Interest;
  defaultPackage?: string;
  defaultMessage?: string;
}) {
  const searchParams = useSearchParams();
  const initialInterest = resolveInterest(
    searchParams.get("interest") ?? defaultInterest,
    defaultInterest ?? "erp-assessment",
  );
  const initialPackage =
    searchParams.get("package")?.trim() || defaultPackage || "";

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || undefined;
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "business" as Role,
    interest: initialInterest,
    package: initialPackage,
    message: defaultMessage ?? "",
    website: "",
  });

  useEffect(() => {
    if (!siteKey || !turnstileRef.current) return;

    let cancelled = false;

    function mountWidget() {
      if (cancelled || !turnstileRef.current || !window.turnstile || !siteKey) {
        return;
      }
      if (widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: siteKey,
        callback: (token) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      });
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]',
    );
    if (existing) {
      if (window.turnstile) mountWidget();
      else existing.addEventListener("load", mountWidget);
      return () => {
        cancelled = true;
      };
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => mountWidget();
    document.head.appendChild(script);
    return () => {
      cancelled = true;
    };
  }, [siteKey]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const attribution = mergeAttribution({
        packageSlug: form.package || undefined,
      });
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          role: form.role,
          interest: form.interest,
          package: form.package || undefined,
          message: form.message,
          honeypot: form.website,
          turnstileToken: turnstileToken || undefined,
          ...attribution,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        role: "business",
        interest: defaultInterest ?? "erp-assessment",
        package: defaultPackage ?? "",
        message: defaultMessage ?? "",
        website: "",
      });
      setTurnstileToken("");
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-[var(--radius-panel)] bg-surface-sunken p-3 sm:p-4">
      <form
        className="rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-1"
        onSubmit={onSubmit}
      >
        <div className="text-sm font-semibold text-ink">
          Request ERP consultation
        </div>
        <p className="mt-1 text-sm text-ink-muted">
          Educational portal first. Qualified business interest is routed to
          Binary Quest with source tagged as odoobangladesh.com.
        </p>

        <div className="mt-5 grid gap-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <label className="grid gap-1 text-sm">
              <span className="text-ink-muted">Name</span>
              <input
                className="input-field"
                value={form.name}
                onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
                required
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-ink-muted">Email</span>
              <input
                type="email"
                className="input-field"
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
              <span className="text-ink-muted">Phone</span>
              <input
                className="input-field"
                value={form.phone}
                onChange={(e) =>
                  setForm((v) => ({ ...v, phone: e.target.value }))
                }
                placeholder="+8801…"
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-ink-muted">Company</span>
              <input
                className="input-field"
                value={form.company}
                onChange={(e) =>
                  setForm((v) => ({ ...v, company: e.target.value }))
                }
                placeholder="Organisation name"
              />
            </label>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <label className="grid gap-1 text-sm">
              <span className="text-ink-muted">You are</span>
              <select
                className="input-field"
                value={form.role}
                onChange={(e) =>
                  setForm((v) => ({ ...v, role: e.target.value as Role }))
                }
              >
                <option value="business">Business buyer</option>
                <option value="organization">Organisation / employer</option>
                <option value="professional">ERP professional</option>
                <option value="student">Student / learner</option>
                <option value="developer">Developer / partner</option>
              </select>
            </label>

            <label className="grid gap-1 text-sm">
              <span className="text-ink-muted">What do you need?</span>
              <select
                className="input-field"
                value={form.interest}
                onChange={(e) =>
                  setForm((v) => ({
                    ...v,
                    interest: e.target.value as Interest,
                  }))
                }
              >
                {INTERESTS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="grid gap-1 text-sm">
            <span className="text-ink-muted">Package (optional)</span>
            <select
              className="input-field"
              value={form.package}
              onChange={(e) =>
                setForm((v) => ({ ...v, package: e.target.value }))
              }
            >
              <option value="">Not sure yet</option>
              <option value="starter">Starter</option>
              <option value="business">Business</option>
              <option value="growth">Growth</option>
              <option value="enterprise">Enterprise</option>
              <option value="care-plan">Care Plan</option>
            </select>
          </label>

          <label className="grid gap-1 text-sm">
            <span className="text-ink-muted">Message (optional)</span>
            <textarea
              className="input-field min-h-28 py-3"
              style={{ height: "auto" }}
              value={form.message}
              onChange={(e) =>
                setForm((v) => ({ ...v, message: e.target.value }))
              }
              placeholder="Industry, timeline, team size, or learning goals."
            />
          </label>

          <input
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
            value={form.website}
            onChange={(e) => setForm((v) => ({ ...v, website: e.target.value }))}
          />

          {siteKey ? (
            <div ref={turnstileRef} className="min-h-[65px]" />
          ) : null}
        </div>

        <button
          className="btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-60"
          disabled={status === "loading" || (Boolean(siteKey) && !turnstileToken)}
          type="submit"
        >
          {status === "loading" ? "Sending…" : "Submit consultation request"}
        </button>
        {status === "success" ? (
          <p className="form-success mt-3 flex items-center gap-2 text-xs text-ink-muted">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="success-check"
            >
              <circle
                cx="8"
                cy="8"
                r="7"
                stroke="var(--brand)"
                strokeWidth="1.5"
              />
              <path
                d="M4.5 8.2 L6.8 10.5 L11.5 5.5"
                stroke="var(--brand)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="success-check-path"
              />
            </svg>
            Received. Business enquiries go to Binary Quest; learners get
            resources and training guidance.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="form-error mt-3 flex items-start gap-2 text-xs text-ink">
            <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
            Something went wrong. Please try again or email{" "}
            {`info@binaryquest.com`}.
          </p>
        ) : null}
      </form>
    </div>
  );
}

export function InquiryForm({
  defaultInterest,
  defaultPackage,
  defaultMessage,
}: {
  defaultInterest?: Interest;
  defaultPackage?: string;
  defaultMessage?: string;
} = {}) {
  return (
    <Suspense
      fallback={
        <div className="rounded-[var(--radius-panel)] bg-surface-sunken p-3 sm:p-4">
          <div className="rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-1">
            <div className="text-sm font-semibold text-ink">
              Request ERP consultation
            </div>
            <p className="mt-1 text-sm text-ink-muted">Loading form…</p>
          </div>
        </div>
      }
    >
      <InquiryFormFields
        defaultInterest={defaultInterest}
        defaultPackage={defaultPackage}
        defaultMessage={defaultMessage}
      />
    </Suspense>
  );
}
