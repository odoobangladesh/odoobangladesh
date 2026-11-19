# Rebuild prompt: identical product, new UI

Use the prompt in section 2 with Cursor (or another coding agent) to rebuild odoobangladesh.com with the same purpose, routes, content model, conversion flows, and SEO contracts — and an entirely different visual design.

---

## 1. Project summary (reference)

**Purpose:** Bangladesh-focused Odoo ERP education and demand portal. Rank via topical SEO; convert into consultation, training, newsletter, and gated-resource leads for Binary Quest Limited; present as a neutral community portal (not official Odoo, not a hard-sell agency site).

| Area | Behavior |
|------|----------|
| Content engine | MDX under `content/<collection>/`, typed frontmatter, draft filtering, static generation |
| SEO silos | Modules, industries, comparisons, training, keyword landings, pillars, blog, resources |
| Packages | 5 fixed-scope offers (Starter → Care Plan) with inquiry deep-links |
| Lead capture | Inquiry form, newsletter, email-gated resources, exit-intent checklist modal |
| Lead pipeline | Zod APIs → local JSONL + optional `CRM_WEBHOOK_URL`; UTM/attribution; honeypot |
| Site chrome | Header/footer, sticky mobile CTA, WhatsApp FAB, skip link |
| SEO | Canonicals, sitemap, robots, Organization/WebSite/Article/Course/FAQ/Breadcrumb JSON-LD |
| Community stubs | Events (static list), Forum (ask via contact) |
| Quality | `scripts/content-check.mjs` for depth/links/style |

Related docs: `PROJECT_BLUEPRINT.md`, `CONTENT_GUIDE.md`, `Branding_Guidline.md`.

---

## 2. Prompt to paste into Cursor

