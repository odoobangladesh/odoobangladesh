# Branding & Design Guideline

Last revised: 2026-11-17 (v3 — Visual data representation)

---

## 1. Primary concern (non-negotiable)

This website already has **data** and **functionalities**. Design work covers **website layout and components only**.

**Data and functionalities must remain unchanged.**

| Do | Do not |
|----|--------|
| Redesign page layouts, spacing, typography, color, motion | Change content, copy, or MDX sources |
| Restyle existing components | Change form validation, API routes, or lead capture |
| Adjust responsive structure and composition | Add, remove, or rename routes, collections, or data models |
| Polish presentation-only CSS / Tailwind / markup | Alter SEO fields, schemas, or content engines |
| Re-skin CTAs, cards, header, footer, modals | Change what a CTA does, where it links, or what it submits |
| Add presentation-only animation and transitions | Add new features, new pages, or new business logic |
| Represent existing data as visuals, motion graphics, or modern UI | Dump every field as plain paragraphs just because the source is text |

**Rule:** Keep existing data sources, props, handlers, routes, and behaviors exactly as they are. Redesign how things look and how sections are composed. Do not invent features, change business logic, or rewrite content under the guise of design.

If a visual change would require changing data shape, API contracts, form fields, or navigation destinations, stop. Restyle around what already works.

### 1.1 Data is authored as text — presentation is not limited to text

Site content and structured fields are written as **text** so developers can read, edit, and reason about them easily. That is an authoring and maintenance choice. **It does not mean the UI must show that data as blocks of text.**

- **Source of truth stays text / structured data** (MDX, JSON, props, CMS fields). Values, meaning, and facts stay the same.
- **On the page, prefer the clearest visual form.** Turn lists, stats, steps, comparisons, timelines, feature sets, and similar fields into motion graphics, diagrams, animated counters, icon+label rows, bento tiles, progress visuals, or other modern components when that makes the idea easier to understand at a glance.
- **Text on screen is optional, not mandatory.** Use short labels or captions where needed for accessibility and SEO; do not paste the full authored blob into the layout just because it exists as prose in the source.
- **Meaning must survive the translation.** A visual or motion treatment must communicate the same facts the source data states — no invented numbers, no omitted required claims, no contradictory metaphors.
- **Accessibility still applies.** Decorative motion alone is not enough: provide equivalent text for screen readers (`aria-label`, visually hidden copy, or existing accessible names) so the same information is available without relying on animation or sight alone.
- **Still presentation-only.** You may remap how existing fields render in components. You may not rewrite the source copy, invent new content, or change data models to “support” a visual.

**Example mindset:** a source line like `"45+ community events"` can power a count-up, a chart segment, or an illustrated metric — it should not force a grey paragraph that only restates the string.

**Premium never overrides this section.** If a premium effect conflicts with data or behavior, drop the effect.

---

## 2. Positioning

These are product constraints for visual design.

- **Light theme only.** No dark mode, no `prefers-color-scheme: dark` styles, no theme toggle. Dark *sections* (e.g. a deep-green footer band) are allowed only as part of the light theme's palette, never as a theme switch.
- **Community identity.** Neutral, community-driven portal for the Odoo ecosystem in Bangladesh. Not an agency or software-company site.
- **No official Odoo brand assets.** No Odoo logo, wordmark, Odoo purple palette, or imitation of the corporate product UI.
- **Name usage.** "Odoo" may appear in titles and body copy as the product discussed, always paired with community identity ("Odoo Bangladesh", "community portal").
- **Disclaimer.** Every page footer must continue to state that the site is not affiliated with Odoo S.A. The disclaimer must stay readable (see contrast rules) — never hidden, faded, or animated away.
- **Bengali-ready.** All type choices must render Bengali script well. Never ship a font stack without a Bengali-capable fallback.

---

## 3. Design direction: "Quiet Premium"

**One-line brief:** A calm, confident, editorial community portal — generous space, precise type, soft depth, and a few well-placed moments of motion.

**What premium means here**

1. **Restraint.** Spend boldness in one place per page (usually the hero). Everything else stays quiet and disciplined.
2. **Precision.** Consistent spacing scale, aligned grids, optical alignment, no stray values.
3. **Depth with softness.** Layered surfaces, fine borders, and subtle blur — not heavy shadows or gradient washes.
4. **Motion that explains.** Animation shows what changed or draws the eye once. It is never constant decoration.
5. **Local character.** The palette and tone belong to Bangladesh's community, not to a generic SaaS template.

