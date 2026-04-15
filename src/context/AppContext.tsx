"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useAuth } from "@clerk/nextjs";
import {
  Reflection,
  Book,
  Habit,
  GratitudeEntry,
  EmotionalConnection,
  IdentityTag,
  ReadingStatus,
  HabitStreak,
} from "@/lib/types";
import { getTodayString, calculateStreak } from "@/lib/helpers";

interface AppContextType {
  // Loading state
  loading: boolean;

  // Data
  reflections: Reflection[];
  books: Book[];
  habits: Habit[];
  gratitudeEntries: GratitudeEntry[];
  connections: EmotionalConnection[];
  userIdentities: IdentityTag[];

  // Reflection actions
  addReflection: (r: Omit<Reflection, "id" | "createdAt">) => Promise<void>;
  getReflectionsByDate: (date: string) => Reflection[];
  getTodayReflections: () => Reflection[];

  // Book actions
  addBook: (b: Omit<Book, "id" | "createdAt">) => Promise<void>;
  updateBook: (id: string, updates: Partial<Book>) => Promise<void>;
  removeBook: (id: string) => Promise<void>;
  getBookById: (id: string) => Book | undefined;
  getBooksByStatus: (status: ReadingStatus) => Book[];

  // Habit actions
  addHabit: (h: Omit<Habit, "id" | "createdAt" | "completedDates">) => Promise<void>;
  toggleHabitToday: (id: string) => Promise<void>;
  getHabitStreak: (id: string) => HabitStreak;

  // Gratitude actions
  addGratitudeEntry: (e: Omit<GratitudeEntry, "id" | "createdAt">) => Promise<void>;

  // Connection actions
  addConnection: (c: Omit<EmotionalConnection, "id">) => Promise<void>;
  updateConnection: (id: string, updates: Partial<EmotionalConnection>) => Promise<void>;

  // Identity
  setUserIdentities: (identities: IdentityTag[]) => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

// Safe JSON parse — returns null if response body is empty or not JSON
async function safeJson(res: Response) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();

  const [loading, setLoading] = useState(true);
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeEntry[]>([]);
  const [connections, setConnections] = useState<EmotionalConnection[]>([]);
  const [userIdentities, setUserIdentitiesState] = useState<IdentityTag[]>([]);

