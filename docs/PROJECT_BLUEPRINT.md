# OdooBangladesh.com: Project blueprint

Last revised: 2026-10-14 (v2, after an audit of the Phase 1 build)

This repository powers **odoobangladesh.com**, a **neutral, community-driven** portal for the Odoo ecosystem in Bangladesh.

It is intentionally **not** positioned as an agency or software-company site. The site aims to rank through **topical authority + programmatic SEO**, and to convert visitors through helpful resources, training pathways, and inquiry funnels.

## 1. Goals and how we will know we hit them

| # | Goal | Measure (12-month target) |
|---|------|---------------------------|
| G1 | Become the top organic result in Bangladesh for Odoo learning, pricing, implementation and comparison queries | 50+ pages ranking top 10 in Google BD for their target keyword; 10k organic sessions/month |
| G2 | Convert traffic into training and consultation leads | 150+ qualified leads/month across inquiry, newsletter, checklist, webinar; every lead stored and routed within 1 minute |
| G3 | Build a real community and learning hub | Monthly webinar cadence held for 6 consecutive months; 1,000 newsletter subscribers; forum or Q&A live |

Everything in the plan below is justified against G1, G2 or G3. If a task does not move one of them, it does not go on the roadmap.

## 2. Community positioning and visual identity (unchanged, still binding)

Community independence is a product constraint, not only a footer line. Odoo S.A. owns the Odoo trademark, and this site must not look or read like an official Odoo property.

- **Light theme only.** No dark mode, no `prefers-color-scheme: dark` styles, no theme toggle.
- **No official brand assets.** No Odoo logo, wordmark or brand files. Do not imitate the corporate product UI.
- **Name usage.** "Odoo" may appear in titles and body copy as the product being discussed, always paired with a clear community identity ("Odoo Bangladesh", "community portal").
- **Disclaimer.** Every page footer states that the site is not affiliated with Odoo S.A. (implemented in `site-footer.tsx`).

## 3. Audit of the current build (October 2026)

### 3.1 What exists and works

- **Stack**: Next.js 16.2 App Router, React 19, Tailwind 4, `next-mdx-remote` RSC, `gray-matter`, `zod`. Static generation via `generateStaticParams` on every collection route.
- **Content engine** (`src/lib/content.ts`): filesystem collections under `content/<collection>/<slug>.mdx` with typed frontmatter (`title`, `description`, `date`, `tags`, `keywords`, `canonical`, `image`, `draft`, `related[]`). Draft filtering works.
- **Collections populated**: blog (2), landings (7), modules (10), industries (8), comparisons (3), training-functional (5), training-technical (5), resources (3). 43 MDX files total.
- **Pillar pages** hand-coded in TSX: `/implementation-guide` (~1,000 words), `/pricing-guide`, `/odoo-career-guide`, `/learning-center`, `/training`, `/comparisons`, `/modules`, `/industries`, plus `/about`, `/faq`, `/contact`, `/partners`, `/developer-resources`, `/events`, `/forum`.
- **SEO plumbing**: `metadataBase`, title template, canonical per page, OpenGraph and Twitter metadata, `sitemap.ts`, `robots.ts`, sitewide `Organization` + `WebSite` JSON-LD, `FAQPage` JSON-LD on `/faq`, `rehype-slug` + autolinked headings.
- **Conversion components**: inquiry form (zod-validated API), newsletter card, exit-intent ERP checklist modal, sticky mobile CTA, WhatsApp FAB, `RelatedLinks` block on module, industry, comparison and training detail pages.
- **Accessibility basics**: skip link, semantic landmarks, light theme with sufficient contrast.

### 3.2 Gaps and defects that block the goals

Ordered by impact. Each one maps to a workstream in section 4.

**Blocks G1 (ranking)**

