export function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(timeStr: string): string {
  const [hours, minutes] = timeStr.split(":");
  const h = parseInt(hours);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
}

export function getCurrentTime(): string {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function getRelativeDate(dateStr: string): string {
  const today = getTodayString();
  const target = new Date(dateStr + "T12:00:00");
  const now = new Date(today + "T12:00:00");
  const diff = Math.floor((now.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff} days ago`;
  return formatDate(dateStr);
}

export function calculateStreak(completedDates: string[]): {
  currentStreak: number;
  longestStreak: number;
  completedToday: boolean;
} {
  if (completedDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0, completedToday: false };
  }

  const sorted = [...completedDates].sort().reverse();
  const today = getTodayString();
  const completedToday = sorted[0] === today;

  // Calculate current streak
  let currentStreak = 0;
  const startDate = new Date((completedToday ? today : sorted[0]) + "T12:00:00");

  for (let i = 0; i < sorted.length; i++) {
    const expected = new Date(startDate);
    expected.setDate(expected.getDate() - i);
    const expectedStr = expected.toISOString().split("T")[0];

    if (sorted.includes(expectedStr)) {
      currentStreak++;
    } else {
      break;
    }
  }

  // If not completed today and the streak started from yesterday, it's still active
  if (!completedToday && sorted[0] !== today) {
    const yesterday = new Date(today + "T12:00:00");
    yesterday.setDate(yesterday.getDate() - 1);
    if (sorted[0] !== yesterday.toISOString().split("T")[0]) {
      currentStreak = 0;
    }
  }

  // Calculate longest streak
  const allSorted = [...completedDates].sort();
  let longestStreak = 1;
  let tempStreak = 1;

  for (let i = 1; i < allSorted.length; i++) {
    const prev = new Date(allSorted[i - 1] + "T12:00:00");
    const curr = new Date(allSorted[i] + "T12:00:00");
    const diffDays = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else if (diffDays > 1) {
      tempStreak = 1;
    }
  }

  longestStreak = Math.max(longestStreak, currentStreak);

  return { currentStreak, longestStreak, completedToday };
}
