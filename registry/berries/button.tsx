import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none border-2 border-foreground text-xs font-bold uppercase tracking-widest transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-rose-400/50 aria-invalid:border-destructive translate-x-0 translate-y-0 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
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
        lg: "h-10 px-8 has-[>svg]:px-6",
        sm: "h-8 gap-1.5 px-4 has-[>svg]:px-3",
      },
      variant: {
        default:
          "bg-rose-500 text-white shadow-[4px_4px_0_0_var(--foreground)] hover:bg-rose-600",
        destructive:
          "bg-red-600 text-white shadow-[4px_4px_0_0_var(--foreground)] hover:bg-red-700",
        ghost:
          "border-transparent shadow-none hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30 dark:hover:text-rose-300",
        link: "border-transparent shadow-none text-rose-500 underline-offset-4 hover:underline",
        outline:
          "bg-transparent text-rose-600 shadow-[4px_4px_0_0_var(--foreground)] hover:bg-rose-500 hover:text-white dark:text-rose-400 dark:hover:bg-rose-400 dark:hover:text-black",
        secondary:
          "bg-rose-100 text-rose-700 shadow-[4px_4px_0_0_var(--foreground)] hover:bg-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:hover:bg-rose-950",
      },
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-size={size}
      data-variant={variant}
      className={cn(buttonVariants({ className, size, variant }))}
      {...props}
    />
  );
};

export { Button, buttonVariants };
