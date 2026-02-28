# Glass Planner (WorkOS Auth)

A single-user task planner built with Next.js + WorkOS AuthKit.

## Features

- WorkOS sign-in/sign-out
- Single-user gate using `ALLOWED_EMAIL`
- Jira-style task fields:
  - title
  - description
  - priority (`low`, `medium`, `high`, `critical`)
  - status (`todo`, `in_progress`, `done`)
  - due date
- Tabbed workspace (`Kanban`, `Calendar`, `Settings`)
- Google Calendar + Apple Calendar sync controls in `Settings`

## 1) Configure WorkOS

In WorkOS Dashboard:

- Create/use an AuthKit app
- Add redirect URI: `http://localhost:3000/callback`
- Add logout URI for your app
- Copy `Client ID` and `API Key`

## 2) Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Set values (no quotes in env file):

```env
WORKOS_CLIENT_ID=client_...
WORKOS_API_KEY=sk_test_...
WORKOS_COOKIE_PASSWORD=replace-with-a-32-plus-character-secret
APP_BASE_URL=http://localhost:3000
NEXT_PUBLIC_WORKOS_REDIRECT_URI=http://localhost:3000/callback
ALLOWED_EMAIL=you@example.com
CALENDAR_FEED_TOKEN=replace-with-a-random-long-secret
TASKS_STORAGE_FILE=/tmp/glass-todo-tasks.json
```

Notes:

- `WORKOS_COOKIE_PASSWORD` must be at least 32 characters.
- `APP_BASE_URL` must match where you open the app.
- `CALENDAR_FEED_TOKEN` enables external calendar subscription (Google/Apple) without browser auth.

## 3) Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Docker

Build and run:

```bash
docker build -t glass-todo .
docker run --rm -p 3000:3000 --env-file .env.local glass-todo
```

## Vercel (free tier)

Works on Vercel free tier with standard Next.js config.

1. Import repository in Vercel.
2. Framework preset: `Next.js`.
3. Add all env vars from `.env.example`.
4. Set WorkOS redirect URI to your deployed callback URL:
   - `https://your-project.vercel.app/callback`
5. Set `APP_BASE_URL` and `NEXT_PUBLIC_WORKOS_REDIRECT_URI` to your deployed domain.

## Storage note

Task data is stored in a JSON file (default `/tmp/glass-todo-tasks.json`).

- Good for local/dev and single-instance Docker.
- In serverless environments (including Vercel), `/tmp` is ephemeral and can reset between instances.
- For durable production storage, connect a database.

## Project structure

- `middleware.ts`: AuthKit middleware
- `src/app/callback/route.ts`: WorkOS callback handler
- `src/app/api/tasks/*`: task CRUD API
- `src/app/api/calendar/ics/route.ts`: ICS feed for calendar sync
- `src/app/api/calendar/feed-url/route.ts`: feed/subscription URLs
- `src/components/planner-app.tsx`: Kanban + calendar UI
- `src/lib/task-store.ts`: JSON-backed task storage
