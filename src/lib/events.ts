export type CommunityEvent = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD) used for listing and schema startDate. */
  startsAt: string;
  /** Optional ISO date for multi-day or end-of-session schema. */
  endsAt?: string;
  format: "Webinar" | "Workshop";
  summary: string;
  audience: string;
  location: string;
  status: "upcoming" | "past";
  /** Public recording URL when a real asset exists. */
  recordingUrl?: string;
  /** Path to a blog recap when published. */
  recapPath?: string;
  body: string;
};

export const communityEvents: CommunityEvent[] = [
  {
    slug: "odoo-accounting-mushak-overview",
    title: "Odoo Accounting for Bangladesh: VAT reporting patterns",
    startsAt: "2027-02-12",
    endsAt: "2027-02-12",
    format: "Webinar",
    summary:
      "A practical walkthrough of accounting workflows and local reporting questions. Educational first; consultation optional.",
    audience: "Finance leads and controllers evaluating Odoo",
    location: "Online · Bangladesh",
    status: "upcoming",
    body: "This session covers chart-of-accounts patterns, VAT reporting questions teams ask in Bangladesh, and how Accounting sits beside Inventory and Sales. It is educational. Consultation is optional after the session.",
  },
  {
    slug: "odoo-for-distribution-ops",
    title: "Odoo for distribution: stock, credit, and landed costs",
    startsAt: "2027-03-05",
    endsAt: "2027-03-05",
    format: "Webinar",
    summary:
      "How trading and distribution teams use Sales, Purchase, Inventory, and Accounting together.",
    audience: "Owners and operations managers in wholesale/distribution",
    location: "Online · Bangladesh",
    status: "upcoming",
    body: "Distribution teams often outgrow spreadsheets when credit limits, multi-warehouse stock, and landed costs collide. This webinar maps a practical Odoo module sequence for Bangladesh wholesalers without a sales pitch.",
  },
  {
    slug: "functional-training-open-house",
    title: "Functional training open house",
    startsAt: "2027-03-20",
    endsAt: "2027-03-20",
    format: "Workshop",
    summary:
      "Syllabus overview for functional learners and employers planning company batches.",
    audience: "Professionals and L&D / HR sponsors",
    location: "Online · Bangladesh",
    status: "upcoming",
    body: "An open walkthrough of the functional pathway: module order, practice exercises, and how company training batches differ from individual learner tracks. Student-only interest stays marked as learner leads.",
  },
  {
    slug: "odoo-inventory-basics-recap",
    title: "Odoo Inventory basics for Bangladesh SMEs",
    startsAt: "2026-09-18",
    endsAt: "2026-09-18",
    format: "Webinar",
    summary:
      "Past community session on warehouses, routes, and stock valuation questions for first-time Odoo adopters.",
    audience: "Operations and finance teams evaluating Inventory",
    location: "Online · Bangladesh",
    status: "past",
    recapPath: "/modules/inventory",
    body: "This past session introduced Inventory concepts for Bangladesh SMEs: warehouse setup, internal transfers, and how stock valuation connects to Accounting. A public recording will appear here when a real asset is available. Until then, use the Inventory module guide as the written follow-up.",
  },
];

export function getEvent(slug: string): CommunityEvent | undefined {
  return communityEvents.find((event) => event.slug === slug);
}

export function listUpcomingEvents(): CommunityEvent[] {
  return communityEvents
    .filter((event) => event.status === "upcoming")
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export function listPastEvents(): CommunityEvent[] {
  return communityEvents
    .filter((event) => event.status === "past")
    .sort((a, b) => b.startsAt.localeCompare(a.startsAt));
}

/** @deprecated Use listUpcomingEvents */
export const upcomingEvents = listUpcomingEvents();