**Avoid (these read as templated / AI-generated)**

- Identical rounded cards chopped from every section, with the same grey shadow on each.
- Gradient washes and glowing blobs as decoration.
- Fade-and-slide-up on every section and hover lift on every card.
- Accenting a single word of every headline in a different color.
- Tracked-out ALL-CAPS eyebrow above every heading.
- Numbered markers (01 / 02 / 03) unless the content is truly a sequence.
- Appending "→" to every link and button.
- Cream background + terracotta accent, or near-black + neon accent.

---

## 4. Design tokens

Define all tokens once as CSS variables (and map them into the Tailwind theme). Components must use tokens only — **no hard-coded hex, px, or ms values inside components.**

### 4.1 Color (light theme)

| Token | Hex | Role |
|-------|-----|------|
| `--bg` | `#F6F8F7` | Page background (cool, clean white-green) |
| `--surface` | `#FFFFFF` | Cards, header, modals |
| `--surface-sunken` | `#EDF2EF` | Alternating bands, inputs, code blocks |
| `--ink` | `#0D1B16` | Primary text, headings |
| `--ink-muted` | `#42524B` | Secondary text (meets 4.5:1 on `--bg`) |
| `--line` | `#D9E2DD` | Borders, dividers |
| `--brand` | `#0A6B4F` | Primary brand, CTAs, links (Bangladesh green) |
| `--brand-deep` | `#064634` | Hover/pressed brand, footer band |
| `--brand-tint` | `#DDF1E8` | Soft highlights, badges, focus halo |
| `--accent` | `#E8473F` | Single sparing accent (alerts, key highlight, FAB notification) |
| `--focus` | `#1F7AE0` | Keyboard focus ring (distinct from brand) |

Rules:
- Brand green carries ~10% of any screen; neutrals carry the rest. Accent red ≤ 2%.
- Text on `--brand` or `--brand-deep` must be `#FFFFFF` and pass 4.5:1.
- Use gradients only as very subtle surface tints (≤ 6% opacity shift), never as hero decoration.

### 4.2 Typography

| Role | Family | Fallback stack |
|------|--------|----------------|
| Display / headings | **Bricolage Grotesque** (600–700) | `"Hind Siliguri", "Noto Sans Bengali", system-ui, sans-serif` |
| Body / UI | **Hind Siliguri** (400/500/600) — Latin + Bengali | `"Noto Sans Bengali", system-ui, sans-serif` |
| Code | `ui-monospace`, `SFMono-Regular`, `Menlo`, monospace | — |

- Self-host fonts with `font-display: swap` and preload only the weights above the fold.
- Fluid type scale using `clamp()`:

| Token | Size | Line height | Weight |
|-------|------|-------------|--------|
| `--text-display` | `clamp(2.5rem, 5vw + 1rem, 4.5rem)` | 1.05 | 700 |
| `--text-h1` | `clamp(2rem, 3vw + 1rem, 3rem)` | 1.1 | 700 |
| `--text-h2` | `clamp(1.5rem, 2vw + 0.75rem, 2.25rem)` | 1.2 | 600 |
| `--text-h3` | `1.25rem` | 1.3 | 600 |
| `--text-body` | `1rem` / `1.0625rem` on desktop | 1.65 | 400 |
| `--text-small` | `0.875rem` | 1.5 | 500 |

- Heading letter-spacing: `-0.02em` for display/h1, `-0.01em` for h2. Body: `0`.
- Line length: 60–72 characters for reading text. Bengali body text gets line-height ≥ 1.75.
- Use sentence case for headings and buttons.

### 4.3 Spacing, radius, borders

- **Spacing scale (4-pt base):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- **Section rhythm:** `96px` vertical on desktop, `64px` tablet, `48px` mobile. Vary rhythm between sections — do not use identical padding everywhere.
- **Container:** max-width `1200px`, reading column `720px`.
- **Radius (hierarchy, not one value):** controls `10px`, cards `20px`, large feature panels `28px`, pills `999px`.
- **Borders:** `1px solid var(--line)`. Prefer a fine border plus a tiny shadow over a large shadow.

