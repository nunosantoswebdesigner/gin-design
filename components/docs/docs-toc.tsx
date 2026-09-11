"use client";

import { MenuIcon } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFeedback } from "@/hooks/use-feedback";
import { cn } from "@/lib/utils";

const headingById = (id: string): Element | null =>
  document.querySelector(`#${CSS.escape(id)}`);

// Matches fumadocs' "clerk" TOC: the connecting line sits at an x-offset that
// depends on heading depth, so it kinks diagonally whenever depth changes
// between consecutive items instead of running perfectly straight.
const BASE = 8;
const getLineOffset = (depth: number): number => {
  if (depth <= 2) {
    return BASE;
  }
  if (depth === 3) {
    return 12 + BASE;
  }
  return 24 + BASE;
};
const getItemOffset = (depth: number): number => {
  if (depth <= 2) {
    return 12 + BASE;
  }
  if (depth === 3) {
    return 24 + BASE;
  }
  return 36 + BASE;
};

/** Mirrors fumadocs-core's TOC Observer: a heading counts as "active" once
 * 90% of it is visible. Crucially, if a scroll position leaves NOTHING
 * satisfying that (the common case between two headings while scrolling
 * fast), it falls back to whichever heading is closest to the viewport's
 * top edge — so there's never a gap with zero active items. That gap was
 * what made the sliding highlight look like it was jumping instead of
 * flowing continuously. */
const useActiveIds = (itemIds: string[]) => {
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());
  const stateRef = useRef<Map<string, boolean>>(new Map());

  useEffect(() => {
    const state = stateRef.current;
    state.clear();
    for (const id of itemIds) {
      if (id) {
        state.set(id, false);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (state.has(entry.target.id)) {
            state.set(entry.target.id, entry.isIntersecting);
          }
        }

        const active = [...state.entries()]
          .filter(([, isActive]) => isActive)
          .map(([id]) => id);

        if (active.length > 0) {
          setActiveIds(new Set(active));
          return;
        }

        const viewTop = entries[0]?.rootBounds?.top ?? 0;
        let closestId: string | null = null;
        let minDistance = Number.POSITIVE_INFINITY;
        for (const id of itemIds) {
          if (!id) {
            continue;
          }
          const element = headingById(id);
          if (!element) {
            continue;
          }
          const distance = Math.abs(
            viewTop - element.getBoundingClientRect().top
          );
          if (distance < minDistance) {
            minDistance = distance;
            closestId = id;
          }
        }
        setActiveIds(closestId ? new Set([closestId]) : new Set());
      },
      { threshold: 0.9 }
    );

    for (const id of itemIds ?? []) {
      if (!id) {
        continue;
      }
      const element = headingById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [itemIds]);

  return activeIds;
};

interface TocLinePath {
  width: number;
  height: number;
  d: string;
  positions: [top: number, bottom: number, x: number][];
  /** Each item's [start, end] distance along `d`, in path length units (not
   * pixels — the path isn't straight, so length and Y don't match 1:1).
   * Used to place the leading-edge dot at the right spot along the path. */
  itemLineLengths: [start: number, end: number][];
}

/** Measures each rendered TOC link's position and builds one SVG path
 * connecting them — with a short diagonal "kink" wherever depth changes
 * between consecutive items, instead of a straight line. */
const useTocLinePath = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  toc: { url: string; depth: number }[]
): TocLinePath | null => {
  const [path, setPath] = useState<TocLinePath | null>(null);

  const compute = useCallback(() => {
    const container = containerRef.current;
    if (!container || container.clientHeight === 0 || toc.length === 0) {
      setPath(null);
      return;
    }

    let w = 0;
    let h = 0;
    let d = "";
    const positions: [number, number, number][] = [];

    for (let i = 0; i < toc.length; i += 1) {
      const item = toc[i];
      const element = container.querySelector<HTMLElement>(
        `a[href="${item.url}"]`
      );
      if (!element) {
        continue;
      }

      const x = getLineOffset(item.depth) + 0.5;
      const top = element.offsetTop;
      const bottom = element.offsetTop + element.clientHeight;

      w = Math.max(x + 8, w);
      h = Math.max(h, bottom);

      if (i === 0) {
        d += ` M${x} ${top} L${x} ${bottom}`;
      } else {
        const [, upperBottom, upperX] = positions[i - 1];
        d += ` L${upperX} ${upperBottom} ${x} ${top} L${x} ${bottom}`;
      }

      positions.push([top, bottom, x]);
    }

    // Walk the path to find, for each item, where along its length (not its
    // pixel Y) it starts and ends — needed because the kinked path's length
    // isn't proportional to Y.
    const svgPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    svgPath.setAttribute("d", d);
    const totalLength = svgPath.getTotalLength();
    const itemLineLengths: [number, number][] = [];
    for (let i = 0; i < positions.length; i += 1) {
      const [top, bottom] = positions[i];
      let l =
        i > 0 ? itemLineLengths[i - 1][1] + (top - positions[i - 1][1]) : top;
      while (l < totalLength && svgPath.getPointAtLength(l).y < top) {
        l += 1;
      }
      itemLineLengths.push([l, l + (bottom - top)]);
    }

    setPath({ d, height: h, itemLineLengths, positions, width: w });
  }, [containerRef, toc]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const observer = new ResizeObserver(compute);
    observer.observe(container);
    compute();
    return () => observer.disconnect();
  }, [compute, containerRef]);

  return path;
};

