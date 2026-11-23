# Odoo Bangladesh — Website objective and remaining work

Last updated: 22 November 2026  
Audience: product, marketing, and engineering  
Sources: `Binary_Quest_Domain_Strategy_odoobangladesh_com.docx`, `PROJECT_BLUEPRINT.md`, `.cursor/plans/p1_objective_support_29750cb2.plan.md`, `.cursor/plans/p2_community_layer_ea42a94e.plan.md`, current codebase

---

## 1. What is the objective of this website?

**odoobangladesh.com** is Binary Quest Limited’s primary **Odoo demand and SEO engine** for Bangladesh.

It is an **educational community portal** first (guides, training, modules, industries, comparisons, events). It is **not** Binary Quest’s corporate brochure site. Commercial paths still exist: packages, consultation forms, webinars, and care-plan CTAs route qualified interest into Binary Quest’s CRM with lead source tagged as `odoobangladesh.com`.

### One-sentence objective

Attract people and businesses searching for Odoo in Bangladesh, teach them enough to trust the portal, convert serious interest into marketing-qualified leads, and hand those leads to Binary Quest so sales can turn them into proposals and customers.

### Shared 2027 practice goal (all three domains)

These targets are shared across the practice, not owned only by this site:

| Stage | 2027 target |
| --- | --- |
| Marketing Qualified Leads (MQLs) | 208 (~17 / month) |
| Sales Qualified Leads (SQLs) | 73 |
| Proposals | 40 |
| Wins | 14 |
| Programme budget | Tk 12 lakh |

### This domain’s contribution

| Role | Target |
| --- | --- |
| Direct MQLs from odoobangladesh.com | **90–110** (~45–50% of 208) |
| How | Organic SEO, newsletter, training → consult, consultation forms, webinar registrations |
| Assisted | Google / LinkedIn ads for Odoo keywords land on industry or package pages here (not on binaryquest.com homepage) |

### How success is measured (domain KPIs)

| KPI | 2027 target |
| --- | --- |
| Direct MQLs | 90–110 |
| Organic sessions | +100% vs Q1 baseline by Dec 2027 |
| Consultation form conversion (session → submit on commercial pages) | ≥ 1.5% |
| SQL acceptance of MQLs from this domain | ≥ 35% |
| Programme-assisted cost per MQL | Contribute to ≤ Tk 5,800 overall |
| Package + top industry/comparison pages indexed | Live by Mar 2027 |

### Three-domain system

| Domain | Job |
| --- | --- |
| **odoobangladesh.com** | Odoo education, SEO, packages, training, consultation MQLs |
| **binaryquest.com** | Company credibility, full case studies, careers |
| **erpbangladesh.com** | Early-stage “any ERP” research before the buyer chooses Odoo |

They split discovery and trust. They do **not** each chase a separate revenue target.

### Positioning rules (still binding)

- Keep an educational / community tone for trust.
- Disclose that Binary Quest operates the portal and delivers implementation.
- Do not pretend to be a different company, and do not present as official Odoo S.A.
- Light theme only; no official Odoo brand assets.
- Student-only training interest is marked `learner`, not forced into sales as SQL.
- Company-training / buyer consultation with budget becomes commercial pipeline.

---

## 2. What is already in place

The product shell for the objective is largely built. **P1 product work is shipped** (homepage conversion composition, commercial embeds/attribution, OG/CI/anti-abuse, first Bangla mirrors).

### Product and IA

- Next.js App Router site with MDX content collections (blog, landings, modules, industries, comparisons, training, resources)
- Pillar pages: learning center, implementation guide, pricing guide, career guide, training hubs
- Learning Center as knowledge hub: audience switcher, learning sequence, searchable catalog (`HubCatalog`), `/resources` index, `/knowledge-hub` → `/learning-center`
- Commercial packaging: Starter, Business, Growth, Enterprise, Care Plan (`/packages`)
- About / operator disclosure and sister-site links
- Events calendar: upcoming/past split, `/events/[slug]` detail, per-event registration interest, Event JSON-LD
- Trust teasers (workshop highlights + Binary Quest operator proof) on learning center and packages (home trust band removed in P1 thin-pass)
- Homepage conversion composition: hero → LiveCoverage → ProcessDiagram → AudienceSwitcher → newsletter/principles → PackageCta (portal index / compare matrix / popular tiles removed from `/`)
- Quiet Premium design system applied (tokens, typography, chrome, forms, docs)
- First Bangla money-page mirrors under `/bn` with `hreflang` pairs (pricing, implementation cost, accounting, garments, vs Tally)

### Conversion and attribution

- Consultation form with company, package, interest, UTM, page path, honeypot
- Embedded consultation on package pages and commercial MDX surfaces (industries, comparisons, landings) via `ConsultationBand` / sidebar form
- First-touch UTMs + `landing_path` persisted in `sessionStorage`; sticky CTA and PackageCta preserve UTMs on `/contact` links
- Lead source forced to `odoobangladesh.com`
- Learner vs commercial lead typing
- Newsletter subscribe with explicit consent + `consentAt`, attribution fields, and `/unsubscribe` (manual until ESP)
- ERP checklist + functional/technical syllabus email gates
- Path-aware sticky CTA (mobile everywhere; desktop on commercial paths including packages / industries / comparisons / cost landings)
- Local lead audit log (`.data/leads.jsonl`) and optional `CRM_WEBHOOK_URL`
- Ad keyword → URL matrix: `docs/AD_LANDING_KEYWORD_MAP.md`

