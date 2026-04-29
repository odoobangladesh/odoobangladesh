# OdooBangladesh.com — Project Blueprint

## Goals (north star)

- **Community-first positioning**: independent portal, educational tone, not an agency.
- **SEO-first architecture**: programmatic content + topical authority around “Odoo Bangladesh” queries.
- **Lead generation**: subtle, contextual conversion elements (consultation, training, newsletter, downloads).
- **Rebrandable UI**: theme tokens + placeholder branding that can be replaced later.

---

## Homepage wireframe (recommended)

1. **Sticky header**
   - Logo (replaceable), navigation, “Request consultation” CTA
2. **Hero**
   - Headline + subheadline (community/education)
   - Primary CTAs: Resources / Consultation / Training
   - “Start here” card list (pillar links)
3. **Story sections (alternating)**
   - “Why Odoo in Bangladesh?” (pillars + trust)
   - “How implementation works” (roadmap)
   - “Training tracks” (functional vs technical)
4. **SEO blocks**
   - Modules grid
   - Industries grid
   - Comparisons grid
5. **Trust elements**
   - Stats counters (resources published, learners, workshops)
   - Community highlights (contributors, workshop snapshots)
6. **Conversion**
   - “Free ERP assessment” CTA
   - Newsletter block
7. **Footer**
   - Multi-column internal links (silos), contact, downloads

---

## SEO silo structure (programmatic SEO)

### Pillars

- `/blog` (educational articles)
- `/modules` (module directory)
- `/industries` (industry pages)
- `/comparisons` (Odoo vs X)
- `/training` (training hub)
- `/training/functional/*` (topic pages)
- `/training/technical/*` (topic pages)
- `/implementation-guide` (process + readiness)
- `/pricing-guide` (neutral cost/pricing explanation)
- `/resources` (downloads + checklists + syllabuses)

### Topic clusters (examples)

- **Odoo ERP Bangladesh**
  - Pillar: `/learning-center`
  - Cluster: `/blog/what-is-odoo-erp`, `/implementation-guide`, `/modules/*`, `/industries/*`
- **Odoo Training Bangladesh**
  - Pillar: `/training`
  - Cluster: `/odoo-functional-training`, `/odoo-technical-training`, `/training/functional/*`, `/training/technical/*`
- **Best ERP in Bangladesh / Open Source ERP**
  - Pillar: `/comparisons`
  - Cluster: `/comparisons/odoo-vs-erpnext`, `/comparisons/odoo-vs-sap-business-one`, `/comparisons/odoo-vs-microsoft-dynamics-365`

### Internal linking rules (recommended)

- Every **industry page** links to:
  - 3–6 relevant **module pages**
  - 1–2 relevant **comparison pages**
  - Implementation guide + checklist resource
- Every **module page** links to:
  - 2–5 industries
  - 1 implementation section
  - Relevant training topic pages
- Every **training topic page** links to:
  - Track landing page
  - Related modules
  - Career guide (future)
- Every **blog post** links to:
  - 1 pillar hub (modules/industries/training/comparisons)
  - 2–6 cluster pages

---

## Content model (current + future)

### Current (simple, fast)

- **MDX files** under `content/*` with frontmatter:
  - `title`, `description`, `date`, `tags`
- Next.js generates static pages via `generateStaticParams`.

### Recommended CMS architecture (scalable)

Pick one of these based on constraints:

- **Headless CMS** (best for editorial workflow)
  - Options: Strapi / Directus / Sanity / Contentful
  - Store: posts, module pages, industry pages, comparisons, events, courses
  - Benefits: roles, drafts, scheduled publishing
- **Git-based CMS** (best for community contributions)
  - Keep MDX in repo + use GitHub PR workflow
  - Add a “content validation” CI step + preview deployments

Hybrid approach:

- Keep programmatic SEO pages (modules/industries/comparisons) in CMS
- Keep blog + resources as MDX PR contributions

---

## Database schema (recommended)

If you add a DB (Postgres recommended), keep it minimal and privacy-conscious.

### Tables (core)

- `leads`
  - `id` (uuid)
  - `created_at`
  - `source` (contact/newsletter/exit-intent/workshop)
  - `name` (nullable)
  - `email`
  - `topic` (erp | functional-training | technical-training | developer | other)
  - `company` (nullable)
  - `message` (nullable)
  - `utm_*` (nullable)

- `events`
  - `id`, `title`, `starts_at`, `ends_at`, `format`, `location`, `status`, `description`

- `event_registrations`
  - `id`, `event_id`, `name`, `email`, `phone` (optional), `created_at`

### Training / Courses

- `courses`
  - `id`, `track` (functional|technical), `title`, `slug`, `summary`, `level`, `duration_weeks`
- `course_topics`
  - `id`, `course_id`, `title`, `slug`, `order`
- `course_inquiries`
  - `id`, `course_id` (nullable), `name`, `email`, `message`, `created_at`

---

## Course management architecture (recommended)

### Phase 1 (static)

- Track pages in Next.js with MDX topic pages.
- Simple “inquiry form” posts to `/api/inquiry`.

### Phase 2 (structured)

- Store courses/topics/schedules in DB or CMS.
- Render:
  - `/training` (upcoming batches)
  - `/training/*` (topic pages)
  - `/events` (workshops + webinars)
- Add calendar export (ICS) and “register” flows.

---

## Content publishing workflow (recommended)

### Git-based workflow

- Contributors submit MDX via PR.
- CI checks:
  - frontmatter required fields
  - internal links validity
  - basic spelling/lint (optional)
  - build succeeds
- Preview deploy on PR.
- Merge to publish.

### Editorial workflow (CMS)

- Draft → Review → Scheduled publish
- Auto-generate:
  - sitemap updates
  - internal linking suggestions

---

## Conversion optimization ideas (non-salesy)

- **Contextual CTAs**:
  - Blog posts: “Download checklist” or “Request scope outline”
  - Training pages: “Get syllabus” / “Join workshop”
  - Comparisons: “Shortlist call” (neutral)
- **Lead magnets**:
  - ERP checklist
  - Functional syllabus
  - Technical syllabus
  - “Career roadmap” PDF
- **Trust**:
  - Community workshop highlights
  - Contributor profiles (future)
  - Student success stories (future)

---

## Community engagement strategy (recommended)

- Monthly webinars (beginner + career + dev)
- Community contributors program (badge + featured posts)
- “Ask a question” inbox → convert to FAQ/blog posts
- Eventually: forum/Discord integration

---

## UI component architecture (current structure)

- Theme tokens in `src/app/globals.css` (CSS variables + Tailwind v4)
- Reusable blocks in `src/components/*`
  - header/footer
  - inquiry + newsletter
  - sticky CTA, WhatsApp, exit intent
- Content system in `src/lib/content.ts` + MDX in `content/*`

---

## Future scalability plan

- Add CMS + Postgres for structured content (events/courses/leads).
- Add search (Meilisearch/Typesense) across MDX/CMS content.
- Add programmatic “related content” module (rules + embeddings optional).
- Add i18n (English + Bangla) once core SEO footprint is stable.

