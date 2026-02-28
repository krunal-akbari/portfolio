import Link from "next/link";
import { getSignInUrl, signOut, withAuth } from "@workos-inc/authkit-nextjs";

import { PlannerApp } from "@/components/planner-app";

type PageProps = {
  searchParams: Promise<{ tab?: string }>;
};

function normalizeEmail(email?: string | null) {
  return email?.trim().toLowerCase() ?? "";
}

function parseInitialTab(value?: string) {
  if (value === "calendar" || value === "settings") {
    return value;
  }

  return "kanban";
}

async function signOutAction() {
  "use server";
  await signOut();
}

export default async function HomePage({ searchParams }: PageProps) {
  const { user } = await withAuth();
  const query = await searchParams;
  const initialTab = parseInitialTab(query.tab);

  if (!user) {
    const signInUrl = await getSignInUrl({ returnTo: "/" });

    return (
      <main className="shell">
        <section className="glass-card auth-card">
          <p className="eyebrow">Task Planner</p>
          <h1>Sign in with WorkOS</h1>
          <Link href={signInUrl} className="primary-btn">
            Continue to Login
          </Link>
        </section>
      </main>
    );
  }

  const allowedEmail = normalizeEmail(process.env.ALLOWED_EMAIL);
  const hasAllowedEmailConfig = Boolean(allowedEmail);
  const currentEmail = normalizeEmail(user.email);
  const isAllowed = hasAllowedEmailConfig && allowedEmail === currentEmail;

  if (!hasAllowedEmailConfig) {
    return (
      <main className="shell">
        <section className="glass-card auth-card">
          <h1>Set ALLOWED_EMAIL</h1>
          <form action={signOutAction}>
            <button type="submit" className="secondary-btn">
              Sign out
            </button>
          </form>
        </section>
      </main>
    );
  }

  if (!isAllowed) {
    return (
      <main className="shell">
        <section className="glass-card auth-card">
          <h1>Access blocked</h1>
          <p className="subtle">
            Signed in as: <code>{currentEmail}</code>
          </p>
          <form action={signOutAction}>
            <button type="submit" className="secondary-btn">
              Sign out
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="shell app-shell">
      <header className="glass-card top-header">
        <div className="brand-wrap">
          <span className="logo-mark" aria-hidden>
            GP
          </span>
          <div>
            <h1>Glass Planner</h1>
            <p className="subtle">{user.email}</p>
          </div>
        </div>

        <div className="top-actions">
          <Link href="/?tab=kanban" className={`icon-btn ${initialTab === "kanban" ? "active" : ""}`} aria-label="Open Kanban tab">
            K
          </Link>
          <Link href="/?tab=calendar" className={`icon-btn ${initialTab === "calendar" ? "active" : ""}`} aria-label="Open Calendar tab">
            C
          </Link>
          <Link href="/?tab=settings" className={`icon-btn ${initialTab === "settings" ? "active" : ""}`} aria-label="Open Settings tab">
            ⚙
          </Link>
          <form action={signOutAction}>
            <button type="submit" className="secondary-btn compact-btn">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <PlannerApp initialTab={initialTab} />
    </main>
  );
}
