"use client";

import { useState } from "react";
import { NatureElement } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import { getTodayString, getCurrentTime } from "@/lib/helpers";
import MoodPicker from "./MoodPicker";

export default function JournalForm() {
  const { addReflection } = useApp();
  const [mood, setMood] = useState<NatureElement | null>(null);
  const [intensity, setIntensity] = useState(3);
  const [journal, setJournal] = useState("");
  const [gratitude, setGratitude] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood || !journal.trim()) return;

    addReflection({
      date: getTodayString(),
      time: getCurrentTime(),
      mood,
      intensity,
      journal: journal.trim(),
      gratitude: gratitude.trim() || undefined,
    });

    setMood(null);
    setIntensity(3);
    setJournal("");
    setGratitude("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const intensityLabels = ["tiny seed", "small sprout", "growing", "flourishing", "full bloom"];

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-card-border rounded-2xl p-6 space-y-6">
      <MoodPicker selected={mood} onSelect={setMood} />

      {/* Intensity */}
      <div>
        <label className="block text-sm font-semibold text-bark mb-2">
          How strongly do you feel this? — <span className="text-terracotta">{intensityLabels[intensity - 1]}</span>
        </label>
        <input
          type="range"
          min={1}
          max={5}
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="w-full accent-terracotta"
        />
        <div className="flex justify-between text-xs text-muted mt-1">
          <span>🌱</span>
          <span>🌿</span>
          <span>🌳</span>
          <span>🌲</span>
          <span>🌸</span>
        </div>
      </div>

      {/* Journal */}
      <div>
        <label htmlFor="journal" className="block text-sm font-semibold text-bark mb-2">
          What&apos;s on your mind?
        </label>
        <textarea
          id="journal"
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          placeholder="Let your thoughts flow like a gentle stream..."
          rows={4}
          className="w-full bg-white border border-sand-dark rounded-xl px-4 py-3 text-foreground placeholder:text-soft-brown/60 focus:ring-2 focus:ring-terracotta-light focus:border-terracotta outline-none resize-none transition-all"
        />
      </div>

      {/* Gratitude */}
      <div>
        <label htmlFor="gratitude" className="block text-sm font-semibold text-bark mb-2">
          Anything you&apos;re grateful for? <span className="text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="gratitude"
          value={gratitude}
          onChange={(e) => setGratitude(e.target.value)}
          placeholder="A small light in your day..."
          rows={2}
          className="w-full bg-white border border-sand-dark rounded-xl px-4 py-3 text-foreground placeholder:text-soft-brown/60 focus:ring-2 focus:ring-terracotta-light focus:border-terracotta outline-none resize-none transition-all"
        />
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={!mood || !journal.trim()}
          className="bg-terracotta text-white rounded-full px-6 py-2.5 font-semibold hover:bg-terracotta-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Plant this reflection 🌱
        </button>
        {submitted && (
          <span className="text-sage-dark text-sm font-medium animate-pulse">
            Planted! Your garden grows 🌿
          </span>
        )}
      </div>
    </form>
  );
}
