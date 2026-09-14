"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Wrench,
  CalendarCheck,
  CreditCard,
  Star,
  MessageSquareWarning,
  MapPinned,
  BarChart3,
  Settings,
  ChevronDown,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";

interface NavItem {
  label: string;
  href: string;
}
interface NavGroup {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href?: string;
  items?: NavItem[];
}

const nav: NavGroup[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  {
    label: "Users",
    icon: Users,
    items: [
      { label: "Customers", href: "/admin/customers" },
      { label: "Providers", href: "/admin/providers" },
      { label: "Businesses", href: "/admin/customers?type=business" },
    ],
  },
  {
    label: "Providers",
    icon: ShieldCheck,
    items: [
      { label: "All Providers", href: "/admin/providers" },
      { label: "Pending Verification", href: "/admin/providers?status=pending" },
      { label: "Verified", href: "/admin/providers?status=verified" },
      { label: "Suspended", href: "/admin/providers?status=suspended" },
      { label: "Skill Verification", href: "/admin/providers/verification" },
    ],
  },
  {
    label: "Services",
    icon: Wrench,
    items: [
      { label: "Categories", href: "/admin/services?tab=categories" },
      { label: "Subcategories", href: "/admin/services?tab=subcategories" },
      { label: "Skills", href: "/admin/services?tab=skills" },
      { label: "Pricing", href: "/admin/services?tab=pricing" },
    ],
  },
  {
    label: "Bookings",
    icon: CalendarCheck,
    items: [
      { label: "All Bookings", href: "/admin/bookings" },
      { label: "Active", href: "/admin/bookings?status=active" },
      { label: "Completed", href: "/admin/bookings?status=completed" },
      { label: "Cancelled", href: "/admin/bookings?status=cancelled" },
      { label: "Emergency", href: "/admin/bookings?status=emergency" },
    ],
  },
  {
    label: "Payments",
    icon: CreditCard,
    items: [
      { label: "Transactions", href: "/admin/payments?tab=transactions" },
      { label: "Commission", href: "/admin/payments?tab=commission" },
      { label: "Refunds", href: "/admin/payments?tab=refunds" },
      { label: "Provider Payouts", href: "/admin/payments?tab=payouts" },
    ],
  },
  {
    label: "Reviews",
    icon: Star,
    items: [
      { label: "Customer Reviews", href: "/admin/reviews?tab=customer" },
      { label: "Provider Reviews", href: "/admin/reviews?tab=provider" },
      { label: "Flagged Reviews", href: "/admin/reviews?tab=flagged" },
    ],
  },
  {
    label: "Complaints",
    icon: MessageSquareWarning,
    items: [
      { label: "Open", href: "/admin/complaints?status=open" },
      { label: "In Progress", href: "/admin/complaints?status=in_progress" },
      { label: "Resolved", href: "/admin/complaints?status=resolved" },
    ],
  },
  {
    label: "Locations",
    icon: MapPinned,
    items: [
      { label: "Service Areas", href: "/admin/locations?tab=areas" },
      { label: "Cities", href: "/admin/locations?tab=cities" },
      { label: "Provider Coverage", href: "/admin/locations?tab=coverage" },
    ],
  },
  {
    label: "Reports",
    icon: BarChart3,
    items: [
      { label: "Revenue", href: "/admin/reports?tab=revenue" },
      { label: "Bookings", href: "/admin/reports?tab=bookings" },
      { label: "Providers", href: "/admin/reports?tab=providers" },
      { label: "Customers", href: "/admin/reports?tab=customers" },
      { label: "Service Demand", href: "/admin/reports?tab=demand" },
    ],
  },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

function SidebarContent({ pathname }: { pathname: string }) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(nav.map((g) => [g.label, g.items ? pathname.startsWith(g.items[0].href.split("?")[0]) || true : true])),
  );

  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
      {nav.map((group) => {
        const Icon = group.icon;
        if (!group.items) {
          const active = pathname === group.href;
          return (
            <Link
              key={group.label}
              href={group.href!}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                active ? "bg-brand-50 text-brand-700" : "text-foreground/70 hover:bg-surface-muted",
              )}
            >
              <Icon size={17} /> {group.label}
            </Link>
          );
        }
        const groupActive = group.items.some((i) => pathname === i.href.split("?")[0]);
        const isOpen = openGroups[group.label];
        return (
          <div key={group.label}>
            <button
              onClick={() => setOpenGroups((s) => ({ ...s, [group.label]: !s[group.label] }))}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                groupActive ? "text-brand-700" : "text-foreground/70 hover:bg-surface-muted",
              )}
            >
              <Icon size={17} />
              <span className="flex-1 text-left">{group.label}</span>
              <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
            </button>
            {isOpen && (
              <div className="ml-8 mt-0.5 space-y-0.5 border-l border-border pl-3">
                {group.items.map((item) => {
                  const active = pathname === item.href.split("?")[0];
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block rounded-md px-2 py-1.5 text-sm",
                        active ? "text-brand-700 font-medium" : "text-foreground/60 hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-surface h-screen sticky top-0">
        <div className="h-16 flex items-center px-5 border-b border-border">
          <Logo href="/admin" />
        </div>
        <SidebarContent pathname={pathname} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-surface flex flex-col">
            <div className="h-16 flex items-center justify-between px-5 border-b border-border">
              <Logo href="/admin" />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <SidebarContent pathname={pathname} />
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 h-16 bg-surface/95 backdrop-blur border-b border-border flex items-center justify-between px-4 sm:px-6">
          <button className="lg:hidden p-2 -ml-2" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
          <p className="hidden lg:block text-sm text-foreground/50">Admin Operations Console</p>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-surface-muted relative" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-danger-500" />
            </button>
            <div className="flex items-center gap-2">
              <Avatar initials="AD" size="sm" />
              <span className="hidden sm:block text-sm font-medium">Admin</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 max-w-[1600px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
