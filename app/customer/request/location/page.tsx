"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, MapPin, LocateFixed, Clock, Zap, FileText, IndianRupee } from "lucide-react";
import { useBookingDraft } from "@/lib/bookingDraft";
import { currentCustomer } from "@/lib/data/customers";
import { StepProgress, SectionHeader } from "@/components/ui/Misc";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function LocationStep() {
  const router = useRouter();
  const { draft, update } = useBookingDraft();
  const [addressId, setAddressId] = useState<string | null>(draft.addressId ?? currentCustomer.addresses[0]?.id ?? null);
  const [manualAddress, setManualAddress] = useState(draft.addressText ?? "");
  const [useManual, setUseManual] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [detected, setDetected] = useState(false);
  const [timing, setTiming] = useState(draft.timing);
  const [scheduledFor, setScheduledFor] = useState(draft.scheduledFor ?? "");
  const [pricingType, setPricingType] = useState(draft.pricingType);

  useEffect(() => {
    if (!draft.categoryId || !draft.problemId) router.replace("/customer/request/category");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function detectLocation() {
    setDetecting(true);
    setTimeout(() => {
      setDetecting(false);
      setDetected(true);
      setUseManual(false);
    }, 1200);
  }

  function handleContinue() {
    const selectedAddress = currentCustomer.addresses.find((a) => a.id === addressId);
    const addressText = useManual
      ? manualAddress
      : detected
        ? "Current location — Anna Nagar, Chennai (detected)"
        : selectedAddress
          ? `${selectedAddress.line1}, ${selectedAddress.area}, ${selectedAddress.city}`
          : "";

    update({
      addressId: useManual ? null : addressId,
      addressText,
      timing,
      scheduledFor: timing === "scheduled" ? scheduledFor : null,
      pricingType,
    });
    router.push("/customer/request/matching");
  }

  const canContinue = useManual ? manualAddress.trim().length > 3 : !!addressId || detected;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-8">
      <button onClick={() => router.back()} className="inline-flex items-center gap-1 text-sm text-foreground/55 mb-4">
        <ArrowLeft size={15} /> Back
      </button>
      <StepProgress step={3} total={4} />
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight mt-4">Where do you need this service?</h1>

      <SectionHeader title="Location" className="mt-6 mb-3" />
      <button
        onClick={detectLocation}
        className={cn(
          "w-full flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors mb-3",
          detected ? "border-brand-600 bg-brand-50" : "border-border bg-surface hover:bg-surface-muted",
        )}
      >
        <LocateFixed size={18} className={detected ? "text-brand-700" : "text-foreground/50"} />
        <div className="flex-1">
          <p className="text-sm font-medium">{detecting ? "Detecting your location..." : detected ? "Current location detected" : "Use current location"}</p>
          {detected && <p className="text-xs text-foreground/55 mt-0.5">Anna Nagar, Chennai</p>}
        </div>
      </button>

      <div className="space-y-2">
        {currentCustomer.addresses.map((a) => (
          <button
            key={a.id}
            onClick={() => {
              setAddressId(a.id);
              setDetected(false);
              setUseManual(false);
            }}
            className={cn(
              "w-full flex items-start gap-3 rounded-2xl border p-4 text-left transition-colors",
              !useManual && !detected && addressId === a.id ? "border-brand-600 bg-brand-50" : "border-border bg-surface hover:bg-surface-muted",
            )}
          >
            <MapPin size={18} className="text-foreground/50 mt-0.5" />
            <div>
              <p className="text-sm font-medium">{a.label}</p>
              <p className="text-xs text-foreground/55">{a.line1}, {a.area}, {a.city} {a.pincode}</p>
            </div>
          </button>
        ))}
      </div>

      <button onClick={() => setUseManual((v) => !v)} className="mt-3 text-sm font-medium text-brand-700">
        {useManual ? "Choose a saved address instead" : "+ Enter address manually"}
      </button>
      {useManual && (
        <textarea
          value={manualAddress}
          onChange={(e) => setManualAddress(e.target.value)}
          rows={2}
          placeholder="Flat / house no., street, area, city, pincode"
          className="mt-2 w-full rounded-xl border border-border px-3.5 py-3 text-sm outline-none focus:border-brand-500 resize-none"
        />
      )}

      <SectionHeader title="Service timing" className="mt-8 mb-3" />
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setTiming("now")}
          className={cn(
            "flex flex-col items-start gap-1 rounded-2xl border p-4 text-left",
            timing === "now" ? "border-brand-600 bg-brand-50" : "border-border bg-surface hover:bg-surface-muted",
          )}
        >
          <Zap size={18} className="text-brand-700" />
          <p className="text-sm font-medium">Service Now</p>
          <p className="text-xs text-foreground/55">Fastest available technician</p>
        </button>
        <button
          onClick={() => setTiming("scheduled")}
          className={cn(
            "flex flex-col items-start gap-1 rounded-2xl border p-4 text-left",
            timing === "scheduled" ? "border-brand-600 bg-brand-50" : "border-border bg-surface hover:bg-surface-muted",
          )}
        >
          <Clock size={18} className="text-brand-700" />
          <p className="text-sm font-medium">Schedule for Later</p>
          <p className="text-xs text-foreground/55">Pick a convenient time</p>
        </button>
      </div>
      {timing === "scheduled" && (
        <input
          type="datetime-local"
          value={scheduledFor}
          onChange={(e) => setScheduledFor(e.target.value)}
          className="mt-3 w-full rounded-xl border border-border px-3.5 py-2.5 text-sm outline-none focus:border-brand-500"
        />
      )}

      <SectionHeader title="Service type" className="mt-8 mb-3" />
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setPricingType("fixed")}
          className={cn(
            "flex flex-col items-start gap-1 rounded-2xl border p-4 text-left",
            pricingType === "fixed" ? "border-brand-600 bg-brand-50" : "border-border bg-surface hover:bg-surface-muted",
          )}
        >
          <IndianRupee size={18} className="text-brand-700" />
          <p className="text-sm font-medium">Fixed-price service</p>
          <p className="text-xs text-foreground/55">Know the cost upfront</p>
        </button>
        <button
          onClick={() => setPricingType("quote")}
          className={cn(
            "flex flex-col items-start gap-1 rounded-2xl border p-4 text-left",
            pricingType === "quote" ? "border-brand-600 bg-brand-50" : "border-border bg-surface hover:bg-surface-muted",
          )}
        >
          <FileText size={18} className="text-brand-700" />
          <p className="text-sm font-medium">Request quotation</p>
          <p className="text-xs text-foreground/55">Best for complex jobs</p>
        </button>
      </div>

      <div className="mt-10">
        <Button fullWidth size="lg" disabled={!canContinue || (timing === "scheduled" && !scheduledFor)} onClick={handleContinue}>
          Find Providers <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