1. **Thin content everywhere.** Every MDX file is 90 to 230 words. Programmatic pages of this depth read as doorway pages and will not rank for competitive terms like "Odoo pricing Bangladesh". Minimum viable depth is 900 words for cluster pages and 1,800 for pillars and comparisons.
2. **Canonical conflict on landing pages.** `content/landings/*.mdx` declare `canonical: "/odoo-accounting-bangladesh"` (the short root slug), but the root route `src/app/odoo-accounting-bangladesh/page.tsx` issues a `redirect()` (307) to `/landings/odoo-accounting-bangladesh`. The canonical therefore points at a URL that redirects back to the page, and the sitemap lists `/landings/*` rather than the canonical. Search engines will treat these pages as inconsistent. The same pattern exists for all seven landings and the training pages (`/odoo-functional-training`, `/odoo-technical-training`).
3. **Sitemap `lastModified` is `new Date()` on every build.** Every URL claims to have changed at every deploy, which teaches crawlers to ignore the field.
4. **Missing structured data** for the page types that matter most: no `Article`/`BlogPosting` on blog posts, no `Course` on training topics, no `BreadcrumbList` anywhere, no `ItemList` on directory pages. Only `FAQPage` is implemented beyond the sitewide pair.
5. **No Bangla.** The audience searches in both English and Bangla; the site is `lang="en"` only with no plan for `bn` routes or `hreflang`.
6. **Internal-linking rules are not enforced.** 31 of 43 content files have `related:`; blog, landings and resources have none. Nothing in the build checks the rules in section 6, so they will drift.
7. **No OpenGraph images.** Shares on Facebook and LinkedIn (the dominant channels for this audience) render without a preview image.
8. **`next-sitemap` is installed but unused** (the App Router `sitemap.ts` supersedes it). Dead dependency.

**Blocks G2 (leads)**

9. **Both API routes are placeholders.** `/api/inquiry` and `/api/newsletter` validate and return `{ ok: true }` without storing or sending anything. Every lead submitted today is lost.
10. **Dummy contact data in `siteConfig`.** WhatsApp is `8801700000000`; Facebook, LinkedIn and YouTube point to bare domains. These are also emitted as `sameAs` in the Organization schema.
11. **No analytics or conversion events.** There is no way to measure traffic, funnel drop-off or which page produced a lead.
12. **Exit-intent modal links to the checklist page but does not capture an email first**, so the "free checklist" costs nothing and yields no lead.
13. **No spam protection** on the forms (no rate limit, honeypot or Turnstile).

**Blocks G3 (community)**

14. `/events` and `/forum` are static stubs with no data model, calendar or registration.
15. No contribution path ("submit a resource", "ask a question" with public answer), no newsletter archive, no recordings library.

### 3.3 Repository hygiene

- Three commits ("Initial Draft", "remove dark theme", one unlabeled). Working tree is clean. Adopt conventional commit messages from here.
- `AGENTS.md` correctly warns that this Next.js version differs from training data; keep it and extend it with the content and linking rules from this document so agents producing content follow them.
- No tests, no CI, no `.env.example`. Add a lint + typecheck + build GitHub Action and an `.env.example` listing every variable introduced in section 4.

## 4. Workstreams to close the gaps

### WS-A: URL and canonical model (do first, one afternoon)

Decision: **the short keyword slug is the canonical page**, because it is the URL we want to rank and share.

- Add `src/app/(landings)/[slug]/page.tsx`? No. Next resolves static segments before dynamic ones, but a root-level catch-all is fragile next to 25 static routes. Instead:
  - Keep `content/landings/*.mdx` as the source of truth, with `canonical` set to the short slug.
  - Replace each `src/app/<short-slug>/page.tsx` redirect with a page that renders the landing doc by slug (one shared `renderLanding(slug)` helper so the seven files are three lines each).
  - Make `/landings/[slug]` issue `permanentRedirect()` (308) to `doc.canonical` when it is set.
  - Sitemap emits the canonical URL only.
- Same treatment for `/odoo-functional-training` and `/odoo-technical-training` (currently redirects into `/training/*`): either make them canonical landings or remove them and let `/training/functional` be canonical. Recommendation: remove; the `/training/*` hubs already carry the keyword.
- Replace `lastModified: now` with the MDX `date`/`updated` frontmatter, falling back to the file's git last-commit date at build time. Add `updated` to the `ContentDoc` type.
- Remove `next-sitemap`.

Acceptance: every indexable URL returns 200, declares itself canonical, appears exactly once in the sitemap, and Search Console shows zero "duplicate, Google chose different canonical" warnings after re-crawl.

### WS-B: Content depth and templates (ongoing, the core of G1)

Define one template per collection and refuse to publish below the minimum. Store the templates in `docs/content-templates/` and reference them from `AGENTS.md`.

