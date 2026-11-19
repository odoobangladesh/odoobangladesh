"use client";

import { useEffect, useState, type ReactNode } from "react";
import { mergeAttribution } from "@/lib/utm";

export const ERP_CHECKLIST_UNLOCK_KEY = "obd_unlocked_erp-checklist_v1";

type Status = "idle" | "loading" | "success" | "error";

type ResourceEmailGateProps = {
  asset?: string;
  storageKey?: string;
  children: ReactNode;
  /** Optional teaser shown above the locked form. */
  teaser?: ReactNode;
  submitLabel?: string;
  className?: string;
};

function unlockKeyFor(asset: string, storageKey?: string) {
  return storageKey ?? `obd_unlocked_${asset}_v1`;
}

export function ResourceEmailGate({
  asset = "erp-checklist",
  storageKey,
  children,
  teaser,
  submitLabel = "Unlock with email",
  className,
}: ResourceEmailGateProps) {
  const key = unlockKeyFor(asset, storageKey);
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setUnlocked(window.localStorage.getItem(key) === "1");
      setReady(true);
    });
    return () => cancelAnimationFrame(id);
  }, [key]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const attribution = mergeAttribution();
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          asset,
          honeypot,
          ...attribution,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      window.localStorage.setItem(key, "1");
      setUnlocked(true);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (!ready) {
    return (
      <div
        className={className}
        aria-hidden="true"
        style={{ minHeight: "4.5rem" }}
      />
    );
  }

  if (unlocked) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className}>
      {teaser}
      <form
        className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end"
        onSubmit={onSubmit}
      >
        <label className="grid w-full gap-1 text-sm">
          <span className="text-ink-muted">Work email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className="input-field"
          />
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
          className="btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={status === "loading"}
          type="submit"
        >
          {status === "loading" ? "Unlocking…" : submitLabel}
        </button>
      </form>
      {status === "error" ? (
        <p className="form-error mt-3 text-xs text-accent">
          Something went wrong. Please try again.
        </p>
      ) : null}
      <p className="mt-3 text-xs text-ink-muted">
        One email unlocks this resource on this device. Unsubscribe anytime.
      </p>
    </div>
  );
}