### 4.4 Elevation

| Token | Value | Use |
|-------|-------|-----|
| `--shadow-1` | `0 1px 2px rgb(13 27 22 / 0.06)` | Resting cards |
| `--shadow-2` | `0 8px 24px -8px rgb(13 27 22 / 0.14)` | Hover, dropdowns |
| `--shadow-3` | `0 24px 48px -16px rgb(13 27 22 / 0.22)` | Modals, sticky bars |

Glass effect (header, sticky CTA only): `background: rgb(255 255 255 / 0.72); backdrop-filter: blur(14px) saturate(1.4); border-bottom: 1px solid var(--line);` — provide a solid fallback when `backdrop-filter` is unsupported.

### 4.5 Motion tokens

| Token | Value |
|-------|-------|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` (small elements only) |
| `--dur-fast` | `150ms` (hover, press, focus) |
| `--dur-base` | `280ms` (expand, tab, dropdown) |
| `--dur-slow` | `600ms` (reveal, hero sequence) |
| `--stagger` | `60ms` between siblings (max 6 siblings) |

---

## 5. Layout system

- **Grid:** 12-column desktop, 8 tablet, 4 mobile; `24px` gutters (`16px` mobile).
- **Asymmetry over repetition.** Mix wide + narrow columns, offset images, and one oversized feature panel per page to avoid a wall of equal cards.
- **Bento composition** is allowed for overview/feature sections: mixed-size tiles on a 12-col grid with consistent `16–20px` gaps. Each tile is an *existing* component restyled — do not create new tiles for content that does not exist.
- **Alignment:** left-aligned text by default; center only short hero statements and empty states.
- **Section order stays as-is** unless the checklist in §10 confirms the order is not data-bound. Recomposition = changing grid/placement, never removing or adding sections.
- **Breakpoints:** `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Design mobile-first; verify at 360, 390, 768, 1024, 1440.
- **Sticky chrome** (header, sticky CTA, WhatsApp FAB) must never cover content, form fields, or the footer disclaimer. Add scroll-padding and bottom safe-area insets.

---

## 6. Component specifications

Each component below already exists. Restyle only; props, handlers, routes, and form fields stay unchanged.

### Header
- Glass surface (see §4.4), height `72px` desktop / `60px` mobile.
- On scroll > 8px: increase border opacity and add `--shadow-1` (CSS or a tiny scroll class; no layout shift).
- Nav links: underline that grows from the left (`scaleX`, `--dur-base`). Active route shows a persistent brand-colored underline.
- Mobile menu: full-height sheet sliding from the top/right with staggered link reveal (`--stagger`); focus trapped; `Esc` closes; body scroll locked.

### Hero
- The single "memorable" moment of the page.
- Large display headline using the existing copy; supporting text and CTAs below.
- One orchestrated load sequence (see §7.1). No parallax stacks, no looping background effects.
- Optional presentation-only backdrop: a fine dot or grid pattern at ≤ 5% opacity, masked to fade at the edges.

### Buttons & CTAs
- **Primary:** `--brand` fill, white text, radius `10px`, height `48px`, padding `0 24px`, weight 600.
  - Hover: background → `--brand-deep`, `translateY(-1px)`, `--shadow-2` (`--dur-fast`).
  - Active: `translateY(0) scale(0.98)`.
  - Focus-visible: `2px` `--focus` ring with `2px` offset.
- **Secondary:** white fill, `--line` border, ink text; hover border → `--brand`.
- **Tertiary / text link:** underline offset `4px`, thickness `1.5px`, animates on hover.
- Loading/disabled states must reuse the existing state logic; only restyle (spinner, reduced opacity, `not-allowed` cursor).
- Do not change labels, hrefs, `target`, or click handlers.

### Cards (content, SEO, related links, packages)
- Vary treatment by hierarchy: *feature* card (large, `28px` radius, tinted surface), *standard* card (white, `20px`), *link row* (borderless list with hairline divider).
- Hover (pointer devices only): border → `--brand` at 40% opacity, `--shadow-2`, inner arrow/icon shifts `2–4px`. No scale-up of the whole card.
- Entire card remains the same link/target as before; keep a visible focus ring.

