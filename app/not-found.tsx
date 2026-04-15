import Link from "next/link";
import { BUSINESS } from "@/lib/business";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-8 px-6 pt-32 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
          404
        </p>
        <h1
          className="text-white"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            fontWeight: 700,
          }}
        >
          That dive site isn&apos;t on the map.
        </h1>
        <p className="max-w-md text-base leading-relaxed text-white/60">
          We couldn&apos;t find the page you were looking for. It may have
          moved, or never existed. Try one of these instead:
        </p>
        <ul className="space-y-3 text-base text-white/70">
          <li>
            <Link href="/" className="underline underline-offset-4 hover:text-white">
              {BUSINESS.name} home
            </Link>
          </li>
          <li>
            <Link href="/for-dive-schools" className="underline underline-offset-4 hover:text-white">
              For dive schools
            </Link>
          </li>
          <li>
            <Link href="/about" className="underline underline-offset-4 hover:text-white">
              About George
            </Link>
          </li>
          <li>
            <Link href="/contact" className="underline underline-offset-4 hover:text-white">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
