import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({ rating, size = 14, showValue = true }: { rating: number; size?: number; showValue?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="inline-flex items-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={cn(i <= Math.round(rating) ? "fill-warning-500 text-warning-500" : "fill-surface-muted text-border")}
          />
        ))}
      </span>
      {showValue && <span className="text-sm font-medium text-foreground">{rating.toFixed(1)}</span>}
    </span>
  );
}
