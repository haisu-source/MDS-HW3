import { IdentityTag } from "./types";

export interface HabitSuggestion {
  name: string;
  description: string;
  identityTags: IdentityTag[];
}

export const HABIT_SUGGESTIONS: HabitSuggestion[] = [
  // Student
  {
    name: "Review one concept before bed",
    description: "Spend 5 minutes revisiting something you learned today",
    identityTags: ["student"],
  },
  {
    name: "Write a 3-sentence class summary",
    description: "Capture the essence of today's learning in your own words",
    identityTags: ["student"],
  },
  {
    name: "Teach something to an imaginary friend",
    description: "Explain a concept out loud — teaching is the best learning",
    identityTags: ["student"],
  },
  // Coder
  {
    name: "Write pseudocode for tomorrow",
    description: "Plan one thing you'll build tomorrow in plain words",
    identityTags: ["coder"],
  },
  {
    name: "Read one open-source function",
    description: "Pick a project you admire and read just one function deeply",
    identityTags: ["coder"],
  },
  {
    name: "2-minute rubber duck debug",
    description: "Explain your current bug to a rubber duck (or yourself)",
    identityTags: ["coder"],
  },
  // Learner
  {
    name: "Ask one curious question",
    description: "Write down something you genuinely want to understand",
    identityTags: ["learner"],
  },
  {
    name: "Watch a 5-minute educational video",
    description: "Feed your curiosity with a short, focused video",
    identityTags: ["learner"],
  },
  {
    name: "Connect new to known",
    description: "Link something you just learned to something you already know",
    identityTags: ["learner"],
  },
  // Writer
  {
    name: "Write 3 sentences about anything",
    description: "Just write. No rules, no judgment, just words flowing",
    identityTags: ["writer"],
  },
  {
    name: "Describe your surroundings",
    description: "Look around and write what you see, hear, and feel",
    identityTags: ["writer"],
  },
  {
    name: "Rewrite one sentence you read today",
    description: "Take someone else's words and make them yours",
    identityTags: ["writer"],
  },
  // Mindful
  {
    name: "3 deep breaths before your phone",
    description: "Before unlocking your phone, take three slow breaths",
    identityTags: ["mindful"],
  },
  {
    name: "Notice 3 textures around you",
    description: "Touch three different surfaces and really feel them",
    identityTags: ["mindful"],
  },
  {
    name: "60 seconds of silence",
    description: "Just sit. No input, no output. Just being",
    identityTags: ["mindful"],
  },
  // Creative
  {
    name: "Doodle for 2 minutes",
    description: "Grab a pen and let your hand wander on paper",
    identityTags: ["creative"],
  },
  {
    name: "Combine two random words",
    description: "Pick two unrelated words and imagine what they'd create together",
    identityTags: ["creative"],
  },
  {
    name: "Photo of something beautiful",
    description: "Find one beautiful thing today and capture it",
    identityTags: ["creative"],
  },
];
