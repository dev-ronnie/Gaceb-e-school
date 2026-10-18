import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { GACEB_CONFIG } from "@/lib/config";
import { useGaceb } from "@/lib/gaceb";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/library", label: "PDF Library" },
  { to: "/events", label: "Live Events" },
  { to: "/planner", label: "Study Planner" },
  { to: "/announcements", label: "Announcements" },
  { to: "/coins", label: "Coins & Premium" },
  { to: "/assistant", label: "Gauge" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Crest({ className }: { className?: string }) {
  return (
    <img
      src="/brand/gaceb-logo.png"
      alt="Gauge-Caliper Examination Board"
      className={className ?? "h-12 w-auto"}
    />
  );
}

export function PageIntro({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="mb-8 max-w-3xl">
      <p className="text-xs font-semibold tracking-[0.18em] text-gold-deep uppercase">{kicker}</p>
      <h1 className="mt-2 font-display text-4xl leading-tight text-balance text-ink sm:text-5xl">{title}</h1>
      {lede ? <p className="mt-3 text-lg text-pretty text-muted">{lede}</p> : null}
      <div className="brand-bar mt-4 w-20 rounded-full" aria-hidden />
    </header>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { session, openAuth } = useGaceb();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-paper focus:p-3">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
        <div className="brand-bar" aria-hidden />
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-2">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <Crest className="h-14 w-auto shrink-0" />
            <span className="font-display text-lg leading-none text-ink">
              GACEB <b className="text-forest">Scholar</b>
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            {session ? (
              <Link to="/dashboard" className="btn btn-primary hidden sm:inline-flex">
                My account
              </Link>
            ) : (
              <button type="button" className="btn btn-primary hidden sm:inline-flex" onClick={() => openAuth("login")}>
                Log in
              </button>
            )}
            <button
              type="button"
              className="btn btn-outline min-w-11 px-3 lg:hidden"
              aria-label={open ? "Close navigation" : "Open navigation"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        <nav className="mx-auto hidden w-full max-w-6xl gap-1 overflow-x-auto px-4 pb-2 lg:flex" aria-label="Primary">
          {LINKS.map((l) => {
            const active = l.to === "/" ? path === "/" : path === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`shrink-0 rounded-full px-3 py-2 text-sm font-medium ${active ? "bg-forest text-paper" : "text-muted hover:bg-sage hover:text-forest"}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        {open ? (
          <nav className="grid gap-1 border-t border-line px-3 py-3 lg:hidden" aria-label="Mobile">
            {LINKS.map((l) => {
              const active = l.to === "/" ? path === "/" : path === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`rounded-2xl px-3 py-3 text-base font-medium ${active ? "bg-forest text-paper" : "text-ink hover:bg-sage"}`}
                >
                  {l.label}
                </Link>
              );
            })}
            {session ? (
              <Link to="/dashboard" className="btn btn-primary mt-1">
                My account
              </Link>
            ) : (
              <button type="button" className="btn btn-primary mt-1" onClick={() => openAuth("login")}>
                Log in
              </button>
            )}
          </nav>
        ) : null}
      </header>
      <main id="content" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 pb-28">
        {children}
      </main>
      <footer className="bg-paper">
        <div className="brand-bar" aria-hidden />
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="flex items-start gap-3">
            <Crest className="h-16 w-auto shrink-0" />
            <div>
              <b className="font-display text-lg">GACEB Scholar</b>
              <p className="text-sm text-muted">Learn today · Build tomorrow</p>
              <p className="mt-2 text-sm text-muted">Uganda curriculum study resources for O-Level and A-Level learners.</p>
            </div>
          </div>
          <nav aria-label="Learn" className="grid content-start gap-2 text-sm font-medium">
            <b className="text-xs tracking-widest text-gold-deep uppercase">Learn</b>
            <Link to="/courses" className="hover:text-forest">Courses</Link>
            <Link to="/library" className="hover:text-forest">PDF Library</Link>
            <Link to="/planner" className="hover:text-forest">Study Planner</Link>
            <Link to="/assistant" className="hover:text-forest">Gauge</Link>
          </nav>
          <nav aria-label="Community" className="grid content-start gap-2 text-sm font-medium">
            <b className="text-xs tracking-widest text-gold-deep uppercase">Community</b>
            <Link to="/events" className="hover:text-forest">Live Events</Link>
            <Link to="/announcements" className="hover:text-forest">Announcements</Link>
            <Link to="/coins" className="hover:text-forest">Coins & Premium</Link>
            <Link to="/donate" className="hover:text-forest">Donate</Link>
          </nav>
          <nav aria-label="Company" className="grid content-start gap-2 text-sm font-medium">
            <b className="text-xs tracking-widest text-gold-deep uppercase">GACEB</b>
            <Link to="/about" className="hover:text-forest">About</Link>
            <Link to="/contact" className="hover:text-forest">Contact</Link>
            <a href={`mailto:${GACEB_CONFIG.SUPPORT_EMAIL}`} className="break-all hover:text-forest">{GACEB_CONFIG.SUPPORT_EMAIL}</a>
            <Link to="/privacy" className="hover:text-forest">Privacy</Link>
            <Link to="/terms" className="hover:text-forest">Terms</Link>
          </nav>
        </div>
        <p className="border-t border-line py-5 text-center text-sm text-muted">© {new Date().getFullYear()} GACEB Scholar · Gauge-Caliper Examination Board · Made for learners.</p>
      </footer>
      <Link
        to="/donate"
        className="btn btn-gold fixed right-4 bottom-4 z-30 hidden shadow-lg sm:inline-flex"
      >
        <Heart className="size-4 fill-current" aria-hidden />
        Donate
      </Link>
    </div>
  );
}
