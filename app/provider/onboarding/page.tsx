"use client";

import { useState } from "react";
import { CheckCircle2, Upload, ArrowRight, ArrowLeft } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { Button } from "@/components/ui/Button";
import { StepProgress, Chip, SectionHeader } from "@/components/ui/Misc";
import { cn } from "@/lib/utils";

const steps = ["Personal", "Professional", "Documents", "Review"];

export default function ProviderOnboardingPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("3");
  const [emergencyAvailable, setEmergencyAvailable] = useState(false);
  const [docs, setDocs] = useState<string[]>([]);

  function toggleCategory(id: string) {
    setSelectedCategories((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 sm:py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-success-50 text-success-600 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={32} />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Application submitted!</h1>
        <p className="text-foreground/60 mt-2">
          Thanks for applying. Your documents are now with our verification team — this usually takes 1–2 business days.
          Only approved, verified providers can accept customer jobs.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/provider/verification" size="lg">Go to Verification Centre</Button>
          <Button href="/provider" variant="outline" size="lg">Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Become a Service Provider</h1>
      <p className="text-foreground/55 text-sm mt-1">Anyone can apply — only verified providers can accept jobs.</p>

      <div className="mt-5">
        <StepProgress step={step + 1} total={steps.length} />
        <div className="flex justify-between mt-1.5 text-xs text-foreground/45">
          {steps.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-5 space-y-4">
        {step === 0 && (
          <>
            <SectionHeader title="Personal information" />
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Full name</label>
                <input defaultValue="Your name" className="mt-1.5 w-full rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-brand-500" />
              </div>
              <div>
                <label className="text-sm font-medium">Mobile number</label>
                <input defaultValue="98400 00000" className="mt-1.5 w-full rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-brand-500" />
              </div>
              <div>
                <label className="text-sm font-medium">City</label>
                <input defaultValue="Chennai" className="mt-1.5 w-full rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-brand-500" />
              </div>
              <div>
                <label className="text-sm font-medium">Languages spoken</label>
                <input defaultValue="Tamil, English" className="mt-1.5 w-full rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-brand-500" />
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <SectionHeader title="Professional information" />
            <div>
              <p className="text-sm font-medium mb-2">Service categories</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {categories.map((c) => (
                  <Chip key={c.id} selected={selectedCategories.includes(c.id)} onClick={() => toggleCategory(c.id)}>
                    {c.emoji} {c.name}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Skills (comma separated)</label>
              <input
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Domestic Electrical, EV Electrical, Diagnostics"
                className="mt-1.5 w-full rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Years of experience</label>
                <input
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-brand-500"
                />
              </div>
              <label className="flex items-center gap-2.5 mt-6">
                <input type="checkbox" checked={emergencyAvailable} onChange={(e) => setEmergencyAvailable(e.target.checked)} className="w-4 h-4 accent-brand-600" />
                <span className="text-sm font-medium">Available for emergency jobs</span>
              </label>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <SectionHeader title="KYC & Certificates" />
            {["Government ID (Aadhaar / PAN)", "Address proof", "Trade certificate / ITI certificate", "Recent photograph"].map((doc) => (
              <div key={doc} className="flex items-center justify-between rounded-xl border border-dashed border-border p-3.5">
                <span className="text-sm">{doc}</span>
                <button
                  onClick={() => setDocs((prev) => (prev.includes(doc) ? prev : [...prev, doc]))}
                  className={cn(
                    "text-xs font-medium rounded-lg px-3 py-1.5 inline-flex items-center gap-1.5",
                    docs.includes(doc) ? "bg-success-50 text-success-600" : "bg-surface-muted text-foreground/60 hover:bg-border",
                  )}
                >
                  {docs.includes(doc) ? <CheckCircle2 size={13} /> : <Upload size={13} />}
                  {docs.includes(doc) ? "Uploaded" : "Upload"}
                </button>
              </div>
            ))}
          </>
        )}

        {step === 3 && (
          <>
            <SectionHeader title="Review & submit" />
            <div className="text-sm space-y-2">
              <p><span className="text-foreground/50">Categories:</span> {selectedCategories.length ? selectedCategories.join(", ") : "None selected"}</p>
              <p><span className="text-foreground/50">Skills:</span> {skills || "—"}</p>
              <p><span className="text-foreground/50">Experience:</span> {experience} years</p>
              <p><span className="text-foreground/50">Emergency jobs:</span> {emergencyAvailable ? "Yes" : "No"}</p>
              <p><span className="text-foreground/50">Documents uploaded:</span> {docs.length}/4</p>
            </div>
            <p className="text-xs text-foreground/45 bg-surface-muted rounded-xl p-3">
              By submitting, you agree to ServiLink&apos;s provider terms. Your documents will be reviewed by our verification team before you can accept jobs.
            </p>
          </>
        )}
      </div>

      <div className="mt-6 flex justify-between gap-3">
        <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          <ArrowLeft size={16} /> Back
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>
            Continue <ArrowRight size={16} />
          </Button>
        ) : (
          <Button onClick={() => setSubmitted(true)}>Submit Application</Button>
        )}
      </div>
    </div>
  );
}
