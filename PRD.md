# MoodLog — Product Requirements Document

**Version 1.0 | March 2026**

---

## 1. Product Overview

MoodLog is a minimal daily mood tracker. Users sign in, log how they're feeling with a single tap, and see a calendar-style history of their past moods. Quick, private, no friction.

---

## 2. Goals & Non-Goals

### Goals

- Email/password sign-up and sign-in via Firebase Auth.
- One-tap mood logging with 5 emoji options (great, good, okay, bad, awful).
- Optional short note (max 200 chars) with each mood entry.
- Calendar heat-map view showing mood history for the current month.
- Persist entries to Firestore, tied to the authenticated user.
- One entry per day — logging again on the same day overwrites the previous entry.

### Non-Goals (v1)

- Mood analytics, charts, or trend graphs.
- Sharing or social features.
- Push notifications or reminders.
- Multiple entries per day.
- Export or import data.

---

## 3. User Roles

### Authenticated User

A signed-in user who logs and views their own mood history.

### Unauthenticated Visitor

Sees a sign-in/sign-up page. Cannot access mood logging without signing in.

---

## 4. Core Features

### 4.1 Authentication

- Sign up with email and password.
- Sign in with email and password.
- Sign out button visible when logged in.
- Session persists across refreshes.
- Redirect to sign-in if unauthenticated.

### 4.2 Mood Entry

After sign-in, the user sees today's mood logger.

- **Mood selector**: 5 large emoji buttons in a row — great, good, okay, bad, awful.
- **Selected state**: The chosen emoji is highlighted with a colored ring.
- **Note field**: Optional text input below the emojis, placeholder "Add a note (optional)".
- **Save**: A "Log Mood" button saves the entry. If already logged today, it updates.
- **Today indicator**: Show "Today's mood: [emoji]" if already logged, with option to change.

### 4.3 Mood Calendar

Below the entry form, show a monthly calendar grid.

- Each day cell shows the emoji logged for that day, or is empty.
- Current day is highlighted with a border.
- Navigation arrows to move between months.
- Days with no entry are gray/empty.
- Tapping a past day shows the note for that day in a tooltip or small popup.

### 4.4 Data Persistence

- Entries stored in Firestore, keyed by user ID and date (YYYY-MM-DD).
- Entry schema: id, date (string YYYY-MM-DD), mood (string: great|good|okay|bad|awful), note (string, optional), userId, updatedAt (timestamp).
- One document per user per day — upsert on save.
- Entries load on sign-in and when navigating months.

---

## 5. Technical Requirements

- Next.js app with App Router.
- Firebase Auth for authentication.
- Firestore for data storage.
- Deploy to Google Cloud Run via Docker.
- HTTPS only.
- Users can only read/write their own entries (Firestore security rules).

---

## 6. Design Direction

- Dark theme with mood-colored accents (green for great, yellow for good, gray for okay, orange for bad, red for awful).
- Centered single-column layout, max 600px wide.
- Large emoji buttons (48px+), easy to tap on mobile.
- Clean calendar grid with rounded cells.
- Mobile-first responsive layout.

---

## 7. Success Metrics

- User can sign up, log a mood with a note, see it on the calendar, change today's mood, navigate to a different month and back, sign out, sign back in, and see their entry persisted.