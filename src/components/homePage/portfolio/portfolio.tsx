import React from "react";
import { useTranslations } from "next-intl";
import MasonryGridFrame from "./masonryGridFrame";
import { Project } from "@/services/projectService";

interface Props {
    projects: Project[];
}

export default function Portfolio({ projects }: Props) {
    const t = useTranslations("Portfolio");

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
            <MasonryGridFrame projects={projects} />
        </section>
    );
}
