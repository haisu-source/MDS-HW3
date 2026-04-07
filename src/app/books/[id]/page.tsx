"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { ReadingStatus } from "@/lib/types";

const STATUS_STYLES: Record<string, string> = {
  "want-to-read": "bg-blue-100 text-blue-700",
  "currently-reading": "bg-green-100 text-green-700",
  "finished": "bg-violet-100 text-violet-700",
  "paused": "bg-amber-100 text-amber-700",
};

const STATUS_LABELS: Record<string, string> = {
  "want-to-read": "📌 Want to Read",
  "currently-reading": "📖 Currently Reading",
  "finished": "✅ Finished",
  "paused": "⏸️ Paused",
};

export default function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getBookById, updateBook } = useApp();
  const book = getBookById(id);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState(book?.notes || "");

  if (!book) {
    return (
      <div className="text-center py-16">
        <span className="text-5xl mb-4 block">📖</span>
        <p className="text-muted text-lg">Book not found.</p>
        <Link
          href="/books"
          className="inline-block mt-4 text-terracotta hover:text-terracotta-dark font-semibold transition-colors"
        >
          ← Back to shelf
        </Link>
      </div>
    );
  }

  const handleStatusChange = (newStatus: ReadingStatus) => {
    updateBook(book.id, { status: newStatus });
  };

  const handleSaveNotes = () => {
    updateBook(book.id, { notes });
    setEditingNotes(false);
  };

  return (
    <div className="space-y-8">
      <Link
        href="/books"
        className="text-sm text-terracotta hover:text-terracotta-dark transition-colors inline-block"
      >
        ← Back to shelf
      </Link>

      {/* Header */}
      <div className="bg-card border border-card-border rounded-2xl p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-bark">{book.title}</h1>
            <p className="text-lg text-muted mt-1">by {book.author}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${STATUS_STYLES[book.status]}`}>
            {STATUS_LABELS[book.status]}
          </span>
        </div>

        {/* Status switcher */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(Object.keys(STATUS_LABELS) as ReadingStatus[]).map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                book.status === s
                  ? "bg-terracotta text-white"
                  : "bg-sand text-warm-brown hover:bg-sand-dark"
              }`}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-sand text-warm-brown">
            {book.genre}
          </span>
        </div>

        {/* Rating */}
        {book.status === "finished" && (
          <div className="flex gap-1 mt-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => updateBook(book.id, { rating: star })}
                className={`text-2xl transition-transform hover:scale-110 ${
                  star <= (book.rating || 0) ? "" : "opacity-20 grayscale"
                }`}
              >
                🌸
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Why I picked this up */}
      {book.reasonToRead && (
        <div className="bg-card border border-card-border rounded-2xl p-6">
          <h2 className="text-lg font-bold text-bark mb-2">🌱 Why I picked this up</h2>
          <p className="text-foreground leading-relaxed">{book.reasonToRead}</p>
        </div>
      )}

      {/* My Connection */}
      {book.personalConnection && (
        <div className="bg-card border border-card-border rounded-2xl p-6">
          <h2 className="text-lg font-bold text-bark mb-2">💛 My connection</h2>
          <p className="text-foreground leading-relaxed">{book.personalConnection}</p>
        </div>
      )}

      {/* Notes */}
      <div className="bg-card border border-card-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-bark">📝 Notes & Thoughts</h2>
          <button
            onClick={() => editingNotes ? handleSaveNotes() : setEditingNotes(true)}
            className="text-sm text-terracotta hover:text-terracotta-dark font-semibold transition-colors"
          >
            {editingNotes ? "Save" : "Edit"}
          </button>
        </div>
        {editingNotes ? (
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={6}
            className="w-full bg-white border border-sand-dark rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-terracotta-light focus:border-terracotta outline-none resize-none"
          />
        ) : (
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {book.notes || "No notes yet. Click edit to add your thoughts."}
          </p>
        )}
      </div>
    </div>
  );
}
