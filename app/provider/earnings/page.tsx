"use client";

import { Wallet, IndianRupee, TrendingUp, Percent, Clock } from "lucide-react";
import { getProvider } from "@/lib/data/providers";
import { transactionsForProvider } from "@/lib/data/transactions";
import { KPICard } from "@/components/ui/KPICard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SimpleBarChart } from "@/components/charts/Charts";
import { SectionHeader } from "@/components/ui/Misc";
import { Table, THead, TH, TBody, TR, TD } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDate } from "@/lib/utils";

const CURRENT_PROVIDER_ID = "p1";

const weeklyEarnings = [
  { day: "Mon", amount: 1800 },
  { day: "Tue", amount: 2200 },
  { day: "Wed", amount: 1500 },
  { day: "Thu", amount: 2900 },
  { day: "Fri", amount: 3100 },
  { day: "Sat", amount: 2400 },
  { day: "Sun", amount: 2400 },
];

export default function ProviderEarningsPage() {
  const provider = getProvider(CURRENT_PROVIDER_ID)!;
  const transactions = transactionsForProvider(provider.id);
  const netMonth = Math.round(provider.earnings.month * (1 - provider.earnings.commissionRate / 100));

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Earnings</h1>
          <p className="text-foreground/55 text-sm mt-1">Track your income and payouts.</p>
        </div>
        <Button variant="outline">Withdraw balance</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KPICard label="Today" value={formatCurrency(provider.earnings.today)} icon={IndianRupee} tone="brand" />
        <KPICard label="This week" value={formatCurrency(provider.earnings.week)} icon={TrendingUp} tone="success" />
        <KPICard label="This month" value={formatCurrency(provider.earnings.month)} icon={Wallet} tone="brand" />
        <KPICard label="Withdrawable balance" value={formatCurrency(provider.earnings.withdrawable)} icon={IndianRupee} tone="success" />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-sm text-foreground/60">Completed jobs</p>
          <p className="text-2xl font-semibold mt-1">{provider.completedJobs}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-foreground/60 inline-flex items-center gap-1.5"><Percent size={13} /> Platform commission</p>
          <p className="text-2xl font-semibold mt-1">{provider.earnings.commissionRate}%</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-foreground/60 inline-flex items-center gap-1.5"><Clock size={13} /> Pending payout</p>
          <p className="text-2xl font-semibold mt-1">{formatCurrency(provider.earnings.pendingPayout)}</p>
        </Card>
      </div>

      <Card className="p-5">
        <SectionHeader title="This week's earnings" subtitle={`Net after commission ≈ ${formatCurrency(netMonth)} this month`} className="mb-2" />
        <SimpleBarChart data={weeklyEarnings} xKey="day" yKey="amount" />
      </Card>

      <div>
        <SectionHeader title="Transaction history" />
        <Table>
          <THead>
            <tr>
              <TH>Booking</TH>
              <TH>Date</TH>
              <TH>Amount</TH>
              <TH>Commission</TH>
              <TH>Payout</TH>
              <TH>Status</TH>
            </tr>
          </THead>
          <TBody>
            {transactions.map((t) => (
              <TR key={t.id}>
                <TD className="font-medium">#{t.bookingId.slice(-6).toUpperCase()}</TD>
                <TD>{formatDate(t.date)}</TD>
                <TD>{formatCurrency(t.amount)}</TD>
                <TD>{formatCurrency(t.commission)}</TD>
                <TD className="font-medium">{formatCurrency(t.providerPayout)}</TD>
                <TD>
                  <Badge tone={t.status === "completed" ? "success" : t.status === "refunded" ? "danger" : "warning"}>{t.status}</Badge>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </div>
    </div>
  );
}
