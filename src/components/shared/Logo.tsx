import { OdooImage } from "@/components/shared/OdooImage";
import { OdooLink } from "@/components/shared/OdooLink";
import { odooLogoUrl } from "@/lib/odoo-cdn";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <OdooLink href="/" className={`inline-flex items-center ${className}`}>
      <OdooImage
        src={odooLogoUrl}
        alt="Odoo"
        width={80}
        height={28}
        priority
        className="h-7 w-auto"
      />
    </OdooLink>
  );
}
