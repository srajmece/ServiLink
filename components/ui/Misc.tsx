import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-4 mb-4", className)}>
      <div>
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-foreground/55 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6 rounded-2xl border border-dashed border-border bg-surface-muted/40">
      {Icon && (
        <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mb-3">
          <Icon size={22} className="text-foreground/40" />
        </div>
      )}
      <p className="font-medium">{title}</p>
      {description && <p className="text-sm text-foreground/55 mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function StepProgress({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn("h-1.5 rounded-full flex-1 transition-colors", i < step ? "bg-brand-600" : "bg-border")}
        />
      ))}
    </div>
  );
}

export function Chip({
  selected,
  onClick,
  children,
}: {
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-2.5 rounded-xl border text-sm font-medium text-left transition-colors",
        selected ? "border-brand-600 bg-brand-50 text-brand-700" : "border-border bg-surface hover:bg-surface-muted",
      )}
    >
      {children}
    </button>
  );
}
