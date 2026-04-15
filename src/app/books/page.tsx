"use client";

import { useState } from "react";
import { ReadingStatus } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import BookForm from "@/components/BookForm";
import BookCard from "@/components/BookCard";
import BookSearch from "@/components/BookSearch";

const FILTERS: { value: ReadingStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "currently-reading", label: "📖 Reading" },
  { value: "want-to-read", label: "📌 Want to Read" },
  { value: "finished", label: "✅ Finished" },
  { value: "paused", label: "⏸️ Paused" },
];

type ViewMode = "search" | "manual" | null;

export default function BooksPage() {
  const { books } = useApp();
  const [viewMode, setViewMode] = useState<ViewMode>(books.length === 0 ? "search" : null);
  const [filter, setFilter] = useState<ReadingStatus | "all">("all");

  const filteredBooks =
    filter === "all" ? books : books.filter((b) => b.status === filter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-bark mb-2">📖 Reading Log</h1>
          <p className="text-muted">Search for books or add them manually to your shelf.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode(viewMode === "search" ? null : "search")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              viewMode === "search"
                ? "bg-terracotta-dark text-white"
                : "bg-terracotta text-white hover:bg-terracotta-dark"
            }`}
          >
            {viewMode === "search" ? "Hide Search" : "🔍 Search Books"}
          </button>
          <button
            onClick={() => setViewMode(viewMode === "manual" ? null : "manual")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              viewMode === "manual"
                ? "bg-sage-dark text-white"
                : "bg-sage text-white hover:bg-sage-dark"
            }`}
          >
            {viewMode === "manual" ? "Hide Form" : "+ Add Manually"}
          </button>
        </div>
      </div>

      {/* Search or Manual Form */}
      {viewMode === "search" && (
        <div className="bg-card border border-card-border rounded-2xl p-6">
          <h2 className="text-lg font-bold text-bark mb-4">🔍 Search Open Library</h2>
          <BookSearch onAdded={() => {}} />
        </div>
      )}

      {viewMode === "manual" && <BookForm onAdded={() => setViewMode(null)} />}

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
              ? "Your shelf is empty. Search for a book or add one manually!"
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