```markdown
# Build: Odoo Bangladesh portal (identical product, new UI)

Build a complete website that is functionally and structurally identical to odoobangladesh.com, with ONE deliberate difference: invent an entirely new visual design system and layout language. Do NOT copy the current “Quiet Premium” look (Bricolage/Hind, soft glass header, green brand-deep footer, react-bits atmospheric effects, landing-atmosphere variants, or the existing component skins). Keep every route, content model, conversion behavior, SEO contract, and business rule the same.

## 1. Product purpose

Create **Odoo Bangladesh** (odoobangladesh.com): an independent, Bangladesh-first educational portal for Odoo ERP.

Goals:
1. Rank for Bangladesh Odoo queries (learning, pricing, implementation, comparisons, industries, modules).
2. Convert visitors into leads: consultation, training, newsletter, gated downloads, webinar interest.
3. Act as a learning hub (guides, syllabi, events stub, forum stub).

Positioning constraints (non-negotiable):
- Educational / community voice first. Soft commercial path to Binary Quest Limited (operator / Odoo partner).
- NOT an official Odoo S.A. property. No Odoo logo, wordmark, purple palette, or product-UI imitation.
- Light theme only. No dark-mode toggle / prefers-color-scheme dark theme.
- Footer on every page: “Not affiliated with Odoo S.A.”
- Bengali-capable font fallback required.
- Never invent customers, stats, rankings, or fake case studies.
- No em dashes in published copy (house style).
- Bangladesh-first facts: BDT ranges with assumptions, NBR VAT 15%, Mushak forms, VDS/TDS, July–June fiscal year, local payroll notes, bKash/Nagad/Rocket, local hosting, partner landscape, Odoo 17–19 / l10n_bd.

Operator config (siteConfig):
- name: Odoo Bangladesh
- siteUrl: https://odoobangladesh.com
- contactEmail: hello@odoobangladesh.com
- leadSource: "odoobangladesh.com"
- operator: Binary Quest Limited (url, phone, WhatsApp E.164 8801937091332, address Malibagh Dhaka, Odoo partner page)
- sister sites: binaryquest.com, erpbangladesh.com
- social: WhatsApp, LinkedIn, Facebook, YouTube (real Binary Quest profiles)

## 2. Stack

- Next.js App Router (current major), React, TypeScript, Tailwind CSS
- MDX via next-mdx-remote (RSC), gray-matter, remark-gfm, rehype-slug, rehype-autolink-headings
- zod for API validation
- lucide-react (or equivalent) for icons
- Static generation via generateStaticParams for all collection detail routes
- No CMS required for v1 (filesystem MDX)

## 3. Information architecture (exact routes)

### Global chrome (every page)
- Sticky header: Blog, Learning Center, Modules, Industries, Comparisons, Training, Events, Forum
- Utility CTAs: Request consultation → /contact; Explore training → /training
- Footer: Explore + Community links, contact email, affiliation disclaimer
- Sticky mobile CTA → /contact
- WhatsApp floating action button
- Exit-intent modal (once per session, localStorage) offering ERP checklist unlock via email gate
- Skip-to-content link

### Homepage sections (same jobs; new composition/UI)
1. Hero: community portal for Bangladesh; CTAs to resources, consultation, training; live published-guide count
2. Live coverage: counters from real collection lengths (modules, industries, training, comparisons, packages, resources) + functional/technical training split
3. Process/journey: Learn → Map → Compare → Plan → Act (links to learning-center, modules, comparisons, implementation-guide, contact)
4. Portal index destinations (implementation, modules, industries, comparisons, training, packages, pricing, checklist, career, partners, etc.)
5. Comparison shortlist matrix teaser (Odoo vs ERPNext vs Tally) + links to full guides
6. Newsletter + community principles
7. Popular keyword landings tiles
8. Packages CTA band

### Pillar / hand-authored pages
- /about — operator disclosure (Binary Quest), what the portal is/isn’t, sister-site roles
- /faq — FAQ with FAQPage JSON-LD
- /contact — inquiry form (supports ?interest=&package= query defaults)
- /partners — partner guidance + path to Binary Quest
- /developer-resources — technical learner hub
- /odoo-career-guide — functional vs technical career paths
- /learning-center — hub to training, resources, blog
- /implementation-guide — long guide with anchors: #discovery #process #configuration #data #uat #go-live #pitfalls
- /pricing-guide — cost components with anchors #components #compare
- /events — list upcomingEvents from data module (webinar/workshop stubs)
- /forum — stub; “Ask a question” → /contact
- /packages — directory of 5 packages
- /packages/[slug] — starter | business | growth | enterprise | care-plan
- /training — hub
- /training/functional — directory
- /training/technical — directory
- /modules, /industries, /comparisons, /blog — directories
- /resources/[slug] — resource detail (email-gated body where applicable)

### Keyword landings (canonical short slugs; content from content/landings/*.mdx)
Serve at:
- /odoo-accounting-bangladesh
- /odoo-pricing-bangladesh
- /odoo-implementation-cost-bangladesh
- /odoo-partners-bangladesh
- /odoo-community-bangladesh
- /odoo-for-garments-industry
- /open-source-erp-bangladesh
- /odoo-vs-erpnext (comparison canonical short slug)

Also:
- /odoo-functional-training and /odoo-technical-training may exist as aliases/redirects into /training/*
- /landings/[slug] must permanentRedirect (308) to each doc’s canonical short path when set
- Sitemap must emit canonical URLs only (not /landings/* duplicates)
- lastModified from MDX date/updated, not new Date() every build

### MDX collection detail routes
- /blog/[slug]
- /modules/[slug]
- /industries/[slug]
- /comparisons/[slug]
- /training/functional/[slug]
- /training/technical/[slug]
- /resources/[slug]

Shared DocPage behavior for all MDX details:
- title, description, meta line (date/updated/author/odooVersion)
- rendered MDX body + optional video embed if frontmatter.video
- reading progress + table of contents from headings
- FAQ section mirroring frontmatter faq[]
- RelatedLinks from frontmatter related[]
- Correct JSON-LD (Article/BlogPosting, Course, FAQPage, BreadcrumbList)
- canonical = doc.path (canonical frontmatter for landings, else /collection/slug)
- remember last-visited guide in localStorage (optional UX, if implementing parity)

## 4. Content collections (filesystem)

content/
- blog/ (2): what-is-odoo-erp, odoo-implementation-cost-in-bangladesh
- landings/ (7): the 7 keyword landings above (except odoo-vs-erpnext which may live under comparisons with canonical short path)
- modules/ (10): accounting, inventory, purchase, sales, crm, manufacturing, hr, payroll, pos, project
- industries/ (9): garments, manufacturing, retail, distribution, services, construction, education, sme, food-beverage
- comparisons/ (4): odoo-vs-erpnext, odoo-vs-sap-business-one, odoo-vs-microsoft-dynamics-365, odoo-vs-tally
- training-functional/ (5): accounting, hr, inventory, manufacturing, pos
- training-technical/ (5): deployment, module-development, orm, owl, performance
- resources/ (3): erp-checklist, functional-syllabus, technical-syllabus

ContentDoc frontmatter:
title, description, date?, updated?, author?, odooVersion?, tags?, keywords?, canonical?, image?, video?, draft?, related[{label,href}], faq[{q,a}], body

Drafts excluded from lists/sitemap. Provide a content loader (listDocs, getDoc, listCollectionSlugs) and content-check script enforcing:
- min words by collection (modules 900, industries 1000, comparisons 1800, landings 1200, training 700, blog 1200, resources 500)
- no em dashes
- internal linking rules via related[]
- valid href allowlist

Internal linking rules:
- module → ≥2 modules, 1 industry, 1 training topic, 1 implementation-guide anchor
- industry → 3–6 modules, 1 comparison, 1 resource
- comparison → ≥2 modules, 1 industry, /pricing-guide, /implementation-guide, /resources/erp-checklist
- landing → parent pillar + 2 cluster pages + 1 resource
- blog → ≥3 cluster/pillar pages
- training topic → prev/next + syllabus resource + 1 module
- resource → ≥3 related pages

CTA by funnel (closing “Next step”):
- modules/industries → ERP checklist
- comparisons/pricing landings → talk to specialist /contact
- training → syllabus + /training
- blog → newsletter / learning-center
- resources → /contact

## 5. Packages data (TS module, not MDX)

Exact slugs and commercial meaning:
1. starter — finance & sales foundation (Accounting, Invoicing, Sales, CRM)
2. business — trading & distribution (Sales, Purchase, Inventory, Accounting)
3. growth — manufacturing/MRP expansion
4. enterprise — multi-company, HR/payroll, migration, integrations
5. care-plan — AMC + hosting after go-live

Each package: name, eyebrow, summary, bestFor, modules[], includes[], outcomes[], relatedIndustries[], relatedGuides[], ctaLabel (talk to Binary Quest…).
Package detail CTAs deep-link contact with interest + package query params.
Do NOT publish fixed public price lists; quotes after discovery.

## 6. Conversion / APIs

### POST /api/inquiry
Zod fields:
- name, email, phone?, company?
- role: business | professional | student | developer | organization
- interest: erp-assessment | implementation-guidance | talk-to-specialist | functional-training | technical-training | company-training | webinar | care-plan
- package?: starter | business | growth | enterprise | care-plan
- message?, honeypot?
- attribution: source_path, referrer, utm_*

Infer lead_type: commercial | learner | newsletter | webinar from role/interest.
Always tag source = odoobangladesh.com.
Persist: append JSONL under .data/leads.jsonl; optional POST to CRM_WEBHOOK_URL (+ Bearer CRM_WEBHOOK_TOKEN).
Honeypot filled → pretend success, do not notify.
Never return ok:true without a successful write (except ignored honeypot).

### POST /api/newsletter
email + optional asset (e.g. erp-checklist) + honeypot + attribution.
Same capture pipeline.

### Client capture surfaces
- InquiryForm on /contact (and package pages)
- NewsletterCard
- ResourceEmailGate (localStorage unlock key per asset; wraps checklist/syllabus content)
- ExitIntentLeadModal uses ResourceEmailGate for checklist
- StickyCta + WhatsAppFab

Community-friendly rules:
- one exit-intent per session
- “no spam” near email fields
- gated assets still summarized ungated enough to rank

## 7. SEO / metadata

- metadataBase, title template `%s | Odoo Bangladesh`
- per-page canonical, OpenGraph, Twitter
- app/sitemap.ts and app/robots.ts
- sitewide Organization + WebSite JSON-LD (sameAs only real profiles)
- typed schema builders: breadcrumbList, faqPage, article/BlogPosting, course, itemList for directories
- English lang=en for now (Bangla routes optional later)

## 8. Events data

Static upcomingEvents array with slug, title, date, format (Webinar|Workshop), summary, audience. /events lists them. No registration backend required beyond linking to /contact?interest=webinar.

## 9. What MUST stay identical

- All routes and URL semantics (including landing canonical model)
- All collections, slugs, and content meaning (you may author MDX to the same depth/rules; do not invent fake claims)
- Lead field contracts, APIs, attribution, honeypot, CRM webhook behavior
- Package definitions and inquiry interest enums
- Funnel CTAs destinations
- SEO schema types and canonical/sitemap rules
- Operator/disclaimer/positioning
- Accessibility basics (landmarks, skip link, focus management on modals/menus)

## 10. What MUST be different (the only intentional delta)

- Entire visual design system: color tokens, typography, spacing, radii, surfaces, illustration/motion language
- Homepage and page layouts/composition
- Component skins (header, footer, cards, forms, matrices, CTAs, modals)
- Motion library choices (you may use motion/GSAP/CSS; do not recreate the current atmospheric react-bits look)
- Still light theme, community-credible, Bangladesh-capable typography, WCAG-conscious contrast
- Avoid generic AI-template aesthetics (purple SaaS gradients, cream+terracotta newspaper, dark neon)

Design brief for the NEW UI (choose one coherent direction and execute fully):
“Modern editorial knowledge base for Bangladesh professionals — clear hierarchy, strong reading experience for long guides, distinctive brand mark for ‘Odoo Bangladesh’, restrained motion that aids orientation, data visualizations for portal coverage and comparisons, zero hard-sell chrome.”

## 11. Deliverables / definition of done

1. Runnable Next.js app with all routes above
2. Content loader + populated MDX collections meeting depth/linking rules (or migrate existing content folder unchanged)
3. Working inquiry + newsletter APIs with local JSONL + optional webhook
4. Email gate + exit intent + sticky CTA + WhatsApp
5. Packages index/detail
6. SEO metadata + JSON-LD + sitemap/robots
7. content-check script + lint/typecheck/build pass
8. .env.example documenting CRM_WEBHOOK_URL, CRM_WEBHOOK_TOKEN, NEXT_PUBLIC WhatsApp if used
9. README explaining structure and how leads flow to Binary Quest

Build the product completely. Re-skin freely. Do not change the product.
```
