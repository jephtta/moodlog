"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MOODS, MoodEntry } from "@/lib/moods";

type Props = {
  entries: MoodEntry[];
  year: number;
  month: number;
  onMonthChange: (year: number, month: number) => void;
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function MoodCalendar({ entries, year, month, onMonthChange }: Props) {
  const [tooltip, setTooltip] = useState<{ date: string; note: string; mood: string } | null>(null);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const entryMap = new Map(entries.map((e) => [e.date, e]));

  const goPrev = () => {
    const m = month === 0 ? 11 : month - 1;
    const y = month === 0 ? year - 1 : year;
    onMonthChange(y, m);
  };

  const goNext = () => {
    const m = month === 11 ? 0 : month + 1;
    const y = month === 11 ? year + 1 : year;
    onMonthChange(y, m);
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={goPrev} className="p-1 text-gray-400 hover:text-white" aria-label="Previous month">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-white font-medium">
          {MONTH_NAMES[month]} {year}
        </h2>
        <button onClick={goNext} className="p-1 text-gray-400 hover:text-white" aria-label="Next month">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {DAY_LABELS.map((d) => (
          <div key={d} className="text-center text-xs text-gray-500 py-1">
            {d}
          </div>
        ))}

        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;

          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const entry = entryMap.get(dateStr);
          const mood = entry ? MOODS.find((m) => m.type === entry.mood) : null;
          const isToday = dateStr === todayStr;

          return (
            <div
              key={dateStr}
              className="relative flex flex-col items-center justify-center aspect-square rounded-lg cursor-default"
              style={{
                border: isToday ? "2px solid #6366f1" : "1px solid transparent",
                background: isToday ? "#6366f115" : "transparent",
              }}
              onClick={() => {
                if (entry?.note) {
                  setTooltip(tooltip?.date === dateStr ? null : { date: dateStr, note: entry.note, mood: mood?.emoji || "" });
                } else {
                  setTooltip(null);
                }
              }}
            >
              <span className="text-xs text-gray-500">{day}</span>
              {mood && <span className="text-lg leading-none">{mood.emoji}</span>}

              {tooltip?.date === dateStr && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#222222] border border-[#333333] rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap z-10 shadow-lg">
                  <span className="mr-1">{tooltip.mood}</span>
                  {tooltip.note}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
