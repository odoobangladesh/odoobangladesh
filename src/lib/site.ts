export const siteConfig = {
  name: "Odoo Bangladesh",
  shortName: "Odoo Bangladesh",
  domain: "odoobangladesh.com",
  siteUrl: "https://odoobangladesh.com",
  description:
    "Bangladesh’s independent Odoo ERP learning and demand portal: implementation guides, industry pages, training, packages, and consultation paths that connect qualified interest to Binary Quest.",
  contactEmail: "hello@odoobangladesh.com",
  /** Practice CRM lead source tag required by the 2027 domain strategy. */
  leadSource: "odoobangladesh.com",
  operator: {
    name: "Binary Quest Limited",
    url: "https://www.binaryquest.com/",
    odooPartnerUrl:
      "https://www.binaryquest.com/service/odoo-partner-bangladesh",
    email: "info@binaryquest.com",
    phone: "+880 2 9350383",
    whatsappE164: "8801937091332",
    address: "245/2 New Circular Road, Malibagh, Dhaka, Bangladesh",
    blurb:
      "Binary Quest Limited operates this portal and delivers Odoo implementation, migration, training, and care plans in Bangladesh.",
  },
  sisterSites: {
    binaryquest: {
      label: "Binary Quest",
      url: "https://www.binaryquest.com/",
      purpose: "Company, case studies, careers, and Odoo practice credibility",
    },
    erpbangladesh: {
      label: "ERP Bangladesh",
      url: "https://erpbangladesh.com/",
      purpose: "Early-stage ERP education when buyers have not chosen Odoo yet",
    },
  },
  social: {
    whatsapp: "https://wa.me/8801937091332",
    linkedin: "https://www.linkedin.com/company/binaryquest",
    facebook: "https://www.facebook.com/binaryquest",
    youtube: "https://www.youtube.com/",
  },
} as const;
