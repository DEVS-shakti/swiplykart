import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-2xl border border-white/8 bg-white/4 px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-primary/40 focus:bg-white/6",
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
