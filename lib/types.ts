// Core domain types for the ServiLink prototype.
// NOTE: This is a frontend-only demo. All data below is mock/fictional and
// structured to make a future swap to real APIs (auth, DB, maps, payments,
// notifications, chat) straightforward — see lib/data/*.ts for the seams.

export type AccountType = "individual" | "business";

export type CustomerId = string;
export type ProviderId = string;
export type BookingId = string;
export type CategoryId = string;

export interface ServiceCategory {
  id: CategoryId;
  name: string;
  icon: string; // lucide icon name
  emoji: string;
  description: string;
  featured: boolean;
  subcategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  categoryId: CategoryId;
  name: string;
  problems: ProblemType[];
}

export interface ProblemType {
  id: string;
  label: string;
  requiredSkills: string[];
}

export type VerificationStatus = "verified" | "pending" | "rejected" | "suspended";

export interface VerificationChecks {
  mobileVerified: boolean;
  identityVerified: boolean;
  skillVerified: boolean;
  certificateVerified: boolean;
  experienceVerified: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: number;
  status: VerificationStatus;
  fileName: string;
}

export interface PortfolioItem {
  id: string;
  caption: string;
  image: string; // emoji/gradient placeholder key
}

export interface Review {
  id: string;
  bookingId: BookingId;
  customerId: CustomerId;
  customerName: string;
  providerId: ProviderId;
  rating: number; // 1-5
  comment: string;
  date: string;
  flagged?: boolean;
  providerReply?: string;
}

export interface Provider {
  id: ProviderId;
  name: string;
  avatar: string; // initials-based placeholder
  title: string;
  categories: CategoryId[];
  skills: string[];
  languages: string[];
  yearsExperience: number;
  rating: number;
  completedJobs: number;
  serviceArea: string[];
  city: string;
  distanceKm: number; // relative to current demo customer location
  startingPrice: number;
  availability: "available" | "busy" | "offline";
  emergencyAvailable: boolean;
  status: VerificationStatus;
  verification: VerificationChecks;
  certifications: Certification[];
  portfolio: PortfolioItem[];
  workingHours: string;
  serviceRadiusKm: number;
  phone: string;
  joinedDate: string;
  bio: string;
  earnings: {
    today: number;
    week: number;
    month: number;
    pendingPayout: number;
    withdrawable: number;
    commissionRate: number; // percentage
  };
}

export interface Address {
  id: string;
  label: string;
  line1: string;
  area: string;
  city: string;
  pincode: string;
  isDefault?: boolean;
}

export interface Customer {
  id: CustomerId;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  accountType: AccountType;
  businessName?: string;
  addresses: Address[];
  savedProviderIds: ProviderId[];
  joinedDate: string;
}

export type BookingStatus =
  | "requested"
  | "provider_assigned"
  | "travelling"
  | "arrived"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "disputed";

export type ServicePricingType = "fixed" | "quote";
export type ServiceTiming = "now" | "scheduled";

export interface BookingStatusEvent {
  status: BookingStatus;
  label: string;
  timestamp: string;
  done: boolean;
}

export interface Booking {
  id: BookingId;
  customerId: CustomerId;
  providerId: ProviderId | null;
  categoryId: CategoryId;
  problem: string;
  description: string;
  address: string;
  city: string;
  timing: ServiceTiming;
  scheduledFor?: string;
  pricingType: ServicePricingType;
  status: BookingStatus;
  createdAt: string;
  estimatedCostMin: number;
  estimatedCostMax: number;
  platformFee: number;
  total: number;
  isEmergency: boolean;
  matchScore?: number;
  timeline: BookingStatusEvent[];
  rating?: number;
  reviewComment?: string;
  paymentStatus: "pending" | "paid" | "refunded";
  isBusiness?: boolean;
  quotations?: Quotation[];
}

export interface Quotation {
  id: string;
  providerId: ProviderId;
  bookingId: BookingId;
  price: number;
  estimatedTime: string;
  scopeOfWork: string;
  materials: string;
  warranty: string;
  availability: string;
  submittedAt: string;
  status: "pending" | "accepted" | "rejected";
}

export interface Complaint {
  id: string;
  bookingId: BookingId;
  customerId: CustomerId;
  providerId: ProviderId | null;
  subject: string;
  description: string;
  status: "open" | "in_progress" | "resolved";
  createdAt: string;
  priority: "low" | "medium" | "high";
}

export interface Transaction {
  id: string;
  bookingId: BookingId;
  customerId: CustomerId;
  providerId: ProviderId | null;
  amount: number;
  commission: number;
  providerPayout: number;
  status: "completed" | "pending" | "refunded";
  date: string;
  method: "card" | "upi" | "cash" | "wallet";
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  type: "booking" | "promo" | "system" | "payment";
}

export interface JobRequestOffer {
  id: string;
  bookingId: BookingId;
  categoryId: CategoryId;
  serviceLabel: string;
  distanceKm: number;
  customerLabel: string;
  preferredTime: string;
  estimatedValueMin: number;
  estimatedValueMax: number;
}
