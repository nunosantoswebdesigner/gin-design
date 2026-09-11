import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm font-semibold whitespace-nowrap backdrop-blur-md transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-9 px-5 py-2 has-[>svg]:px-4",
        icon: "size-9",
        "icon-lg": "size-10",
        "icon-sm": "size-8",
        "icon-xs": "size-6 rounded-full [&_svg:not([class*='size-'])]:size-3",
        lg: "h-10 rounded-full px-7 has-[>svg]:px-5",
        sm: "h-8 gap-1.5 rounded-full px-4 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-full px-3 text-xs has-[>svg]:px-2 [&_svg:not([class*='size-'])]:size-3",
      },
      variant: {
        default:
          "bg-primary/80 text-primary-foreground border border-white/40 shadow-lg shadow-primary/40 hover:bg-primary hover:shadow-primary/50 dark:border-white/10",
        destructive:
          "bg-destructive/80 text-white border border-white/20 shadow-lg shadow-destructive/10 hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        ghost:
          "hover:bg-accent/40 hover:text-accent-foreground hover:backdrop-blur-md dark:hover:bg-accent/20",
        link: "text-primary underline-offset-4 hover:underline backdrop-blur-none",
        outline:
          "border border-white/40 bg-white/10 shadow-md hover:bg-white/20 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
        secondary:
          "bg-secondary/60 text-secondary-foreground border border-white/20 shadow-md hover:bg-secondary/75 dark:border-white/5",
      },
    },
  }
);

const Button = ({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ className, size, variant }))}
      {...props}
    />
  );
};

export { Button, buttonVariants };
export default Button;