### Package CTA
- Highlighted panel using `--brand-deep` background with white text (a section band within the light theme), radius `28px`, subtle noise or fine grid at ≤ 6% opacity.
- Primary action inverts: white fill, brand text.

### Inquiry form shell
- Two-tier surface: white card on `--surface-sunken` band, radius `28px`, `--shadow-1`.
- Inputs: height `48px`, radius `10px`, `--line` border, label always visible above the field (no placeholder-only labels).
- Focus: border → `--brand`, halo `0 0 0 4px var(--brand-tint)` (`--dur-fast`).
- Error: border → `--accent`, message below in ink with a small icon; error text animates in with `--dur-base` height/opacity — **validation rules and messages are untouched**.
- Success state: existing success message gets a check-mark draw animation (SVG stroke, `--dur-slow`).

### Sticky CTA
- Glass bar, `--shadow-3`, slides up once after the user scrolls past the hero (`--dur-base`, `--ease-out`). Hides near the footer and while the keyboard is open on mobile.
- Must respect `env(safe-area-inset-bottom)`.

### Exit-intent modal shell
- Backdrop `rgb(13 27 22 / 0.48)` with `blur(4px)`; panel radius `28px`, `--shadow-3`.
- Enter: panel scales `0.96 → 1` and fades (`--dur-base`, `--ease-out`); exit: reverse at `--dur-fast`.
- Focus trap, `Esc` to close, return focus to the previous element. Trigger logic is not changed.

### WhatsApp FAB
- `56px` circle, placed bottom-right with safe-area spacing; shadow `--shadow-2`.
- One gentle attention pulse on first reveal (2 cycles max), then still. Hover: label expands to the left (width/opacity transition).
- Never overlaps the sticky CTA or form submit button — offset vertically when both are visible.
- Keep the existing link and number exactly as-is. Do not use official WhatsApp brand artwork beyond what is already in the project.

### Footer
- Deep-green band (`--brand-deep`) within the light theme, white/mint text, minimum 4.5:1 contrast.
- Multi-column link grid with generous space; fine `rgb(255 255 255 / 0.14)` dividers.
- **Disclaimer line (not affiliated with Odoo S.A.) stays on every page, full opacity, at least `0.875rem`.**

### Doc page chrome (documentation / articles)
- Reading column `720px`; sticky table of contents on the right (≥ `lg`), with the active heading highlighted by an animated indicator.
- Reading progress bar (2px, brand) at the top, driven by scroll.
- Code blocks: `--surface-sunken`, radius `16px`, horizontal scroll, copy-button hover state if one already exists.
- Callouts: tinted background + left border + icon; no new content types.

### Badges, tags, breadcrumbs
- Pill radius, `--brand-tint` fill, brand-deep text, `0.8125rem`. Breadcrumb separators are a thin chevron icon or `/` in `--ink-muted`.

---

## 7. Animation system

**Principle:** one orchestrated moment per page, plus small responses to user actions. Everything else is still.

### 7.1 Allowed motion patterns

| Pattern | Where | Spec |
|---------|-------|------|
| Hero load sequence | Home / top-level landing hero | Headline lines mask-reveal (`translateY(100%) → 0`, `--dur-slow`, `--ease-out`), then supporting text, then CTAs, `--stagger` between steps. Runs once. |
| Scroll reveal (restrained) | Max 1 element group per section | `opacity 0 → 1` and `translateY(16px) → 0`, `--dur-slow`, triggered once via `IntersectionObserver` at ~15% visibility. Do **not** apply to every section. |
| Number / stat count-up | Only existing numeric stats | Count over `1200ms`, once, `--ease-out`. Final value must equal the real value. |
| Micro-interaction | Buttons, links, inputs, toggles | `--dur-fast`; transform and opacity only. |
| State transition | Menu, accordion, tabs, modal, toast | `--dur-base`; show what changed (expand, slide, crossfade). |
| Page transition | Between routes | Optional crossfade `200ms` via View Transitions API where supported; no change to routing. |
| Scroll progress | Doc pages | Transform-based progress bar. |
| Marquee / logo strip | Only if such content already exists | Slow linear `40s+`, pauses on hover and focus. |

### 7.2 Technical rules

