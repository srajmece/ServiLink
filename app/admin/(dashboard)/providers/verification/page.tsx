"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, CheckCircle2, XCircle, FileWarning, Ban } from "lucide-react";
import { providers as seedProviders } from "@/lib/data/providers";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { VerificationStatusBadge } from "@/components/ui/StatusBadge";
import { Table, THead, TH, TBody, TR, TD } from "@/components/ui/Table";
import { SectionHeader } from "@/components/ui/Misc";
import { VerificationStatus } from "@/lib/types";

function CheckDot({ ok }: { ok: boolean }) {
  return <Badge tone={ok ? "success" : "warning"}>{ok ? "🟢 Verified" : "🟡 Pending"}</Badge>;
}

export default function AdminProviderVerificationPage() {
  const [overrides, setOverrides] = useState<Record<string, VerificationStatus>>({});
  const providers = seedProviders.map((p) => (overrides[p.id] ? { ...p, status: overrides[p.id] } : p));
  const queue = providers.filter((p) => p.status === "pending");
  const others = providers.filter((p) => p.status !== "pending");

  function setStatus(id: string, status: VerificationStatus) {
    setOverrides((o) => ({ ...o, [id]: status }));
  }

  function renderRows(list: typeof providers) {
    return list.map((p) => (
      <TR key={p.id}>
        <TD>
          <div className="flex items-center gap-2.5">
            <Avatar initials={p.avatar} size="sm" />
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-xs text-foreground/50">{p.yearsExperience} yrs exp</p>
            </div>
          </div>
        </TD>
        <TD className="text-foreground/60 capitalize">{p.categories.join(", ")}</TD>
        <TD className="text-foreground/60 max-w-[220px]">
          <span className="line-clamp-2">{p.skills.join(", ")}</span>
        </TD>
        <TD><CheckDot ok={p.verification.identityVerified} /></TD>
        <TD><CheckDot ok={p.verification.certificateVerified} /></TD>
        <TD><CheckDot ok={p.verification.skillVerified} /></TD>
        <TD><VerificationStatusBadge status={p.status} /></TD>
        <TD>
          <div className="flex items-center gap-1">
            <Link href={`/customer/provider/${p.id}`} className="p-1.5 rounded-lg hover:bg-surface-muted" aria-label="View">
              <Eye size={15} />
            </Link>
            <button onClick={() => setStatus(p.id, "verified")} className="p-1.5 rounded-lg hover:bg-success-50 text-success-600" aria-label="Approve">
              <CheckCircle2 size={15} />
            </button>
            <button onClick={() => setStatus(p.id, "rejected")} className="p-1.5 rounded-lg hover:bg-danger-50 text-danger-600" aria-label="Reject">
              <XCircle size={15} />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-warning-50 text-warning-600" aria-label="Request documents">
              <FileWarning size={15} />
            </button>
            <button onClick={() => setStatus(p.id, "suspended")} className="p-1.5 rounded-lg hover:bg-surface-muted text-foreground/50" aria-label="Suspend">
              <Ban size={15} />
            </button>
          </div>
        </TD>
      </TR>
    ));
  }

  return (
    <div className="space-y-8">
      <SectionHeader title="Provider Verification" subtitle={`${queue.length} providers waiting for review`} />

      <div>
        <p className="text-sm font-semibold mb-2.5">🟡 Pending review</p>
        {queue.length === 0 ? (
          <p className="text-sm text-foreground/50">No providers pending review.</p>
        ) : (
          <Table>
            <THead>
              <tr>
                <TH>Provider</TH>
                <TH>Category</TH>
                <TH>Skills</TH>
                <TH>KYC</TH>
                <TH>Certificates</TH>
                <TH>Skill assessment</TH>
                <TH>Status</TH>
                <TH>Action</TH>
              </tr>
            </THead>
            <TBody>{renderRows(queue)}</TBody>
          </Table>
        )}
      </div>

      <div>
        <p className="text-sm font-semibold mb-2.5">All other providers</p>
        <Table>
          <THead>
            <tr>
              <TH>Provider</TH>
              <TH>Category</TH>
              <TH>Skills</TH>
              <TH>KYC</TH>
              <TH>Certificates</TH>
              <TH>Skill assessment</TH>
              <TH>Status</TH>
              <TH>Action</TH>
            </tr>
          </THead>
          <TBody>{renderRows(others)}</TBody>
        </Table>
      </div>
    </div>
  );
}
