import { NotificationItem } from "@/lib/types";

export const customerNotifications: NotificationItem[] = [
  { id: "n1", title: "Technician on the way", body: "Suresh Kumar is heading to your location for the vehicle breakdown request.", timestamp: "2026-09-14T10:25:00+05:30", read: false, type: "booking" },
  { id: "n2", title: "Booking confirmed", body: "Your AC repair with Karthik Subramaniam is confirmed for today.", timestamp: "2026-09-14T08:10:00+05:30", read: false, type: "booking" },
  { id: "n3", title: "Rate your recent service", body: "How was your appliance repair with Ramesh Babu?", timestamp: "2026-08-11T15:00:00+05:30", read: true, type: "booking" },
  { id: "n4", title: "Payment successful", body: "₹377 paid for booking bk1 via UPI.", timestamp: "2026-08-02T10:10:00+05:30", read: true, type: "payment" },
  { id: "n5", title: "New: EV services now live", body: "Book verified EV technicians for battery and motor issues.", timestamp: "2026-07-01T09:00:00+05:30", read: true, type: "promo" },
];

export const providerNotifications: NotificationItem[] = [
  { id: "pn1", title: "New job request", body: "EV electrical troubleshooting request 4.2 km away.", timestamp: "2026-09-14T11:00:00+05:30", read: false, type: "booking" },
  { id: "pn2", title: "Payout processed", body: "₹14,200 has been credited to your linked bank account.", timestamp: "2026-09-08T09:00:00+05:30", read: true, type: "payment" },
  { id: "pn3", title: "Certificate verified", body: "Your EV Systems Technician certificate has been verified.", timestamp: "2026-08-20T12:00:00+05:30", read: true, type: "system" },
  { id: "pn4", title: "New 5-star review", body: "Priya Venkatesan rated your service 5 stars.", timestamp: "2026-08-02T14:00:00+05:30", read: true, type: "booking" },
];