### SEO plumbing

- Canonical short-slug model for money landings
- Sitemap (includes `/bn` mirrors), robots, metadata, JSON-LD helpers (Organization, WebSite, Article/BlogPosting, Course, Breadcrumb, FAQ, ItemList, Event)
- Dynamic Open Graph images via `/og?title=&label=` on docs, packages, events
- Organization `sameAs` limited to verified LinkedIn + Facebook (bare YouTube removed; Binary Quest as `parentOrganization` only)
- Internal related-links block on content pages
- `npm run content:check` quality gate script
- GitHub CI: `content:check` → lint → typecheck → build (`.github/workflows/ci.yml`)
- Inquiry/newsletter rate limiting (Upstash when configured; in-memory fallback) + Cloudflare Turnstile on inquiry (env-gated for local)

---

## 3. What still remains to achieve the objective

Ordered by impact on the 2027 MQL / SEO goals.

### P0 — Must do to hit the objective

#### A. Content depth and publishing cadence (main SEO / MQL engine)

**Why:** Thin pages will not rank for “Odoo Bangladesh”, “Odoo implementation Bangladesh”, or industry queries. The strategy assumes topical authority plus ~4 long-form articles per month.

**Remaining work:**

- [ ] Run `npm run content:check` and fix every depth / frontmatter / linking failure
- [ ] Bring all existing MDX pages to blueprint minimums (modules 900, industries 1000, comparisons 1800, landings 1200, training 700, blog 1200, resources 500)
- [ ] Prioritise deepen order: landings → comparisons → pillars → modules → industries → training → resources
- [ ] Operate editorial cadence: **4 long-form articles / month** mapped to strategy clusters (vs Tally/Excel, Mushak/Accounting, industry, implementation, comparisons, short proof → binaryquest.com)
- [ ] Deepen Bangla mirrors and add Bangla-first pieces where search intent is local (especially accounting / Tally / SME topics); keep human review for NBR, Mushak, VAT, and pricing claims
- [ ] Fill high-value backlog pages, for example:
  - Comparisons: Odoo vs QuickBooks, Odoo vs Zoho
  - Modules: website, ecommerce, helpdesk, fleet
  - Industries: pharma, logistics, hospital, NGO, real estate
  - Landings: Community vs Enterprise, hosting Bangladesh, course Dhaka

**Done when:** Content check passes in CI; package + top 8 industry/comparison pages are live and indexable; monthly article cadence is running.

#### B. Live CRM and lead routing

**Why:** Forms that only write a local JSONL file do not feed the 90–110 MQL target into sales.

**Remaining work:**

- [ ] Set production `CRM_WEBHOOK_URL` / token (or push directly into Odoo CRM as `crm.lead` with source `odoobangladesh.com`)
- [ ] Notify practice on every commercial inquiry (email / Slack / WhatsApp)
- [ ] Prefer durable storage (e.g. Postgres) so leads are not tied to one server disk
- [ ] Confirm UTM + `source_path` appear on every CRM record (first-touch capture is already in the site; verify end-to-end in CRM)
- [ ] Keep learner leads tagged and out of SQL pressure
- [ ] Newsletter double opt-in into a real ESP (Brevo / Listmonk / equivalent)

**Done when:** A test submission appears in CRM and notification channel within ~60 seconds; no commercial lead is “ok: true” without persistence.

#### C. Measurement against KPIs

**Why:** Without analytics and Search Console, organic growth, form conversion, and CPL cannot be managed.

**Remaining work:**

- [ ] Install privacy-friendly analytics (Plausible or Umami) with events: inquiry submitted, newsletter subscribed, checklist unlocked, WhatsApp click, CTA click
- [ ] Verify Google Search Console + Bing; submit sitemap
- [ ] Baseline Q1 organic sessions and head-term rankings
- [ ] Monthly review: top pages, queries, leads by source page, pages to improve

**Done when:** Team can report MQL count, organic sessions, and commercial-page conversion monthly.

---

### P1 — Strongly supports the objective (shipped)

Product implementation detail: `.cursor/plans/p1_objective_support_29750cb2.plan.md`.

#### D. Homepage conversion focus

**Shipped:**

- [x] Homepage thinned to conversion composition: hero → LiveCoverage → ProcessDiagram → AudienceSwitcher → newsletter/principles → PackageCta (LiveCoverage kept by UI preference)
- [x] Secondary destinations remain via nav / learning center (portal index, compare matrix, popular tiles removed from `/`)

#### E. SEO and shareability polish

**Shipped:**

