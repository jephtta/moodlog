"use client";

import { useState, useEffect } from "react";
import { MOODS, MoodType, MoodEntry } from "@/lib/moods";
import { saveMoodEntry } from "@/lib/firestore";
import { useAuth } from "@/lib/auth-context";

function todayDate(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

type Props = {
  todayEntry: MoodEntry | null;
  onSaved: () => void;
};

export function MoodEntryForm({ todayEntry, onSaved }: Props) {
  const { user } = useAuth();
  const [selected, setSelected] = useState<MoodType | null>(null);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (todayEntry) {
      setSelected(todayEntry.mood);
      setNote(todayEntry.note || "");
    }
  }, [todayEntry]);

  const handleSave = async () => {
    if (!selected || !user) return;
    setSaving(true);
    try {
      await saveMoodEntry(user.uid, todayDate(), selected, note);
      onSaved();
    } finally {
      setSaving(false);
    }
  };

  const currentMood = todayEntry ? MOODS.find((m) => m.type === todayEntry.mood) : null;

  return (
    <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 space-y-5">
      {currentMood && (
        <p className="text-center text-gray-400 text-sm">
          Today&apos;s mood: <span className="text-lg">{currentMood.emoji}</span>{" "}
          {currentMood.label} — tap to change
        </p>
      )}

      <div className="flex justify-center gap-3">
        {MOODS.map((mood) => (
          <button
            key={mood.type}
            onClick={() => setSelected(mood.type)}
            className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all"
            style={{
              boxShadow: selected === mood.type ? `0 0 0 3px ${mood.color}` : "none",
              background: selected === mood.type ? `${mood.color}15` : "transparent",
            }}
            aria-label={mood.label}
          >
            <span className="text-4xl md:text-5xl">{mood.emoji}</span>
            <span className="text-xs text-gray-400">{mood.label}</span>
          </button>
        ))}
      </div>

      <input
        type="text"
        maxLength={200}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note (optional)"
        className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222222] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#6366f1] text-sm"
      />

      <button
        onClick={handleSave}
        disabled={!selected || saving}
        className="w-full py-2.5 bg-[#6366f1] hover:bg-[#5558e6] text-white rounded-lg font-medium disabled:opacity-50 transition-colors"
      >
        {saving ? "Saving..." : todayEntry ? "Update Mood" : "Log Mood"}
      </button>
    </div>
  );
}