export const DocsTableOfContents = ({
  toc,
  variant = "list",
  className,
}: {
  toc: {
    title?: React.ReactNode;
    url: string;
    depth: number;
  }[];
  variant?: "dropdown" | "list";
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => setOpen(false), []);
  const itemIds = useMemo(
    () => toc.map((item) => item.url.replace("#", "")),
    [toc]
  );
  const activeIds = useActiveIds(itemIds);
  const playTick = useFeedback({ sound: "tick" });
  const containerRef = useRef<HTMLDivElement>(null);
  const path = useTocLinePath(containerRef, toc);

  const activeRange = useMemo(() => {
    if (!path) {
      return null;
    }
    let startIdx = -1;
    let endIdx = -1;
    for (let i = 0; i < toc.length; i += 1) {
      if (activeIds.has(toc[i].url.replace("#", ""))) {
        if (startIdx === -1) {
          startIdx = i;
        }
        endIdx = i;
      }
    }
    if (
      startIdx === -1 ||
      !path.positions[startIdx] ||
      !path.positions[endIdx]
    ) {
      return null;
    }
    return {
      bottom: path.positions[endIdx][1],
      endIdx,
      startIdx,
      top: path.positions[startIdx][0],
    };
  }, [toc, activeIds, path]);

  // Whether the active range moved up or down since the last render — the
  // leading-edge dot sits at the top of the range when scrolling up, and at
  // the bottom when scrolling down, just like fumadocs' own TOC.
  const previousRangeRef = useRef<{
    startIdx: number;
    endIdx: number;
    isUp: boolean;
  } | null>(null);
  const dot = useMemo(() => {
    if (!(path && activeRange)) {
      previousRangeRef.current = null;
      return null;
    }

    const prev = previousRangeRef.current;
    const isUp = prev
      ? prev.startIdx > activeRange.startIdx ||
        prev.endIdx > activeRange.endIdx ||
        (prev.startIdx === activeRange.startIdx &&
          prev.endIdx === activeRange.endIdx &&
          prev.isUp)
      : false;
    previousRangeRef.current = {
      endIdx: activeRange.endIdx,
      isUp,
      startIdx: activeRange.startIdx,
    };

    const lengths = path.itemLineLengths;
    const offsetDistance = isUp
      ? lengths[activeRange.startIdx]?.[0]
      : lengths[activeRange.endIdx]?.[1];

    return typeof offsetDistance === "number" ? offsetDistance : null;
  }, [path, activeRange]);

  if (!toc?.length) {
    return null;
  }

  if (variant === "dropdown") {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen} sounds>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn("h-8 md:h-7", className)}
          >
            <MenuIcon /> On This Page
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="no-scrollbar max-h-[70svh]"
        >
          {toc.map((item) => (
            <DropdownMenuItem
              key={item.url}
              asChild
              sound="click"
              onClick={handleClose}
              data-depth={item.depth}
              className="data-[depth=3]:pl-6 data-[depth=4]:pl-8"
            >
              <a href={item.url}>{item.title}</a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2 p-4 pt-0 text-sm", className)}>
      <p className="text-muted-foreground bg-background sticky top-0 flex h-6 items-center gap-1.5 text-xs">
        <MenuIcon className="size-3.5" />
        On This Page
      </p>
      <div ref={containerRef} className="relative flex flex-col gap-2">
        {path && (
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${path.width} ${path.height}`}
            className="pointer-events-none absolute top-0 left-0"
            style={{ height: path.height, width: path.width }}
          >
            <path
              d={path.d}
              className="stroke-border"
              strokeWidth={1}
              fill="none"
            />
          </svg>
        )}
        {path && activeRange && (
          <motion.svg
            aria-hidden="true"
            viewBox={`0 0 ${path.width} ${path.height}`}
            className="pointer-events-none absolute top-0 left-0"
            style={{ height: path.height, width: path.width }}
            animate={{
              clipPath: `polygon(0 ${activeRange.top}px, 100% ${activeRange.top}px, 100% ${activeRange.bottom}px, 0 ${activeRange.bottom}px)`,
            }}
            transition={{ damping: 30, stiffness: 260, type: "spring" }}
          >
            <path
              d={path.d}
              className="stroke-foreground"
              strokeWidth={1}
              fill="none"
            />
          </motion.svg>
        )}
        {path && (
          <motion.div
            aria-hidden="true"
            className="bg-foreground pointer-events-none absolute top-0 left-0 size-1 rounded-full"
            style={{ offsetPath: `path("${path.d}")` }}
            animate={{
              offsetDistance: dot === null ? 0 : `${dot}px`,
              opacity: dot === null ? 0 : 1,
            }}
            transition={{ damping: 30, stiffness: 260, type: "spring" }}
          />
        )}
        {toc.map((item) => {
          const isActive = activeIds.has(item.url.replace("#", ""));

          return (
            <a
              key={item.url}
              href={item.url}
              style={{ paddingInlineStart: getItemOffset(item.depth) }}
              className="text-muted-foreground hover:text-foreground data-[active=true]:text-foreground text-[0.8rem] data-[active=true]:font-medium no-underline transition-colors"
              data-active={isActive}
              data-depth={item.depth}
              onClick={playTick}
            >
              {item.title}
            </a>
          );
        })}
      </div>
    </div>
  );
};
