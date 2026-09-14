"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, CalendarDays, Wallet, User, Bell } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";
import { getProvider } from "@/lib/data/providers";
import { Avatar } from "@/components/ui/Avatar";
import { useAppState } from "@/lib/store";

const CURRENT_PROVIDER_ID = "p1";

const tabs = [
  { href: "/provider", label: "Jobs", icon: LayoutGrid, match: (p: string) => p === "/provider" || p.startsWith("/provider/jobs") },
  { href: "/provider/schedule", label: "Schedule", icon: CalendarDays, match: (p: string) => p.startsWith("/provider/schedule") },
  { href: "/provider/earnings", label: "Earnings", icon: Wallet, match: (p: string) => p.startsWith("/provider/earnings") },
  { href: "/provider/profile", label: "Profile", icon: User, match: (p: string) => p.startsWith("/provider/profile") || p.startsWith("/provider/skills") || p.startsWith("/provider/verification") },
];

export function ProviderTopBar() {
  const provider = getProvider(CURRENT_PROVIDER_ID)!;
  const { providerOnline, setProviderOnline } = useAppState();

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Logo href="/provider" />
        <nav className="hidden md:flex items-center gap-1">
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/65 hover:bg-surface-muted hover:text-foreground"
            >
              {tab.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setProviderOnline(!providerOnline)}
            className={cn(
              "inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium rounded-full px-2.5 sm:px-3 py-1.5 border",
              providerOnline ? "bg-success-50 text-success-600 border-success-500/20" : "bg-danger-50 text-danger-600 border-danger-500/20",
            )}
          >
            <span className={cn("w-2 h-2 rounded-full", providerOnline ? "bg-success-500" : "bg-danger-500")} />
            {providerOnline ? "Available" : "Offline"}
          </button>
          <Link href="/provider/profile" className="p-2 rounded-full hover:bg-surface-muted relative" aria-label="Notifications">
            <Bell size={19} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-danger-500" />
          </Link>
          <Link href="/provider/profile">
            <Avatar initials={provider.avatar} size="sm" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function ProviderBottomNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface border-t border-border flex items-stretch h-16">
      {tabs.map((tab) => {
        const active = tab.match(pathname);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium",
              active ? "text-brand-600" : "text-foreground/45",
            )}
          >
            <Icon size={20} />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function ProviderShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ProviderTopBar />
      <main className="flex-1 pb-20 md:pb-8">{children}</main>
      <ProviderBottomNav />
    </div>
  );
}
