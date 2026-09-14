import { CustomerShell } from "@/components/layout/CustomerShell";
import { BookingDraftProvider } from "@/lib/bookingDraft";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <BookingDraftProvider>
      <CustomerShell>{children}</CustomerShell>
    </BookingDraftProvider>
  );
}
