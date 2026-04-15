"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import Image from "next/image";

interface SearchResult {
  key: string;
  title: string;
  author: string;
  year?: number;
  coverId?: number;
  subjects: string[];
  pages?: number;
}

export default function BookSearch({ onAdded }: { onAdded?: () => void }) {
  const { addBook, books } = useApp();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);

  const savedKeys = new Set(books.map((b) => b.openLibraryKey).filter(Boolean));

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearching(true);
    setSearched(false);
    try {
      const res = await fetch(`/api/books/search?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      setResults(data.books || []);
      setSearched(true);
    } catch {
      console.error("Search failed");
    } finally {
      setSearching(false);
    }
  };

  const handleSave = async (result: SearchResult) => {
    setSaving(result.key);
    const coverUrl = result.coverId
      ? `https://covers.openlibrary.org/b/id/${result.coverId}-M.jpg`
      : undefined;

    // Guess a genre from subjects
    const genre = guessGenre(result.subjects);

    await addBook({
      title: result.title,
      author: result.author,
      status: "want-to-read",
      genre,
      reasonToRead: "",
      personalConnection: "",
      notes: "",
      coverUrl,
      openLibraryKey: result.key,
    });
    setSaving(null);
    onAdded?.();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books by title, author, or topic..."
          className="flex-1 bg-white border border-sand-dark rounded-xl px-4 py-3 text-foreground placeholder:text-soft-brown/60 focus:ring-2 focus:ring-terracotta-light focus:border-terracotta outline-none transition-all"
        />
        <button
          type="submit"
          disabled={searching || !query.trim()}
          className="bg-terracotta text-white rounded-xl px-6 py-3 font-semibold hover:bg-terracotta-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          {searching ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted">{results.length} results found</p>
          {results.map((result) => {
            const isSaved = savedKeys.has(result.key);
            return (
              <div
                key={result.key}
                className="bg-card border border-card-border rounded-2xl p-4 flex gap-4 items-start"
              >
                {result.coverId ? (
                  <Image
                    src={`https://covers.openlibrary.org/b/id/${result.coverId}-M.jpg`}
                    alt={result.title}
                    width={60}
                    height={90}
                    className="rounded-lg object-cover shrink-0"
                  />
                ) : (
                  <div className="w-[60px] h-[90px] bg-sand rounded-lg flex items-center justify-center text-2xl shrink-0">
                    📚
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-bark text-sm truncate">{result.title}</h3>
                  <p className="text-xs text-muted">
                    {result.author}
                    {result.year ? ` (${result.year})` : ""}
                  </p>
                  {result.subjects.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {result.subjects.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-sand text-warm-brown"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleSave(result)}
                  disabled={isSaved || saving === result.key}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isSaved
                      ? "bg-sage-light text-sage-dark cursor-default"
                      : "bg-terracotta text-white hover:bg-terracotta-dark disabled:opacity-50"
                  }`}
                >
                  {isSaved ? "Saved" : saving === result.key ? "Saving..." : "Save"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {searched && results.length === 0 && (
        <div className="text-center py-8">
          <span className="text-4xl mb-3 block">🔍</span>
          <p className="text-muted">No books found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}

function guessGenre(subjects: string[]): string {
  const lower = subjects.map((s) => s.toLowerCase());
  if (lower.some((s) => s.includes("fiction"))) return "Fiction";
  if (lower.some((s) => s.includes("science"))) return "Science";
  if (lower.some((s) => s.includes("history"))) return "History";
  if (lower.some((s) => s.includes("biography"))) return "Biography";
  if (lower.some((s) => s.includes("philosophy"))) return "Philosophy";
  if (lower.some((s) => s.includes("poetry"))) return "Poetry";
  if (lower.some((s) => s.includes("fantasy"))) return "Fantasy";
  if (lower.some((s) => s.includes("mystery"))) return "Mystery";
  if (lower.some((s) => s.includes("self-help") || s.includes("self help"))) return "Self-Help";
  if (lower.some((s) => s.includes("psychology"))) return "Psychology";
  if (lower.some((s) => s.includes("technology") || s.includes("computer"))) return "Technology";
  return "Non-Fiction";
}
