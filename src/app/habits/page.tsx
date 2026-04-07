"use client";

import { IdentityTag } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import HabitSuggestions from "@/components/HabitSuggestions";
import HabitCard from "@/components/HabitCard";
import HabitForm from "@/components/HabitForm";

const ALL_IDENTITIES: { value: IdentityTag; label: string; desc: string }[] = [
  { value: "student", label: "🎓 Student", desc: "Academic growth" },
  { value: "coder", label: "💻 Coder", desc: "Technical skills" },
  { value: "learner", label: "🧠 Learner", desc: "Curiosity & knowledge" },
  { value: "writer", label: "✍️ Writer", desc: "Words & expression" },
  { value: "mindful", label: "🧘 Mindful", desc: "Presence & peace" },
  { value: "creative", label: "🎨 Creative", desc: "Imagination & art" },
];

export default function HabitsPage() {
  const { habits, userIdentities, setUserIdentities } = useApp();

  const toggleIdentity = (id: IdentityTag) => {
    setUserIdentities(
      userIdentities.includes(id)
        ? userIdentities.filter((i) => i !== id)
        : [...userIdentities, id]
    );
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-bark mb-2">✨ Habits</h1>
        <p className="text-muted">
          Tiny steps build lasting change. Choose who you want to become.
        </p>
      </div>

      {/* Identity Selection */}
      <div className="bg-card border border-card-border rounded-2xl p-6">
        <h2 className="text-lg font-bold text-bark mb-1">Who are you becoming?</h2>
        <p className="text-sm text-muted mb-4">
          Select your identities to get personalized micro-habit suggestions.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {ALL_IDENTITIES.map((id) => (
            <button
              key={id.value}
              onClick={() => toggleIdentity(id.value)}
              className={`p-3 rounded-2xl border-2 text-left transition-all ${
                userIdentities.includes(id.value)
                  ? "border-terracotta bg-peach-light shadow-sm"
                  : "border-card-border bg-card hover:border-sand-dark"
              }`}
            >
              <span className="text-xl">{id.label.split(" ")[0]}</span>
              <p className="text-sm font-semibold text-bark mt-1">{id.label.split(" ").slice(1).join(" ")}</p>
              <p className="text-xs text-muted">{id.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <HabitSuggestions />

      {/* Active Habits */}
      {habits.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-bark mb-4">Your Habits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {habits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>
        </div>
      )}

      {/* Custom Habit Form */}
      <HabitForm />
    </div>
  );
}
