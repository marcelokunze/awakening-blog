import Image from "next/image";
import CarouselPurpose from "@/components/CarouselPurpose";
import CarouselLanguage from "@/components/CarouselLanguage";
import CarouselVoices from "@/components/CarouselVoices";
import CarouselBGTracks from "@/components/CarouselBGTracks";

export default function PersonalizationCarousel() {
    return (
        <section className="w-full max-w-4xl mx-auto px-0 sm:px-6 md:px-4">
            {/* Clear Clouds Banner */}
            <div className="flex justify-center">
                <Image
                    src="/clear-clouds.png"
                    alt="Clear Clouds"
                    width={400}
                    height={150}
                    className="w-full max-w-[500px] h-auto object-cover rounded-md"
                />
            </div>

            {/* Carousels overlapping the image */}
            <div className="grid grid-cols-1 gap-4 mx-4 sm:mx-0">
                {/* Why Personalized Header + First Carousel */}
                <div>
                    <div className="text-left max-w-md mb-6 mt-6">
                        <div className="text-selection-text font-mono text-xs mb-3">WHY PERSONALIZED</div>
                    </div>
                    <CarouselPurpose />
                </div>

                {/* Remaining Carousels */}
                <div className="mt-24">
                    <CarouselLanguage />
                </div>
                <div className="mt-24">
                    <CarouselVoices />
                </div>
                <div className="mt-24">
                    <CarouselBGTracks />
                </div>
            </div>
        </section>
    );
}