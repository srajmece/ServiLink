"use client";

import Link from "next/link";
import { MapPin, Clock, IndianRupee, Star, CheckCircle2, Inbox } from "lucide-react";
import { getProvider } from "@/lib/data/providers";
import { getCategory } from "@/lib/data/categories";
import { bookingsForProvider } from "@/lib/data/bookings";
import { useAppState } from "@/lib/store";
import { KPICard } from "@/components/ui/KPICard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader, EmptyState } from "@/components/ui/Misc";
import { BookingStatusBadge } from "@/components/ui/StatusBadge";
import { formatCurrency, formatDateTime } from "@/lib/utils";

const CURRENT_PROVIDER_ID = "p1";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function ProviderDashboard() {
  const provider = getProvider(CURRENT_PROVIDER_ID)!;
  const { providerOnline, pendingJobOffers, acceptJobOffer, declineJobOffer, allBookings } = useAppState();
  const myBookings = allBookings.filter((b) => b.providerId === provider.id);
  const todaysJobs = myBookings.filter((b) => !["completed", "cancelled", "disputed"].includes(b.status));
  const upcoming = bookingsForProvider(provider.id).filter((b) => b.timing === "scheduled" && b.status !== "cancelled").slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">{greeting()}, {provider.name.split(" ")[0]} 👋</h1>
          <p className="text-foreground/55 text-sm mt-1">
            {providerOnline ? "You're online and visible to nearby customers." : "You're offline — turn on availability to receive job requests."}
          </p>
        </div>
      </div>

      {!providerOnline && (
        <div className="rounded-2xl border border-warning-500/30 bg-warning-50 p-4 text-sm text-warning-700">
          You&apos;re currently offline. Toggle &quot;Available&quot; in the header to start receiving job requests.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KPICard label="Today's earnings" value={formatCurrency(provider.earnings.today)} icon={IndianRupee} tone="success" />
        <KPICard label="Today's jobs" value={String(todaysJobs.length)} icon={CheckCircle2} tone="brand" />
        <KPICard label="Rating" value={provider.rating.toFixed(1)} icon={Star} tone="warning" />
        <KPICard label="Completed jobs" value={String(provider.completedJobs)} icon={CheckCircle2} tone="neutral" />
      </div>

      <div>
        <SectionHeader
          title="New service requests"
          subtitle={pendingJobOffers.length ? `${pendingJobOffers.length} waiting for your response` : undefined}
        />
        {pendingJobOffers.length === 0 ? (
          <EmptyState icon={Inbox} title="No new requests right now" description="New job requests will appear here in real time." />
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {pendingJobOffers.map((offer) => {
              const category = getCategory(offer.categoryId);
              return (
                <div key={offer.id} className="rounded-2xl border-2 border-brand-200 bg-brand-50/40 p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <Badge tone="brand">NEW SERVICE REQUEST</Badge>
                    <span className="text-lg">{category?.emoji}</span>
                  </div>
                  <p className="font-semibold mt-2.5">{offer.serviceLabel}</p>
                  <div className="mt-2 space-y-1 text-sm text-foreground/65">
                    <p className="inline-flex items-center gap-1.5"><MapPin size={13} /> {offer.distanceKm} km away</p>
                    <p>Customer: {offer.customerLabel}</p>
                    <p className="inline-flex items-center gap-1.5"><Clock size={13} /> Preferred time: {offer.preferredTime}</p>
                    <p className="inline-flex items-center gap-1.5 font-medium text-foreground">
                      <IndianRupee size={13} /> Estimated value: {formatCurrency(offer.estimatedValueMin)}–{formatCurrency(offer.estimatedValueMax)}
                    </p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => acceptJobOffer(offer.id)}>
                      Accept
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => declineJobOffer(offer.id)}>
                      Decline
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <SectionHeader title="Today's & active jobs" action={<Link href="/provider/schedule" className="text-sm font-medium text-brand-700">Full schedule</Link>} />
        {todaysJobs.length === 0 ? (
          <EmptyState title="No active jobs" description="Accepted jobs will show up here." />
        ) : (
          <div className="space-y-3">
            {todaysJobs.map((b) => {
              const category = getCategory(b.categoryId);
              return (
                <Link key={b.id} href={`/provider/jobs/${b.id}`} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 hover:shadow-md transition-shadow">
                  <span className="w-10 h-10 rounded-xl bg-surface-muted flex items-center justify-center text-lg shrink-0">{category?.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{b.problem}</p>
                    <p className="text-xs text-foreground/55">{b.address}</p>
                  </div>
                  <BookingStatusBadge status={b.status} />
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {upcoming.length > 0 && (
        <div>
          <SectionHeader title="Upcoming bookings" />
          <div className="space-y-3">
            {upcoming.map((b) => (
              <div key={b.id} className="flex items-center justify-between rounded-2xl border border-border bg-surface p-4">
                <div>
                  <p className="text-sm font-medium">{b.problem}</p>
                  <p className="text-xs text-foreground/55">{formatDateTime(b.scheduledFor ?? b.createdAt)}</p>
                </div>
                <Button href={`/provider/jobs/${b.id}`} size="sm" variant="outline">View</Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
