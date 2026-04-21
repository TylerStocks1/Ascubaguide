"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BUSINESS } from "@/lib/business";

/**
 * Sitewide floating nav — liquid-glass pill with mark + wordmark, plus a
 * full-screen slide-in drawer on mobile.
 *
 * The mobile drawer opens from the top edge, blurs the viewport behind
 * it, and closes on link tap, escape key, or outside click. Body scroll
 * is locked while open.
 */

const LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: "Try the app", href: "/app-preview", external: true },
  { label: "For schools", href: "/for-dive-schools" },
  { label: "For divers", href: "/for-divers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function FloatingNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[11px] uppercase tracking-[0.1em] text-white shadow-[0_8px_40px_rgba(0,20,40,0.35)] backdrop-blur-xl sm:px-5"
        >
          <Link
            href="/"
            className="whitespace-nowrap text-sm font-black tracking-tight no-underline"
          >
            {BUSINESS.name}
          </Link>

          <ul className="hidden items-center gap-6 md:flex">
            {LINKS.slice(0, 4).map((l) =>
              l.external ? (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="whitespace-nowrap no-underline transition hover:text-white/60"
                  >
                    {l.label}
                  </a>
                </li>
              ) : (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="whitespace-nowrap no-underline transition hover:text-white/60"
                  >
                    {l.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/download"
              className="hidden whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-4 py-2 no-underline transition hover:bg-white/20 sm:inline-flex"
            >
              Download app
            </Link>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/10 transition hover:bg-white/20 md:hidden"
            >
              <span aria-hidden className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-full bg-white transition-all duration-300 ${
                    open ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[5px] h-[1.5px] w-full bg-white transition-opacity duration-200 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[10px] h-[1.5px] w-full bg-white transition-all duration-300 ${
                    open ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-[#031018]/80 backdrop-blur-2xl transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Panel */}
        <nav
          aria-label="Mobile"
          className={`absolute inset-x-4 top-24 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 shadow-[0_30px_80px_-20px_rgba(0,50,100,0.6)] backdrop-blur-2xl transition-all duration-300 ${
            open
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <ul className="flex flex-col divide-y divide-white/10">
            {LINKS.map((l, i) => {
              const inner = (
                <>
                  <span className="font-display text-2xl font-black uppercase tracking-tight text-white">
                    {l.label}
                  </span>
                  <span
                    aria-hidden
                    className="text-xl text-white/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#7fdbff]"
                  >
                    →
                  </span>
                </>
              );
              const cls = "group flex items-center justify-between py-5 no-underline";
              const style = { transitionDelay: open ? `${i * 40}ms` : "0ms" };
              return l.external ? (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cls}
                    style={style}
                  >
                    {inner}
                  </a>
                </li>
              ) : (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cls}
                    style={style}
                  >
                    {inner}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/download"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#011826] no-underline"
            style={{
              background:
                "linear-gradient(135deg, #bde9ff 0%, #7fdbff 55%, #38bdf8 100%)",
              boxShadow:
                "0 18px 50px -12px rgba(127,219,255,0.55), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            Download app →
          </Link>
        </nav>
      </div>
    </>
  );
}
