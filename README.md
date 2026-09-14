# ServiLink

A clickable prototype for a modern skilled-service marketplace — connecting customers and businesses with verified skilled professionals (electricians, plumbers, AC technicians, mechanics, EV and industrial technicians, and more) through skill, location, availability and trust.

Built with Next.js (App Router), TypeScript and Tailwind CSS. All data is fictional demo data (10 customers, 15 providers, 20 bookings, 8+ service categories) centered on Chennai, Tamil Nadu.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's in here

- **Public** — landing page, login, registration (individual/business/provider), service categories, about/how it works.
- **Customer** (`/customer`) — dashboard, guided service request flow (category → describe → location/timing/pricing → smart-matched providers), provider profiles, booking confirmation, live booking status timeline, booking history, ratings, an emergency-dispatch flow, and an account hub (addresses, payments, saved providers, reviews, notifications, support, complaints, settings).
- **Provider** (`/provider`) — onboarding, a verification centre (identity/skill/certificate/experience checks), a dashboard with incoming job requests, job details/active-job/completion flow, earnings, schedule, profile and skills & certificates management.
- **Admin** (`/admin`) — an operations console with KPIs and analytics charts, customer/provider management, a detailed provider-verification queue, service/category management, booking management, payments, reviews, complaints, locations and settings.

## Architecture notes

- `lib/data/*` holds all mock/demo data, structured so it can later be swapped for real API calls (auth, database, maps, payments, notifications, chat).
- `lib/store.tsx` and `lib/bookingDraft.tsx` are lightweight client-side state providers (backed by `localStorage`/`sessionStorage`) that simulate booking creation, job accept/decline and status progression for this prototype — there is no real backend.
- `components/ui`, `components/marketplace`, `components/layout` and `components/charts` hold the reusable design-system components (cards, badges, tables, the booking timeline, KPI cards, charts, navigation shells) shared across all three experiences.
- The "match score" shown on provider cards (`lib/match.ts`) is an illustrative MVP heuristic, not a real ranking algorithm.

This is a frontend prototype only — payment, auth and notification integrations are placeholders by design.