| Collection | Min words | Required sections |
|---|---|---|
| modules | 900 | What it does; key features; Bangladesh-specific considerations (VAT, BDT, Bangla reports, local payroll rules where relevant); Community vs Enterprise differences; typical implementation steps; common mistakes; FAQ (3 to 5 Q&A, emitted as `FAQPage`); related |
| industries | 1,000 | Industry context in Bangladesh; pain points; module map (which modules, why); a worked example workflow; implementation checklist; FAQ; related |
| comparisons | 1,800 | Side-by-side table; pricing model; localisation for Bangladesh; implementation partner ecosystem; who should pick which; FAQ; related |
| landings | 1,200 | Direct answer in first 100 words; detailed guidance; cost or effort ranges with assumptions stated; next steps and CTA; FAQ |
| training topics | 700 | Learning outcomes; prerequisites; syllabus outline; practice exercises; recommended order; where it leads (career or next topic); `Course` schema |
| blog | 1,200 | Standard article; dated; author; updated date on revision |
| resources | 500 | Downloadable or printable asset plus explanatory copy; gated when used as a lead magnet |

Content rules that apply to every page:

- Written for Bangladesh first: BDT figures, local VAT and tax terminology (Mushak forms, TDS, VDS), local payroll practice, local hosting and data-residency questions, local partner landscape.
- Name the Odoo version the guidance applies to (currently v17 to v19) and date the page.
- No em dashes in any published copy (house style; use commas, colons or separate sentences).
- Every page ends with a `RelatedLinks` block that satisfies the linking rules in section 6, and one lead-capture CTA chosen by funnel stage.
- Extend `ContentDoc` with `updated`, `author`, `odooVersion`, `faq[]` so templates can emit schema without hand-written JSON.

Publishing cadence (replaces the earlier weekly plan, which assumed thin pages):

- Months 1 to 2: deepen what exists. Rewrite all 43 MDX files to template depth before adding new ones. Priority order: landings (they carry the money keywords), comparisons, pillar pages, modules, industries, training, resources.
- Month 3 onward: 2 new cluster pages + 1 blog post per week, each at template depth.
- Backlog of new pages, in order: comparisons (`odoo-vs-tally`, `odoo-vs-quickbooks`, `odoo-vs-zoho`, `odoo-vs-sap-b1` exists), modules (`mrp` is named in the plan but the file is `manufacturing`; add `website`, `ecommerce`, `helpdesk`, `fleet`), industries (`pharma`, `ngo`, `real-estate`, `logistics`, `hospital`), landings (`odoo-community-vs-enterprise-bangladesh`, `odoo-hosting-bangladesh`, `odoo-developer-salary-bangladesh`, `odoo-course-dhaka`).

### WS-C: Structured data and sharing

