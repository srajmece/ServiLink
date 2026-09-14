"use client";

import Link from "next/link";
import { Search, Siren, ArrowRight, Clock, ChevronRight } from "lucide-react";
import { featuredCategories } from "@/lib/data/categories";
import { CategoryCard } from "@/components/marketplace/CategoryCard";
import { currentCustomer } from "@/lib/data/customers";
import { getProvider } from "@/lib/data/providers";
import { useAppState } from "@/lib/store";
import { SectionHeader, EmptyState } from "@/components/ui/Misc";
import { BookingStatusBadge } from "@/components/ui/StatusBadge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { formatDateTime } from "@/lib/utils";
import { customerNotifications } from "@/lib/data/notifications";

export default function CustomerDashboard() {
  const { allBookings, savedProviderIds } = useAppState();
  const myBookings = allBookings.filter((b) => b.customerId === currentCustomer.id);
  const active = myBookings.filter((b) => !["completed", "cancelled", "disputed"].includes(b.status));
  const past = myBookings.filter((b) => ["completed", "cancelled", "disputed"].includes(b.status)).slice(0, 3);
  const savedProviders = savedProviderIds.map((id) => getProvider(id)).filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Hi {currentCustomer.name.split(" ")[0]} 👋</h1>
        <p className="text-foreground/55 text-sm mt-1">What service do you need today?</p>
        <Link
          href="/customer/request/category"
          className="mt-4 flex items-center gap-2 rounded-2xl border border-border bg-surface p-3.5 shadow-sm hover:border-brand-300 transition-colors"
        >
          <Search size={18} className="text-foreground/40" />
          <span className="text-sm text-foreground/50">What service do you need?</span>
        </Link>
      </div>

      <Link
        href="/customer/emergency"
        className="flex items-center gap-3 rounded-2xl bg-danger-50 border border-danger-500/20 p-4 hover:bg-danger-50/70 transition-colors"
      >
        <span className="w-10 h-10 rounded-full bg-danger-500 text-white flex items-center justify-center shrink-0">
          <Siren size={18} />
        </span>
        <div className="flex-1">
          <p className="font-semibold text-sm text-danger-700">Emergency Service</p>
          <p className="text-xs text-danger-600/80">Get a verified technician dispatched right away</p>
        </div>
        <ArrowRight size={18} className="text-danger-500" />
      </Link>

      {active.length > 0 && (
        <div>
          <SectionHeader title="Current & upcoming bookings" action={<Link href="/customer/bookings" className="text-sm font-medium text-brand-700">See all</Link>} />
          <div className="grid sm:grid-cols-2 gap-4">
            {active.map((b) => {
              const provider = b.providerId ? getProvider(b.providerId) : null;
              return (
                <Link
                  key={b.id}
                  href={`/customer/booking/${b.id}/status`}
                  className="rounded-2xl border border-border bg-surface p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-sm">{b.problem}</p>
                      <p className="text-xs text-foreground/55 mt-0.5">{provider ? provider.name : "Finding a provider..."}</p>
                    </div>
                    <BookingStatusBadge status={b.status} />
                  </div>
                  <p className="text-xs text-foreground/45 mt-3 inline-flex items-center gap-1">
                    <Clock size={12} /> {b.timing === "now" ? "Requested now" : formatDateTime(b.scheduledFor ?? b.createdAt)}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <SectionHeader title="Categories" action={<Link href="/services" className="text-sm font-medium text-brand-700">View All Services</Link>} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredCategories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </div>

      {savedProviders.length > 0 && (
        <div>
          <SectionHeader title="Saved providers" />
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {savedProviders.map((p) =>
              p ? (
                <Link
                  key={p.id}
                  href={`/customer/provider/${p.id}`}
                  className="shrink-0 w-44 rounded-2xl border border-border bg-surface p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <Avatar initials={p.avatar} size="md" />
                  <p className="font-medium text-sm mt-2 truncate">{p.name}</p>
                  <p className="text-xs text-foreground/55 truncate">{p.title}</p>
                </Link>
              ) : null,
            )}
          </div>
        </div>
      )}

      <div>
        <SectionHeader title="Previous services" action={<Link href="/customer/bookings" className="text-sm font-medium text-brand-700">Booking history</Link>} />
        {past.length === 0 ? (
          <EmptyState title="No past bookings yet" description="Once you complete a service, it will show up here." />
        ) : (
          <div className="rounded-2xl border border-border bg-surface divide-y divide-border overflow-hidden">
            {past.map((b) => {
              const provider = b.providerId ? getProvider(b.providerId) : null;
              return (
                <Link key={b.id} href={`/customer/booking/${b.id}/status`} className="flex items-center gap-3 p-4 hover:bg-surface-muted/50">
                  {provider && <Avatar initials={provider.avatar} size="sm" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{b.problem}</p>
                    <p className="text-xs text-foreground/50">{provider?.name ?? "—"} · {formatDateTime(b.createdAt)}</p>
                  </div>
                  <BookingStatusBadge status={b.status} />
                  <ChevronRight size={16} className="text-foreground/30" />
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <SectionHeader title="Recommended for you" />
        <div className="grid sm:grid-cols-3 gap-4">
          {["AC & HVAC", "Electrical", "EV Services"].map((name) => {
            const cat = featuredCategories.find((c) => c.name === name)!;
            return (
              <div key={name} className="rounded-2xl border border-border bg-surface p-4 flex items-center gap-3">
                <span className="text-2xl">{cat.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{cat.name}</p>
                  <p className="text-xs text-foreground/55">Popular in Anna Nagar this week</p>
                </div>
                <Button href={`/customer/request/category?category=${cat.id}`} size="sm" variant="outline">
                  Book
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {customerNotifications.some((n) => !n.read) && (
        <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-brand-800">
            You have {customerNotifications.filter((n) => !n.read).length} new notifications.
          </p>
          <Link href="/customer/profile?tab=notifications" className="text-sm font-medium text-brand-700 whitespace-nowrap">
            View all
          </Link>
        </div>
      )}
    </div>
  );
}
