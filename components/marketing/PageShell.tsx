import type { ReactNode } from "react";

/**
 * Standard layout wrapper for content pages. Plain. Phase 4 redesigns.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-neutral-800">
      <article className="space-y-6 leading-relaxed">{children}</article>
    </main>
  );
}
