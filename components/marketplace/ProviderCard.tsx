"use client";

import { Provider } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";
import { RatingStars } from "@/components/ui/RatingStars";
import { ProviderVerificationBadges } from "@/components/ui/VerificationChecklist";
import { MatchScore } from "@/components/ui/MatchScore";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { MapPin, Briefcase, Heart } from "lucide-react";
import { useAppState } from "@/lib/store";

export function ProviderCard({
  provider,
  matchScore,
  bookHref,
  profileHref,
  showSaveButton = true,
}: {
  provider: Provider;
  matchScore?: number;
  bookHref: string;
  profileHref: string;
  showSaveButton?: boolean;
}) {
  const { savedProviderIds, toggleSavedProvider } = useAppState();
  const saved = savedProviderIds.includes(provider.id);

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow relative">
      {showSaveButton && (
        <button
          onClick={() => toggleSavedProvider(provider.id)}
          aria-label="Save provider"
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-surface-muted"
        >
          <Heart size={18} className={saved ? "fill-danger-500 text-danger-500" : "text-foreground/30"} />
        </button>
      )}

      <div className="flex gap-3">
        <Avatar initials={provider.avatar} size="lg" />
        <div className="min-w-0">
          <p className="font-semibold truncate pr-6">{provider.name}</p>
          <p className="text-sm text-foreground/60 truncate">{provider.title}</p>
          <div className="mt-1 flex items-center gap-2 flex-wrap">
            <RatingStars rating={provider.rating} />
            <span className="text-foreground/30">·</span>
            <span className="text-xs text-foreground/55 inline-flex items-center gap-1">
              <Briefcase size={12} /> {provider.yearsExperience} yrs
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <ProviderVerificationBadges verification={provider.verification} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {matchScore !== undefined && <MatchScore score={matchScore} />}
        {provider.availability === "available" && <Badge tone="success">🟢 Available Now</Badge>}
        {provider.emergencyAvailable && <Badge tone="warning">Emergency ready</Badge>}
        <Badge tone="neutral">
          <MapPin size={11} /> {provider.distanceKm} km away
        </Badge>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-foreground/50">Starting at</p>
          <p className="font-semibold">{formatCurrency(provider.startingPrice)}</p>
        </div>
        <div className="flex gap-2">
          <Button href={profileHref} variant="outline" size="sm">
            View Profile
          </Button>
          <Button href={bookHref} variant="primary" size="sm">
            Book
          </Button>
        </div>
      </div>
    </div>
  );
}