- [x] Dynamic Open Graph images per route (`/og` + metadata wiring)
- [x] Bangla routes + `hreflang` for first money-page mirrors (`/bn`, five paired pages in sitemap)
- [x] Weak social `sameAs` fixed (bare YouTube removed; LinkedIn/Facebook only)
- [x] Email-gate functional and technical syllabi (same pattern as checklist)
- [x] Stronger spam protection: rate limit + Turnstile (honeypot retained; set production env keys)
- [x] Enforce `content:check` + lint + typecheck + build in CI

**Ops remaining (not blocking P1 product):** deepen Bangla copy with specialist review; set Turnstile + Upstash env in production.

#### F. Ad landing readiness

**Shipped (engineering):**

- [x] Keyword → URL matrix in `docs/AD_LANDING_KEYWORD_MAP.md` (packages, industries, comparisons, money landings)
- [x] Commercial pages embed consultation + stronger next-step CTAs; desktop sticky CTA on commercial paths; first-touch UTM/`source_path` persistence

**Ops remaining (media buying):**

- [ ] Confirm live campaigns use the keyword map URLs on this domain
- [ ] Stop homepage landings on binaryquest.com for Odoo ads
- [ ] Measure and tune toward ≥ 1.5% session → consultation submit (needs P0 analytics)

---

### P2 — Community layer (supports trust and nurture)

Strategy and blueprint both want a living community, not only static pages. The **product foundation** for this layer is shipped; what remains is ops cadence, media, and deeper participation. Detail: `.cursor/plans/p2_community_layer_ea42a94e.plan.md`.

**Shipped (do not rebuild):**

- [x] Learning Center hub catalog + filter, `/resources` index, knowledge-hub redirect, audience-first engagement pass
- [x] Trust teasers linking only to honest workshop paths / Binary Quest proof
- [x] Newsletter consent + attribution + unsubscribe messaging (ESP double opt-in still P0)
- [x] Events model, detail routes, upcoming/past split, Event schema, per-event registration into lead pipeline
- [x] `/forum` stub copy states a moderated forum is planned (full forum deferred)

**Remaining work:**

- [ ] Automated event registration confirmation (depends on P0 CRM / email notifications)
- [ ] Recordings / newsletter archive — only with real assets; no fake media links
- [ ] Forum or public Q&A beyond the contact stub (evaluate Discourse vs moderated `/questions` when volume justifies)
- [ ] Contribution path (submit a resource / ask a question with public answer)
- [ ] Sustained monthly webinar cadence (6 consecutive months) and honest past-session updates

---

## 4. Suggested execution order

```text
1. Wire production CRM/notifications + ESP double opt-in + Turnstile/Upstash env
2. Analytics + Search Console baseline; verify ad campaigns use AD_LANDING_KEYWORD_MAP
3. Content-check failures → deepen money landings and comparisons
4. Start 4 articles / month cadence; deepen Bangla mirrors with human review
5. Community depth: recordings/archive, contribution path, forum when volume justifies; keep webinar cadence running
```

---

## 5. Out of scope for this document

- Exact package pricing (quoted after discovery; not published as a discount list)
- Full Binary Quest corporate site work (`binaryquest.com`)
- Broad non-Odoo ERP education (`erpbangladesh.com`)
- Detailed API / database design for CRM (see blueprint WS-D when implementing)

---

## 6. Related documents

| Document | Use |
| --- | --- |
| `docs/Binary_Quest_Domain_Strategy_odoobangladesh_com.docx` | Domain role, MQL share, 90-day actions, budget share |
| `docs/PROJECT_BLUEPRINT.md` | Engineering workstreams, content minima, definition of done |
| `docs/CONTENT_GUIDE.md` | Writer rules for MDX rewrites |
| `docs/Branding_Guidline.md` | Quiet Premium visual system |
| `docs/AD_LANDING_KEYWORD_MAP.md` | Paid Odoo keyword → odoobangladesh.com URL matrix |
| `.cursor/plans/engagement_conversion_pass_849c1c4a.plan.md` | Homepage thin-pass and checklist gate |
| `.cursor/plans/p1_objective_support_29750cb2.plan.md` | P1 homepage / SEO polish / ad landing (shipped) |
| `.cursor/plans/quiet_premium_design_00a2d2f2.plan.md` | Design system rollout |
| `.cursor/plans/p2_community_layer_ea42a94e.plan.md` | Community layer foundation + follow-on depth |

---

## 7. Bottom line

**Objective:** Make odoobangladesh.com the default Odoo learning and investigation site in Bangladesh, and the practice’s main machine for ~100 MQLs in 2027.

**Already done:** Site structure, design, packages, disclosure, forms with attribution, checklist + syllabus gates, SEO plumbing (including dynamic OG, CI, anti-abuse scaffolding), P1 conversion/ad-landing product layer, first Bangla/`hreflang` mirrors, and the P2 community **product** layer (learning hub, trust teasers, consent-ready newsletter, events + schema).

**Still required to achieve the objective:** deep publishable content at cadence, live CRM/ESP routing, analytics against KPIs, production anti-abuse env + media-buying discipline on the keyword map, then community **ops** depth (recordings, contribution, forum when justified, webinar cadence).
