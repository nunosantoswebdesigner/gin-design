import { cn } from "@/lib/utils";

// Add your props here
export type NewComponentProps = React.HTMLAttributes<HTMLDivElement>;

const NewComponent = ({ className, children, ...props }: NewComponentProps) => (
  <div
    className={cn(
      "rounded-md border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

NewComponent.displayName = "NewComponent";

export { NewComponent };
export default NewComponent;
