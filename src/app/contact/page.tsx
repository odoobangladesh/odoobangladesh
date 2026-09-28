import { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";

export const metadata: Metadata = {
  title: "Contact / Inquiry",
  description:
    "Request a community-led ERP assessment, implementation guidance, or training advice. We’ll connect you with the right Odoo resources and specialists.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Contact / Inquiry
          </h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            This is a community portal. Use this form to request an ERP
            assessment, ask about implementation planning, or explore training
            pathways. We’ll respond with resources first, and connect you with
            relevant specialists when appropriate.
          </p>

          <div className="mt-6 rounded-2xl border border-zinc-200 p-6 text-sm">
            <div className="font-medium">What you can request</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-600">
              <li>Free ERP assessment checklist and planning call</li>
              <li>Odoo implementation guidance (process + scope)</li>
              <li>Talk to an Odoo specialist (functional/technical)</li>
              <li>Training batch info + syllabus</li>
              <li>Workshop/webinar registration</li>
            </ul>
          </div>
        </div>
        <div className="md:col-span-6">
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}

