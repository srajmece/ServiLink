"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useAppState } from "@/lib/store";
import { currentCustomer } from "@/lib/data/customers";
import { getProvider } from "@/lib/data/providers";
import { getCategory } from "@/lib/data/categories";
import { Avatar } from "@/components/ui/Avatar";
import { BookingStatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/Misc";
import { formatCurrency, formatDateTime, cn } from "@/lib/utils";

const tabs = [
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
] as const;

export default function BookingsHistoryPage() {
  const { allBookings } = useAppState();
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("active");
  const myBookings = allBookings
    .filter((b) => b.customerId === currentCustomer.id)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const filtered = myBookings.filter((b) => {
    if (tab === "active") return !["completed", "cancelled", "disputed"].includes(b.status);
    if (tab === "completed") return b.status === "completed";
    return b.status === "cancelled" || b.status === "disputed";
  });

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight mb-5">My Bookings</h1>

      <div className="flex rounded-xl bg-surface-muted p-1 max-w-sm">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn("flex-1 rounded-lg py-2 text-sm font-medium transition-colors", tab === t.key ? "bg-surface shadow-sm" : "text-foreground/55")}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {filtered.length === 0 && <EmptyState title={`No ${tab} bookings`} description="Bookings will show up here." />}
        {filtered.map((b) => {
          const provider = b.providerId ? getProvider(b.providerId) : null;
          const category = getCategory(b.categoryId);
          return (
            <Link
              key={b.id}
              href={b.status === "completed" && !b.rating ? `/customer/booking/${b.id}/review` : `/customer/booking/${b.id}/status`}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {provider ? <Avatar initials={provider.avatar} size="md" /> : <div className="w-11 h-11 rounded-full bg-surface-muted flex items-center justify-center text-lg">{category?.emoji}</div>}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{b.problem}</p>
                <p className="text-xs text-foreground/55 truncate">{provider?.name ?? "Awaiting provider"} · {formatDateTime(b.createdAt)}</p>
                <p className="text-xs text-foreground/45 mt-0.5">{formatCurrency(b.total)}</p>
              </div>
              <BookingStatusBadge status={b.status} />
              <ChevronRight size={16} className="text-foreground/30 shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
