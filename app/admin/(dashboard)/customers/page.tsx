"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Eye, Building2, User } from "lucide-react";
import { customers } from "@/lib/data/customers";
import { bookings } from "@/lib/data/bookings";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Table, THead, TH, TBody, TR, TD } from "@/components/ui/Table";
import { SectionHeader } from "@/components/ui/Misc";
import { formatDate } from "@/lib/utils";

function CustomersInner() {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState(params.get("type") ?? "all");

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      if (typeFilter !== "all" && c.accountType !== typeFilter) return false;
      if (query && !c.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, typeFilter]);

  return (
    <div className="space-y-5">
      <SectionHeader title="Customers" subtitle={`${filtered.length} of ${customers.length} customers`} />

      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 max-w-xs w-full">
          <Search size={15} className="text-foreground/40" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search customers..." className="flex-1 bg-transparent outline-none text-sm" />
        </div>
        <div className="flex rounded-xl bg-surface-muted p-1">
          {(["all", "individual", "business"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium capitalize ${typeFilter === t ? "bg-surface shadow-sm" : "text-foreground/55"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <Table>
        <THead>
          <tr>
            <TH>Customer</TH>
            <TH>Contact</TH>
            <TH>Type</TH>
            <TH>Location</TH>
            <TH>Bookings</TH>
            <TH>Joined</TH>
            <TH></TH>
          </tr>
        </THead>
        <TBody>
          {filtered.map((c) => {
            const bookingCount = bookings.filter((b) => b.customerId === c.id).length;
            return (
              <TR key={c.id}>
                <TD>
                  <div className="flex items-center gap-2.5">
                    <Avatar initials={c.avatar} size="sm" />
                    <span className="font-medium">{c.name}</span>
                  </div>
                </TD>
                <TD className="text-foreground/60">{c.phone}</TD>
                <TD>
                  <Badge tone={c.accountType === "business" ? "brand" : "neutral"}>
                    {c.accountType === "business" ? <Building2 size={11} /> : <User size={11} />} {c.accountType}
                  </Badge>
                </TD>
                <TD className="text-foreground/60">{c.addresses[0]?.area}, {c.addresses[0]?.city}</TD>
                <TD>{bookingCount}</TD>
                <TD className="text-foreground/60">{formatDate(c.joinedDate)}</TD>
                <TD>
                  <button className="p-1.5 rounded-lg hover:bg-surface-muted" aria-label="View customer">
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

export default function AdminCustomersPage() {
  return (
    <Suspense>
      <CustomersInner />
    </Suspense>
  );
}
