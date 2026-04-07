"use client";

import { use } from "react";

export default function ReflectDatePage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = use(params);

  return (
    <div>
      <h1 className="text-3xl font-bold text-bark mb-2">🌱 Reflections for {date}</h1>
      <p className="text-muted">Day detail view — coming soon.</p>
    </div>
  );
}
