"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

function hasClosedRecently(key: string, hours: number) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return false;
    const ts = Number(raw);
    if (!Number.isFinite(ts)) return false;
    return Date.now() - ts < hours * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function markClosed(key: string) {
  try {
    localStorage.setItem(key, String(Date.now()));
  } catch {
    // ignore
  }
}

export function ExitIntentLeadModal() {
  const storageKey = "ob_exit_intent_closed_at";
  const [open, setOpen] = useState(false);
  const canShow = useMemo(() => !hasClosedRecently(storageKey, 72), []);

  useEffect(() => {
    if (!canShow) return;

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) setOpen(true);
    };

    window.addEventListener("mouseout", onMouseLeave);
    return () => window.removeEventListener("mouseout", onMouseLeave);
  }, [canShow]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-[22px] border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-6 shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold tracking-tight">Get a free ERP readiness checklist</div>
            <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
              Practical questions, team roles, and scope guidance for Odoo ERP projects in Bangladesh.
            </p>
          </div>
          <button
            className="rounded-full px-3 py-1 text-sm text-[color:var(--color-muted)] hover:bg-black/5 dark:hover:bg-white/10"
            onClick={() => {
              markClosed(storageKey);
              setOpen(false);
            }}
          >
            Close
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/resources/erp-checklist" className="ob-btn ob-btn-primary">
            Download checklist
          </Link>
          <Link href="/newsletter" className="ob-btn ob-btn-secondary">
            Subscribe to newsletter
          </Link>
        </div>

        <div className="mt-4 text-xs text-[color:var(--color-muted)]">
          This is a community portal — no aggressive sales, just practical guidance.
        </div>
      </div>
    </div>
  );
}

