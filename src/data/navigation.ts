import type { NavGroup } from "./types";

export const appsNav: NavGroup[] = [
  {
    title: "Finance",
    items: [
      { label: "Accounting", href: "/app/accounting" },
      { label: "Invoicing", href: "/app/invoicing" },
      { label: "Expenses", href: "/app/expenses" },
      { label: "Spreadsheet (BI)", href: "/app/spreadsheet" },
      { label: "Documents", href: "/app/documents" },
      { label: "Sign", href: "/app/sign" },
    ],
  },
  {
    title: "Sales",
    items: [
      { label: "CRM", href: "/app/crm" },
      { label: "Sales", href: "/app/sales" },
      { label: "POS Shop", href: "/app/point-of-sale-shop" },
      { label: "POS Restaurant", href: "/app/point-of-sale-restaurant" },
      { label: "Subscriptions", href: "/app/subscriptions" },
      { label: "Rental", href: "/app/rental" },
    ],
  },
  {
    title: "Websites",
    items: [
      { label: "Website Builder", href: "/app/website" },
      { label: "eCommerce", href: "/app/ecommerce" },
      { label: "Blog", href: "/app/blog" },
      { label: "Forum", href: "/app/forum" },
      { label: "Live Chat", href: "/app/live-chat" },
      { label: "eLearning", href: "/app/elearning" },
    ],
  },
  {
    title: "Supply Chain",
    items: [
      { label: "Inventory", href: "/app/inventory" },
      { label: "Manufacturing", href: "/app/manufacturing" },
      { label: "PLM", href: "/app/plm" },
      { label: "Purchase", href: "/app/purchase" },
      { label: "Maintenance", href: "/app/maintenance" },
      { label: "Quality", href: "/app/quality" },
    ],
  },
  {
    title: "Human Resources",
    items: [
      { label: "Employees", href: "/app/employees" },
      { label: "Recruitment", href: "/app/recruitment" },
      { label: "Time Off", href: "/app/time-off" },
      { label: "Appraisals", href: "/app/appraisals" },
      { label: "Referrals", href: "/app/referrals" },
      { label: "Fleet", href: "/app/fleet" },
    ],
  },
  {
    title: "Marketing",
    items: [
      { label: "Social Marketing", href: "/app/social-marketing" },
      { label: "Email Marketing", href: "/app/email-marketing" },
      { label: "SMS Marketing", href: "/app/sms-marketing" },
      { label: "Events", href: "/app/events" },
      { label: "Marketing Automation", href: "/app/marketing-automation" },
      { label: "Surveys", href: "/app/surveys" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Project", href: "/app/project" },
      { label: "Timesheets", href: "/app/timesheet" },
      { label: "Field Service", href: "/app/field-service" },
      { label: "Helpdesk", href: "/app/helpdesk" },
      { label: "Planning", href: "/app/planning" },
      { label: "Appointments", href: "/app/appointments" },
    ],
  },
  {
    title: "Productivity",
    items: [
      { label: "Discuss", href: "/app/discuss" },
      { label: "Artificial Intelligence", href: "/app/artificial-intelligence" },
      { label: "IoT", href: "/app/iot" },
      { label: "VoIP", href: "/app/voip" },
      { label: "Knowledge", href: "/app/knowledge" },
      { label: "WhatsApp", href: "/app/whatsapp" },
    ],
  },
];

export const industriesNav: NavGroup[] = [
  {
    title: "Retail",
    items: [
      { label: "Book Store", href: "/industries/book-store" },
      { label: "Clothing Store", href: "/industries/clothing-store" },
      { label: "Furniture Store", href: "/industries/furniture-store" },
      { label: "Grocery Store", href: "/industries/grocery-store" },
      { label: "Hardware Store", href: "/industries/hardware-store" },
      { label: "Toy Store", href: "/industries/toy-store" },
    ],
  },
  {
    title: "Food & Hospitality",
    items: [
      { label: "Bar and Pub", href: "/industries/bar-pub" },
      { label: "Restaurant", href: "/industries/fine-dining-restaurant" },
      { label: "Fast Food", href: "/industries/fast-food" },
      { label: "Guest House", href: "/industries/guest-house" },
      { label: "Beverage Distributor", href: "/industries/beverage-distributor" },
      { label: "Hotel", href: "/industries/hotel" },
    ],
  },
  {
    title: "Real Estate",
    items: [
      { label: "Real Estate Agency", href: "/industries/real-estate-agency" },
      { label: "Architecture Firm", href: "/industries/architecture-firm" },
      { label: "Construction", href: "/industries/construction" },
      { label: "Property Management", href: "/industries/property-management" },
      { label: "Gardening", href: "/industries/gardening" },
      { label: "Property Owner Association", href: "/industries/property-owner-association" },
    ],
  },
  {
    title: "Consulting",
    items: [
      { label: "Accounting Firm", href: "/industries/accounting-firm" },
      { label: "Odoo Partner", href: "/industries/odoo-partner" },
      { label: "Marketing Agency", href: "/industries/marketing-agency" },
      { label: "Law firm", href: "/industries/law-firm" },
      { label: "Talent Acquisition", href: "/industries/talent-acquisition" },
      { label: "Audit & Certification", href: "/industries/audit-certification" },
    ],
  },
  {
    title: "Manufacturing",
    items: [
      { label: "Textile", href: "/industries/textile-manufacturing" },
      { label: "Metal", href: "/industries/metal-fabricator" },
      { label: "Furnitures", href: "/industries/custom-furniture-production" },
      { label: "Food", href: "/industries/food-distribution" },
      { label: "Brewery", href: "/industries/micro-brewery" },
      { label: "Corporate Gifts", href: "/industries/corporate-gifts" },
    ],
  },
  {
    title: "Health & Fitness",
    items: [
      { label: "Sports Club", href: "/industries/sports-club" },
      { label: "Eyewear Store", href: "/industries/eyewear-store" },
      { label: "Fitness Center", href: "/industries/fitness-center" },
      { label: "Wellness Practitioners", href: "/industries/wellness-practitioners" },
      { label: "Pharmacy", href: "/industries/pharmacy" },
      { label: "Hair Salon", href: "/industries/hair-salon" },
    ],
  },
  {
    title: "Trades",
    items: [
      { label: "Handyman", href: "/industries/handyman" },
      { label: "IT Hardware & Support", href: "/industries/it-hardware-support" },
      { label: "Solar Energy Systems", href: "/industries/solar-energy" },
      { label: "Shoe Maker", href: "/industries/shoe-maker" },
      { label: "Cleaning Services", href: "/industries/cleaning-services" },
      { label: "HVAC Services", href: "/industries/hvac-services" },
    ],
  },
  {
    title: "Others",
    items: [
      { label: "Nonprofit Organization", href: "/industries/nonprofit-organization" },
      { label: "Environmental Agency", href: "/industries/environmental-agency" },
      { label: "Billboard Rental", href: "/industries/billboard-rental" },
      { label: "Photography", href: "/industries/photography" },
      { label: "Bike Leasing", href: "/industries/bike-leasing" },
      { label: "Software Reseller", href: "/industries/software-reseller" },
    ],
  },
];

export const communityNav: NavGroup[] = [
  {
    title: "Learn",
    items: [
      { label: "Tutorials", href: "/slides/all/tag/odoo-tutorials-9" },
      { label: "Documentation", href: "/page/docs" },
      { label: "Certifications", href: "/slides/all" },
      { label: "Training", href: "/training-events" },
      { label: "Blog", href: "/blog" },
      { label: "Podcast", href: "https://podcast.odoo.com", external: true },
    ],
  },
  {
    title: "Empower Education",
    items: [
      { label: "Education Program", href: "/education/program" },
      { label: "Scale Up! Business Game", href: "/education/scale-up-business-game" },
      { label: "Visit Odoo", href: "/education/visit-odoo" },
    ],
  },
  {
    title: "Get the Software",
    items: [
      { label: "Download", href: "/page/download" },
      { label: "Compare Editions", href: "/page/editions" },
      { label: "Releases", href: "/page/release-notes" },
    ],
  },
  {
    title: "Collaborate",
    items: [
      { label: "Github", href: "https://github.com/odoo/odoo", external: true },
      { label: "Forum", href: "/forum/help-1" },
      { label: "Events", href: "/events" },
      { label: "Translations", href: "/page/docs" },
      { label: "Become a Partner", href: "/become-a-partner" },
      { label: "Services for Partners", href: "/services/partners" },
      { label: "Register your Accounting Firm", href: "/accounting-firms/register" },
    ],
  },
  {
    title: "Get Services",
    items: [
      { label: "Find a Partner", href: "/partners" },
      { label: "Find an Accountant", href: "/accounting-firms" },
      { label: "Meet an advisor", href: "/appointment/514" },
      { label: "Implementation Services", href: "/pricing-packs" },
      { label: "Customer References", href: "/blog/customer-reviews-6" },
      { label: "Support", href: "/help" },
      { label: "Upgrades", href: "https://upgrade.odoo.com", external: true },
    ],
  },
];

export const footerCommunity = [
  { label: "Tutorials", href: "/slides/all/tag/odoo-tutorials-9" },
  { label: "Documentation", href: "/page/docs" },
  { label: "Forum", href: "/forum/help-1" },
];

export const footerOpenSource = [
  { label: "Download", href: "/page/download" },
  { label: "Github", href: "https://github.com/odoo/odoo", external: true },
  { label: "Runbot", href: "https://runbot.odoo.com", external: true },
  { label: "Translations", href: "/page/docs" },
];

export const footerServices = [
  { label: "Odoo.sh Hosting", href: "https://www.odoo.sh", external: true },
  { label: "Support", href: "/help" },
  { label: "Upgrade", href: "https://upgrade.odoo.com", external: true },
  { label: "Custom Developments", href: "/page/developers-on-demand" },
  { label: "Education", href: "/education/program" },
  { label: "Find an Accountant", href: "/accounting-firms" },
  { label: "Find a Partner", href: "/partners" },
  { label: "Become a Partner", href: "/become-a-partner" },
];

export const footerAbout = [
  { label: "Our company", href: "/page/about-us" },
  { label: "Brand Assets", href: "/page/brand-assets" },
  { label: "Contact us", href: "/contactus" },
  { label: "Jobs", href: "/jobs" },
  { label: "Events", href: "/events" },
  { label: "Podcast", href: "https://podcast.odoo.com", external: true },
  { label: "Blog", href: "/blog" },
  { label: "Customers", href: "/blog/customer-reviews-6" },
  { label: "Legal", href: "/legal" },
  { label: "Privacy", href: "/privacy" },
  { label: "Security", href: "/security" },
];

export const topNavLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Help", href: "/help" },
];

export const advisorLinks = [
  { label: "Micro Business (1-5 employees)", href: "/appointment/7440" },
  { label: "Small Business (6-50 employees)", href: "/appointment/181" },
  { label: "Midsized company (51-250 employees)", href: "/appointment/6865" },
  { label: "Large company (250+ employees)", href: "/appointment/1113" },
];
