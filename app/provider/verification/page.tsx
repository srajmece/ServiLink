"use client";

import { useState } from "react";
import { Smartphone, IdCard, Wrench, FileCheck2, BriefcaseBusiness, Upload, ShieldCheck } from "lucide-react";
import { getProvider } from "@/lib/data/providers";
import { SectionHeader } from "@/components/ui/Misc";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils";

const CURRENT_PROVIDER_ID = "p1";

function StatusRow({ icon: Icon, label, verified, note }: { icon: React.ComponentType<{ size?: number; className?: string }>; label: string; verified: boolean; note?: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border p-4">
      <div className="flex items-center gap-3">
        <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${verified ? "bg-success-50 text-success-600" : "bg-warning-50 text-warning-600"}`}>
          <Icon size={16} />
        </span>
        <div>
          <p className="text-sm font-medium">{label}</p>
          {note && <p className="text-xs text-foreground/50">{note}</p>}
        </div>
      </div>
      <Badge tone={verified ? "success" : "warning"}>{verified ? "🟢 Verified" : "🟡 Pending"}</Badge>
    </div>
  );
}

export default function ProviderVerificationPage() {
  const provider = getProvider(CURRENT_PROVIDER_ID)!;
  const [extraCerts, setExtraCerts] = useState<{ name: string }[]>([]);

  const allVerified = Object.values(provider.verification).every(Boolean);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Verification Centre</h1>
          <p className="text-foreground/55 text-sm mt-1">Complete verification to accept jobs on ServiLink.</p>
        </div>
        <Badge tone={allVerified ? "success" : "warning"} className="text-sm px-3 py-1.5">
          <ShieldCheck size={14} /> {allVerified ? "Fully Verified" : "Verification In Progress"}
        </Badge>
      </div>

      <Card className="mt-6 p-5 space-y-3">
        <SectionHeader title="Identity" />
        <StatusRow icon={Smartphone} label="Mobile Verified" verified={provider.verification.mobileVerified} note={provider.phone} />
        <StatusRow icon={IdCard} label="Identity Verified" verified={provider.verification.identityVerified} note="Government ID checked" />
      </Card>

      <Card className="mt-4 p-5 space-y-3">
        <SectionHeader title="Skills" />
        <StatusRow
          icon={Wrench}
          label={`${provider.categories.length > 1 ? "Multiple skills" : "Skill"} verified`}
          verified={provider.verification.skillVerified}
          note={provider.skills.join(", ")}
        />
      </Card>

      <Card className="mt-4 p-5 space-y-3">
        <SectionHeader
          title="Certificates"
          action={
            <Button size="sm" variant="outline" onClick={() => setExtraCerts((c) => [...c, { name: `Additional Certificate ${c.length + 1}` }])}>
              <Upload size={13} /> Upload
            </Button>
          }
        />
        {provider.certifications.map((c) => (
          <div key={c.id} className="flex items-center justify-between rounded-xl border border-border p-4">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center">
                <FileCheck2 size={16} />
              </span>
              <div>
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-foreground/50">{c.issuer} · {c.year}</p>
              </div>
            </div>
            <Badge tone={c.status === "verified" ? "success" : c.status === "rejected" ? "danger" : "warning"}>
              {c.status === "verified" ? "🟢" : c.status === "rejected" ? "🔴" : "🟡"} {c.status}
            </Badge>
          </div>
        ))}
        {extraCerts.map((c, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border border-border p-4">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center">
                <FileCheck2 size={16} />
              </span>
              <p className="text-sm font-medium">{c.name}</p>
            </div>
            <Badge tone="warning">🟡 Pending review</Badge>
          </div>
        ))}
      </Card>

      <Card className="mt-4 p-5 space-y-3">
        <SectionHeader title="Experience" />
        <StatusRow
          icon={BriefcaseBusiness}
          label="Experience Verified"
          verified={provider.verification.experienceVerified}
          note={`${provider.yearsExperience} years · joined ${formatDate(provider.joinedDate)}`}
        />
      </Card>
    </div>
  );
}
