"use client";

import { cn } from "@/lib/utils";

// Add your props here
export type NewBlockProps = React.HTMLAttributes<HTMLDivElement>;

const NewBlock = ({ className, children, ...props }: NewBlockProps) => (
  <div
    data-slot="new-block"
    className={cn("flex flex-col gap-6 p-6", className)}
    {...props}
  >
    {children}
  </div>
);

NewBlock.displayName = "NewBlock";

export { NewBlock };
export default NewBlock;
