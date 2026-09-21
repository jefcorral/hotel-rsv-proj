# Hotel Reservation System — Tech Stack & Plan

## Project Scope

A reservation platform for a **single hotel**. Guests can search availability, view rooms, book stays, and manage bookings. Hotel staff can manage rooms, availability, bookings, and policies through an admin dashboard.

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Next.js 15 (App Router) + TypeScript | Unified frontend + backend in one repo; SSR for SEO; shared types. |
| **Styling** | Tailwind CSS + shadcn/ui | Fast, consistent, accessible UI components. |
| **Database** | PostgreSQL | Relational data: rooms, availability, bookings, payments. |
| **ORM** | Prisma | Type-safe schema, migrations, and queries. |
| **Auth** | NextAuth.js or Clerk | Role-based auth for guests and hotel staff. |
| **Payments** | Stripe | Secure card payments, refunds, invoices. |
| **Email** | Resend | Booking confirmations, reminders, cancellations. |
| **State/Data** | TanStack Query + Zustand | Server state caching + lightweight client state. |
| **Deployment** | Vercel + Neon | Vercel for app, Neon for managed Postgres. |

## Core Entities

- `User` — guest or hotel staff
- `Hotel` — single hotel profile
- `RoomType` — categories of rooms (Standard, Deluxe, Suite, etc.)
- `Room` — individual physical rooms
- `Availability` — nightly inventory and price overrides
- `Booking` — reservation record with status and dates
- `Payment` — payment record linked to Stripe
- `Review` — guest review after stay

## Core Features

### Guest Flow
1. Browse hotel homepage and amenities
2. Search room availability by dates and guests
3. View room details and select room
4. Enter guest details and proceed to checkout
5. Pay via Stripe
6. Receive confirmation email
7. View and manage bookings in guest dashboard
8. Cancel or modify bookings per policy

### Admin Flow
1. Dashboard with occupancy, revenue, and arrivals
2. Manage room types and individual rooms
3. Set availability and price overrides
4. View and manage bookings
5. Manage guest records
6. Configure hotel policies and settings

## Implementation Plan

1. **Foundation** — project setup, Prisma schema, auth
2. **Public pages** — homepage, search, hotel detail, room detail
3. **Booking engine** — availability check, booking creation, no double-booking
4. **Payments** — Stripe integration and webhooks
5. **Guest dashboard** — booking history, cancellation, modification
6. **Admin dashboard** — management tools and reports
7. **Notifications** — Resend emails
8. **Polish** — SEO, responsive design, error handling, deployment

## Key Business Rules

- All dates stored in UTC, displayed in hotel local time.
- Availability checked inside a Prisma transaction.
- Short-term inventory lock during Stripe checkout to prevent double-booking.
- Cancellation and refund rules defined per hotel policy.
- No raw card data ever stored; use Stripe Elements/Checkout.
