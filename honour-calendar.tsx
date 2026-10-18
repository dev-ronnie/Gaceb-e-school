import { ChevronLeft, ChevronRight, GraduationCap, Star, Target, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import type { CalEvent } from "@/lib/board";
import { isoDate, monthMatrix, prettyDate } from "@/lib/format";

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function HonourCalendar({
  events,
  onSelect,
  selected,
}: {
  events: CalEvent[];
  selected: string;
  onSelect: (iso: string) => void;
}) {
  const [cursor, setCursor] = useState(() => new Date(2026, 10, 1));
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const cells = monthMatrix(year, month);
  const byDay = new Map<string, CalEvent[]>();
  for (const ev of events) {
    const list = byDay.get(ev.eventDate) ?? [];
    list.push(ev);
    byDay.set(ev.eventDate, list);
  }
  const label = cursor.toLocaleDateString("en-UG", { month: "long", year: "numeric" });
  const [today, setToday] = useState("");
  useEffect(() => setToday(isoDate(new Date())), []);

  return (
    <section className="overflow-hidden rounded-card bg-forest text-paper shadow-lg">
      <div className="flex items-center justify-between gap-3 px-4 py-5 sm:px-6">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.18em] text-gold"><Trophy className="size-4" aria-hidden /> HONOUR CALENDAR</p>
          <h2 className="font-display text-3xl text-balance">{label}</h2>
        </div>
        <div className="flex items-center gap-2 text-gold" aria-hidden>
          <GraduationCap className="size-8" />
          <Star className="size-6 fill-current" />
          <Target className="size-7" />
        </div>
      </div>
      <div className="m-3 rounded-2xl bg-paper p-3 text-ink sm:m-4 sm:p-4">
        <div className="mb-3 flex items-center justify-between">
          <button type="button" className="btn btn-outline min-w-11 px-3" aria-label="Previous month" onClick={() => setCursor(new Date(year, month - 1, 1))}>
            <ChevronLeft className="size-5" />
          </button>
          <b className="font-display text-xl">{label}</b>
          <button type="button" className="btn btn-outline min-w-11 px-3" aria-label="Next month" onClick={() => setCursor(new Date(year, month + 1, 1))}>
            <ChevronRight className="size-5" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold tracking-wide text-forest uppercase sm:text-xs">
          {WEEK.map((d) => (
            <div key={d} className="py-1">{d}</div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((date, i) => {
            if (!date) return <div key={`e-${i}`} className="min-h-12 sm:min-h-16" />;
            const iso = isoDate(date);
            const dayEvents = byDay.get(iso) ?? [];
            const briefing = iso === "2026-11-06";
            const isToday = iso === today;
            const isSelected = iso === selected;
            const weekend = date.getDay() === 0 || date.getDay() === 6;
            let tone = "bg-sky text-ink";
            if (weekend) tone = "bg-sage text-ink";
            if (dayEvents.length) tone = "bg-gold-soft text-ink ring-1 ring-gold";
            if (briefing) tone = "btn-gold text-ink shadow-md";
            return (
              <button
                key={iso}
                type="button"
                onClick={() => onSelect(iso)}
                aria-pressed={isSelected}
                aria-label={`${prettyDate(iso)}${briefing ? ", UNEB briefing" : ""}`}
                className={`relative min-h-12 rounded-xl px-1 py-1 text-left sm:min-h-16 ${tone} ${
                  isSelected ? "ring-2 ring-burgundy" : isToday ? "ring-2 ring-royal" : ""
                }`}
              >
                <span className="block text-sm font-semibold tabular-nums">{date.getDate()}</span>
                {briefing ? (
                  <span className="mt-0.5 flex items-center gap-0.5 truncate text-[10px] font-bold tracking-wide text-burgundy uppercase"><Trophy className="size-3 shrink-0" aria-hidden />Briefing</span>
                ) : dayEvents.length ? (
                  <span className="mt-1 block size-1.5 rounded-full bg-gold-deep" />
                ) : null}
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1"><i className="size-3 rounded btn-gold" /> UNEB briefing</span>
          <span className="inline-flex items-center gap-1"><i className="size-3 rounded bg-sage ring-1 ring-line" /> Weekend</span>
          <span className="inline-flex items-center gap-1"><i className="size-3 rounded bg-gold-soft ring-1 ring-gold" /> Marked day</span>
          <span className="inline-flex items-center gap-1"><i className="size-3 rounded ring-2 ring-royal" /> Today</span>
        </div>
      </div>
    </section>
  );
}
