"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { Purpose } from "@/lib/purposes";

interface PurposeOptionProps {
  purpose: Purpose;
  isSelected: boolean;
  onSelect: () => void;
}

const PurposeOption = ({ purpose, isSelected, onSelect }: PurposeOptionProps) => {
  const Icon = purpose.icon;

  return (
    <div
      onClick={onSelect}
      className={`relative rounded-2xl p-6 cursor-pointer transition-colors duration-300 ease-in-out flex flex-col items-center justify-center border 
        ${isSelected
          ? "bg-selection-text/20 border-selection-text"
          : "bg-zinc-950 border-muted hover:bg-card hover:border-selection-text/40 hover:text-foreground"
        }`}
    >
      <Icon className={`h-5 w-5 mb-3 ${isSelected ? "text-selection-text" : "text-muted-foreground"}`} />
      <h3
        className={`text-sm text-center ${isSelected ? "text-selection-text" : "text-muted-foreground"}`}
      >
        {purpose.name}
      </h3>
    </div>
  );
};

interface SelectionPurposeProps {
  purposes: Purpose[];
  onSelect?: (purpose: Purpose) => void;
  defaultSelected?: string;
}

export function SelectionPurpose({
  purposes,
  onSelect = () => { },
  defaultSelected,
}: SelectionPurposeProps) {
  // Set the initial selection (or default to the first available purpose)
  const [selectedPurposeId, setSelectedPurposeId] = useState(defaultSelected || "");
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Update the current slide index when the carousel state changes
  useEffect(() => {
    if (!api) return;

    const updateCurrentSlide = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    updateCurrentSlide();
    api.on("select", updateCurrentSlide);

    return () => {
      api.off("select", updateCurrentSlide);
    };
  }, [api]);

  const handleSelect = (purpose: Purpose) => {
    if (selectedPurposeId === purpose.id) {
      // If already selected, unselect it
      setSelectedPurposeId("");
      onSelect({ ...purpose, id: "" }); // You might want to handle this in the parent
    } else {
      setSelectedPurposeId(purpose.id);
      onSelect(purpose);
    }
  };
  

  // Scroll forward by 4 items
  const scrollFourAhead = () => {
    if (!api) return;
    const newIndex = currentSlide + 4;
    api.scrollTo(newIndex);
  };

  // Scroll backward by 4 items
  const scrollFourBack = () => {
    if (!api) return;
    const newIndex = currentSlide - 4;
    api.scrollTo(newIndex);
  };

  return (
    <div className="w-full p-0 md:p-6">
      <div className="relative mx-[-1.5rem] md:mx-0">
        <Carousel
          opts={{ align: "start", loop: false, dragFree: true }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent className="ml-2 mt-2 md:mt-0 md:-ml-4 md:duration-200">
            {purposes.map((purpose) => (
              <CarouselItem
                key={purpose.id}
                className="pl-4 basis-[55%] md:pl-4 md:basis-1/4 lg:basis-1/4"
              >
                <PurposeOption
                  purpose={purpose}
                  isSelected={selectedPurposeId === purpose.id}
                  onSelect={() => handleSelect(purpose)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Only show navigation buttons on medium screens and up */}
          <CarouselPrevious
            onClick={scrollFourBack}
            className="hidden md:flex md:items-center md:justify-center"
          />
          <CarouselNext
            onClick={scrollFourAhead}
            className="hidden md:flex md:items-center md:justify-center"
          />
        </Carousel>
      </div>
    </div>
  );
}
