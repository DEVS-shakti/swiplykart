import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-8">
      <Skeleton className="h-16 w-40 rounded-full" />
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Skeleton className="h-[520px]" />
        <div className="space-y-6">
          <Skeleton className="h-20" />
          <Skeleton className="h-40" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>
      </div>
    </div>
  );
}
