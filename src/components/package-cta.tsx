"use client";

import Link from "next/link";
import { CtaSpark } from "@/components/cta-spark";
import SpotlightCard from "@/components/react-bits/SpotlightCard/SpotlightCard";

export function PackageCta({
  packageSlug,
  label = "Talk to Binary Quest",
}: {
  packageSlug?: string;
  label?: string;
}) {
  const href = packageSlug
    ? `/contact?interest=talk-to-specialist&package=${packageSlug}`
    : "/contact?interest=erp-assessment";

  return (
    <SpotlightCard
      theme="dark"
      spotlightColor="#DDF1E8"
      intensity={0.18}
      spotlightSize={320}
      softness={0.8}
      borderGlow={0.45}
      proximity={72}
      smoothing={0.3}
      grain={0.05}
      className="package-cta relative overflow-hidden !rounded-[var(--radius-panel)] !bg-brand-deep !p-6 text-on-brand md:!p-8"
      style={{
        backgroundColor: "var(--brand-deep)",
        boxShadow: "none",
      }}
    >
      <h2 className="font-display text-lg font-semibold tracking-tight md:text-xl">
        Ready for a scoped conversation?
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-tint">
        Odoo Bangladesh is a community learning portal—not an agency
        storefront. When you need an implementation quote,{" "}
        <a
          className="underline underline-offset-4 hover:text-on-brand"
          href="https://www.binaryquest.com/service/odoo-partner-bangladesh"
          target="_blank"
          rel="noreferrer"
        >
          Binary Quest
        </a>{" "}
        prepares it after a short discovery call. No public discount list.
      </p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <CtaSpark>
          <Link
            href={href}
            className="inline-flex h-12 items-center justify-center rounded-[var(--radius-control)] bg-surface px-6 text-sm font-semibold text-brand transition-[transform,opacity] duration-[var(--dur-fast)] hover:opacity-95"
          >
            {label}
          </Link>
        </CtaSpark>
        <Link
          href="/packages/care-plan"
          className="inline-flex h-12 items-center justify-center rounded-[var(--radius-control)] border border-white/20 px-6 text-sm font-semibold text-on-brand transition-colors duration-[var(--dur-fast)] hover:border-on-brand"
        >
          View Care Plan
        </Link>
      </div>
    </SpotlightCard>
  );
}
