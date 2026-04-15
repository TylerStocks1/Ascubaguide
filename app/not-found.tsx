import Link from "next/link";
import { BUSINESS } from "@/lib/business";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-sm uppercase tracking-wide text-neutral-500">404</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        That dive site isn&apos;t on the map
      </h1>
      <p className="mt-6 text-neutral-700">
        We couldn&apos;t find the page you were looking for. It may have moved,
        or never existed. Try one of these instead:
      </p>
      <ul className="mt-6 space-y-2">
        <li>
          <Link href="/">{BUSINESS.name} home</Link>
        </li>
        <li>
          <Link href="/dive-sites">All Koh Tao dive sites</Link>
        </li>
        <li>
          <Link href="/fish">All Koh Tao species</Link>
        </li>
        <li>
          <Link href="/contact">Contact George</Link>
        </li>
      </ul>
    </main>
  );
}
