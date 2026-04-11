import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-[0_18px_50px_rgba(255,51,133,0.28)] hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "border border-white/10 bg-white/5 text-white hover:bg-white/10 active:scale-[0.98]",
        ghost:
          "bg-transparent text-white/70 hover:bg-white/5 hover:text-white active:scale-[0.98]",
        accent:
          "bg-tertiary-container/80 text-on-tertiary-container shadow-[0_12px_30px_rgba(0,227,253,0.18)] hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        sm: "h-10 px-4",
        md: "h-12 px-5",
        lg: "h-14 px-7 text-base",
        icon: "size-12 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
