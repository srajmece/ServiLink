"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, Eye, ShieldCheck, Ban, CheckCircle2 } from "lucide-react";
import { providers } from "@/lib/data/providers";
import { Avatar } from "@/components/ui/Avatar";
import { RatingStars } from "@/components/ui/RatingStars";
import { VerificationStatusBadge } from "@/components/ui/StatusBadge";
import { Table, THead, TH, TBody, TR, TD } from "@/components/ui/Table";
import { SectionHeader } from "@/components/ui/Misc";
import { Button } from "@/components/ui/Button";
import { VerificationStatus } from "@/lib/types";

const statusTabs: { key: VerificationStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "verified", label: "Verified" },
  { key: "suspended", label: "Suspended" },
  { key: "rejected", label: "Rejected" },
];

function ProvidersInner() {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<VerificationStatus | "all">((params.get("status") as VerificationStatus) ?? "all");

  const filtered = useMemo(() => {
    return providers.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, status]);

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Providers"
        subtitle={`${filtered.length} of ${providers.length} providers`}
        action={<Button href="/admin/providers/verification" variant="outline" size="sm"><ShieldCheck size={14} /> Verification queue</Button>}
      />

      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 max-w-xs w-full">
          <Search size={15} className="text-foreground/40" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search providers..." className="flex-1 bg-transparent outline-none text-sm" />
        </div>
        <div className="flex rounded-xl bg-surface-muted p-1 overflow-x-auto no-scrollbar">
          {statusTabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setStatus(t.key)}
              className={`shrink-0 px-3.5 py-1.5 rounded-lg text-sm font-medium capitalize ${status === t.key ? "bg-surface shadow-sm" : "text-foreground/55"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <Table>
        <THead>
          <tr>
            <TH>Provider</TH>
            <TH>Category</TH>
            <TH>Experience</TH>
            <TH>Rating</TH>
            <TH>Jobs</TH>
            <TH>Status</TH>
            <TH>Actions</TH>
          </tr>
        </THead>
        <TBody>
          {filtered.map((p) => (
            <TR key={p.id}>
              <TD>
                <div className="flex items-center gap-2.5">
                  <Avatar initials={p.avatar} size="sm" />
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-foreground/50">{p.title}</p>
                  </div>
                </div>
              </TD>
              <TD className="text-foreground/60 capitalize">{p.categories.join(", ")}</TD>
              <TD>{p.yearsExperience} yrs</TD>
              <TD><RatingStars rating={p.rating} size={12} /></TD>
              <TD>{p.completedJobs}</TD>
              <TD><VerificationStatusBadge status={p.status} /></TD>
              <TD>
                <div className="flex items-center gap-1">
                  <Link href={`/customer/provider/${p.id}`} className="p-1.5 rounded-lg hover:bg-surface-muted" aria-label="View profile">
                    <Eye size={15} />
                  </Link>
                  {p.status !== "verified" && (
                    <button className="p-1.5 rounded-lg hover:bg-success-50 text-success-600" aria-label="Approve">
                      <CheckCircle2 size={15} />
                    </button>
                  )}
                  {p.status !== "suspended" && (
                    <button className="p-1.5 rounded-lg hover:bg-danger-50 text-danger-600" aria-label="Suspend">
                      <Ban size={15} />
                    </button>
                  )}
                </div>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}

export default function AdminProvidersPage() {
  return (
    <Suspense>
      <ProvidersInner />
    </Suspense>
  );
}
