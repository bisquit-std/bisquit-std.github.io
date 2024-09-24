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
            <div className="fixed w-screen h-screen -z-10 background" />
            <p className="text-2xl font-medium -mb-1">{t("Common.welcome")}</p>
            <div className="text-6xl h-16">
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
            <p className="mt-5 mb-16 opacity-90 text-lg font-light">
                {t("HomePage.motto2")}
            </p>
            <div className="px-8 pt-5 pb-7 rounded-md">
                <button
                    className="hover:text-tertiary welcomeButton"
                    onClick={() => scrollToSection()}
                >
                    {t("HomePage.learnMore")}
                </button>
            </div>
        </section>
    );
}
