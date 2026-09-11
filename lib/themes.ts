export interface ThemeCssVars {
  light: Record<string, string>;
  dark: Record<string, string>;
}

export interface RegistryTheme {
  id: string;
  label: string;
  colorTheme?: string;
  figma?: string;
  cssVars?: ThemeCssVars;
  /** Design archetype this theme leans into (e.g. "Glassmorphism"). */
  style?: string;
  /** One-line description of the theme's visual identity, for the /docs/themes page. */
  blurb?: string;
}

export const REGISTRY_THEMES: RegistryTheme[] = [
  {
    blurb:
      "Fluorescent, high-chroma green with translucent glass surfaces, backdrop blur, and pill-shaped edges. Fresh and airy.",
    colorTheme: "mint",
    cssVars: {
      dark: {
        "--accent": "oklch(0.3 0.1 150)",
        "--accent-foreground": "oklch(0.9 0.1 150)",
        "--border": "oklch(0.35 0.08 150 / 45%)",
        "--input": "oklch(0.35 0.08 150 / 45%)",
        "--muted": "oklch(0.22 0.05 150)",
        "--muted-foreground": "oklch(0.65 0.09 150)",
        "--primary": "oklch(0.85 0.26 150)",
        "--primary-foreground": "oklch(0.15 0.04 150)",
        "--ring": "oklch(0.85 0.26 150)",
        "--secondary": "oklch(0.26 0.08 150)",
        "--secondary-foreground": "oklch(0.9 0.1 150)",
      },
      light: {
        "--accent": "oklch(0.9 0.12 150)",
        "--accent-foreground": "oklch(0.28 0.1 150)",
        "--border": "oklch(0.85 0.08 150 / 55%)",
        "--destructive": "oklch(0.55 0.25 15)",
        "--input": "oklch(0.85 0.08 150 / 55%)",
        "--muted": "oklch(0.95 0.05 150)",
        "--muted-foreground": "oklch(0.48 0.09 150)",
        "--primary": "oklch(0.82 0.26 150)",
        "--primary-foreground": "oklch(0.2 0.05 150)",
        "--radius": "1.5rem",
        "--ring": "oklch(0.82 0.26 150)",
        "--secondary": "oklch(0.94 0.09 150)",
        "--secondary-foreground": "oklch(0.28 0.1 150)",
      },
    },
    id: "mint",
    label: "Mint",
    style: "Glassmorphism",
  },
  {
    blurb:
      "Bold, high-chroma red with thick borders, hard offset shadows, and sharp corners. Unapologetic and confident.",
    colorTheme: "berries",
    cssVars: {
      dark: {
        "--accent": "oklch(0.26 0.08 10)",
        "--accent-foreground": "oklch(0.88 0.08 10)",
        "--border": "oklch(0.35 0.09 10)",
        "--input": "oklch(0.35 0.09 10)",
        "--muted": "oklch(0.2 0.04 10)",
        "--muted-foreground": "oklch(0.6 0.08 10)",
        "--primary": "oklch(0.62 0.22 10)",
        "--primary-foreground": "oklch(1 0 0)",
        "--ring": "oklch(0.62 0.22 10)",
        "--secondary": "oklch(0.22 0.07 10)",
        "--secondary-foreground": "oklch(0.88 0.08 10)",
      },
      light: {
        "--accent": "oklch(0.9 0.08 10)",
        "--accent-foreground": "oklch(0.32 0.16 10)",
        "--border": "oklch(0.8 0.1 10)",
        "--destructive": "oklch(0.55 0.25 15)",
        "--input": "oklch(0.8 0.1 10)",
        "--muted": "oklch(0.94 0.03 10)",
        "--muted-foreground": "oklch(0.5 0.09 10)",
        "--primary": "oklch(0.5 0.22 10)",
        "--primary-foreground": "oklch(1 0 0)",
        "--radius": "0.25rem",
        "--ring": "oklch(0.5 0.22 10)",
        "--secondary": "oklch(0.93 0.06 10)",
        "--secondary-foreground": "oklch(0.32 0.16 10)",
      },
    },
    id: "berries",
    label: "Berries",
    style: "Neo-Brutalism",
  },
  {
    blurb:
      "Bright lemon yellow, flat fills, no shadows, restrained geometry. Zesty and clean.",
    colorTheme: "citrine",
    cssVars: {
      dark: {
        "--accent": "oklch(0.3 0.08 105)",
        "--accent-foreground": "oklch(0.9 0.08 105)",
        "--border": "oklch(0.33 0.07 105)",
        "--input": "oklch(0.33 0.07 105)",
        "--muted": "oklch(0.23 0.04 105)",
        "--muted-foreground": "oklch(0.62 0.08 105)",
        "--primary": "oklch(0.85 0.19 105)",
        "--primary-foreground": "oklch(0.2 0.03 105)",
        "--ring": "oklch(0.85 0.19 105)",
        "--secondary": "oklch(0.26 0.06 105)",
        "--secondary-foreground": "oklch(0.9 0.08 105)",
      },
      light: {
        "--accent": "oklch(0.92 0.1 105)",
        "--accent-foreground": "oklch(0.32 0.09 105)",
        "--border": "oklch(0.88 0.08 105)",
        "--destructive": "oklch(0.55 0.25 15)",
        "--input": "oklch(0.88 0.08 105)",
        "--muted": "oklch(0.96 0.04 105)",
        "--muted-foreground": "oklch(0.5 0.08 105)",
        "--primary": "oklch(0.87 0.19 105)",
        "--primary-foreground": "oklch(0.25 0.04 105)",
        "--radius": "0.375rem",
        "--ring": "oklch(0.87 0.19 105)",
        "--secondary": "oklch(0.96 0.07 105)",
        "--secondary-foreground": "oklch(0.32 0.09 105)",
      },
    },
    id: "citrine",
    label: "Citrine",
    style: "Minimalism",
  },
  {
    blurb:
      "Deep terracotta brown with chunky, extruded 3D surfaces — solid drop shadows like a physical button cap, pressing flat on click. Bold and tactile.",
    colorTheme: "cinnamon",
    cssVars: {
      dark: {
        "--accent": "oklch(0.32 0.06 35)",
        "--accent-foreground": "oklch(0.88 0.05 35)",
        "--border": "oklch(0.34 0.05 35)",
        "--input": "oklch(0.34 0.05 35)",
        "--muted": "oklch(0.24 0.04 35)",
        "--muted-foreground": "oklch(0.6 0.07 35)",
        "--primary": "oklch(0.6 0.14 35)",
        "--primary-foreground": "oklch(0.16 0.02 35)",
        "--ring": "oklch(0.6 0.14 35)",
        "--secondary": "oklch(0.28 0.05 35)",
        "--secondary-foreground": "oklch(0.88 0.05 35)",
      },
      light: {
        "--accent": "oklch(0.86 0.07 35)",
        "--accent-foreground": "oklch(0.32 0.09 35)",
        "--border": "oklch(0.83 0.06 35)",
        "--destructive": "oklch(0.55 0.25 15)",
        "--input": "oklch(0.83 0.06 35)",
        "--muted": "oklch(0.9 0.04 35)",
        "--muted-foreground": "oklch(0.48 0.08 35)",
        "--primary": "oklch(0.45 0.13 35)",
        "--primary-foreground": "oklch(0.97 0.02 35)",
        "--radius": "1.5rem",
        "--ring": "oklch(0.45 0.13 35)",
        "--secondary": "oklch(0.9 0.05 35)",
        "--secondary-foreground": "oklch(0.32 0.09 35)",
      },
    },
    id: "cinnamon",
    label: "Cinnamon",
    style: "Skeuomorphism",
  },
];

export const DEFAULT_REGISTRY_THEME_ID = "mint";
