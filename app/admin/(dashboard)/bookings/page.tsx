"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, Search, Siren } from "lucide-react";
import { bookings } from "@/lib/data/bookings";
import { getCustomer } from "@/lib/data/customers";
import { getProvider } from "@/lib/data/providers";
import { BookingStatusBadge } from "@/components/ui/StatusBadge";
import { Table, THead, TH, TBody, TR, TD } from "@/components/ui/Table";
import { SectionHeader } from "@/components/ui/Misc";
import { formatCurrency, formatDate } from "@/lib/utils";

type Filter = "all" | "active" | "completed" | "cancelled" | "emergency";

const tabs: { key: Filter; label: string }[] = [
  { key: "all", label: "All Bookings" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
  { key: "emergency", label: "Emergency" },
];

function BookingsInner() {
  const params = useSearchParams();
  const [filter, setFilter] = useState<Filter>((params.get("status") as Filter) ?? "all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return bookings
      .filter((b) => {
        if (filter === "active") return !["completed", "cancelled", "disputed"].includes(b.status);
        if (filter === "completed") return b.status === "completed";
        if (filter === "cancelled") return b.status === "cancelled" || b.status === "disputed";
        if (filter === "emergency") return b.isEmergency;
        return true;
      })
      .filter((b) => (query ? b.problem.toLowerCase().includes(query.toLowerCase()) : true))
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [filter, query]);

  return (
    <div className="space-y-5">
      <SectionHeader title="Booking Management" subtitle={`${filtered.length} of ${bookings.length} bookings`} />

      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 max-w-xs w-full">
          <Search size={15} className="text-foreground/40" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search bookings..." className="flex-1 bg-transparent outline-none text-sm" />
        </div>
        <div className="flex rounded-xl bg-surface-muted p-1 overflow-x-auto no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`shrink-0 px-3.5 py-1.5 rounded-lg text-sm font-medium ${filter === t.key ? "bg-surface shadow-sm" : "text-foreground/55"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <Table>
        <THead>
          <tr>
            <TH>Booking ID</TH>
            <TH>Customer</TH>
            <TH>Provider</TH>
            <TH>Service</TH>
            <TH>Location</TH>
            <TH>Date</TH>
            <TH>Status</TH>
            <TH>Amount</TH>
            <TH>Action</TH>
          </tr>
        </THead>
        <TBody>
          {filtered.map((b) => {
            const customer = getCustomer(b.customerId);
            const provider = b.providerId ? getProvider(b.providerId) : null;
            return (
              <TR key={b.id}>
                <TD className="font-medium">
                  <span className="inline-flex items-center gap-1.5">
                    {b.isEmergency && <Siren size={12} className="text-danger-500" />}
                    #{b.id.slice(-6).toUpperCase()}
                  </span>
                </TD>
                <TD className="text-foreground/70">{customer?.name}</TD>
                <TD className="text-foreground/70">{provider?.name ?? "Unassigned"}</TD>
                <TD className="text-foreground/70 max-w-[180px] truncate">{b.problem}</TD>
                <TD className="text-foreground/60">{b.city}</TD>
                <TD className="text-foreground/60">{formatDate(b.createdAt)}</TD>
                <TD><BookingStatusBadge status={b.status} /></TD>
                <TD>{formatCurrency(b.total)}</TD>
                <TD>
                  <button className="p-1.5 rounded-lg hover:bg-surface-muted" aria-label="View booking">
                    <Eye size={15} />
                  </button>
                </TD>
              </TR>
            );
          })}
        </TBody>
      </Table>
    </div>
  );
}

export default function AdminBookingsPage() {
  return (
    <Suspense>
      <BookingsInner />
    </Suspense>
  );
}
