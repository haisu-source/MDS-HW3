"use client";

import { useState } from "react";
import { ReadingStatus } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import BookForm from "@/components/BookForm";
import BookCard from "@/components/BookCard";

const FILTERS: { value: ReadingStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "currently-reading", label: "📖 Reading" },
  { value: "want-to-read", label: "📌 Want to Read" },
  { value: "finished", label: "✅ Finished" },
  { value: "paused", label: "⏸️ Paused" },
];

export default function BooksPage() {
  const { books } = useApp();
  const [showForm, setShowForm] = useState(books.length === 0);
  const [filter, setFilter] = useState<ReadingStatus | "all">("all");

  const filteredBooks =
    filter === "all" ? books : books.filter((b) => b.status === filter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-bark mb-2">📖 Reading Log</h1>
          <p className="text-muted">Track your reading journey, one book at a time.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
            showForm
              ? "bg-sage-dark text-white"
              : "bg-sage text-white hover:bg-sage-dark"
          }`}
        >
          {showForm ? "Hide Form" : "+ Add Book"}
        </button>
      </div>

      {/* Add Book Form */}
      {showForm && <BookForm onAdded={() => setShowForm(false)} />}

      {/* Filter Tabs */}
      {books.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                filter === f.value
                  ? "bg-terracotta text-white"
                  : "bg-sand text-warm-brown hover:bg-sand-dark"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* Book Shelf */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-5xl mb-4 block">📚</span>
          <p className="text-muted">
            {books.length === 0
              ? "Your shelf is empty. Add a book to get started!"
              : "No books match this filter."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
