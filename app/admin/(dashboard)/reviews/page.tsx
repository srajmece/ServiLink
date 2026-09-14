"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Flag } from "lucide-react";
import { reviews } from "@/lib/data/reviews";
import { getProvider } from "@/lib/data/providers";
import { RatingStars } from "@/components/ui/RatingStars";
import { Table, THead, TH, TBody, TR, TD } from "@/components/ui/Table";
import { SectionHeader } from "@/components/ui/Misc";
import { Badge } from "@/components/ui/Badge";
import { cn, formatDate } from "@/lib/utils";

const tabs = [
  { key: "customer", label: "Customer Reviews" },
  { key: "provider", label: "Provider Reviews" },
  { key: "flagged", label: "Flagged Reviews" },
] as const;

function ReviewsInner() {
  const params = useSearchParams();
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>((params.get("tab") as never) ?? "customer");

  const list = tab === "flagged" ? reviews.filter((r) => r.flagged) : reviews;

  return (
    <div className="space-y-5">
      <SectionHeader title="Reviews" subtitle={`${reviews.length} total reviews · ${reviews.filter((r) => r.flagged).length} flagged`} />

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

      <Table>
        <THead>
          <tr>
            <TH>{tab === "provider" ? "Provider" : "Customer"}</TH>
            {tab !== "provider" && <TH>Provider</TH>}
            <TH>Rating</TH>
            <TH>Comment</TH>
            <TH>Date</TH>
            <TH>Flag</TH>
          </tr>
        </THead>
        <TBody>
          {list.map((r) => {
            const provider = getProvider(r.providerId);
            return (
              <TR key={r.id}>
                <TD className="font-medium">{tab === "provider" ? provider?.name : r.customerName}</TD>
                {tab !== "provider" && <TD className="text-foreground/60">{provider?.name}</TD>}
                <TD><RatingStars rating={r.rating} size={12} /></TD>
                <TD className="text-foreground/60 max-w-[280px] truncate">{r.comment}</TD>
                <TD className="text-foreground/60">{formatDate(r.date)}</TD>
                <TD>
                  {r.flagged ? (
                    <Badge tone="danger"><Flag size={11} /> Flagged</Badge>
                  ) : (
                    <span className="text-foreground/30 text-xs">—</span>
                  )}
                </TD>
              </TR>
            );
          })}
        </TBody>
      </Table>
    </div>
  );
}

export default function AdminReviewsPage() {
  return (
    <Suspense>
      <ReviewsInner />
    </Suspense>
  );
}
