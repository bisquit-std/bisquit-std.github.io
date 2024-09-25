"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ImageTypes } from "@/constants/constants";

interface Props {
    images: string[];
    type: ImageTypes;
}

export default function ImageCarousel({ images, type }: Props) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
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
            className="relative w-full rounded-md overflow-hidden pt-10"
        >
            <div
                className={`flex ${
                    type === ImageTypes.LANDSCAPE ? "mx-[28%]" : "mx-[40%]"
                }`}
            >
                {images.map((x, index) => {
                    return (
                        <button
                            key={index}
                            style={{
                                aspectRatio: type,
                            }}
                            className="flex-[0_0_100%] relative min-w-0 rounded-md"
                            onClick={() => emblaApi && emblaApi.scrollTo(index)}
                        >
                            <Image
                                src={x}
                                alt={""}
                                fill
                                priority
                                style={{
                                    objectFit:
                                        type === ImageTypes.LANDSCAPE
                                            ? "cover"
                                            : type === ImageTypes.PORTRAIT
                                            ? "contain"
                                            : "contain",

                                    boxShadow:
                                        type === ImageTypes.LANDSCAPE
                                            ? "0 4px 24px -12px var(--text)"
                                            : "",
                                }}
                                sizes="100%"
                                className={`rounded-md overflow-hidden duration-300 ${
                                    selectedIndex !== index && "scale-75 h"
                                }`}
                            />
                        </button>
                    );
                })}
            </div>
            <div className="flex gap-1 py-5 w-full items-center justify-center">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`h-5 aspect-square rounded-full border-4 border-text  ${
                            selectedIndex === index
                                ? "opacity-100"
                                : "opacity-20"
                        }`}
                        onClick={() => emblaApi && emblaApi.scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    );
}
