import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Project } from "./portfolio";
import { CoverTypes } from "@/constants/constants";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";

interface Props {
    projects: Project[];
    activeProjects: number[];
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

const MasonryGrid = ({ projects, activeProjects }: Props) => {
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

            const maxHeight = Math.max(...columnHeights);
            setContainerHeight(maxHeight - gridGap);
        }
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
                            variants={cardVariants}
                        >
                            <Image
                                src={
                                    x.coverType === CoverTypes.LANDSCAPE
                                        ? "https://picsum.photos/1600/900"
                                        : x.coverType === CoverTypes.PORTRAIT
                                        ? "https://picsum.photos/900/1600"
                                        : "https://picsum.photos/900/900"
                                }
                                alt=""
                                fill
                                style={{
                                    objectFit: "cover",
                                }}
                                sizes="100%"
                                className="duration-300 group-hover:scale-[101%] group-hover:blur-[2px]"
                            />
                            <div className="flex w-full h-full absolute flex-col items-center justify-center bg-black bg-opacity-60 duration-500 opacity-0 group-hover:opacity-100">
                                <p className="text-white">{x.id}</p>
                                <p className="text-white">
                                    {x.type.join(" - ")}
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
