"use client";

import { useParams, useRouter } from "next/navigation";
import { Phone, MessageCircle, ArrowLeft, PlayCircle, IndianRupee } from "lucide-react";
import { useAppState } from "@/lib/store";
import { getProvider } from "@/lib/data/providers";
import { getCategory } from "@/lib/data/categories";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { BookingTimeline } from "@/components/ui/BookingTimeline";
import { BookingStatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/Misc";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { BookingStatus } from "@/lib/types";

const ORDER: BookingStatus[] = ["requested", "provider_assigned", "travelling", "arrived", "in_progress", "completed"];
const NEXT_LABEL: Record<BookingStatus, string> = {
  requested: "Assign a provider",
  provider_assigned: "Technician starts travelling",
  travelling: "Technician has arrived",
  arrived: "Start the service",
  in_progress: "Mark service completed",
  completed: "",
  cancelled: "",
  disputed: "",
};

export default function BookingStatusPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { allBookings, updateBookingStatus, markBookingPaid } = useAppState();
  const booking = allBookings.find((b) => b.id === id);

  if (!booking) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <EmptyState title="Booking not found" />
      </div>
    );
  }

  const provider = booking.providerId ? getProvider(booking.providerId) : null;
  const category = getCategory(booking.categoryId);
  const idx = ORDER.indexOf(booking.status);
  const canAdvance = idx >= 0 && idx < ORDER.length - 1;
  const canCancel = booking.status === "requested" || booking.status === "provider_assigned";

  function advance() {
    if (!canAdvance) return;
    const next = ORDER[idx + 1];
    updateBookingStatus(booking!.id, next, booking!.createdAt);
  }

  function cancel() {
    updateBookingStatus(booking!.id, "cancelled", booking!.createdAt);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-8">
      <button onClick={() => router.back()} className="inline-flex items-center gap-1 text-sm text-foreground/55 mb-4">
        <ArrowLeft size={15} /> Back
      </button>

      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">{category?.emoji} {booking.problem}</h1>
          <p className="text-foreground/55 text-sm mt-1">Booking #{booking.id.slice(-6).toUpperCase()} · {formatDateTime(booking.createdAt)}</p>
        </div>
        <BookingStatusBadge status={booking.status} />
      </div>

      {provider && (
        <div className="mt-5 rounded-2xl border border-border bg-surface p-4 flex items-center gap-3">
          <Avatar initials={provider.avatar} size="md" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{provider.name}</p>
            <p className="text-xs text-foreground/55 truncate">{provider.title}</p>
          </div>
          <button className="p-2.5 rounded-full bg-surface-muted hover:bg-border" aria-label="Call provider">
            <Phone size={16} />
          </button>
          <button className="p-2.5 rounded-full bg-surface-muted hover:bg-border" aria-label="Message provider">
            <MessageCircle size={16} />
          </button>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
        <p className="text-sm font-semibold mb-4">Booking status</p>
        <BookingTimeline timeline={booking.timeline} currentStatus={booking.status} />
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-5 space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-foreground/55">Location</span><span className="font-medium text-right max-w-[65%]">{booking.address}</span></div>
        <div className="flex justify-between"><span className="text-foreground/55">Estimated cost</span><span className="font-medium">{formatCurrency(booking.estimatedCostMin)} – {formatCurrency(booking.estimatedCostMax)}</span></div>
        <div className="flex justify-between"><span className="text-foreground/55">Platform fee</span><span className="font-medium">{formatCurrency(booking.platformFee)}</span></div>
        <div className="flex justify-between font-semibold border-t border-border pt-2 mt-2"><span>Total</span><span>{formatCurrency(booking.total)}</span></div>
        <div className="flex justify-between pt-1"><span className="text-foreground/55">Payment</span><span className="font-medium capitalize">{booking.paymentStatus}</span></div>
      </div>

      {booking.status === "completed" && booking.paymentStatus === "pending" && (
        <Button fullWidth size="lg" className="mt-6" onClick={() => markBookingPaid(booking.id)}>
          <IndianRupee size={16} /> Pay {formatCurrency(booking.total)}
        </Button>
      )}

      {booking.status === "completed" && booking.paymentStatus === "paid" && !booking.rating && (
        <Button fullWidth size="lg" className="mt-6" href={`/customer/booking/${booking.id}/review`}>
          Rate your experience
        </Button>
      )}

      <div className="mt-8 rounded-2xl border border-dashed border-border p-4">
        <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wide mb-3">Demo controls</p>
        <div className="flex flex-wrap gap-3">
          {canAdvance && (
            <Button variant="outline" size="sm" onClick={advance}>
              <PlayCircle size={14} /> Simulate: {NEXT_LABEL[booking.status]}
            </Button>
          )}
          {canCancel && (
            <Button variant="ghost" size="sm" onClick={cancel} className="text-danger-600">
              Cancel booking
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
