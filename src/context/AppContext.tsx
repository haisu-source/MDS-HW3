"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
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
import { generateId, getTodayString, calculateStreak } from "@/lib/helpers";

interface AppContextType {
  // Data
  reflections: Reflection[];
  books: Book[];
  habits: Habit[];
  gratitudeEntries: GratitudeEntry[];
  connections: EmotionalConnection[];
  userIdentities: IdentityTag[];

  // Reflection actions
  addReflection: (r: Omit<Reflection, "id" | "createdAt">) => void;
  getReflectionsByDate: (date: string) => Reflection[];
  getTodayReflections: () => Reflection[];

  // Book actions
  addBook: (b: Omit<Book, "id" | "createdAt">) => void;
  updateBook: (id: string, updates: Partial<Book>) => void;
  getBookById: (id: string) => Book | undefined;
  getBooksByStatus: (status: ReadingStatus) => Book[];

  // Habit actions
  addHabit: (h: Omit<Habit, "id" | "createdAt" | "completedDates">) => void;
  toggleHabitToday: (id: string) => void;
  getHabitStreak: (id: string) => HabitStreak;

  // Gratitude actions
  addGratitudeEntry: (e: Omit<GratitudeEntry, "id" | "createdAt">) => void;

  // Connection actions
  addConnection: (c: Omit<EmotionalConnection, "id">) => void;
  updateConnection: (id: string, updates: Partial<EmotionalConnection>) => void;

  // Identity
  setUserIdentities: (identities: IdentityTag[]) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeEntry[]>([]);
  const [connections, setConnections] = useState<EmotionalConnection[]>([]);
  const [userIdentities, setUserIdentities] = useState<IdentityTag[]>([]);

  // Reflection actions
  const addReflection = useCallback((r: Omit<Reflection, "id" | "createdAt">) => {
    const newReflection: Reflection = {
      ...r,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setReflections((prev) => [newReflection, ...prev]);
  }, []);

  const getReflectionsByDate = useCallback(
    (date: string) => reflections.filter((r) => r.date === date),
    [reflections]
  );

  const getTodayReflections = useCallback(
    () => reflections.filter((r) => r.date === getTodayString()),
    [reflections]
  );

  // Book actions
  const addBook = useCallback((b: Omit<Book, "id" | "createdAt">) => {
    const newBook: Book = {
      ...b,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setBooks((prev) => [newBook, ...prev]);
  }, []);

  const updateBook = useCallback((id: string, updates: Partial<Book>) => {
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  }, []);

  const getBookById = useCallback(
    (id: string) => books.find((b) => b.id === id),
    [books]
  );

  const getBooksByStatus = useCallback(
    (status: ReadingStatus) => books.filter((b) => b.status === status),
    [books]
  );

  // Habit actions
  const addHabit = useCallback(
    (h: Omit<Habit, "id" | "createdAt" | "completedDates">) => {
      const newHabit: Habit = {
        ...h,
        id: generateId(),
        completedDates: [],
        createdAt: new Date().toISOString(),
      };
      setHabits((prev) => [newHabit, ...prev]);
    },
    []
  );

  const toggleHabitToday = useCallback((id: string) => {
    const today = getTodayString();
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const alreadyDone = h.completedDates.includes(today);
        return {
          ...h,
          completedDates: alreadyDone
            ? h.completedDates.filter((d) => d !== today)
            : [...h.completedDates, today],
        };
      })
    );
  }, []);

  const getHabitStreak = useCallback(
    (id: string): HabitStreak => {
      const habit = habits.find((h) => h.id === id);
      if (!habit) return { habitId: id, currentStreak: 0, longestStreak: 0, completedToday: false };
      const { currentStreak, longestStreak, completedToday } = calculateStreak(habit.completedDates);
      return { habitId: id, currentStreak, longestStreak, completedToday };
    },
    [habits]
  );

  // Gratitude actions
  const addGratitudeEntry = useCallback(
    (e: Omit<GratitudeEntry, "id" | "createdAt">) => {
      const newEntry: GratitudeEntry = {
        ...e,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      setGratitudeEntries((prev) => [newEntry, ...prev]);
    },
    []
  );

  // Connection actions
  const addConnection = useCallback((c: Omit<EmotionalConnection, "id">) => {
    const newConn: EmotionalConnection = {
      ...c,
      id: generateId(),
    };
    setConnections((prev) => [newConn, ...prev]);
  }, []);

  const updateConnection = useCallback(
    (id: string, updates: Partial<EmotionalConnection>) => {
      setConnections((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
      );
    },
    []
  );

  return (
    <AppContext.Provider
      value={{
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
