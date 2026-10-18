import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/shell";
import { GACEB_CONFIG } from "@/lib/config";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms | GACEB Scholar" }] }),
  component: TermsPage,
});

const SECTIONS = [
  {
    h: "Using the site",
    p: "GACEB Scholar offers study resources, revision tools and notices for learners. Please use it honestly, keep your login private, and do not try to copy, resell or share paid resources.",
  },
  {
    h: "Coins and Premium",
    p: "Some documents are free, some need coins and some need Premium. Coin packs and plans are paid through Mobile Money and are activated once the payment is confirmed. Prices shown on the site are the prices that apply.",
  },
  {
    h: "Study materials",
    p: "Resources are for revision and learning. They support, but do not replace, your school teaching or official UNEB guidance. Always check dates and requirements with your school and UNEB.",
  },
  {
    h: "Accounts",
    p: "We may suspend an account that is used to abuse the site, submit false payments or harm other learners.",
  },
  {
    h: "Changes",
    p: "We may update these terms and the site from time to time. Continuing to use the site means you accept the current version.",
  },
];

function TermsPage() {
  return (
    <div className="grid max-w-3xl gap-6">
      <PageIntro kicker="Legal" title="Terms of use" lede="The simple rules for using GACEB Scholar." />
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
