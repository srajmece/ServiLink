// Aggregated demo series for the admin analytics screens. All numbers are
// illustrative and computed by hand to look plausible against bookings.ts —
// not derived from a real analytics pipeline.

export const bookingsTrend = [
  { day: "Mon", bookings: 42, revenue: 38400 },
  { day: "Tue", bookings: 51, revenue: 46200 },
  { day: "Wed", bookings: 47, revenue: 41800 },
  { day: "Thu", bookings: 63, revenue: 58900 },
  { day: "Fri", bookings: 71, revenue: 67200 },
  { day: "Sat", bookings: 88, revenue: 81500 },
  { day: "Sun", bookings: 66, revenue: 60100 },
];

export const revenueTrend = [
  { month: "Apr", revenue: 612000, commission: 91800 },
  { month: "May", revenue: 684000, commission: 102600 },
  { month: "Jun", revenue: 731000, commission: 109650 },
  { month: "Jul", revenue: 798000, commission: 119700 },
  { month: "Aug", revenue: 862000, commission: 129300 },
  { month: "Sep", revenue: 540000, commission: 81000 },
];

export const providerGrowth = [
  { month: "Apr", providers: 210, verified: 178 },
  { month: "May", providers: 244, verified: 205 },
  { month: "Jun", providers: 279, verified: 238 },
  { month: "Jul", providers: 312, verified: 271 },
  { month: "Aug", providers: 356, verified: 309 },
  { month: "Sep", providers: 389, verified: 338 },
];

export const customerGrowth = [
  { month: "Apr", customers: 3200 },
  { month: "May", customers: 3850 },
  { month: "Jun", customers: 4460 },
  { month: "Jul", customers: 5290 },
  { month: "Aug", customers: 6120 },
  { month: "Sep", customers: 6840 },
];

export const categoryDemand = [
  { category: "Electrical", value: 28 },
  { category: "Plumbing", value: 16 },
  { category: "AC & HVAC", value: 19 },
  { category: "Appliance", value: 12 },
  { category: "Automotive", value: 11 },
  { category: "EV", value: 8 },
  { category: "Industrial", value: 6 },
];

export const adminKpis = {
  totalCustomers: 6840,
  activeProviders: 389,
  verifiedProviders: 338,
  jobsToday: 66,
  jobsCompleted: 5124,
  pendingJobs: 41,
  revenueThisMonth: 862000,
  platformCommission: 129300,
  openComplaints: 12,
  trends: {
    totalCustomers: 11.7,
    activeProviders: 9.3,
    verifiedProviders: 9.4,
    jobsToday: 6.2,
    jobsCompleted: 14.1,
    pendingJobs: -4.5,
    revenueThisMonth: 8.0,
    platformCommission: 8.0,
    openComplaints: -18.2,
  },
};

export const geographicActivity = [
  { area: "Anna Nagar", bookings: 132, providers: 24 },
  { area: "Adyar", bookings: 118, providers: 21 },
  { area: "Velachery", bookings: 146, providers: 27 },
  { area: "Tambaram", bookings: 96, providers: 18 },
  { area: "Porur", bookings: 88, providers: 15 },
  { area: "Guindy", bookings: 101, providers: 19 },
  { area: "OMR", bookings: 164, providers: 29 },
  { area: "Ambattur", bookings: 79, providers: 14 },
];
