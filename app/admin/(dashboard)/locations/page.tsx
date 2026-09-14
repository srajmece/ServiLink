"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MapPin } from "lucide-react";
import { geographicActivity } from "@/lib/data/analytics";
import { providers } from "@/lib/data/providers";
import { Table, THead, TH, TBody, TR, TD } from "@/components/ui/Table";
import { SectionHeader } from "@/components/ui/Misc";
import { SimpleBarChart } from "@/components/charts/Charts";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "areas", label: "Service Areas" },
  { key: "cities", label: "Cities" },
  { key: "coverage", label: "Provider Coverage" },
] as const;

function LocationsInner() {
  const params = useSearchParams();
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>((params.get("tab") as never) ?? "areas");

  return (
    <div className="space-y-5">
      <SectionHeader title="Locations" subtitle="Chennai, Tamil Nadu — launch city" />

      <div className="flex rounded-xl bg-surface-muted p-1 max-w-md overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn("shrink-0 flex-1 px-3.5 py-2 rounded-lg text-sm font-medium", tab === t.key ? "bg-surface shadow-sm" : "text-foreground/55")}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "areas" && (
        <>
          <Card className="p-5">
            <SectionHeader title="Bookings by service area" className="mb-2" />
            <SimpleBarChart data={geographicActivity} xKey="area" yKey="bookings" />
          </Card>
          <Table>
            <THead>
              <tr><TH>Area</TH><TH>Bookings</TH><TH>Active providers</TH></tr>
            </THead>
            <TBody>
              {geographicActivity.map((a) => (
                <TR key={a.area}>
                  <TD className="font-medium inline-flex items-center gap-1.5"><MapPin size={13} className="text-foreground/40" /> {a.area}</TD>
                  <TD>{a.bookings}</TD>
                  <TD>{a.providers}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </>
      )}

      {tab === "cities" && (
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-semibold">CH</span>
            <div>
              <p className="font-semibold">Chennai, Tamil Nadu</p>
              <p className="text-sm text-foreground/55">{geographicActivity.length} active service areas · Live</p>
            </div>
            <Badge tone="success" className="ml-auto">Active</Badge>
          </div>
          <p className="text-xs text-foreground/45 mt-4">More cities will be added as ServiLink expands beyond the MVP launch market.</p>
        </Card>
      )}

      {tab === "coverage" && (
        <Table>
          <THead>
            <tr><TH>Provider</TH><TH>Service area</TH><TH>Service radius</TH></tr>
          </THead>
          <TBody>
            {providers.map((p) => (
              <TR key={p.id}>
                <TD className="font-medium">{p.name}</TD>
                <TD className="text-foreground/60">{p.serviceArea.join(", ")}</TD>
                <TD>{p.serviceRadiusKm} km</TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}
    </div>
  );
}

export default function AdminLocationsPage() {
  return (
    <Suspense>
      <LocationsInner />
    </Suspense>
  );
}
