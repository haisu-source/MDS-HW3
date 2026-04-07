"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { getTodayString } from "@/lib/helpers";

const EMOTIONS = [
  { value: "warmth", emoji: "🌤️", label: "Warmth" },
  { value: "joy", emoji: "🌸", label: "Joy" },
  { value: "peace", emoji: "🌿", label: "Peace" },
  { value: "comfort", emoji: "🍂", label: "Comfort" },
  { value: "inspiration", emoji: "🌈", label: "Inspiration" },
  { value: "love", emoji: "🌹", label: "Love" },
];

const RELATIONSHIP_TYPES = ["friend", "family", "partner", "mentor", "self", "community"];

const HARMONY_LEVELS = [
  { level: 1, emoji: "🌱", label: "Seed" },
  { level: 2, emoji: "🌿", label: "Sprout" },
  { level: 3, emoji: "🌻", label: "Growing" },
  { level: 4, emoji: "🌳", label: "Rooted" },
  { level: 5, emoji: "🌸", label: "Full Bloom" },
];

export default function HarmonyPage() {
  const {
    gratitudeEntries,
    connections,
    addGratitudeEntry,
    addConnection,
  } = useApp();

  // Gratitude form state
  const [personOrThing, setPersonOrThing] = useState("");
  const [message, setMessage] = useState("");
  const [emotion, setEmotion] = useState("warmth");
  const [gratitudeSubmitted, setGratitudeSubmitted] = useState(false);

  // Connection form state
  const [showConnForm, setShowConnForm] = useState(false);
  const [connName, setConnName] = useState("");
  const [connType, setConnType] = useState("friend");
  const [connHarmony, setConnHarmony] = useState(3);
  const [connNotes, setConnNotes] = useState("");

  const handleGratitude = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personOrThing.trim() || !message.trim()) return;

    addGratitudeEntry({
      date: getTodayString(),
      personOrThing: personOrThing.trim(),
      message: message.trim(),
      emotion,
    });

    setPersonOrThing("");
    setMessage("");
    setEmotion("warmth");
    setGratitudeSubmitted(true);
    setTimeout(() => setGratitudeSubmitted(false), 3000);
  };

  const handleConnection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connName.trim()) return;

    addConnection({
      name: connName.trim(),
      relationshipType: connType,
      lastAppreciation: "",
      harmonyLevel: connHarmony,
      notes: connNotes.trim(),
    });

    setConnName("");
    setConnType("friend");
    setConnHarmony(3);
    setConnNotes("");
    setShowConnForm(false);
  };

  const selectedEmotion = EMOTIONS.find((e) => e.value === emotion);

  const inputClass =
    "w-full bg-white border border-sand-dark rounded-xl px-4 py-3 text-foreground placeholder:text-soft-brown/60 focus:ring-2 focus:ring-terracotta-light focus:border-terracotta outline-none transition-all";

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-bark mb-2">💛 Harmony</h1>
        <p className="text-muted max-w-lg">
          Nurture your emotional world. Express gratitude, honor your connections, and grow your inner garden of love.
        </p>
      </div>

      {/* Gratitude Garden */}
      <div>
        <h2 className="text-xl font-bold text-bark mb-4">🌸 Gratitude Garden</h2>

        <form onSubmit={handleGratitude} className="bg-card border border-card-border rounded-2xl p-6 space-y-4">
          <div>
            <label htmlFor="gratPerson" className="block text-sm font-semibold text-bark mb-1.5">
              Who or what are you grateful for?
            </label>
            <input
              id="gratPerson"
              type="text"
              value={personOrThing}
              onChange={(e) => setPersonOrThing(e.target.value)}
              placeholder="A person, moment, or thing..."
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="gratMessage" className="block text-sm font-semibold text-bark mb-1.5">
              Your gratitude message
            </label>
            <textarea
              id="gratMessage"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Why does this matter to you?"
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-bark mb-2">
              What emotion does this bring?
            </label>
            <div className="flex flex-wrap gap-2">
              {EMOTIONS.map((em) => (
                <button
                  key={em.value}
                  type="button"
                  onClick={() => setEmotion(em.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    emotion === em.value
                      ? "bg-terracotta text-white"
                      : "bg-sand text-warm-brown hover:bg-sand-dark"
                  }`}
                >
                  {em.emoji} {em.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={!personOrThing.trim() || !message.trim()}
              className="bg-terracotta text-white rounded-full px-6 py-2.5 font-semibold hover:bg-terracotta-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Plant gratitude 🌸
            </button>
            {gratitudeSubmitted && (
              <span className="text-sage-dark text-sm font-medium animate-pulse">
                Your garden blooms 🌈
              </span>
            )}
          </div>
        </form>

        {/* Gratitude entries */}
        {gratitudeEntries.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {gratitudeEntries.map((entry) => {
              const em = EMOTIONS.find((e) => e.value === entry.emotion);
              return (
                <div
                  key={entry.id}
                  className="bg-card border border-card-border rounded-2xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{em?.emoji || "💛"}</span>
                    <span className="font-semibold text-bark text-sm">{entry.personOrThing}</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{entry.message}</p>
                  <p className="text-xs text-muted mt-2">{em?.label || entry.emotion}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* My Connections */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-bark">🌿 My Connections</h2>
          <button
            onClick={() => setShowConnForm(!showConnForm)}
            className="text-sm text-terracotta hover:text-terracotta-dark font-semibold transition-colors"
          >
            {showConnForm ? "Cancel" : "+ Add Connection"}
          </button>
        </div>

        {showConnForm && (
          <form onSubmit={handleConnection} className="bg-card border border-card-border rounded-2xl p-6 space-y-4 mb-6">
            <input
              type="text"
              value={connName}
              onChange={(e) => setConnName(e.target.value)}
              placeholder="Person or relationship name"
              className={inputClass}
            />

            <div>
              <label className="block text-sm font-semibold text-bark mb-2">Relationship</label>
              <div className="flex flex-wrap gap-2">
                {RELATIONSHIP_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setConnType(type)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all ${
                      connType === type
                        ? "bg-terracotta text-white"
                        : "bg-sand text-warm-brown hover:bg-sand-dark"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-bark mb-2">Harmony Level</label>
              <div className="flex gap-3">
                {HARMONY_LEVELS.map((h) => (
                  <button
                    key={h.level}
                    type="button"
                    onClick={() => setConnHarmony(h.level)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                      connHarmony === h.level
                        ? "bg-peach-light ring-2 ring-terracotta scale-105"
                        : "hover:bg-sand"
                    }`}
                  >
                    <span className="text-2xl">{h.emoji}</span>
                    <span className="text-[10px] text-muted">{h.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={connNotes}
              onChange={(e) => setConnNotes(e.target.value)}
              placeholder="Notes about this connection..."
              rows={2}
              className={`${inputClass} resize-none`}
            />

            <button
              type="submit"
              disabled={!connName.trim()}
              className="bg-sage text-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-sage-dark transition-colors disabled:opacity-40"
            >
              Add Connection 🌿
            </button>
          </form>
        )}

        {connections.length === 0 && !showConnForm ? (
          <div className="text-center py-8">
            <span className="text-4xl mb-3 block">🌿</span>
            <p className="text-muted">No connections yet. Start nurturing your garden.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {connections.map((conn) => {
              const harmony = HARMONY_LEVELS.find((h) => h.level === conn.harmonyLevel);
              return (
                <div
                  key={conn.id}
                  className="bg-card border border-card-border rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-bark">{conn.name}</h3>
                    <span className="text-2xl">{harmony?.emoji || "🌱"}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-sand text-warm-brown capitalize">
                    {conn.relationshipType}
                  </span>
                  {conn.notes && (
                    <p className="text-sm text-muted mt-3">{conn.notes}</p>
                  )}
                  <p className="text-xs text-muted mt-2">{harmony?.label || "Seed"} harmony</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Harmony Summary */}
      {(gratitudeEntries.length > 0 || connections.length > 0) && (
        <div className="bg-peach-light/50 border border-peach rounded-2xl p-6 text-center">
          <p className="text-lg text-bark">
            You&apos;ve expressed gratitude <span className="font-bold text-terracotta">{gratitudeEntries.length}</span> time{gratitudeEntries.length !== 1 ? "s" : ""} and nurture{" "}
            <span className="font-bold text-sage-dark">{connections.length}</span> connection{connections.length !== 1 ? "s" : ""}.
          </p>
          <p className="text-sm text-muted mt-2">Your emotional garden is growing 🌿</p>
        </div>
      )}
    </div>
  );
}
