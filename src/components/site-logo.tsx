import Link from "next/link";
import { siteConfig } from "@/lib/site";

const LOGO = {
  horizontal: "/icons/ob-horizontal.svg",
  horizontalMonoGreen: "/icons/ob-horizontal-mono-green.svg",
  horizontalMonoBlack: "/icons/ob-horizontal-mono-black.svg",
  icon: "/icons/ob-icon.svg",
  wordmark: "/icons/ob-wordmark.svg",
  stacked: "/icons/ob-stacked.svg",
} as const;

/** Shared mark size for header / footer lockups. */
const LOCKUP_ICON_CLASS = "h-10 w-10 sm:h-11 sm:w-11";
const LOCKUP_WORDMARK_CLASS = "h-5 w-auto sm:h-6";

export type SiteLogoVariant =
  | "horizontal"
  | "icon"
  | "wordmark"
  | "stacked";

export type SiteLogoTone = "color" | "monoGreen" | "monoBlack" | "onDark";

type SiteLogoProps = {
  variant?: SiteLogoVariant;
  /**
   * `onDark` inverts mono-black wordmarks. Prefer `variant="icon"` on deep
   * green bands — invert turns the white OB strokes invisible.
   */
  tone?: SiteLogoTone;
  priority?: boolean;
  className?: string;
  /** Empty alt when a parent link already names the brand. */
  decorative?: boolean;
};

const INTRINSIC: Record<SiteLogoVariant, { width: number; height: number }> = {
  horizontal: { width: 280, height: 64 },
  icon: { width: 56, height: 56 },
  wordmark: { width: 220, height: 32 },
  stacked: { width: 240, height: 124 },
};

const DEFAULT_CLASS: Record<SiteLogoVariant, string> = {
  horizontal: "h-10 w-auto sm:h-11",
  icon: "h-10 w-10 sm:h-11 sm:w-11",
  wordmark: "h-5 w-auto sm:h-6",
  stacked: "h-16 w-auto sm:h-[4.5rem]",
};

function resolveSrc(variant: SiteLogoVariant, tone: SiteLogoTone): string {
  if (variant === "horizontal") {
    if (tone === "monoGreen") return LOGO.horizontalMonoGreen;
    if (tone === "monoBlack" || tone === "onDark") {
      return LOGO.horizontalMonoBlack;
    }
    return LOGO.horizontal;
  }
  if (variant === "icon") return LOGO.icon;
  if (variant === "wordmark") return LOGO.wordmark;
  return LOGO.stacked;
}

export function SiteLogo({
  variant = "horizontal",
  tone = "color",
  priority = false,
  className,
  decorative = false,
}: SiteLogoProps) {
  const size = INTRINSIC[variant];
  const src = resolveSrc(variant, tone);
  const invert = tone === "onDark";
  const sizing = className?.trim() ? className.trim() : DEFAULT_CLASS[variant];

  return (
    // eslint-disable-next-line @next/next/no-img-element -- brand SVGs from /public; keep crisp at any DPR
    <img
      src={src}
      alt={decorative ? "" : siteConfig.name}
      width={size.width}
      height={size.height}
      decoding="async"
      {...(priority
        ? { fetchPriority: "high" as const }
        : { loading: "lazy" as const })}
      className={`${sizing}${invert ? " brightness-0 invert" : ""}`}
      draggable={false}
    />
  );
}

type SiteBrandLockupProps = {
  /** Deep-green footer: icon + light CSS type (wordmark SVG is dark-ink). */
  onDark?: boolean;
  priority?: boolean;
  onNavigate?: () => void;
};

/**
 * Header: `ob-icon.svg` + `ob-wordmark.svg`.
 * Footer (`onDark`): icon mark + CSS wordmark for contrast on brand-deep.
 */
export function SiteBrandLockup({
  onDark = false,
  priority = false,
  onNavigate,
}: SiteBrandLockupProps) {
  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center gap-2.5 sm:gap-3"
      aria-label={siteConfig.name}
      onClick={onNavigate}
    >
      <span
        className={
          onDark
            ? "inline-flex shrink-0 rounded-[14px] ring-1 ring-white/25"
            : "inline-flex shrink-0"
        }
      >
        <SiteLogo
          variant="icon"
          className={LOCKUP_ICON_CLASS}
          priority={priority}
          decorative
        />
      </span>
      {onDark ? (
        <span className="flex flex-col leading-tight" aria-hidden="true">
          <span className="whitespace-nowrap text-base font-semibold tracking-[-0.01em] text-on-brand sm:text-lg">
            Odoo <span className="text-brand-tint">Bangladesh</span>
          </span>
          <span className="whitespace-nowrap text-xs font-normal text-brand-tint">
            Community Portal
          </span>
        </span>
      ) : (
        <SiteLogo
          variant="wordmark"
          className={LOCKUP_WORDMARK_CLASS}
          priority={priority}
          decorative
        />
      )}
    </Link>
  );
}
