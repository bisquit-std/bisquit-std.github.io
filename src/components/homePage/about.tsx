import { useTranslations } from "next-intl";
import React from "react";
import AboutInfo from "../../data/homePage/about.json";

export default function About() {
    const t = useTranslations("About");
    const tC = useTranslations("Common");

    return (
        <section
            id="about"
            className="ml-64 flex flex-col px-[18%] py-10 bg-secondary"
        >
            <div className="flex flex-col justify-center items-center pt-20 pb-28">
                <p className="absolute text-9xl font-semibold opacity-40 text-primary">
                    {t("title")}
                </p>
                <p className="text-4xl font-medium z-10">{t("subTitle")}</p>
                <div className="bg-tertiary h-[3px] w-20 z-10" />
            </div>
            <div className="flex flex-col gap-3">
                <p className="text-4xl font-medium">
                    {t("we're")}{" "}
                    <span className="text-tertiary">{tC("company")}</span>
                </p>
                <p
                    dangerouslySetInnerHTML={{ __html: t("info") }}
                    className="opacity-85"
                />
            </div>
            <div className="flex justify-around pt-14 pb-8">
                {AboutInfo.map((x, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div className="flex flex-col items-center gap-1 py-3 opacity-85">
                                <p className="text-5xl pt-3 text-tertiary">
                                    {x.value}
                                </p>
                                <p>{t(x.title)}</p>
                            </div>
                            {index !== AboutInfo.length - 1 && (
                                <div className="w-[1px] bg-text" />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </section>
    );
}
