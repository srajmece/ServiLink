"use client";

import { useParams, useRouter } from "next/navigation";
import { MapPin, Phone, MessageCircle, Navigation2, IndianRupee, FileText, History, CheckCircle2 } from "lucide-react";
import { useAppState } from "@/lib/store";
import { getCustomer } from "@/lib/data/customers";
import { getCategory } from "@/lib/data/categories";
import { bookingsForProvider } from "@/lib/data/bookings";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BookingStatusBadge } from "@/components/ui/StatusBadge";
import { BookingTimelineHorizontal } from "@/components/ui/BookingTimeline";
import { SectionHeader, EmptyState } from "@/components/ui/Misc";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { BookingStatus } from "@/lib/types";

const CURRENT_PROVIDER_ID = "p1";

const ACTIONS: Partial<Record<BookingStatus, { next: BookingStatus; label: string }>> = {
  provider_assigned: { next: "travelling", label: "Start Navigation" },
  travelling: { next: "arrived", label: "Arrived" },
  arrived: { next: "in_progress", label: "Start Service" },
  in_progress: { next: "completed", label: "Complete Job" },
};

export default function ProviderJobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { allBookings, updateBookingStatus } = useAppState();
  const booking = allBookings.find((b) => b.id === id);

  if (!booking) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <EmptyState title="Job not found" />
      </div>
    );
  }

  const customer = getCustomer(booking.customerId);
  const category = getCategory(booking.categoryId);
  const action = ACTIONS[booking.status];
  const history = bookingsForProvider(CURRENT_PROVIDER_ID).filter(
    (b) => b.customerId === booking.customerId && b.id !== booking.id && b.status === "completed",
  );

  function handleAction() {
    if (!action) return;
    updateBookingStatus(booking!.id, action.next, booking!.createdAt);
  }

  const isCompleted = booking.status === "completed";

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">{category?.emoji} {booking.problem}</h1>
          <p className="text-foreground/55 text-sm mt-1">Job #{booking.id.slice(-6).toUpperCase()} · {formatDateTime(booking.createdAt)}</p>
        </div>
        <BookingStatusBadge status={booking.status} />
      </div>

      {isCompleted ? (
        <Card className="mt-6 p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-success-50 text-success-600 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 size={28} />
          </div>
          <p className="font-semibold">Job completed</p>
          <p className="text-sm text-foreground/55 mt-1">Great work! Payment will reflect in your earnings once collected.</p>
          <p className="text-2xl font-semibold mt-4">{formatCurrency(booking.total)}</p>
          <p className="text-xs text-foreground/50">Payment status: {booking.paymentStatus}</p>
          <Button href="/provider" className="mt-5" fullWidth>
            Back to dashboard
          </Button>
        </Card>
      ) : (
        <div className="mt-5 overflow-x-auto no-scrollbar rounded-2xl border border-border bg-surface p-4">
          <BookingTimelineHorizontal timeline={booking.timeline} />
        </div>
      )}

      {customer && (
        <Card className="mt-5 p-4 flex items-center gap-3">
          <Avatar initials={customer.avatar} size="md" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{customer.name}</p>
            <p className="text-xs text-foreground/55 truncate">{customer.accountType === "business" ? "Business customer" : "Individual customer"}</p>
          </div>
          <button className="p-2.5 rounded-full bg-surface-muted hover:bg-border" aria-label="Call customer">
            <Phone size={16} />
          </button>
          <button className="p-2.5 rounded-full bg-surface-muted hover:bg-border" aria-label="Message customer">
            <MessageCircle size={16} />
          </button>
        </Card>
      )}

      <Card className="mt-4 p-4 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-foreground/55 inline-flex items-center gap-1.5 shrink-0"><MapPin size={14} /> Location</span>
          <span className="font-medium text-right">{booking.address}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-foreground/55 inline-flex items-center gap-1.5 shrink-0"><FileText size={14} /> Notes</span>
          <span className="font-medium text-right">{booking.description}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground/55 inline-flex items-center gap-1.5"><IndianRupee size={14} /> Job value</span>
          <span className="font-medium">{formatCurrency(booking.estimatedCostMin)} – {formatCurrency(booking.estimatedCostMax)}</span>
        </div>
      </Card>

      {history.length > 0 && (
        <div className="mt-5">
          <SectionHeader title="Service history with this customer" className="mb-2" />
          <div className="space-y-2">
            {history.map((h) => (
              <div key={h.id} className="flex items-center justify-between rounded-xl border border-border bg-surface p-3 text-sm">
                <span className="inline-flex items-center gap-1.5"><History size={13} className="text-foreground/40" /> {h.problem}</span>
                <span className="text-foreground/50 text-xs">{formatDateTime(h.createdAt)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isCompleted && (
        <div className="mt-6 flex gap-3 sticky bottom-20 sm:bottom-4">
          {booking.status === "provider_assigned" && (
            <Button variant="outline" size="lg" className="flex-1" onClick={() => router.push(`/provider`)}>
              <Navigation2 size={16} /> View route
            </Button>
          )}
          {action && (
            <Button size="lg" className="flex-1" onClick={handleAction}>
              {action.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
