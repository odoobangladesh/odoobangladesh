import { siteConfig } from "@/lib/site";

export type TrustHighlight = {
  id: string;
  title: string;
  summary: string;
  kind: "workshop" | "operator";
  href: string;
  external?: boolean;
  cta: string;
};

/**
 * Honest trust signals only — no invented customers or named case studies.
 * Operator proof links to Binary Quest; workshop items stay educational.
 */
export const trustHighlights: TrustHighlight[] = [
  {
    id: "workshop-accounting",
    title: "Accounting workshop pattern",
    summary:
      "Community sessions walk finance teams through chart-of-accounts and VAT reporting questions before any sales conversation.",
    kind: "workshop",
    href: "/events",
    cta: "See upcoming sessions",
  },
  {
    id: "workshop-functional",
    title: "Functional training open house",
    summary:
      "Learners and L&D sponsors review syllabus outcomes and practice paths without committing to a commercial package.",
    kind: "workshop",
    href: "/training",
    cta: "Explore training pathways",
  },
  {
    id: "operator-proof",
    title: "Implementation proof on Binary Quest",
    summary:
      "Full company background and genuine customer case studies live on the operator site. This portal stays educational.",
    kind: "operator",
    href: siteConfig.operator.odooPartnerUrl,
    external: true,
    cta: "View Binary Quest Odoo practice",
  },
];
