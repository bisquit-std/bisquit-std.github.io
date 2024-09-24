import React from "react";
import { useTranslations } from "next-intl";
import MasonryGridFrame from "./masonryGridFrame";
import { CoverTypes } from "@/constants/constants";

export interface Project {
    id: number;
    coverType: CoverTypes;
    type: string[];
}

export default function Portfolio() {
    const t = useTranslations("Portfolio");

    const test: Project[] = [
        { id: 1, coverType: CoverTypes.LANDSCAPE, type: ["web"] },
        { id: 2, coverType: CoverTypes.PORTRAIT, type: ["mobile"] },
        { id: 3, coverType: CoverTypes.SQUARE, type: ["mobile"] },
        { id: 4, coverType: CoverTypes.SQUARE, type: ["web", "backend"] },
        { id: 5, coverType: CoverTypes.LANDSCAPE, type: ["backend", "mobile"] },
        { id: 6, coverType: CoverTypes.PORTRAIT, type: ["web", "mobile"] },
        { id: 7, coverType: CoverTypes.SQUARE, type: ["web"] },
        { id: 8, coverType: CoverTypes.LANDSCAPE, type: ["backend"] },
    ];

    return (
        <section
            id="portfolio"
            className="ml-64 flex flex-col px-[12%] pt-10 pb-20 bg-secondary"
        >
            <div className="flex flex-col justify-center items-center pt-20 pb-24">
                <p className="absolute text-9xl font-semibold opacity-40 text-primary">
                    {t("title")}
                </p>
                <p className="text-4xl font-medium z-10">{t("subTitle")}</p>
                <div className="bg-tertiary h-[3px] w-20 z-10" />
            </div>
            <MasonryGridFrame projects={test} />
        </section>
    );
}
