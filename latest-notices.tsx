import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Megaphone } from "lucide-react";
import { useEffect, useState } from "react";
import {
  fetchSharedAnnouncements,
  fetchSharedEvents,
  mergeEvents,
  type Announcement,
  type CalEvent,
} from "@/lib/board";
import { prettyDate } from "@/lib/format";

/** Read-only home-page preview. Uses the existing board.ts fetchers; no database changes. */
export function LatestNotices() {
  const [notes, setNotes] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<CalEvent[]>([]);

  useEffect(() => {
    let live = true;
    void fetchSharedAnnouncements().then((rows) => {
      if (!live) return;
      const sorted = [...rows].sort(
        (a, b) => Number(b.pinned) - Number(a.pinned) || b.createdAt.localeCompare(a.createdAt),
      );
      setNotes(sorted.slice(0, 3));
    });
    void fetchSharedEvents().then((rows) => {
      if (!live) return;
      const today = new Date().toISOString().slice(0, 10);
      setEvents(mergeEvents(rows, []).filter((e) => e.eventDate >= today).slice(0, 4));
    });
    return () => {
      live = false;
    };
  }, []);

  return (
    <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]" aria-label="Latest from GACEB">
      <article className="rounded-card border border-line bg-paper p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 font-display text-2xl">
            <Megaphone className="size-5 text-burgundy" aria-hidden /> Latest notices
          </h2>
          <Link to="/announcements" className="inline-flex items-center gap-1 text-sm font-semibold text-forest">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>
        {notes.length === 0 ? (
          <p className="mt-3 text-muted">No notices right now. Check back soon.</p>
        ) : (
          <ul className="mt-3 grid gap-3">
            {notes.map((n) => (
              <li key={n.id} className="flex gap-3 rounded-2xl bg-cream p-3">
                {n.imageUrl ? (
                  <img src={n.imageUrl} alt="" className="size-16 shrink-0 rounded-xl object-cover" loading="lazy" />
                ) : null}
                <div className="min-w-0">
                  {n.pinned ? (
                    <p className="text-[0.7rem] font-bold tracking-widest text-gold-deep uppercase">Pinned</p>
                  ) : null}
                  <b className="block text-balance">{n.title}</b>
                  <p className="line-clamp-2 text-sm text-muted">{n.body}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </article>
      <article className="rounded-card border border-line bg-paper p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 font-display text-2xl">
            <CalendarDays className="size-5 text-gold-deep" aria-hidden /> Coming up
          </h2>
          <Link to="/events" className="inline-flex items-center gap-1 text-sm font-semibold text-forest">
            Calendar <ArrowRight className="size-4" />
          </Link>
        </div>
        {events.length === 0 ? (
          <p className="mt-3 text-muted">Nothing scheduled yet.</p>
        ) : (
          <ul className="mt-3 grid gap-3">
            {events.map((e) => (
              <li key={e.id} className="rounded-2xl bg-sage p-3">
                <p className="text-xs font-semibold tracking-wide text-forest uppercase">{prettyDate(e.eventDate)}</p>
                <b>{e.title}</b>
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  );
}
