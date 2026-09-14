"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Siren, LocateFixed, Clock, ShieldCheck } from "lucide-react";
import { categories, getCategory } from "@/lib/data/categories";
import { providers } from "@/lib/data/providers";
import { currentCustomer } from "@/lib/data/customers";
import { useAppState } from "@/lib/store";
import { buildTimeline } from "@/lib/data/bookings";
import { Booking } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { ProviderCard } from "@/components/marketplace/ProviderCard";
import { cn, makeId } from "@/lib/utils";

const EMERGENCY_CATEGORY_IDS = ["electrical", "plumbing", "ac-hvac", "automotive", "commercial-vehicles", "ev", "industrial"];
const emergencyCategories = categories.filter((c) => EMERGENCY_CATEGORY_IDS.includes(c.id));

export default function EmergencyServicePage() {
  const router = useRouter();
  const { addBooking } = useAppState();
  const [located, setLocated] = useState(false);
  const [locating, setLocating] = useState(false);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [dispatching, setDispatching] = useState(false);

  function detect() {
    setLocating(true);
    setTimeout(() => {
      setLocating(false);
      setLocated(true);
    }, 1000);
  }

  const emergencyProviders = useMemo(() => {
    if (!categoryId) return [];
    return providers
      .filter((p) => p.categories.includes(categoryId) && p.emergencyAvailable && p.status === "verified" && p.distanceKm <= 12)
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [categoryId]);

  const fastest = emergencyProviders[0];
  const fastestEtaMin = fastest ? Math.max(8, Math.round(fastest.distanceKm * 4.3)) : null;
  const category = categoryId ? getCategory(categoryId) : null;

  function requestNow() {
    if (!fastest || !category) return;
    setDispatching(true);
    const id = makeId("bk");
    const createdAt = new Date().toISOString();
    const problemLabel = `Emergency ${category.name.toLowerCase()} service`;
    const booking: Booking = {
      id,
      customerId: currentCustomer.id,
      providerId: fastest.id,
      categoryId: category.id,
      problem: problemLabel,
      description: "Emergency service requested via ServiLink emergency dispatch.",
      address: `${currentCustomer.addresses[0].line1}, ${currentCustomer.addresses[0].area}, ${currentCustomer.addresses[0].city}`,
      city: currentCustomer.addresses[0].city,
      timing: "now",
      pricingType: "fixed",
      status: "provider_assigned",
      createdAt,
      estimatedCostMin: fastest.startingPrice,
      estimatedCostMax: Math.round(fastest.startingPrice * 2.2),
      platformFee: Math.round(fastest.startingPrice * 2.2 * 0.08),
      total: Math.round(fastest.startingPrice * 2.2 * 1.08),
      isEmergency: true,
      timeline: buildTimeline("provider_assigned", createdAt),
      paymentStatus: "pending",
    };
    setTimeout(() => {
      addBooking(booking);
      router.push(`/customer/booking/${id}/status`);
    }, 800);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-8">
      <div className="rounded-2xl bg-danger-600 text-white p-5 flex items-center gap-3">
        <Siren size={28} />
        <div>
          <p className="text-lg font-semibold">Emergency Service</p>
          <p className="text-sm text-white/85">Get a verified technician dispatched immediately.</p>
        </div>
      </div>

      <button
        onClick={detect}
        className={cn(
          "mt-5 w-full flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors",
          located ? "border-brand-600 bg-brand-50" : "border-border bg-surface hover:bg-surface-muted",
        )}
      >
        <LocateFixed size={18} className={located ? "text-brand-700" : "text-foreground/50"} />
        <div>
          <p className="text-sm font-medium">{locating ? "Detecting your location..." : located ? "Location detected" : "Detect my location"}</p>
          {located && <p className="text-xs text-foreground/55">Anna Nagar, Chennai</p>}
        </div>
      </button>

      {located && (
        <div className="mt-6">
          <p className="text-sm font-semibold mb-2.5">What kind of emergency is this?</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
            {emergencyCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategoryId(c.id)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl border p-3 text-center",
                  categoryId === c.id ? "border-danger-500 bg-danger-50" : "border-border bg-surface hover:bg-surface-muted",
                )}
              >
                <span className="text-xl">{c.emoji}</span>
                <span className="text-[11px] font-medium leading-tight">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {categoryId && (
        <div className="mt-6">
          {emergencyProviders.length === 0 ? (
            <p className="text-sm text-foreground/55">No emergency-ready providers available for this category right now.</p>
          ) : (
            <>
              <div className="rounded-2xl border border-border bg-surface p-4">
                <p className="font-semibold text-sm">
                  Emergency {category?.name} Service
                </p>
                <p className="text-sm text-foreground/60 mt-1">
                  {emergencyProviders.length} verified {category?.name.toLowerCase()} technicians available within 12 km.
                </p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-success-600">
                  <Clock size={14} /> Fastest arrival: ~{fastestEtaMin} min
                </p>
              </div>

              <Button fullWidth size="lg" variant="danger" className="mt-4" onClick={requestNow} disabled={dispatching}>
                <Siren size={16} /> {dispatching ? "Dispatching..." : "Request Service Now"}
              </Button>

              <div className="mt-6 space-y-3">
                <p className="text-sm font-semibold inline-flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-brand-600" /> Nearby verified technicians
                </p>
                {emergencyProviders.map((p) => (
                  <ProviderCard
                    key={p.id}
                    provider={p}
                    profileHref={`/customer/provider/${p.id}`}
                    bookHref={`/customer/booking/confirm?providerId=${p.id}`}
                    showSaveButton={false}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
