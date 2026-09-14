import { Booking, BookingStatus, BookingStatusEvent } from "@/lib/types";

const STEP_LABELS: { status: BookingStatus; label: string }[] = [
  { status: "requested", label: "Request Created" },
  { status: "provider_assigned", label: "Provider Assigned" },
  { status: "travelling", label: "Technician Travelling" },
  { status: "arrived", label: "Technician Arrived" },
  { status: "in_progress", label: "Service Started" },
  { status: "completed", label: "Service Completed" },
];

const ORDER: BookingStatus[] = ["requested", "provider_assigned", "travelling", "arrived", "in_progress", "completed"];

export function buildTimeline(status: BookingStatus, createdAt: string): BookingStatusEvent[] {
  const currentIndex = status === "cancelled" || status === "disputed" ? 1 : ORDER.indexOf(status);
  const base = new Date(createdAt).getTime();
  return STEP_LABELS.map((step, i) => ({
    status: step.status,
    label: step.label,
    timestamp: new Date(base + i * 22 * 60 * 1000).toISOString(),
    done: i <= currentIndex,
  }));
}

interface RawBooking {
  id: string;
  customerId: string;
  providerId: string | null;
  categoryId: string;
  problem: string;
  description: string;
  address: string;
  city?: string;
  timing: "now" | "scheduled";
  scheduledFor?: string;
  pricingType: "fixed" | "quote";
  status: BookingStatus;
  createdAt: string;
  costMin: number;
  costMax: number;
  isEmergency?: boolean;
  matchScore?: number;
  rating?: number;
  reviewComment?: string;
  isBusiness?: boolean;
}

