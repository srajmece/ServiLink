"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { AccountType, ServicePricingType, ServiceTiming } from "@/lib/types";

const STORAGE_KEY = "servilink_booking_draft_v1";

export interface BookingDraft {
  categoryId: string | null;
  problemId: string | null;
  problemLabel: string | null;
  requiredSkills: string[];
  description: string;
  attachments: string[];
  voiceNoteAdded: boolean;
  addressId: string | null;
  addressText: string | null;
  timing: ServiceTiming;
  scheduledFor: string | null;
  pricingType: ServicePricingType;
  isEmergency: boolean;
  accountType: AccountType;
}

const emptyDraft: BookingDraft = {
  categoryId: null,
  problemId: null,
  problemLabel: null,
  requiredSkills: [],
  description: "",
  attachments: [],
  voiceNoteAdded: false,
  addressId: null,
  addressText: null,
  timing: "now",
  scheduledFor: null,
  pricingType: "fixed",
  isEmergency: false,
  accountType: "individual",
};

interface Ctx {
  draft: BookingDraft;
  update: (patch: Partial<BookingDraft>) => void;
  reset: () => void;
}

const BookingDraftContext = createContext<Ctx | null>(null);

export function BookingDraftProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<BookingDraft>(emptyDraft);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from sessionStorage on mount
      if (raw) setDraft({ ...emptyDraft, ...JSON.parse(raw) });
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // ignore
    }
  }, [draft, hydrated]);

  const update = useCallback((patch: Partial<BookingDraft>) => setDraft((d) => ({ ...d, ...patch })), []);
  const reset = useCallback(() => setDraft(emptyDraft), []);

  return <BookingDraftContext.Provider value={{ draft, update, reset }}>{children}</BookingDraftContext.Provider>;
}

export function useBookingDraft() {
  const ctx = useContext(BookingDraftContext);
  if (!ctx) throw new Error("useBookingDraft must be used within BookingDraftProvider");
  return ctx;
}
