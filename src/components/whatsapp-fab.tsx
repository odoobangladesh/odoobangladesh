"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={siteConfig.social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-40 hidden items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg hover:bg-emerald-500 md:flex"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-4 w-4" />
      WhatsApp
    </a>
  );
}

