"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { useBookingDraft } from "@/lib/bookingDraft";
import { getCategory } from "@/lib/data/categories";
import { providersForCategory } from "@/lib/data/providers";
import { computeMatchScore } from "@/lib/match";
import { StepProgress } from "@/components/ui/Misc";
import { ProviderCard } from "@/components/marketplace/ProviderCard";
import { cn } from "@/lib/utils";

type SortKey = "match" | "distance" | "rating" | "price" | "experience";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "match", label: "Best Match" },
  { key: "distance", label: "Distance" },
  { key: "rating", label: "Rating" },
  { key: "price", label: "Price" },
  { key: "experience", label: "Experience" },
];

export default function MatchingStep() {
  const router = useRouter();
  const { draft } = useBookingDraft();
  const [sort, setSort] = useState<SortKey>("match");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [emergencyOnly, setEmergencyOnly] = useState(false);

  useEffect(() => {
    if (!draft.categoryId || !draft.addressText) router.replace("/customer/request/category");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const category = draft.categoryId ? getCategory(draft.categoryId) : null;

  const providers = useMemo(() => {
    if (!draft.categoryId) return [];
    let list = providersForCategory(draft.categoryId).map((p) => ({ p, score: computeMatchScore(p, draft.requiredSkills) }));
    if (availableOnly) list = list.filter((x) => x.p.availability === "available");
    if (emergencyOnly) list = list.filter((x) => x.p.emergencyAvailable);

    list.sort((a, b) => {
      switch (sort) {
        case "distance":
          return a.p.distanceKm - b.p.distanceKm;
        case "rating":
          return b.p.rating - a.p.rating;
        case "price":
          return a.p.startingPrice - b.p.startingPrice;
        case "experience":
          return b.p.yearsExperience - a.p.yearsExperience;
        default:
          return b.score - a.score;
      }
    });
    return list;
  }, [draft.categoryId, draft.requiredSkills, sort, availableOnly, emergencyOnly]);

  const bookHrefFor = (providerId: string) => `/customer/booking/confirm?providerId=${providerId}`;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-8">
      <button onClick={() => router.back()} className="inline-flex items-center gap-1 text-sm text-foreground/55 mb-4">
        <ArrowLeft size={15} /> Back
      </button>
      <StepProgress step={4} total={4} />

      <div className="mt-4 flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
            {providers.length} verified {category?.name.toLowerCase()} technicians found near you
          </h1>
          <p className="text-foreground/55 text-sm mt-1">
            {draft.problemLabel} · {draft.pricingType === "quote" ? "Request quotation" : "Fixed-price service"} ·{" "}
            {draft.timing === "now" ? "Now" : "Scheduled"}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground/50 shrink-0">
          <SlidersHorizontal size={13} /> Sort
        </span>
        {sortOptions.map((s) => (
          <button
            key={s.key}
            onClick={() => setSort(s.key)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors",
              sort === s.key ? "border-brand-600 bg-brand-50 text-brand-700" : "border-border bg-surface text-foreground/60 hover:bg-surface-muted",
            )}
          >
            {s.label}
          </button>
        ))}
        <span className="w-px h-4 bg-border shrink-0 mx-1" />
        <button
          onClick={() => setAvailableOnly((v) => !v)}
          className={cn(
            "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors",
            availableOnly ? "border-success-500 bg-success-50 text-success-600" : "border-border bg-surface text-foreground/60 hover:bg-surface-muted",
          )}
        >
          🟢 Available Now
        </button>
        <button
          onClick={() => setEmergencyOnly((v) => !v)}
          className={cn(
            "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors",
            emergencyOnly ? "border-warning-500 bg-warning-50 text-warning-600" : "border-border bg-surface text-foreground/60 hover:bg-surface-muted",
          )}
        >
          Emergency ready
        </button>
      </div>

      <div className="mt-5 grid sm:grid-cols-2 gap-4">
        {providers.map(({ p, score }) => (
          <ProviderCard
            key={p.id}
            provider={p}
            matchScore={score}
            profileHref={`/customer/provider/${p.id}`}
            bookHref={bookHrefFor(p.id)}
          />
        ))}
      </div>

      {providers.length === 0 && (
        <p className="text-center text-foreground/55 mt-10 text-sm">No providers match these filters right now. Try adjusting them.</p>
      )}
    </div>
  );
}
