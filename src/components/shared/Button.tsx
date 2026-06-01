import { OdooLink } from "./OdooLink";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
}: ButtonProps) {
  const variants = {
    primary: "bg-odoo-purple text-white hover:bg-odoo-purple-dark shadow-md",
    secondary: "bg-odoo-teal text-white hover:bg-odoo-teal-dark",
    outline: "border-2 border-odoo-purple text-odoo-purple hover:bg-odoo-purple hover:text-white",
  };

  return (
    <OdooLink
      href={href}
      external={external}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors",
        variants[variant],
        className,
      )}
    >
      {children}
    </OdooLink>
  );
}
