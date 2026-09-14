import Link from "next/link";
import {
  Search,
  CalendarCheck,
  Wrench,
  ShieldCheck,
  Star,
  BadgeCheck,
  Activity,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CategoryCard } from "@/components/marketplace/CategoryCard";
import { featuredCategories } from "@/lib/data/categories";
import { providers } from "@/lib/data/providers";
import { customers } from "@/lib/data/customers";

const stats = [
  { label: "Verified professionals", value: `${providers.filter((p) => p.status === "verified").length}+` },
  { label: "Customers served", value: `${customers.length * 240}+` },
  { label: "Service categories", value: "11" },
  { label: "Areas covered in Chennai", value: "8" },
];

const steps = [
  { icon: Search, title: "Tell us what you need", body: "Describe your problem in plain language — no technical jargon required." },
  { icon: ShieldCheck, title: "Find the right professional", body: "We match you with verified, skilled professionals near you." },
  { icon: CalendarCheck, title: "Book the service", body: "Choose a fixed price or request a quotation, now or scheduled." },
  { icon: Wrench, title: "Get it done", body: "Track your technician in real time and pay securely when done." },
];

const whyUs = [
  "Verified professionals — identity, skill & certificate checked",
  "Location-based matching for the fastest response",
  "Transparent, upfront pricing with no surprises",
  "Real-time service status from request to completion",
  "Ratings & reviews from real completed jobs",
];

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-brand-50/60 to-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1.5 mb-5">
              <Activity size={13} /> A digital skilled-service network
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1]">
              Find the Right Professional for Any Job.
            </h1>
            <p className="mt-5 text-lg text-foreground/65 max-w-xl">
              Connect with verified skilled service providers near you — for home, automotive, commercial, industrial and technical services.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href="/customer/request/category" size="lg">
                Find a Service <ArrowRight size={16} />
              </Button>
              <Button href="/provider/onboarding" variant="outline" size="lg">
                Become a Service Provider
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-2 rounded-2xl border border-border bg-surface p-2 shadow-sm max-w-md">
              <Search size={18} className="text-foreground/40 ml-2" />
              <input
                readOnly
                placeholder="What service do you need?"
                className="flex-1 bg-transparent outline-none text-sm py-2"
              />
              <Link href="/customer/request/category" className="text-sm font-medium bg-brand-600 text-white rounded-xl px-4 py-2">
                Search
              </Link>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl sm:text-3xl font-semibold text-brand-700">{s.value}</p>
                <p className="text-sm text-foreground/55 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">How it works</h2>
          <p className="text-foreground/60 mt-2">From problem to solution in four simple steps.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border border-border bg-surface p-6">
              <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-brand-600 text-white text-sm font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <s.icon className="text-brand-600 mb-3" size={26} />
              <p className="font-semibold">{s.title}</p>
              <p className="text-sm text-foreground/60 mt-1.5">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular services */}
      <section className="bg-surface-muted/50 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Popular Services</h2>
              <p className="text-foreground/60 mt-2">Home, automotive, commercial, industrial and EV — all in one place.</p>
            </div>
            <Link href="/services" className="hidden sm:inline-flex text-sm font-medium text-brand-700 items-center gap-1">
              View All Services <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredCategories.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
          <Link href="/services" className="sm:hidden mt-6 inline-flex text-sm font-medium text-brand-700 items-center gap-1">
            View All Services <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Why choose ServiLink?</h2>
          <p className="text-foreground/60 mt-2 mb-6">
            Skill + Location + Availability + Trust — the four signals behind every match.
          </p>
          <ul className="space-y-3">
            {whyUs.map((w) => (
              <li key={w} className="flex items-start gap-3">
                <BadgeCheck size={18} className="text-success-600 mt-0.5 shrink-0" />
                <span className="text-sm text-foreground/75">{w}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-semibold">AK</div>
            <div>
              <p className="font-semibold text-sm">Arun Kumar</p>
              <p className="text-xs text-foreground/55">Electrical & EV Technician</p>
            </div>
            <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold bg-success-50 text-success-600 rounded-full px-2.5 py-1">
              <Star size={12} className="fill-success-600" /> 4.8
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-surface-muted p-3">
              <p className="text-lg font-semibold">327</p>
              <p className="text-[11px] text-foreground/55">Jobs done</p>
            </div>
            <div className="rounded-xl bg-surface-muted p-3">
              <p className="text-lg font-semibold">8 yrs</p>
              <p className="text-[11px] text-foreground/55">Experience</p>
            </div>
            <div className="rounded-xl bg-surface-muted p-3">
              <p className="text-lg font-semibold">94%</p>
              <p className="text-[11px] text-foreground/55">Match score</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {["Identity Verified", "Skill Verified", "Certificate Verified"].map((b) => (
              <span key={b} className="text-[11px] font-medium bg-brand-50 text-brand-700 rounded-full px-2 py-1">
                ✓ {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* For providers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="rounded-3xl bg-brand-900 text-white px-6 sm:px-12 py-12 sm:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <p className="text-sm font-semibold text-brand-200 uppercase tracking-wide">For Service Providers</p>
            <h2 className="text-2xl sm:text-3xl font-semibold mt-2">Turn your skills into opportunities.</h2>
            <p className="text-brand-100/80 mt-3">
              Join a growing network of verified electricians, technicians and specialists. Manage jobs, track earnings and grow your business.
            </p>
          </div>
          <Link
            href="/provider/onboarding"
            className="inline-flex items-center justify-center gap-2 shrink-0 rounded-xl bg-white text-brand-900 hover:bg-brand-50 font-medium px-5 py-3 text-base transition-colors"
          >
            Join as a Provider <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Positioning */}
      <section className="bg-surface-muted/50 border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-14 text-center">
          <p className="text-sm font-semibold text-brand-700 uppercase tracking-wide">Our positioning</p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-2">
            Customers & Businesses <span className="text-foreground/40">+</span> Verified Skilled Professionals
          </h2>
          <p className="text-foreground/60 mt-3 max-w-2xl mx-auto">
            Matched through Skill, Location, Availability and Trust — supporting Home, Automotive, Commercial, Industrial, EV and specialized technical services, all on one network.
          </p>
        </div>
      </section>
    </div>
  );
}
