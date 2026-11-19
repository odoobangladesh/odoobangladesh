export type CommunityEvent = {
  slug: string;
  title: string;
  date: string;
  format: "Webinar" | "Workshop";
  summary: string;
  audience: string;
};

export const upcomingEvents: CommunityEvent[] = [
  {
    slug: "odoo-accounting-mushak-overview",
    title: "Odoo Accounting for Bangladesh: VAT reporting patterns",
    date: "2027-02-12",
    format: "Webinar",
    summary:
      "A practical walkthrough of accounting workflows and local reporting questions. Educational first; consultation optional.",
    audience: "Finance leads and controllers evaluating Odoo",
  },
  {
    slug: "odoo-for-distribution-ops",
    title: "Odoo for distribution: stock, credit, and landed costs",
    date: "2027-03-05",
    format: "Webinar",
    summary:
      "How trading and distribution teams use Sales, Purchase, Inventory, and Accounting together.",
    audience: "Owners and operations managers in wholesale/distribution",
  },
  {
    slug: "functional-training-open-house",
    title: "Functional training open house",
    date: "2027-03-20",
    format: "Workshop",
    summary:
      "Syllabus overview for functional learners and employers planning company batches.",
    audience: "Professionals and L&D / HR sponsors",
  },
];
