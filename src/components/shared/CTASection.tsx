"use client";

import { Button } from "./Button";
import { useMessages } from "@/components/providers/I18nProvider";

export function CTASection() {
  const t = useMessages();

  return (
    <section className="bg-gradient-to-br from-odoo-purple to-odoo-purple-dark py-16 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="font-display mb-4 text-3xl md:text-4xl">{t.cta.title}</h2>
        <Button href="/trial" variant="secondary" className="mb-3 bg-white text-odoo-purple hover:bg-gray-100">
          {t.cta.startFree}
        </Button>
        <p className="text-sm text-white/80">{t.cta.subtitle}</p>
      </div>
    </section>
  );
}
