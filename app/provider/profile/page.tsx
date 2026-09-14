"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Wrench, MapPin, Clock, Siren, ChevronRight, Plus, LogOut } from "lucide-react";
import { getProvider } from "@/lib/data/providers";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";
import { SectionHeader } from "@/components/ui/Misc";

const CURRENT_PROVIDER_ID = "p1";

export default function ProviderProfilePage() {
  const provider = getProvider(CURRENT_PROVIDER_ID)!;
  const [emergency, setEmergency] = useState(provider.emergencyAvailable);

  const allVerified = Object.values(provider.verification).every(Boolean);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <Card className="p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <Avatar initials={provider.avatar} size="xl" />
          <div className="flex-1">
            <h1 className="text-xl font-semibold">{provider.name}</h1>
            <p className="text-foreground/60 text-sm">{provider.title}</p>
            <div className="mt-1.5"><RatingStars rating={provider.rating} /></div>
          </div>
          <Button variant="outline" size="sm">Edit</Button>
        </div>

        <Link href="/provider/verification" className="mt-4 flex items-center justify-between rounded-xl border border-border p-3.5 hover:bg-surface-muted">
          <span className="inline-flex items-center gap-2 text-sm font-medium">
            <ShieldCheck size={16} className={allVerified ? "text-success-600" : "text-warning-600"} />
            {allVerified ? "Fully verified" : "Verification in progress"}
          </span>
          <ChevronRight size={16} className="text-foreground/30" />
        </Link>
      </Card>

      <Card className="p-5">
        <SectionHeader title="Personal information" className="mb-3" />
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div><p className="text-foreground/50 text-xs">Phone</p><p className="font-medium mt-0.5">{provider.phone}</p></div>
          <div><p className="text-foreground/50 text-xs">City</p><p className="font-medium mt-0.5">{provider.city}</p></div>
          <div><p className="text-foreground/50 text-xs">Languages</p><p className="font-medium mt-0.5">{provider.languages.join(", ")}</p></div>
          <div><p className="text-foreground/50 text-xs">Joined</p><p className="font-medium mt-0.5">{new Date(provider.joinedDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</p></div>
        </div>
      </Card>

      <Card className="p-5">
        <SectionHeader title="Professional information" className="mb-3" />
        <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
          <div><p className="text-foreground/50 text-xs">Experience</p><p className="font-medium mt-0.5">{provider.yearsExperience} years</p></div>
          <div><p className="text-foreground/50 text-xs inline-flex items-center gap-1"><MapPin size={11} /> Service radius</p><p className="font-medium mt-0.5">{provider.serviceRadiusKm} km</p></div>
          <div><p className="text-foreground/50 text-xs inline-flex items-center gap-1"><Clock size={11} /> Working hours</p><p className="font-medium mt-0.5">{provider.workingHours}</p></div>
          <div><p className="text-foreground/50 text-xs">Service area</p><p className="font-medium mt-0.5">{provider.serviceArea.join(", ")}</p></div>
        </div>
        <label className="flex items-center justify-between rounded-xl border border-border p-3.5">
          <span className="inline-flex items-center gap-2 text-sm font-medium"><Siren size={15} className="text-danger-500" /> Available for emergency jobs</span>
          <input type="checkbox" checked={emergency} onChange={(e) => setEmergency(e.target.checked)} className="w-4 h-4 accent-brand-600" />
        </label>
        <Link href="/provider/skills" className="mt-3 flex items-center justify-between rounded-xl border border-border p-3.5 hover:bg-surface-muted">
          <span className="inline-flex items-center gap-2 text-sm font-medium"><Wrench size={15} className="text-brand-600" /> Skills & Certificates</span>
          <ChevronRight size={16} className="text-foreground/30" />
        </Link>
      </Card>

      <Card className="p-5">
        <SectionHeader
          title="Portfolio"
          action={<Button size="sm" variant="outline"><Plus size={13} /> Add photo</Button>}
          className="mb-3"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {provider.portfolio.map((w) => (
            <div key={w.id} className="rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 border border-border aspect-square flex items-end p-2.5">
              <p className="text-[11px] font-medium text-brand-800 leading-tight">{w.caption}</p>
            </div>
          ))}
        </div>
      </Card>

      <Badge tone="neutral" className="w-full justify-center py-2">Categories: {provider.categories.join(", ")}</Badge>

      <Button variant="outline" className="text-danger-600 w-full">
        <LogOut size={14} /> Log out
      </Button>
    </div>
  );
}
