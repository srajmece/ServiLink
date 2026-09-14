import { Review } from "@/lib/types";
import { bookings } from "@/lib/data/bookings";
import { getCustomer } from "@/lib/data/customers";

export const reviews: Review[] = bookings
  .filter((b) => b.rating && b.providerId)
  .map((b, i) => ({
    id: `rv${i + 1}`,
    bookingId: b.id,
    customerId: b.customerId,
    customerName: getCustomer(b.customerId)?.name ?? "Customer",
    providerId: b.providerId as string,
    rating: b.rating as number,
    comment: b.reviewComment ?? "",
    date: b.createdAt,
    flagged: b.rating! <= 2,
  }));

export function reviewsForProvider(providerId: string): Review[] {
  return reviews.filter((r) => r.providerId === providerId);
}
