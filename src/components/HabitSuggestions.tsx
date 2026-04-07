"use client";

import { useApp } from "@/context/AppContext";
import { HABIT_SUGGESTIONS } from "@/lib/habitSuggestions";

export default function HabitSuggestions() {
  const { userIdentities, addHabit, habits } = useApp();

  const filtered = HABIT_SUGGESTIONS.filter((s) =>
    s.identityTags.some((tag) => userIdentities.includes(tag))
  );

  // Don't show suggestions already added
  const existingNames = new Set(habits.map((h) => h.name));
  const available = filtered.filter((s) => !existingNames.has(s.name));

  if (userIdentities.length === 0 || available.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-bold text-bark mb-3">💡 Suggested for You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {available.map((suggestion) => (
          <div
            key={suggestion.name}
            className="bg-card border border-card-border rounded-2xl p-4 flex items-start justify-between gap-3"
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-bark text-sm">{suggestion.name}</p>
              <p className="text-xs text-muted mt-0.5">{suggestion.description}</p>
              <div className="flex gap-1 mt-2">
                {suggestion.identityTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-sage-light text-sage-dark"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() =>
                addHabit({
                  name: suggestion.name,
                  description: suggestion.description,
                  identityTags: suggestion.identityTags,
                  isSuggested: true,
                })
              }
              className="shrink-0 bg-sage text-white rounded-full px-3 py-1 text-xs font-semibold hover:bg-sage-dark transition-colors"
            >
              + Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
