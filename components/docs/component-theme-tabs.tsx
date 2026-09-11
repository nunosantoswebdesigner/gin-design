"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { THEME_ACCENT, THEME_ICONS } from "@/lib/theme-visuals";
import { DEFAULT_REGISTRY_THEME_ID, REGISTRY_THEMES } from "@/lib/themes";
import { cn } from "@/lib/utils";

// Marker component — props are consumed by ComponentThemeTabs, never rendered directly
export const ThemeTab = (_: React.PropsWithChildren<{ name: string }>) => null;

export const ComponentThemeTabs = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const themeParam = searchParams.get("theme");

  const overrides = React.useMemo(() => {
    const map = new Map<string, React.ReactNode>();
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        const props = child.props as {
          name?: string;
          children?: React.ReactNode;
        };
        if (props.name) {
          map.set(props.name, props.children);
        }
      }
    });
    return map;
  }, [children]);

  const baseContent = overrides.get(DEFAULT_REGISTRY_THEME_ID);

  const tabs = REGISTRY_THEMES.map((theme) => ({
    colorTheme: theme.colorTheme,
    content: overrides.has(theme.id) ? overrides.get(theme.id) : baseContent,
    id: theme.id,
    inherits: !overrides.has(theme.id),
    label: theme.label,
  }));

  if (!baseContent) {
    return null;
  }

  const activeTab = tabs.find((t) => t.id === themeParam)?.id ?? tabs[0].id;

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === DEFAULT_REGISTRY_THEME_ID) {
      params.delete("theme");
    } else {
      params.set("theme", value);
    }
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : window.location.pathname, { scroll: false });
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className={cn("mt-6", className)}
    >
      <TabsList className="justify-start gap-4 rounded-none bg-transparent px-0 border-b border-border w-full pb-0 h-auto">
        {tabs.map((tab) => {
          const Icon = THEME_ICONS[tab.id];
          return (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              sound="tabSwitch"
              className={cn(
                "rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-3 text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent data-[state=active]:border-b-[3px] h-auto gap-1.5 opacity-60 transition-all data-[state=active]:opacity-100 data-[state=active]:font-semibold",
                THEME_ACCENT[tab.id]
              )}
            >
              {Icon && <Icon className="size-3.5" />}
              {tab.label}
              {tab.inherits && (
                <span className="ml-1.5 text-[10px] text-muted-foreground/50">
                  base
                </span>
              )}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="mt-0">
          {tab.colorTheme ? (
            <div className={`theme-${tab.colorTheme}`}>
              <div className="theme-container">{tab.content}</div>
            </div>
          ) : (
            tab.content
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};
