import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Atom,
  BookOpen,
  BookOpenCheck,
  Calculator,
  Church,
  Dna,
  FlaskConical,
  Globe,
  Landmark,
  PenLine,
  RefreshCw,
  TrendingUp,
  Feather,
  type LucideIcon,
} from "lucide-react";
import { PageIntro } from "@/components/shell";

export const Route = createFileRoute("/courses")({
  head: () => ({ meta: [{ title: "Courses | GACEB Scholar" }] }),
  component: Courses,
});

const ICONS: Record<string, LucideIcon> = {
  Biology: Dna,
  Chemistry: FlaskConical,
  Physics: Atom,
  Mathematics: Calculator,
  English: BookOpen,
  Geography: Globe,
  History: Landmark,
  "CRE / Divinity": Church,
  Economics: TrendingUp,
  Literature: Feather,
};

const OLEVEL = ["Biology", "Chemistry", "Physics", "Mathematics", "English", "Geography", "History", "CRE / Divinity"];
const ALEVEL = ["Biology", "Chemistry", "Physics", "Mathematics", "Economics", "History", "Literature", "Geography"];

const STEPS: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "Learn", text: "Understand the idea before memorising facts.", Icon: BookOpenCheck },
  { title: "Practise", text: "Answer questions without looking at notes.", Icon: PenLine },
  { title: "Review", text: "Track mistakes and revisit weak areas.", Icon: RefreshCw },
];

function SubjectGrid({ list, tone }: { list: string[]; tone: "green" | "gold" }) {
  return (
    <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
      {list.map((s) => {
        const Icon = ICONS[s] ?? BookOpen;
        return (
          <li
            key={s}
            className={`grid justify-items-center gap-1.5 rounded-2xl px-2 py-3 text-center text-sm font-medium ${
              tone === "green" ? "bg-paper/15 text-paper ring-1 ring-paper/25" : "bg-paper text-ink ring-1 ring-gold/50"
            }`}
          >
            <Icon className={`size-6 ${tone === "green" ? "text-gold" : "text-forest"}`} aria-hidden />
            {s}
          </li>
        );
      })}
    </ul>
  );
}

function Courses() {
  return (
    <div>
      <PageIntro kicker="Find your path" title="Courses & subjects" lede="Choose your level and follow a focused path through your subjects." />
      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-card bg-forest p-6 text-paper shadow-lg">
          <p className="text-xs font-semibold tracking-[0.16em] text-gold uppercase">Ordinary level</p>
          <h2 className="mt-1 font-display text-4xl">O-Level</h2>
          <p className="mt-2 text-paper/85">Build strong foundations, revise key topics and practise exam-style questions.</p>
          <SubjectGrid list={OLEVEL} tone="green" />
          <Link to="/library" search={{ level: "O-Level" }} className="btn btn-gold mt-5">
            O-Level resources
          </Link>
        </article>
        <article className="rounded-card border border-gold bg-gold-soft p-6">
          <p className="text-xs font-semibold tracking-[0.16em] text-gold-deep uppercase">Advanced level</p>
          <h2 className="mt-1 font-display text-4xl">A-Level</h2>
          <p className="mt-2 text-muted">Strengthen subject knowledge, practise structured answers and prepare for UNEB.</p>
          <SubjectGrid list={ALEVEL} tone="gold" />
          <Link to="/library" search={{ level: "A-Level" }} className="btn btn-primary mt-5">
            A-Level resources
          </Link>
        </article>
      </div>
      <section className="mt-4 grid gap-3 sm:grid-cols-3">
        {STEPS.map(({ title, text, Icon }, i) => (
          <div key={title} className="flex gap-3 rounded-card border border-line bg-paper p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sage text-forest">
              <Icon className="size-5" aria-hidden />
            </span>
            <div>
              <h3 className="font-display text-xl">
                {i + 1}. {title}
              </h3>
              <p className="text-sm text-muted">{text}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
