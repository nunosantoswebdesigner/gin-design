import { THEME_ICONS, THEME_SWATCH } from "@/lib/theme-visuals";
import { REGISTRY_THEMES } from "@/lib/themes";
import { cn } from "@/lib/utils";

export const ThemeCards = () => (
  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
    {REGISTRY_THEMES.map((theme) => {
      const Icon = THEME_ICONS[theme.id];
      const radius = theme.cssVars?.light["--radius"];

      return (
        <div
          key={theme.id}
          className="flex flex-col gap-4 rounded-xl border p-5"
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-full",
                THEME_SWATCH[theme.id]
              )}
            >
              {Icon && <Icon className="size-5" />}
            </div>
            <div>
              <h3 className="font-medium text-base leading-tight">
                {theme.label}
              </h3>
              {theme.style && (
                <p className="text-muted-foreground text-xs leading-tight">
                  {theme.style}
                </p>
              )}
            </div>
            {theme.id === "mint" && (
              <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                base
              </span>
            )}
          </div>

          {theme.blurb && (
            <p className="text-muted-foreground text-sm">{theme.blurb}</p>
          )}

          <div className="mt-auto flex flex-wrap items-center gap-2 border-t pt-3">
            <code className="rounded bg-muted px-1.5 py-0.5 text-[0.7rem] text-muted-foreground">
              registry/{theme.id}
            </code>
            {radius && (
              <code className="rounded bg-muted px-1.5 py-0.5 text-[0.7rem] text-muted-foreground">
                radius: {radius}
              </code>
            )}
          </div>
        </div>
      );
    })}
  </div>
);
