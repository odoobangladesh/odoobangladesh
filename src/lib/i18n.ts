/**
 * First Bangla money-page mirrors. English remains canonical for depth;
 * `/bn/...` pages pair via hreflang.
 */
export const BN_MIRRORS: Record<
  string,
  { enPath: string; bnSlug: string; label: string }
> = {
  "odoo-pricing-bangladesh": {
    enPath: "/odoo-pricing-bangladesh",
    bnSlug: "odoo-pricing-bangladesh",
    label: "মূল্য নির্ধারণ",
  },
  "odoo-implementation-cost-bangladesh": {
    enPath: "/odoo-implementation-cost-bangladesh",
    bnSlug: "odoo-implementation-cost-bangladesh",
    label: "বাস্তবায়ন খরচ",
  },
  "odoo-accounting-bangladesh": {
    enPath: "/odoo-accounting-bangladesh",
    bnSlug: "odoo-accounting-bangladesh",
    label: "অ্যাকাউন্টিং",
  },
  "odoo-for-garments-industry": {
    enPath: "/odoo-for-garments-industry",
    bnSlug: "odoo-for-garments-industry",
    label: "গার্মেন্টস",
  },
  "odoo-vs-tally": {
    enPath: "/comparisons/odoo-vs-tally",
    bnSlug: "odoo-vs-tally",
    label: "তুলনা",
  },
};

export function bnPathForSlug(slug: string): string {
  return `/bn/${slug}`;
}

export function languageAlternates(enPath: string, bnSlug: string) {
  return {
    en: enPath,
    bn: bnPathForSlug(bnSlug),
  } as const;
}

export function bnMirrorForEnglishPath(pathname: string) {
  return Object.values(BN_MIRRORS).find((m) => m.enPath === pathname);
}

export function listBnSlugs(): string[] {
  return Object.keys(BN_MIRRORS);
}
