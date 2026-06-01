export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export type AppItem = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  relatedApps?: string[];
  color: string;
};

export type IndustryItem = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  solutions: string[];
};

export type StaticPage = {
  path: string;
  title: string;
  description: string;
  template: "generic" | "pricing" | "trial" | "contact" | "apps-list" | "industries-list" | "login";
  sections?: PageSection[];
};

export type PageSection = {
  heading: string;
  body: string;
  items?: string[];
};
