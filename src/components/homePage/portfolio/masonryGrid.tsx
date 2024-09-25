import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ImageTypes } from "@/constants/constants";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Project } from "@/services/projectService";
import { StorageService } from "@/services/imageService";

interface Props {
    projects: Project[];
    activeProjects: string[];
    locale: string;
}

const cardVariants = {
    hidden: {
        display: "none",
        opacity: 0.5,
        scale: 0,
        transition: {
            duration: 0.4,
            ease: "easeInOut",
        },
    },
    shown: {
        opacity: 1,
        scale: 1,
        zIndex: 1,
        transition: {
            duration: 0.4,
            ease: "easeInOut",
        },
    },
};

const MasonryGrid = ({ projects, activeProjects, locale }: Props) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [positions, setPositions] = useState<{ left: number; top: number }[]>(
        []
    );
    const [containerHeight, setContainerHeight] = useState(0);
    const [columnCount, setColumnCount] = useState(3);
    const [gridGap, setGridGap] = useState(16);

    useEffect(() => {
        if (!containerRef.current) return;

        const containerWidth = containerRef.current.clientWidth;
        const columnWidth =
            (containerWidth - (columnCount - 1) * gridGap) / columnCount;
        const columnHeights = Array(columnCount).fill(0);

        const calculatedPositions = projects.map((item, index) => {
            if (!activeProjects.includes(item.id)) {
                return positions[index];
            }

            const targetColumn = columnHeights.indexOf(
                Math.min(...columnHeights)
            );

            const [widthRatio, heightRatio] = item.coverType
                .split("/")
                .map(Number);
            const itemHeight = columnWidth * (heightRatio / widthRatio);

            const top = columnHeights[targetColumn];
            const left = targetColumn * (columnWidth + gridGap);

            columnHeights[targetColumn] += itemHeight + gridGap;

            return { left, top };
        });

        if (JSON.stringify(calculatedPositions) !== JSON.stringify(positions)) {
            setPositions(calculatedPositions);
        }
        const maxHeight = Math.max(...columnHeights);
        setContainerHeight(maxHeight - gridGap);
    }, [activeProjects, columnCount, gridGap, positions, projects]);

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: containerHeight }}
        >
            {projects.map((x, index) => {
                const { left, top } = positions[index] || { left: 0, top: 0 };
                const isActive = activeProjects.includes(x.id);

                return (
                    <Link
                        key={index}
                        style={{
                            left: `${left}px`,
                            top: `${top}px`,
                            width: `${
                                containerRef.current?.clientWidth! /
                                    columnCount -
                                gridGap
                            }px`,
                            aspectRatio: x.coverType,
                        }}
                        className="flex absolute rounded-lg overflow-hidden ease-in-out duration-[400ms] group"
                        href={`/${x.id}`}
                    >
                        <motion.div
                            className="flex w-full h-full relative items-center justify-center"
                            animate={isActive ? "shown" : "hidden"}
                            initial={"shown"}
                            variants={cardVariants}
                        >
                            <Image
                                src={StorageService.getCoverImage(x.id)}
                                alt=""
                                fill
                                style={{
                                    objectFit: "cover",
                                }}
                                sizes="100%"
                                className="duration-300 group-hover:scale-[102%] group-hover:blur-[2px]"
                            />
                            <div
                                className={`flex w-full h-full absolute flex-col items-center justify-center gap-1 bg-black bg-opacity-65 duration-500 opacity-0 group-hover:opacity-100 ${
                                    x.coverType === ImageTypes.PORTRAIT
                                        ? "pb-16"
                                        : x.coverType === ImageTypes.LANDSCAPE
                                        ? "pb-6"
                                        : x.coverType === ImageTypes.SQUARE
                                        ? "pb-8"
                                        : ""
                                }`}
                            >
                                <p className="text-white font-medium text-xl">
                                    {x.title}
                                </p>
                                <p className="text-white font-light">
                                    {
                                        x.type[
                                            locale as keyof typeof x.description
                                        ]
                                    }
                                </p>
                            </div>
                        </motion.div>
                    </Link>
                );
            })}
        </div>
    );
};

export default MasonryGrid;
