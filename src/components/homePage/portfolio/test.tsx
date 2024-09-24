"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Project } from "./portfolio";
import { CoverTypes } from "@/constants/constants";

// Constants for column count and gap
const COLUMN_COUNT = 3; // You can later modify this based on window width
const GAP = 16; // Gap between the items in pixels

// Define component props
interface Props {
    projects: Project[];
    activeProjects: number[]; // Array of active project IDs
}

const MasonryGrid = ({ projects, activeProjects }: Props) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [positions, setPositions] = useState<{ left: number; top: number }[]>(
        []
    );
    const [containerHeight, setContainerHeight] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const containerWidth = containerRef.current.clientWidth;
        const columnWidth =
            (containerWidth - (COLUMN_COUNT - 1) * GAP) / COLUMN_COUNT; // Calculate column width considering gap

        // Initialize columns heights
        const columnHeights = Array(COLUMN_COUNT).fill(0);

        const calculatedPositions = projects.map((item) => {
            // Skip calculation for inactive projects
            if (!activeProjects.includes(item.id)) {
                return { left: 0, top: 0 };
            }

            const { coverType } = item;
            const column = columnHeights.indexOf(Math.min(...columnHeights));

            // Calculate height based on coverType
            let height = columnWidth; // Default square size
            if (coverType === CoverTypes.LANDSCAPE) {
                height = (columnWidth * 9) / 16; // Height for LANDSCAPE (16/9)
            } else if (coverType === CoverTypes.PORTRAIT) {
                height = (columnWidth * 4) / 3; // Height for PORTRAIT (3/4)
            }

            // Position based on the current shortest column
            const top = columnHeights[column];
            const left = column * (columnWidth + GAP);

            // Update the column height
            columnHeights[column] += height + GAP; // Add gap to height

            return { left, top };
        });

        setPositions(calculatedPositions);

        // Calculate the maximum column height and set it as the container height
        const maxHeight = Math.max(...columnHeights);
        setContainerHeight(maxHeight - GAP); // Subtract the last added gap
    }, [projects, activeProjects]);

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: containerHeight }} // Set calculated container height
        >
            {projects.map((item, index) => {
                const { coverType, id, type } = item;
                const { left, top } = positions[index] || { left: 0, top: 0 };
                let aspectRatio;

                // Check if the project is active
                const isActive = activeProjects.includes(id);

                // Calculate aspect ratio
                if (coverType === CoverTypes.LANDSCAPE) {
                    aspectRatio = "16 / 9";
                } else if (coverType === CoverTypes.PORTRAIT) {
                    aspectRatio = "3 / 4";
                } else {
                    aspectRatio = "1 / 1";
                }

                return (
                    <div
                        key={index}
                        style={{
                            position: "absolute",
                            left: `${left}px`,
                            top: `${top}px`,
                            width: `${
                                containerRef.current?.clientWidth! /
                                    COLUMN_COUNT -
                                GAP
                            }px`,
                            aspectRatio,
                            display: isActive ? "block" : "none", // Hide inactive projects
                        }}
                        className="flex relative items-center justify-center bg-primary rounded-lg overflow-hidden duration-500 group"
                    >
                        <Image
                            src={
                                coverType === CoverTypes.LANDSCAPE
                                    ? "https://picsum.photos/1600/900"
                                    : coverType === CoverTypes.PORTRAIT
                                    ? "https://picsum.photos/900/1600"
                                    : "https://picsum.photos/900/900"
                            }
                            alt=""
                            fill
                            style={{
                                objectFit: "cover",
                            }}
                            sizes="100%"
                            className="duration-500 group-hover:scale-105"
                        />
                        <div className="flex w-full h-full absolute flex-col items-center justify-center bg-black bg-opacity-60 duration-500 opacity-0 group-hover:opacity-100">
                            <p className="text-white">{id}</p>
                            <p className="text-white">{type.join(", ")}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MasonryGrid;
