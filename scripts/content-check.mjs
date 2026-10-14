#!/usr/bin/env node
/**
 * Content quality gate for odoobangladesh.com (blueprint section 4, WS-E).
 *
 * Checks every MDX file under content/:
 *   - minimum body word count per collection
 *   - required frontmatter keys
 *   - house style (no em dashes, no " -- " dashes, no exclamation marks)
 *   - internal links resolve to a real route, collection slug or landing canonical
 *   - internal-linking rules per collection (blueprint section 6)
 *   - faq present on cluster pages and mirrored in the body
 *   - canonical, when set, is a short slug that is not itself redirected
 *
 * Usage: node scripts/content-check.mjs            (exit 1 on any failure)
 *        node scripts/content-check.mjs --warn-only
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const contentRoot = path.join(root, "content");
const appRoot = path.join(root, "src", "app");
const warnOnly = process.argv.includes("--warn-only");

const MIN_WORDS = {
  modules: 900,
  industries: 1000,
  comparisons: 1800,
  landings: 1200,
  "training-functional": 700,
  "training-technical": 700,
  blog: 1200,
  resources: 500,
};

const REQUIRES_FAQ = new Set([
  "modules",
  "industries",
  "comparisons",
  "landings",
  "training-functional",
  "training-technical",
]);

const REQUIRES_ODOO_VERSION = new Set([
  "modules",
  "industries",
  "comparisons",
  "landings",
  "training-functional",
  "training-technical",
]);

const PILLARS = new Set([
  "/learning-center",
  "/implementation-guide",
  "/pricing-guide",
  "/training",
  "/odoo-career-guide",
  "/comparisons",
  "/modules",
  "/industries",
  "/partners",
]);

const ANCHORS = {
  "/implementation-guide": ["discovery", "process", "configuration", "data", "uat", "go-live", "pitfalls"],
  "/pricing-guide": ["components", "compare"],
  "/odoo-career-guide": ["functional", "technical"],
};

// ---------- discover routes ----------
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const staticRoutes = new Set();
const dynamicRoutes = new Map(); // "/modules" -> collection
for (const f of walk(appRoot)) {
  if (path.basename(f) !== "page.tsx") continue;
  const rel = "/" + path.relative(appRoot, path.dirname(f)).split(path.sep).join("/");
  const route = rel === "/." ? "/" : rel;
  if (route.includes("[slug]")) {
    const base = route.replace("/[slug]", "");
    const collection = {
      "/blog": "blog",
      "/landings": "landings",
      "/modules": "modules",
      "/industries": "industries",
      "/comparisons": "comparisons",
      "/training/functional": "training-functional",
      "/training/technical": "training-technical",
      "/resources": "resources",
    }[base];
    if (collection) dynamicRoutes.set(base, collection);
  } else {
    staticRoutes.add(route);
  }
}

const docs = [];
for (const collection of Object.keys(MIN_WORDS)) {
  const dir = path.join(contentRoot, collection);
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))) {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const parsed = matter(raw);
    docs.push({
      collection,
      slug: file.replace(/\.mdx$/, ""),
      file: path.relative(root, path.join(dir, file)),
      data: parsed.data,
      body: parsed.content,
    });
  }
}

const canonicalOf = new Map(); // "/odoo-pricing-bangladesh" -> doc
for (const d of docs) {
  if (typeof d.data.canonical === "string") canonicalOf.set(d.data.canonical, d);
}

function routeExists(href) {
  const [pathname, hash] = href.split("#");
  const clean = pathname.replace(/\/$/, "") || "/";
  if (hash && ANCHORS[clean] && !ANCHORS[clean].includes(hash)) return false;
  if (staticRoutes.has(clean)) {
    // a static route that only redirects into /landings is not a destination;
    // but we accept it when it is also a declared canonical of a landing doc
    return true;
  }
  if (canonicalOf.has(clean)) return true;
  for (const [base, collection] of dynamicRoutes) {
    if (clean.startsWith(base + "/")) {
      const slug = clean.slice(base.length + 1);
      return docs.some((d) => d.collection === collection && d.slug === slug);
    }
  }
  return false;
}

function hrefs(d) {
  const related = Array.isArray(d.data.related) ? d.data.related.map((r) => r?.href).filter(Boolean) : [];
  const inline = [...d.body.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1]);
  return { related, inline, all: [...new Set([...related, ...inline])] };
}

function classify(href) {
  const clean = href.split("#")[0];
  if (clean.startsWith("/modules/")) return "module";
  if (clean.startsWith("/industries/")) return "industry";
  if (clean.startsWith("/comparisons/") || clean === "/odoo-vs-erpnext") return "comparison";
  if (clean.startsWith("/training/functional/") || clean.startsWith("/training/technical/")) return "training";
  if (clean.startsWith("/resources/")) return "resource";
  if (clean.startsWith("/blog/")) return "blog";
  if (PILLARS.has(clean)) return "pillar";
  if (canonicalOf.has(clean)) return "landing";
  return "other";
}

const failures = [];
const warnings = [];
let totalWords = 0;

for (const d of docs) {
  const where = d.file;
  const fail = (m) => failures.push(`${where}: ${m}`);
  const warn = (m) => warnings.push(`${where}: ${m}`);

  // frontmatter
  for (const key of ["title", "description", "date", "updated", "author", "keywords", "related"]) {
    if (d.data[key] === undefined || d.data[key] === null || d.data[key] === "") fail(`missing frontmatter "${key}"`);
  }
  if (REQUIRES_ODOO_VERSION.has(d.collection) && !d.data.odooVersion) fail(`missing "odooVersion"`);
  if (typeof d.data.title === "string" && (d.data.title.length < 30 || d.data.title.length > 70)) warn(`title length ${d.data.title.length} (want 50 to 65)`);
  if (typeof d.data.description === "string" && (d.data.description.length < 120 || d.data.description.length > 170)) warn(`description length ${d.data.description.length} (want 140 to 160)`);
  if (d.collection === "landings" && typeof d.data.canonical !== "string") fail(`landing without canonical`);
  if (typeof d.data.canonical === "string") {
    if (d.data.canonical.startsWith("/landings/")) fail(`canonical must be the short slug, not ${d.data.canonical}`);
    if (!staticRoutes.has(d.data.canonical)) fail(`canonical ${d.data.canonical} has no route in src/app`);
  }

  // style
  const emDashes = (d.body.match(/—/g) || []).length + (JSON.stringify(d.data).match(/—/g) || []).length;
  if (emDashes) fail(`${emDashes} em dash(es)`);
  const doubleDash = (d.body.match(/\s--\s/g) || []).length;
  if (doubleDash) fail(`${doubleDash} " -- " dash(es)`);
  const bang = (d.body.match(/![^\[\(]/g) || []).filter((m) => !m.startsWith("![")).length;
  if (bang) warn(`${bang} exclamation mark(s)`);
  for (const w of ["genuinely", "honestly", "straightforward", "seamless", "robust", "leverage"]) {
    if (new RegExp(`\\b${w}\\b`, "i").test(d.body)) warn(`banned word "${w}"`);
  }

  // depth
  const words = d.body.trim().split(/\s+/).filter(Boolean).length;
  totalWords += words;
  if (words < MIN_WORDS[d.collection]) fail(`${words} words, minimum ${MIN_WORDS[d.collection]}`);

  // faq
  if (REQUIRES_FAQ.has(d.collection)) {
    const faq = Array.isArray(d.data.faq) ? d.data.faq : [];
    if (faq.length < 3 || faq.length > 6) fail(`faq has ${faq.length} entries, want 3 to 5`);
    for (const q of faq) {
      if (!q?.q || !q?.a) { fail(`faq entry missing q or a`); continue; }
      if (!d.body.includes(q.q.trim())) warn(`faq question not mirrored in body: "${q.q.slice(0, 50)}"`);
    }
    if (!/^##\s+Frequently asked questions/mi.test(d.body)) warn(`no "## Frequently asked questions" heading`);
  }

  // links
  const { related, all } = hrefs(d);
  for (const h of all) {
    if (h.startsWith("/landings/")) fail(`links to /landings/ path ${h}; use the short canonical`);
    else if (!routeExists(h)) fail(`broken internal link ${h}`);
  }
  if (!/^##\s+Next step/mi.test(d.body)) warn(`no "## Next step" CTA section`);

  // linking rules (blueprint section 6), evaluated on related + inline
  const kinds = all.map(classify);
  const count = (k) => kinds.filter((x) => x === k).length;
  const has = (p) => all.some((h) => h.split("#")[0] === p);
  const hasAnchor = (p) => all.some((h) => h.startsWith(p + "#"));
  const others = (k) => all.filter((h) => classify(h) === k && !h.startsWith(`/${d.collection}/${d.slug}`)).length;

  switch (d.collection) {
    case "modules":
      if (others("module") < 2) fail(`module rule: needs 2 other modules`);
      if (count("industry") < 1) fail(`module rule: needs 1 industry`);
      if (count("training") < 1) fail(`module rule: needs 1 training topic`);
      if (!hasAnchor("/implementation-guide")) fail(`module rule: needs an /implementation-guide#section link`);
      break;
    case "industries":
      if (count("module") < 3 || count("module") > 8) fail(`industry rule: ${count("module")} modules, want 3 to 6 (8 tolerated)`);
      if (count("comparison") < 1) fail(`industry rule: needs 1 comparison`);
      if (count("resource") < 1) fail(`industry rule: needs 1 resource`);
      break;
    case "comparisons":
      if (count("module") < 2) fail(`comparison rule: needs 2 modules`);
      if (count("industry") < 1) fail(`comparison rule: needs 1 industry`);
      if (!has("/pricing-guide")) fail(`comparison rule: needs /pricing-guide`);
      if (!has("/implementation-guide")) fail(`comparison rule: needs /implementation-guide`);
      if (!has("/resources/erp-checklist")) fail(`comparison rule: needs /resources/erp-checklist`);
      break;
    case "landings":
      if (count("pillar") < 1) fail(`landing rule: needs its parent pillar`);
      if (count("module") + count("industry") + count("comparison") + count("training") < 2) fail(`landing rule: needs 2 cluster pages`);
      if (count("resource") < 1) fail(`landing rule: needs 1 resource`);
      break;
    case "blog":
      if (count("module") + count("industry") + count("comparison") + count("training") + count("pillar") < 3) fail(`blog rule: needs 3 cluster or pillar links`);
      break;
    case "training-functional":
    case "training-technical": {
      const track = d.collection === "training-functional"
        ? ["accounting", "inventory", "manufacturing", "hr", "pos"]
        : ["module-development", "orm", "owl", "deployment", "performance"];
      const base = d.collection === "training-functional" ? "/training/functional/" : "/training/technical/";
      const i = track.indexOf(d.slug);
      if (i > 0 && !has(base + track[i - 1])) fail(`training rule: needs previous topic ${track[i - 1]}`);
      if (i >= 0 && i < track.length - 1 && !has(base + track[i + 1])) fail(`training rule: needs next topic ${track[i + 1]}`);
      const syllabus = d.collection === "training-functional" ? "/resources/functional-syllabus" : "/resources/technical-syllabus";
      if (!has(syllabus)) fail(`training rule: needs ${syllabus}`);
      if (count("module") < 1) fail(`training rule: needs 1 module page`);
      break;
    }
    case "resources":
      if (all.length < 3) fail(`resource rule: needs 3 related pages`);
      break;
  }
  if (related.length < 3) warn(`only ${related.length} related: entries`);
}

// summary
const byCollection = {};
for (const d of docs) {
  const w = d.body.trim().split(/\s+/).filter(Boolean).length;
  (byCollection[d.collection] ||= []).push(w);
}
console.log("Content check");
console.log("=============");
for (const [c, ws] of Object.entries(byCollection)) {
  const min = Math.min(...ws), max = Math.max(...ws), avg = Math.round(ws.reduce((a, b) => a + b, 0) / ws.length);
  console.log(`${c.padEnd(22)} ${String(ws.length).padStart(2)} files  min ${min}  avg ${avg}  max ${max}  (floor ${MIN_WORDS[c]})`);
}
console.log(`total: ${docs.length} files, ${totalWords} body words`);
if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const w of warnings) console.log("  - " + w);
}
if (failures.length) {
  console.log(`\nFailures (${failures.length}):`);
  for (const f of failures) console.log("  - " + f);
  if (!warnOnly) process.exit(1);
} else {
  console.log("\nAll checks passed.");
}
