"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  User,
  MapPin,
  CreditCard,
  Heart,
  Star,
  Bell,
  HelpCircle,
  MessageSquareWarning,
  Settings,
  LogOut,
  Plus,
  ChevronRight,
} from "lucide-react";
import { currentCustomer } from "@/lib/data/customers";
import { getProvider } from "@/lib/data/providers";
import { reviews } from "@/lib/data/reviews";
import { complaints } from "@/lib/data/complaints";
import { customerNotifications } from "@/lib/data/notifications";
import { useAppState } from "@/lib/store";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";
import { Button } from "@/components/ui/Button";
import { SectionHeader, EmptyState } from "@/components/ui/Misc";
import { cn, formatDate, formatDateTime } from "@/lib/utils";

const tabs = [
  { key: "profile", label: "Profile", icon: User },
  { key: "addresses", label: "Addresses", icon: MapPin },
  { key: "payments", label: "Payments", icon: CreditCard },
  { key: "saved", label: "Saved Providers", icon: Heart },
  { key: "reviews", label: "My Reviews", icon: Star },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "support", label: "Help & Support", icon: HelpCircle },
  { key: "complaints", label: "Complaints", icon: MessageSquareWarning },
  { key: "settings", label: "Settings", icon: Settings },
] as const;

type TabKey = (typeof tabs)[number]["key"];

