"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { complaints as seedComplaints } from "@/lib/data/complaints";
import { getCustomer } from "@/lib/data/customers";
import { getProvider } from "@/lib/data/providers";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeader, EmptyState } from "@/components/ui/Misc";
import { cn, formatDate } from "@/lib/utils";
import { Complaint } from "@/lib/types";

const tabs: { key: Complaint["status"]; label: string }[] = [
  { key: "open", label: "Open" },
  { key: "in_progress", label: "In Progress" },
  { key: "resolved", label: "Resolved" },
];

const priorityTone: Record<Complaint["priority"], "danger" | "warning" | "neutral"> = {
  high: "danger",
  medium: "warning",
  low: "neutral",
};

function ComplaintsInner() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Complaint["status"]>((params.get("status") as Complaint["status"]) ?? "open");
  const [complaints, setComplaints] = useState(seedComplaints);

  const filtered = complaints.filter((c) => c.status === status);

  function advance(id: string) {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: c.status === "open" ? "in_progress" : "resolved" } : c)),
    );
  }

  return (
    <div className="space-y-5">
      <SectionHeader title="Complaints" subtitle={`${complaints.filter((c) => c.status !== "resolved").length} unresolved of ${complaints.length}`} />

      <div className="flex rounded-xl bg-surface-muted p-1 max-w-md">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setStatus(t.key)}
            className={cn("flex-1 px-3.5 py-2 rounded-lg text-sm font-medium", status === t.key ? "bg-surface shadow-sm" : "text-foreground/55")}
          >
            {t.label} ({complaints.filter((c) => c.status === t.key).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title={`No ${status.replace("_", " ")} complaints`} />
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => {
            const customer = getCustomer(c.customerId);
            const provider = c.providerId ? getProvider(c.providerId) : null;
            return (
              <Card key={c.id} className="p-4">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{c.subject}</p>
                      <Badge tone={priorityTone[c.priority]}>{c.priority} priority</Badge>
                    </div>
                    <p className="text-sm text-foreground/60 mt-1.5">{c.description}</p>
                    <p className="text-xs text-foreground/45 mt-2">
                      {customer?.name} {provider && `· vs ${provider.name}`} · Filed {formatDate(c.createdAt)} · Booking #{c.bookingId.slice(-6).toUpperCase()}
                    </p>
                  </div>
                  {c.status !== "resolved" && (
                    <button
                      onClick={() => advance(c.id)}
                      className="shrink-0 text-xs font-medium rounded-lg px-3 py-1.5 bg-brand-50 text-brand-700 hover:bg-brand-100"
                    >
                      Mark as {c.status === "open" ? "In Progress" : "Resolved"}
                    </button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminComplaintsPage() {
  return (
    <Suspense>
      <ComplaintsInner />
    </Suspense>
  );
}
