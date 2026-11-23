import { InquiryForm } from "@/components/inquiry-form";

type Interest =
  | "erp-assessment"
  | "implementation-guidance"
  | "talk-to-specialist"
  | "functional-training"
  | "technical-training"
  | "company-training"
  | "webinar"
  | "care-plan";

/** End-of-page consultation form for commercial surfaces. */
export function ConsultationBand({
  title = "Request a consultation",
  description = "Share your context. Qualified business interest is routed to Binary Quest with source tagged as odoobangladesh.com.",
  defaultInterest = "erp-assessment",
  defaultPackage,
}: {
  title?: string;
  description?: string;
  defaultInterest?: Interest;
  defaultPackage?: string;
}) {
  return (
    <section className="mt-12 border-t border-line pt-10">
      <h2 className="font-display text-lg font-semibold tracking-tight text-ink md:text-xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
        {description}
      </p>
      <div className="mt-6 max-w-xl">
        <InquiryForm
          defaultInterest={defaultInterest}
          defaultPackage={defaultPackage}
        />
      </div>
    </section>
  );
}
