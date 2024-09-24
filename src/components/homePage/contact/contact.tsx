"use client";

import { useTranslations } from "next-intl";
import React from "react";

import ContactInfo from "../../../data/homePage/contact.json";
import SocialItems from "../../../data/socialItems.json";
import { MdMail, MdPhone } from "react-icons/md";
import SocialButton from "../../socialButton";
import { Helpers } from "@/helpers/helpers";
import ContactForm from "./contactForm";

export default function Contact() {
    const t = useTranslations("Contact");

    const ContactIcons: Record<
        string,
        React.ComponentType<{ size?: number }>
    > = {
        phone: MdPhone,
        email: MdMail,
    };

    return (
        <section
            id="contact"
            className="ml-64 flex flex-col px-[15%] pt-10 pb-20 bg-background"
        >
            <div className="flex flex-col justify-center items-center pt-20 pb-28">
                <p className="absolute text-9xl font-semibold opacity-70 text-secondary">
                    {t("title")}
                </p>
                <p className="text-4xl font-medium z-10">{t("subTitle")}</p>
                <div className="bg-tertiary h-[3px] w-20 z-10" />
            </div>
            <div className="flex gap-[4%]">
                <div className="flex flex-col w-[30%] gap-12">
                    <div className="flex flex-col gap-4">
                        <p className="text-xl font-medium ml-2">
                            {t("reachUs")}
                        </p>
                        <div className="flex flex-col">
                            {ContactInfo.map((x, index) => {
                                const IconComponent = ContactIcons[x.title];

                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-1"
                                    >
                                        {IconComponent && (
                                            <div className="flex items-center justify-center h-10 aspect-square text-tertiary">
                                                <IconComponent size={x.size} />
                                            </div>
                                        )}
                                        <p
                                            onClick={() => {
                                                if (x.title === "phone") {
                                                    Helpers.copyText(
                                                        x.info,
                                                        t("Contact.phoneCopy")
                                                    );
                                                } else if (
                                                    x.title === "email"
                                                ) {
                                                    Helpers.openMail(x.info);
                                                }
                                            }}
                                            className="cursor-pointer"
                                        >
                                            {x.info}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-xl font-medium ml-2">
                            {t("followUs")}
                        </p>
                        <div className="flex items-center gap-3 ml-2">
                            {SocialItems.map((x, index) => (
                                <SocialButton
                                    key={index}
                                    title={x.title}
                                    size={x.size}
                                    url={x.url}
                                    position={"bottom"}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <ContactForm />
            </div>
        </section>
    );
}
