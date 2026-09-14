import { CheckCircle2, Circle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function VerificationLine({
  label,
  state = "verified",
}: {
  label: string;
  state?: "verified" | "pending" | "rejected";
}) {
  const icon =
    state === "verified" ? (
      <CheckCircle2 size={16} className="text-success-600" />
    ) : state === "rejected" ? (
      <XCircle size={16} className="text-danger-600" />
    ) : (
      <Circle size={16} className="text-warning-600" />
    );
  return (
    <div className="flex items-center gap-2 text-sm">
      {icon}
      <span className={cn(state === "rejected" ? "text-foreground/50 line-through" : "text-foreground/80")}>{label}</span>
    </div>
  );
}

export function ProviderVerificationBadges({
  verification,
}: {
  verification: { identityVerified: boolean; skillVerified: boolean; certificateVerified: boolean };
}) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      <VerificationLine label="Identity Verified" state={verification.identityVerified ? "verified" : "pending"} />
      <VerificationLine label="Skill Verified" state={verification.skillVerified ? "verified" : "pending"} />
      <VerificationLine label="Certificate Verified" state={verification.certificateVerified ? "verified" : "pending"} />
    </div>
  );
}
