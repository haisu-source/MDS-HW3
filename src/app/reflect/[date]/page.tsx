"use client";

import { use } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { formatDate } from "@/lib/helpers";
import { getNatureElement } from "@/lib/natureElements";
import ReflectionCard from "@/components/ReflectionCard";

export default function ReflectDatePage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = use(params);
  const { getReflectionsByDate, reflections } = useApp();
  const dayReflections = getReflectionsByDate(date);

  // Find adjacent dates that have reflections
  const allDates = [...new Set(reflections.map((r) => r.date))].sort();
  const currentIndex = allDates.indexOf(date);
  const prevDate = currentIndex > 0 ? allDates[currentIndex - 1] : null;
  const nextDate = currentIndex < allDates.length - 1 ? allDates[currentIndex + 1] : null;

  // Mood landscape for the day
  const moodEmojis = dayReflections.map((r) => getNatureElement(r.mood).emoji);

  return (
    <div className="space-y-8">
      {/* Header with navigation */}
      <div>
        <Link
          href="/reflect"
          className="text-sm text-terracotta hover:text-terracotta-dark transition-colors mb-4 inline-block"
        >
          ← Back to Reflect
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-bark">{formatDate(date)}</h1>
            {moodEmojis.length > 0 && (
              <p className="text-2xl mt-2">{moodEmojis.join(" ")}</p>
            )}
          </div>

          {/* Day navigation */}
          <div className="flex gap-2">
            {prevDate ? (
              <Link
                href={`/reflect/${prevDate}`}
                className="px-3 py-1.5 rounded-full bg-sand text-warm-brown text-sm font-medium hover:bg-sand-dark transition-colors"
              >
                ← Prev
              </Link>
            ) : (
              <span className="px-3 py-1.5 rounded-full bg-sand/50 text-muted text-sm">← Prev</span>
            )}
            {nextDate ? (
              <Link
                href={`/reflect/${nextDate}`}
                className="px-3 py-1.5 rounded-full bg-sand text-warm-brown text-sm font-medium hover:bg-sand-dark transition-colors"
              >
                Next →
              </Link>
            ) : (
              <span className="px-3 py-1.5 rounded-full bg-sand/50 text-muted text-sm">Next →</span>
            )}
          </div>
        </div>
      </div>

      {/* Reflections */}
      {dayReflections.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block">🌾</span>
          <p className="text-muted text-lg">The garden is quiet on this day.</p>
          <Link
            href="/reflect"
            className="inline-block mt-4 text-terracotta hover:text-terracotta-dark font-semibold transition-colors"
          >
            Plant a reflection →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted">
            {dayReflections.length} reflection{dayReflections.length !== 1 ? "s" : ""} planted
          </p>
          {dayReflections.map((r) => (
            <ReflectionCard key={r.id} reflection={r} />
          ))}
        </div>
      )}
    </div>
  );
}