function ProfileInner() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = (params.get("tab") as TabKey) ?? "profile";
  const [tab, setTab] = useState<TabKey>(tabs.some((t) => t.key === initial) ? initial : "profile");
  const { savedProviderIds } = useAppState();

  const myReviews = reviews.filter((r) => r.customerId === currentCustomer.id);
  const myComplaints = complaints.filter((c) => c.customerId === currentCustomer.id);

  function selectTab(k: TabKey) {
    setTab(k);
    router.replace(`/customer/profile?tab=${k}`);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex items-center gap-4 mb-6">
        <Avatar initials={currentCustomer.avatar} size="xl" />
        <div>
          <h1 className="text-xl font-semibold">{currentCustomer.name}</h1>
          <p className="text-foreground/55 text-sm">{currentCustomer.email}</p>
          <Badge tone="brand" className="mt-1.5 capitalize">{currentCustomer.accountType} account</Badge>
        </div>
      </div>

      <div className="flex gap-6">
        <aside className="hidden md:block w-56 shrink-0">
          <nav className="space-y-1 sticky top-20">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => selectTab(t.key)}
                className={cn(
                  "w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-left",
                  tab === t.key ? "bg-brand-50 text-brand-700" : "text-foreground/65 hover:bg-surface-muted",
                )}
              >
                <t.icon size={16} /> {t.label}
              </button>
            ))}
            <button className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-left text-danger-600 hover:bg-danger-50 mt-4">
              <LogOut size={16} /> Log out
            </button>
          </nav>
        </aside>

        <div className="md:hidden mb-2 -mx-4 px-4 flex gap-2 overflow-x-auto no-scrollbar w-full">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => selectTab(t.key)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium border",
                tab === t.key ? "border-brand-600 bg-brand-50 text-brand-700" : "border-border bg-surface text-foreground/60",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 min-w-0">
          {tab === "profile" && (
            <div className="rounded-2xl border border-border bg-surface p-5 space-y-4">
              <SectionHeader title="Personal information" />
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-foreground/50 text-xs">Full name</p>
                  <p className="font-medium mt-0.5">{currentCustomer.name}</p>
                </div>
                <div>
                  <p className="text-foreground/50 text-xs">Phone</p>
                  <p className="font-medium mt-0.5">{currentCustomer.phone}</p>
                </div>
                <div>
                  <p className="text-foreground/50 text-xs">Email</p>
                  <p className="font-medium mt-0.5">{currentCustomer.email}</p>
                </div>
                <div>
                  <p className="text-foreground/50 text-xs">Member since</p>
                  <p className="font-medium mt-0.5">{formatDate(currentCustomer.joinedDate)}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Edit profile</Button>
            </div>
          )}

          {tab === "addresses" && (
            <div className="space-y-3">
              <SectionHeader title="Saved addresses" action={<Button size="sm" variant="outline"><Plus size={14} /> Add address</Button>} />
              {currentCustomer.addresses.map((a) => (
                <div key={a.id} className="rounded-2xl border border-border bg-surface p-4 flex items-start gap-3">
                  <MapPin size={18} className="text-foreground/50 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{a.label} {a.isDefault && <Badge tone="brand" className="ml-1">Default</Badge>}</p>
                    <p className="text-xs text-foreground/55 mt-0.5">{a.line1}, {a.area}, {a.city} {a.pincode}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "payments" && (
            <div className="space-y-3">
              <SectionHeader title="Payment methods" />
              <div className="rounded-2xl border border-border bg-surface p-4 flex items-center gap-3">
                <CreditCard size={18} className="text-foreground/50" />
                <div>
                  <p className="text-sm font-medium">UPI — priya@upi</p>
                  <p className="text-xs text-foreground/55">Default payment method</p>
                </div>
              </div>
              <p className="text-xs text-foreground/45 px-1">
                Payment integration is a placeholder in this prototype — no real transactions are processed.
              </p>
            </div>
          )}

          {tab === "saved" && (
            <div>
              <SectionHeader title="Saved providers" />
              {savedProviderIds.length === 0 ? (
                <EmptyState title="No saved providers yet" description="Tap the heart icon on any provider to save them here." />
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  {savedProviderIds.map((id) => {
                    const p = getProvider(id);
                    if (!p) return null;
                    return (
                      <Link key={id} href={`/customer/provider/${id}`} className="rounded-2xl border border-border bg-surface p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
                        <Avatar initials={p.avatar} size="md" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{p.name}</p>
                          <p className="text-xs text-foreground/55 truncate">{p.title}</p>
                        </div>
                        <ChevronRight size={16} className="text-foreground/30" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {tab === "reviews" && (
            <div>
              <SectionHeader title="Reviews you've written" />
              {myReviews.length === 0 ? (
                <EmptyState title="No reviews yet" />
              ) : (
                <div className="space-y-3">
                  {myReviews.map((r) => {
                    const p = getProvider(r.providerId);
                    return (
                      <div key={r.id} className="rounded-2xl border border-border bg-surface p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{p?.name}</p>
                          <RatingStars rating={r.rating} size={13} />
                        </div>
                        <p className="text-sm text-foreground/65 mt-1.5">{r.comment}</p>
                        <p className="text-xs text-foreground/40 mt-1.5">{formatDate(r.date)}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {tab === "notifications" && (
            <div>
              <SectionHeader title="Notifications" />
              <div className="space-y-2">
                {customerNotifications.map((n) => (
                  <div key={n.id} className={cn("rounded-2xl border border-border bg-surface p-4", !n.read && "border-brand-200 bg-brand-50/40")}>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{n.title}</p>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-brand-600" />}
                    </div>
                    <p className="text-xs text-foreground/60 mt-1">{n.body}</p>
                    <p className="text-xs text-foreground/40 mt-1.5">{formatDateTime(n.timestamp)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "support" && (
            <div className="space-y-3">
              <SectionHeader title="Help & Support" />
              {["How do I cancel a booking?", "How does pricing work?", "How is a provider verified?", "How do I contact my technician?"].map((q) => (
                <div key={q} className="rounded-2xl border border-border bg-surface p-4 flex items-center justify-between">
                  <p className="text-sm font-medium">{q}</p>
                  <ChevronRight size={16} className="text-foreground/30" />
                </div>
              ))}
              <Button variant="outline">Contact support</Button>
            </div>
          )}

          {tab === "complaints" && (
            <div>
              <SectionHeader title="Complaints & disputes" action={<Button size="sm" variant="outline"><Plus size={14} /> File a complaint</Button>} />
              {myComplaints.length === 0 ? (
                <EmptyState title="No complaints filed" />
              ) : (
                <div className="space-y-3">
                  {myComplaints.map((c) => (
                    <div key={c.id} className="rounded-2xl border border-border bg-surface p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{c.subject}</p>
                        <Badge tone={c.status === "resolved" ? "success" : c.status === "in_progress" ? "warning" : "danger"}>
                          {c.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <p className="text-xs text-foreground/60 mt-1.5">{c.description}</p>
                      <p className="text-xs text-foreground/40 mt-1.5">Filed {formatDate(c.createdAt)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "settings" && (
            <div className="space-y-4">
              <SectionHeader title="Settings" />
              {["Push notifications", "SMS alerts", "Email updates", "Share location with providers"].map((s) => (
                <label key={s} className="flex items-center justify-between rounded-2xl border border-border bg-surface p-4">
                  <span className="text-sm font-medium">{s}</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-brand-600" />
                </label>
              ))}
              <Button variant="outline" className="md:hidden text-danger-600">
                <LogOut size={14} /> Log out
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CustomerProfilePage() {
  return (
    <Suspense>
      <ProfileInner />
    </Suspense>
  );
}
