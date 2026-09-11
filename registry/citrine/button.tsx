import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-normal transition-colors disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-1 focus-visible:ring-yellow-500/40 aria-invalid:border-destructive",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        icon: "size-9",
        "icon-lg": "size-10",
        "icon-sm": "size-8",
        lg: "h-10 px-5 has-[>svg]:px-4",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
      },
      variant: {
        default: "bg-yellow-300 text-yellow-950 hover:bg-yellow-200",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        ghost: "hover:bg-yellow-50 dark:hover:bg-yellow-950/20",
        link: "text-yellow-700 underline-offset-4 hover:underline dark:text-yellow-400",
        outline:
          "border-0 border-b border-yellow-400 text-yellow-800 hover:bg-yellow-50 dark:text-yellow-300 dark:hover:bg-yellow-950/20",
        secondary:
          "bg-yellow-50 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-950/30 dark:text-yellow-300",
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
