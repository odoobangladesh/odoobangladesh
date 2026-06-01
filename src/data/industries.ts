import type { IndustryItem } from "./types";

const defaultSolutions = [
  "Inventory and sales management",
  "Accounting and invoicing",
  "CRM and customer engagement",
  "Website and eCommerce",
  "HR and payroll",
  "Reporting and business intelligence",
];

function industry(
  slug: string,
  name: string,
  category: string,
  tagline: string,
  description?: string,
  solutions?: string[],
): IndustryItem {
  return {
    slug,
    name,
    category,
    tagline,
    description:
      description ??
      `Odoo provides a complete business management suite tailored for ${name.toLowerCase()} businesses. Run your operations on one integrated platform — from sales and inventory to accounting and HR.`,
    solutions: solutions ?? defaultSolutions,
  };
}

export const industries: IndustryItem[] = [
  industry("book-store", "Book Store", "Retail", "Manage your bookstore with ease"),
  industry("clothing-store", "Clothing Store", "Retail", "Fashion retail, simplified"),
  industry("furniture-store", "Furniture Store", "Retail", "Showroom to delivery"),
  industry("grocery-store", "Grocery Store", "Retail", "Fresh inventory management"),
  industry("hardware-store", "Hardware Store", "Retail", "Tools and supplies tracking"),
  industry("toy-store", "Toy Store", "Retail", "Delight customers efficiently"),
  industry("bar-pub", "Bar and Pub", "Food & Hospitality", "Hospitality operations unified"),
  industry("fine-dining-restaurant", "Restaurant", "Food & Hospitality", "Fine dining management"),
  industry("fast-food", "Fast Food", "Food & Hospitality", "Speed meets efficiency"),
  industry("guest-house", "Guest House", "Food & Hospitality", "Hospitality for small stays"),
  industry("beverage-distributor", "Beverage Distributor", "Food & Hospitality", "Distribution at scale"),
  industry("hotel", "Hotel", "Food & Hospitality", "Hotel management suite"),
  industry("real-estate-agency", "Real Estate Agency", "Real Estate", "Properties and clients in one place"),
  industry("architecture-firm", "Architecture Firm", "Real Estate", "Projects from concept to delivery"),
  industry("construction", "Construction", "Real Estate", "Build smarter with Odoo"),
  industry("property-management", "Property Management", "Real Estate", "Manage properties effortlessly"),
  industry("gardening", "Gardening", "Real Estate", "Landscaping business tools"),
  industry("property-owner-association", "Property Owner Association", "Real Estate", "Community management"),
  industry("accounting-firm", "Accounting Firm", "Consulting", "Practice management for accountants"),
  industry("odoo-partner", "Odoo Partner", "Consulting", "Grow your implementation business"),
  industry("marketing-agency", "Marketing Agency", "Consulting", "Campaigns and clients unified"),
  industry("law-firm", "Law firm", "Consulting", "Legal practice management"),
  industry("talent-acquisition", "Talent Acquisition", "Consulting", "Recruitment agency tools"),
  industry("audit-certification", "Audit & Certification", "Consulting", "Compliance and audit workflows"),
  industry("textile-manufacturing", "Textile", "Manufacturing", "Textile production control"),
  industry("metal-fabricator", "Metal", "Manufacturing", "Metal fabrication management"),
  industry("custom-furniture-production", "Furnitures", "Manufacturing", "Custom furniture production"),
  industry("food-distribution", "Food", "Manufacturing", "Food distribution excellence"),
  industry("micro-brewery", "Brewery", "Manufacturing", "Craft brewing operations"),
  industry("corporate-gifts", "Corporate Gifts", "Manufacturing", "Gift business management"),
  industry("sports-club", "Sports Club", "Health & Fitness", "Club membership and events"),
  industry("eyewear-store", "Eyewear Store", "Health & Fitness", "Optical retail management"),
  industry("fitness-center", "Fitness Center", "Health & Fitness", "Gym and membership tools"),
  industry("wellness-practitioners", "Wellness Practitioners", "Health & Fitness", "Wellness practice management"),
  industry("pharmacy", "Pharmacy", "Health & Fitness", "Pharmacy operations"),
  industry("hair-salon", "Hair Salon", "Health & Fitness", "Salon appointments and sales"),
  industry("handyman", "Handyman", "Trades", "Field service for trades"),
  industry("it-hardware-support", "IT Hardware & Support", "Trades", "IT services management"),
  industry("solar-energy", "Solar Energy Systems", "Trades", "Solar installation projects"),
  industry("shoe-maker", "Shoe Maker", "Trades", "Custom footwear business"),
  industry("cleaning-services", "Cleaning Services", "Trades", "Cleaning operations"),
  industry("hvac-services", "HVAC Services", "Trades", "HVAC field service"),
  industry("nonprofit-organization", "Nonprofit Organization", "Others", "Mission-driven management"),
  industry("environmental-agency", "Environmental Agency", "Others", "Environmental project tracking"),
  industry("billboard-rental", "Billboard Rental", "Others", "Advertising space management"),
  industry("photography", "Photography", "Others", "Creative business tools"),
  industry("bike-leasing", "Bike Leasing", "Others", "Leasing and fleet management"),
  industry("software-reseller", "Software Reseller", "Others", "Software sales and support"),
];

export const industriesBySlug = Object.fromEntries(industries.map((i) => [i.slug, i]));
