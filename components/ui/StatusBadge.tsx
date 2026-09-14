import { Badge } from "@/components/ui/Badge";
import { BookingStatus, VerificationStatus } from "@/lib/types";

const bookingStatusMap: Record<BookingStatus, { label: string; tone: "neutral" | "brand" | "success" | "warning" | "danger" | "info" }> = {
  requested: { label: "Pending", tone: "warning" },
  provider_assigned: { label: "Accepted", tone: "info" },
  travelling: { label: "On the way", tone: "info" },
  arrived: { label: "Arrived", tone: "brand" },
  in_progress: { label: "In Progress", tone: "brand" },
  completed: { label: "Completed", tone: "success" },
  cancelled: { label: "Cancelled", tone: "neutral" },
  disputed: { label: "Disputed", tone: "danger" },
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const s = bookingStatusMap[status];
  return <Badge tone={s.tone}>{s.label}</Badge>;
}

const verificationMap: Record<VerificationStatus, { label: string; tone: "success" | "warning" | "danger" | "neutral"; dot: string }> = {
  verified: { label: "Verified", tone: "success", dot: "🟢" },
  pending: { label: "Pending", tone: "warning", dot: "🟡" },
  rejected: { label: "Rejected", tone: "danger", dot: "🔴" },
  suspended: { label: "Suspended", tone: "neutral", dot: "⚫" },
};

export function VerificationStatusBadge({ status }: { status: VerificationStatus }) {
  const s = verificationMap[status];
  return (
    <Badge tone={s.tone}>
      <span aria-hidden>{s.dot}</span> {s.label}
    </Badge>
  );
}
