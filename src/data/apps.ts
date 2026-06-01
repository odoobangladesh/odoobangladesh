import type { AppItem } from "./types";

const defaultFeatures = [
  "Intuitive interface designed for speed",
  "Native AI assistance across workflows",
  "Seamless integration with all Odoo apps",
  "Real-time reporting and dashboards",
  "Mobile-friendly access anywhere",
  "Unlimited users on the free plan",
];

function app(
  slug: string,
  name: string,
  category: string,
  tagline: string,
  color: string,
  description?: string,
  features?: string[],
  relatedApps?: string[],
): AppItem {
  return {
    slug,
    name,
    category,
    tagline,
    color,
    description:
      description ??
      `${name} is a fully integrated Odoo application that helps your team work faster, collaborate better, and scale without complexity. Built for modern businesses that need one platform for everything.`,
    features: features ?? defaultFeatures,
    relatedApps,
  };
}

export const apps: AppItem[] = [
  app("accounting", "Accounting", "Finance", "Financial management made simple", "#00A09D", undefined, undefined, ["invoicing", "expenses", "sign"]),
  app("invoicing", "Invoicing", "Finance", "Professional invoices in seconds", "#00A09D"),
  app("expenses", "Expenses", "Finance", "Track and approve expenses effortlessly", "#00A09D"),
  app("spreadsheet", "Spreadsheet (BI)", "Finance", "Business intelligence in spreadsheets", "#714B67"),
  app("documents", "Documents", "Finance", "Organize and share business documents", "#714B67"),
  app("sign", "Sign", "Finance", "Electronic signatures made easy", "#875A7B"),
  app("crm", "CRM", "Sales", "Customer Relationship Magic", "#714B67", "AI-native CRM to track leads, get accurate forecasts and close more opportunities.", ["Track opportunities in a visual pipeline", "Kanban view with drag-and-drop stages", "Automated follow-ups and activities", "Integrated email, chat, SMS and VoIP", "Professional quotations in two clicks", "AI lead scoring and smart reporting"], ["sales", "email-marketing", "subscriptions"]),
  app("sales", "Sales", "Sales", "From quotation to cash", "#E67E22"),
  app("point-of-sale-shop", "POS Shop", "Sales", "Modern point of sale for retail", "#E74C3C"),
  app("point-of-sale-restaurant", "POS Restaurant", "Sales", "Restaurant POS built for speed", "#C0392B"),
  app("subscriptions", "Subscriptions", "Sales", "Recurring revenue made simple", "#9B59B6"),
  app("rental", "Rental", "Sales", "Manage rentals end to end", "#3498DB"),
  app("website", "Website", "Websites", "Build stunning websites without code", "#3498DB"),
  app("ecommerce", "eCommerce", "Websites", "Sell online with a fully integrated shop", "#1ABC9C"),
  app("blog", "Blog", "Websites", "Engage your audience with content", "#2ECC71"),
  app("forum", "Forum", "Websites", "Community discussions for your brand", "#27AE60"),
  app("live-chat", "Live Chat", "Websites", "Talk to visitors in real time", "#16A085"),
  app("elearning", "eLearning", "Websites", "Create and sell online courses", "#2980B9"),
  app("inventory", "Inventory", "Supply Chain", "Smart inventory management", "#F39C12"),
  app("manufacturing", "Manufacturing", "Supply Chain", "Plan and control production", "#D35400"),
  app("plm", "PLM", "Supply Chain", "Product lifecycle management", "#E67E22"),
  app("purchase", "Purchase", "Supply Chain", "Streamline procurement", "#C0392B"),
  app("maintenance", "Maintenance", "Supply Chain", "Equipment maintenance tracking", "#7F8C8D"),
  app("quality", "Quality", "Supply Chain", "Quality control at every step", "#2C3E50"),
  app("employees", "Employees", "Human Resources", "Centralized HR management", "#8E44AD"),
  app("recruitment", "Recruitment", "Human Resources", "Hire the best talent faster", "#9B59B6"),
  app("time-off", "Time Off", "Human Resources", "Leave management simplified", "#3498DB"),
  app("appraisals", "Appraisals", "Human Resources", "Performance reviews made easy", "#1ABC9C"),
  app("referrals", "Referrals", "Human Resources", "Employee referral programs", "#27AE60"),
  app("fleet", "Fleet", "Human Resources", "Manage your vehicle fleet", "#34495E"),
  app("social-marketing", "Social Marketing", "Marketing", "Social media management", "#E91E63"),
  app("email-marketing", "Email Marketing", "Marketing", "Beautiful email campaigns", "#9C27B0"),
  app("sms-marketing", "SMS Marketing", "Marketing", "Reach customers via SMS", "#673AB7"),
  app("events", "Events", "Marketing", "Organize and promote events", "#FF5722"),
  app("marketing-automation", "Marketing Automation", "Marketing", "Automate your marketing funnel", "#FF9800"),
  app("surveys", "Surveys", "Marketing", "Collect feedback and insights", "#795548"),
  app("project", "Project", "Services", "Deliver projects on time", "#00BCD4"),
  app("timesheet", "Timesheets", "Services", "Track time and bill accurately", "#009688"),
  app("field-service", "Field Service", "Services", "Manage field operations", "#4CAF50"),
  app("helpdesk", "Helpdesk", "Services", "Customer support that scales", "#2196F3"),
  app("planning", "Planning", "Services", "Resource planning made visual", "#3F51B5"),
  app("appointments", "Appointments", "Services", "Online scheduling for everyone", "#607D8B"),
  app("discuss", "Discuss", "Productivity", "Team communication hub", "#714B67"),
  app("artificial-intelligence", "Artificial Intelligence", "Productivity", "AI across your entire business", "#714B67", "Automate work, tailor features, perform deep research, and scale without limits with native AI built into every Odoo app."),
  app("iot", "IoT", "Productivity", "Connect devices to Odoo", "#455A64"),
  app("voip", "VoIP", "Productivity", "Calls integrated in your workflow", "#37474F"),
  app("knowledge", "Knowledge", "Productivity", "Internal wiki and knowledge base", "#714B67"),
  app("whatsapp", "WhatsApp", "Productivity", "WhatsApp business integration", "#25D366"),
  app("studio", "Studio", "Productivity", "Customize Odoo without code", "#875A7B"),
];

export const appsBySlug = Object.fromEntries(apps.map((a) => [a.slug, a]));

export const featuredApps = [
  "accounting", "knowledge", "sign", "crm", "studio", "subscriptions",
  "artificial-intelligence", "point-of-sale-shop", "discuss", "documents",
  "project", "timesheet", "field-service", "planning", "helpdesk",
  "ecommerce", "website", "email-marketing", "purchase", "inventory",
  "manufacturing", "sales", "employees", "spreadsheet",
];
