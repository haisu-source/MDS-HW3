# LifeStyling — Personal Growth App

## Overview
A cozy personal growth tool combining mood tracking (nature elements), reading log, and habit building. Built with Next.js 16 App Router + Tailwind CSS v4.

## Pages
- `/` — Home Dashboard (greeting, today's reflection, habit streaks, currently reading)
- `/reflect` — Mood reflection with nature elements, journal form, history
- `/reflect/[date]` — Day detail for a specific date's reflections
- `/books` — Reading log with add form, shelf view, status filters
- `/books/[id]` — Individual book detail with personal connection
- `/habits` — Habit tracker with identity-based suggestions, streaks
- `/harmony` — Emotional harmony, gratitude garden, connections

## Data Model
All client-side via React Context (useState). No database, no localStorage.
- Reflection: mood (nature element), intensity, journal, gratitude
- Book: title, author, genre, status, rating, reasonToRead, personalConnection
- Habit: name, description, identityTags, completedDates (streaks)
- GratitudeEntry: personOrThing, message, emotion
- EmotionalConnection: name, relationshipType, harmonyLevel

## Style
- Warm earth tones: cream, peach, terracotta, sage, warm brown
- Font: Nunito (cozy, rounded)
- Nature elements for mood: 🌱🌿🌸🌊🌤️🍂🌈⛈️❄️🔥🍄🏔️
- Rounded cards, pill buttons, cozy feel

## Key Conventions
- Next.js 16: `params` are Promises — use `await` in server components, `use()` in client components
- Tailwind v4: theme via `@theme` in globals.css
- All pages reading context must be `"use client"`
- Types in `src/lib/types.ts`, context in `src/context/AppContext.tsx`
