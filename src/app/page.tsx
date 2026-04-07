"use client";

import Link from "next/link";
import { getGreeting } from "@/lib/helpers";

export default function Home() {
  const greeting = getGreeting();

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-12">
        <p className="text-lg text-muted mb-2">{greeting}</p>
        <h1 className="text-4xl font-bold text-bark mb-3">
          Welcome to your growth garden
        </h1>
        <p className="text-muted max-w-md mx-auto">
          Reflect, read, build habits, and nurture your connections — one gentle day at a time.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/reflect"
          className="bg-card border border-card-border rounded-2xl p-6 hover:shadow-md transition-shadow group"
        >
          <span className="text-3xl mb-3 block">🌱</span>
          <h2 className="text-lg font-bold text-bark group-hover:text-terracotta transition-colors">
            Reflect
          </h2>
          <p className="text-sm text-muted mt-1">How are you feeling right now?</p>
        </Link>
        <Link
          href="/books"
          className="bg-card border border-card-border rounded-2xl p-6 hover:shadow-md transition-shadow group"
        >
          <span className="text-3xl mb-3 block">📖</span>
          <h2 className="text-lg font-bold text-bark group-hover:text-terracotta transition-colors">
            Books
          </h2>
          <p className="text-sm text-muted mt-1">Your personal reading journey</p>
        </Link>
        <Link
          href="/habits"
          className="bg-card border border-card-border rounded-2xl p-6 hover:shadow-md transition-shadow group"
        >
          <span className="text-3xl mb-3 block">✨</span>
          <h2 className="text-lg font-bold text-bark group-hover:text-terracotta transition-colors">
            Habits
          </h2>
          <p className="text-sm text-muted mt-1">Tiny steps, lasting change</p>
        </Link>
        <Link
          href="/harmony"
          className="bg-card border border-card-border rounded-2xl p-6 hover:shadow-md transition-shadow group"
        >
          <span className="text-3xl mb-3 block">💛</span>
          <h2 className="text-lg font-bold text-bark group-hover:text-terracotta transition-colors">
            Harmony
          </h2>
          <p className="text-sm text-muted mt-1">Gratitude and emotional connections</p>
        </Link>
      </div>
    </div>
  );
}
