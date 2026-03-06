import {
  doc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { MoodEntry, MoodType } from "./moods";

const COLLECTION = "mood_entries";

function entryDocId(userId: string, date: string) {
  return `${userId}_${date}`;
}

export async function saveMoodEntry(
  userId: string,
  date: string,
  mood: MoodType,
  note?: string
): Promise<void> {
  const docId = entryDocId(userId, date);
  await setDoc(doc(db, COLLECTION, docId), {
    id: docId,
    date,
    mood,
    note: note || "",
    userId,
    updatedAt: serverTimestamp(),
  });
}

export async function getEntriesForMonth(
  userId: string,
  year: number,
  month: number
): Promise<MoodEntry[]> {
  const startDate = `${year}-${String(month + 1).padStart(2, "0")}-01`;
  const endMonth = month === 11 ? 0 : month + 1;
  const endYear = month === 11 ? year + 1 : year;
  const endDate = `${endYear}-${String(endMonth + 1).padStart(2, "0")}-01`;

  const q = query(
    collection(db, COLLECTION),
    where("userId", "==", userId),
    where("date", ">=", startDate),
    where("date", "<", endDate)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: data.id,
      date: data.date,
      mood: data.mood,
      note: data.note,
      userId: data.userId,
      updatedAt: data.updatedAt?.toMillis?.() || Date.now(),
    } as MoodEntry;
  });
}
