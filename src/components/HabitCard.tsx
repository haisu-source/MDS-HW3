"use client";

import { Habit } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import { getTodayString } from "@/lib/helpers";

export default function HabitCard({ habit }: { habit: Habit }) {
  const { toggleHabitToday, getHabitStreak } = useApp();
  const streak = getHabitStreak(habit.id);
  const today = getTodayString();

  // Last 7 days
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today + "T12:00:00");
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });

  return (
    <div className="bg-card border border-card-border rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-bark">{habit.name}</h3>
          <p className="text-sm text-muted mt-0.5">{habit.description}</p>
        </div>

        {/* Check-off button */}
        <button
          onClick={() => toggleHabitToday(habit.id)}
          className={`shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl transition-all ${
            streak.completedToday
              ? "bg-sage border-sage-dark text-white scale-105"
              : "border-sand-dark bg-white text-muted hover:border-sage hover:text-sage"
          }`}
        >
          {streak.completedToday ? "🌸" : "○"}
        </button>
      </div>

      {/* Streak info */}
      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">🔥</span>
          <span className="text-sm font-bold text-terracotta">{streak.currentStreak}</span>
          <span className="text-xs text-muted">day streak</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm">🏔️</span>
          <span className="text-sm font-bold text-warm-brown">{streak.longestStreak}</span>
          <span className="text-xs text-muted">best</span>
        </div>
      </div>

      {/* Last 7 days dots */}
      <div className="flex items-center gap-1.5 mt-3">
        {last7.map((date) => {
          const completed = habit.completedDates.includes(date);
          const isToday = date === today;
          return (
            <div key={date} className="flex flex-col items-center gap-0.5">
              <div
                className={`w-3.5 h-3.5 rounded-full transition-all ${
                  completed
                    ? "bg-sage"
                    : isToday
                      ? "border-2 border-terracotta bg-peach-light"
                      : "bg-sand-dark/40"
                }`}
              />
              {isToday && (
                <span className="text-[8px] text-muted font-medium">today</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Identity tags */}
      <div className="flex gap-1 mt-3">
        {habit.identityTags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-sand text-warm-brown"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