const raw: RawBooking[] = [
  { id: "bk1", customerId: "cu1", providerId: "p1", categoryId: "electrical", problem: "Power failure", description: "Partial power failure in the kitchen and hall since morning.", address: "12, Second Main Road, Anna Nagar", timing: "now", pricingType: "fixed", status: "completed", createdAt: "2026-08-02T09:12:00+05:30", costMin: 299, costMax: 499, matchScore: 94, rating: 5, reviewComment: "Arun was quick and explained the issue clearly. Fixed in 40 minutes." },
  { id: "bk2", customerId: "cu1", providerId: "p2", categoryId: "electrical", problem: "Fan installation", description: "Need 2 ceiling fans installed in bedrooms.", address: "12, Second Main Road, Anna Nagar", timing: "scheduled", scheduledFor: "2026-09-18T11:00:00+05:30", pricingType: "fixed", status: "provider_assigned", createdAt: "2026-09-13T18:40:00+05:30", costMin: 249, costMax: 399, matchScore: 88 },
  { id: "bk3", customerId: "cu2", providerId: "p4", categoryId: "ac-hvac", problem: "AC not cooling", description: "Split AC in living room stopped cooling, might need gas refill.", address: "45 Lattice Bridge Rd, Adyar", timing: "now", pricingType: "fixed", status: "in_progress", createdAt: "2026-09-14T08:05:00+05:30", costMin: 499, costMax: 899, matchScore: 91 },
  { id: "bk4", customerId: "cu3", providerId: "p6", categoryId: "automotive", problem: "Vehicle breakdown", description: "Car won't start, suspect battery. Stuck near Velachery signal.", address: "7 Velachery Main Rd, Velachery", timing: "now", pricingType: "fixed", status: "travelling", createdAt: "2026-09-14T10:20:00+05:30", costMin: 299, costMax: 699, isEmergency: true, matchScore: 96 },
  { id: "bk5", customerId: "cu4", providerId: "p7", categoryId: "commercial-vehicles", problem: "Truck breakdown", description: "Delivery truck brake issue on OMR, fleet #TN09-4521.", address: "Plot 22, Thoraipakkam, OMR", timing: "now", pricingType: "quote", status: "arrived", createdAt: "2026-09-14T07:50:00+05:30", costMin: 1500, costMax: 3500, isEmergency: true, matchScore: 89, isBusiness: true },
  { id: "bk6", customerId: "cu4", providerId: "p8", categoryId: "ev", problem: "Motor issue", description: "EV delivery van showing motor fault code, needs diagnostics.", address: "Plot 22, Thoraipakkam, OMR", timing: "now", pricingType: "quote", status: "completed", createdAt: "2026-08-28T14:00:00+05:30", costMin: 1500, costMax: 2500, matchScore: 93, rating: 4, reviewComment: "Resolved the fault but took a bit longer than estimated.", isBusiness: true },
  { id: "bk7", customerId: "cu5", providerId: "p3", categoryId: "plumbing", problem: "Leaking pipe / tap", description: "Kitchen sink pipe leaking under the counter.", address: "18 GST Road, Tambaram", timing: "now", pricingType: "fixed", status: "completed", createdAt: "2026-07-19T16:30:00+05:30", costMin: 199, costMax: 349, matchScore: 90, rating: 5, reviewComment: "Neat work, cleaned up after finishing." },
  { id: "bk8", customerId: "cu6", providerId: "p11", categoryId: "home", problem: "Carpentry / furniture repair", description: "Wardrobe door hinge broken, needs replacement.", address: "3rd Cross Street, Porur", timing: "scheduled", scheduledFor: "2026-09-16T15:00:00+05:30", pricingType: "fixed", status: "requested", createdAt: "2026-09-14T09:00:00+05:30", costMin: 249, costMax: 399, matchScore: 82 },
  { id: "bk9", customerId: "cu7", providerId: "p9", categoryId: "industrial", problem: "Motor maintenance", description: "Industrial motor overheating on the production line.", address: "Guindy Industrial Estate Rd, Guindy", timing: "scheduled", scheduledFor: "2026-09-15T10:00:00+05:30", pricingType: "quote", status: "provider_assigned", createdAt: "2026-09-13T11:00:00+05:30", costMin: 2000, costMax: 5000, matchScore: 97 },
  { id: "bk10", customerId: "cu8", providerId: null, categoryId: "electrical", problem: "Control panel issue", description: "Common area DB panel tripping frequently across the building.", address: "Greenfield Apartments, Velachery", timing: "now", pricingType: "quote", status: "requested", createdAt: "2026-09-14T09:40:00+05:30", costMin: 999, costMax: 2499, isBusiness: true },
  { id: "bk11", customerId: "cu9", providerId: "p5", categoryId: "appliance", problem: "Refrigerator issue", description: "Fridge not cooling properly, making a loud noise.", address: "Ambattur Estate Rd, Ambattur", timing: "now", pricingType: "fixed", status: "completed", createdAt: "2026-08-11T13:00:00+05:30", costMin: 249, costMax: 499, matchScore: 85, rating: 4, reviewComment: "Fixed the compressor issue, working fine now." },
  { id: "bk12", customerId: "cu10", providerId: "p8", categoryId: "ev", problem: "Charging issue", description: "EV scooter not charging past 40%.", address: "Sholinganallur OMR, OMR", timing: "now", pricingType: "fixed", status: "completed", createdAt: "2026-06-30T17:20:00+05:30", costMin: 399, costMax: 799, matchScore: 92, rating: 5, reviewComment: "Very knowledgeable about EV batteries." },
  { id: "bk13", customerId: "cu2", providerId: "p4", categoryId: "ac-hvac", problem: "General service / cleaning", description: "Annual AC service for 2 split units.", address: "45 Lattice Bridge Rd, Adyar", timing: "scheduled", scheduledFor: "2026-05-14T10:00:00+05:30", pricingType: "fixed", status: "completed", createdAt: "2026-05-10T09:00:00+05:30", costMin: 349, costMax: 349, matchScore: 90, rating: 5, reviewComment: "On time and thorough servicing." },
  { id: "bk14", customerId: "cu3", providerId: "p6", categoryId: "automotive", problem: "Periodic servicing", description: "General car servicing before a long trip.", address: "7 Velachery Main Rd, Velachery", timing: "scheduled", scheduledFor: "2026-04-02T09:00:00+05:30", pricingType: "fixed", status: "cancelled", createdAt: "2026-04-01T08:00:00+05:30", costMin: 599, costMax: 1299 },
  { id: "bk15", customerId: "cu1", providerId: "p1", categoryId: "electrical", problem: "Switch / socket repair", description: "Two switchboards sparking near the balcony.", address: "12, Second Main Road, Anna Nagar", timing: "now", pricingType: "fixed", status: "disputed", createdAt: "2026-03-22T12:00:00+05:30", costMin: 249, costMax: 399, rating: 2, reviewComment: "Issue returned within a week of the repair." },
  { id: "bk16", customerId: "cu5", providerId: "p3", categoryId: "plumbing", problem: "Blocked drain", description: "Bathroom drain blocked, water backing up.", address: "18 GST Road, Tambaram", timing: "now", pricingType: "fixed", status: "completed", createdAt: "2026-07-02T18:00:00+05:30", costMin: 199, costMax: 349, matchScore: 88, rating: 4, reviewComment: "Sorted quickly, fair pricing." },
  { id: "bk17", customerId: "cu6", providerId: "p14", categoryId: "electrical", problem: "Wiring issue", description: "Loose wiring behind the TV unit.", address: "3rd Cross Street, Porur", timing: "now", pricingType: "fixed", status: "cancelled", createdAt: "2026-02-18T10:00:00+05:30", costMin: 199, costMax: 349 },
  { id: "bk18", customerId: "cu7", providerId: "p9", categoryId: "industrial", problem: "Machine maintenance", description: "Quarterly maintenance for CNC machine unit.", address: "Guindy Industrial Estate Rd, Guindy", timing: "scheduled", scheduledFor: "2026-06-05T09:00:00+05:30", pricingType: "quote", status: "completed", createdAt: "2026-06-01T09:00:00+05:30", costMin: 3200, costMax: 3200, matchScore: 95, rating: 5, reviewComment: "Excellent, thorough report provided after service." },
  { id: "bk19", customerId: "cu10", providerId: "p8", categoryId: "ev", problem: "Battery system issue", description: "Battery drains fast overnight even when not in use.", address: "Sholinganallur OMR, OMR", timing: "now", pricingType: "fixed", status: "in_progress", createdAt: "2026-09-14T11:00:00+05:30", costMin: 399, costMax: 899, matchScore: 90 },
  { id: "bk20", customerId: "cu9", providerId: null, categoryId: "appliance", problem: "Microwave / kitchen appliance", description: "Microwave turntable not rotating, making a grinding noise.", address: "Ambattur Estate Rd, Ambattur", timing: "now", pricingType: "fixed", status: "requested", createdAt: "2026-09-14T10:55:00+05:30", costMin: 179, costMax: 299 },
];

