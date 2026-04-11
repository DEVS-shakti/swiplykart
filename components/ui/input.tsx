import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-2xl border border-outline/60 bg-surface-container-low/80 px-4 text-sm text-foreground outline-none transition placeholder:text-soft-foreground focus:border-primary/40 focus:bg-surface-container",
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
