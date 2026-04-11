import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase",
  {
    variants: {
      variant: {
        default: "border-outline/50 bg-surface-container-high/80 text-soft-foreground",
        primary: "border-primary/20 bg-primary/12 text-primary",
        secondary: "border-secondary/20 bg-secondary-container/25 text-foreground",
        tertiary: "border-tertiary/20 bg-tertiary-container/12 text-tertiary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
