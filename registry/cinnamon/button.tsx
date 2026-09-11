import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl border-0 text-sm font-black tracking-wide transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 aria-invalid:border-destructive active:translate-y-1",
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
        lg: "h-10 px-7 has-[>svg]:px-5",
        sm: "h-8 gap-1.5 px-4 has-[>svg]:px-3",
      },
      variant: {
        default:
          "bg-linear-to-b from-orange-600 to-orange-800 text-orange-50 shadow-[0_6px_0_0_rgb(124,45,18),0_10px_16px_-2px_rgba(124,45,18,0.5)] hover:from-orange-500 hover:to-orange-700 active:shadow-[0_1px_0_0_rgb(124,45,18)] dark:from-orange-700 dark:to-orange-900 dark:shadow-[0_6px_0_0_rgb(67,20,7),0_10px_16px_-2px_rgba(0,0,0,0.5)] dark:active:shadow-[0_1px_0_0_rgb(67,20,7)]",
        destructive:
          "bg-linear-to-b from-red-600 to-red-800 text-white shadow-[0_6px_0_0_rgb(127,29,29),0_10px_16px_-2px_rgba(127,29,29,0.4)] hover:from-red-500 hover:to-red-700 active:shadow-[0_1px_0_0_rgb(127,29,29)]",
        ghost:
          "shadow-none active:translate-y-0 hover:bg-orange-100/60 hover:text-orange-900 dark:hover:bg-orange-950/40 dark:hover:text-orange-200",
        link: "shadow-none active:translate-y-0 text-orange-800 underline-offset-4 hover:underline dark:text-orange-300",
        outline:
          "border-2 border-orange-800 bg-orange-50 text-orange-900 shadow-[0_4px_0_0_rgb(124,45,18)] hover:bg-orange-100 active:shadow-[0_1px_0_0_rgb(124,45,18)] dark:border-orange-600 dark:bg-orange-950/50 dark:text-orange-200 dark:shadow-[0_4px_0_0_rgb(120,53,15)]",
        secondary:
          "bg-orange-100 text-orange-900 shadow-[0_4px_0_0_rgb(194,145,105)] hover:bg-orange-200 active:shadow-[0_1px_0_0_rgb(194,145,105)] dark:bg-orange-950/40 dark:text-orange-200 dark:shadow-[0_4px_0_0_rgb(67,20,7)]",
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
