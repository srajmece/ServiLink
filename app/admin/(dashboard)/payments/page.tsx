"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { transactions } from "@/lib/data/transactions";
import { getCustomer } from "@/lib/data/customers";
import { getProvider } from "@/lib/data/providers";
import { providers } from "@/lib/data/providers";
import { KPICard } from "@/components/ui/KPICard";
import { Table, THead, TH, TBody, TR, TD } from "@/components/ui/Table";
import { SectionHeader } from "@/components/ui/Misc";
import { Badge } from "@/components/ui/Badge";
import { IndianRupee, Percent, RotateCcw, Wallet } from "lucide-react";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

const tabs = [
  { key: "transactions", label: "Transactions" },
  { key: "commission", label: "Commission" },
  { key: "refunds", label: "Refunds" },
  { key: "payouts", label: "Provider Payouts" },
] as const;

function PaymentsInner() {
  const params = useSearchParams();
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>((params.get("tab") as never) ?? "transactions");

  const totalRevenue = transactions.reduce((s, t) => s + t.amount, 0);
  const totalCommission = transactions.reduce((s, t) => s + t.commission, 0);
  const totalRefunds = transactions.filter((t) => t.status === "refunded").reduce((s, t) => s + t.amount, 0);
  const totalPayouts = transactions.reduce((s, t) => s + t.providerPayout, 0);

  const refunds = transactions.filter((t) => t.status === "refunded");
  const payouts = useMemo(() => {
    return providers
      .map((p) => ({
        provider: p,
        total: transactions.filter((t) => t.providerId === p.id).reduce((s, t) => s + t.providerPayout, 0),
        pending: p.earnings.pendingPayout,
      }))
      .filter((x) => x.total > 0)
      .sort((a, b) => b.total - a.total);
  }, []);

  return (
    <div className="space-y-5">
      <SectionHeader title="Payments" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Total revenue" value={formatCurrency(totalRevenue)} icon={IndianRupee} tone="success" />
        <KPICard label="Platform commission" value={formatCurrency(totalCommission)} icon={Percent} tone="brand" />
        <KPICard label="Refunds issued" value={formatCurrency(totalRefunds)} icon={RotateCcw} tone="danger" />
        <KPICard label="Provider payouts" value={formatCurrency(totalPayouts)} icon={Wallet} tone="neutral" />
      </div>

      <div className="flex rounded-xl bg-surface-muted p-1 max-w-xl overflow-x-auto no-scrollbar">
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

      {tab === "transactions" && (
        <Table>
          <THead>
            <tr><TH>Txn ID</TH><TH>Customer</TH><TH>Provider</TH><TH>Amount</TH><TH>Method</TH><TH>Date</TH><TH>Status</TH></tr>
          </THead>
          <TBody>
            {transactions.map((t) => (
              <TR key={t.id}>
                <TD className="font-medium">{t.id.toUpperCase()}</TD>
                <TD className="text-foreground/70">{getCustomer(t.customerId)?.name}</TD>
                <TD className="text-foreground/70">{t.providerId ? getProvider(t.providerId)?.name : "—"}</TD>
                <TD>{formatCurrency(t.amount)}</TD>
                <TD className="uppercase text-foreground/60">{t.method}</TD>
                <TD className="text-foreground/60">{formatDate(t.date)}</TD>
                <TD><Badge tone={t.status === "completed" ? "success" : t.status === "refunded" ? "danger" : "warning"}>{t.status}</Badge></TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}

      {tab === "commission" && (
        <Table>
          <THead>
            <tr><TH>Txn ID</TH><TH>Provider</TH><TH>Amount</TH><TH>Commission rate</TH><TH>Commission earned</TH></tr>
          </THead>
          <TBody>
            {transactions.map((t) => {
              const provider = t.providerId ? getProvider(t.providerId) : null;
              return (
                <TR key={t.id}>
                  <TD className="font-medium">{t.id.toUpperCase()}</TD>
                  <TD className="text-foreground/70">{provider?.name ?? "—"}</TD>
                  <TD>{formatCurrency(t.amount)}</TD>
                  <TD>{provider?.earnings.commissionRate ?? 15}%</TD>
                  <TD className="font-medium">{formatCurrency(t.commission)}</TD>
                </TR>
              );
            })}
          </TBody>
        </Table>
      )}

      {tab === "refunds" && (
        <Table>
          <THead>
            <tr><TH>Txn ID</TH><TH>Customer</TH><TH>Amount refunded</TH><TH>Date</TH></tr>
          </THead>
          <TBody>
            {refunds.length === 0 ? (
              <TR><TD className="text-foreground/50" colSpan={4}>No refunds issued.</TD></TR>
            ) : (
              refunds.map((t) => (
                <TR key={t.id}>
                  <TD className="font-medium">{t.id.toUpperCase()}</TD>
                  <TD className="text-foreground/70">{getCustomer(t.customerId)?.name}</TD>
                  <TD>{formatCurrency(t.amount)}</TD>
                  <TD className="text-foreground/60">{formatDate(t.date)}</TD>
                </TR>
              ))
            )}
          </TBody>
        </Table>
      )}

      {tab === "payouts" && (
        <Table>
          <THead>
            <tr><TH>Provider</TH><TH>Total paid out</TH><TH>Pending payout</TH><TH>Status</TH></tr>
          </THead>
          <TBody>
            {payouts.map((p) => (
              <TR key={p.provider.id}>
                <TD className="font-medium">{p.provider.name}</TD>
                <TD>{formatCurrency(p.total)}</TD>
                <TD>{formatCurrency(p.pending)}</TD>
                <TD><Badge tone={p.pending > 0 ? "warning" : "success"}>{p.pending > 0 ? "Pending" : "Settled"}</Badge></TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}
    </div>
  );
}

export default function AdminPaymentsPage() {
  return (
    <Suspense>
      <PaymentsInner />
    </Suspense>
  );
}
