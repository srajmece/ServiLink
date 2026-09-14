import { Transaction } from "@/lib/types";
import { bookings } from "@/lib/data/bookings";

const methods: Transaction["method"][] = ["upi", "card", "cash", "wallet"];

export const transactions: Transaction[] = bookings
  .filter((b) => b.paymentStatus !== "pending" || b.status === "completed")
  .map((b, i) => ({
    id: `tx${i + 1}`,
    bookingId: b.id,
    customerId: b.customerId,
    providerId: b.providerId,
    amount: b.total,
    commission: Math.round(b.platformFee),
    providerPayout: b.total - b.platformFee,
    status: b.paymentStatus === "refunded" ? "refunded" : b.status === "completed" ? "completed" : "pending",
    date: b.createdAt,
    method: methods[i % methods.length],
  }));

export function transactionsForProvider(providerId: string): Transaction[] {
  return transactions.filter((t) => t.providerId === providerId);
}
