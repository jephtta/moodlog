export type MoodType = "great" | "good" | "okay" | "bad" | "awful";

export const MOODS: { type: MoodType; emoji: string; label: string; color: string }[] = [
  { type: "great", emoji: "\u{1F929}", label: "Great", color: "#22c55e" },
  { type: "good", emoji: "\u{1F60A}", label: "Good", color: "#eab308" },
  { type: "okay", emoji: "\u{1F610}", label: "Okay", color: "#6b7280" },
  { type: "bad", emoji: "\u{1F61E}", label: "Bad", color: "#f97316" },
  { type: "awful", emoji: "\u{1F622}", label: "Awful", color: "#ef4444" },
];

export type MoodEntry = {
  id: string;
  date: string; // YYYY-MM-DD
  mood: MoodType;
  note?: string;
  userId: string;
  updatedAt: number;
};
