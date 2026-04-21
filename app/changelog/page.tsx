import type { Metadata } from "next";
import { BUSINESS } from "@/lib/business";
import { CHANGELOG, type ChangeCategory } from "@/lib/changelog";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import {
  OceanMain,
  PageEyebrow,
  DisplayHeading,
  AccentWord,
  OceanCta,
} from "@/components/marketing/OceanChrome";

export const metadata: Metadata = {
  title: "Changelog",
  description: `Updates, fixes and new features shipped to ${BUSINESS.name}. Newest first.`,
  alternates: { canonical: "/changelog" },
};

export default function ChangelogPage() {
  return (
    <OceanMain>
      <BreadcrumbSchema crumbs={[{ name: "Changelog", path: "/changelog" }]} />

      <div className="mx-auto max-w-4xl px-6 pt-36 pb-32 md:pt-44">
        <PageEyebrow>Changelog</PageEyebrow>

        <DisplayHeading className="mt-8">
          What&apos;s <AccentWord>new.</AccentWord>
        </DisplayHeading>

        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/70">
          Every shipped update to {BUSINESS.name}. Newest first. If you
          want a feature on the list,{" "}
          <a
            href="/contact"
            className="text-white underline underline-offset-4"
          >
            drop Blizz a line
          </a>
          .
        </p>

        <ol className="mt-16 flex flex-col gap-16">
          {CHANGELOG.map((entry) => (
            <li
              key={entry.slug}
              id={entry.slug}
              className="relative scroll-mt-32"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-display text-2xl font-bold text-white">
                  {entry.version}
                </span>
                <time
                  dateTime={entry.date}
                  className="text-xs uppercase tracking-[0.3em] text-white/50"
                >
                  {formatDate(entry.date)}
                </time>
              </div>

              <h2
                className="mt-4 font-display text-white"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  fontWeight: 700,
                }}
              >
                {entry.headline}
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
                {entry.summary}
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {entry.changes.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-5 py-4"
                  >
                    <CategoryPill category={c.category} />
                    <span className="text-sm leading-relaxed text-white/80">
                      {c.text}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <section className="glass-strong mt-24 flex flex-col items-start gap-6 rounded-3xl p-10 md:p-14">
          <h2
            className="font-display text-white"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 700,
            }}
          >
            Want the updates in your inbox?
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-white/65">
            Email updates go out when something notable ships. No
            newsletter treadmill. No weekly nothing-burgers.
          </p>
          <OceanCta href="/contact">Ask to be added</OceanCta>
        </section>
      </div>
    </OceanMain>
  );
}

function CategoryPill({ category }: { category: ChangeCategory }) {
  const label =
    category === "new" ? "NEW" : category === "improved" ? "IMPROVED" : "FIXED";
  const style =
    category === "new"
      ? {
          backgroundColor: "rgba(127,219,255,0.15)",
          color: "#7fdbff",
          borderColor: "rgba(127,219,255,0.4)",
        }
      : category === "improved"
        ? {
            backgroundColor: "rgba(56,189,248,0.12)",
            color: "#bde9ff",
            borderColor: "rgba(56,189,248,0.35)",
          }
        : {
            backgroundColor: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.7)",
            borderColor: "rgba(255,255,255,0.15)",
          };

  return (
    <span
      className="mt-[2px] inline-flex flex-shrink-0 items-center justify-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em]"
      style={style}
    >
      {label}
    </span>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
