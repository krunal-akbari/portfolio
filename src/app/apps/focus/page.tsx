import Link from "next/link";

export default function FocusPage() {
  return (
    <main className="shell launcher-shell">
      <section className="glass-card app-placeholder">
        <p className="subtle">Focus Timer</p>
        <h1>Focus timer workspace is ready for extension.</h1>
        <p className="subtle">
          This route is connected in the launcher. You can now build timer flows in this module.
        </p>
        <div className="app-placeholder-actions">
          <Link href="/" className="secondary-btn">
            Back to Launcher
          </Link>
          <Link href="/apps/planner" className="primary-btn">
            Open Task Planner
          </Link>
        </div>
      </section>
    </main>
  );
}
