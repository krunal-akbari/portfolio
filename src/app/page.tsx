import Link from "next/link";
import { redirect } from "next/navigation";
import { getSignInUrl } from "@workos-inc/authkit-nextjs";

import { hasRequiredAuthConfig } from "@/lib/auth";

const APP_LINKS = [
  {
    label: "task planner",
    href: "/apps/planner",
  },
  {
    label: "notes desk",
    href: "/apps/notes",
  },
  {
    label: "focus timer",
    href: "/apps/focus",
  },
] as const;

type PageProps = {
  searchParams: Promise<{ tab?: string }>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const query = await searchParams;
  if (query.tab) {
    redirect(`/apps/planner?tab=${encodeURIComponent(query.tab)}`);
  }

  let loginHref = "/apps/planner";
  if (hasRequiredAuthConfig()) {
    try {
      loginHref = await getSignInUrl({ returnTo: "/apps/planner" });
    } catch {
      loginHref = "/apps/planner";
    }
  }

  return (
    <main className="home-minimal">
      <header className="home-topbar">
        <Link href={loginHref} className="home-login-btn">
          Login
        </Link>
      </header>

      <section className="home-center-list">
        <p className="home-title">krunal</p>
        <p className="home-subtitle">builds things</p>

        <nav aria-label="Applications" className="home-links">
          {APP_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="home-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
