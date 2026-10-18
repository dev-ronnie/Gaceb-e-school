import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/shell";
import { GACEB_CONFIG } from "@/lib/config";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy | GACEB Scholar" }] }),
  component: PrivacyPage,
});

const SECTIONS = [
  {
    h: "What we collect",
    p: "When you create an account we store the details you give us, such as your name, email, phone number and school or class. If you submit a Mobile Money payment we store the transaction details you enter so we can confirm it.",
  },
  {
    h: "How we use it",
    p: "We use your details to run your account, unlock coins and Premium content you have paid for, confirm payments, and reply when you contact us. We do not sell your personal information.",
  },
  {
    h: "Where it is kept",
    p: "Account and payment records are held in our Supabase database. Some preferences, such as study-planner entries, may also be saved in your own browser on your own device.",
  },
  {
    h: "Your choices",
    p: "You can update your profile from your dashboard. To ask for your account or data to be corrected or removed, email us and we will help.",
  },
  {
    h: "Children and learners",
    p: "GACEB Scholar is made for school learners. If you are under 18, please use the site with the knowledge of a parent, guardian or teacher.",
  },
];

function PrivacyPage() {
  return (
    <div className="grid max-w-3xl gap-6">
      <PageIntro kicker="Legal" title="Privacy" lede="How GACEB Scholar handles your information." />
      {SECTIONS.map((s) => (
        <section key={s.h} className="rounded-card border border-line bg-paper p-5">
          <h2 className="font-display text-2xl">{s.h}</h2>
          <p className="mt-2 text-pretty leading-relaxed text-muted">{s.p}</p>
        </section>
      ))}
      <p className="text-sm text-muted">
        Questions? Email{" "}
        <a className="font-semibold text-forest" href={`mailto:${GACEB_CONFIG.SUPPORT_EMAIL}`}>
          {GACEB_CONFIG.SUPPORT_EMAIL}
        </a>
        . This page is a plain-language summary and should be reviewed by GACEB before launch.
      </p>
    </div>
  );
}
