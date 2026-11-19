import type { ReactNode } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BookOpen,
  Boxes,
  Check,
  ClipboardList,
  Database,
  GitBranch,
  GraduationCap,
  Layers,
  LifeBuoy,
  Link2,
  ListChecks,
  Plug,
  Rocket,
  Scale,
  Search,
  Settings2,
  ShieldCheck,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import BlurText from "@/components/react-bits/BlurText/BlurText";
import GlareHover from "@/components/react-bits/GlareHover/GlareHover";

export const icons = {
  search: Search,
  gitBranch: GitBranch,
  database: Database,
  settings: Settings2,
  clipboard: ClipboardList,
  rocket: Rocket,
  alert: AlertTriangle,
  check: Check,
  target: Target,
  layers: Layers,
  plug: Plug,
  book: BookOpen,
  users: Users,
  shield: ShieldCheck,
  scale: Scale,
  lifeBuoy: LifeBuoy,
  listChecks: ListChecks,
  boxes: Boxes,
  graduation: GraduationCap,
  wrench: Wrench,
  link: Link2,
} as const;

export type IconKey = keyof typeof icons;

type StepItem = {
  title: ReactNode;
  description?: ReactNode;
  href?: string;
};

/** Numbered step rail for true sequences. */
export function StepRail({
  steps,
  ariaLabel = "Steps",
}: {
  steps: StepItem[];
  ariaLabel?: string;
}) {
  return (
    <ol className="step-rail" aria-label={ariaLabel}>
      {steps.map((step, i) => (
        <li key={i} className="step-rail-item">
          <span className="step-rail-marker" aria-hidden="true">
            {i + 1}
          </span>
          <div className="min-w-0">
            <div className="text-sm font-medium text-ink">
              {step.href ? (
                <Link href={step.href} className="btn-tertiary">
                  {step.title}
                </Link>
              ) : (
                step.title
              )}
            </div>
            {step.description ? (
              <div className="mt-1 text-sm leading-6 text-ink-muted">
                {step.description}
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

type FeatureItem = {
  icon?: IconKey;
  title: ReactNode;
  description?: ReactNode;
};

/** Icon + label feature rows — open list, no boxes. */
export function FeatureRows({
  items,
  ariaLabel,
}: {
  items: FeatureItem[];
  ariaLabel?: string;
}) {
  return (
    <ul className="feature-rows" aria-label={ariaLabel}>
      {items.map((item, i) => {
        const Icon = item.icon ? icons[item.icon] : icons.check;
        return (
          <li key={i} className="feature-row">
            <span className="feature-row-icon" aria-hidden="true">
              <Icon className="h-4 w-4" strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-medium text-ink">{item.title}</div>
              {item.description ? (
                <div className="mt-0.5 text-sm leading-6 text-ink-muted">
                  {item.description}
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

type PhaseItem = {
  id: string;
  title: string;
  body: ReactNode;
  points: ReactNode[];
  icon?: IconKey;
};

/** Vertical timeline — open content beside a rail, not stacked cards. */
export function PhaseTimeline({
  phases,
  ariaLabel = "Implementation phases",
}: {
  phases: PhaseItem[];
  ariaLabel?: string;
}) {
  return (
    <ol className="phase-timeline" aria-label={ariaLabel}>
      {phases.map((phase, i) => {
        const Icon = phase.icon ? icons[phase.icon] : icons.layers;
        return (
          <li key={phase.id} id={phase.id} className="phase-timeline-item">
            <div className="phase-timeline-rail" aria-hidden="true">
              <span className="phase-timeline-dot">
                <Icon className="h-4 w-4" />
              </span>
              {i < phases.length - 1 ? (
                <span className="phase-timeline-line" />
              ) : null}
            </div>
            <div className="phase-timeline-content min-w-0">
              <div className="text-xs font-medium text-brand">
                Phase {i + 1}
              </div>
              <h2 className="mt-1 font-display text-lg font-semibold text-ink md:text-xl">
                {phase.title}
              </h2>
              <div className="mt-2 text-sm leading-6 text-ink-muted">
                {phase.body}
              </div>
              <ul className="mt-4 grid gap-2">
                {phase.points.map((point, j) => (
                  <li
                    key={j}
                    className="flex gap-2 text-sm leading-6 text-ink"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

type FactItem = {
  icon?: IconKey;
  title: ReactNode;
  description: ReactNode;
};

/** Stacked fact definitions with dividers — replaces square info tiles. */
export function InfoTiles({
  items,
  ariaLabel,
}: {
  items: FactItem[];
  ariaLabel?: string;
}) {
  return (
    <ul className="fact-stack" aria-label={ariaLabel}>
      {items.map((item, i) => {
        const Icon = item.icon ? icons[item.icon] : icons.layers;
        return (
          <li key={i} className="fact-stack-item">
            <span className="fact-stack-icon" aria-hidden="true">
              <Icon className="h-4 w-4" strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-ink">{item.title}</div>
              <div className="mt-1 text-sm leading-6 text-ink-muted">
                {item.description}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export type DirectoryItem = {
  href: string;
  title: string;
  description: string;
  icon?: IconKey;
  featured?: boolean;
  meta?: string;
};

/** Borderless directory rows — replaces square link tiles. */
export function LinkTiles({
  items,
  ariaLabel,
  columns = "auto",
}: {
  items: DirectoryItem[];
  ariaLabel?: string;
  columns?: "auto" | 1 | 2;
}) {
  const colClass =
    columns === 1
      ? "directory-list-1"
      : columns === 2
        ? "directory-list-2"
        : items.length <= 3
          ? "directory-list-1"
          : "directory-list-2";

  return (
    <ul className={`directory-list ${colClass}`} aria-label={ariaLabel}>
      {items.map((item) => {
        const Icon = item.icon ? icons[item.icon] : icons.link;
        return (
          <li key={item.href}>
            <GlareHover
              width="100%"
              height="auto"
              background="transparent"
              borderRadius="var(--radius-control)"
              borderColor="transparent"
              glareColor="#ffffff"
              glareOpacity={item.featured ? 0.28 : 0.18}
              glareSize={36}
              softness={0.7}
              variant="sheen"
              blendMode="soft-light"
              rimGlint={false}
              mode="hover"
              transitionDuration={520}
              className="!block w-full !place-items-stretch overflow-hidden"
              style={{ display: "block" }}
            >
              <Link
                href={item.href}
                className={`directory-row group w-full ${
                  item.featured ? "directory-row-feature" : ""
                }`}
              >
                <span className="directory-row-icon" aria-hidden="true">
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="directory-row-copy min-w-0">
                  <span className="directory-row-title">
                    {item.title}
                    {item.meta ? (
                      <span className="directory-row-meta">{item.meta}</span>
                    ) : null}
                  </span>
                  <span className="directory-row-desc">{item.description}</span>
                </span>
                <span className="directory-row-chevron" aria-hidden="true">
                  →
                </span>
              </Link>
            </GlareHover>
          </li>
        );
      })}
    </ul>
  );
}

export function PageIntro({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description: ReactNode;
  eyebrow?: string;
}) {
  return (
    <header className="max-w-3xl">
      {eyebrow ? (
        <p className="text-sm font-medium text-ink-muted">{eyebrow}</p>
      ) : null}
      <BlurText
        as="h1"
        text={title}
        animateBy="words"
        direction="top"
        effect="focus"
        blur={8}
        distance={14}
        delay={60}
        stepDuration={0.28}
        trigger="view"
        className={`font-display text-[length:var(--text-h1)] font-bold tracking-[var(--tracking-h1)] text-ink ${
          eyebrow ? "mt-2" : ""
        }`}
      />
      <div className="mt-3 text-sm leading-6 text-ink-muted md:text-base md:leading-7">
        {description}
      </div>
    </header>
  );
}

type PathNode = {
  title: string;
  href: string;
  hint: string;
  icon?: IconKey;
};

/** Connected journey strip — not a row of square cards. */
export function PathFlow({
  nodes,
  ariaLabel = "Suggested path",
}: {
  nodes: PathNode[];
  ariaLabel?: string;
}) {
  return (
    <ol className="path-strip" aria-label={ariaLabel}>
      {nodes.map((node, i) => {
        const Icon = node.icon ? icons[node.icon] : icons.target;
        return (
          <li key={node.href} className="path-strip-item">
            <Link href={node.href} className="path-strip-node group">
              <span className="path-strip-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="path-strip-icon" aria-hidden="true">
                <Icon className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="path-strip-title">{node.title}</span>
              <span className="path-strip-hint">{node.hint}</span>
            </Link>
            {i < nodes.length - 1 ? (
              <span className="path-strip-edge" aria-hidden="true" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