1. **CSS first.** Prefer CSS transitions, `@keyframes`, scroll-driven animations (`animation-timeline`) with a fallback, and the View Transitions API.
2. A JS animation library (e.g. Motion / GSAP) may be used **only if already installed** or if the owner explicitly approves adding it. Never add a dependency silently.
3. Animate **`transform` and `opacity` only.** Never animate `width`, `height`, `top`, `left`, `margin`, or `box-shadow` on large areas (use a pseudo-element for shadow changes).
4. Use `will-change` only during the animation, never globally.
5. **Reduced motion is mandatory:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```
   With reduced motion on, content must be fully visible with no hidden-until-scroll elements.
6. **No-JS safety:** reveal animations must not leave content invisible if JS fails. Gate hidden initial states behind a `.js` class on `<html>`.
7. **No layout shift.** Animated elements reserve their space; CLS must stay ≤ 0.05.
8. Hover effects apply only under `@media (hover: hover)`.
9. Animations must never block clicks, delay form submission, or alter timing of existing logic (exit-intent, sticky CTA triggers, lead capture).
10. Maximum simultaneous animated elements in view: ~8.

### 7.3 Performance budgets

- Lighthouse Performance ≥ 90 mobile on key pages; no regression versus current score.
- LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.05.
- Added CSS/JS for design work ≤ 30 KB gzipped total.
- Images: use existing assets; modern formats (AVIF/WebP), explicit dimensions, lazy-load below the fold. Do not add stock imagery that changes meaning.

---

## 8. Accessibility & quality floor

- Preserve skip link, landmarks, heading order, and existing ARIA.
- Contrast: body text ≥ 4.5:1, large text and UI borders ≥ 3:1 on the light theme.
- Visible keyboard focus on every interactive element (`--focus`, 2px + offset).
- Touch targets ≥ 44×44px.
- Modals and menus: focus trap, `Esc`, focus return.
- Never convey state by color alone.
- Tested at 200% zoom and in Bengali-language content without clipping or overflow.

---

## 9. Voice of interface text (presentation-only)

Copy in content sources is **not** rewritten. Presentation may still **visualize** that copy (see §1.1) instead of printing it verbatim.

When a new purely presentational label is unavoidable (e.g. an `aria-label` on a restyled icon button or a screen-reader equivalent for a motion graphic), keep it plain, active, and sentence-case, and keep vocabulary consistent with existing text.

---

## 10. Design work checklist

Before shipping a layout or component change:

1. Confirm the component still receives the same props / data as before.
2. Confirm clicks, submits, and links still hit the same handlers and destinations.
3. Confirm copy, collections, and frontmatter are untouched unless a pure presentational wrapper is required. If data is shown as motion graphics or visual components (§1.1), confirm the same facts are conveyed and an accessible text equivalent exists.
4. Prefer editing layout markup, components, and global styles over touching data loaders, API routes, or content files.
5. Preserve accessibility basics already in place (skip link, landmarks, contrast on the light theme).
6. Confirm only design tokens are used (no hard-coded colors, sizes, durations in components).
7. Confirm no dark-mode styles, no theme toggle, and no Odoo brand assets were introduced.
8. Confirm footer disclaimer is present, readable, and unanimated on every page.
9. Confirm `prefers-reduced-motion` and no-JS paths show all content.
10. Confirm no new dependency was added without owner approval.
11. Run build, lint, type-check, and existing tests; all must pass without edits to test expectations.
12. Review at 360 / 390 / 768 / 1024 / 1440 widths and with keyboard only.

---

## 11. What "layout and components" means

- **Layout:** section order, grid/flex composition, hero and content rhythm, header/footer chrome, responsive breakpoints.
- **Components:** visual treatment of existing pieces (header, footer, newsletter, inquiry form shell, sticky CTA, exit-intent modal shell, WhatsApp FAB, related links, SEO cards, package CTA, doc page chrome). Style and structure only; keep existing wiring.
- **Data presentation:** existing fields rendered as motion graphics, diagrams, metrics, or modern UI — not only as prose — while source data stays unchanged (§1.1).

When in doubt: **same data, same behavior, clearer visual presentation.**

---

## 12. How to command the AI (copy-paste prompts)

Use these in order. Give the AI this whole file as context every time.

### 12.1 Master prompt

```text
You are a senior product designer and front-end engineer.
Read Branding_Guidline.md completely and follow it as the single source of truth.

