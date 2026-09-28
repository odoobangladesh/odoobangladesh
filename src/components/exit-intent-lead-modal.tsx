"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "obd_exit_intent_dismissed_v1";

export function ExitIntentLeadModal() {
  const [open, setOpen] = useState(false);
  const canShow = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) !== "1";
  }, []);

  useEffect(() => {
    if (!canShow) return;
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) setOpen(true);
    };
    window.addEventListener("mouseout", onMouseOut);
    return () => window.removeEventListener("mouseout", onMouseOut);
  }, [canShow]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Free ERP checklist"
    >
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">
              Free ERP readiness checklist (Bangladesh)
            </div>
            <p className="mt-1 text-sm text-zinc-600">
              Download a quick checklist used for Odoo implementation planning,
              plus a learning roadmap for functional & technical roles.
            </p>
          </div>
          <button
            className="rounded-lg px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-100"
            onClick={() => {
              window.localStorage.setItem(STORAGE_KEY, "1");
              setOpen(false);
            }}
          >
            Close
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/resources/erp-checklist"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Get the checklist
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            Book a free consultation
          </Link>
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          No aggressive marketing. Community-first updates only.
        </p>
      </div>
    </div>
  );
}

