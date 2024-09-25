"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import { ImageTypes } from "@/constants/constants";

interface Props {
    images: string[];
    type: ImageTypes;
}

export default function ImageCarousel({ images, type }: Props) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (!emblaApi) return;

        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());

        const onSelect = () => {
            setCanScrollPrev(emblaApi.canScrollPrev());
            setCanScrollNext(emblaApi.canScrollNext());
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    return (
        <div
            ref={emblaRef}
            className="relative w-full rounded-md overflow-hidden"
        >
            <div
                className={`flex ${
                    type === ImageTypes.LANDSCAPE ? "mx-[28%]" : "mx-[40%]"
                }`}
            >
                {images.map((x, index) => {
                    return (
                        <div
                            key={index}
                            style={{ aspectRatio: type }}
                            className="flex-[0_0_100%] relative min-w-0 rounded-md"
                        >
                            <Image
                                src={x}
                                alt={""}
                                fill
                                style={{
                                    objectFit:
                                        type === ImageTypes.LANDSCAPE
                                            ? "cover"
                                            : type === ImageTypes.PORTRAIT
                                            ? "contain"
                                            : "contain",
                                }}
                                sizes="100%"
                                className={`duration-300 ${
                                    selectedIndex !== index && "scale-75"
                                }`}
                            />
                        </div>
                    );
                })}
            </div>
            <div
                className={`flex w-full py-1 justify-between items-end absolute bottom-0 ${
                    type === ImageTypes.LANDSCAPE
                        ? "px-[22%]"
                        : type === ImageTypes.PORTRAIT
                        ? "px-[30%]"
                        : ""
                }`}
            >
                <div
                    className={`flex gap-2 ${
                        type === ImageTypes.LANDSCAPE
                            ? "-translate-x-full"
                            : type === ImageTypes.PORTRAIT
                            ? "-translate-x-1/2"
                            : ""
                    }`}
                >
                    <button
                        className={`rounded-full text-text border-2 border-text p-2 ${
                            canScrollPrev ? "opacity-100" : "opacity-30"
                        }`}
                        onClick={() => emblaApi && emblaApi.scrollPrev()}
                        disabled={!canScrollPrev}
                    >
                        <FaArrowLeft size={18} />
                    </button>
                    <button
                        className={`rounded-full text-text border-2 border-text p-2 ${
                            canScrollNext ? "opacity-100" : "opacity-50"
                        }`}
                        onClick={() => emblaApi && emblaApi.scrollNext()}
                        disabled={!canScrollNext}
                    >
                        <FaArrowRight size={18} />
                    </button>
                </div>
                <div
                    className={`flex gap-2 ${
                        type === ImageTypes.LANDSCAPE
                            ? "translate-x-full"
                            : type === ImageTypes.PORTRAIT
                            ? "translate-x-1/2"
                            : ""
                    }`}
                >
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`h-5 aspect-square rounded-full border-[3px] border-text  ${
                                selectedIndex === index
                                    ? "opacity-100"
                                    : "opacity-30"
                            }`}
                            onClick={() => emblaApi && emblaApi.scrollTo(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
