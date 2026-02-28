import Link from "next/link";
import { getSignInUrl, signOut, withAuth } from "@workos-inc/authkit-nextjs";

import { PlannerApp } from "@/components/planner-app";
import { hasRequiredAuthConfig } from "@/lib/auth";

type PageProps = {
  searchParams: Promise<{ tab?: string }>;
};

function normalizeEmail(email?: string | null) {
  return email?.trim().toLowerCase() ?? "";
}

function parseInitialTab(value?: string) {
  if (value === "swot") {
    return "matrix";
  }

  if (value === "calendar" || value === "settings" || value === "matrix") {
    return value;
  }

  return "kanban";
}

async function signOutAction() {
  "use server";
  await signOut();
}

export default async function HomePage({ searchParams }: PageProps) {
  const query = await searchParams;
  const initialTab = parseInitialTab(query.tab);
  const authEnabled = hasRequiredAuthConfig();

  if (!authEnabled) {
    return (
      <main className="shell app-shell">
        <PlannerApp initialTab={initialTab} localMode />
      </main>
    );
  }

  const { user } = await withAuth();

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
      <PlannerApp initialTab={initialTab} userEmail={user.email} signOutAction={signOutAction} />
    </main>
  );
}
