"use client";

import Link from "next/link";
import { Book } from "@/lib/types";

const STATUS_STYLES: Record<string, string> = {
  "want-to-read": "bg-blue-100 text-blue-700",
  "currently-reading": "bg-green-100 text-green-700",
  "finished": "bg-violet-100 text-violet-700",
  "paused": "bg-amber-100 text-amber-700",
};

const STATUS_LABELS: Record<string, string> = {
  "want-to-read": "📌 Want to Read",
  "currently-reading": "📖 Reading",
  "finished": "✅ Finished",
  "paused": "⏸️ Paused",
};

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="bg-card border border-card-border rounded-2xl p-5 hover:shadow-md transition-all group block"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-bark group-hover:text-terracotta transition-colors truncate">
            {book.title}
          </h3>
          <p className="text-sm text-muted">{book.author}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_STYLES[book.status]}`}>
          {STATUS_LABELS[book.status]}
        </span>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-sand text-warm-brown">
          {book.genre}
        </span>
      </div>

      {book.status === "finished" && book.rating && (
        <div className="flex gap-0.5 mb-2">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`text-sm ${i < book.rating! ? "" : "opacity-20 grayscale"}`}>
              🌸
            </span>
          ))}
        </div>
      )}

      {book.personalConnection && (
        <p className="text-sm text-muted line-clamp-2">{book.personalConnection}</p>
      )}
    </Link>
  );
}
