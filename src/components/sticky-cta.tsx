"use client";

import Link from "next/link";

export function StickyCta() {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-4 md:hidden">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white/95 p-3 shadow-lg backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">Need Odoo guidance?</div>
          <div className="truncate text-xs text-zinc-600 dark:text-zinc-400">
            Request a free ERP assessment or training advice.
          </div>
        </div>
        <Link
          href="/contact"
          className="shrink-0 rounded-full bg-zinc-900 px-4 py-2 text-xs font-medium text-white dark:bg-white dark:text-zinc-950"
        >
          Request
        </Link>
      </div>
    </div>
  );
}

