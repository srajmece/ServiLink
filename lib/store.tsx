"use client";

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { Booking, BookingStatus } from "@/lib/types";
import { bookings as seedBookings, buildTimeline } from "@/lib/data/bookings";
import { jobOffers as seedJobOffers } from "@/lib/data/jobOffers";
import { JobRequestOffer } from "@/lib/types";

const STORAGE_KEY = "servilink_demo_state_v1";

interface PersistedState {
  extraBookings: Booking[];
  bookingOverrides: Record<string, Partial<Booking>>;
  providerOnline: boolean;
  pendingJobOffers: JobRequestOffer[];
  savedProviderIds: string[];
  readNotificationIds: string[];
}

const defaultState: PersistedState = {
  extraBookings: [],
  bookingOverrides: {},
  providerOnline: true,
  pendingJobOffers: seedJobOffers,
  savedProviderIds: ["p1", "p2"],
  readNotificationIds: [],
};

interface AppStateContextValue extends PersistedState {
  allBookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: BookingStatus, createdAt: string) => void;
  markBookingPaid: (id: string) => void;
  rateBooking: (id: string, rating: number, comment: string) => void;
  setProviderOnline: (online: boolean) => void;
  acceptJobOffer: (offerId: string) => void;
  declineJobOffer: (offerId: string) => void;
  toggleSavedProvider: (providerId: string) => void;
  markNotificationRead: (id: string) => void;
  resetDemoData: () => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistedState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
      if (raw) setState({ ...defaultState, ...JSON.parse(raw) });
    } catch {
      // ignore malformed local storage in the demo
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage may be unavailable (private browsing) — safe to ignore in a demo
    }
  }, [state, hydrated]);

  const addBooking = useCallback((booking: Booking) => {
    setState((s) => ({ ...s, extraBookings: [booking, ...s.extraBookings] }));
  }, []);

  const updateBookingStatus = useCallback((id: string, status: BookingStatus, createdAt: string) => {
    setState((s) => ({
      ...s,
      bookingOverrides: {
        ...s.bookingOverrides,
        [id]: { ...s.bookingOverrides[id], status, timeline: buildTimeline(status, createdAt) },
      },
    }));
  }, []);

  const markBookingPaid = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      bookingOverrides: { ...s.bookingOverrides, [id]: { ...s.bookingOverrides[id], paymentStatus: "paid" } },
    }));
  }, []);

  const rateBooking = useCallback((id: string, rating: number, comment: string) => {
    setState((s) => ({
      ...s,
      bookingOverrides: { ...s.bookingOverrides, [id]: { ...s.bookingOverrides[id], rating, reviewComment: comment } },
    }));
  }, []);

  const setProviderOnline = useCallback((online: boolean) => {
    setState((s) => ({ ...s, providerOnline: online }));
  }, []);

  const acceptJobOffer = useCallback((offerId: string) => {
    setState((s) => ({ ...s, pendingJobOffers: s.pendingJobOffers.filter((o) => o.id !== offerId) }));
  }, []);

  const declineJobOffer = useCallback((offerId: string) => {
    setState((s) => ({ ...s, pendingJobOffers: s.pendingJobOffers.filter((o) => o.id !== offerId) }));
  }, []);

  const toggleSavedProvider = useCallback((providerId: string) => {
    setState((s) => ({
      ...s,
      savedProviderIds: s.savedProviderIds.includes(providerId)
        ? s.savedProviderIds.filter((id) => id !== providerId)
        : [...s.savedProviderIds, providerId],
    }));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setState((s) => (s.readNotificationIds.includes(id) ? s : { ...s, readNotificationIds: [...s.readNotificationIds, id] }));
  }, []);

  const resetDemoData = useCallback(() => setState(defaultState), []);

  const allBookings = useMemo(() => {
    const merged = [...state.extraBookings, ...seedBookings].map((b) => {
      const override = state.bookingOverrides[b.id];
      return override ? { ...b, ...override } : b;
    });
    return merged;
  }, [state.extraBookings, state.bookingOverrides]);

  const value: AppStateContextValue = {
    ...state,
    allBookings,
    addBooking,
    updateBookingStatus,
    markBookingPaid,
    rateBooking,
    setProviderOnline,
    acceptJobOffer,
    declineJobOffer,
    toggleSavedProvider,
    markNotificationRead,
    resetDemoData,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
