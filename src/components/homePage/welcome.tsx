"use client";

import { useTranslations } from "next-intl";
import React from "react";
import Typewriter from "typewriter-effect";
import TypistWords from "../../data/homePage/typistWords.json";

export default function Welcome() {
    const t = useTranslations();

    const scrollToSection = () => {
        const element = document.getElementById("about");
        if (element) {
            window.scrollTo({
                top: element.getBoundingClientRect().top + window.scrollY,
                behavior: "smooth",
            });
        }
    };

    return (
        <section
            id="home"
            className="ml-64 flex flex-col min-h-screen items-center justify-center"
        >
            <p className="text-2xl font-medium">{t("Common.welcome")}</p>
            <div className="text-5xl mt-1 mb-16">
                <Typewriter
                    options={{
                        strings: TypistWords.map((x) => t(`HomePage.${x}`)),
                        autoStart: true,
                        loop: true,
                        deleteSpeed: 50,
                        delay: 100,
                    }}
                />
            </div>
            <button
                className="hover:text-tertiary duration-150 homeButton"
                onClick={() => scrollToSection()}
            >
                {t("HomePage.learnMore")}
            </button>
        </section>
    );
}
