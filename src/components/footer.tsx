"use client";

import React from "react";
import ContactInfo from "../data/homePage/contact.json";
import { Helpers } from "@/helpers/helpers";
import { useTranslations } from "next-intl";

interface Props {
    long?: boolean;
}

export default function Footer({ long }: Props) {
    const t = useTranslations("Contact");
    const tC = useTranslations("Common");

    return (
        <div
            className={`flex justify-between h-28 py-4 px-[5%] bg-secondary gap-1 ${
                !long ? "ml-64" : "w-full"
            }`}
        >
            <p className="flex items-center text-sm">
                Copyright © 2024&nbsp;
                <span className="text-tertiary font-medium text-base">
                    {tC("company")}
                </span>
                . {t("rights")}.
            </p>
            <div className="flex flex-col justify-center items-end">
                {ContactInfo.map((x, index) => {
                    return (
                        <p
                            key={index}
                            onClick={() => {
                                if (x.title === "phone") {
                                    Helpers.copyText(x.info, t("phoneCopy"));
                                } else if (x.title === "email") {
                                    Helpers.openMail(x.info);
                                }
                            }}
                            className="cursor-pointer text-sm font-light"
                        >
                            {x.info}
                        </p>
                    );
                })}
            </div>
        </div>
    );
}
