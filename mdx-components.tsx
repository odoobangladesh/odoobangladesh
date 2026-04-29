import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, children, ...props }) => {
      const h = typeof href === "string" ? href : "";
      const isExternal = h.startsWith("http");
      if (isExternal) {
        return (
          <a
            href={h}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-black/20 hover:decoration-black/40 dark:decoration-white/20 dark:hover:decoration-white/40"
            {...(props as Record<string, unknown>)}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={h}
          className="underline underline-offset-4 decoration-black/20 hover:decoration-black/40 dark:decoration-white/20 dark:hover:decoration-white/40"
        >
          {children}
        </Link>
      );
    },
    h1: ({ children }) => <h1 className="ob-h1 mt-10 first:mt-0">{children}</h1>,
    h2: ({ children }) => <h2 className="ob-h2 mt-10">{children}</h2>,
    h3: ({ children }) => <h3 className="ob-h3 mt-8">{children}</h3>,
    p: ({ children }) => (
      <p className="mt-4 text-base leading-7 text-[color:var(--color-foreground)]/90">{children}</p>
    ),
    ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6">{children}</ul>,
    ol: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6">{children}</ol>,
    li: ({ children }) => <li className="text-[color:var(--color-foreground)]/90">{children}</li>,
    code: ({ children }) => (
      <code className="rounded bg-black/5 px-1.5 py-0.5 text-sm dark:bg-white/10">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="mt-5 overflow-x-auto rounded-[18px] border border-[color:var(--color-border)] bg-black/5 p-4 text-sm leading-6 dark:bg-white/5">
        {children}
      </pre>
    ),
    ...components,
  };
}

