import { Search, ShieldCheck, CalendarCheck, Wrench, Gauge, MapPin, Clock, ThumbsUp, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/Button";

const steps = [
  { icon: Search, title: "Tell us what you need", body: "Describe your problem in plain language — we translate it into the right technical skill." },
  { icon: ShieldCheck, title: "Find the right professional", body: "We match you with verified providers using skill, distance, availability, rating and price." },
  { icon: CalendarCheck, title: "Book the service", body: "Pick a fixed price or request a quotation — for now or a scheduled time." },
  { icon: Wrench, title: "Get it done", body: "Track your technician in real time, from assignment to arrival to completion." },
];

const matchFactors = [
  { icon: Gauge, label: "Skill", body: "Does the provider have the exact skill your job needs?" },
  { icon: MapPin, label: "Location", body: "How far is the provider from your service address?" },
  { icon: Clock, label: "Availability", body: "Can the provider attend now or at your preferred time?" },
  { icon: ThumbsUp, label: "Experience & Rating", body: "Years of experience and service history from real customers." },
  { icon: IndianRupee, label: "Price", body: "Is the provider within your expected budget?" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-border bg-brand-50/40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">A Digital Skilled-Service Network</h1>
          <p className="mt-4 text-foreground/65 text-lg">
            ServiLink connects customers and businesses with verified skilled professionals — electricians, plumbers,
            AC technicians, mechanics, EV and industrial technicians, and more — through skill, location, availability
            and trust.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight text-center mb-10">How it works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-border bg-surface p-6 relative">
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

      <section className="bg-surface-muted/50 border-y border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-semibold tracking-tight">Smart Matching, made transparent</h2>
            <p className="text-foreground/60 mt-2">
              Every provider list shows a conceptual Match Score built from five signals. It&apos;s an MVP
              representation to help you choose confidently — not a scientific ranking.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {matchFactors.map((f) => (
              <div key={f.label} className="rounded-2xl border border-border bg-surface p-5 text-center">
                <f.icon className="text-brand-600 mx-auto mb-2" size={22} />
                <p className="font-semibold text-sm">{f.label}</p>
                <p className="text-xs text-foreground/55 mt-1">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Two levels, one platform</h2>
        <p className="text-foreground/60 mt-3">
          Customers never need to understand technical classifications. Instead of “select a PMSM traction motor
          diagnostic technician,” you simply say <span className="italic">“my electric truck has a motor problem.”</span>{" "}
          Underneath, providers expose detailed technical skills so the match is precise.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
          <Button href="/customer/request/category" size="lg">Find a Service</Button>
          <Button href="/provider/onboarding" variant="outline" size="lg">Become a Service Provider</Button>
        </div>
      </section>
    </div>
  );
}