Task: apply the "Quiet Premium" design system and animation system to this website.

Hard rules:
- Change presentation only: layout, components, CSS/Tailwind, markup structure for styling, and motion.
- Do NOT change data, copy, MDX/content, routes, collections, API routes, form fields, validation, SEO fields, schemas, or what any CTA does or links to.
- Authored data is text for developers; the UI should prefer motion graphics and modern visual components over dumping that text as paragraphs when a visual communicates the same facts better (section 1.1). Keep accessible text equivalents.
- Light theme only. No Odoo logo/wordmark/purple. Keep the "not affiliated with Odoo S.A." footer disclaimer on every page.
- Use tokens from section 4 only. Animate transform/opacity only. Respect prefers-reduced-motion. No new dependencies without asking.

Process:
1. Inspect the codebase and list: framework, styling approach, global CSS, layout files, and every component named in section 6. Do not edit yet.
2. Propose a short plan (tokens file, files to touch, order of work). Wait for my approval.
3. Implement in the phases below, one phase per response, and after each phase give me:
   (a) files changed, (b) a checklist result against section 10, (c) anything you skipped and why.
4. If any visual idea would require changing data, behavior, routes, or form fields, stop and tell me instead of doing it.
```

### 12.2 Phase prompts

**Phase 1 — Foundation**
```text
Implement Phase 1: design tokens (section 4) as CSS variables and Tailwind theme mapping, self-hosted fonts with Bengali fallbacks, global typography, container/grid utilities, focus styles, and the prefers-reduced-motion block. Do not restyle components yet.
```

**Phase 2 — Chrome**
```text
Implement Phase 2: header (glass, scroll state, animated nav underline, mobile sheet), footer (deep-green band with the Odoo S.A. disclaimer intact), sticky CTA, WhatsApp FAB, exit-intent modal shell. Keep all handlers, links, and trigger logic unchanged.
```

**Phase 3 — Pages & sections**
```text
Implement Phase 3: hero with the single orchestrated load sequence, section rhythm and asymmetric/bento composition, cards by hierarchy (feature / standard / link row), SEO cards, related links, package CTA. Section data and order stay bound to existing sources.
```

**Phase 4 — Forms & docs**
```text
Implement Phase 4: inquiry form shell (focus halo, error/success animation without touching validation), doc page chrome (sticky TOC with active indicator, reading progress bar, code blocks, callouts).
```

**Phase 5 — Motion polish & QA**
```text
Implement Phase 5: restrained scroll reveals (max one group per section, once), stat count-ups only for existing numbers, optional View Transition crossfade. Then run build, lint, type-check, and tests. Report Lighthouse (mobile), CLS/LCP/INP, contrast issues, and keyboard/screen-reader checks. Fix regressions without changing data or behavior.
```

### 12.3 Single-component prompt template

```text
Restyle the <ComponentName> component per section 6 of Branding_Guidline.md.
Keep props, handlers, hrefs, and form fields identical.
Show me the diff and confirm items 1–3 and 6–9 of the section 10 checklist.
```

### 12.4 Acceptance criteria ("100% result")

The work is complete only when **all** are true:

- [ ] Every component in section 6 uses tokens and matches its spec.
- [ ] One orchestrated hero moment per key page; no scattered, repeated effects.
- [ ] Data, copy, routes, forms, validation, SEO, and CTA destinations are byte-for-byte unchanged (verify with `git diff` — no changes in content, API, or data-loader files).
- [ ] Light theme only; no dark styles; no Odoo brand assets.
- [ ] Footer disclaimer visible on every page.
- [ ] Reduced-motion and no-JS paths show all content.
- [ ] Keyboard, contrast, and 360–1440px responsive checks pass.
- [ ] Build, lint, type-check, and existing tests pass.
- [ ] Mobile Lighthouse Performance ≥ 90 (or no worse than before), CLS ≤ 0.05.
- [ ] No new dependency unless explicitly approved.

### 12.5 Tips for getting consistent results

- Always attach this file and say "follow it exactly."
- Ask for **one phase at a time**; approve before the next.
- If the AI proposes new content, new sections, new pages, or new features, reply: *"Presentation only — revert that."*
- Ask the AI to show `git diff --stat` after each phase to confirm no data or content files changed.
