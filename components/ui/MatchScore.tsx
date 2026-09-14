import { cn } from "@/lib/utils";

export function MatchScore({ score, className }: { score: number; className?: string }) {
  const tone = score >= 90 ? "text-success-600 bg-success-50" : score >= 75 ? "text-brand-700 bg-brand-50" : "text-warning-600 bg-warning-50";
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold", tone, className)}>
      {score}% Match
    </span>
  );
}
