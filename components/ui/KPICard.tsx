import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export function KPICard({
  label,
  value,
  icon: Icon,
  trend,
  trendLabel,
  tone = "neutral",
}: {
  label: string;
  value: string;
  icon?: LucideIcon;
  trend?: number;
  trendLabel?: string;
  tone?: "neutral" | "brand" | "success" | "warning" | "danger";
}) {
  const iconTone: Record<string, string> = {
    neutral: "bg-surface-muted text-foreground/70",
    brand: "bg-brand-50 text-brand-700",
    success: "bg-success-50 text-success-600",
    warning: "bg-warning-50 text-warning-600",
    danger: "bg-danger-50 text-danger-600",
  };
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm text-foreground/60">{label}</p>
        {Icon && (
          <div className={cn("rounded-lg p-2", iconTone[tone])}>
            <Icon size={16} />
          </div>
        )}
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
      {trend !== undefined && (
        <p className={cn("mt-1 text-xs font-medium", trend >= 0 ? "text-success-600" : "text-danger-600")}>
          {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}% {trendLabel}
        </p>
      )}
    </Card>
  );
}
