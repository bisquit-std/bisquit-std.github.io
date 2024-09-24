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

    const waitForSections = async () => {
        return new Promise<HTMLElement[]>((resolve) => {
            const interval = setInterval(() => {
                const sections = document.querySelectorAll("section");
                if (sections.length > 0) {
                    clearInterval(interval);
                    resolve(Array.from(sections) as HTMLElement[]);
                }
            }, 100);
        });
    };

    useEffect(() => {
        const setupObserver = async () => {
            const sections = await waitForSections();
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveSection(entry.target.id);
                        }
                    });
                },
                {
                    threshold: 0.5,
                }
            );

            sections.forEach((section) => observer.observe(section));

            return () => {
                sections.forEach((section) => observer.unobserve(section));
            };
        };

        setupObserver();
    }, []);

    return (
        <button
            className={`hover:text-tertiary duration-150 ${
                activeSection === id ? "text-tertiary" : "text-text"
            }`}
            onClick={() => scrollToSection()}
        >
            {t(id)}
        </button>
    );
}
