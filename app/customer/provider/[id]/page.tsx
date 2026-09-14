"use client";

import { useParams, useRouter } from "next/navigation";
import { MapPin, Briefcase, Languages, Clock, ShieldCheck, ArrowLeft, Heart, MessageSquare } from "lucide-react";
import { getProvider } from "@/lib/data/providers";
import { reviewsForProvider } from "@/lib/data/reviews";
import { Avatar } from "@/components/ui/Avatar";
import { RatingStars } from "@/components/ui/RatingStars";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { VerificationLine } from "@/components/ui/VerificationChecklist";
import { SectionHeader, EmptyState } from "@/components/ui/Misc";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useAppState } from "@/lib/store";

export default function ProviderProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const provider = getProvider(id);
  const { savedProviderIds, toggleSavedProvider } = useAppState();

  if (!provider) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState title="Provider not found" description="This provider profile is not available." />
      </div>
    );
  }

  const reviews = reviewsForProvider(provider.id);
  const saved = savedProviderIds.includes(provider.id);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-8 pb-28">
      <button onClick={() => router.back()} className="inline-flex items-center gap-1 text-sm text-foreground/55 mb-4">
        <ArrowLeft size={15} /> Back
      </button>

      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <Avatar initials={provider.avatar} size="xl" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h1 className="text-xl font-semibold">{provider.name}</h1>
                <p className="text-foreground/60 text-sm">{provider.title}</p>
              </div>
              <button onClick={() => toggleSavedProvider(provider.id)} className="p-2 rounded-full hover:bg-surface-muted shrink-0" aria-label="Save">
                <Heart size={20} className={saved ? "fill-danger-500 text-danger-500" : "text-foreground/30"} />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
              <RatingStars rating={provider.rating} />
              <span className="text-foreground/55">{provider.completedJobs} completed jobs</span>
              <span className="inline-flex items-center gap-1 text-foreground/55">
                <Briefcase size={13} /> {provider.yearsExperience} years experience
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1.5 border-t border-border pt-4">
          <VerificationLine label="Identity Verified" state={provider.verification.identityVerified ? "verified" : "pending"} />
          <VerificationLine label="Skill Verified" state={provider.verification.skillVerified ? "verified" : "pending"} />
          <VerificationLine label="Certificate Verified" state={provider.verification.certificateVerified ? "verified" : "pending"} />
          <VerificationLine label="Experience Verified" state={provider.verification.experienceVerified ? "verified" : "pending"} />
        </div>

        <p className="text-sm text-foreground/70 mt-4">{provider.bio}</p>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="rounded-xl bg-surface-muted p-3">
            <p className="font-semibold">{formatCurrency(provider.startingPrice)}</p>
            <p className="text-[11px] text-foreground/55">Starting price</p>
          </div>
          <div className="rounded-xl bg-surface-muted p-3">
            <p className="font-semibold">{provider.distanceKm} km</p>
            <p className="text-[11px] text-foreground/55">Distance</p>
          </div>
          <div className="rounded-xl bg-surface-muted p-3">
            <p className="font-semibold capitalize">{provider.availability.replace("_", " ")}</p>
            <p className="text-[11px] text-foreground/55">Availability</p>
          </div>
          <div className="rounded-xl bg-surface-muted p-3">
            <p className="font-semibold">{provider.serviceRadiusKm} km</p>
            <p className="text-[11px] text-foreground/55">Service radius</p>
          </div>
        </div>

        <div className="mt-5 hidden sm:flex gap-3">
          <Button href={`/customer/booking/confirm?providerId=${provider.id}`} size="lg" className="flex-1">
            Book Now
          </Button>
          <Button href={`/customer/booking/confirm?providerId=${provider.id}&type=quote`} variant="outline" size="lg" className="flex-1">
            Request Quote
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <SectionHeader title="Skills" className="mb-3" />
        <div className="flex flex-wrap gap-2">
          {provider.skills.map((s) => (
            <Badge key={s} tone="brand">{s}</Badge>
          ))}
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-6">
        <div>
          <SectionHeader title="Service area" className="mb-3" />
          <div className="flex flex-wrap gap-2">
            {provider.serviceArea.map((a) => (
              <span key={a} className="inline-flex items-center gap-1 text-xs bg-surface-muted rounded-full px-2.5 py-1">
                <MapPin size={11} /> {a}
              </span>
            ))}
          </div>
        </div>
        <div>
          <SectionHeader title="Languages" className="mb-3" />
          <div className="flex flex-wrap gap-2">
            {provider.languages.map((l) => (
              <span key={l} className="inline-flex items-center gap-1 text-xs bg-surface-muted rounded-full px-2.5 py-1">
                <Languages size={11} /> {l}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <SectionHeader title="Availability" className="mb-3" />
        <p className="inline-flex items-center gap-1.5 text-sm text-foreground/70">
          <Clock size={14} /> {provider.workingHours}
        </p>
      </div>

      <div className="mt-6">
        <SectionHeader title="Certifications" className="mb-3" />
        {provider.certifications.length === 0 ? (
          <p className="text-sm text-foreground/50">No certifications uploaded yet.</p>
        ) : (
          <div className="space-y-2">
            {provider.certifications.map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-xl border border-border bg-surface p-3">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={16} className="text-brand-600" />
                  <div>
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-foreground/50">{c.issuer} · {c.year}</p>
                  </div>
                </div>
                <Badge tone={c.status === "verified" ? "success" : c.status === "rejected" ? "danger" : "warning"}>{c.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </div>

      {provider.portfolio.length > 0 && (
        <div className="mt-6">
          <SectionHeader title="Portfolio" className="mb-3" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {provider.portfolio.map((w) => (
              <div key={w.id} className="rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 border border-border aspect-square flex items-end p-2.5">
                <p className="text-[11px] font-medium text-brand-800 leading-tight">{w.caption}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <SectionHeader title={`Customer reviews (${reviews.length})`} className="mb-3" />
        {reviews.length === 0 ? (
          <p className="text-sm text-foreground/50">No reviews yet.</p>
        ) : (
          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-xl border border-border bg-surface p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{r.customerName}</p>
                  <RatingStars rating={r.rating} size={12} />
                </div>
                <p className="text-sm text-foreground/65 mt-1.5">{r.comment}</p>
                <p className="text-xs text-foreground/40 mt-1.5">{formatDate(r.date)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-16 sm:bottom-0 inset-x-0 sm:static bg-surface border-t border-border sm:border-0 sm:bg-transparent p-4 sm:p-0 sm:mt-8 flex gap-3 z-30">
        <Button href={`/customer/booking/confirm?providerId=${provider.id}`} size="lg" className="flex-1 sm:hidden">
          Book Now
        </Button>
        <Button href={`/customer/booking/confirm?providerId=${provider.id}&type=quote`} variant="outline" size="lg" className="flex-1 sm:hidden">
          <MessageSquare size={16} /> Quote
        </Button>
      </div>
    </div>
  );
}
