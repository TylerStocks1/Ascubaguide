"use client";

import { usePathname } from "next/navigation";
import { Footer as FooterLegacy } from "./Footer";
import { Footer as FooterUi } from "@/components/ui/footer-section";

/**
 * Footer router.
 *
 * On the homepage ("/"), render the 21st.dev footer-section component
 * (dark-themed, shadcn-token-driven). On every other route, render the
 * legacy plain-Tailwind Footer that was built in Phase 3 for the
 * interior pages (they're still light-themed; the 21st.dev footer uses
 * shadcn `text-muted-foreground` which resolves to a near-white tint
 * against our dark CSS vars and wouldn't read on a white background).
 *
 * Used from app/layout.tsx.
 */
export function FooterSwitcher() {
  const pathname = usePathname();
  if (pathname === "/") return <FooterUi />;
  return <FooterLegacy />;
}
