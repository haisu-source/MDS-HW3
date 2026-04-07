"use client";

import { useState } from "react";
import { IdentityTag } from "@/lib/types";
import { useApp } from "@/context/AppContext";

const ALL_IDENTITIES: { value: IdentityTag; label: string }[] = [
  { value: "student", label: "🎓 Student" },
  { value: "coder", label: "💻 Coder" },
  { value: "learner", label: "🧠 Learner" },
  { value: "writer", label: "✍️ Writer" },
  { value: "mindful", label: "🧘 Mindful" },
  { value: "creative", label: "🎨 Creative" },
];

export default function HabitForm() {
  const { addHabit } = useApp();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<IdentityTag[]>([]);
  const [showForm, setShowForm] = useState(false);

  const toggleTag = (tag: IdentityTag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addHabit({
      name: name.trim(),
      description: description.trim(),
      identityTags: tags,
      isSuggested: false,
    });

    setName("");
    setDescription("");
    setTags([]);
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full bg-card border-2 border-dashed border-sand-dark rounded-2xl p-6 text-center text-muted hover:border-terracotta hover:text-terracotta transition-colors"
      >
        + Create your own micro-habit
      </button>
    );
  }

  const inputClass =
    "w-full bg-white border border-sand-dark rounded-xl px-4 py-3 text-foreground placeholder:text-soft-brown/60 focus:ring-2 focus:ring-terracotta-light focus:border-terracotta outline-none transition-all";

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-card-border rounded-2xl p-6 space-y-4">
      <h3 className="font-bold text-bark">Create a Micro-Habit</h3>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Habit name"
        className={inputClass}
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Brief description (optional)"
        rows={2}
        className={`${inputClass} resize-none`}
      />

      <div>
        <p className="text-sm font-semibold text-bark mb-2">Identity tags</p>
        <div className="flex flex-wrap gap-2">
          {ALL_IDENTITIES.map((id) => (
            <button
              key={id.value}
              type="button"
              onClick={() => toggleTag(id.value)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                tags.includes(id.value)
                  ? "bg-terracotta text-white"
                  : "bg-sand text-warm-brown hover:bg-sand-dark"
              }`}
            >
              {id.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!name.trim()}
          className="bg-terracotta text-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-terracotta-dark transition-colors disabled:opacity-40"
        >
          Start this habit ✨
        </button>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="text-sm text-muted hover:text-warm-brown transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
