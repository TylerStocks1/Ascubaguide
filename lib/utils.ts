/**
 * Minimal class-name helper for components that follow the shadcn/ui
 * convention of `cn(base, conditional, props.className)`.
 *
 * A full shadcn install uses `clsx` + `tailwind-merge` so conflicting
 * Tailwind utility classes de-dupe correctly (e.g. `p-4` and `p-2` →
 * `p-2` wins). We skip those dependencies here because the components
 * we integrate from 21st.dev only use `cn()` to pass through a props-
 * level className; they don't rely on class-merging for deduplication.
 * If we ever add a shadcn component that needs real merging, install
 * `clsx tailwind-merge` and swap this for the standard implementation.
 */
export type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const push = (v: ClassValue) => {
    if (!v) return;
    if (Array.isArray(v)) {
      for (const item of v) push(item);
      return;
    }
    out.push(String(v));
  };
  for (const input of inputs) push(input);
  return out.join(" ");
}
