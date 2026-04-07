"use client";

import { useState } from "react";
import { ReadingStatus } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import { getTodayString } from "@/lib/helpers";

const GENRES = [
  "Fiction",
  "Non-Fiction",
  "Self-Help",
  "Science",
  "Philosophy",
  "Biography",
  "Poetry",
  "History",
  "Technology",
  "Psychology",
  "Fantasy",
  "Mystery",
  "Other",
];

const STATUS_OPTIONS: { value: ReadingStatus; label: string; icon: string }[] = [
  { value: "want-to-read", label: "Want to Read", icon: "📌" },
  { value: "currently-reading", label: "Currently Reading", icon: "📖" },
  { value: "finished", label: "Finished", icon: "✅" },
  { value: "paused", label: "Paused", icon: "⏸️" },
];

export default function BookForm({ onAdded }: { onAdded?: () => void }) {
  const { addBook } = useApp();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("Fiction");
  const [status, setStatus] = useState<ReadingStatus>("currently-reading");
  const [rating, setRating] = useState(0);
  const [reasonToRead, setReasonToRead] = useState("");
  const [personalConnection, setPersonalConnection] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    addBook({
      title: title.trim(),
      author: author.trim(),
      genre,
      status,
      rating: status === "finished" && rating > 0 ? rating : undefined,
      reasonToRead: reasonToRead.trim(),
      personalConnection: personalConnection.trim(),
      notes: notes.trim(),
      startDate: status !== "want-to-read" ? getTodayString() : undefined,
      finishDate: status === "finished" ? getTodayString() : undefined,
    });

    setTitle("");
    setAuthor("");
    setGenre("Fiction");
    setStatus("currently-reading");
    setRating(0);
    setReasonToRead("");
    setPersonalConnection("");
    setNotes("");
    onAdded?.();
  };

  const inputClass =
    "w-full bg-white border border-sand-dark rounded-xl px-4 py-3 text-foreground placeholder:text-soft-brown/60 focus:ring-2 focus:ring-terracotta-light focus:border-terracotta outline-none transition-all";

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-card-border rounded-2xl p-6 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-bark mb-1.5">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Book title"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-semibold text-bark mb-1.5">
            Author
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author name"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="genre" className="block text-sm font-semibold text-bark mb-1.5">
            Genre
          </label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className={inputClass}
          >
            {GENRES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-bark mb-1.5">Status</label>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStatus(opt.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  status === opt.value
                    ? "bg-terracotta text-white"
                    : "bg-sand text-warm-brown hover:bg-sand-dark"
                }`}
              >
                {opt.icon} {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {status === "finished" && (
        <div>
          <label className="block text-sm font-semibold text-bark mb-1.5">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl transition-transform hover:scale-110 ${
                  star <= rating ? "grayscale-0" : "grayscale opacity-30"
                }`}
              >
                🌸
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label htmlFor="reason" className="block text-sm font-semibold text-bark mb-1.5">
          Why did you pick this up?
        </label>
        <textarea
          id="reason"
          value={reasonToRead}
          onChange={(e) => setReasonToRead(e.target.value)}
          placeholder="What drew you to this book?"
          rows={2}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <label htmlFor="connection" className="block text-sm font-semibold text-bark mb-1.5">
          Your personal connection
        </label>
        <textarea
          id="connection"
          value={personalConnection}
          onChange={(e) => setPersonalConnection(e.target.value)}
          placeholder="How does this book relate to your life?"
          rows={2}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-semibold text-bark mb-1.5">
          Notes <span className="text-muted font-normal">(optional)</span>
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Thoughts, quotes, insights..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={!title.trim() || !author.trim()}
        className="bg-terracotta text-white rounded-full px-6 py-2.5 font-semibold hover:bg-terracotta-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Add to shelf 📚
      </button>
    </form>
  );
}
