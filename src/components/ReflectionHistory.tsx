"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { getRelativeDate } from "@/lib/helpers";
import ReflectionCard from "./ReflectionCard";

export default function ReflectionHistory() {
  const { reflections } = useApp();

  if (reflections.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="text-5xl mb-4 block">🌱</span>
        <p className="text-muted">Your reflection garden is waiting to bloom.</p>
        <p className="text-sm text-muted mt-1">Plant your first reflection above.</p>
      </div>
    );
  }

  // Group by date
  const grouped: Record<string, typeof reflections> = {};
  for (const r of reflections) {
    if (!grouped[r.date]) grouped[r.date] = [];
    grouped[r.date].push(r);
  }

  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-bark">Your Reflection Garden</h2>
      {sortedDates.map((date) => (
        <div key={date}>
          <Link
            href={`/reflect/${date}`}
            className="inline-block text-sm font-semibold text-terracotta hover:text-terracotta-dark mb-3 transition-colors"
          >
            {getRelativeDate(date)} →
          </Link>
          <div className="space-y-3">
            {grouped[date].map((r) => (
              <ReflectionCard key={r.id} reflection={r} compact />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
