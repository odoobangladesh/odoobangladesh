# Writer brief: OdooBangladesh.com content rewrite

You are rewriting MDX pages for odoobangladesh.com, an independent, community-run Odoo portal for Bangladesh. Read `/home/claude/ob/orig/docs/PROJECT_BLUEPRINT.md` sections 2, 4 (WS-B), 6, 8 and 10 before writing. The originals live in `/home/claude/ob/orig/content/<collection>/<slug>.mdx`. Write each rewritten file to `/mnt/user-data/outputs/content/<collection>/<slug>.mdx` with the SAME slug. Do not create new slugs.

## Non-negotiable rules

1. **No em dashes anywhere** (not the character "—" and not "--" used as a dash). Use commas, colons, or separate sentences. This is checked automatically and a single em dash fails the file.
2. **Minimum word count** (body only, frontmatter excluded), checked automatically:
   - modules 900, industries 1000, comparisons 1800, landings 1200, training-functional 700, training-technical 700, blog 1200, resources 500.
   Aim 10 to 20 percent above the minimum. Do not pad; add real guidance.
3. **Bangladesh first.** Every page must contain concrete Bangladesh specifics where relevant: BDT amounts, NBR VAT at 15 percent and Mushak forms (Mushak 6.3 tax invoice; Mushak 9.1 return, filed monthly or, since Finance Act 2026, quarterly covering three tax periods, due within 15 days of period end), VDS/TDS withholding, July to June fiscal year, Bangladesh Labour Act 2006 rules for payroll (festival bonus, gratuity, provident fund at 7 to 8 percent of basic matched by the employer under section 264 and mandatory for employers with 100 or more permanent workers since the 17 November 2025 amendment, overtime at double rate), bKash/Nagad/Rocket and local bank workflows, Bangla-language reports and UI, local hosting and data-residency questions, BGMEA/EPZ/bonded warehouse context for garments, load-shedding and connectivity realities for POS, and the local partner and freelancer landscape. Generic Odoo documentation rephrased is not acceptable.
4. **Name the Odoo version** the guidance applies to. Use "Odoo 17 to 19" as the supported range in `odooVersion` and in copy unless you verify something version-specific. Note that Odoo releases a new major version every October, so point readers to check.
5. **Figures must carry assumptions.** Odoo licence figures: Standard about USD 24.90 and Custom about USD 37.40 per user per month are Odoo's US list price with yearly billing. Odoo prices by region and Bangladeshi buyers usually see a lower regional price on odoo.com/pricing, so always label these as the US list price and treat BDT conversions as an upper bound ("up to about"). Never invent a Bangladesh price. Prices change yearly, usually January to April. One App Free and Community are free. When converting to BDT, state the assumed rate ("assuming roughly BDT 120 to 125 per USD") and present ranges, never single precise figures. Implementation cost ranges for Bangladesh: small SME 2 to 5 users, 3 to 6 apps: BDT 3 to 8 lakh; mid-size 10 to 30 users with customisation: BDT 8 to 25 lakh; manufacturing or garments with MRP, quality, and integrations: BDT 25 lakh to 1 crore plus. Always say these are community-observed ranges, not quotes. Use one consistent set of unit figures sitewide: consultant or partner day rate BDT 8,000 to 15,000 per person-day; small-business cloud hosting BDT 5,000 to 20,000 per month (BDT 60,000 to 2.4 lakh per year).
6. **Neutral community voice.** Never sell. Never say "we implement" or "hire us". Say "talk to a specialist", "the community", "a partner", "request a consultation". Never use the Odoo logo or imply affiliation. "Odoo" is fine in titles as the product discussed.
7. **Internal links.** Use only these routes (plus the slugs in `/home/claude/ob/orig/content/*`):
   `/`, `/about`, `/blog`, `/blog/{slug}`, `/comparisons`, `/comparisons/{slug}`, `/contact`, `/developer-resources`, `/events`, `/faq`, `/forum`, `/implementation-guide` (anchors: #discovery #process #configuration #data #uat #go-live #pitfalls), `/industries`, `/industries/{slug}`, `/learning-center`, `/modules`, `/modules/{slug}`, `/odoo-career-guide` (anchors #functional #technical), `/partners`, `/pricing-guide` (anchors #components #compare), `/resources/{slug}`, `/training`, `/training/functional`, `/training/functional/{slug}`, `/training/technical`, `/training/technical/{slug}`.
   Landing pages are linked by their SHORT slug: `/odoo-accounting-bangladesh`, `/odoo-pricing-bangladesh`, `/odoo-implementation-cost-bangladesh`, `/odoo-partners-bangladesh`, `/odoo-community-bangladesh`, `/odoo-for-garments-industry`, `/open-source-erp-bangladesh`, `/odoo-vs-erpnext`. Never link to `/landings/...`.
   Existing slugs: modules: accounting crm hr inventory manufacturing payroll pos project purchase sales. industries: construction distribution education garments manufacturing retail services sme. comparisons: odoo-vs-erpnext odoo-vs-microsoft-dynamics-365 odoo-vs-sap-business-one. training-functional: accounting hr inventory manufacturing pos. training-technical: deployment module-development orm owl performance. blog: odoo-implementation-cost-in-bangladesh what-is-odoo-erp. resources: erp-checklist functional-syllabus technical-syllabus.
8. **Linking rules (checked automatically via the `related:` frontmatter):**
   - module page: at least 2 other modules, 1 industry, 1 training topic, 1 implementation-guide section anchor.
   - industry page: 3 to 6 modules, 1 comparison, 1 resource.
   - comparison page: at least 2 modules, 1 industry, `/pricing-guide`, `/implementation-guide`, `/resources/erp-checklist`.
   - landing page: its parent pillar (one of /pricing-guide, /implementation-guide, /learning-center, /training, /modules, /industries, /comparisons, /partners), 2 cluster pages (module/industry/comparison/training), 1 resource.
   - blog post: at least 3 cluster or pillar pages.
   - training topic: previous and next topic in its track, its syllabus resource, and 1 module page.
   - resource: at least 3 related pages.
   Inline links in the body are encouraged in addition.
9. **One primary CTA per page, matched to funnel stage**, written as a short closing section titled "Next step": modules and industries offer the ERP checklist (`/resources/erp-checklist`); comparisons and pricing/cost landings offer "talk to a specialist" (`/contact`); training topics offer the syllabus and the next batch (`/resources/functional-syllabus` or `/resources/technical-syllabus`, and `/training`); blog offers the newsletter (mention it, link `/learning-center`); resources offer `/contact`.
10. **Honesty.** Do not invent named customers, case studies, statistics, or quotes. Worked examples must be clearly hypothetical ("Consider a Narayanganj knitwear factory with 400 workers"). Do not state Google rankings, market share numbers, or partner counts you cannot source.

## Frontmatter (YAML, exact keys)

```yaml
---
title: "..."                 # 50 to 65 characters, includes the primary keyword and "Bangladesh" where natural
description: "..."           # 140 to 160 characters, a direct answer, no marketing fluff
date: "2026-10-14"           # keep the original date if the original had one, else today
updated: "2026-10-14"
author: "Odoo Bangladesh Community"
odooVersion: "17 to 19"      # omit on blog/resources where not relevant
keywords:
  - ...                      # 4 to 8, keep the originals and add long-tail Bangla-market variants in English
canonical: "/odoo-xxx"       # ONLY on landings, copy from the original file
related:
  - label: "..."
    href: "/..."
faq:
  - q: "..."
    a: "..."                 # 3 to 5 pairs; 1 to 3 sentences each; plain text, no markdown
---
```

## Required body structure

Start with a direct answer paragraph (the first 100 words answer the query the page targets). Use `##` headings, short paragraphs, tables where comparing, and bullet lists only for lists. Required sections per collection:

- **modules**: What the module does; Key features (Odoo 17 to 19); Bangladesh-specific considerations; Community vs Enterprise differences for this module; Typical implementation steps; Common mistakes; FAQ (render the same questions as `faq:` under a `## Frequently asked questions` heading); Next step.
- **industries**: Industry context in Bangladesh; Pain points; Module map (table: module, why it matters here); A worked example workflow (hypothetical, named city/sector); Implementation checklist; FAQ; Next step.
- **comparisons**: Direct verdict; Side-by-side table (licensing, hosting, localisation for Bangladesh, modules, customisation, partner ecosystem, typical total cost range in BDT, best fit); Pricing model; Localisation for Bangladesh; Implementation and partner ecosystem; Who should pick which; Migration considerations; FAQ; Next step.
- **landings**: Direct answer in first 100 words; Detailed guidance; Cost or effort ranges with assumptions stated; Common questions; Next step. Keep the `canonical` from the original.
- **training topics**: Learning outcomes; Prerequisites; Syllabus outline (table: week or session, topic, exercise); Practice exercises (concrete, Bangladesh-flavoured data); Recommended order (previous and next topic); Where it leads (career or next topic, link /odoo-career-guide); FAQ; Next step.
- **blog**: Standard article with an intro, 5 to 8 sections, a conclusion; link to pillars and clusters; Next step with newsletter.
- **resources**: The asset itself rendered on the page (checklist as grouped checkbox-style lists, syllabus as a session table) plus explanatory copy on how to use it; FAQ optional; Next step.

## Style

Plain English, confident, specific. Short sentences. Prefer "you" and "your team". No exclamation marks. No "In today's fast-paced world" type openers. No "genuinely", "honestly", "straightforward", "seamless", "robust", "leverage". Use British or Bangladeshi English spellings consistently within a file (organisation, customisation, localisation). Numbers: BDT 5 lakh, BDT 1.2 crore, 15 percent.

## Verified technical facts

- Odoo 17 to 19 ship `l10n_bd` (Bangladesh chart of accounts, VAT rates 0 to 15 percent, default tax is 10 percent so set it to 15). Mushak 6.3, 6.1/6.2, 9.1, VDS/TDS and Bangla reports are implementation or add-on work. No official Bangladesh payroll localisation; Payroll is Enterprise-only.
- The product variant grid (`sale_product_matrix`, `purchase_product_matrix`) is in Community.
- OWL 2 code must run on 17 to 19: use `orm.searchRead` or `orm.call`, `t-out` not `t-esc`, `static props = { "*": true }` on client actions; `rpc` is a service in 17 and a function from `@web/core/network/rpc` in 18 and 19; tests use QUnit in 17 and HOOT in 18 and 19.
- FAQ body markup: `## Frequently asked questions`, then each question as a `### ` heading followed by the answer paragraph.

## Self-check before finishing each file

- `grep -c "—"` must be 0 and no " -- " dashes.
- Word count of body meets the minimum (count words after the closing `---` of frontmatter).
- Every `href` is in the allowed route list, every `related` rule for the collection is satisfied.
- `faq:` present with 3 to 5 pairs and mirrored in the body.
- No sales language, no invented facts.