function platformFeeFor(costMax: number): number {
  return Math.round(costMax * 0.08);
}

export const bookings: Booking[] = raw.map((r) => {
  const platformFee = platformFeeFor(r.costMax);
  return {
    id: r.id,
    customerId: r.customerId,
    providerId: r.providerId,
    categoryId: r.categoryId,
    problem: r.problem,
    description: r.description,
    address: r.address,
    city: r.city ?? "Chennai",
    timing: r.timing,
    scheduledFor: r.scheduledFor,
    pricingType: r.pricingType,
    status: r.status,
    createdAt: r.createdAt,
    estimatedCostMin: r.costMin,
    estimatedCostMax: r.costMax,
    platformFee,
    total: r.costMax + platformFee,
    isEmergency: !!r.isEmergency,
    matchScore: r.matchScore,
    timeline: buildTimeline(r.status, r.createdAt),
    rating: r.rating,
    reviewComment: r.reviewComment,
    paymentStatus: r.status === "completed" ? "paid" : r.status === "disputed" ? "refunded" : "pending",
    isBusiness: r.isBusiness,
  };
});

export function getBooking(id: string): Booking | undefined {
  return bookings.find((b) => b.id === id);
}

export function bookingsForCustomer(customerId: string): Booking[] {
  return bookings.filter((b) => b.customerId === customerId).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function bookingsForProvider(providerId: string): Booking[] {
  return bookings.filter((b) => b.providerId === providerId).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
