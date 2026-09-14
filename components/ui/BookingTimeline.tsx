import { CheckCircle2, Circle, XCircle } from "lucide-react";
import { BookingStatusEvent, BookingStatus } from "@/lib/types";
import { formatTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function BookingTimeline({
  timeline,
  currentStatus,
}: {
  timeline: BookingStatusEvent[];
  currentStatus: BookingStatus;
}) {
  const isTerminalIssue = currentStatus === "cancelled" || currentStatus === "disputed";

  return (
    <div className="relative pl-1">
      {timeline.map((step, i) => {
        const isLast = i === timeline.length - 1;
        const activeNow = step.done && (i === timeline.length - 1 || !timeline[i + 1]?.done);
        return (
          <div key={step.status} className="relative flex gap-3 pb-6 last:pb-0">
            {!isLast && (
              <span
                className={cn(
                  "absolute left-[9px] top-6 w-0.5 h-full -translate-x-1/2",
                  step.done ? "bg-brand-500" : "bg-border",
                )}
              />
            )}
            <span className="relative z-10 shrink-0">
              {step.done ? (
                <CheckCircle2 size={20} className={cn(activeNow && !isTerminalIssue ? "text-brand-600" : "text-success-600")} />
              ) : (
                <Circle size={20} className="text-border" />
              )}
            </span>
            <div className="pt-0.5">
              <p className={cn("text-sm font-medium", step.done ? "text-foreground" : "text-foreground/40")}>{step.label}</p>
              {step.done && <p className="text-xs text-foreground/50">{formatTime(step.timestamp)}</p>}
            </div>
          </div>
        );
      })}
      {isTerminalIssue && (
        <div className="relative flex gap-3">
          <span className="relative z-10 shrink-0">
            <XCircle size={20} className="text-danger-600" />
          </span>
          <div className="pt-0.5">
            <p className="text-sm font-medium text-danger-600">
              {currentStatus === "cancelled" ? "Booking Cancelled" : "Marked as Disputed"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function BookingTimelineHorizontal({ timeline }: { timeline: BookingStatusEvent[] }) {
  return (
    <div className="flex items-center overflow-x-auto no-scrollbar gap-0 -mx-1 px-1">
      {timeline.map((step, i) => (
        <div key={step.status} className="flex items-center shrink-0">
          <div className="flex flex-col items-center gap-1.5 w-24">
            <span
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold",
                step.done ? "bg-brand-600 text-white" : "bg-surface-muted text-foreground/40",
              )}
            >
              {i + 1}
            </span>
            <span className={cn("text-[11px] text-center leading-tight", step.done ? "text-foreground font-medium" : "text-foreground/40")}>
              {step.label}
            </span>
          </div>
          {i < timeline.length - 1 && (
            <span className={cn("h-0.5 w-8 -mt-5", timeline[i + 1].done ? "bg-brand-600" : "bg-border")} />
          )}
        </div>
      ))}
    </div>
  );
}