  // Fetch all data when signed in
  useEffect(() => {
    // Wait for Clerk to finish loading before doing anything
    if (!isLoaded) return;

    if (!isSignedIn) {
      setLoading(false);
      setReflections([]);
      setBooks([]);
      setHabits([]);
      setGratitudeEntries([]);
      setConnections([]);
      setUserIdentitiesState([]);
      return;
    }

    async function fetchAll() {
      setLoading(true);
      try {
        const [refRes, bookRes, habitRes, gratRes, connRes, idRes] = await Promise.all([
          fetch("/api/reflections"),
          fetch("/api/books"),
          fetch("/api/habits"),
          fetch("/api/gratitude"),
          fetch("/api/connections"),
          fetch("/api/identities"),
        ]);

        const [refData, bookData, habitData, gratData, connData, idData] = await Promise.all([
          refRes.ok ? refRes.json() : [],
          bookRes.ok ? bookRes.json() : [],
          habitRes.ok ? habitRes.json() : [],
          gratRes.ok ? gratRes.json() : [],
          connRes.ok ? connRes.json() : [],
          idRes.ok ? idRes.json() : { identities: [] },
        ]);

        // Map DB snake_case to our camelCase types
        setReflections(
          (Array.isArray(refData) ? refData : []).map(mapReflection)
        );
        setBooks(
          (Array.isArray(bookData) ? bookData : []).map(mapBook)
        );
        setHabits(
          (Array.isArray(habitData) ? habitData : []).map(mapHabit)
        );
        setGratitudeEntries(
          (Array.isArray(gratData) ? gratData : []).map(mapGratitude)
        );
        setConnections(
          (Array.isArray(connData) ? connData : []).map(mapConnection)
        );
        setUserIdentitiesState(idData?.identities || []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [isSignedIn, isLoaded]);

  // ===== Reflection actions =====
  const addReflection = useCallback(
    async (r: Omit<Reflection, "id" | "createdAt">) => {
      const res = await fetch("/api/reflections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: r.date,
          time: r.time,
          mood: r.mood,
          intensity: r.intensity,
          journal: r.journal,
          gratitude: r.gratitude || null,
        }),
      });
      if (res.ok) {
        const data = await safeJson(res);
        if (data) setReflections((prev) => [mapReflection(data), ...prev]);
      }
    },
    []
  );

  const getReflectionsByDate = useCallback(
    (date: string) => reflections.filter((r) => r.date === date),
    [reflections]
  );

  const getTodayReflections = useCallback(
    () => reflections.filter((r) => r.date === getTodayString()),
    [reflections]
  );

  // ===== Book actions =====
  const addBook = useCallback(
    async (b: Omit<Book, "id" | "createdAt">) => {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: b.title,
          author: b.author,
          status: b.status,
          rating: b.rating || null,
          genre: b.genre,
          reason_to_read: b.reasonToRead || "",
          personal_connection: b.personalConnection || "",
          notes: b.notes || "",
          start_date: b.startDate || null,
          finish_date: b.finishDate || null,
          cover_url: b.coverUrl || null,
          open_library_key: b.openLibraryKey || null,
        }),
      });
      if (res.ok) {
        const data = await safeJson(res);
        if (data) setBooks((prev) => [mapBook(data), ...prev]);
      }
    },
    []
  );

  const updateBook = useCallback(
    async (id: string, updates: Partial<Book>) => {
      // Map camelCase to snake_case for the API
      const dbUpdates: Record<string, unknown> = {};
      if (updates.title !== undefined) dbUpdates.title = updates.title;
      if (updates.author !== undefined) dbUpdates.author = updates.author;
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.rating !== undefined) dbUpdates.rating = updates.rating;
      if (updates.genre !== undefined) dbUpdates.genre = updates.genre;
      if (updates.reasonToRead !== undefined) dbUpdates.reason_to_read = updates.reasonToRead;
      if (updates.personalConnection !== undefined) dbUpdates.personal_connection = updates.personalConnection;
      if (updates.notes !== undefined) dbUpdates.notes = updates.notes;
      if (updates.startDate !== undefined) dbUpdates.start_date = updates.startDate;
      if (updates.finishDate !== undefined) dbUpdates.finish_date = updates.finishDate;

      const res = await fetch("/api/books", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...dbUpdates }),
      });
      if (res.ok) {
        const data = await safeJson(res);
        if (data) setBooks((prev) => prev.map((b) => (b.id === id ? mapBook(data) : b)));
      }
    },
    []
  );

  const removeBook = useCallback(async (id: string) => {
    const res = await fetch("/api/books", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
    }
  }, []);

  const getBookById = useCallback(
    (id: string) => books.find((b) => b.id === id),
    [books]
  );

  const getBooksByStatus = useCallback(
    (status: ReadingStatus) => books.filter((b) => b.status === status),
    [books]
  );

  // ===== Habit actions =====
  const addHabit = useCallback(
    async (h: Omit<Habit, "id" | "createdAt" | "completedDates">) => {
      const res = await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: h.name,
          description: h.description,
          identity_tags: h.identityTags,
          is_suggested: h.isSuggested,
        }),
      });
      if (res.ok) {
        const data = await safeJson(res);
        if (data) setHabits((prev) => [mapHabit(data), ...prev]);
      }
    },
    []
  );

  const toggleHabitToday = useCallback(
    async (id: string) => {
      const today = getTodayString();
      const res = await fetch("/api/habits/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ habit_id: id, completed_date: today }),
      });
      if (res.ok) {
        const data = await safeJson(res);
        if (data) {
          setHabits((prev) =>
            prev.map((h) => {
              if (h.id !== id) return h;
              if (data.action === "added") {
                return { ...h, completedDates: [...h.completedDates, today] };
              } else {
                return {
                  ...h,
                  completedDates: h.completedDates.filter((d) => d !== today),
                };
              }
            })
          );
        }
      }
    },
    []
  );

  const getHabitStreak = useCallback(
    (id: string): HabitStreak => {
      const habit = habits.find((h) => h.id === id);
      if (!habit) return { habitId: id, currentStreak: 0, longestStreak: 0, completedToday: false };
      const { currentStreak, longestStreak, completedToday } = calculateStreak(habit.completedDates);
      return { habitId: id, currentStreak, longestStreak, completedToday };
    },
    [habits]
  );

  // ===== Gratitude actions =====
  const addGratitudeEntry = useCallback(
    async (e: Omit<GratitudeEntry, "id" | "createdAt">) => {
      const res = await fetch("/api/gratitude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: e.date,
          person_or_thing: e.personOrThing,
          message: e.message,
          emotion: e.emotion,
        }),
      });
      if (res.ok) {
        const data = await safeJson(res);
        if (data) setGratitudeEntries((prev) => [mapGratitude(data), ...prev]);
      }
    },
    []
  );

  // ===== Connection actions =====
  const addConnection = useCallback(
    async (c: Omit<EmotionalConnection, "id">) => {
      const res = await fetch("/api/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: c.name,
          relationship_type: c.relationshipType,
          last_appreciation: c.lastAppreciation || "",
          harmony_level: c.harmonyLevel,
          notes: c.notes || "",
        }),
      });
      if (res.ok) {
        const data = await safeJson(res);
        if (data) setConnections((prev) => [mapConnection(data), ...prev]);
      }
    },
    []
  );

  const updateConnection = useCallback(
    async (id: string, updates: Partial<EmotionalConnection>) => {
      const dbUpdates: Record<string, unknown> = {};
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.relationshipType !== undefined) dbUpdates.relationship_type = updates.relationshipType;
      if (updates.lastAppreciation !== undefined) dbUpdates.last_appreciation = updates.lastAppreciation;
      if (updates.harmonyLevel !== undefined) dbUpdates.harmony_level = updates.harmonyLevel;
      if (updates.notes !== undefined) dbUpdates.notes = updates.notes;

      const res = await fetch("/api/connections", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...dbUpdates }),
      });
      if (res.ok) {
        const data = await safeJson(res);
        if (data) {
          setConnections((prev) =>
            prev.map((c) => (c.id === id ? mapConnection(data) : c))
          );
        }
      }
    },
    []
  );

  // ===== Identity actions =====
  const setUserIdentities = useCallback(async (identities: IdentityTag[]) => {
    setUserIdentitiesState(identities);
    await fetch("/api/identities", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identities }),
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        reflections,
        books,
        habits,
        gratitudeEntries,
        connections,
        userIdentities,
        addReflection,
        getReflectionsByDate,
        getTodayReflections,
        addBook,
        updateBook,
        removeBook,
        getBookById,
        getBooksByStatus,
        addHabit,
        toggleHabitToday,
        getHabitStreak,
        addGratitudeEntry,
        addConnection,
        updateConnection,
        setUserIdentities,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

// ===== Mappers from DB snake_case to TypeScript camelCase =====
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapReflection(d: any): Reflection {
  return {
    id: d.id,
    date: d.date,
    time: d.time,
    mood: d.mood,
    intensity: d.intensity,
    journal: d.journal,
    gratitude: d.gratitude || undefined,
    createdAt: d.created_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapBook(d: any): Book {
  return {
    id: d.id,
    title: d.title,
    author: d.author,
    status: d.status,
    rating: d.rating || undefined,
    genre: d.genre,
    reasonToRead: d.reason_to_read || "",
    personalConnection: d.personal_connection || "",
    notes: d.notes || "",
    startDate: d.start_date || undefined,
    finishDate: d.finish_date || undefined,
    coverUrl: d.cover_url || undefined,
    openLibraryKey: d.open_library_key || undefined,
    createdAt: d.created_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapHabit(d: any): Habit {
  return {
    id: d.id,
    name: d.name,
    description: d.description || "",
    identityTags: d.identity_tags || [],
    isSuggested: d.is_suggested || false,
    completedDates: d.completedDates || [],
    createdAt: d.created_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapGratitude(d: any): GratitudeEntry {
  return {
    id: d.id,
    date: d.date,
    personOrThing: d.person_or_thing,
    message: d.message,
    emotion: d.emotion,
    createdAt: d.created_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapConnection(d: any): EmotionalConnection {
  return {
    id: d.id,
    name: d.name,
    relationshipType: d.relationship_type,
    lastAppreciation: d.last_appreciation || "",
    harmonyLevel: d.harmony_level,
    notes: d.notes || "",
  };
}
