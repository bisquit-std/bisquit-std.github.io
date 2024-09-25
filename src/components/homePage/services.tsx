import { useTranslations } from "next-intl";
import React from "react";
import ServicesInfo from "../../data/homePage/services.json";
import {
    FaCloud,
    FaDatabase,
    FaDesktop,
    FaMobileScreen,
} from "react-icons/fa6";
import { FaCogs } from "react-icons/fa";
import { MdFactory } from "react-icons/md";

const ServiceIcons: Record<string, React.ComponentType<{ size?: number }>> = {
    web: FaDesktop,
    mobile: FaMobileScreen,
    projects: FaCogs,
    backend: FaDatabase,
    software: MdFactory,
    cloud: FaCloud,
};

export default function Services() {
    const t = useTranslations("Services");

    return (
        <section
            id="services"
            className="ml-64 flex flex-col px-[12%] py-10 bg-background"
        >
            <div className="flex flex-col justify-center items-center pt-20 pb-28">
                <p className="absolute text-9xl font-semibold opacity-70 text-secondary">
                    {t("title")}
                </p>
                <p className="text-4xl font-medium z-10">{t("subTitle")}</p>
                <div className="bg-tertiary h-[3px] w-20 z-10" />
            </div>
            <div className="grid grid-cols-2 gap-y-16 gap-x-20 pt-4 pb-10">
                {ServicesInfo.map((x, index) => {
                    const IconComponent = ServiceIcons[x.title];
                    return (
                        <div key={index} className="flex flex-row gap-3">
                            <div className="flex items-center justify-center bg-primary text-tertiary p-4 rounded-md h-[72px] aspect-square">
                                {IconComponent && (
                                    <IconComponent size={x.size} />
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-xl font-medium">
                                    {t(x.title)}
                                </p>
                                <p className="opacity-85 text-base font-light">
                                    {t(x.info)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
