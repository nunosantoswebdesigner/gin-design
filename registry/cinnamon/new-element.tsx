import { cn } from "@/lib/utils";

// Add your props here
export type NewElementProps = React.HTMLAttributes<HTMLDivElement>;

const NewElement = ({ className, children, ...props }: NewElementProps) => (
  <div
    data-slot="new-element"
    className={cn(
      "rounded-md border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

NewElement.displayName = "NewElement";

export { NewElement };
