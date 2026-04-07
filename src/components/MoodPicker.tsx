"use client";

import { NatureElement } from "@/lib/types";
import { NATURE_ELEMENTS } from "@/lib/natureElements";

interface MoodPickerProps {
  selected: NatureElement | null;
  onSelect: (mood: NatureElement) => void;
}

export default function MoodPicker({ selected, onSelect }: MoodPickerProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-bark mb-3">
        How does your inner garden feel?
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {NATURE_ELEMENTS.map((el) => {
          const isSelected = selected === el.id;
          return (
            <button
              key={el.id}
              type="button"
              onClick={() => onSelect(el.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? `${el.color} ring-2 ring-offset-2 ring-terracotta scale-105 shadow-sm`
                  : "border-card-border bg-card hover:border-sand-dark hover:shadow-sm"
              }`}
            >
              <span className="text-3xl">{el.emoji}</span>
              <span className="text-xs font-semibold text-bark">{el.label}</span>
              <span className="text-[10px] text-muted leading-tight text-center">
                {el.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
