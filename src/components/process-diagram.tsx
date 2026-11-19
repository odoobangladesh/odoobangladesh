"use client";

import Link from "next/link";
import FadeContent from "@/components/react-bits/FadeContent/FadeContent";
import GlareHover from "@/components/react-bits/GlareHover/GlareHover";
import { icons, type IconKey } from "@/components/visual-ui";
import { useInViewOnce } from "@/lib/use-in-view-once";

export type ProcessNode = {
  id: string;
  label: string;
  detail?: string;
  href?: string;
  icon?: IconKey;
};

/** Horizontal process diagram with draw-on-view connectors. */
export function ProcessDiagram({
  nodes,
  ariaLabel = "Process diagram",
}: {
  nodes: ProcessNode[];
  ariaLabel?: string;
}) {
  const { ref, active } = useInViewOnce(0.25);

  return (
    <FadeContent
      effect="focus"
      blur={5}
      duration={0.65}
      delay={0.04}
      threshold={0.2}
      stagger={0.07}
      once
      className="w-full"
    >
      <div
        ref={ref}
        className={`process-diagram ${active ? "is-active" : ""}`}
        role="list"
        aria-label={ariaLabel}
      >
        {nodes.map((node, i) => {
          const Icon = node.icon ? icons[node.icon] : icons.target;
          const body = (
            <>
              <span className="process-diagram-icon" aria-hidden="true">
                <Icon className="h-4 w-4" />
              </span>
              <span className="mt-3 block text-sm font-semibold text-ink">
                {node.label}
              </span>
              {node.detail ? (
                <span className="mt-1 block text-xs leading-5 text-ink-muted">
                  {node.detail}
                </span>
              ) : null}
            </>
          );

          const card = node.href ? (
            <Link
              href={node.href}
              className="process-diagram-card card-interactive"
            >
              {body}
            </Link>
          ) : (
            <div className="process-diagram-card">{body}</div>
          );

          return (
            <div key={node.id} role="listitem" className="process-diagram-item">
              <GlareHover
                width="100%"
                height="auto"
                background="transparent"
                borderRadius="var(--radius-control)"
                borderColor="transparent"
                glareColor="#ffffff"
                glareOpacity={0.2}
                glareSize={34}
                softness={0.7}
                variant="streak"
                blendMode="soft-light"
                rimGlint={false}
                mode="hover"
                transitionDuration={500}
                className="!block w-full !place-items-stretch"
                style={{ display: "block" }}
              >
                {card}
              </GlareHover>
              {i < nodes.length - 1 ? (
                <span
                  className="process-diagram-edge"
                  aria-hidden="true"
                  style={{ animationDelay: `${i * 80}ms` }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </FadeContent>
  );
}
