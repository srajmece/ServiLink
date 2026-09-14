"use client";

import { useState } from "react";
import { Clock, MapPin } from "lucide-react";
import { getProvider } from "@/lib/data/providers";
import { getCategory } from "@/lib/data/categories";
import { useAppState } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import { BookingStatusBadge } from "@/components/ui/StatusBadge";
import { SectionHeader, EmptyState } from "@/components/ui/Misc";
import { formatDate, formatTime } from "@/lib/utils";

const CURRENT_PROVIDER_ID = "p1";
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ProviderSchedulePage() {
  const provider = getProvider(CURRENT_PROVIDER_ID)!;
  const { allBookings } = useAppState();
  const [workingDays, setWorkingDays] = useState<Record<string, boolean>>(
    Object.fromEntries(days.map((d) => [d, d !== "Sunday"])),
  );

  const scheduled = allBookings
    .filter((b) => b.providerId === provider.id && !["completed", "cancelled", "disputed"].includes(b.status))
    .sort((a, b) => (a.scheduledFor ?? a.createdAt).localeCompare(b.scheduledFor ?? b.createdAt));

  const grouped = scheduled.reduce<Record<string, typeof scheduled>>((acc, b) => {
    const key = formatDate(b.scheduledFor ?? b.createdAt);
    acc[key] = acc[key] ? [...acc[key], b] : [b];
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Schedule</h1>
        <p className="text-foreground/55 text-sm mt-1">Manage your working hours and upcoming jobs.</p>
      </div>

      <Card className="p-5">
        <SectionHeader title="Working hours" subtitle={provider.workingHours} className="mb-3" />
        <div className="space-y-2">
          {days.map((d) => (
            <label key={d} className="flex items-center justify-between rounded-xl border border-border p-3">
              <span className="text-sm font-medium">{d}</span>
              <div className="flex items-center gap-3">
                {workingDays[d] && <span className="text-xs text-foreground/50 inline-flex items-center gap-1"><Clock size={12} /> {provider.workingHours}</span>}
                <input
                  type="checkbox"
                  checked={workingDays[d]}
                  onChange={(e) => setWorkingDays((w) => ({ ...w, [d]: e.target.checked }))}
                  className="w-4 h-4 accent-brand-600"
                />
              </div>
            </label>
          ))}
        </div>
      </Card>

      <div>
        <SectionHeader title="Upcoming jobs" />
        {Object.keys(grouped).length === 0 ? (
          <EmptyState title="No upcoming jobs scheduled" />
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([date, items]) => (
              <div key={date}>
                <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wide mb-2">{date}</p>
                <div className="space-y-2">
                  {items.map((b) => {
                    const category = getCategory(b.categoryId);
                    return (
                      <div key={b.id} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
                        <span className="w-10 h-10 rounded-xl bg-surface-muted flex items-center justify-center text-lg shrink-0">{category?.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{b.problem}</p>
                          <p className="text-xs text-foreground/55 inline-flex items-center gap-1"><MapPin size={11} /> {b.address}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs font-medium">{b.scheduledFor ? formatTime(b.scheduledFor) : "ASAP"}</p>
                          <BookingStatusBadge status={b.status} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
