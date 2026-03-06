# MoodLog

A daily mood tracker. Log how you're feeling each day, add optional notes, and view your mood history on a monthly calendar. Built with Firebase Auth for accounts and Firestore for storage.

**Live:** https://moodlog-cgjawpkxua-uc.a.run.app

## Prerequisites

- Node.js 22+
- A Firebase project with Auth (email/password) and Firestore enabled
- (For deployment) Google Cloud CLI, Docker, and `gh` CLI

## Local Setup

```bash
# Install dependencies
npm install

# Copy environment template and fill in your Firebase config
cp .env.example .env.local

# Start dev server
npm run dev
```

Open http://localhost:3000.

## Environment Variables

All are required and set as `NEXT_PUBLIC_*` since they're used client-side.

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API key (Project Settings → General) |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `<project-id>.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `<project-id>.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Cloud Messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `NEXT_PUBLIC_FIREBASE_DATABASE_NAME` | Firestore database name (default: `moodlog`) |

## Running Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install chromium

# Run all E2E tests
npx playwright test

# Run with UI
npx playwright test --ui
```

## Tech Stack

- **Frontend:** Next.js (App Router) + React + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Auth:** Firebase Auth (email/password)
- **Database:** Firebase Firestore
- **Hosting:** Google Cloud Run
- **Tests:** Playwright

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with AuthProvider
│   └── page.tsx            # Routes to AuthForm or Dashboard
├── components/
│   ├── auth-form.tsx       # Sign in / sign up form
│   ├── dashboard.tsx       # Main logged-in view
│   ├── mood-calendar.tsx   # Monthly calendar with mood dots
│   └── mood-entry.tsx      # Today's mood picker + note
└── lib/
    ├── auth-context.tsx    # Firebase Auth React context
    ├── firebase.ts         # Firebase app init
    ├── firestore.ts        # Firestore read/write helpers
    ├── moods.ts            # Mood types and emoji definitions
    └── utils.ts            # cn() utility
```
