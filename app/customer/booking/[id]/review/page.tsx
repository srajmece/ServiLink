"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Star, ArrowLeft } from "lucide-react";
import { useAppState } from "@/lib/store";
import { getProvider } from "@/lib/data/providers";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Misc";
import { cn } from "@/lib/utils";

export default function ReviewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { allBookings, rateBooking } = useAppState();
  const booking = allBookings.find((b) => b.id === id);
  const [rating, setRating] = useState(booking?.rating ?? 5);
  const [comment, setComment] = useState(booking?.reviewComment ?? "");
  const [submitted, setSubmitted] = useState(false);

  if (!booking) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <EmptyState title="Booking not found" />
      </div>
    );
  }

  const provider = booking.providerId ? getProvider(booking.providerId) : null;

  function handleSubmit() {
    rateBooking(booking!.id, rating, comment);
    setSubmitted(true);
    setTimeout(() => router.push("/customer/bookings"), 1000);
  }

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 py-6 sm:py-8">
      <button onClick={() => router.back()} className="inline-flex items-center gap-1 text-sm text-foreground/55 mb-4">
        <ArrowLeft size={15} /> Back
      </button>
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Rate your service</h1>
      <p className="text-foreground/55 text-sm mt-1">{booking.problem}</p>

      {provider && (
        <div className="mt-5 flex items-center gap-3">
          <Avatar initials={provider.avatar} size="lg" />
          <div>
            <p className="font-medium">{provider.name}</p>
            <p className="text-sm text-foreground/55">{provider.title}</p>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-center gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <button key={i} onClick={() => setRating(i)} aria-label={`Rate ${i} stars`}>
            <Star size={34} className={cn(i <= rating ? "fill-warning-500 text-warning-500" : "fill-surface-muted text-border")} />
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        placeholder="Share details about your experience..."
        className="mt-6 w-full rounded-xl border border-border px-3.5 py-3 text-sm outline-none focus:border-brand-500 resize-none"
      />

      <Button fullWidth size="lg" className="mt-6" onClick={handleSubmit} disabled={submitted}>
        {submitted ? "Thank you for your feedback!" : "Submit Review"}
      </Button>
    </div>
  );
}
