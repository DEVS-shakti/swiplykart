import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type VibeTagProps = {
  label: string;
  active?: boolean;
  accent?: "primary" | "secondary" | "tertiary";
  className?: string;
};

export function VibeTag({
  label,
  active = false,
  accent = "primary",
  className,
}: VibeTagProps) {
  return (
    <Badge
      variant={active ? accent : "default"}
      className={cn("rounded-full normal-case tracking-normal text-xs", className)}
    >
      {label}
    </Badge>
  );
}
