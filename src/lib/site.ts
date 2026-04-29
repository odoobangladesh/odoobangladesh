export const siteConfig = {
  name: "Odoo Bangladesh",
  domain: "odoobangladesh.com",
  url: "https://odoobangladesh.com",
  tagline: "Independent Odoo community & learning hub in Bangladesh",
  locale: "en_BD",
  email: "hello@odoobangladesh.com",
  socials: {
    facebook: "",
    linkedin: "",
    youtube: "",
    github: "",
  },
  brand: {
    primaryHsl: "312 70% 52%",
    secondaryHsl: "224 85% 60%",
  },
} as const;

export type SiteConfig = typeof siteConfig;
