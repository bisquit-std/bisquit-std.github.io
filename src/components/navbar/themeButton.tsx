"use client";

import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function ThemeButton() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className="flex w-full h-full items-center justify-center hover:text-tertiary duration-150"
            onClick={toggleTheme}
        >
            {theme === "light" ? (
                <MdDarkMode size={22} />
            ) : (
                <MdLightMode size={22} />
            )}
        </button>
    );
}
