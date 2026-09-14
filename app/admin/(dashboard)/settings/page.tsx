"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/Misc";

const toggles = [
  { key: "autoAssign", label: "Auto-assign nearest available provider", desc: "Automatically assign the best-matched provider for fixed-price jobs." },
  { key: "emergencyMode", label: "Emergency service mode", desc: "Allow customers to request emergency dispatch platform-wide." },
  { key: "quoteRequests", label: "Allow quotation requests", desc: "Let customers request custom quotations for complex jobs." },
  { key: "businessAccounts", label: "Business / B2B accounts", desc: "Allow business customers to register fleet & multi-location accounts." },
];

export default function AdminSettingsPage() {
  const [state, setState] = useState<Record<string, boolean>>({ autoAssign: true, emergencyMode: true, quoteRequests: true, businessAccounts: true });
  const [commission, setCommission] = useState(15);

  return (
    <div className="space-y-6 max-w-3xl">
      <SectionHeader title="Platform Settings" />

      <Card className="p-5">
        <SectionHeader title="General" className="mb-3" />
        <div className="space-y-1">
          {toggles.map((t) => (
            <label key={t.key} className="flex items-center justify-between rounded-xl p-3.5 hover:bg-surface-muted">
              <div>
                <p className="text-sm font-medium">{t.label}</p>
                <p className="text-xs text-foreground/50">{t.desc}</p>
              </div>
              <input
                type="checkbox"
                checked={state[t.key]}
                onChange={(e) => setState((s) => ({ ...s, [t.key]: e.target.checked }))}
                className="w-4 h-4 accent-brand-600 shrink-0 ml-4"
              />
            </label>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <SectionHeader title="Commission & pricing" className="mb-3" />
        <label className="text-sm font-medium">Default platform commission (%)</label>
        <input
          type="range"
          min={5}
          max={25}
          value={commission}
          onChange={(e) => setCommission(Number(e.target.value))}
          className="w-full mt-2 accent-brand-600"
        />
        <p className="text-sm text-foreground/60 mt-1">Current: {commission}%</p>
      </Card>

      <Card className="p-5">
        <SectionHeader title="Launch market" className="mb-3" />
        <p className="text-sm text-foreground/70">Chennai, Tamil Nadu</p>
        <p className="text-xs text-foreground/45 mt-1">Service areas: Anna Nagar, Adyar, Velachery, Tambaram, Porur, Guindy, OMR, Ambattur</p>
      </Card>

      <Button size="lg">Save settings</Button>
    </div>
  );
}
