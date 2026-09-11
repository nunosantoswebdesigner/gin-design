export const FALLBACK_SITE_ORIGIN = "https://gin-design.vercel.app" as const;

const getBaseUrl = () => {
  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return process.env.SITE_URL ?? FALLBACK_SITE_ORIGIN;
};

const baseUrl = getBaseUrl();

export const SITE = {
  AUTHOR: {
    NAME: "Nuno Santos",
    TWITTER: "@nunosantos",
  },
  DESCRIPTION: {
    LONG: "GIN Design is a custom component library and shadcn registry built by Nuno Santos. It ships base components, data-driven elements (e- prefix), pre-assembled blocks (b- prefix), charts (c- prefix), and icon sets (i- prefix) — all copy-owned via npx shadcn add. Apply brand themes through CSS variable overrides, compare tokens against Figma with the built-in diff tool, and share to Discord with one click. Built with Next.js, React, Radix UI, and Tailwind CSS.",
    SHORT:
      "Components, elements, blocks, charts, and icons registry by Nuno Santos",
  },
  KEYWORDS: [
    "design system",
    "component library",
    "component registry",
    "GIN Design",
    "Nuno Santos",
    "shadcn",
    "shadcn registry",
    "brand themes",
    "CSS variables",
    "design tokens",
    "figma diff",
    "elements",
    "blocks",
    "charts",
    "icons",
    "next.js",
    "react",
    "tailwindcss",
    "radix ui",
    "accessible components",
    "ui components",
    "open source",
  ] as const,
  NAME: "GIN Design",
  OG_IMAGE: `${baseUrl}/og`,
  REGISTRY: baseUrl,
  SOCIAL_IMAGE: `${baseUrl}/seo.png`,
  URL: baseUrl,
};

export const META_THEME_COLORS = {
  dark: "#09090b",
  light: "#ffffff",
};

export const UTM_PARAMS = {
  utm_source: new URL(baseUrl).hostname,
};
