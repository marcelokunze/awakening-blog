import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CarouselItem } from "@/components/ui/carousel";

const SelectionCardSkeleton: React.FC = () => {
  return (
    <CarouselItem className="pl-4 basis-10/12 md:pl-4 md:basis-1/3 lg:basis-1/3">
      <div className="rounded-lg p-4 bg-black border border-muted flex flex-col">
        {/* — HEADER (exactly like real card’s header) */}
        <div className="flex items-start justify-between mb-4 min-h-[3rem]">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>

        {/* — DIVIDER (same mt & mb) */}
        <div className="border-t border-muted mt-2 mb-4" />

        {/* — PILL ROW (h-5 to match py-1 text-xs pills) */}
        <div className="flex gap-2 mt-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-12 rounded-sm" />
          ))}
        </div>
      </div>
    </CarouselItem>
  );
};

export default SelectionCardSkeleton;
