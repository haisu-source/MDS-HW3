"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { getGreeting, getTodayString } from "@/lib/helpers";
import { getNatureElement } from "@/lib/natureElements";
import { useAuth, SignUpButton, SignInButton } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="text-center py-16">
        <span className="text-4xl mb-4 block animate-pulse">🌿</span>
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  return isSignedIn ? <Dashboard /> : <LandingHero />;
}

function LandingHero() {
  return (
    <div className="space-y-8 text-center py-12">
      <div>
        <span className="text-6xl mb-4 block">🌿</span>
        <h1 className="text-4xl font-bold text-bark mb-3">
          Welcome to LifeStyling
        </h1>
        <p className="text-lg text-muted max-w-md mx-auto">
          Reflect, read, build habits, and nurture your connections — one gentle day at a time.
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <SignUpButton mode="modal">
          <button className="bg-terracotta text-white rounded-full px-8 py-3 font-semibold hover:bg-terracotta-dark transition-colors text-lg">
            Get Started
          </button>
        </SignUpButton>
        <SignInButton mode="modal">
          <button className="bg-sand text-warm-brown rounded-full px-8 py-3 font-semibold hover:bg-sand-dark transition-colors text-lg">
            Sign In
          </button>
        </SignInButton>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-8">
        {[
          { icon: "🌱", label: "Reflect", desc: "Track your mood with nature" },
          { icon: "📖", label: "Books", desc: "Search & save your reading list" },
          { icon: "✨", label: "Habits", desc: "Build micro-habits" },
          { icon: "💛", label: "Harmony", desc: "Express gratitude" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-card border border-card-border rounded-2xl p-4 text-center"
          >
            <span className="text-2xl mb-2 block">{item.icon}</span>
            <p className="text-sm font-bold text-bark">{item.label}</p>
            <p className="text-xs text-muted mt-0.5">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  const greeting = getGreeting();
  const {
    loading,
    reflections,
    books,
    habits,
    gratitudeEntries,
    getHabitStreak,
  } = useApp();

  const today = getTodayString();
  const todayReflections = reflections.filter((r) => r.date === today);
  const latestReflection = todayReflections[0];
  const currentlyReading = books.filter((b) => b.status === "currently-reading");
  const latestGratitude = gratitudeEntries[0];

  const hasData = reflections.length > 0 || books.length > 0 || habits.length > 0;

  if (loading) {
    return (
      <div className="text-center py-16">
        <span className="text-4xl mb-4 block animate-pulse">🌿</span>
        <p className="text-muted">Loading your growth garden...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-8">
        <p className="text-lg text-muted mb-2">{greeting}</p>
        <h1 className="text-4xl font-bold text-bark mb-3">
          Welcome to your growth garden
        </h1>
        <p className="text-muted max-w-md mx-auto">
          Reflect, read, build habits, and nurture your connections — one gentle day at a time.
        </p>
      </div>

      {/* Today's Reflection */}
      <div className="bg-card border border-card-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-bark">🌱 Today&apos;s Reflection</h2>
          <Link href="/reflect" className="text-sm text-terracotta hover:text-terracotta-dark font-semibold transition-colors">
            {latestReflection ? "Reflect more →" : "Start reflecting →"}
          </Link>
        </div>
        {latestReflection ? (
          <div className="flex items-start gap-4">
            <span className="text-4xl">{getNatureElement(latestReflection.mood).emoji}</span>
            <div>
              <p className="font-semibold text-bark">{getNatureElement(latestReflection.mood).label}</p>
              <p className="text-sm text-muted mt-1 line-clamp-2">{latestReflection.journal}</p>
              {todayReflections.length > 1 && (
                <Link href={`/reflect/${today}`} className="text-xs text-terracotta mt-2 inline-block">
                  +{todayReflections.length - 1} more today
                </Link>
              )}
            </div>
          </div>
        ) : (
          <p className="text-muted">How are you feeling right now? Take a moment to check in with nature.</p>
        )}
      </div>

      {/* Habit Streaks + Currently Reading */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Habit Streaks */}
        <div className="bg-card border border-card-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-bark">✨ Habit Streaks</h2>
            <Link href="/habits" className="text-sm text-terracotta hover:text-terracotta-dark font-semibold transition-colors">
              {habits.length > 0 ? "View all →" : "Start habits →"}
            </Link>
          </div>
          {habits.length > 0 ? (
            <div className="space-y-2">
              {habits.slice(0, 4).map((habit) => {
                const streak = getHabitStreak(habit.id);
                return (
                  <div key={habit.id} className="flex items-center justify-between">
                    <span className="text-sm text-foreground truncate flex-1">{habit.name}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {streak.completedToday && <span className="text-xs">🌸</span>}
                      <span className="text-sm font-bold text-terracotta">{streak.currentStreak}</span>
                      <span className="text-xs text-muted">🔥</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted text-sm">Tiny steps build lasting change. Pick your first habit.</p>
          )}
        </div>

        {/* Currently Reading */}
        <div className="bg-card border border-card-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-bark">📖 Reading</h2>
            <Link href="/books" className="text-sm text-terracotta hover:text-terracotta-dark font-semibold transition-colors">
              {books.length > 0 ? "View shelf →" : "Add a book →"}
            </Link>
          </div>
          {currentlyReading.length > 0 ? (
            <div className="space-y-2">
              {currentlyReading.slice(0, 3).map((book) => (
                <Link
                  key={book.id}
                  href={`/books/${book.id}`}
                  className="block hover:bg-sand/50 -mx-2 px-2 py-1 rounded-lg transition-colors"
                >
                  <p className="text-sm font-semibold text-bark">{book.title}</p>
                  <p className="text-xs text-muted">{book.author}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted text-sm">Your shelf awaits. What will you read next?</p>
          )}
        </div>
      </div>

      {/* Harmony Pulse */}
      <div className="bg-card border border-card-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-bark">💛 Harmony</h2>
          <Link href="/harmony" className="text-sm text-terracotta hover:text-terracotta-dark font-semibold transition-colors">
            Gratitude garden →
          </Link>
        </div>
        {latestGratitude ? (
          <p className="text-sm text-foreground">
            Grateful for <span className="font-semibold">{latestGratitude.personOrThing}</span> — &quot;{latestGratitude.message.slice(0, 80)}{latestGratitude.message.length > 80 ? "..." : ""}&quot;
          </p>
        ) : (
          <p className="text-muted text-sm">Who or what are you grateful for today?</p>
        )}
      </div>

      {/* Quick Links (shown when no data yet) */}
      {!hasData && (
        <div className="grid grid-cols-2 gap-3">
          {[
            { href: "/reflect", icon: "🌱", label: "Reflect", desc: "Check in with nature" },
            { href: "/books", icon: "📖", label: "Books", desc: "Search & save books" },
            { href: "/habits", icon: "✨", label: "Habits", desc: "Build micro-habits" },
            { href: "/harmony", icon: "💛", label: "Harmony", desc: "Express gratitude" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-card border border-card-border rounded-2xl p-4 hover:shadow-md transition-shadow group text-center"
            >
              <span className="text-2xl mb-2 block">{item.icon}</span>
              <p className="text-sm font-bold text-bark group-hover:text-terracotta transition-colors">
                {item.label}
              </p>
              <p className="text-xs text-muted mt-0.5">{item.desc}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