- `BlogPosting` on `/blog/[slug]` with `datePublished`, `dateModified`, `author`.
- `Course` on `/training/*/[slug]` and `/training/functional`, `/training/technical` (as `Course` with `hasCourseInstance` when batches exist).
- `BreadcrumbList` on every detail page, driven by the route.
- `ItemList` on `/modules`, `/industries`, `/comparisons`.
- `FAQPage` emitted from `faq[]` frontmatter on any page that has it.
- `Event` on `/events` once events are data-driven (WS-F).
- Dynamic OG images via `opengraph-image.tsx` per route: title, collection label, "Odoo Bangladesh Community" wordmark (ours, not Odoo's). Fix `sameAs` so it only lists real profiles.
- Centralise all JSON-LD in `src/lib/schema.ts` with typed builders so pages do not hand-write objects.

### WS-D: Lead pipeline (the whole of G2 depends on this)

Target architecture, minimal and self-hostable:

1. **Storage**: Postgres (Neon or Supabase for managed; or the existing self-hosted Odoo's database via the JSON-RPC API, see below). Table `leads` as specified in section 7. Never return `ok: true` without a successful write.
2. **Routing**: on insert, send a notification (email via Resend or Brevo, and a WhatsApp or Slack ping) and tag the lead by `interest` and `source_path`.
3. **CRM**: because the team already runs Odoo, push every lead into Odoo CRM as `crm.lead` via XML-RPC/JSON-RPC with `source_id` = "odoobangladesh.com" and the page path in the description. This keeps one pipeline and demonstrates Odoo in practice. Keep Postgres as the system of record so the website never depends on CRM uptime.
4. **Newsletter**: double opt-in. Brevo or Listmonk (self-hosted). Store consent timestamp.
5. **Gating**: the ERP checklist and both syllabi become email-gated downloads; the exit-intent modal collects the email inline and then reveals the link.
6. **Anti-abuse**: honeypot field, per-IP rate limit (Upstash or in-memory for a single instance), Cloudflare Turnstile on the inquiry form.
7. **Attribution**: every form posts `source_path`, `referrer`, and UTM parameters. Store them.
8. **Config**: everything above behind environment variables documented in `.env.example`. Replace the dummy values in `siteConfig` with real ones before launch; fail the build if `NEXT_PUBLIC_WHATSAPP` still matches the placeholder.

Acceptance: a test submission on every form appears in Postgres, in Odoo CRM, and in the notification channel within 60 seconds; a malformed or bot submission is rejected without a notification.

### WS-E: Measurement

- Privacy-friendly analytics (Plausible or Umami, self-hostable) with custom events: `inquiry_submitted`, `newsletter_subscribed`, `checklist_downloaded`, `whatsapp_clicked`, `cta_clicked` (with position), `syllabus_downloaded`.
- Google Search Console and Bing Webmaster verified; sitemap submitted.
- A monthly review doc in `docs/reviews/YYYY-MM.md`: top pages, top queries, lead count by source page, pages to improve. The content backlog in WS-B is reprioritised from this review.
- Build-time quality gates (script in `scripts/content-check.ts`, run in CI): minimum word count per collection, required frontmatter present, linking rules satisfied, no em dashes, no broken internal links, no `canonical` pointing at a redirect.

### WS-F: Community and training operations (G3)

Phase 2, after WS-A to WS-E are live.

- **Events as data**: `content/events/*.mdx` (or a DB table once the CMS lands) with `startsAt`, `endsAt`, `location`, `registrationUrl`, `recordingUrl`. `/events` lists upcoming and past; past events link to recordings and a blog write-up. `Event` schema per item.
- **Monthly webinar** with Q&A. Each webinar produces one recording page, one blog recap, and a batch of FAQ entries.
- **Q&A before a forum**: route "Ask a question" submissions into a public, moderated `/questions` collection with answers. This is cheaper than running a forum and produces long-tail content. Revisit a real forum (Discourse) only when question volume justifies it.
- **Courses as data**: `Course` and `CourseTopic` records (section 7) with batch calendar, syllabus and registration CTA. Training topic pages read from them.
- **Contribution**: "Submit a resource" form, contributor profiles, student success stories.
- **Bangla**: introduce `/bn/` routes with `hreflang` once the English pillar set is at depth. Start with the landings and pricing content, which carry the highest search volume in Bangla.

### WS-G: Platform and CMS (Phase 2 to 3)

- Phase 1 (now): MDX in repo, static generation. Keep this until non-developer editors are actually blocked by it.
- Phase 2: headless CMS (Payload is the recommendation: TypeScript, self-hostable, Postgres, same repo). Keep slugs and the collection concept unchanged. Migrate collection by collection, blog first.
- Phase 3: partner directory, contributor profiles, public directory API.

## 5. Site structure

### Homepage (recommended, mostly implemented)

- **Header**: Blog, Learning Center, Modules, Industries, Comparisons, Training, Events, Forum. Utility CTAs: Request consultation, Explore training.
- **Hero**: "The Odoo Community Platform for Bangladesh"; learning + implementation guidance + career support; CTAs: Explore resources, Request ERP consultation, Explore training.
- **SEO section cards**: implementation guide, modules directory, industries, training pathways, comparisons.
- **Trust blocks**: how to use this portal; community principles; success stories and workshop highlights (later).
- **Lead capture**: newsletter, exit-intent checklist (gated), sticky mobile CTA, WhatsApp.
- **Footer**: Explore + Community links; not-affiliated disclaimer.

### SEO silos (topic clusters)

Pillars: `/learning-center`, `/implementation-guide`, `/pricing-guide`, `/training`, `/odoo-career-guide`, `/comparisons`, `/modules`, `/industries`.

Clusters:

- **Modules** `/modules/{module}`: accounting, inventory, purchase, sales, crm, manufacturing, hr, payroll, pos, project (exist); website, ecommerce, helpdesk, fleet (backlog). Link to industries, training topics, implementation guide sections.
- **Industries** `/industries/{industry}`: garments, manufacturing, retail, distribution, services, construction, education, sme (exist); pharma, ngo, real-estate, logistics, hospital (backlog). Link to modules, one comparison, one checklist.
- **Comparisons** `/comparisons/odoo-vs-{erp}`: erpnext, sap-business-one, microsoft-dynamics-365 (exist); tally, quickbooks, zoho (backlog). The short `/odoo-vs-erpnext` slug is canonical for that one page.
- **Training** `/training/functional/{topic}` and `/training/technical/{topic}`.
- **Landings** at short keyword slugs (canonical, see WS-A): `/odoo-accounting-bangladesh`, `/odoo-pricing-bangladesh`, `/odoo-implementation-cost-bangladesh`, `/odoo-partners-bangladesh`, `/odoo-community-bangladesh`, `/odoo-for-garments-industry`, `/open-source-erp-bangladesh`.

## 6. Internal linking rules (now enforced by `scripts/content-check.ts`)

- Every **module page** links to at least 2 related modules, 1 industry page, 1 training topic page, and 1 implementation-guide section.
- Every **industry page** links to 3 to 6 core module pages, 1 comparison page, 1 checklist or resource.
- Every **comparison page** links to relevant modules and industries, the pricing guide, the implementation guide, and the decision checklist.
- Every **landing page** links to its parent pillar, 2 cluster pages, and 1 resource.
- Every **blog post** links to at least 3 cluster or pillar pages.
- Every **training topic** links to the previous and next topic, its syllabus, and one module page.
- Every pillar links down to every cluster page in its silo (directory lists count).

## 7. Data model (for WS-D now, CMS later)

- `Lead`: `id`, `type` (newsletter | inquiry | checklist | syllabus | webinar | question), `name?`, `email`, `phone?`, `role?`, `interest?`, `message?`, `sourcePath`, `referrer?`, `utm{}`, `consentAt?`, `crmId?`, `createdAt`
- `Post`: `id`, `slug`, `title`, `description`, `body`, `author`, `publishedAt`, `updatedAt`, `tags[]`
- `LandingPage`: `id`, `slug`, `title`, `description`, `body`, `keywords[]`, `canonicalPath`, `updatedAt`
- `Module`, `Industry`: `id`, `slug`, `title`, `summary`, `body`, `odooVersion`, `faq[]`, `updatedAt`
- `Comparison`: `id`, `slug`, `title`, `summary`, `body`, `erps[]`, `faq[]`, `updatedAt`
- `Course`: `id`, `slug`, `type` (functional | technical), `title`, `summary`, `syllabus`, `level`, `durationWeeks`
- `CourseTopic`: `id`, `courseId`, `slug`, `title`, `body`, `order`
- `CourseBatch`: `id`, `courseId`, `startsAt`, `endsAt`, `mode`, `seats`, `registrationUrl`
- `Event`: `id`, `slug`, `title`, `startsAt`, `endsAt`, `location`, `registrationUrl`, `recordingUrl`, `courseId?`
- `Question`: `id`, `slug`, `title`, `body`, `answer`, `status`, `askedAt`, `answeredAt`

## 8. Funnel and conversion

- Top of funnel: cluster pages, blog, comparisons.
- Mid funnel: gated checklist and syllabi, webinar registrations, newsletter.
- Bottom funnel: inquiry form, WhatsApp, batch calendar.
- CTA by page type: modules and industries offer the checklist; comparisons and pricing offer "talk to a specialist"; training topics offer the syllabus and the next batch; blog offers the newsletter.
- Community-friendly rules: no pop-ups before 30 seconds or 50% scroll, one exit-intent per session, "no spam" promise stated next to every email field, all gated assets also summarised ungated on the page so the content still ranks.

## 9. Roadmap

**Sprint 0 (week 1): fix the foundation**
WS-A canonical model, sitemap dates, remove `next-sitemap`, real `siteConfig` values, `.env.example`, CI with lint + typecheck + build, `scripts/content-check.ts` skeleton.

**Sprint 1 to 2 (weeks 2 to 4): make leads real**
WS-D storage + notification + Odoo CRM push, gated checklist, honeypot + Turnstile, WS-E analytics and events, Search Console.

**Sprint 3 to 8 (weeks 5 to 16): depth**
WS-B rewrite of all existing content to template depth, in priority order; WS-C schema and OG images shipped alongside the first rewritten collection; monthly review starts.

**Sprint 9+ (month 5 onward): community**
WS-F events as data, first webinar, Q&A collection, course and batch records; new-page cadence from WS-B continues; first Bangla landings.

**Later**
WS-G CMS migration, partner directory, contributor profiles, public API.

## 10. Definition of done for any page

- Meets the collection's minimum depth and required sections.
- Frontmatter complete: `title`, `description`, `date`, `updated`, `keywords`, `related`, `faq` where applicable, `odooVersion` where applicable.
- Passes `scripts/content-check.ts` (depth, links, style, canonical).
- Emits the correct schema types and an OG image.
- Has exactly one primary CTA matched to its funnel stage.
- States Bangladesh-specific guidance, not generic Odoo documentation.
