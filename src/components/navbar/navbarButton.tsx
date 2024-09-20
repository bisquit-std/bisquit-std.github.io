"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

export default function NavbarButton({ id }: { id: string }) {
    const t = useTranslations("Common.Navbar");
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const scrollToSection = () => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.getBoundingClientRect().top + window.scrollY,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5,
        });

        const sections = document.querySelectorAll("section");
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <button
            className={`hover:text-tertiary duration-150 ${
                activeSection === id ? "text-tertiary" : "text-default"
            }`}
            onClick={() => scrollToSection()}
        >
            {t(id)}
        </button>
    );
}
