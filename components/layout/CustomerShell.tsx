"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarClock, MessageSquare, User, Bell, MapPin, Siren } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";
import { currentCustomer } from "@/lib/data/customers";
import { Avatar } from "@/components/ui/Avatar";

const tabs = [
  { href: "/customer", label: "Home", icon: Home, match: (p: string) => p === "/customer" },
  { href: "/customer/bookings", label: "Bookings", icon: CalendarClock, match: (p: string) => p.startsWith("/customer/bookings") || p.startsWith("/customer/booking/") },
  { href: "/customer/profile?tab=support", label: "Messages", icon: MessageSquare, match: () => false },
  { href: "/customer/profile", label: "Profile", icon: User, match: (p: string) => p.startsWith("/customer/profile") },
];

export function CustomerTopBar() {
  const address = currentCustomer.addresses.find((a) => a.isDefault) ?? currentCustomer.addresses[0];
  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Logo href="/customer" />
        <div className="hidden sm:flex items-center gap-1.5 text-sm text-foreground/60 min-w-0">
          <MapPin size={15} className="text-brand-600 shrink-0" />
          <span className="truncate max-w-[220px]">{address.area}, {address.city}</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/customer/emergency" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-danger-600 bg-danger-50 rounded-full px-3 py-1.5 hover:bg-danger-50/80">
            <Siren size={14} /> Emergency
          </Link>
          <Link href="/customer/profile?tab=notifications" className="p-2 rounded-full hover:bg-surface-muted relative" aria-label="Notifications">
            <Bell size={19} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-danger-500" />
          </Link>
          <Link href="/customer/profile">
            <Avatar initials={currentCustomer.avatar} size="sm" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function CustomerBottomNav() {
  const pathname = usePathname();
  return (
    <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-surface border-t border-border flex items-stretch h-16">
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

export function CustomerShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CustomerTopBar />
      <main className="flex-1 pb-20 sm:pb-8">{children}</main>
      <CustomerBottomNav />
    </div>
  );
}
