import type { PortalIndexItem } from "@/components/portal-index";

/**
 * Shared PortalIndex destination sets for engagement routing.
 * Home = portal map; learning = core guides; continue = cross-path next steps.
 */

export const HOME_PORTAL_DESTINATIONS: PortalIndexItem[] = [
  {
    eyebrow: "Plan",
    title: "Implementation guide",
    description:
      "Discovery through go-live for Bangladesh teams, without a sales pitch.",
    href: "/implementation-guide",
  },
  {
    eyebrow: "Cost",
    title: "Pricing guide",
    description:
      "What drives total cost: licences, scope, hosting, and training.",
    href: "/pricing-guide",
  },
  {
    eyebrow: "Learn",
    title: "Training paths",
    description: "Functional and technical syllabi, workshops, and career advice.",
    href: "/training",
  },
  {
    eyebrow: "Explore",
    title: "Module directory",
    description: "Bangladesh-focused use cases per Odoo app.",
    href: "/modules",
  },
  {
    eyebrow: "Sector",
    title: "Industry playbooks",
    description: "Garments, F&B, retail, SME, and more.",
    href: "/industries",
  },
  {
    eyebrow: "Decide",
    title: "ERP shortlists",
    description: "Odoo vs ERPNext, SAP B1, Dynamics, and Tally.",
    href: "/comparisons",
  },
  {
    eyebrow: "Checklist",
    title: "ERP readiness checklist",
    description: "Unlock the free planning asset with email once.",
    href: "/resources/erp-checklist",
  },
];

export const LEARNING_PORTAL_DESTINATIONS: PortalIndexItem[] = [
  {
    eyebrow: "Plan",
    title: "Implementation Guide",
    description:
      "Scope, timeline, data, UAT, training, go-live, and common mistakes.",
    href: "/implementation-guide",
  },
  {
    eyebrow: "Cost",
    title: "Pricing Guide",
    description:
      "Licenses, implementation, customization, hosting, and training.",
    href: "/pricing-guide",
  },
  {
    eyebrow: "Career",
    title: "Career Path Guide",
    description:
      "Role map, skills checklist, portfolio ideas, and interview prep.",
    href: "/odoo-career-guide",
  },
  {
    eyebrow: "Checklist",
    title: "ERP readiness checklist",
    description: "Free planning asset—email unlocks it once on this device.",
    href: "/resources/erp-checklist",
  },
];

const CONTINUE_DESTINATIONS: PortalIndexItem[] = [
  {
    eyebrow: "Plan",
    title: "Implementation guide",
    description: "Phase planning from discovery to go-live.",
    href: "/implementation-guide",
  },
  {
    eyebrow: "Cost",
    title: "Pricing guide",
    description: "Neutral cost components before a quotation.",
    href: "/pricing-guide",
  },
  {
    eyebrow: "Learn",
    title: "Training hub",
    description: "Functional and technical learning paths.",
    href: "/training",
  },
  {
    eyebrow: "Explore",
    title: "Learning Center",
    description: "Guides, syllabi, and career maps in one place.",
    href: "/learning-center",
  },
  {
    eyebrow: "Checklist",
    title: "ERP readiness checklist",
    description: "Unlock the planning checklist with email.",
    href: "/resources/erp-checklist",
  },
  {
    eyebrow: "Packages",
    title: "Fixed-scope packages",
    description: "Educational package overview—quotes via discovery.",
    href: "/packages",
  },
];

/** Cross-path next steps; drops the current hub so the index always routes away. */
export function continueDestinations(
  excludeHref?: string,
): PortalIndexItem[] {
  if (!excludeHref) return CONTINUE_DESTINATIONS;
  return CONTINUE_DESTINATIONS.filter((item) => {
    if (!item.href) return true;
    if (item.href === excludeHref) return false;
    // Also drop when standing on a child of a listed hub (e.g. /training/*).
    if (
      excludeHref.startsWith(`${item.href}/`) &&
      item.href !== "/"
    ) {
      return false;
    }
    return true;
  });
}

/** Attach published counts as metrics so PortalIndex can promote the densest path. */
export function withPortalMetrics(
  items: PortalIndexItem[],
  counts: Record<string, number>,
): PortalIndexItem[] {
  return items.map((item) => {
    const href = item.href;
    if (!href || counts[href] == null) return item;
    return { ...item, metric: String(counts[href]) };
  });
}
