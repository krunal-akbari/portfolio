# Glass Planner (WorkOS Auth)

A single-user task planner built with Next.js + WorkOS AuthKit.

## Features

- WorkOS sign-in/sign-out
- Single-user gate using `ALLOWED_EMAIL`
- Jira-style task fields:
  - title
  - description
  - image URL
  - priority (`low`, `medium`, `high`, `critical`)
  - category (`work`, `personal`, `social`)
  - status (`todo`, `in_progress`, `done`)
  - due date
- Workspace modes (`Kanban`, `Calendar`, `Settings`, `Priority Matrix`)
- Header search + quick add controls
- Calendar sync controls in `Settings` (auto-sync after one-time subscription)
- Supabase-backed task persistence (with file fallback if Supabase is not configured)

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
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_TASKS_TABLE=tasks
```

Notes:

- `WORKOS_COOKIE_PASSWORD` must be at least 32 characters.
- `APP_BASE_URL` must match where you open the app.
- `CALENDAR_FEED_TOKEN` enables external calendar subscription (Google/Apple) without browser auth.
- Use `SUPABASE_SERVICE_ROLE_KEY` (server key), not the publishable/anon key, for server-side task writes.
- If you already added misspelled keys, the app also supports `SUPPERBASE_PROJECT_URI` and `SUPPERBASE_KEY`.

## 3) Create Supabase table

Run this in Supabase SQL Editor:

```sql
create table if not exists public.tasks (
  id text primary key,
  title text not null,
  description text not null default '',
  priority text not null check (priority in ('low', 'medium', 'high', 'critical')),
  category text not null check (category in ('work', 'personal', 'social')),
  image_url text null,
  status text not null check (status in ('todo', 'in_progress', 'done')),
  due_date date null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tasks_updated_at_idx on public.tasks (updated_at desc);
```

## 4) Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 5) Docker

Build and run:

```bash
docker build -t glass-todo .
docker run --rm -p 3000:3000 -v glass-todo-data:/data --env-file .env.local glass-todo
```

Quick local mode (no WorkOS env required):

```bash
docker run --rm -p 3000:3000 -v glass-todo-data:/data glass-todo
```

## 6) Vercel (free tier)

Works on Vercel free tier with standard Next.js config.

1. Import repository in Vercel.
2. Framework preset: `Next.js`.
3. Add all env vars from `.env.example`.
4. Set WorkOS redirect URI to your deployed callback URL:
   - `https://your-project.vercel.app/callback`
5. Set `APP_BASE_URL` and `NEXT_PUBLIC_WORKOS_REDIRECT_URI` to your deployed domain.
6. Add Supabase vars in Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_TASKS_TABLE` (`tasks`)

## Storage note

Task data uses Supabase when configured. If Supabase env is missing, app falls back to JSON file storage (`.data/glass-todo-tasks.json`, or `TASKS_STORAGE_FILE` if set).

- Supabase mode is durable and recommended for Vercel.
- File mode is good for local/dev and single-instance Docker.

## Project structure

- `middleware.ts`: AuthKit middleware
- `src/app/callback/route.ts`: WorkOS callback handler
- `src/app/api/tasks/*`: task CRUD API
- `src/app/api/calendar/ics/route.ts`: ICS feed for calendar sync
- `src/app/api/calendar/feed-url/route.ts`: feed/subscription URLs
- `src/components/planner-app.tsx`: Kanban + calendar UI
- `src/lib/task-store.ts`: Supabase-backed task storage with file fallback
