import { buildMetadata } from "@/lib/seo";
import { InquiryForm } from "@/components/inquiry-form";

export const metadata = buildMetadata({
  title: "Contact / Inquiry",
  description:
    "Request a neutral Odoo ERP consultation or training guidance in Bangladesh. Community portal — educational and resource-first.",
  pathname: "/contact",
});

export default function ContactPage() {
  return (
    <div className="ob-container ob-section">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="ob-h1">Contact</h1>
          <p className="ob-lead mt-4">
            This portal is community-driven and education-first. Send your question and we’ll reply
            with practical next steps, resources, and a neutral scope outline (if you’re planning an
            ERP project).
          </p>

          <div className="mt-8 ob-card p-6">
            <div className="text-sm font-semibold">Good inquiries include</div>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-[color:var(--color-muted)]">
              <li>Industry + company size</li>
              <li>Which modules you need (Sales/Inventory/Accounting/etc.)</li>
              <li>Timeline and any constraints</li>
              <li>Whether you want training (functional or technical)</li>
            </ul>
          </div>
        </div>

        <div className="ob-card p-6">
          <div className="text-lg font-semibold tracking-tight">Inquiry form</div>
          <p className="mt-2 text-sm leading-6 text-[color:var(--color-muted)]">
            We’ll respond by email. No spam.
          </p>
          <div className="mt-6">
            <InquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}

