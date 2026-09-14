import { Users, ShieldCheck, CalendarCheck, CheckCircle2, Clock, IndianRupee, Percent, MessageSquareWarning } from "lucide-react";
import { KPICard } from "@/components/ui/KPICard";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/Misc";
import {
  adminKpis,
  bookingsTrend,
  revenueTrend,
  providerGrowth,
  customerGrowth,
  categoryDemand,
  geographicActivity,
} from "@/lib/data/analytics";
import { TrendAreaChart, DualLineChart, SimpleBarChart, CategoryDonutChart } from "@/components/charts/Charts";
import { formatCurrency } from "@/lib/utils";

export default function AdminDashboardPage() {
  const k = adminKpis;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-foreground/55 text-sm mt-1">Platform performance across customers, providers and bookings.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Total Customers" value={k.totalCustomers.toLocaleString("en-IN")} icon={Users} tone="brand" trend={k.trends.totalCustomers} trendLabel="vs last month" />
        <KPICard label="Active Providers" value={String(k.activeProviders)} icon={Users} tone="brand" trend={k.trends.activeProviders} trendLabel="vs last month" />
        <KPICard label="Verified Providers" value={String(k.verifiedProviders)} icon={ShieldCheck} tone="success" trend={k.trends.verifiedProviders} trendLabel="vs last month" />
        <KPICard label="Jobs Today" value={String(k.jobsToday)} icon={CalendarCheck} tone="brand" trend={k.trends.jobsToday} trendLabel="vs yesterday" />
        <KPICard label="Jobs Completed" value={k.jobsCompleted.toLocaleString("en-IN")} icon={CheckCircle2} tone="success" trend={k.trends.jobsCompleted} trendLabel="vs last month" />
        <KPICard label="Pending Jobs" value={String(k.pendingJobs)} icon={Clock} tone="warning" trend={k.trends.pendingJobs} trendLabel="vs last week" />
        <KPICard label="Revenue (month)" value={formatCurrency(k.revenueThisMonth)} icon={IndianRupee} tone="success" trend={k.trends.revenueThisMonth} trendLabel="vs last month" />
        <KPICard label="Platform Commission" value={formatCurrency(k.platformCommission)} icon={Percent} tone="brand" trend={k.trends.platformCommission} trendLabel="vs last month" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <KPICard label="Open Complaints" value={String(k.openComplaints)} icon={MessageSquareWarning} tone="danger" trend={k.trends.openComplaints} trendLabel="vs last week" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <SectionHeader title="Bookings this week" className="mb-2" />
          <TrendAreaChart data={bookingsTrend} xKey="day" yKey="bookings" />
        </Card>
        <Card className="p-5">
          <SectionHeader title="Revenue trend" subtitle="Last 6 months" className="mb-2" />
          <TrendAreaChart data={revenueTrend} xKey="month" yKey="revenue" />
        </Card>
        <Card className="p-5">
          <SectionHeader title="Provider growth" subtitle="Total vs verified" className="mb-2" />
          <DualLineChart data={providerGrowth} xKey="month" keyA="providers" keyB="verified" labelA="Total" labelB="Verified" />
        </Card>
        <Card className="p-5">
          <SectionHeader title="Customer growth" className="mb-2" />
          <TrendAreaChart data={customerGrowth} xKey="month" yKey="customers" />
        </Card>
        <Card className="p-5">
          <SectionHeader title="Demand by category" className="mb-2" />
          <CategoryDonutChart data={categoryDemand} />
        </Card>
        <Card className="p-5">
          <SectionHeader title="Geographic activity — bookings by area" className="mb-2" />
          <SimpleBarChart data={geographicActivity} xKey="area" yKey="bookings" />
        </Card>
      </div>
    </div>
  );
}
