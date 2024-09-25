"use client";

import React, { useState } from "react";
import MasonryGrid from "./masonryGrid";
import { useTranslations } from "next-intl";
import FilterItems from "../../../data/homePage/portfolioFilters.json";
import { Project } from "@/services/projectService";

interface Props {
    projects: Project[];
    locale: string;
}

export default function MasonryGridFrame({ projects, locale }: Props) {
    const t = useTranslations("Common");
    const [filter, setFilter] = useState("all");

    return (
        <div className="flex flex-col gap-8">
            <div className="flex self-center gap-4">
                <button
                    className={`py-1 px-3 border-b-2 font-light ${
                        filter === "all"
                            ? "border-tertiary"
                            : "border-transparent"
                    } `}
                    onClick={() => {
                        setFilter("all");
                    }}
                >
                    {t("all")}
                </button>
                {FilterItems.map((x, index) => {
                    return (
                        <button
                            key={index}
                            className={`px-2 border-b-2 font-light ${
                                filter === x.id
                                    ? "border-tertiary"
                                    : "border-transparent"
                            } `}
                            onClick={() => {
                                setFilter(x.id);
                            }}
                        >
                            {t(x.id)}
                        </button>
                    );
                })}
            </div>
            <MasonryGrid
                projects={projects}
                activeProjects={
                    filter === "all"
                        ? projects.map((x) => x.id)
                        : projects
                              .filter((x) => x.platforms.includes(filter))
                              .map((x) => x.id)
                }
                locale={locale}
            />
        </div>
    );
}
