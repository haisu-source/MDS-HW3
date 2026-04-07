import { NatureElement, NatureElementInfo } from "./types";

export const NATURE_ELEMENTS: NatureElementInfo[] = [
  {
    id: "seedling",
    emoji: "🌱",
    label: "Seedling",
    description: "Fresh start, hopeful",
    color: "bg-green-100 border-green-400 text-green-800",
  },
  {
    id: "herb",
    emoji: "🌿",
    label: "Herb",
    description: "Calm, grounded",
    color: "bg-emerald-100 border-emerald-400 text-emerald-800",
  },
  {
    id: "blossom",
    emoji: "🌸",
    label: "Blossom",
    description: "Joyful, blooming",
    color: "bg-pink-100 border-pink-400 text-pink-800",
  },
  {
    id: "ocean",
    emoji: "🌊",
    label: "Ocean",
    description: "Deep emotion, contemplative",
    color: "bg-blue-100 border-blue-400 text-blue-800",
  },
  {
    id: "sun",
    emoji: "🌤️",
    label: "Sun",
    description: "Bright, energetic",
    color: "bg-yellow-100 border-yellow-400 text-yellow-800",
  },
  {
    id: "fallen-leaf",
    emoji: "🍂",
    label: "Fallen Leaf",
    description: "Melancholic, reflective",
    color: "bg-orange-100 border-orange-400 text-orange-800",
  },
  {
    id: "rainbow",
    emoji: "🌈",
    label: "Rainbow",
    description: "Grateful, at peace",
    color: "bg-violet-100 border-violet-400 text-violet-800",
  },
  {
    id: "storm",
    emoji: "⛈️",
    label: "Storm",
    description: "Stressed, turbulent",
    color: "bg-gray-200 border-gray-500 text-gray-800",
  },
  {
    id: "snow",
    emoji: "❄️",
    label: "Snow",
    description: "Numb, quiet",
    color: "bg-sky-50 border-sky-300 text-sky-700",
  },
  {
    id: "fire",
    emoji: "🔥",
    label: "Fire",
    description: "Passionate, driven",
    color: "bg-red-100 border-red-400 text-red-800",
  },
  {
    id: "mushroom",
    emoji: "🍄",
    label: "Mushroom",
    description: "Curious, exploring",
    color: "bg-amber-100 border-amber-400 text-amber-800",
  },
  {
    id: "mountain",
    emoji: "🏔️",
    label: "Mountain",
    description: "Strong, enduring",
    color: "bg-stone-200 border-stone-500 text-stone-800",
  },
];

export function getNatureElement(id: NatureElement): NatureElementInfo {
  return NATURE_ELEMENTS.find((el) => el.id === id)!;
}
