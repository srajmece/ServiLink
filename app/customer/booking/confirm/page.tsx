"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, MapPin, CalendarClock, Info } from "lucide-react";
import { useBookingDraft } from "@/lib/bookingDraft";
import { getProvider } from "@/lib/data/providers";
import { getCategory } from "@/lib/data/categories";
import { currentCustomer } from "@/lib/data/customers";
import { buildTimeline } from "@/lib/data/bookings";
import { useAppState } from "@/lib/store";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { formatCurrency, makeId } from "@/lib/utils";
import { Booking } from "@/lib/types";
import { EmptyState } from "@/components/ui/Misc";

function ConfirmInner() {
  const router = useRouter();
  const params = useSearchParams();
  const providerId = params.get("providerId");
  const isQuoteFromProfile = params.get("type") === "quote";
  const { draft, reset } = useBookingDraft();
  const { addBooking } = useAppState();
  const [submitting, setSubmitting] = useState(false);

  const provider = providerId ? getProvider(providerId) : null;

  if (!provider) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <EmptyState title="No provider selected" description="Please choose a provider first." />
      </div>
    );
  }

  const categoryId = draft.categoryId ?? provider.categories[0];
  const category = getCategory(categoryId);
  const problemLabel = draft.problemLabel ?? provider.title;
  const pricingType = isQuoteFromProfile ? "quote" : draft.pricingType;
  const address = draft.addressText ?? `${currentCustomer.addresses[0].line1}, ${currentCustomer.addresses[0].area}, ${currentCustomer.addresses[0].city}`;
  const timing = draft.timing;
  const scheduledFor = draft.scheduledFor;

  const estimatedCostMin = pricingType === "quote" ? provider.startingPrice * 3 : provider.startingPrice;
  const estimatedCostMax = pricingType === "quote" ? provider.startingPrice * 6 : Math.round(provider.startingPrice * 1.7);
  const platformFee = Math.round(estimatedCostMax * 0.08);
  const total = estimatedCostMax + platformFee;

  function handleConfirm() {
    setSubmitting(true);
    const id = makeId("bk");
    const createdAt = new Date().toISOString();
    const booking: Booking = {
      id,
      customerId: currentCustomer.id,
      providerId: provider!.id,
      categoryId,
      problem: problemLabel,
      description: draft.description || `${problemLabel} — booked via ServiLink`,
      address,
      city: currentCustomer.addresses[0]?.city ?? "Chennai",
      timing,
      scheduledFor: scheduledFor ?? undefined,
      pricingType,
      status: "provider_assigned",
      createdAt,
      estimatedCostMin,
      estimatedCostMax,
      platformFee,
      total,
      isEmergency: false,
      matchScore: undefined,
      timeline: buildTimeline("provider_assigned", createdAt),
      paymentStatus: "pending",
    };
    setTimeout(() => {
      addBooking(booking);
      reset();
      router.push(`/customer/booking/${id}/status`);
    }, 600);
  }

  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 py-6 sm:py-8">
      <button onClick={() => router.back()} className="inline-flex items-center gap-1 text-sm text-foreground/55 mb-4">
        <ArrowLeft size={15} /> Back
      </button>
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Confirm your booking</h1>
      <p className="text-foreground/55 text-sm mt-1">Review the details before confirming.</p>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-5 space-y-5">
        <div className="flex items-center gap-3">
          <Avatar initials={provider.avatar} size="md" />
          <div>
            <p className="font-medium text-sm">{provider.name}</p>
            <p className="text-xs text-foreground/55">{provider.title}</p>
          </div>
        </div>

        <div className="border-t border-border pt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-foreground/55">Service</span>
            <span className="font-medium text-right">{category?.emoji} {problemLabel}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-foreground/55 shrink-0">Location</span>
            <span className="font-medium text-right inline-flex items-start gap-1">
              <MapPin size={13} className="mt-0.5 shrink-0" /> {address}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground/55">When</span>
            <span className="font-medium inline-flex items-center gap-1">
              <CalendarClock size={13} />
              {timing === "now" ? "As soon as possible" : scheduledFor ? new Date(scheduledFor).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "Scheduled"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground/55">Service type</span>
            <span className="font-medium capitalize">{pricingType === "quote" ? "Request quotation" : "Fixed price"}</span>
          </div>
        </div>

        <div className="border-t border-border pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-foreground/55">Estimated cost</span>
            <span className="font-medium">{formatCurrency(estimatedCostMin)} – {formatCurrency(estimatedCostMax)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground/55">Platform fee</span>
            <span className="font-medium">{formatCurrency(platformFee)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold border-t border-border pt-2 mt-2">
            <span>Total (est.)</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        {pricingType === "quote" && (
          <p className="flex items-start gap-2 text-xs text-foreground/55 bg-surface-muted rounded-xl p-3">
            <Info size={14} className="mt-0.5 shrink-0" />
            Final pricing will be confirmed by the provider after reviewing your requirement. This is only an estimate.
          </p>
        )}
      </div>

      <Button fullWidth size="lg" className="mt-6" onClick={handleConfirm} disabled={submitting}>
        {submitting ? "Confirming..." : "Confirm Booking"}
      </Button>
    </div>
  );
}

export default function ConfirmBookingPage() {
  return (
    <Suspense>
      <ConfirmInner />
    </Suspense>
  );
}
