import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import { siteConfig } from "@/lib/site";

export type LeadType = "commercial" | "learner" | "newsletter" | "webinar";

export type InquiryLead = {
  kind: "inquiry";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role: string;
  interest: string;
  message?: string;
  package?: string;
  lead_type: LeadType;
  source: string;
  source_path?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  honeypot?: string;
};

export type NewsletterLead = {
  kind: "newsletter";
  email: string;
  lead_type: "newsletter";
  source: string;
  /** Optional unlock asset tag, e.g. "erp-checklist". */
  asset?: string;
  /** ISO timestamp when the visitor gave marketing-email consent. */
  consentAt?: string;
  source_path?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  honeypot?: string;
};

export type LeadPayload = InquiryLead | NewsletterLead;

function inferLeadType(role: string, interest: string): LeadType {
  if (role === "student" || role === "developer") return "learner";
  if (interest === "webinar") return "webinar";
  if (interest === "functional-training" || interest === "technical-training") {
    if (role === "business" || role === "organization") return "commercial";
    return "learner";
  }
  return "commercial";
}

export function withDefaults(
  payload: Omit<InquiryLead, "kind" | "source" | "lead_type"> & {
    lead_type?: LeadType;
  },
): InquiryLead {
  return {
    ...payload,
    kind: "inquiry",
    source: siteConfig.leadSource,
    lead_type:
      payload.lead_type ?? inferLeadType(payload.role, payload.interest),
  };
}

async function appendLocalLog(record: Record<string, unknown>) {
  const dir = path.join(process.cwd(), ".data");
  await fs.mkdir(dir, { recursive: true });
  const file = path.join(dir, "leads.jsonl");
  await fs.appendFile(file, `${JSON.stringify(record)}\n`, "utf8");
}

/**
 * Persist a lead for the practice CRM pipeline.
 * - Always tags source = odoobangladesh.com
 * - Optionally POSTs to CRM_WEBHOOK_URL when configured
 * - Always appends a local JSONL audit log so submissions are never silent
 *
 * ESP hook (P0): when Brevo/Listmonk (or equivalent) is configured, subscribe
 * newsletter leads here after local append — using consentAt for double opt-in.
 */
export async function captureLead(payload: LeadPayload) {
  if (payload.honeypot) {
    return { ok: true as const, ignored: true as const };
  }

  const { honeypot: _honeypot, ...clean } = payload;
  const record = {
    ...clean,
    source: siteConfig.leadSource,
    captured_at: new Date().toISOString(),
  };

  await appendLocalLog(record);

  const webhook = process.env.CRM_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.CRM_WEBHOOK_TOKEN
          ? { authorization: `Bearer ${process.env.CRM_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(record),
    });
    if (!res.ok) {
      throw new Error(`CRM webhook failed with ${res.status}`);
    }
  }

  return { ok: true as const, lead_type: "lead_type" in record ? record.lead_type : undefined };
}
