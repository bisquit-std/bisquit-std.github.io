import React from "react";
import NavbarItems from "../../data/navbar/navbarItems.json";
import SocialItems from "../../data/socialItems.json";
import NavbarButton from "./navbarButton";
import SocialButton from "../socialButton";
import ThemeButton from "./themeButton";
import LocaleButton from "./localeButton";

export default function Navbar() {
    return (
        <div className="fixed flex flex-col items-center justify-between h-screen w-64 pb-5 bg-primary">
            <div className="flex flex-col w-full items-center gap-8">
                <div className="flex w-full justify-evenly items-center h-11 border-b-2 border-text">
                    <div className="flex items-center justify-center w-2/3 h-full border-r-2 border-text">
                        <LocaleButton />
                    </div>
                    <div className="flex items-center justify-center w-1/3 h-full">
                        <ThemeButton />
                    </div>
                </div>
                <p>BisQuit</p>
            </div>
            <div className="flex flex-col gap-5 mb-20">
                {NavbarItems.map((x) => (
                    <NavbarButton key={x.id} id={x.id} />
                ))}
            </div>

            <div className="flex items-center justify-center gap-5">
                {SocialItems.map((x) => (
                    <SocialButton
                        key={x.id}
                        id={x.id}
                        size={x.size}
                        url={x.url}
                    />
                ))}
            </div>
        </div>
    );
}
