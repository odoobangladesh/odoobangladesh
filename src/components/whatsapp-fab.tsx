"use client";

import Link from "next/link";
import { useMemo } from "react";

export function WhatsAppFab() {
  const href = useMemo(() => {
    const text = encodeURIComponent(
      "Hi! I found OdooBangladesh.com and I have a question about Odoo implementation/training in Bangladesh."
    );
    // Placeholder number; replace later without changing component API.
    return `https://wa.me/0000000000?text=${text}`;
  }, []);

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-50 grid h-12 w-12 place-items-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-background)] shadow-md transition hover:shadow-lg"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <span className="text-sm font-semibold">WA</span>
    </Link>
  );
}

