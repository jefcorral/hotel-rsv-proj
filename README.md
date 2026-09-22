# hotel-rsv-proj

A unified full-stack reservation system for a single hotel.

## Project Type

Single-hotel web reservation platform (not a marketplace).

## Architecture

- **Unified monorepo**: Next.js handles both the React frontend and API routes.
- **Tech stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Prisma, PostgreSQL, Stripe, NextAuth.js/Clerk, Resend.

## Documentation

- [`docs/tech-stack-and-plan.md`](docs/tech-stack-and-plan.md) — architecture, features, and implementation plan
- [`docs/google-stitch-design-prompts.md`](docs/google-stitch-design-prompts.md) — Google Stitch design prompts for each screen

## Status

Initial planning and design phase.

## Getting Started

1. Copy `.env.example` to `.env` and fill in your database credentials.
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```
4. Run migrations and seed the database:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
