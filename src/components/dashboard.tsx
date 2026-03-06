"use client";

import { useEffect, useState, useCallback } from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { MoodEntryForm } from "./mood-entry";
import { MoodCalendar } from "./mood-calendar";
import { getEntriesForMonth } from "@/lib/firestore";
import { MoodEntry } from "@/lib/moods";

export function Dashboard() {
  const { user, signOut } = useAuth();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [month, setMonth] = useState(() => new Date().getMonth());

  const loadEntries = useCallback(async () => {
    if (!user) return;
    const data = await getEntriesForMonth(user.uid, year, month);
    setEntries(data);
  }, [user, year, month]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const todayStr = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  })();

  const todayEntry = entries.find((e) => e.date === todayStr) || null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-8">
      <div className="max-w-[600px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">MoodLog</h1>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        <MoodEntryForm todayEntry={todayEntry} onSaved={loadEntries} />

        <MoodCalendar
          entries={entries}
          year={year}
          month={month}
          onMonthChange={(y, m) => { setYear(y); setMonth(m); }}
        />
      </div>
    </div>
  );
}
