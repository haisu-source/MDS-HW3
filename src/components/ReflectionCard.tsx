"use client";

import { Reflection } from "@/lib/types";
import { getNatureElement } from "@/lib/natureElements";
import { formatTime } from "@/lib/helpers";

interface ReflectionCardProps {
  reflection: Reflection;
  compact?: boolean;
}

export default function ReflectionCard({ reflection, compact = false }: ReflectionCardProps) {
  const element = getNatureElement(reflection.mood);
  const intensityDots = Array.from({ length: 5 }, (_, i) => i < reflection.intensity);

  if (compact) {
    return (
      <div className="flex items-start gap-3 p-3 bg-card border border-card-border rounded-xl">
        <span className="text-2xl">{element.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground truncate">{reflection.journal}</p>
          <p className="text-xs text-muted mt-0.5">{formatTime(reflection.time)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-5 rounded-2xl border-2 ${element.color} transition-all`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{element.emoji}</span>
          <div>
            <p className="font-bold text-bark">{element.label}</p>
            <p className="text-xs text-muted">{element.description}</p>
          </div>
        </div>
        <span className="text-sm text-muted">{formatTime(reflection.time)}</span>
      </div>

      {/* Intensity */}
      <div className="flex items-center gap-1 mb-3">
        {intensityDots.map((filled, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${filled ? "bg-terracotta" : "bg-sand-dark"}`}
          />
        ))}
        <span className="text-xs text-muted ml-2">intensity</span>
      </div>

      {/* Journal */}
      <p className="text-foreground leading-relaxed">{reflection.journal}</p>

      {/* Gratitude */}
      {reflection.gratitude && (
        <div className="mt-3 p-3 bg-white/50 rounded-xl">
          <p className="text-xs font-semibold text-sage-dark mb-1">🌈 Grateful for:</p>
          <p className="text-sm text-foreground">{reflection.gratitude}</p>
        </div>
      )}
    </div>
  );
}
