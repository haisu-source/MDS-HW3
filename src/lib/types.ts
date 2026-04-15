export type NatureElement =
  | "seedling"
  | "herb"
  | "blossom"
  | "ocean"
  | "sun"
  | "fallen-leaf"
  | "rainbow"
  | "storm"
  | "snow"
  | "fire"
  | "mushroom"
  | "mountain";

export interface NatureElementInfo {
  id: NatureElement;
  emoji: string;
  label: string;
  description: string;
  color: string;
}

export interface Reflection {
  id: string;
  date: string;
  time: string;
  mood: NatureElement;
  intensity: number;
  journal: string;
  gratitude?: string;
  createdAt: string;
}

export type ReadingStatus = "want-to-read" | "currently-reading" | "finished" | "paused";

export interface Book {
  id: string;
  title: string;
  author: string;
  status: ReadingStatus;
  rating?: number;
  genre: string;
  reasonToRead: string;
  personalConnection: string;
  notes: string;
  startDate?: string;
  finishDate?: string;
  coverUrl?: string;
  openLibraryKey?: string;
  createdAt: string;
}

export type IdentityTag = "student" | "coder" | "learner" | "writer" | "mindful" | "creative";

export interface Habit {
  id: string;
  name: string;
  description: string;
  identityTags: IdentityTag[];
  isSuggested: boolean;
  completedDates: string[];
  createdAt: string;
}

export interface HabitStreak {
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  completedToday: boolean;
}

export interface GratitudeEntry {
  id: string;
  date: string;
  personOrThing: string;
  message: string;
  emotion: string;
  createdAt: string;
}

export interface EmotionalConnection {
  id: string;
  name: string;
  relationshipType: string;
  lastAppreciation: string;
  harmonyLevel: number;
  notes: string;
}

export interface AppState {
  reflections: Reflection[];
  books: Book[];
  habits: Habit[];
  gratitudeEntries: GratitudeEntry[];
  connections: EmotionalConnection[];
  userIdentities: IdentityTag[];
}
