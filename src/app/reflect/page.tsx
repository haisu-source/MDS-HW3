"use client";

import JournalForm from "@/components/JournalForm";
import ReflectionHistory from "@/components/ReflectionHistory";

export default function ReflectPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-bark mb-2">🌱 Reflect</h1>
        <p className="text-muted">
          Pause. Breathe. Connect with how you feel through nature.
        </p>
      </div>

      {/* New Reflection Form */}
      <JournalForm />

      {/* History */}
      <ReflectionHistory />
    </div>
  );
}
