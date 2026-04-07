"use client";

import { use } from "react";

export default function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div>
      <h1 className="text-3xl font-bold text-bark mb-2">📖 Book Detail</h1>
      <p className="text-muted">Book {id} — coming soon.</p>
    </div>
  );
}
