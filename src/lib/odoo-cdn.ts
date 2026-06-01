const CDN = "https://odoocdn.com";
const WEBSITE = `${CDN}/openerp_website/static/src/img`;
const ICONS = `${CDN}/icons`;

/** Odoo module name → app slug (website paths). */
export const appIconModules: Record<string, string> = {
  accounting: "accountant",
  invoicing: "account",
  expenses: "hr_expense",
  spreadsheet: "spreadsheet_dashboard",
  documents: "documents",
  sign: "sign",
  crm: "crm",
  sales: "sale",
  "point-of-sale-shop": "point_of_sale",
  "point-of-sale-restaurant": "point_of_sale",
  subscriptions: "sale_subscription",
  rental: "sale_renting",
  website: "website",
  ecommerce: "website_sale",
  blog: "website_blog",
  forum: "website_forum",
  "live-chat": "im_livechat",
  elearning: "website_slides",
  inventory: "stock",
  manufacturing: "mrp",
  plm: "mrp_plm",
  purchase: "purchase",
  maintenance: "maintenance",
  quality: "quality_control",
  employees: "hr",
  recruitment: "hr_recruitment",
  "time-off": "hr_holidays",
  appraisals: "hr_appraisal",
  referrals: "hr_referral",
  fleet: "fleet",
  "social-marketing": "social",
  "email-marketing": "mass_mailing",
  "sms-marketing": "mass_mailing_sms",
  events: "event",
  "marketing-automation": "marketing_automation",
  surveys: "survey",
  project: "project",
  timesheet: "hr_timesheet",
  "field-service": "planning_field_service",
  helpdesk: "helpdesk",
  planning: "planning",
  appointments: "appointment",
  discuss: "mail",
  "artificial-intelligence": "web_studio",
  iot: "iot",
  voip: "voip",
  knowledge: "knowledge",
  whatsapp: "mail",
  studio: "web_studio",
};

export function appIconUrl(slug: string): string {
  const iconModule = appIconModules[slug] ?? slug.replace(/-/g, "_");
  return `${ICONS}/${iconModule}/static/description/icon.svg`;
}

export function appHeroUrl(slug: string): string {
  return `${WEBSITE}/apps/${slug}/hero_image.webp`;
}

export const homeImages = {
  appsSwitched: `${WEBSITE}/apps/home/apps_switched.svg`,
  speed1: `${WEBSITE}/apps/home/speed_1.webp`,
  speed3: `${WEBSITE}/apps/home/speed_3.webp`,
  speed4: `${WEBSITE}/apps/home/speed_4.webp`,
  mobileProductivity: `${WEBSITE}/apps/home/mobile_productivity.webp`,
  uniqueValue: `${WEBSITE}/apps/home/unique-value-2024.svg`,
  aiClaude: `${WEBSITE}/apps/home/claude.webp`,
  ctrlK: `${WEBSITE}/apps/home/ctrl-k-630.gif`,
  yellowHighlight: `${WEBSITE}/snippets/s_wd_persona/bg_yellow.svg`,
  arrowDoodle: `${WEBSITE}/graphics/arrow_doodle_1.svg`,
  testimonialAvatar: `${WEBSITE}/snippets/s_wd_testimonials/avatar/van_donink.webp`,
  testimonialLogo: `${WEBSITE}/snippets/s_wd_testimonials/logo/kpmg_logo.svg`,
  quoteIcon: `${WEBSITE}/snippets/s_wd_testimonials/quote.svg`,
  arrowSm: `${WEBSITE}/arrows/secondary_arrow_sm_03.svg`,
} as const;

export function flagUrl(countryCode: string): string {
  return `${CDN}/base/static/img/country_flags/${countryCode}.png`;
}

export const odooLogoUrl = "https://www.odoo.com/logo.png?height=42";
