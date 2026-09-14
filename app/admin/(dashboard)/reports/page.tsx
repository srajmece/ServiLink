"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  revenueTrend,
  bookingsTrend,
  providerGrowth,
  customerGrowth,
  categoryDemand,
} from "@/lib/data/analytics";
import { TrendAreaChart, DualLineChart, SimpleBarChart, CategoryDonutChart } from "@/components/charts/Charts";
import { SectionHeader } from "@/components/ui/Misc";
import { Card } from "@/components/ui/Card";
import { KPICard } from "@/components/ui/KPICard";
import { formatCurrency, cn } from "@/lib/utils";
import { IndianRupee, CalendarCheck, Users, UserPlus } from "lucide-react";

const tabs = [
  { key: "revenue", label: "Revenue" },
  { key: "bookings", label: "Bookings" },
  { key: "providers", label: "Providers" },
  { key: "customers", label: "Customers" },
  { key: "demand", label: "Service Demand" },
] as const;

function ReportsInner() {
  const params = useSearchParams();
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>((params.get("tab") as never) ?? "revenue");

  return (
    <div className="space-y-5">
      <SectionHeader title="Reports & Analytics" subtitle="Last 6 months" />

      <div className="flex rounded-xl bg-surface-muted p-1 max-w-2xl overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn("shrink-0 px-4 py-2 rounded-lg text-sm font-medium", tab === t.key ? "bg-surface shadow-sm" : "text-foreground/55")}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "revenue" && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <KPICard label="Revenue (6mo)" value={formatCurrency(revenueTrend.reduce((s, r) => s + r.revenue, 0))} icon={IndianRupee} tone="success" />
            <KPICard label="Commission (6mo)" value={formatCurrency(revenueTrend.reduce((s, r) => s + r.commission, 0))} icon={IndianRupee} tone="brand" />
            <KPICard label="Avg. monthly revenue" value={formatCurrency(Math.round(revenueTrend.reduce((s, r) => s + r.revenue, 0) / revenueTrend.length))} icon={IndianRupee} tone="neutral" />
          </div>
          <Card className="p-5"><SectionHeader title="Revenue over time" className="mb-2" /><TrendAreaChart data={revenueTrend} xKey="month" yKey="revenue" /></Card>
        </>
      )}

      {tab === "bookings" && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <KPICard label="Bookings this week" value={String(bookingsTrend.reduce((s, b) => s + b.bookings, 0))} icon={CalendarCheck} tone="brand" />
            <KPICard label="Busiest day" value={bookingsTrend.reduce((a, b) => (b.bookings > a.bookings ? b : a)).day} icon={CalendarCheck} tone="success" />
          </div>
          <Card className="p-5"><SectionHeader title="Bookings over time" className="mb-2" /><TrendAreaChart data={bookingsTrend} xKey="day" yKey="bookings" /></Card>
        </>
      )}

      {tab === "providers" && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <KPICard label="Total providers" value={String(providerGrowth[providerGrowth.length - 1].providers)} icon={Users} tone="brand" />
            <KPICard label="Verified providers" value={String(providerGrowth[providerGrowth.length - 1].verified)} icon={Users} tone="success" />
          </div>
          <Card className="p-5">
            <SectionHeader title="Provider growth" subtitle="Total vs verified" className="mb-2" />
            <DualLineChart data={providerGrowth} xKey="month" keyA="providers" keyB="verified" labelA="Total" labelB="Verified" />
          </Card>
        </>
      )}

      {tab === "customers" && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <KPICard label="Total customers" value={customerGrowth[customerGrowth.length - 1].customers.toLocaleString("en-IN")} icon={UserPlus} tone="brand" />
          </div>
          <Card className="p-5"><SectionHeader title="Customer growth" className="mb-2" /><TrendAreaChart data={customerGrowth} xKey="month" yKey="customers" /></Card>
        </>
      )}

      {tab === "demand" && (
        <Card className="p-5">
          <SectionHeader title="Demand by service category" className="mb-2" />
          <div className="grid sm:grid-cols-2 gap-6 items-center">
            <CategoryDonutChart data={categoryDemand} />
            <SimpleBarChart data={categoryDemand} xKey="category" yKey="value" />
          </div>
        </Card>
      )}
    </div>
  );
}

export default function AdminReportsPage() {
  return (
    <Suspense>
      <ReportsInner />
    </Suspense>
  );
}
