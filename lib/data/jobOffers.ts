import { JobRequestOffer } from "@/lib/types";

// Incoming job offers shown on the provider dashboard before they're
// accepted into a real Booking. Demo-only queue, not tied to bookings.ts.
export const jobOffers: JobRequestOffer[] = [
  {
    id: "jo1",
    bookingId: "bk19",
    categoryId: "ev",
    serviceLabel: "EV electrical troubleshooting",
    distanceKm: 4.2,
    customerLabel: "Fleet customer",
    preferredTime: "Now",
    estimatedValueMin: 1500,
    estimatedValueMax: 2500,
  },
  {
    id: "jo2",
    bookingId: "bk9",
    categoryId: "industrial",
    serviceLabel: "Industrial motor maintenance",
    distanceKm: 6.8,
    customerLabel: "Manoj Kumar",
    preferredTime: "Tomorrow, 10:00 AM",
    estimatedValueMin: 2000,
    estimatedValueMax: 5000,
  },
];
