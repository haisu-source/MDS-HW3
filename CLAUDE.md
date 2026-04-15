# LifeStyling — Personal Growth App

## Overview
A full-stack personal growth app built with Next.js 16 + Tailwind CSS v4. Users can sign up, reflect on their mood, track books (with Open Library search), build micro-habits, and express gratitude.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 with custom nature-themed color palette
- **Auth:** Clerk (sign up, sign in, sign out)
- **Database:** Supabase (PostgreSQL with Row Level Security)
- **External API:** Open Library (book search, no key required)
- **Font:** Nunito (Google Fonts)

## Pages
- `/` — Landing hero (signed out) / Dashboard (signed in)
- `/sign-in` — Clerk sign-in page
- `/sign-up` — Clerk sign-up page
- `/reflect` — Mood reflection with nature elements, journal form, history
- `/reflect/[date]` — Day detail for a specific date's reflections
- `/books` — Book search (Open Library) + reading log with status filters
- `/books/[id]` — Individual book detail with personal connection
- `/habits` — Habit tracker with identity-based suggestions, streaks
- `/harmony` — Emotional harmony, gratitude garden, connections

## Data Model
All tables use RLS with Clerk JWT `sub` claim as `user_id`.

- **reflections** — mood journal entries (mood, intensity, journal text, optional gratitude)
- **books** — reading list with status tracking, cover images from Open Library
- **habits** — micro-habits with identity tags
- **habit_completions** — daily check-offs for habits (separate table, linked by habit_id)
- **gratitude_entries** — gratitude messages with emotion tags
- **connections** — emotional connections with harmony levels
- **user_identities** — selected identity tags per user (for habit suggestions)

## Style
- Warm earth tones: cream, peach, terracotta, sage, warm brown
- Font: Nunito (cozy, rounded)
- Nature elements for mood: seedling, herb, blossom, ocean, sun, fallen-leaf, rainbow, storm, snow, fire, mushroom, mountain
- Rounded cards, pill buttons, cozy feel

## Key Conventions
- Next.js 16: `params` are Promises — use `await` in server components, `use()` in client components
- Tailwind v4: theme via `@theme` in globals.css
- All pages reading context must be `"use client"`
- Types in `src/lib/types.ts`, context in `src/context/AppContext.tsx`
- API routes in `src/app/api/` — all auth-protected via Clerk
- Supabase client in `src/lib/supabase.ts`

## Environment Variables
See `.env.local.example` for required keys:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
