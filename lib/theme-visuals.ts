import { Citrus, Flame, Grape, Leaf } from "lucide-react";
import type { ComponentType } from "react";

export const THEME_ICONS: Record<
  string,
  ComponentType<{ className?: string }>
> = {
  berries: Grape,
  cinnamon: Flame,
  citrine: Citrus,
  mint: Leaf,
};

/** Text + active-border accent classes, used on the theme tab triggers.
 * Every `data-[state=active]:` variant is repeated for both light and dark so it wins over
 * the base TabsTrigger's own active-state classes (same variant stack => tailwind-merge dedupes
 * in our favor; a mismatched stack would lose on CSS specificity instead, which is what made the
 * active tab render in the plain foreground color before). */
export const THEME_ACCENT: Record<string, string> = {
  berries:
    "text-rose-600 dark:text-rose-400 data-[state=active]:text-rose-700 dark:data-[state=active]:text-rose-300 data-[state=active]:border-rose-600 dark:data-[state=active]:border-rose-400",
  cinnamon:
    "text-orange-800 dark:text-orange-500 data-[state=active]:text-orange-900 dark:data-[state=active]:text-orange-300 data-[state=active]:border-orange-800 dark:data-[state=active]:border-orange-500",
  citrine:
    "text-yellow-600 dark:text-yellow-400 data-[state=active]:text-yellow-700 dark:data-[state=active]:text-yellow-300 data-[state=active]:border-yellow-600 dark:data-[state=active]:border-yellow-400",
  mint: "text-emerald-500 dark:text-emerald-400 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-300 data-[state=active]:border-emerald-500 dark:data-[state=active]:border-emerald-400",
};

/** Solid swatch classes (bg + text), used for theme preview chips/cards. */
export const THEME_SWATCH: Record<string, string> = {
  berries: "bg-rose-500 text-white",
  cinnamon: "bg-orange-800 text-orange-50",
  citrine: "bg-yellow-300 text-yellow-950",
  mint: "bg-emerald-400 text-emerald-950",
};
